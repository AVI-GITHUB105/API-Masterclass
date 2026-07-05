import { useState, useRef, useEffect } from 'react';
import beautify from 'js-beautify';

export default function Editor({
    lang,
    setLang,
    code,
    onCodeChange,
    onRunCode,
    onResetCode,
    onShowSolution,
    onFocus,
    placeholder
}) {
    const [saveStatus, setSaveStatus] = useState('idle');
    const [lines, setLines] = useState(code ? code.split('\n').length : 1);
    const timerRef = useRef(null);
    const textareaRef = useRef(null);
    const gutterRef = useRef(null);

    useEffect(() => {
        setLines(code ? code.split('\n').length : 1);
    }, [code]);

    const handleCodeChange = (e) => {
        onCodeChange(e.target.value);
        setSaveStatus('saving');
        setLines(e.target.value.split('\n').length);
        
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        
        timerRef.current = setTimeout(() => {
            setSaveStatus('saved');
            setTimeout(() => {
                setSaveStatus('idle');
            }, 1500);
        }, 600);
    };

    const handleScroll = () => {
        if (gutterRef.current && textareaRef.current) {
            gutterRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    };

    const handleFormatCode = () => {
        if (lang === 'js') {
            const formatter = beautify.js || beautify;
            const formatted = formatter(code, { indent_size: 2, space_in_empty_paren: true });
            handleCodeChange({ target: { value: formatted } });
        }
    };

    return (
        <div id="editor-wrapper" className="flex-1 flex flex-col border-b border-zenBorder relative min-h-[150px]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 bg-zenSidebar border-b border-zenBorder gap-3">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setLang('js')}
                        className={`lang-btn px-3 py-1 text-xs font-medium rounded transition-all-slow ${lang === 'js' ? 'text-white bg-zenPanel border border-zenBorder shadow-sm' : 'text-zenMuted hover:text-white border border-transparent'}`}
                    >
                        JavaScript
                    </button>
                    <button
                        onClick={() => setLang('py')}
                        className={`lang-btn px-3 py-1 text-xs font-medium rounded transition-all-slow ${lang === 'py' ? 'text-white bg-zenPanel border border-zenBorder shadow-sm' : 'text-zenMuted hover:text-white border border-transparent'}`}
                    >
                        Python
                    </button>

                    <span className={`text-[10px] text-zenMuted flex items-center ml-2 transition-opacity duration-300 ${saveStatus !== 'idle' ? 'opacity-100' : 'opacity-0'}`}>
                        {saveStatus === 'saving' && (
                            <svg className="animate-spin w-3 h-3 mr-1 text-zenAccent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {saveStatus === 'saved' && (
                            <svg className="w-3 h-3 mr-1 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        )}
                        <span>{saveStatus === 'saving' ? 'Saving...' : 'Saved'}</span>
                    </span>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                        onClick={onResetCode}
                        className="flex items-center px-2 py-1.5 text-zenMuted hover:text-white rounded hover:bg-zenPanel transition-all-slow"
                        title="Clear editor (show template)"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                    {lang === 'js' && (
                        <button
                            onClick={handleFormatCode}
                            className="flex items-center px-2 py-1.5 text-zenMuted hover:text-white rounded hover:bg-zenPanel transition-all-slow"
                            title="Format Javascript code"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    )}
                    <button
                        onClick={onShowSolution}
                        className="px-3 py-1.5 text-xs font-medium text-zenMuted hover:text-white rounded hover:bg-zenPanel transition-all-slow whitespace-nowrap"
                        title="Show reference solution"
                    >
                        Solution
                    </button>
                    <button
                        onClick={onRunCode}
                        className="flex items-center justify-center px-4 py-1.5 bg-zenRun text-white text-sm font-semibold rounded hover:bg-zenRunHover transition-all-slow shadow-sm relative overflow-hidden group whitespace-nowrap"
                    >
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Run Code</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 relative editor-container overflow-hidden flex bg-zenSidebar">
                {/* Line Numbers Gutter */}
                <div 
                    ref={gutterRef}
                    className="flex flex-col text-right pr-3 pl-2 py-4 select-none text-zenMuted/50 font-mono text-sm border-r border-zenBorder/50 overflow-hidden min-w-[40px] flex-shrink-0 leading-relaxed"
                >
                    {Array.from({ length: Math.max(1, lines) }).map((_, i) => (
                        <div key={i + 1}>{i + 1}</div>
                    ))}
                </div>
                
                <textarea
                    ref={textareaRef}
                    onScroll={handleScroll}
                    value={code}
                    onChange={handleCodeChange}
                    onFocus={onFocus}
                    className="flex-1 h-full bg-transparent text-zenText font-mono text-sm p-4 resize-none focus:outline-none leading-relaxed whitespace-pre overflow-auto"
                    wrap="off"
                    spellCheck="false"
                    placeholder={placeholder}
                ></textarea>
            </div>
        </div>
    );
}
