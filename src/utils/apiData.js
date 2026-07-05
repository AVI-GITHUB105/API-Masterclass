import { getEndpointContent } from './content.js';

const BASE_URL = 'https://api.freeapi.app/api/v1';

export const endpointGroups = {
    "Public API": [
        'GET /public/randomusers',
        'GET /public/randomusers/{userId}',
        'GET /public/randomusers/user/random',
        'GET /public/randomproducts',
        'GET /public/randomproducts/{productId}',
        'GET /public/randomproducts/product/random',
        'GET /public/randomjokes',
        'GET /public/randomjokes/{jokeId}',
        'GET /public/randomjokes/joke/random',
        'GET /public/books',
        'GET /public/books/{bookId}',
        'GET /public/books/book/random',
        'GET /public/stocks',
        'GET /public/stocks/{stockSymbol}',
        'GET /public/stocks/stock/random',
        'GET /public/quotes',
        'GET /public/quotes/{quoteId}',
        'GET /public/quotes/quote/random',
        'GET /public/meals',
        'GET /public/meals/{mealId}',
        'GET /public/meals/meal/random',
        'GET /public/dogs',
        'GET /public/dogs/{dogId}',
        'GET /public/dogs/dog/random',
        'GET /public/cats',
        'GET /public/cats/{catId}',
        'GET /public/cats/cat/random',
        'GET /public/youtube/channel',
        'GET /public/youtube/videos',
        'GET /public/youtube/videos/{videoId}',
        'GET /public/youtube/comments/{videoId}',
        'GET /public/youtube/related/{videoId}',
        'GET /public/youtube/playlists',
        'GET /public/youtube/playlists/{playlistId}'
    ],
    "Kitchen Sink": [
        'GET /kitchen-sink/http-methods/get',
        'POST /kitchen-sink/http-methods/post',
        'PUT /kitchen-sink/http-methods/put',
        'PATCH /kitchen-sink/http-methods/patch',
        'DELETE /kitchen-sink/http-methods/delete',
        'GET /kitchen-sink/status-codes',
        'GET /kitchen-sink/status-codes/{statusCode}',
        'GET /kitchen-sink/request/headers',
        'GET /kitchen-sink/request/ip',
        'GET /kitchen-sink/request/user-agent',
        'GET /kitchen-sink/request/path-variable/{pathVariable}',
        'GET /kitchen-sink/request/query-parameter',
        'GET /kitchen-sink/response/headers',
        'GET /kitchen-sink/response/cache/{timeToLive}/{cacheResponseDirective}',
        'GET /kitchen-sink/response/html',
        'GET /kitchen-sink/response/xml',
        'GET /kitchen-sink/response/gzip',
        'GET /kitchen-sink/response/brotli',
        'GET /kitchen-sink/cookies/get',
        'POST /kitchen-sink/cookies/set',
        'DELETE /kitchen-sink/cookies/remove',
        'GET /kitchen-sink/redirect/to',
        'GET /kitchen-sink/image/jpeg',
        'GET /kitchen-sink/image/jpg',
        'GET /kitchen-sink/image/png',
        'GET /kitchen-sink/image/webp',
        'GET /kitchen-sink/image/svg'
    ],
    "Authentication": [
        'GET /users/google',
        'GET /users/google/callback',
        'GET /users/github',
        'GET /users/github/callback',
        'GET /users/current-user',
        'GET /users/verify-email/{verificationToken}',
        'POST /users/register',
        'POST /users/login',
        'POST /users/logout',
        'POST /users/refresh-token',
        'POST /users/assign-role/{userId}',
        'POST /users/resend-email-verification',
        'POST /users/change-password',
        'POST /users/forgot-password',
        'POST /users/reset-password/{resetToken}',
        'PATCH /users/avatar'
    ],
    "Ecommerce": [
        'GET /ecommerce/profile',
        'PATCH /ecommerce/profile',
        'GET /ecommerce/profile/my-orders',
        'GET /ecommerce/products',
        'POST /ecommerce/products',
        'GET /ecommerce/products/{productId}',
        'DELETE /ecommerce/products/{productId}',
        'PATCH /ecommerce/products/{productId}',
        'GET /ecommerce/products/category/{categoryId}',
        'PATCH /ecommerce/products/remove/subimage/{productId}/{subImageId}',
        'GET /ecommerce/cart',
        'POST /ecommerce/cart/item/{productId}',
        'DELETE /ecommerce/cart/item/{productId}',
        'DELETE /ecommerce/cart/clear',
        'GET /ecommerce/categories',
        'POST /ecommerce/categories',
        'GET /ecommerce/categories/{categoryId}',
        'DELETE /ecommerce/categories/{categoryId}',
        'PATCH /ecommerce/categories/{categoryId}',
        'GET /ecommerce/coupons',
        'POST /ecommerce/coupons',
        'GET /ecommerce/coupons/customer/available',
        'GET /ecommerce/coupons/{couponId}',
        'DELETE /ecommerce/coupons/{couponId}',
        'PATCH /ecommerce/coupons/{couponId}',
        'POST /ecommerce/coupons/c/apply',
        'POST /ecommerce/coupons/c/remove',
        'PATCH /ecommerce/coupons/status/{couponId}',
        'GET /ecommerce/addresses',
        'POST /ecommerce/addresses',
        'GET /ecommerce/addresses/{addressId}',
        'DELETE /ecommerce/addresses/{addressId}',
        'PATCH /ecommerce/addresses/{addressId}',
        'GET /ecommerce/orders/list/admin',
        'GET /ecommerce/orders/{orderId}',
        'POST /ecommerce/orders/provider/razorpay',
        'POST /ecommerce/orders/provider/paypal',
        'POST /ecommerce/orders/provider/razorpay/verify-payment',
        'POST /ecommerce/orders/provider/paypal/verify-payment',
        'PATCH /ecommerce/orders/status/{orderId}'
    ],
    "Todos": [
        'GET /todos',
        'GET /todos/{todoId}',
        'DELETE /todos/{todoId}',
        'PATCH /todos/{todoId}',
        'POST /todos/',
        'PATCH /todos/toggle/status/{todoId}'
    ],
    "Social Media": [
        'GET /social-media/profile',
        'PATCH /social-media/profile',
        'GET /social-media/profile/u/{username}',
        'PATCH /social-media/profile/cover-image',
        'GET /social-media/posts',
        'POST /social-media/posts',
        'GET /social-media/posts/{postId}',
        'DELETE /social-media/posts/{postId}',
        'PATCH /social-media/posts/{postId}',
        'GET /social-media/posts/get/my',
        'GET /social-media/posts/get/u/{username}',
        'GET /social-media/posts/get/t/{tag}',
        'PATCH /social-media/posts/remove/image/{postId}/{imageId}',
        'POST /social-media/like/post/{postId}',
        'POST /social-media/like/comment/{commentId}',
        'GET /social-media/comments/post/{postId}',
        'POST /social-media/comments/post/{postId}',
        'DELETE /social-media/comments/{commentId}',
        'PATCH /social-media/comments/{commentId}',
        'GET /social-media/bookmarks',
        'POST /social-media/bookmarks/{postId}',
        'GET /social-media/follow/list/followers/{username}',
        'GET /social-media/follow/list/following/{username}',
        'POST /social-media/follow/{toBeFollowedUserId}'
    ]
};

export function generateEndpointData(id) {
    const [method, path] = id.split(' ');
    
    let fullUrlPath = path;
    
    if (path.includes('{stockSymbol}')) {
        fullUrlPath = path.replace('{stockSymbol}', 'AAPL');
    } else if (path.includes('{statusCode}')) {
        fullUrlPath = path.replace('{statusCode}', '404');
    } else if (path.includes('{timeToLive}')) {
        fullUrlPath = path.replace('{timeToLive}/{cacheResponseDirective}', '60/public');
    } else if (path.includes('{verificationToken}')) {
        fullUrlPath = path.replace('{verificationToken}', 'dummy-token');
    } else if (path.includes('{resetToken}')) {
        fullUrlPath = path.replace('{resetToken}', 'dummy-reset-token');
    } else if (path.includes('{username}')) {
        fullUrlPath = path.replace('{username}', 'johndoe');
    } else if (path.includes('{tag}')) {
        fullUrlPath = path.replace('{tag}', 'coding');
    } else if (path.includes('{')) {
        fullUrlPath = path.replace(/\{[^}]+\}/g, '1');
    }
    
    const url = `${BASE_URL}${fullUrlPath}`;
    
    const pathParts = path.split('/');
    const firstSegment = pathParts[1];
    const baseUrl = `${BASE_URL}/${firstSegment}/`;

    const isKitchenSink = path.startsWith('/kitchen-sink');
    const isAuth = path.startsWith('/users');
    const isEcommerce = path.startsWith('/ecommerce');
    const isTodos = path.startsWith('/todos');
    const isSocialMedia = path.startsWith('/social-media');

    let fetchOptions = [];
    if (isKitchenSink || isAuth || isEcommerce || isTodos || isSocialMedia) {
        fetchOptions.push(`headers: {\n    'Authorization': 'Bearer YOUR_API_KEY_HERE',\n    'Content-Type': 'application/json'\n  }`);
    }
    if (method !== 'GET') {
        fetchOptions.push(`method: '${method}'`);
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            fetchOptions.push(`body: JSON.stringify({ key: 'value' })`);
        }
    }
    
    let jsCode = '';
    if (fetchOptions.length > 0) {
        jsCode = `fetch('${url}', {\n  ${fetchOptions.join(',\n  ')}\n})\n  .then(res => res.json())\n  .then(data => console.log(data));`;
    } else {
        jsCode = `fetch('${url}')\n  .then(res => res.json())\n  .then(data => console.log(data));`;
    }
    
    let pyArgs = [`'${url}'`];
    if (isKitchenSink || isAuth || isEcommerce || isTodos || isSocialMedia) {
        pyArgs.push(`headers={'Authorization': 'Bearer YOUR_API_KEY_HERE', 'Content-Type': 'application/json'}`);
    }
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
        pyArgs.push(`json={'key': 'value'}`);
    }
    let pyCode = `import requests\n\nresponse = requests.${method.toLowerCase()}(${pyArgs.join(', ')})\nprint(response.json())`;

    const richContent = getEndpointContent(path, method);

    return {
        id: id,
        method: method,
        targetUrl: url,
        baseUrl: baseUrl,
        label: `${method} ${path}`,
        question: `Explore ${path} operations via ${method}.`,
        learnings: richContent.learnings,
        concept: richContent.concept,
        code: { js: jsCode, py: pyCode },
        template: {
            js: `// Fetch ${path} here...\n\nasync function execute() {\n  // Your code here\n}\n\nexecute();`,
            py: `# Fetch ${path} here...\n\ndef execute():\n  # Your code here\n  pass\n\nexecute()`
        },
        validateRegex: new RegExp(url.replace(/\//g, '\\/'), 'i'),
        successStatus: 200,
        successMethodCheck: (code) => {
            if (method !== 'GET') {
                return code.toLowerCase().includes(`method: '${method.toLowerCase()}'`) || 
                       code.toLowerCase().includes(`method: "${method.toLowerCase()}"`) ||
                       code.toLowerCase().includes(`requests.${method.toLowerCase()}`);
            }
            return true;
        }
    };
}
