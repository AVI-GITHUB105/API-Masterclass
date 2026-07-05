import { useRef, useEffect } from 'react';

export default function Terminal({
    terminalText,
    isError,
    statusText,
    consoleCollapsed,
    onToggleCollapse,
    consoleHeightPx,
    setConsoleHeightPx
}) {
    const isDragging = useRef(false);
    const startY = useRef(0);
    const startHeight = useRef(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMove = (e) => {
            if (!isDragging.current) return;
            const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
            const delta = startY.current - clientY;
            let newHeight = startHeight.current + delta;

            const maxConsoleHeight = window.innerHeight - 150;
            const minConsoleHeight = 100;

            if (newHeight > maxConsoleHeight) newHeight = maxConsoleHeight;
            if (newHeight < minConsoleHeight) newHeight = minConsoleHeight;

            setConsoleHeightPx(newHeight);
        };

        const handleUp = () => {
            if (isDragging.current) {
                isDragging.current = false;
                document.body.classList.remove('no-select', 'cursor-row-resize');
                if (containerRef.current) {
                    containerRef.current.style.transition = '';
                }
            }
        };

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleUp);
        document.addEventListener('touchmove', handleMove);
        document.addEventListener('touchend', handleUp);

        return () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleUp);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleUp);
        };
    }, [setConsoleHeightPx]);

    const handleDown = (e) => {
        if (consoleCollapsed) return;
        isDragging.current = true;
        startY.current = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        if (containerRef.current) {
            startHeight.current = containerRef.current.getBoundingClientRect().height;
            containerRef.current.style.transition = 'none';
        }
        document.body.classList.add('no-select', 'cursor-row-resize');
    };

    return (
        <>
            <div
                className={`h-1 w-full bg-zenBorder ${consoleCollapsed ? 'cursor-default' : 'cursor-row-resize hover:bg-zenAccent'} transition-colors z-10`}
                onMouseDown={handleDown}
                onTouchStart={handleDown}
            ></div>

            <div
                ref={containerRef}
                className="bg-zenTerminal flex flex-col transition-all duration-300"
                style={{ height: consoleCollapsed ? '36px' : `${Math.max(consoleHeightPx, 100)}px` }}
            >
                <div
                    className="flex items-center px-4 py-2 border-b border-zenBorder/50 bg-zenTerminal/90 cursor-pointer group"
                    title="Click to collapse/expand console"
                    onClick={onToggleCollapse}
                >
                    <button className="mr-2 text-zenMuted group-hover:text-white transition-colors focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 transition-transform duration-300"
                            style={{ transform: consoleCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <span className="text-xs font-mono text-zenMuted select-none">Bash Console</span>
                    {statusText && (
                        <span
                            className={`ml-auto text-xs font-mono px-2 py-0.5 rounded block ${
                                isError ? 'bg-red-900/50 text-red-400 border border-red-700' : 'bg-green-900/50 text-green-400 border border-green-700'
                            }`}
                        >
                            {statusText}
                        </span>
                    )}
                </div>
                <div className={`flex-1 overflow-y-auto p-4 font-mono text-xs whitespace-pre-wrap ${isError ? 'text-red-400' : statusText ? 'text-green-400' : 'text-zenMuted'}`}>
                    {terminalText}
                </div>
            </div>
        </>
    );
}
