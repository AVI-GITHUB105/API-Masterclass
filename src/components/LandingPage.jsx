import React, { useState, useEffect } from 'react';

export default function LandingPage({ onStartLearning, onGetCertified }) {
    const [activeSection, setActiveSection] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Scrollspy observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { threshold: 0.4 });
        
        const sections = document.querySelectorAll('section[id], main[id]');
        sections.forEach(section => observer.observe(section));
        
        return () => sections.forEach(section => observer.unobserve(section));
    }, []);

    return (
        <div className="min-h-screen h-screen bg-zenSidebar text-zenText overflow-y-auto font-sans selection:bg-zenAccent selection:text-white pb-0 scroll-smooth scroll-pt-24 flex flex-col">
            {/* Navbar / Header */}
            <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 lg:px-12 border-b border-zenBorder/50 bg-zenSidebar/90 backdrop-blur-md z-50">
                <a href="#hero" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 rounded-lg bg-zenAccent/20 flex items-center justify-center border border-zenAccent/50 shadow-[0_0_15px_rgba(88,166,255,0.3)]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zenAccent" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">API Masterclass</span>
                </a>
                
                <nav className="hidden lg:flex items-center gap-8">
                    <a href="#features" className={`text-sm font-semibold transition-all duration-300 ${activeSection === 'features' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-zenMuted hover:text-white'}`}>Features</a>
                    <a href="#how-it-works" className={`text-sm font-semibold transition-all duration-300 ${activeSection === 'how-it-works' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-zenMuted hover:text-white'}`}>How it Works</a>
                    <a href="#zen-mode" className={`text-sm font-semibold transition-all duration-300 ${activeSection === 'zen-mode' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-zenMuted hover:text-white'}`}>Zen Mode</a>
                    <button onClick={onStartLearning} className="text-sm font-semibold text-zenMuted hover:text-white transition-colors">Curriculum</button>
                </nav>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={onGetCertified}
                        className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#00EA64] bg-[#00EA64]/10 border border-[#00EA64]/30 hover:bg-[#00EA64]/20 rounded-lg transition-all duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                        Get Certified by HackerRank
                    </button>
                    {/* Mobile menu button */}
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-zenMuted hover:text-white p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed top-[72px] left-0 right-0 bg-zenSidebar/98 backdrop-blur-xl border-b border-zenBorder/50 p-6 z-40 flex flex-col gap-4 shadow-2xl animate-fade-in-down">
                    <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-bold border-b border-zenBorder/30 pb-3 transition-colors ${activeSection === 'features' ? 'text-white' : 'text-zenMuted hover:text-white'}`}>Features</a>
                    <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-bold border-b border-zenBorder/30 pb-3 transition-colors ${activeSection === 'how-it-works' ? 'text-white' : 'text-zenMuted hover:text-white'}`}>How it Works</a>
                    <a href="#zen-mode" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-bold border-b border-zenBorder/30 pb-3 transition-colors ${activeSection === 'zen-mode' ? 'text-white' : 'text-zenMuted hover:text-white'}`}>Zen Mode</a>
                    <button onClick={() => { setIsMobileMenuOpen(false); onStartLearning(); }} className="text-lg font-bold text-left text-zenMuted hover:text-white border-b border-zenBorder/30 pb-3 transition-colors">Curriculum</button>
                    
                    <button 
                        onClick={() => { setIsMobileMenuOpen(false); onGetCertified(); }}
                        className="mt-2 flex justify-center items-center gap-2 w-full px-4 py-3 text-sm font-bold text-[#00EA64] bg-[#00EA64]/10 border border-[#00EA64]/30 hover:bg-[#00EA64]/20 transition-colors rounded-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                        Get Certified by HackerRank
                    </button>
                </div>
            )}

            {/* Hero Section */}
            <main id="hero" className="flex-1 max-w-7xl mx-auto px-6 pt-32 lg:pt-40 pb-20 flex flex-col items-center text-center animate-fade-in-up">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-zenAccent/30 bg-zenAccent/10 text-zenAccent text-xs font-semibold uppercase tracking-widest mb-4 shadow-[0_0_10px_rgba(88,166,255,0.2)]">
                    <span className="w-2 h-2 rounded-full bg-zenAccent mr-2 animate-pulse"></span>
                    Interactive Coding Environment
                </div>
                
                {/* Zero Installation Badge */}
                <div className="mb-8 px-5 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 font-medium text-sm flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    100% In-Browser. Zero Installation Required. Run real Python and Javascript instantly.
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-[1.1]">
                    Stop Watching Tutorials.<br className="hidden lg:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-zenAccent via-blue-400 to-purple-500">
                        Start Building APIs.
                    </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-zenMuted max-w-3xl mb-12 leading-relaxed">
                    The most advanced playground to master REST APIs. Write real code, hit a live production backend, and get instantly verified.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg mx-auto sm:max-w-none sm:w-auto sm:justify-center">
                    <button 
                        onClick={onStartLearning}
                        className="px-10 py-4 text-lg font-bold text-white bg-zenAccent rounded-xl hover:bg-blue-400 transition-all duration-300 animate-pulse-glow hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(88,166,255,0.4)]"
                    >
                        Start Learning Now
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button 
                        onClick={onGetCertified}
                        className="px-10 py-4 text-lg font-bold text-white bg-zenPanel border border-[#00EA64]/50 hover:bg-[#00EA64]/10 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00EA64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                        Get Certified
                    </button>
                </div>

                <div className="mt-20 pt-10 border-t border-zenBorder/50 w-full grid grid-cols-2 md:grid-cols-4 gap-8 opacity-80">
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-extrabold text-white">40+</span>
                        <span className="text-sm font-semibold text-zenMuted mt-1 uppercase tracking-wider">Live Endpoints</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-extrabold text-white">6</span>
                        <span className="text-sm font-semibold text-zenMuted mt-1 uppercase tracking-wider">Core Modules</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-extrabold text-white">100%</span>
                        <span className="text-sm font-semibold text-zenMuted mt-1 uppercase tracking-wider">Free forever</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-extrabold text-white">∞</span>
                        <span className="text-sm font-semibold text-zenMuted mt-1 uppercase tracking-wider">Possibilities</span>
                    </div>
                </div>
            </main>

            {/* Features Section */}
            <section id="features" className="max-w-7xl mx-auto w-full px-6 py-24 border-t border-zenBorder/50">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Everything you need to master APIs</h2>
                    <p className="text-zenMuted text-lg max-w-2xl mx-auto">Stop reading documentation and start making actual network requests with our real compilation engines.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Feature 1 */}
                    <div className="bg-zenPanel border border-zenBorder rounded-2xl p-8 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 group">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Real WebAssembly Compilers</h3>
                        <p className="text-zenMuted leading-relaxed">
                            Powered natively by the V8 Javascript Engine and Pyodide. Your code actually compiles and runs right in your browser.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-zenPanel border border-zenBorder rounded-2xl p-8 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 group">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">True Network Requests</h3>
                        <p className="text-zenMuted leading-relaxed">
                            No simulations. No faked responses. Your code executes physical HTTP calls to the live production FreeAPI backend.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-zenPanel border border-zenBorder rounded-2xl p-8 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] transition-all duration-300 group">
                        <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Native Error Tracking</h3>
                        <p className="text-zenMuted leading-relaxed">
                            Catch bugs instantly. Native SyntaxError and ReferenceError traces are piped straight from the compiler to your terminal.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="w-full bg-zenSidebar relative border-t border-zenBorder/50 pt-24 pb-24">
                <div className="absolute inset-0 bg-gradient-to-b from-zenPanel/30 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">How it Works</h2>
                        <p className="text-zenMuted text-lg max-w-2xl mx-auto">A streamlined workflow designed to build your muscle memory.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connecting Dotted Line 1 -> 2 */}
                        <div className="hidden md:block absolute top-[30px] left-[20%] w-[27%] h-[10px] z-0 overflow-visible pointer-events-none">
                            <svg className="w-full h-full overflow-visible text-zenBorder" fill="none" stroke="currentColor" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path 
                                    d="M 0,5 L 100,5" 
                                    strokeWidth="2"
                                    className="stroke-dasharray-[10_10]"
                                />
                            </svg>
                        </div>

                        {/* Connecting Dotted Line 2 -> 3 */}
                        <div className="hidden md:block absolute top-[30px] left-[53%] w-[27%] h-[10px] z-0 overflow-visible pointer-events-none">
                            <svg className="w-full h-full overflow-visible text-zenBorder" fill="none" stroke="currentColor" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path 
                                    d="M 0,5 L 100,5" 
                                    strokeWidth="2" 
                                    className="stroke-dasharray-[10_10]"
                                />
                            </svg>
                        </div>

                        {/* Step 1 */}
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-zenPanel border-4 border-zenAccent text-zenAccent shadow-xl shadow-zenAccent/30 flex items-center justify-center text-xl font-bold mb-6">1</div>
                            <h3 className="text-xl font-bold mb-3 text-white">Read the Spec</h3>
                            <p className="text-zenMuted leading-relaxed">Read the endpoint requirements, expected headers, and payload structures directly in the learning pane.</p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-zenPanel border-4 border-blue-400 text-blue-400 shadow-xl shadow-blue-400/30 flex items-center justify-center text-xl font-bold mb-6">2</div>
                            <h3 className="text-xl font-bold mb-3 text-white">Write the Code</h3>
                            <p className="text-zenMuted leading-relaxed">Use our built-in browser editor to write your fetch requests. No IDE or local environment required.</p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-zenPanel border-4 border-green-400 text-green-400 shadow-xl shadow-green-400/30 flex items-center justify-center text-xl font-bold mb-6">3</div>
                            <h3 className="text-xl font-bold mb-3 text-white">Get Verified</h3>
                            <p className="text-zenMuted leading-relaxed">Run your code against a live server. Get instant success validation or detailed error logs in the terminal.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Zen Mode Showcase Section */}
            <section id="zen-mode" className="w-full bg-[#0a0a0f] border-y border-zenAccent/20 relative py-24">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="bg-[#111115] border border-zenBorder/60 rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row gap-12 items-stretch shadow-2xl">
                        
                        {/* Left side text & features */}
                        <div className="flex-1 text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                ZEN MODE
                            </div>
                            
                            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter mb-4 leading-tight">
                                Lock in.<br/>
                                <span className="text-zenMuted font-medium text-3xl">Dock out when done.</span>
                            </h2>
                            
                            <p className="text-lg text-zenMuted mb-8 leading-relaxed">
                                Maximize your screen and minimize the noise. Our proprietary Zen Mode strips away the browser UI and plunges you into a true full-screen, distraction-free coding environment.
                            </p>

                            <ul className="space-y-4 mb-10">
                                <li className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span className="text-zenMuted"><strong>True Fullscreen API:</strong> Hijacks the browser for maximum vertical real estate.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span className="text-zenMuted"><strong>Zero Distractions:</strong> No browser tabs, no bookmarks, no noise. Just code.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span className="text-zenMuted"><strong>Seamless Transitions:</strong> Instantly Lock In to flow state and Dock Out when finished.</span>
                                </li>
                            </ul>

                            <button onClick={onStartLearning} className="px-8 py-3 font-bold text-white bg-red-500 hover:bg-red-400 rounded-lg transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                Try Zen Mode &rarr;
                            </button>
                        </div>

                        {/* Right side image */}
                        <div className="flex-1 w-full flex flex-col justify-center">
                            <div className="rounded-xl overflow-hidden border border-zenBorder/50 shadow-[0_0_30px_rgba(0,0,0,0.8)] aspect-video bg-black/50 relative">
                                <img 
                                    src="/zen-mode-screenshot.png" 
                                    alt="Zen Mode Interface" 
                                    className="absolute inset-0 w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="absolute inset-0 hidden flex-col items-center justify-center text-zenMuted p-6 text-center border-2 border-dashed border-zenBorder/50 rounded-xl">
                                    <svg className="w-12 h-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p>Please save your screenshot as <strong>zen-mode-screenshot.png</strong> in the <strong>public/</strong> folder.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Who is this for Section */}
            <section className="max-w-5xl mx-auto w-full px-6 py-24 border-t border-zenBorder/50 text-center">
                <h2 className="text-3xl font-bold text-white mb-10">Perfect for your career journey</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-zenPanel/30 border border-zenBorder rounded-2xl p-8">
                        <div className="text-4xl mb-4">🌱</div>
                        <h3 className="text-lg font-bold text-white mb-2">Beginners</h3>
                        <p className="text-sm text-zenMuted">Bridge the gap between pure Javascript and real-world web apps.</p>
                    </div>
                    <div className="bg-zenPanel/30 border border-zenBorder rounded-2xl p-8 border-t-4 border-t-zenAccent">
                        <div className="text-4xl mb-4">🎨</div>
                        <h3 className="text-lg font-bold text-white mb-2">Frontend Devs</h3>
                        <p className="text-sm text-zenMuted">Learn to seamlessly integrate with any complex backend system.</p>
                    </div>
                    <div className="bg-zenPanel/30 border border-zenBorder rounded-2xl p-8">
                        <div className="text-4xl mb-4">🚀</div>
                        <h3 className="text-lg font-bold text-white mb-2">Bootcamp Grads</h3>
                        <p className="text-sm text-zenMuted">Solidify your knowledge before tackling technical interviews.</p>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="w-full border-t border-zenBorder/50 bg-zenPanel py-12 mt-auto">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
                    <div className="flex items-center gap-2 mb-6 text-zenAccent font-bold text-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        API Masterclass
                    </div>
                    
                    <p className="text-zenMuted text-sm mb-2">
                        Created with passion by <a href="https://github.com/AVI-GITHUB105" target="_blank" rel="noopener noreferrer" className="text-zenAccent hover:underline font-semibold">AVI-GITHUB105</a>
                    </p>
                    
                    <div className="mt-4 p-4 rounded-lg bg-zenSidebar/50 border border-zenBorder inline-block max-w-2xl">
                        <p className="text-sm text-zenMuted/80">
                            <strong>Special Thanks & Shoutout:</strong> This interactive playground utilizes the incredible API endpoints and learning curriculum designed by the <a href="https://freeapi.app/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-zenAccent underline">FreeAPI</a> project by <strong>Chai aur Code</strong>. Massive respect to their team for building the open-source backend that powers these exercises!
                        </p>
                    </div>
                    
                    <div className="mt-8 text-xs text-zenMuted/50">
                        &copy; {new Date().getFullYear()} API Masterclass. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
