import { useState, useEffect } from 'react';

export default function LearningPane({
    topic,
    lang,
    codeVisible,
    referencePinned,
    onToggleCodeVisibility,
    onTogglePin,
    globalProgressText,
    globalProgressPercentage,
    onNextQuestion,
    isZenMode,
    code
}) {
    const [copied, setCopied] = useState(false);
    const [urlCopied, setUrlCopied] = useState(false);
    const [hint, setHint] = useState('');

    useEffect(() => {
        setCopied(false);
        setUrlCopied(false);
        setHint('');
    }, [topic.id, lang]);

    const handleGetHint = () => {
        if (!code || code.trim() === '' || code.trim() === topic.template[lang].trim()) {
            setHint(`Start by writing a request using ${lang === 'js' ? 'fetch' : 'requests'}.`);
            return;
        }

        const lowerCode = code.toLowerCase();
        const isAuthReq = topic.id.includes('kitchen-sink') || topic.id.includes('ecommerce') || topic.id.includes('social') || topic.id.includes('todos');
        
        if (lang === 'js' && !lowerCode.includes('fetch')) {
            setHint("It looks like you haven't written a fetch() call yet.");
            return;
        } else if (lang === 'py' && !lowerCode.includes('requests.')) {
            setHint("It looks like you haven't used the 'requests' library yet. Try: requests.get(...)");
            return;
        }

        if (isAuthReq && !lowerCode.includes('authorization') && !lowerCode.includes('bearer')) {
            setHint("Hint: Did you remember to pass your 'Authorization: Bearer YOUR_API_KEY_HERE' header?");
            return;
        }

        if (topic.method !== 'GET') {
            if (!lowerCode.includes(topic.method.toLowerCase())) {
                setHint(`Hint: Make sure you specify the correct HTTP method: ${topic.method}!`);
                return;
            }
            if ((lang === 'js' && !lowerCode.includes('body')) || (lang === 'py' && !lowerCode.includes('json'))) {
                setHint(`Hint: Don't forget to include the JSON payload (${lang === 'js' ? 'body: JSON.stringify(...)' : 'json=...'}) in your request.`);
                return;
            }
        }

        setHint("Hint: Double check your URL and method logic, and check the terminal for specific errors.");
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(topic.code[lang]).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(topic.baseUrl).then(() => {
            setUrlCopied(true);
            setTimeout(() => setUrlCopied(false), 2000);
        });
    };

    return (
        <div className={`w-full lg:w-1/2 h-auto lg:h-full flex flex-col border-b lg:border-r lg:border-b-0 border-zenBorder bg-zenPanel min-w-0 flex-shrink-0 ${!codeVisible ? 'hidden lg:flex' : ''}`}>
            <div className="flex-1 overflow-y-auto p-6 pt-16 lg:p-10 lg:pt-10 space-y-8 relative">

                {/* Zen Mode Status */}
                <div className="lg:pl-12 mb-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${isZenMode ? 'bg-orange-500/10 border-orange-500/50 shadow-[0_0_10px_rgba(249,115,22,0.2)]' : 'bg-zenSidebar border-zenBorder text-zenMuted'}`}>
                        {isZenMode ? (
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-500">Status: Locked In.<span className="text-zenText">🎯</span></span> 
                        ) : (
                            <>Status: Docked. 🛋️</>
                        )}
                    </div>
                </div>

                <div className="lg:pl-12 mb-6">
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-xs font-semibold text-zenMuted uppercase tracking-wider">Overall Progress</span>
                        <span className="text-xs font-mono text-zenAccent">{globalProgressText}</span>
                    </div>
                    <div className="w-full bg-zenSidebar rounded-full h-1.5 border border-zenBorder overflow-hidden">
                        <div
                            className="bg-zenAccent h-1.5 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(88,166,255,0.6)]"
                            style={{ width: `${globalProgressPercentage}%` }}
                        ></div>
                    </div>
                </div>

                <div className="lg:pl-12 mb-2">
                    <div className="flex justify-between items-center mb-3">
                        <div className="text-xs font-semibold text-zenAccent tracking-wider uppercase">Endpoint</div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleGetHint}
                                className="flex items-center px-3 py-1.5 bg-zenSidebar hover:bg-zenHover text-zenAccent text-[11px] font-bold uppercase tracking-wider rounded border border-zenBorder hover:border-zenAccent transition-all-slow shadow-sm"
                                title="Get a dynamic hint"
                            >
                                Get Hint
                            </button>
                            <button
                                onClick={onNextQuestion}
                                className="flex items-center px-3 py-1.5 bg-zenSidebar hover:bg-zenHover text-zenMuted hover:text-white text-[11px] font-bold uppercase tracking-wider rounded border border-zenBorder hover:border-zenMuted transition-all-slow shadow-sm group"
                                title="Go to next question"
                            >
                                Next Question
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold text-white leading-tight break-words">{topic.question}</h2>
                </div>

                {hint && (
                    <div className="lg:pl-12 mb-6">
                        <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm flex items-start gap-2 shadow-sm animate-fade-in-down">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <div className="flex-1">
                                <p className="font-semibold mb-1">Hint</p>
                                <p>{hint}</p>
                            </div>
                            <button onClick={() => setHint('')} className="text-orange-400/50 hover:text-orange-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                <div className="lg:pl-12">
                    <h3 className="text-sm font-semibold text-zenText mb-3 uppercase tracking-wider">What Will We Learn</h3>
                    <ul className="list-disc list-inside text-sm text-zenMuted space-y-2">
                        {topic.learnings.map((learning, index) => (
                            <li key={index}>{learning}</li>
                        ))}
                    </ul>
                </div>

                <div className="lg:pl-12">
                    <h3 className="text-sm font-semibold text-zenText mb-3 uppercase tracking-wider">Concept</h3>
                    <div
                        className="text-sm text-zenMuted leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: topic.concept }}
                    ></div>
                </div>

                <div className="lg:pl-12 mt-6">
                    <h3 className="text-sm font-semibold text-zenText mb-2 uppercase tracking-wider">Base URL</h3>
                    <p className="text-xs text-zenMuted mb-2">Copy this Base URL to easily write queries or paths in the editor below.</p>
                    <div className="flex items-center shadow-sm">
                        <div className="flex-1 bg-zenSidebar border border-zenBorder rounded-l px-3 py-2 text-xs font-mono text-zenAccent overflow-x-auto whitespace-nowrap">
                            {topic.baseUrl}
                        </div>
                        <button 
                            onClick={handleCopyUrl}
                            className="bg-zenPanel border border-l-0 border-zenBorder rounded-r px-3 py-2 text-zenMuted hover:text-white hover:bg-zenHover transition-colors focus:outline-none flex-shrink-0"
                            title="Copy URL"
                        >
                            {!urlCopied ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <div className="relative mt-8 lg:pl-12">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-zenText uppercase tracking-wider">Reference Code</h3>

                        <div className="flex items-center space-x-3">
                            <button onClick={handleCopy} className="text-zenMuted hover:text-white transition-all-slow focus:outline-none" title="Copy to Clipboard">
                                {!copied ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                            <button onClick={onTogglePin} className={`${referencePinned ? 'text-zenAccent' : 'text-zenMuted'} hover:text-zenAccent transition-all-slow focus:outline-none`} title="Pin Reference Code">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                            </button>
                            <button onClick={onToggleCodeVisibility} className={`${codeVisible ? 'text-zenAccent' : 'text-zenMuted'} hover:text-white transition-all-slow focus:outline-none`} title="Toggle Reference Code">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div
                        className="transition-all duration-300 ease-in-out transform origin-top overflow-hidden"
                        style={{
                            maxHeight: codeVisible ? '500px' : '0px',
                            opacity: codeVisible ? 1 : 0,
                            marginTop: codeVisible ? '12px' : '0px'
                        }}
                    >
                        <div className="bg-zenSidebar rounded-lg border border-zenBorder p-4 overflow-x-auto">
                            <pre><code className="font-mono text-sm text-zenAccent leading-relaxed">{topic.code[lang]}</code></pre>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
