// content.js

export function getEndpointContent(path, method) {
    const isKitchenSink = path.startsWith('/kitchen-sink');
    
    // ----------------------------------------------------
    // KITCHEN SINK: HTTP METHODS
    // ----------------------------------------------------
    if (path.includes('/http-methods/get')) {
        return {
            learnings: [
                "What the GET method is used for in REST.",
                "Why GET requests should be idempotent and safe.",
                "How to pass data in GET requests using Query Parameters."
            ],
            concept: `
                <p class="mb-2">The <strong>GET</strong> method is the most common HTTP verb. It is used exclusively to <strong>retrieve</strong> data from a server without modifying it.</p>
                <p class="mb-2">In REST, GET requests must be <em>safe</em> and <em>idempotent</em>. This means you can call a GET endpoint 100 times, and it will never change the database state.</p>
                <div class="bg-zenSidebar p-3 rounded mt-2 border border-zenBorder">
                    <p class="text-zenAccent font-mono text-xs mb-1">Interview Question:</p>
                    <p class="text-sm">Can a GET request have a body?</p>
                    <p class="text-sm text-zenMuted mt-1">Technically yes, but it is heavily discouraged. Proxies and servers often drop GET bodies. Instead, use URL Query Parameters (e.g., <code>?limit=10&sort=asc</code>) for filtering data.</p>
                </div>
            `
        };
    }

    if (path.includes('/http-methods/post')) {
        return {
            learnings: [
                "How to create new resources using POST.",
                "Why POST is NOT idempotent.",
                "Formatting JSON payloads in the request body."
            ],
            concept: `
                <p class="mb-2">The <strong>POST</strong> method is used to <strong>create</strong> new resources on the server (like signing up a new user or creating a post).</p>
                <p class="mb-2">Unlike GET, POST is <strong>not idempotent</strong>. If you send the same POST request twice, you will create two separate records in the database.</p>
                <p class="mb-2">Data is securely transmitted inside the Request Body, usually formatted as JSON. You must set the <code>Content-Type: application/json</code> header so the server knows how to parse it.</p>
            `
        };
    }

    if (path.includes('/http-methods/put')) {
        return {
            learnings: [
                "How PUT completely replaces an existing resource.",
                "The concept of Idempotency in database updates.",
                "When to choose PUT vs PATCH."
            ],
            concept: `
                <p class="mb-2">The <strong>PUT</strong> method is used to <strong>replace</strong> a target resource entirely.</p>
                <p class="mb-2">If you send a PUT request to update a user's name but forget to include their age in the payload, the server will replace the user object and their age will be deleted! PUT requires the <em>entire</em> object.</p>
                <div class="bg-zenSidebar p-3 rounded mt-2 border border-zenBorder">
                    <p class="text-zenAccent font-mono text-xs mb-1">Idempotency:</p>
                    <p class="text-sm">PUT is idempotent. Calling it once or 1,000 times with the same payload results in the exact same state on the server.</p>
                </div>
            `
        };
    }

    if (path.includes('/http-methods/patch')) {
        return {
            learnings: [
                "How PATCH performs partial updates.",
                "Bandwidth efficiency of PATCH.",
                "Why PATCH is not strictly idempotent."
            ],
            concept: `
                <p class="mb-2">The <strong>PATCH</strong> method applies <strong>partial modifications</strong> to a resource.</p>
                <p class="mb-2">Unlike PUT, if you only want to update a user's email, you only send the email field in the payload. The server will merge this change without touching the other fields.</p>
                <p class="mb-2 text-zenMuted">Industry tip: PATCH is highly preferred in modern APIs for large objects because it saves bandwidth and prevents accidental data wiping.</p>
            `
        };
    }

    if (path.includes('/http-methods/delete')) {
        return {
            learnings: [
                "How to remove resources using DELETE.",
                "Handling Soft Deletes vs Hard Deletes.",
                "Standard DELETE response codes (200 vs 204)."
            ],
            concept: `
                <p class="mb-2">The <strong>DELETE</strong> method is used to permanently remove a resource from the server.</p>
                <p class="mb-2">In enterprise applications, developers often use "Soft Deletes"—meaning the record isn't actually destroyed in the database, but a flag like <code>is_deleted = true</code> is set.</p>
                <p class="mb-2">Standard APIs will return a <code>204 No Content</code> status if the deletion was successful and there is no data left to return.</p>
            `
        };
    }

    // ----------------------------------------------------
    // KITCHEN SINK: STATUS CODES
    // ----------------------------------------------------
    if (path.includes('/status-codes')) {
        return {
            learnings: [
                "Understanding the 5 families of HTTP Status Codes.",
                "Difference between 4xx and 5xx errors.",
                "How client applications use status codes to trigger UI states."
            ],
            concept: `
                <p class="mb-2">HTTP Status Codes tell your client whether a specific HTTP request has been successfully completed. They are grouped into 5 classes:</p>
                <ul class="list-disc ml-5 mb-2 text-sm text-zenMuted space-y-1 mt-2">
                    <li><strong class="text-blue-400">1xx (Informational):</strong> Request received, continuing process.</li>
                    <li><strong class="text-green-400">2xx (Success):</strong> The action was successfully received and accepted (e.g., 200 OK, 201 Created).</li>
                    <li><strong class="text-yellow-400">3xx (Redirection):</strong> Further action must be taken (e.g., 301 Moved Permanently).</li>
                    <li><strong class="text-red-400">4xx (Client Error):</strong> You made a mistake! (e.g., 400 Bad Request, 404 Not Found).</li>
                    <li><strong class="text-purple-400">5xx (Server Error):</strong> The backend crashed! (e.g., 500 Internal Server Error).</li>
                </ul>
            `
        };
    }

    // ----------------------------------------------------
    // KITCHEN SINK: COOKIES
    // ----------------------------------------------------
    if (path.includes('/cookies')) {
        return {
            learnings: [
                "How browsers handle state management using Cookies.",
                "The Set-Cookie HTTP header.",
                "Security flags: HttpOnly and Secure."
            ],
            concept: `
                <p class="mb-2">HTTP is a <strong>stateless</strong> protocol. To remember users between requests, servers send a <code>Set-Cookie</code> header.</p>
                <p class="mb-2">The browser automatically stores this cookie and attaches it to every subsequent request to that domain.</p>
                <div class="bg-zenSidebar p-3 rounded mt-2 border border-zenBorder">
                    <p class="text-zenAccent font-mono text-xs mb-1">Security Best Practice:</p>
                    <p class="text-sm">Always flag authentication cookies as <code>HttpOnly</code>. This prevents malicious JavaScript (XSS attacks) from reading your users' session tokens!</p>
                </div>
            `
        };
    }

    // ----------------------------------------------------
    // KITCHEN SINK: HEADERS & PARAMS
    // ----------------------------------------------------
    if (path.includes('/request/headers') || path.includes('/response/headers')) {
        return {
            learnings: [
                "What HTTP Headers are and why they matter.",
                "Authorization via Bearer tokens.",
                "Content Negotiation (Accept vs Content-Type)."
            ],
            concept: `
                <p class="mb-2"><strong>Headers</strong> are key-value pairs sent alongside the request/response body. They represent the "metadata" of the request.</p>
                <p class="mb-2">Common headers include <code>User-Agent</code> (identifying your browser), <code>Authorization</code> (proving who you are), and <code>Accept</code> (telling the server you want JSON instead of XML).</p>
            `
        };
    }

    if (path.includes('query-parameter')) {
        return {
            learnings: [
                "Appending query strings to URLs.",
                "Implementing filtering, sorting, and pagination.",
                "URL encoding special characters."
            ],
            concept: `
                <p class="mb-2">Query Parameters are key-value pairs appended to the end of a URL after a question mark (<code>?</code>).</p>
                <p class="mb-2">Example: <code>/users?role=admin&limit=10</code></p>
                <p class="mb-2">They are heavily used in GET requests to filter large databases, paginate through results, or sort data before it arrives at the client.</p>
            `
        };
    }

    // ----------------------------------------------------
    // KITCHEN SINK: CACHING
    // ----------------------------------------------------
    if (path.includes('/cache')) {
        return {
            learnings: [
                "Reducing server load with Edge Caching (CDNs).",
                "The Cache-Control header.",
                "Understanding Time-to-Live (TTL)."
            ],
            concept: `
                <p class="mb-2">Caching allows browsers or CDNs to store a copy of the response. If you ask for the same data again, it serves the cached copy instantly instead of hitting the database!</p>
                <p class="mb-2">Servers control this using the <code>Cache-Control</code> header (e.g., <code>Cache-Control: public, max-age=3600</code> meaning it can be cached anywhere for 1 hour).</p>
            `
        };
    }

    // ----------------------------------------------------
    // PUBLIC API: COLLECTIONS (GET LISTS)
    // ----------------------------------------------------
    if (path.endsWith('s') && !path.includes('{')) {
        // e.g. /public/randomusers, /public/randomproducts
        const resourceName = path.split('/')[2];
        return {
            learnings: [
                `Fetching an array collection of ${resourceName}.`,
                "Mapping over JSON arrays in the frontend.",
                "Understanding the FreeAPI standard response wrapper."
            ],
            concept: `
                <p class="mb-2">This is a standard <strong>Collection Endpoint</strong>. It returns an array of multiple records.</p>
                <p class="mb-2">In the real world, you would use this endpoint to populate a table, a list, or a grid in your UI. The response will be wrapped in a standard JSON format like <code>{ success: true, data: [...] }</code>.</p>
            `
        };
    }

    // ----------------------------------------------------
    // PUBLIC API: SINGLE RESOURCE BY ID
    // ----------------------------------------------------
    if (path.includes('{')) {
        // e.g. /public/randomusers/{userId}
        return {
            learnings: [
                "Extracting specific resources using Path Variables.",
                "Handling 404 Not Found errors if the ID doesn't exist.",
                "Routing concepts in REST APIs."
            ],
            concept: `
                <p class="mb-2">This endpoint uses a <strong>Path Variable</strong> (e.g., <code>/users/123</code>). It is designed to fetch one specific record from the database using its unique Identifier (ID).</p>
                <p class="mb-2 text-zenMuted">Industry Tip: If you request an ID that doesn't exist, a well-designed REST API will return a <code>404 Not Found</code> status code, which you should catch and display gracefully in your UI.</p>
            `
        };
    }

    // ----------------------------------------------------
    // AUTHENTICATION
    // ----------------------------------------------------
    if (path.includes('/users/login') || path.includes('/users/register')) {
        return {
            learnings: [
                "Implementing User Registration and Login.",
                "How to securely hash passwords (bcrypt).",
                "Receiving and storing JWT Authentication Tokens."
            ],
            concept: `
                <p class="mb-2">Authentication is the process of verifying <em>who</em> a user is. When you <strong>Register</strong> or <strong>Login</strong>, you send credentials (email and password) to the server.</p>
                <p class="mb-2">A secure backend will <em>never</em> store plain-text passwords. They use hashing algorithms like <code>bcrypt</code>.</p>
                <div class="bg-zenSidebar p-3 rounded mt-2 border border-zenBorder">
                    <p class="text-zenAccent font-mono text-xs mb-1">Interview Question:</p>
                    <p class="text-sm">What happens after a successful login?</p>
                    <p class="text-sm text-zenMuted mt-1">The server generates a secure <strong>JSON Web Token (JWT)</strong> or a Session Cookie and sends it back to the client. The client must attach this token to all future requests to prove they are logged in.</p>
                </div>
            `
        };
    }

    if (path.includes('/users/google') || path.includes('/users/github')) {
        return {
            learnings: [
                "Understanding the OAuth2 Flow.",
                "Delegated Authentication (SSO).",
                "Handling redirects and callbacks."
            ],
            concept: `
                <p class="mb-2"><strong>OAuth2</strong> (Single Sign-On) allows users to log in using third-party providers like Google or GitHub instead of creating a new password.</p>
                <p class="mb-2">The flow involves redirecting the user to Google's consent screen. Once approved, Google redirects them back to your <code>/callback</code> endpoint with an authorization code, which your server exchanges for user details.</p>
            `
        };
    }

    if (path.includes('/refresh-token')) {
        return {
            learnings: [
                "The difference between Access Tokens and Refresh Tokens.",
                "Why Access Tokens have short lifespans (TTL).",
                "Implementing silent authentication."
            ],
            concept: `
                <p class="mb-2">For security, <strong>Access Tokens</strong> usually expire very quickly (e.g., 15 minutes). If an attacker steals it, their access is limited.</p>
                <p class="mb-2">To prevent the user from having to log in every 15 minutes, servers issue a long-lived <strong>Refresh Token</strong> (often stored in an <code>HttpOnly</code> cookie). When the Access Token expires, the client hits this <code>/refresh-token</code> endpoint to get a new one seamlessly!</p>
            `
        };
    }

    if (path.includes('/reset-password') || path.includes('/forgot-password')) {
        return {
            learnings: [
                "Implementing secure password recovery flows.",
                "Using cryptographic reset tokens.",
                "Time-limited tokens for security."
            ],
            concept: `
                <p class="mb-2">Password recovery is a critical security flow. When a user forgets their password, the server generates a cryptographically secure, time-limited token (e.g., valid for 1 hour) and emails them a link containing the token.</p>
                <p class="mb-2">The client extracts the <code>{resetToken}</code> from the URL and sends it in the <code>POST /users/reset-password</code> request alongside the new password.</p>
            `
        };
    }

    if (path.includes('users/')) {
        return {
            learnings: [
                "Managing user profiles.",
                "Role-Based Access Control (RBAC).",
                "Verifying email addresses."
            ],
            concept: `
                <p class="mb-2">This is an authenticated user operations endpoint.</p>
                <p class="mb-2">Endpoints like <code>/assign-role</code> rely on <strong>Role-Based Access Control (RBAC)</strong>. The backend checks if the logged-in user holds the 'Admin' role before allowing them to assign roles to others.</p>
            `
        };
    }

    // ----------------------------------------------------
    // ECOMMERCE
    // ----------------------------------------------------
    if (path.includes('/ecommerce/cart')) {
        return {
            learnings: [
                "Managing shopping cart state in a backend.",
                "Transactional endpoint flows.",
                "Using DELETE to clear collections vs specific items."
            ],
            concept: `
                <p class="mb-2">Shopping Carts are the backbone of e-commerce. They represent a temporary, mutable collection of items tied to a specific user session.</p>
                <p class="mb-2">In the frontend, when a user clicks "Add to Cart", you don't just update the UI—you must simultaneously hit a <code>POST</code> endpoint to secure the item in the backend database (or Redis cache). If you don't do this, the cart will vanish if the user refreshes!</p>
            `
        };
    }

    if (path.includes('/ecommerce/orders/provider/')) {
        return {
            learnings: [
                "Integrating Third-Party Payment Gateways.",
                "Handling Webhook Callbacks.",
                "Verifying payment signatures securely."
            ],
            concept: `
                <p class="mb-2">Handling payments yourself is a massive security risk. Modern apps use gateways like <strong>Stripe, PayPal, or Razorpay</strong>.</p>
                <p class="mb-2">The workflow: Your frontend requests an Order ID from your backend. You pass that Order ID to the Stripe/Razorpay SDK. The SDK handles the credit card securely and returns a token. You then send that token back to your backend (e.g., <code>/verify-payment</code>) to cryptographically ensure the payment was legit before unlocking the goods.</p>
            `
        };
    }

    if (path.includes('/ecommerce/coupons')) {
        return {
            learnings: [
                "Calculating dynamic pricing and discounts.",
                "Validating state (Is coupon expired? Is it applicable to this cart?).",
                "Using PATCH to toggle active/inactive states."
            ],
            concept: `
                <p class="mb-2">Coupons introduce dynamic state into an application. When a user applies a coupon, the server must validate it against a complex set of rules (expiration dates, minimum cart values, user restrictions).</p>
                <div class="bg-zenSidebar p-3 rounded mt-2 border border-zenBorder">
                    <p class="text-zenAccent font-mono text-xs mb-1">State Modification (PATCH):</p>
                    <p class="text-sm">Notice how toggling a coupon's status (Active/Inactive) uses a <code>PATCH</code> request? This is because you are only updating a single boolean field on the coupon object, rather than replacing the whole thing with <code>PUT</code>.</p>
                </div>
            `
        };
    }

    if (path.includes('/ecommerce/orders')) {
        return {
            learnings: [
                "Transitioning state from Cart to Order.",
                "Generating immutable transaction records.",
                "Handling Order Statuses (Pending, Shipped, Delivered)."
            ],
            concept: `
                <p class="mb-2">An <strong>Order</strong> is an immutable snapshot of a shopping cart at a specific point in time. Once a cart becomes an order, the prices and items must be locked in stone so they don't change if the database price updates tomorrow.</p>
                <p class="mb-2">Order endpoints often use <code>PATCH /status/{orderId}</code> to progress the state machine (e.g., changing status from 'Processing' to 'Shipped').</p>
            `
        };
    }

    if (path.includes('/ecommerce/')) {
        return {
            learnings: [
                "Managing multi-step transactional data.",
                "Linking nested objects (Products to Categories to Sub-images).",
                "CRUD operations on authenticated resource arrays (Addresses, Profiles)."
            ],
            concept: `
                <p class="mb-2">This endpoint is part of the Ecommerce module. Ecommerce APIs are notoriously complex because data is highly relational.</p>
                <p class="mb-2">A single <strong>Product</strong> is linked to a <strong>Category</strong>, contains multiple <strong>Images</strong>, and can be added to a <strong>Cart</strong>. Understanding how to pass these IDs back and forth between different endpoints is the core skill of building a store.</p>
            `
        };
    }

    // ----------------------------------------------------
    // TODOS (STATE MANAGEMENT)
    // ----------------------------------------------------
    if (path.includes('/todos')) {
        return {
            learnings: [
                "Basic CRUD operations (Create, Read, Update, Delete).",
                "Frontend State Management.",
                "Optimistic vs Pessimistic UI Updates."
            ],
            concept: `
                <p class="mb-2">Todos are the "Hello World" of full-stack development because they teach pure <strong>State Management</strong>.</p>
                <div class="bg-zenSidebar p-3 rounded mt-2 border border-zenBorder">
                    <p class="text-zenAccent font-mono text-xs mb-1">Optimistic Updating:</p>
                    <p class="text-sm">When a user clicks "Delete" on a Todo, a great frontend hides it from the screen <em>instantly</em> while the <code>DELETE</code> request fires in the background. This is called Optimistic Updating. If the API fails and returns a 500 error, you pop the Todo back onto the screen and show a toast notification!</p>
                </div>
            `
        };
    }

    // ----------------------------------------------------
    // SOCIAL MEDIA (NESTED DATA)
    // ----------------------------------------------------
    if (path.includes('/social-media/posts') || path.includes('/social-media/comments')) {
        return {
            learnings: [
                "Managing deeply nested relational data.",
                "Handling secondary and tertiary requests.",
                "Linking IDs (Post ID -> Comment ID -> User ID)."
            ],
            concept: `
                <p class="mb-2">Social Media APIs are notorious for <strong>Deeply Nested Data Trees</strong>.</p>
                <p class="mb-2">When you fetch a <code>Post</code>, it only contains an array of <code>Comment IDs</code>. To display the UI, your frontend must fire secondary requests to fetch the actual text for those Comments, and then tertiary requests to fetch the Avatars of the Users who wrote them!</p>
            `
        };
    }

    if (path.includes('/social-media/follow') || path.includes('/social-media/like')) {
        return {
            learnings: [
                "Handling N-to-N (Many-to-Many) relationships.",
                "Graph data structures in REST.",
                "Race conditions when double-clicking 'Like'."
            ],
            concept: `
                <p class="mb-2">Likes and Follows represent Many-to-Many relationships. A user can follow many people, and a person can have many followers.</p>
                <p class="mb-2">These endpoints often use simple <code>POST</code> requests with an empty body (or just passing the target ID in the URL) to create the relational link in the database.</p>
            `
        };
    }

    if (path.includes('/social-media/profile') || path.includes('/social-media/bookmarks')) {
        return {
            learnings: [
                "User-centric isolated data.",
                "Handling image uploads (multipart/form-data).",
                "Using PATCH for partial profile updates."
            ],
            concept: `
                <p class="mb-2">Profile endpoints often handle complex payloads like Images. While this mock API uses JSON, in the real world, updating a Cover Image requires sending a <code>multipart/form-data</code> request containing a binary Blob.</p>
            `
        };
    }

    // ----------------------------------------------------
    // FALLBACK
    // ----------------------------------------------------
    return {
        learnings: [
            "Constructing a standard HTTP request.",
            "Handling JSON parsing.",
            "Managing asynchronous promises."
        ],
        concept: `
            <p class="mb-2">This endpoint demonstrates standard REST API operations.</p>
            <p class="mb-2 text-zenMuted">Explore the generated code to see how to integrate this seamlessly into your frontend or backend architectures.</p>
        `
    };
}
