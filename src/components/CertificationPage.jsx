import React, { useEffect, useState } from 'react';

const CodeBlock = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#0d1117] rounded-xl border border-zenBorder overflow-hidden flex flex-col min-w-0 w-full relative group mt-3">
            <button 
                onClick={handleCopy}
                className="absolute top-2 right-2 p-1.5 bg-zenPanel/80 hover:bg-zenHover border border-zenBorder rounded-lg text-zenMuted hover:text-white opacity-0 group-hover:opacity-100 transition-all z-10"
                title="Copy code"
            >
                {copied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                )}
            </button>
            <pre className="p-4 overflow-x-auto text-sm text-[#e6edf3] w-full">
                <code>{code}</code>
            </pre>
        </div>
    );
};

export default function CertificationPage({ onGoToHome }) {
    // Scroll to top when mounted
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-zenSidebar text-zenText font-sans selection:bg-[#00EA64]/30 selection:text-white pb-20">
            {/* Navbar / Header */}
            <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 lg:px-12 border-b border-zenBorder/50 bg-zenSidebar/90 backdrop-blur-md z-50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#00EA64]/10 flex items-center justify-center border border-[#00EA64]/50 shadow-[0_0_15px_rgba(0,234,100,0.2)]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#00EA64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">HackerRank Prep</span>
                </div>
                
                <button 
                    onClick={onGoToHome}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-zenMuted hover:text-white border border-zenBorder hover:border-zenAccent hover:bg-zenAccent/10 rounded-full transition-all duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                </button>
            </header>

            <main className="max-w-4xl mx-auto px-6 pt-32 pb-20 overflow-hidden">
                {/* Header Title */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                        HackerRank REST API <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00EA64] to-blue-500">
                            Intermediate Certification Prep Kit
                        </span>
                    </h1>
                    <p className="text-xl text-zenMuted max-w-2xl mx-auto leading-relaxed">
                        A structured, hands-on study guide and code architecture blueprint designed to master data aggregation, query manipulation, and low-memory execution traps on automated technical platforms.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <a 
                            href="https://github.com/AVI-GITHUB105/hackerrank-rest-api-intermediate-prep-kit" 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-zenPanel border border-zenBorder hover:border-white text-white rounded-xl transition-all shadow-lg hover:shadow-white/10"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                            View Repository on GitHub
                        </a>
                        <a 
                            href="https://www.hackerrank.com/skills-verification/rest_api_intermediate" 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00EA64]/10 border border-[#00EA64]/50 hover:bg-[#00EA64]/20 text-[#00EA64] font-bold rounded-xl transition-all shadow-lg hover:shadow-[#00EA64]/20"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                            Take Official Exam
                        </a>
                    </div>
                </div>

                {/* Call to Action Banner for Stars & Practice */}
                <section className="mb-16 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                    <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-[#00EA64]/10 border border-zenBorder p-6 lg:p-8 rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                        <div className="absolute top-0 right-0 w-full h-full bg-noise opacity-[0.03] pointer-events-none"></div>
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
                        
                        <div className="relative z-10 text-center md:text-left flex-1">
                            <h2 className="text-2xl font-bold text-white mb-2">Master All Practice Questions 🚀</h2>
                            <p className="text-sm text-zenMuted mb-0">
                                This guide covers the core concepts, but the <strong className="text-white">full collection of problem blueprints and practice files</strong> are hosted entirely on my GitHub. If you found this useful, please drop a star on the repository to help others find it and boost its visibility!
                            </p>
                        </div>

                        <div className="relative z-10 flex flex-col items-center gap-3">
                            {/* Embedded GitHub Star Button */}
                            <iframe 
                                src="https://ghbtns.com/github-btn.html?user=AVI-GITHUB105&repo=hackerrank-rest-api-intermediate-prep-kit&type=star&count=true&size=large" 
                                frameBorder="0" 
                                scrolling="0" 
                                width="170" 
                                height="30" 
                                title="GitHub"
                                className="shadow-lg rounded"
                            ></iframe>
                            <span className="text-xs text-zenMuted/70">1-click to star!</span>
                        </div>
                    </div>
                </section>

                {/* Official Requirements */}
                <section className="mb-16">
                    <div className="bg-zenSidebar/80 border-l-4 border-l-[#00EA64] p-6 lg:p-8 rounded-r-2xl border-y border-r border-zenBorder relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00EA64]/5 blur-[80px] rounded-full pointer-events-none"></div>
                        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2 relative z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00EA64]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            Official Certification Competencies
                        </h2>
                        
                        <div className="text-sm text-zenMuted space-y-4 relative z-10">
                            <p>
                                A RESTful API makes it possible for remote execution of an application's capabilities by supporting standard HTTP methods, error handling, and other RESTful mechanisms.
                            </p>
                            <p>
                                This competency area includes usage of the GET Request, consuming the APIs, and exploring basic functionalities.
                            </p>
                            
                            <div className="mt-6">
                                <h3 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Key Competencies Required:</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00EA64] mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        <div>
                                            <strong className="text-white">Consuming an API</strong>
                                            <p className="mt-0.5 text-xs">Ability to Get Data from an API.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00EA64] mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        <div>
                                            <strong className="text-white">Filtering, Sorting, Searching, and Pagination</strong>
                                            <p className="mt-0.5 text-xs">Process request using parameters or paging. Using offset pagination. Using multi-column sort.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Concepts */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <span>🌐</span> Core Concepts Covered
                    </h2>
                    <div className="grid gap-4">
                        <div className="bg-zenPanel p-5 rounded-xl border border-zenBorder">
                            <h3 className="font-bold text-white mb-1">Consuming Endpoints</h3>
                            <p className="text-sm text-zenMuted">Asynchronous processing (<code>async/await</code>) paired with strict response gatekeeping (<code>if (!response.ok)</code>).</p>
                        </div>
                        <div className="bg-zenPanel p-5 rounded-xl border border-zenBorder">
                            <h3 className="font-bold text-white mb-1">Server-Side Filtering</h3>
                            <p className="text-sm text-zenMuted">Offloading database overhead directly to query strings (<code>?search=X&category=Y</code>) to bypass execution timeouts.</p>
                        </div>
                        <div className="bg-zenPanel p-5 rounded-xl border border-zenBorder">
                            <h3 className="font-bold text-white mb-1">Offset Pagination</h3>
                            <p className="text-sm text-zenMuted">Managing infinite data streams by dynamically extracting metadata boundaries (<code>totalPages</code>, <code>total</code>).</p>
                        </div>
                        <div className="bg-zenPanel p-5 rounded-xl border border-zenBorder border-l-4 border-l-amber-500">
                            <h3 className="font-bold text-white mb-1 flex items-center gap-2">Environment Workarounds <span className="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-500 rounded">Important</span></h3>
                            <p className="text-sm text-zenMuted">
                                Swapping out native browser <code>fetch</code> for <strong>Axios</strong> or native Node <code>https</code> drivers to prevent WebAssembly container crashes in specific HackerRank node environments.
                            </p>
                            <div className="mt-3">
                                <a href="https://github.com/AVI-GITHUB105/hackerrank-rest-api-intermediate-prep-kit/blob/main/01-football-matches-draw-counts-axios.js" target="_blank" rel="noreferrer" className="text-amber-500 text-xs font-semibold hover:underline inline-flex items-center gap-1">
                                    View Axios Implementation Example
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* File Directory Blueprints */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <span>📂</span> File Directory & Problem Blueprints
                    </h2>
                    <div className="bg-[#0d1117] border border-zenBorder rounded-xl overflow-hidden font-mono text-sm">
                        <a href="https://github.com/AVI-GITHUB105/hackerrank-rest-api-intermediate-prep-kit/blob/main/01-football-matches-draw-counts-axios.js" target="_blank" rel="noreferrer" className="p-4 border-b border-zenBorder hover:bg-zenHover transition-colors flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 group block">
                            <span className="text-[#58a6ff] whitespace-nowrap group-hover:underline">/01-football-matches-draw-counts-axios.js</span>
                            <span className="text-zenMuted group-hover:text-white transition-colors">Optimizing sequential scores using server filtering.</span>
                        </a>
                        <a href="https://github.com/AVI-GITHUB105/hackerrank-rest-api-intermediate-prep-kit/blob/main/02-team-goals-accumulation-while-loop.js" target="_blank" rel="noreferrer" className="p-4 border-b border-zenBorder hover:bg-zenHover transition-colors flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 group block">
                            <span className="text-[#58a6ff] whitespace-nowrap group-hover:underline">/02-team-goals-accumulation-while-loop.js</span>
                            <span className="text-zenMuted group-hover:text-white transition-colors">Multi-page data parsing across separate home/away blocks.</span>
                        </a>
                        <a href="https://github.com/AVI-GITHUB105/hackerrank-rest-api-intermediate-prep-kit/blob/main/03-football-competition-winners-goals.js" target="_blank" rel="noreferrer" className="p-4 border-b border-zenBorder hover:bg-zenHover transition-colors flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 group block">
                            <span className="text-[#58a6ff] whitespace-nowrap group-hover:underline">/03-football-competition-winners-goals.js</span>
                            <span className="text-zenMuted group-hover:text-white transition-colors">URL sanitization and dependent multi-endpoint orchestration.</span>
                        </a>
                        <a href="https://github.com/AVI-GITHUB105/hackerrank-rest-api-intermediate-prep-kit/blob/main/04-medical-records-average-pulse.js" target="_blank" rel="noreferrer" className="p-4 hover:bg-zenHover transition-colors flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 group block">
                            <span className="text-[#58a6ff] whitespace-nowrap group-hover:underline">/04-medical-records-average-pulse.js</span>
                            <span className="text-zenMuted group-hover:text-white transition-colors">Deep nested child extraction and division-by-zero math guards.</span>
                        </a>
                    </div>
                </section>

                {/* Playbook */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <span>📖</span> Intermediate API Concepts Playbook
                    </h2>
                    <p className="text-zenMuted mb-8">
                        Let's break down each of these core REST API concepts one by one. This is the exact playbook you need to handle how HackerRank expects you to manipulate data parameters on an intermediate exam.
                    </p>

                    <div className="space-y-12">
                        {/* 1. Consuming */}
                        <div className="min-w-0">
                            <h3 className="text-xl font-bold text-white mb-3">1. Consuming an API (The Foundation)</h3>
                            <p className="text-sm text-zenMuted mb-4">
                                Consuming an API means using JavaScript's native execution tools to make an asynchronous HTTP network request to a remote server, waiting for the server to reply, and converting that raw data stream into a usable JavaScript object.
                            </p>
                            <CodeBlock code={`async function fetchSingleProduct(productId) {
    const url = \`https://api.freeapi.app/api/v1/public/products/\${productId}\`;
    try {
        const response = await fetch(url);
        
        // Defensive check: Did the server return a 200 OK status?
        if (!response.ok) {
            throw new Error(\`HTTP error! Status: \${response.status}\`);
        }
        
        const payload = await response.json();
        return payload.data; // Return the inner data object
    } catch (error) {
        console.error("Fetch failed:", error.message);
        return null;
    }
}`} />
                        </div>

                        {/* 2. Filtering & Searching */}
                        <div className="min-w-0">
                            <h3 className="text-xl font-bold text-white mb-3">2. Filtering & Searching</h3>
                            <p className="text-sm text-zenMuted mb-4">
                                Instead of downloading every single piece of data and filtering it inside your JavaScript code using array methods (which causes major performance issues and test timeouts), you pass keys and values inside the URL query string to tell the server to filter the database before sending it to you.
                            </p>
                            <ul className="list-disc list-inside text-sm text-zenMuted mb-4 ml-2 space-y-2">
                                <li><strong>Searching:</strong> Uses query parameters like <code>?search=mouse</code> or <code>?q=laptop</code> to match text across fields.</li>
                                <li><strong>Filtering:</strong> Uses specific key-value keys like <code>?category=electronics</code> or <code>?price=50</code> to pinpoint exact constraints.</li>
                            </ul>
                            <CodeBlock code={`async function searchElectronics(searchTerm) {
    // Combining searching and filtering parameters together using '&'
    const url = \`https://api.freeapi.app/api/v1/public/products?category=electronics&search=\${searchTerm}\`;
    
    try {
        const response = await fetch(url);
        const payload = await response.json();
        return payload.data.data; // Returns only the matching electronics array
    } catch (error) {
        return [];
    }
}`} />
                        </div>

                        {/* 3. Sorting */}
                        <div className="min-w-0">
                            <h3 className="text-xl font-bold text-white mb-3">3. Sorting (Single & Multi-Column)</h3>
                            <p className="text-sm text-zenMuted mb-4">
                                Sorting tells the API server the exact order in which you want the records returned.
                            </p>
                            <ul className="list-disc list-inside text-sm text-zenMuted mb-4 ml-2 space-y-2">
                                <li><strong>Single Sorting:</strong> Typically uses query parameters like <code>?sortBy=price&order=asc</code>.</li>
                                <li><strong>Multi-Column Sort:</strong> Advanced APIs allow sorting by multiple conditions simultaneously using comma-separated lists like <code>?sort=category,price&order=asc,desc</code>.</li>
                            </ul>
                            <CodeBlock code={`async function getSortedInventory(sortColumn, sortOrder) {
    // Example: sortColumn = "price", sortOrder = "desc"
    const url = \`https://api.freeapi.app/api/v1/public/products?sortBy=\${sortColumn}&order=\${sortOrder}\`;
    
    try {
        const response = await fetch(url);
        const payload = await response.json();
        return payload.data.data;
    } catch (error) {
        return [];
    }
}`} />
                        </div>

                        {/* 4. Pagination */}
                        <div className="min-w-0">
                            <h3 className="text-xl font-bold text-white mb-3">4. Pagination (Offset-Based)</h3>
                            <p className="text-sm text-zenMuted mb-4">
                                An API server cannot send thousands of items in a single response without crashing your application. It uses Offset Pagination to break the data down into pages. You control offset pagination using two fundamental query parameters:
                            </p>
                            <ul className="list-disc list-inside text-sm text-zenMuted mb-4 ml-2 space-y-2">
                                <li><code>page</code>: The current index chunk you want to look at (Page 1, Page 2, etc.).</li>
                                <li><code>limit</code> (or <code>per_page</code>): How many records should exist inside that single page chunk.</li>
                            </ul>
                            <div className="mb-4 bg-zenPanel p-3 rounded-lg border border-zenBorder text-center font-mono text-[#00EA64]">
                                Offset = (page - 1) × limit
                            </div>
                            <CodeBlock code={`async function getInventoryPage(pageNumber, itemsPerPage) {
    const url = \`https://api.freeapi.app/api/v1/public/products?page=\${pageNumber}&limit=\${itemsPerPage}\`;
    
    try {
        const response = await fetch(url);
        const payload = await response.json();
        
        // Always examine the structural metadata returned alongside the data array!
        return {
            items: payload.data.data,
            totalPages: payload.data.totalPages,
            hasNextPage: payload.data.hasNextPage
        };
    } catch (error) {
        return { items: [], totalPages: 1, hasNextPage: false };
    }
}`} />
                        </div>
                    </div>
                </section>

                {/* Practice Task */}
                <section className="mb-16">
                    <div className="bg-gradient-to-br from-[#00EA64]/10 to-transparent border border-[#00EA64]/30 rounded-2xl p-8 min-w-0">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span>🏋️</span> Practice Task: Pulling It All Together
                        </h2>
                        <p className="text-zenMuted mb-6">Let's test your ability to construct a clean, combined query string. This simulates an exact requirement you might face on a HackerRank test.</p>
                        
                        <div className="bg-zenSidebar/80 rounded-xl p-5 mb-6 border border-zenBorder min-w-0">
                            <h3 className="text-lg font-bold text-white mb-2">The Problem</h3>
                            <p className="text-sm text-zenMuted mb-3">Write an asynchronous function <code>getPremiumLaptops(pageNumber)</code> that fetches data from the freeapi.app public products endpoint. It must look for items matching these combined criteria via the URL parameters:</p>
                            <ul className="list-disc list-inside text-sm text-zenMuted space-y-1">
                                <li>The search term must be <strong>"laptop"</strong>.</li>
                                <li>The items must be sorted by <strong>"price"</strong> in <strong>"desc"</strong> (descending) order.</li>
                                <li>It should fetch the specific <code>pageNumber</code> passed into the function, with a strict limit of <strong>5 items per page</strong>.</li>
                            </ul>
                        </div>

                        <div className="min-w-0 w-full relative">
                            <div className="absolute -top-3 left-4 bg-zenSidebar px-2 py-0.5 text-xs font-mono text-[#00EA64] border border-[#00EA64]/30 rounded-md shadow-md z-20">✅ Verified Solution</div>
                            <div className="pt-2 min-w-0">
                                <CodeBlock code={`async function getPremiumLaptops(pageNumber) {
    const baseURL = "https://api.freeapi.app/api/v1/public/products";
    
    // FIXED: Removed the extra / and the duplicate ? before sortBy
    const url = \`\${baseURL}?search=laptop&sortBy=price&order=desc&page=\${pageNumber}&limit=5\`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(\`HTTP Error: \${response.status}\`);
            return [];
        }
        
        const payload = await response.json();
        return payload.data.data; 
    } catch (error) {
        console.error("Network error:", error);
        return [];
    }
}

// --- TEST CASE ---
(async () => {
    console.log("Requesting premium laptops...");
    const luxuryLaptops = await getPremiumLaptops(1);
    console.log("Resulting Items:", luxuryLaptops);
})();`} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Star Concept: URI Encoding */}
                <section className="mb-10">
                    <div className="border border-purple-500/30 bg-purple-500/5 rounded-2xl p-8 relative overflow-hidden min-w-0">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full"></div>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                            <span>⭐</span> What is encodeURIComponent() and Why is it Used?
                        </h2>
                        
                        <div className="space-y-4 text-sm text-zenMuted relative z-10">
                            <p>
                                <code>encodeURIComponent()</code> is a built-in JavaScript function used to safely encode a string for use as part of a URL query string or parameter.
                            </p>
                            <p>
                                When you pass data into a URL (like a football competition name or a medical diagnosis), that data often contains special characters such as spaces, ampersands (<code>&amp;</code>), question marks (<code>?</code>), or slashes (<code>/</code>). In a URL, these characters have special structural meanings:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>A <strong>space</strong> ( ) can break the URL stream or get corrupted.</li>
                                <li>An <strong>ampersand</strong> (<code>&amp;</code>) tells the server a new parameter is starting.</li>
                            </ul>
                            <p className="p-3 bg-zenPanel border border-zenBorder rounded-lg">
                                If a user or a test database searches for an item like <span className="text-white">"UEFA Champions League"</span> (which has spaces) or <span className="text-white">"Plague & Fever"</span> (which has an ampersand), pasting it raw into a template literal breaks the HTTP request format. <code>encodeURIComponent()</code> fixes this by turning those illegal characters into safe UTF-8 escape sequences (e.g., spaces become <code>%20</code>, <code>&amp;</code> becomes <code>%26</code>).
                            </p>
                        </div>

                        <h3 className="text-lg font-bold text-white mt-8 mb-4 relative z-10">In Which Files of Your Repository is it Used?</h3>
                        <p className="text-sm text-zenMuted mb-6 relative z-10">Based on your public repository, <a href="https://github.com/AVI-GITHUB105/hackerrank-rest-api-intermediate-prep-kit" target="_blank" rel="noreferrer" className="text-purple-400 hover:underline hover:text-purple-300">hackerrank-rest-api-intermediate-prep-kit</a>, you have utilized this concept in two specific challenges to prevent runtime API breakage:</p>

                        <div className="grid gap-6 relative z-10 min-w-0">
                            {/* File 1 */}
                            <div className="bg-zenPanel rounded-xl border border-zenBorder p-5 min-w-0 w-full overflow-hidden">
                                <h4 className="font-bold text-white mb-2 text-sm border-b border-zenBorder pb-2">1. <code>03-football-competition-winners-goals.js</code></h4>
                                <p className="text-xs text-zenMuted mb-3">Football competitions often have spaces in their names (e.g., "UEFA Champions League"). If you don't wrap them, the URL truncates at the first space.</p>
                                <CodeBlock code={`const url = \`\${baseurl1}?competition=\${encodeURIComponent(competition)}&year=\${year}&team1=\${encodeURIComponent(winner)}&page=\${page1}\`;

// 💡 Real-World Transformation:
// If competition = "UEFA Champions League"
// Raw template literal:  .../api/football_matches?competition=UEFA Champions League&year=2011
// With encodeURIComponent: .../api/football_matches?competition=UEFA%20Champions%20League&year=2011`} />
                            </div>

                            {/* File 2 */}
                            <div className="bg-zenPanel rounded-xl border border-zenBorder p-5 min-w-0 w-full overflow-hidden">
                                <h4 className="font-bold text-white mb-2 text-sm border-b border-zenBorder pb-2">2. <code>04-medical-records-average-pulse.js</code></h4>
                                <p className="text-xs text-zenMuted mb-3">Medical diagnoses frequently contain spaces or hyphens (e.g., "Pulmonary embolism"). Sanitizing this input ensures the request securely reaches the endpoint.</p>
                                <CodeBlock code={`const url = \`\${baseurl}?doctor.id=\${doctor_id}&diagnosis.name=\${encodeURIComponent(diagnosis_name)}&page=\${page}\`;

// 💡 Real-World Transformation:
// If diagnosis_name = "Pulmonary embolism"
// Becomes: ...&diagnosis.name=Pulmonary%20embolism&page=1`} />
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-red-900/20 border border-red-500/30 rounded-xl relative z-10">
                            <h4 className="font-bold text-red-400 mb-1 text-sm flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                Where It Is NOT Needed
                            </h4>
                            <p className="text-xs text-red-200/70">
                                You do not need to use it on numbers (like <code>year</code> or <code>page</code>) or strict single-word alphanumeric strings, because those characters are already completely safe for standard URL pathing. Use it strictly on variables holding dynamic user inputs or strings containing potential whitespace and symbols!
                            </p>
                        </div>
                    </div>
                </section>

                <div className="text-center mt-12 pb-8">
                    <button 
                        onClick={onGoToHome}
                        className="px-8 py-3 bg-zenSidebar border border-zenBorder hover:border-zenAccent hover:text-white text-zenMuted rounded-full transition-all duration-300 mb-12"
                    >
                        Return to Dashboard
                    </button>

                    {/* HackerRank Footer Shoutout */}
                    <div className="border-t border-zenBorder/50 pt-8">
                        <p className="text-sm text-zenMuted/80 max-w-3xl mx-auto">
                            The certification track proudly directs students to the official <a href="https://www.hackerrank.com/skills-verification/rest_api_intermediate" target="_blank" rel="noopener noreferrer" className="text-[#00EA64] hover:underline font-semibold">HackerRank REST API (Intermediate) Certificate</a>. Full credit and gratitude goes to HackerRank for providing this excellent industry-standard skills verification platform.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
