import { useState, useEffect } from 'react';

export default function Sidebar({
    endpointGroups,
    completedEndpoints,
    activeEndpoint,
    onSelectEndpoint,
    isOpen,
    onClose,
    onGoToCurriculum,
    onGoToHome,
    isZenMode,
    onToggleZenMode
}) {
    const [expandedGroups, setExpandedGroups] = useState({});

    useEffect(() => {
        if (!activeEndpoint) return;
        
        for (const [group, paths] of Object.entries(endpointGroups)) {
            if (paths.includes(activeEndpoint)) {
                setExpandedGroups({ [group]: true });
                break;
            }
        }
    }, [activeEndpoint, endpointGroups]);

    const toggleAccordion = (group) => {
        setExpandedGroups(prev => {
            if (prev[group]) {
                return {};
            }
            return { [group]: true };
        });
    };

    return (
        <>
            {/* Mobile Sidebar Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 z-30 lg:hidden transition-opacity duration-300 backdrop-blur-sm ${isOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`}
                onClick={onClose}
            ></div>

            {/* LEFT PANE: Sidebar Navigation */}
            <div
                className={`fixed lg:relative inset-y-0 left-0 z-40 h-full flex flex-col border-zenBorder bg-zenSidebar flex-shrink-0 transition-all duration-300 overflow-hidden whitespace-nowrap transform ${isOpen ? 'translate-x-0 w-[280px] lg:w-1/5 border-r' : '-translate-x-full lg:translate-x-0 w-[280px] lg:w-0 border-r-0'}`}
            >
                <div className="p-4 border-b border-zenBorder flex justify-between items-center">
                    <div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-zenAccent/20 flex items-center justify-center border border-zenAccent/50 flex-shrink-0">
                            <img src="/logoapi-1.png" alt="API Masterclass Logo" className="w-4 h-4 object-contain" />
                        </div>
                        <h1 
                            className="text-lg font-bold text-white tracking-wide cursor-pointer hover:text-zenAccent transition-colors truncate"
                            onClick={onGoToHome}
                            title="Go to Home"
                        >
                            API Masterclass
                        </h1>
                    </div>
                        <p className="text-xs text-zenMuted mt-1">FreeAPI Modules</p>
                    </div>
                    {/* Close Sidebar Button */}
                    <button
                        onClick={onClose}
                        className="text-zenMuted hover:text-white p-1 rounded hover:bg-zenHover transition-colors lg:hidden"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        onClick={onClose}
                        className="text-zenMuted hover:text-white p-1 rounded hover:bg-zenHover transition-colors hidden lg:block"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-2 pb-20 lg:pb-2">
                    <ul className="space-y-1 px-2">
                        {Object.keys(endpointGroups).map((group) => {
                            const paths = endpointGroups[group];
                            const groupCompleted = paths.filter(p => completedEndpoints.includes(p)).length;
                            const isExpanded = expandedGroups[group] || false;

                            return (
                                <li className="mb-1" key={group}>
                                    <button
                                        onClick={() => toggleAccordion(group)}
                                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded text-zenText hover:bg-zenHover border border-transparent transition-all-slow"
                                    >
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-2 text-zenAccent">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                                            </svg>
                                            <span>{group}</span>
                                            <span className={`ml-2 text-[10px] bg-zenPanel px-1.5 py-0.5 rounded-full transition-opacity duration-300 ${groupCompleted === paths.length ? 'text-green-400' : 'text-zenMuted'} ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                                                {groupCompleted}/{paths.length}
                                            </span>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zenMuted transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div className={`accordion-content ml-2 mt-1 border-l border-zenBorder pl-2 space-y-1 ${isExpanded ? 'expanded' : ''}`}>
                                        {paths.map(id => {
                                            const [method, path] = id.split(' ');
                                            const isDone = completedEndpoints.includes(id);
                                            const isActive = activeEndpoint === id;

                                            let methodColorClass = 'text-yellow-400';
                                            if (method === 'GET') methodColorClass = 'text-blue-400';
                                            if (method === 'POST') methodColorClass = 'text-green-400';
                                            if (method === 'DELETE') methodColorClass = 'text-red-400';

                                            return (
                                                <button
                                                    key={id}
                                                    onClick={() => onSelectEndpoint(id)}
                                                    title={path}
                                                    className={`sidebar-btn w-full text-left px-2 py-1.5 text-xs font-mono rounded transition-all-slow flex items-center justify-between ${isActive ? 'bg-zenAccent/10 text-white border-l-[3px] border-l-zenAccent shadow-[inset_20px_0_20px_-20px_rgba(88,166,255,0.3)]' : 'text-zenMuted border border-transparent hover:bg-zenPanel'}`}
                                                >
                                                    <div className="flex items-center min-w-0 flex-1">
                                                        <span className={`mr-2 font-bold min-w-[35px] text-[10px] ${methodColorClass}`}>{method}</span>
                                                        <span className="truncate">{path.split('/').pop() || path}</span>
                                                    </div>
                                                    {isDone && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-400 flex-shrink-0 ml-1 check-icon-done" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="p-4 border-t border-zenBorder bg-zenSidebar mt-auto flex flex-col gap-2">
                    <button
                        onClick={onGoToCurriculum}
                        className="w-full py-2 bg-zenPanel hover:bg-zenHover text-white text-sm font-semibold rounded border border-zenBorder hover:border-zenMuted transition-all duration-300 flex justify-center items-center group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-zenAccent group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Curriculum
                    </button>
                    <button
                        onClick={onToggleZenMode}
                        className={`w-full py-2 text-sm font-semibold rounded border transition-all duration-300 flex justify-center items-center group ${isZenMode ? 'bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.15)]' : 'bg-zenPanel border-zenBorder hover:border-zenMuted text-white hover:bg-zenHover'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 transition-transform group-hover:scale-110 ${isZenMode ? 'text-orange-500' : 'text-zenAccent'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {isZenMode ? (
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-500">
                                Dock Out
                            </span>
                        ) : 'Lock In'}
                    </button>
                </div>
            </div>
        </>
    );
}
