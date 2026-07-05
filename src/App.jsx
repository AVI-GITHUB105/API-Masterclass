import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import LearningPane from './components/LearningPane';
import Editor from './components/Editor';
import Terminal from './components/Terminal';
import Curriculum from './components/Curriculum';
import LandingPage from './components/LandingPage';
import CertificationPage from './components/CertificationPage';
import { endpointGroups, generateEndpointData } from './utils/apiData';

export default function App() {
    const [currentView, setCurrentView] = useState(() => {
        return localStorage.getItem('zen_current_view') || 'home';
    });
    const [activeEndpoint, setActiveEndpoint] = useState(() => {
        return localStorage.getItem('zen_active_endpoint') || endpointGroups["Public API"][0];
    });
    const [lang, setLang] = useState('js');
    const [codeVisible, setCodeVisible] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 1024);
    const [referencePinned, setReferencePinned] = useState(true);
    const [pyodideInstance, setPyodideInstance] = useState(null);
    
    const [consoleCollapsed, setConsoleCollapsed] = useState(false);
    const [consoleHeightPx, setConsoleHeightPx] = useState(window.innerHeight * 0.4);
    const [terminalText, setTerminalText] = useState('Waiting for execution...');
    const [isError, setIsError] = useState(false);
    const [statusText, setStatusText] = useState('');

    const [isZenMode, setIsZenMode] = useState(() => {
        return localStorage.getItem('zen_mode_active') === 'true';
    });
    const [zenTransitionState, setZenTransitionState] = useState(null); // 'entering', 'exiting', or null

    const [code, setCode] = useState('');

    const [completedEndpoints, setCompletedEndpoints] = useState(() => {
        const saved = localStorage.getItem('zen_completed_endpoints');
        return saved ? JSON.parse(saved) : [];
    });

    const topic = generateEndpointData(activeEndpoint);

    let totalEndpoints = 0;
    Object.values(endpointGroups).forEach(paths => {
        totalEndpoints += paths.length;
    });
    const completedCount = completedEndpoints.length;
    const globalProgressText = `${completedCount} / ${totalEndpoints}`;
    const globalProgressPercentage = totalEndpoints === 0 ? 0 : Math.round((completedCount / totalEndpoints) * 100);

    useEffect(() => {
        localStorage.setItem('zen_completed_endpoints', JSON.stringify(completedEndpoints));
    }, [completedEndpoints]);

    useEffect(() => {
        localStorage.setItem('zen_current_view', currentView);
    }, [currentView]);

    useEffect(() => {
        localStorage.setItem('zen_active_endpoint', activeEndpoint);
    }, [activeEndpoint]);

    useEffect(() => {
        localStorage.setItem('zen_mode_active', isZenMode);
    }, [isZenMode]);

    useEffect(() => {
        const key = `api_masterclass_draft_${activeEndpoint.replace(/\s+/g, '_')}_${lang}`;
        const draft = localStorage.getItem(key);
        if (draft !== null) {
            setCode(draft);
        } else {
            setCode('');
        }
    }, [activeEndpoint, lang]);

    const handleCodeChange = (newCode) => {
        setCode(newCode);
        const key = `api_masterclass_draft_${activeEndpoint.replace(/\s+/g, '_')}_${lang}`;
        if (newCode.trim() !== '') {
            localStorage.setItem(key, newCode);
        } else {
            localStorage.removeItem(key);
        }
    };

    const handleSelectEndpoint = (id) => {
        if (activeEndpoint !== id) {
            setActiveEndpoint(id);
            setCurrentView('editor');
            setCodeVisible(true);
            
            setTerminalText('Waiting for execution...');
            setIsError(false);
            setStatusText('');
        } else if (currentView === 'curriculum') {
            setCurrentView('editor');
        }
    };

    const handleSelectChapter = (chapterName) => {
        const firstEndpoint = endpointGroups[chapterName][0];
        handleSelectEndpoint(firstEndpoint);
    };

    const handleResetGlobalProgress = () => {
        if (window.confirm("Are you sure you want to reset ALL progress? This cannot be undone.")) {
            setCompletedEndpoints([]);
        }
    };

    const handleResetChapterProgress = (chapterName) => {
        if (window.confirm(`Are you sure you want to reset progress for the ${chapterName} module?`)) {
            const chapterEndpoints = endpointGroups[chapterName];
            setCompletedEndpoints(prev => prev.filter(ep => !chapterEndpoints.includes(ep)));
        }
    };

    const handleNextQuestion = () => {
        const allEndpoints = Object.values(endpointGroups).flat();
        const currentIndex = allEndpoints.indexOf(activeEndpoint);
        if (currentIndex !== -1 && currentIndex < allEndpoints.length - 1) {
            handleSelectEndpoint(allEndpoints[currentIndex + 1]);
        }
    };

    const handleRunCode = () => {
        const trimmedCode = code.trim();
        
        if (!trimmedCode) {
            setTerminalText('Error: No code provided to run.');
            setIsError(true);
            setStatusText('ERROR');
            return;
        }

        if (lang === 'js') {
            try {
                new Function(trimmedCode);
            } catch (e) {
                setTerminalText(`SyntaxError: ${e.message}`);
                setIsError(true);
                setStatusText('ERROR');
                return;
            }

            setTerminalText('Executing...');
            setIsError(false);
            setStatusText('');
            if (consoleCollapsed) setConsoleCollapsed(false);

            let outputLogs = [];
            const customConsole = {
                log: (...args) => {
                    const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : a).join(' ');
                    outputLogs.push(msg);
                    setTerminalText(outputLogs.join('\n'));
                    setStatusText('OK');
                    
                    if (topic.validateRegex.test(trimmedCode) && topic.successMethodCheck(trimmedCode)) {
                        setCompletedEndpoints(prev => prev.includes(topic.id) ? prev : [...prev, topic.id]);
                    }
                },
                error: (...args) => {
                    const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : a).join(' ');
                    outputLogs.push("ERROR: " + msg);
                    setTerminalText(outputLogs.join('\n'));
                    setIsError(true);
                    setStatusText('ERROR');
                },
                warn: (...args) => {
                    const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : a).join(' ');
                    outputLogs.push("WARNING: " + msg);
                    setTerminalText(outputLogs.join('\n'));
                }
            };

            const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
            
            // Clean up previous unhandled rejection listeners
            if (window.__zenRejectionHandler) {
                window.removeEventListener('unhandledrejection', window.__zenRejectionHandler);
            }

            window.__zenRejectionHandler = (event) => {
                const errName = event.reason?.name || 'Uncaught Error';
                const errMsg = event.reason?.message || event.reason;
                outputLogs.push(`${errName}: ${errMsg}`);
                setTerminalText(outputLogs.join('\n'));
                setIsError(true);
                setStatusText('ERROR');
                event.preventDefault(); // Prevent it from polluting the real browser console
            };
            window.addEventListener('unhandledrejection', window.__zenRejectionHandler);

            try {
                const fn = new AsyncFunction('console', trimmedCode);
                fn(customConsole).catch(e => {
                    outputLogs.push(`Error: ${e.message}`);
                    setTerminalText(outputLogs.join('\n'));
                    setIsError(true);
                    setStatusText('ERROR');
                });
                
                setTimeout(() => {
                    setTerminalText(prev => {
                        if (prev === 'Executing...' && !trimmedCode.includes('console.log')) {
                            return 'Code executed successfully (no output).';
                        }
                        return prev;
                    });
                }, 1500);

            } catch (e) {
                outputLogs.push(`RuntimeError: ${e.message}`);
                setTerminalText(outputLogs.join('\n'));
                setIsError(true);
                setStatusText('ERROR');
            }
            return;
        } else {
            // Python Execution using Pyodide
            setTerminalText('Executing...');
            setIsError(false);
            setStatusText('');
            if (consoleCollapsed) setConsoleCollapsed(false);

            let outputLogs = [];

            const executePythonCode = async (pyodide) => {
                setTerminalText('Executing...');
                try {
                    pyodide.setStdout({ batched: (str) => {
                        outputLogs.push(str);
                        setTerminalText(outputLogs.join('\n'));
                        setStatusText('OK');
                        
                        if (topic.validateRegex.test(trimmedCode) && topic.successMethodCheck(trimmedCode)) {
                            setCompletedEndpoints(prev => prev.includes(topic.id) ? prev : [...prev, topic.id]);
                        }
                    }});

                    pyodide.setStderr({ batched: (str) => {
                        outputLogs.push(`ERROR: ${str}`);
                        setTerminalText(outputLogs.join('\n'));
                        setIsError(true);
                        setStatusText('ERROR');
                    }});

                    const injectMock = `
import sys
import js
import json

class MockResponse:
    def __init__(self, text, status):
        self.text_content = text
        self.status_code = status
    
    def json(self):
        if not self.text_content:
            return {}
        try:
            return json.loads(self.text_content)
        except Exception:
            return {}

    @property
    def text(self):
        return self.text_content

class requests_mock:
    @staticmethod
    def _make_request(method, url, **kwargs):
        req = js.XMLHttpRequest.new()
        req.open(method, url, False)
        
        headers = kwargs.get('headers', {})
        json_data = kwargs.get('json')
        
        if json_data and 'Content-Type' not in headers:
            headers['Content-Type'] = 'application/json'
            
        for k, v in headers.items():
            req.setRequestHeader(k, v)
            
        if json_data:
            req.send(json.dumps(json_data))
        else:
            req.send(None)
            
        return MockResponse(req.responseText, req.status)

    @staticmethod
    def get(url, **kwargs): return requests_mock._make_request("GET", url, **kwargs)
    @staticmethod
    def post(url, **kwargs): return requests_mock._make_request("POST", url, **kwargs)
    @staticmethod
    def put(url, **kwargs): return requests_mock._make_request("PUT", url, **kwargs)
    @staticmethod
    def patch(url, **kwargs): return requests_mock._make_request("PATCH", url, **kwargs)
    @staticmethod
    def delete(url, **kwargs): return requests_mock._make_request("DELETE", url, **kwargs)

sys.modules['requests'] = requests_mock
`;
                    await pyodide.runPythonAsync(injectMock);
                    await pyodide.runPythonAsync(trimmedCode);
                    
                    setTimeout(() => {
                        setTerminalText(prev => {
                            if (prev === 'Executing...' && !trimmedCode.includes('print')) {
                                return 'Code executed successfully (no output).';
                            }
                            return prev;
                        });
                    }, 100);

                } catch (err) {
                    outputLogs.push(`Execution Error:\n${err.message}`);
                    setTerminalText(outputLogs.join('\n'));
                    setIsError(true);
                    setStatusText('ERROR');
                }
            };

            if (pyodideInstance) {
                executePythonCode(pyodideInstance);
            } else {
                setTerminalText('Loading Python Engine (~10MB download, this only happens once)...');
                
                const loadPyodideAndRun = () => {
                    const script = document.createElement('script');
                    script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js";
                    script.onload = async () => {
                        try {
                            setTerminalText('Initializing Engine...');
                            const pyodide = await window.loadPyodide();
                            setPyodideInstance(pyodide);
                            executePythonCode(pyodide);
                        } catch (err) {
                            setTerminalText(`Failed to initialize Pyodide:\n${err.message}`);
                            setIsError(true);
                            setStatusText('ERROR');
                        }
                    };
                    script.onerror = () => {
                        setTerminalText('Failed to download Python Engine. Check your internet connection.');
                        setIsError(true);
                        setStatusText('ERROR');
                    };
                    document.head.appendChild(script);
                };

                if (window.loadPyodide) {
                    window.loadPyodide().then(pyodide => {
                        setPyodideInstance(pyodide);
                        executePythonCode(pyodide);
                    });
                } else {
                    loadPyodideAndRun();
                }
            }
        }
    };

    const handleEditorFocus = () => {
        if (codeVisible && !referencePinned) {
            setCodeVisible(false);
        }
    };

    const handleResetCode = () => {
        setCode('');
        setTerminalText('Waiting for execution...');
        setIsError(false);
        setStatusText('');
    };

    const handleShowSolution = () => {
        setCode(topic.code[lang]);
    };

    const handleToggleZenMode = () => {
        if (isZenMode) {
            setZenTransitionState('exiting');
            setTimeout(() => {
                setIsZenMode(false);
                setZenTransitionState(null);
                if (document.fullscreenElement) {
                    document.exitFullscreen().catch(e => console.error(e));
                }
            }, 2000);
        } else {
            setZenTransitionState('entering');
            setTimeout(() => {
                setIsZenMode(true);
                setSidebarOpen(false); // Collapse sidebar
                setZenTransitionState(null);
                document.documentElement.requestFullscreen().catch(e => console.error(e));
            }, 2000);
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && isZenMode) {
                // If they pressed ESC, the browser instantly exited fullscreen natively.
                // We shouldn't show the 2-second blur here because the screen is already small.
                setIsZenMode(false);
                setZenTransitionState(null);
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, [isZenMode]);

    if (currentView === 'home') {
        return (
            <LandingPage 
                onStartLearning={() => setCurrentView('curriculum')}
                onGetCertified={() => setCurrentView('certification')}
            />
        );
    }

    if (currentView === 'certification') {
        return <CertificationPage onGoToHome={() => setCurrentView('home')} />;
    }

    return (
        <div className={`bg-zenSidebar text-zenText h-screen w-screen overflow-hidden flex font-sans ${isZenMode ? 'theme-zen' : ''}`}>
            {/* Zen Mode Transition Overlay */}
            {zenTransitionState && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zenSidebar/90 backdrop-blur-xl transition-all duration-500 animate-fade-in-up">
                    <div className={`w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mb-8 ${zenTransitionState === 'exiting' ? 'border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)]' : 'border-zenAccent shadow-[0_0_20px_rgba(88,166,255,0.5)]'}`}></div>
                    <h2 className={`text-3xl md:text-5xl font-extrabold tracking-widest uppercase animate-pulse text-center px-4 ${zenTransitionState === 'exiting' ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]'}`}>
                        {zenTransitionState === 'entering' ? "Check gear. We are locking in." : "We heated up too much. Let's dock."}
                    </h2>
                </div>
            )}

            {currentView !== 'curriculum' && (
                <Sidebar
                    endpointGroups={endpointGroups}
                    completedEndpoints={completedEndpoints}
                    activeEndpoint={activeEndpoint}
                    onSelectEndpoint={handleSelectEndpoint}
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    onGoToCurriculum={() => setCurrentView('curriculum')}
                    onGoToHome={() => setCurrentView('home')}
                    isZenMode={isZenMode}
                    onToggleZenMode={handleToggleZenMode}
                />
            )}

            <div className="flex-1 flex flex-col lg:flex-row h-full min-w-0 transition-all duration-300 overflow-y-auto lg:overflow-hidden relative">
                
                {!sidebarOpen && currentView !== 'curriculum' && (
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="absolute top-4 left-4 lg:top-6 lg:left-6 text-zenMuted hover:text-white p-2 bg-zenSidebar rounded border border-zenBorder hover:border-zenMuted shadow-md transition-all z-20"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                )}

                {currentView === 'curriculum' ? (
                    <Curriculum 
                        endpointGroups={endpointGroups}
                        completedEndpoints={completedEndpoints}
                        globalProgressPercentage={globalProgressPercentage}
                        globalProgressText={globalProgressText}
                        onSelectChapter={handleSelectChapter}
                        onGoToHome={() => setCurrentView('home')}
                        onResetProgress={handleResetGlobalProgress}
                        onResetChapter={handleResetChapterProgress}
                    />
                ) : (
                    <>
                        <LearningPane
                            topic={topic}
                            lang={lang}
                            codeVisible={codeVisible}
                            referencePinned={referencePinned}
                            onToggleCodeVisibility={() => setCodeVisible(!codeVisible)}
                            onTogglePin={() => setReferencePinned(!referencePinned)}
                            globalProgressText={globalProgressText}
                            globalProgressPercentage={globalProgressPercentage}
                            onNextQuestion={handleNextQuestion}
                            isZenMode={isZenMode}
                            code={code}
                        />

                        <div className="w-full lg:w-1/2 h-[70vh] lg:h-full flex flex-col bg-zenPanel min-w-0 flex-shrink-0">
                            <Editor
                                lang={lang}
                                setLang={setLang}
                                code={code}
                                onCodeChange={handleCodeChange}
                                onRunCode={handleRunCode}
                                onResetCode={handleResetCode}
                                onShowSolution={handleShowSolution}
                                onFocus={handleEditorFocus}
                                placeholder={topic.template[lang]}
                            />
                            <Terminal
                                terminalText={terminalText}
                                isError={isError}
                                statusText={statusText}
                                consoleCollapsed={consoleCollapsed}
                                onToggleCollapse={() => setConsoleCollapsed(!consoleCollapsed)}
                                consoleHeightPx={consoleHeightPx}
                                setConsoleHeightPx={setConsoleHeightPx}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
