import React from 'react';

export default function Curriculum({
    endpointGroups,
    completedEndpoints,
    globalProgressPercentage,
    globalProgressText,
    onSelectChapter,
    onGoToHome,
    onResetProgress,
    onResetChapter
}) {
    const chapterDetails = {
        "Public API": {
            description: "Master the basics of fetching data.",
            highlights: ["GET requests", "Query parameters", "Handling JSON"],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        "Kitchen Sink": {
            description: "Deep dive into HTTP protocols.",
            highlights: ["HTTP Methods (POST, PUT, DELETE)", "Status Codes", "Headers & Caching"],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            )
        },
        "Authentication": {
            description: "Secure your applications.",
            highlights: ["JWT Tokens", "Login/Register Flows", "OAuth (Google/Github)"],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            )
        },
        "Ecommerce": {
            description: "Build a full shopping experience.",
            highlights: ["Complex Nested Routes", "Cart Management", "Payment Verification"],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        "Todos": {
            description: "Master CRUD operations.",
            highlights: ["Create tasks", "Update status", "Delete tasks"],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            )
        },
        "Social Media": {
            description: "Connect users together.",
            highlights: ["Profiles & Covers", "Posts & Likes", "Follower Systems"],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
            )
        }
    };

    return (
        <div className="w-full h-full overflow-y-auto bg-zenSidebar p-6 lg:p-12 relative flex-1">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-10 text-center lg:text-left mt-10 lg:mt-0 relative">
                    <div className="absolute top-0 right-0 hidden lg:block">
                        <button 
                            onClick={onGoToHome}
                            className="px-4 py-2 text-xs font-semibold text-zenMuted hover:text-white border border-zenBorder hover:border-zenAccent hover:bg-zenAccent/10 rounded-full transition-all duration-300 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Back to Home
                        </button>
                    </div>
                    
                    <div className="flex justify-center lg:hidden mb-6">
                        <button 
                            onClick={onGoToHome}
                            className="px-4 py-2 text-xs font-semibold text-zenMuted hover:text-white border border-zenBorder hover:border-zenAccent hover:bg-zenAccent/10 rounded-full transition-all duration-300 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Back to Home
                        </button>
                    </div>

                    <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 tracking-tight">API Masterclass Curriculum</h1>
                    <p className="text-zenMuted text-lg max-w-2xl">
                        Master REST API concepts by interacting with real-world scenarios. Track your progress across 6 comprehensive modules.
                    </p>
                </div>

                {/* Global Progress Bar */}
                <div className="mb-12 bg-zenPanel rounded-xl p-6 border border-zenBorder shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-zenAccent/5 to-transparent opacity-50"></div>
                    <div className="relative z-10 flex justify-between items-end mb-3">
                        <div>
                            <span className="text-sm font-bold text-white uppercase tracking-wider">Overall Completion</span>
                            <p className="text-xs text-zenMuted mt-1">Keep pushing! You're making great progress.</p>
                        </div>
                        <div className="flex items-end gap-6">
                            <button 
                                onClick={onResetProgress}
                                className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center mb-1 bg-red-900/20 px-2 py-1 rounded hover:bg-red-900/40 border border-transparent hover:border-red-900/50"
                                title="Reset all progress"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Reset All
                            </button>
                            <div className="text-right">
                                <span className="text-2xl font-mono text-zenAccent font-bold">{globalProgressPercentage}%</span>
                                <span className="text-xs text-zenMuted block">{globalProgressText} Endpoints</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-zenSidebar rounded-full h-2.5 border border-zenBorder overflow-hidden relative z-10">
                        <div
                            className="bg-zenAccent h-2.5 rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(88,166,255,0.8)]"
                            style={{ width: `${globalProgressPercentage}%` }}
                        ></div>
                    </div>
                </div>

                {/* Chapter Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Object.keys(endpointGroups).map((chapterName) => {
                        const paths = endpointGroups[chapterName];
                        const chapterCompletedCount = paths.filter(p => completedEndpoints.includes(p)).length;
                        const totalChapterCount = paths.length;
                        const chapterPercentage = totalChapterCount === 0 ? 0 : Math.round((chapterCompletedCount / totalChapterCount) * 100);
                        const details = chapterDetails[chapterName];

                        return (
                            <div key={chapterName} className="bg-zenPanel rounded-xl border border-zenBorder hover:border-zenAccent/50 transition-all-slow hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-zenAccent/10 group flex flex-col overflow-hidden relative transform hover:-translate-y-1">
                                
                                {/* Card Glow Effect on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-zenAccent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                <div className="p-6 flex-1 flex flex-col relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-2 bg-zenSidebar text-zenAccent rounded-lg shadow-inner border border-zenBorder">
                                            {details.icon}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {chapterCompletedCount > 0 && (
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); onResetChapter(chapterName); }}
                                                    className="text-zenMuted hover:text-red-400 p-1 rounded hover:bg-red-900/20 transition-colors"
                                                    title="Reset module progress"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                    </svg>
                                                </button>
                                            )}
                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${chapterPercentage === 100 ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-zenSidebar text-zenMuted border border-zenBorder'}`}>
                                                {chapterCompletedCount} / {totalChapterCount}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <h2 className="text-xl font-bold text-white mb-2">{chapterName}</h2>
                                    <p className="text-sm text-zenMuted mb-6 flex-1">{details.description}</p>
                                    
                                    <div className="mb-6">
                                        <p className="text-xs font-semibold text-zenText uppercase tracking-wider mb-2">You will learn:</p>
                                        <ul className="space-y-1">
                                            {details.highlights.map((hl, i) => (
                                                <li key={i} className="flex items-start text-xs text-zenMuted">
                                                    <svg className="w-3.5 h-3.5 mr-1.5 text-zenAccent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {hl}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Chapter Progress */}
                                    <div className="w-full bg-zenSidebar rounded-full h-1.5 border border-zenBorder overflow-hidden mb-4">
                                        <div
                                            className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${chapterPercentage === 100 ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]' : 'bg-zenAccent shadow-[0_0_8px_rgba(88,166,255,0.6)]'}`}
                                            style={{ width: `${chapterPercentage}%` }}
                                        ></div>
                                    </div>

                                    <button
                                        onClick={() => onSelectChapter(chapterName)}
                                        className="w-full py-2.5 bg-zenSidebar hover:bg-zenHover text-white text-sm font-semibold rounded border border-zenBorder hover:border-zenMuted transition-all duration-300 flex justify-center items-center group-hover:bg-zenAccent group-hover:text-white group-hover:border-zenAccent group-hover:shadow-[0_0_15px_rgba(88,166,255,0.4)]"
                                    >
                                        {chapterPercentage === 100 ? 'Review Chapter' : chapterPercentage > 0 ? 'Continue Chapter' : 'Start Chapter'}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {/* FreeAPI Footer Shoutout */}
                <div className="mt-16 text-center border-t border-zenBorder/50 pt-8 pb-4">
                    <p className="text-sm text-zenMuted/80">
                        This interactive playground utilizes the incredible API endpoints and learning curriculum designed by the <a href="https://freeapi.app/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-zenAccent underline">FreeAPI</a> project by <strong>Chai aur Code</strong>.
                    </p>
                </div>
            </div>
        </div>
    );
}
