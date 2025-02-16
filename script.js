// Get existing users or initialize empty array
let userData = JSON.parse(localStorage.getItem('userData')) || [];

// Get current user from storage
const getCurrentUser = () => {
    const localUser = localStorage.getItem('currentUser');
    const sessionUser = sessionStorage.getItem('currentUser');
    return JSON.parse(localUser || sessionUser || null);
};

// Display current user if logged in
const currentUser = getCurrentUser();
if (currentUser) {
    console.log('Current logged in user:', currentUser);
}

// Create cart array in parent window if it doesn't exist
if (!window.parent.cart) {
    window.parent.cart = [];
}

// Add product to user's cart
const addToCart = (product) => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        showAlert('Please login first to add items to cart', 'error');
        return;
    }

    // Find user in userData array
    const userIndex = userData.findIndex(user => user.email === currentUser.email);
    if (userIndex === -1) {
        showAlert('User not found', 'error');
        return;
    }

    // Add product to user's cart
    userData[userIndex].cart.push(product);
    localStorage.setItem('userData', JSON.stringify(userData));

    // Sync with parent window cart
    window.parent.cart = userData[userIndex].cart;

    showAlert('Product added to cart successfully!', 'success');
};

const registerForm = document.querySelector('.register-form');
const loginForm = document.querySelector('.login-form');

// Initial sync of cart with parent window
const currentUserData = getCurrentUser();
if (currentUserData) {
    const userIndex = userData.findIndex(user => user.email === currentUserData.email);
    if (userIndex !== -1) {
        window.parent.cart = userData[userIndex].cart;
    }
}

registerForm?.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.querySelector('.register-form input[type="email"]').value;
    const password = document.querySelector('.register-form input[type="password"]:first-of-type').value;
    const confirmPassword = document.querySelector('.register-form input[type="password"]:last-of-type').value;
    const termsCheckbox = document.querySelector('.register-form input[type="checkbox"]');

    // Form validation
    if (!email || !password || !confirmPassword) {
        showAlert('Please fill in all fields', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
    }

    if (!termsCheckbox.checked) {
        showAlert('Please agree to the Terms & Conditions', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'error');
        return;
    }

    if (password.length < 6) {
        showAlert('Password must be at least 6 characters long', 'error');
        return;
    }

    // Check if email already exists
    if (userData.some(user => user.email === email)) {
        showAlert('Email already registered', 'error');
        return;
    }

    // Add new user
    const newUser = {
        email: email,
        password: hashPassword(password), // Hash password before storing
        createdAt: new Date().toISOString(),
        cart: []
    };

    userData.push(newUser);
    localStorage.setItem('userData', JSON.stringify(userData));
    showAlert('Registration successful!', 'success');
    window.location.href = 'login.html';
});

loginForm?.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.querySelector('.login-form input[type="email"]').value;
    const password = document.querySelector('.login-form input[type="password"]').value;
    const rememberMe = document.querySelector('.login-form input[type="checkbox"]').checked;

    // Form validation
    if (!email || !password) {
        showAlert('Please enter both email and password', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
    }

    // Check for admin credentials
    if (email === 'admin@gmail.com' && password === 'admin123') {
        const adminUser = {
            email: email,
            role: 'admin',
            loginTime: new Date().toISOString()
        };

        setUserSession(adminUser, rememberMe);
        showAlert('Admin login successful!', 'success');
        window.location.href = './Dashboard.html';
        return;
    }

    // Get stored user data and check credentials
    const storedUserData = JSON.parse(localStorage.getItem('userData')) || [];
    const user = storedUserData.find(user =>
        user.email === email && verifyPassword(password, user.password)
    );

    if (user) {
        const currentUser = {
            email: user.email,
            role: 'user',
            loginTime: new Date().toISOString()
        };

        setUserSession(currentUser, rememberMe);
        showAlert('Login successful!', 'success');
        window.location.href = './ecommerce.html';
    } else {
        showAlert('Invalid email or password', 'error');
    }
});

// Helper functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function hashPassword(password) {
    // In a real app, use a proper hashing algorithm
    return btoa(password); // Basic encoding for demo
}

function verifyPassword(password, hashedPassword) {
    return btoa(password) === hashedPassword;
}

function setUserSession(user, rememberMe) {
    if (rememberMe) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    }
}

function showAlert(message,) {
    // You can replace this with a better UI notification
    alert(message);
}

// Logout function
const logout = () => {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
};


const _0x4c5956 = _0x3d64; function _0xb7c4() { const _0x26ff8b = ['28gvKKds', 'American\x20Cream\x20&\x20Onion\x20Flavour', '906780BKrEfr', '/images/product-15.webp', 'Tuber\x20root', 'In\x20stock', '12801723JfIZiC', 'Cookies', '/images/product-16.webp', '200g', '/images/product-14.webp', '1242LjumxT', 'Foods', '2256jljuwl', '826080xosusw', 'Snacks', '766XvAVSV', '/images/product-6.webp', '/images/product-2.webp', '1941PDGcXs', '1kg', '/images/product-11.webp', '5kg', '/images/product-9.webp', '/images/product-5.webp', 'Mix\x20Snack', 'Vegetables', '/images/product-8.webp', 'Blue\x20berry', '752425LivmhD', 'Stick\x20Fiber\x20Masala\x20Magic', 'Sweet\x20Corn', '/images/product-3.webp', 'Out\x20of\x20stock', 'Natural\x20Hub\x20Cherry\x20Karonda', '4995FlLwyx', '1pcs', 'sale', '51065ESgFjB', 'Dried\x20Fruits', 'Golden\x20and\x20gloriously\x20sweet.\x20Zespri™\x20SunGold™\x20Kiwifruit\x20taste\x20delicious\x20with\x20a\x20sweet\x20and\x20juicy\x20flavour,\x20making\x20them\x20perfect\x20for\x20a\x20snack\x20or\x20breakfast.\x20Just\x201\x20Zespri™\x20SunGold™\x20Kiwifruit\x20provides\x20100%\x20of\x20your\x20daily\x20vitamin\x20C\x20needs,\x20contributing\x20to\x20a\x20healthy\x20immune\x20system.\x20They\x27re\x20also\x20Low\x20GI\x20and\x20Low\x20Fodmap.', '/images/product-4.webp', 'Mixed\x20Nuts\x20Berries\x20Pack', '1.5kg', 'Kamalam\x20Fruit', '/images/product-1.webp', '8pcs', '/images/product-12.webp', 'Fruit', 'Fresh\x20Fruit', 'new', 'Pineapple']; _0xb7c4 = function () { return _0x26ff8b; }; return _0xb7c4(); } function _0x3d64(_0x44a443, _0x433d0a) { const _0xb7c4b2 = _0xb7c4(); return _0x3d64 = function (_0x3d64c9, _0x581e9d) { _0x3d64c9 = _0x3d64c9 - 0x1b6; let _0x567801 = _0xb7c4b2[_0x3d64c9]; return _0x567801; }, _0x3d64(_0x44a443, _0x433d0a); } (function (_0x3caadd, _0x4efd16) { const _0x45ac5c = _0x3d64, _0x5dfea0 = _0x3caadd(); while (!![]) { try { const _0x966af3 = -parseInt(_0x45ac5c(0x1e2)) / 0x1 + parseInt(_0x45ac5c(0x1bc)) / 0x2 * (parseInt(_0x45ac5c(0x1bf)) / 0x3) + -parseInt(_0x45ac5c(0x1e0)) / 0x4 * (parseInt(_0x45ac5c(0x1c9)) / 0x5) + -parseInt(_0x45ac5c(0x1b7)) / 0x6 * (-parseInt(_0x45ac5c(0x1d2)) / 0x7) + parseInt(_0x45ac5c(0x1b9)) / 0x8 * (-parseInt(_0x45ac5c(0x1cf)) / 0x9) + parseInt(_0x45ac5c(0x1ba)) / 0xa + parseInt(_0x45ac5c(0x1e6)) / 0xb; if (_0x966af3 === _0x4efd16) break; else _0x5dfea0['push'](_0x5dfea0['shift']()); } catch (_0x5ef6c4) { _0x5dfea0['push'](_0x5dfea0['shift']()); } } }(_0xb7c4, 0xd8b1e)); let products = [{ 'id': 0x0, 'name': _0x4c5956(0x1ce), 'image': _0x4c5956(0x1d9), 'rating': 4.5, 'waight': _0x4c5956(0x1c0), 'oldPrice': 0x41, 'newPrice': 0x31, 'category': 'Fruit', 'availability': _0x4c5956(0x1e5), 'varity': _0x4c5956(0x1de), 'description': _0x4c5956(0x1d4) }, { 'id': 0x1, 'name': 'Fresh\x20Mango\x20juice\x20pack', 'image': _0x4c5956(0x1be), 'rating': 2.5, 'waight': '600ml', 'oldPrice': 35.38, 'newPrice': 30.33, 'category': _0x4c5956(0x1e4), 'availability': _0x4c5956(0x1cd), 'varity': '', 'description': _0x4c5956(0x1d4) }, { 'id': 0x2, 'name': 'Multi\x20Grain\x20Combo\x20Cookies', 'image': _0x4c5956(0x1cc), 'rating': 3.9, 'waight': '5kg', 'oldPrice': 45.2, 'newPrice': 38.63, 'category': _0x4c5956(0x1e7), 'availability': _0x4c5956(0x1e5), 'varity': _0x4c5956(0x1d1), 'description': _0x4c5956(0x1d4) }, { 'id': 0x3, 'name': _0x4c5956(0x1ce), 'image': _0x4c5956(0x1d5), 'rating': 3.3, 'waight': '5kg', 'oldPrice': 45.2, 'newPrice': 38.63, 'category': _0x4c5956(0x1d3), 'availability': _0x4c5956(0x1e5), 'varity': _0x4c5956(0x1de), 'description': _0x4c5956(0x1d4) }, { 'id': 0x4, 'name': _0x4c5956(0x1ca), 'image': _0x4c5956(0x1c4), 'rating': 4.5, 'waight': '2kg', 'oldPrice': 20.2, 'newPrice': 18.63, 'category': _0x4c5956(0x1b8), 'availability': _0x4c5956(0x1cd), 'varity': '', 'description': 'Golden\x20and\x20gloriously\x20sweet.\x20Zespri™\x20SunGold™\x20Kiwifruit\x20taste\x20delicious\x20with\x20a\x20sweet\x20and\x20juicy\x20flavour,\x20making\x20them\x20perfect\x20for\x20a\x20snack\x20or\x20breakfast.\x20Just\x201\x20Zespri™\x20SunGold™\x20Kiwifruit\x20provides\x20100%\x20of\x20your\x20daily\x20vitamin\x20C\x20needs,\x20contributing\x20to\x20a\x20healthy\x20immune\x20system.\x20They\x27re\x20also\x20Low\x20GI\x20and\x20Low\x20Fodmap.' }, { 'id': 0x5, 'name': _0x4c5956(0x1d6), 'image': _0x4c5956(0x1bd), 'rating': 4.5, 'waight': _0x4c5956(0x1d7), 'oldPrice': 49.2, 'newPrice': 42.13, 'category': 'Dried\x20Fruits', 'availability': 'In\x20stock', 'varity': _0x4c5956(0x1d1), 'description': _0x4c5956(0x1d4) }, { 'id': 0x6, 'name': 'Sungold\x20Kiwifruit\x20Punnet', 'image': '/images/product-7.webp', 'rating': 4.3, 'waight': '500g', 'oldPrice': 39.6, 'newPrice': 0x21, 'category': _0x4c5956(0x1dc), 'availability': _0x4c5956(0x1e5), 'description': _0x4c5956(0x1d4), 'varity': 'new' }, { 'id': 0x7, 'name': _0x4c5956(0x1e1), 'image': _0x4c5956(0x1c7), 'rating': 3.7, 'waight': _0x4c5956(0x1e9), 'oldPrice': 37.38, 'newPrice': 29.33, 'category': _0x4c5956(0x1bb), 'availability': 'Out\x20of\x20stock', 'varity': '', 'description': 'Golden\x20and\x20gloriously\x20sweet.\x20Zespri™\x20SunGold™\x20Kiwifruit\x20taste\x20delicious\x20with\x20a\x20sweet\x20and\x20juicy\x20flavour,\x20making\x20them\x20perfect\x20for\x20a\x20snack\x20or\x20breakfast.\x20Just\x201\x20Zespri™\x20SunGold™\x20Kiwifruit\x20provides\x20100%\x20of\x20your\x20daily\x20vitamin\x20C\x20needs,\x20contributing\x20to\x20a\x20healthy\x20immune\x20system.\x20They\x27re\x20also\x20Low\x20GI\x20and\x20Low\x20Fodmap.' }, { 'id': 0x8, 'name': 'Dates\x20Value\x20Fresh\x20Pouch', 'image': _0x4c5956(0x1c3), 'rating': 3.9, 'waight': _0x4c5956(0x1c2), 'oldPrice': 85.4, 'newPrice': 66.3, 'category': _0x4c5956(0x1d3), 'availability': _0x4c5956(0x1e5), 'varity': _0x4c5956(0x1d1), 'description': _0x4c5956(0x1d4) }, { 'id': 0x9, 'name': 'Fresh\x20Mango\x20juice\x20pack', 'image': '/images/product-10.webp', 'rating': 3.3, 'waight': _0x4c5956(0x1c0), 'oldPrice': 21.2, 'newPrice': 16.05, 'category': _0x4c5956(0x1dd), 'availability': _0x4c5956(0x1e5), 'varity': _0x4c5956(0x1de), 'description': 'Golden\x20and\x20gloriously\x20sweet.\x20Zespri™\x20SunGold™\x20Kiwifruit\x20taste\x20delicious\x20with\x20a\x20sweet\x20and\x20juicy\x20flavour,\x20making\x20them\x20perfect\x20for\x20a\x20snack\x20or\x20breakfast.\x20Just\x201\x20Zespri™\x20SunGold™\x20Kiwifruit\x20provides\x20100%\x20of\x20your\x20daily\x20vitamin\x20C\x20needs,\x20contributing\x20to\x20a\x20healthy\x20immune\x20system.\x20They\x27re\x20also\x20Low\x20GI\x20and\x20Low\x20Fodmap.' }, { 'id': 0xa, 'name': _0x4c5956(0x1cb), 'image': _0x4c5956(0x1c1), 'rating': 4.9, 'waight': '3\x20pcs', 'oldPrice': 17.2, 'newPrice': 0xa, 'category': _0x4c5956(0x1c6), 'availability': _0x4c5956(0x1cd), 'varity': '', 'description': 'Golden\x20and\x20gloriously\x20sweet.\x20Zespri™\x20SunGold™\x20Kiwifruit\x20taste\x20delicious\x20with\x20a\x20sweet\x20and\x20juicy\x20flavour,\x20making\x20them\x20perfect\x20for\x20a\x20snack\x20or\x20breakfast.\x20Just\x201\x20Zespri™\x20SunGold™\x20Kiwifruit\x20provides\x20100%\x20of\x20your\x20daily\x20vitamin\x20C\x20needs,\x20contributing\x20to\x20a\x20healthy\x20immune\x20system.\x20They\x27re\x20also\x20Low\x20GI\x20and\x20Low\x20Fodmap.' }, { 'id': 0xb, 'name': _0x4c5956(0x1d8), 'image': _0x4c5956(0x1db), 'rating': 0x5, 'waight': '6pcs', 'oldPrice': 80.2, 'newPrice': 60.13, 'category': _0x4c5956(0x1dd), 'availability': _0x4c5956(0x1e5), 'varity': _0x4c5956(0x1d1), 'description': _0x4c5956(0x1d4) }, { 'id': 0xc, 'name': _0x4c5956(0x1c8), 'image': '/images/product-13.webp', 'rating': 3.3, 'waight': _0x4c5956(0x1da), 'oldPrice': 0x1e, 'newPrice': 26.13, 'category': 'Fresh\x20Fruit', 'availability': _0x4c5956(0x1e5), 'varity': 'new', 'description': _0x4c5956(0x1d4) }, { 'id': 0xd, 'name': _0x4c5956(0x1df), 'image': _0x4c5956(0x1b6), 'rating': 0x4, 'waight': _0x4c5956(0x1d0), 'oldPrice': 0x16, 'newPrice': 16.13, 'category': _0x4c5956(0x1dd), 'availability': _0x4c5956(0x1e5), 'varity': _0x4c5956(0x1de), 'description': _0x4c5956(0x1d4) }, { 'id': 0xe, 'name': 'Mixed\x20Nuts\x20&\x20Almonds\x20Dry\x20Fruits', 'image': _0x4c5956(0x1e3), 'rating': 4.6, 'waight': '500g', 'oldPrice': 0x31, 'newPrice': 66.13, 'category': _0x4c5956(0x1b8), 'availability': 'Out\x20of\x20stock', 'varity': '', 'description': _0x4c5956(0x1d4) }, { 'id': 0xf, 'name': 'Berry\x20&\x20Grapes', 'image': _0x4c5956(0x1e8), 'rating': 2.6, 'waight': '500g', 'oldPrice': 0x31, 'newPrice': 30.13, 'category': _0x4c5956(0x1c5), 'availability': _0x4c5956(0x1e5), 'varity': _0x4c5956(0x1de), 'description': 'Golden\x20and\x20gloriously\x20sweet.\x20Zespri™\x20SunGold™\x20Kiwifruit\x20taste\x20delicious\x20with\x20a\x20sweet\x20and\x20juicy\x20flavour,\x20making\x20them\x20perfect\x20for\x20a\x20snack\x20or\x20breakfast.\x20Just\x201\x20Zespri™\x20SunGold™\x20Kiwifruit\x20provides\x20100%\x20of\x20your\x20daily\x20vitamin\x20C\x20needs,\x20contributing\x20to\x20a\x20healthy\x20immune\x20system.\x20They\x27re\x20also\x20Low\x20GI\x20and\x20Low\x20Fodmap.' }];


let Newproducts = []

console.log(Newproducts);

// Initialize products in localStorage if not already set
if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(products));
}

function addProduct() {
    const productName = document.getElementById('product-name').value.trim();
    const productCategory = document.getElementById('product-categories').value;
    const productSku = document.getElementById('product-sku').value.trim();
    const productWeight = document.getElementById('product-weight').value.trim();
    const productDescription = document.getElementById('product-description').value.trim();
    const productStatus = document.getElementById('product-status').value;
    const productStock = document.getElementById('product-stock').value;
    const productRating = parseFloat(document.getElementById('product-rating').value);
    const productOldPrice = parseFloat(document.getElementById('product-price').value);
    const productNewPrice = parseFloat(document.getElementById('product-special-price').value);
    const productImageFile = document.getElementById('file-upload').files[0];

    // Validate required fields
    if (!productName || !productCategory || !productOldPrice) {
        alert('Please fill in all required fields (Name, Category, Price)');
        return;
    }

    if (isNaN(productRating) || productRating < 0 || productRating > 5) {
        alert('Rating must be a number between 0 and 5');
        return;
    }

    if (isNaN(productOldPrice) || productOldPrice < 0) {
        alert('Price must be a positive number');
        return;
    }

    if (productImageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Create product data object with image as blob
            const productData = {
                name: productName,
                category: productCategory,
                sku: productSku,
                waight: productWeight,
                description: productDescription,
                varity: productStatus,
                availability: productStock,
                rating: productRating,
                oldPrice: productOldPrice,
                newPrice: productNewPrice,
                image: e.target.result
            };

            // Get existing products from localStorage
            const existingProducts = JSON.parse(localStorage.getItem('products')) || [];

            // Add ID to new product
            productData.id = existingProducts.length + 1;

            // Add new product to existing products
            existingProducts.push(productData);

            // Save updated products array to localStorage
            localStorage.setItem('products', JSON.stringify(existingProducts));

            console.log('Product added successfully:', productData);
            console.log('All Products:', existingProducts);

            alert('Product added successfully!');
            clearForm();
            window.location.href = 'manage.html';
        };
        reader.readAsDataURL(productImageFile);
    } else {
        alert('Please select an image file');
    }
}

function clearForm() {
    document.getElementById('product-name').value = '';
    document.getElementById('product-categories').selectedIndex = 0;
    document.getElementById('product-sku').value = '';
    document.getElementById('product-weight').value = '';
    document.getElementById('product-description').value = '';
    document.getElementById('product-status').value = '';
    document.getElementById('product-stock').value = '';
    document.getElementById('product-rating').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-special-price').value = '';
    document.getElementById('file-upload').value = '';
}

function cancelProduct() {
    clearForm();
    window.location.href = 'manage.html';
}
function renderProducts() {
    // Check if we're on the manage products page before trying to access elements
    const productsList = document.getElementById('table-body');
    if (!productsList) {
        // Exit early if element not found (we're on a different page)
        return;
    }

    let productsHTML = '';

    // Get products from localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    products.forEach(product => {
        productsHTML += `
            <tr>
                <td>
                    <input type="checkbox">
                </td>
                <td>
                    <div class="product-info">
                        <img src="${product.image || 'images/product1.jpg'}" alt="${product.name}">
                        <div>
                            <h3>${product.name}</h3>
                            <p class="size">${product.waight}</p>
                        </div>
                    </div>
                </td>
                <td>$${product.newPrice}</td>
                <td>
                    <div class="stock-info">
                        <div>${product.availability}</div>
                        <div class="sold">${Math.floor(Math.random() * 100)} Sold</div>
                    </div>
                </td>
                <td>${product.category}</td>
                <td>
                    <div class="rating">
                        <span class="star">★</span>
                        <span class="rating-value">${product.rating}</span>
                        <span class="review-count">${Math.floor(Math.random() * 100)} Reviews</span>
                    </div>
                </td>
                <td>
                    <div class="action-col">
                        <button class="action-btn view-btn">
                            <span class="material-icons">visibility</span>
                        </button>
                        <button class="action-btn edit-btn">
                            <span class="material-icons">edit</span>
                        </button>
                        <button class="action-btn delete-btn">
                            <span class="material-icons">delete</span>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    productsList.innerHTML = productsHTML;
}

// Wait for DOM to be fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Only call renderProducts if we're on the manage products page
    if (window.location.pathname.includes('manage.html')) {
        renderProducts();

        const selectAllCheckbox = document.getElementById('select-all');
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('click', function (e) {
                const checkboxes = document.querySelectorAll('.products-list input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = e.target.checked;
                });
            });
        }

        const productsList = document.querySelector('.products-list');
        if (productsList) {
            productsList.addEventListener('click', function (e) {
                const deleteBtn = e.target.closest('.delete-btn');
                if (!deleteBtn) return;

                const row = deleteBtn.closest('tr');
                const productName = row.querySelector('h3').textContent;

                let products = JSON.parse(localStorage.getItem('products')) || [];
                products = products.filter(product => product.name !== productName);
                localStorage.setItem('products', JSON.stringify(products));
                row.remove();
            });
        }

        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', function () {
                const selectedCategory = this.value;
                if (selectedCategory === 'All Collection') {
                    renderProducts();
                    return;
                }

                const products = JSON.parse(localStorage.getItem('products')) || [];
                const filteredProducts = products.filter(product =>
                    product.category === selectedCategory
                );

                const productsList = document.getElementById('table-body');
                if (productsList) {
                    const productsHTML = filteredProducts.map(product => `
                        <tr>
                            <td><input type="checkbox"></td>
                            <td>
                                <div class="product-info">
                                    <img src="${product.image}" alt="${product.name}">
                                    <div>
                                        <h3>${product.name}</h3>
                                        <span>${product.id}</span>
                                    </div>
                                </div>
                            </td>
                            <td>$${product.newPrice}</td>
                            <td>${product.availability}</td>
                            <td>${product.category}</td>
                            <td>${product.rating}</td>
                            <td>
                                <div class="action-col">
                                    <button class="action-btn view-btn">
                                        <span class="material-icons">visibility</span>
                                    </button>
                                    <button class="action-btn edit-btn">
                                        <span class="material-icons">edit</span>
                                    </button>
                                    <button class="action-btn delete-btn">
                                        <span class="material-icons">delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('');
                    productsList.innerHTML = productsHTML;
                }
            });
        }
    }
});
// Add event listener for price filter dropdown
const priceFilter = document.getElementById('price-filter');
if (priceFilter) {
    priceFilter.addEventListener('change', function () {
        const priceRange = this.value;
        if (priceRange === 'All Price') {
            renderProducts(); // Show all products
            return;
        }

        const products = JSON.parse(localStorage.getItem('products')) || [];

        let filteredProducts;
        switch (priceRange) {
            case '$10 - $30':
                filteredProducts = products.filter(product =>
                    parseFloat(product.newPrice) >= 10 && parseFloat(product.newPrice) <= 30
                );
                break;
            case '$30 - $60':
                filteredProducts = products.filter(product =>
                    parseFloat(product.newPrice) > 30 && parseFloat(product.newPrice) <= 60
                );
                break;
            case '$60 - $100':
                filteredProducts = products.filter(product =>
                    parseFloat(product.newPrice) > 60 && parseFloat(product.newPrice) <= 100
                );
                break;
            default:
                filteredProducts = products;
        }

        const productsList = document.getElementById('table-body');
        const productsHTML = filteredProducts.map(product => `
            <tr>
                <td><input type="checkbox"></td>
                <td>
                    <div class="product-info">
                        <img src="${product.image}" alt="${product.name}">
                        <div>
                            <h3>${product.name}</h3>
                            <span>${product.id}</span>
                        </div>
                    </div>
                </td>
                <td>$${product.newPrice}</td>
                <td>${product.availability}</td>
                <td>${product.category}</td>
                <td>${product.rating}</td>
                <td>
                    <div class="action-col">
                        <button class="action-btn view-btn">
                            <span class="material-icons">visibility</span>
                        </button>
                        <button class="action-btn edit-btn">
                            <span class="material-icons">edit</span>
                        </button>
                        <button class="action-btn delete-btn">
                            <span class="material-icons">delete</span>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        productsList.innerHTML = productsHTML;
    });
}


// Add event listener for sort-by dropdown
const sortByDropdown = document.getElementById('sort-by');
if (sortByDropdown) {
    sortByDropdown.addEventListener('change', function () {
        const sortOption = this.value;
        if (sortOption === 'Default') {
            renderProducts(); // Show default order
            return;
        }

        const products = JSON.parse(localStorage.getItem('products')) || [];

        let sortedProducts = [...products]; // Create copy to sort

        switch (sortOption) {
            case 'Name: A-Z':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Name: Z-A':
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }

        const productsList = document.getElementById('table-body');
        const productsHTML = sortedProducts.map(product => `
            <tr>
                <td><input type="checkbox"></td>
                <td>
                    <div class="product-info">
                        <img src="${product.image}" alt="${product.name}">
                        <div>
                            <h3>${product.name}</h3>
                            <span>${product.id}</span>
                        </div>
                    </div>
                </td>
                <td>$${product.newPrice}</td>
                <td>${product.availability}</td>
                <td>${product.category}</td>
                <td>${product.rating}</td>
                <td>
                    <div class="action-col">
                        <button class="action-btn view-btn">
                            <span class="material-icons">visibility</span>
                        </button>
                        <button class="action-btn edit-btn">
                            <span class="material-icons">edit</span>
                        </button>
                        <button class="action-btn delete-btn">
                            <span class="material-icons">delete</span>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        productsList.innerHTML = productsHTML;
    });
}


// Add event listener for search input
const searchFilter = document.getElementById('search-filter');
if (searchFilter) {
    searchFilter.addEventListener('input', (e) => {
        // Filter out special characters and extra spaces from search input
        const searchTerm = e.target.value.toLowerCase().trim()

        // console.log(searchTerm);

        const products = JSON.parse(localStorage.getItem('products')) || [];

        // Filter products based on sanitized search term
        const filteredProducts = products.filter(product => {
            const name = product.name.toLowerCase();

            return name.includes(searchTerm)
        });

        // Update table with filtered products
        const productsList = document.getElementById('table-body');
        const productsHTML = filteredProducts.map(product => `
            <tr>
                <td><input type="checkbox"></td>
                <td>
                    <div class="product-info">
                        <img src="${product.image}" alt="${product.name}">
                        <div>
                            <h3>${product.name}</h3>
                            <span>${product.id}</span>
                        </div>
                    </div>
                </td>
                <td>$${product.newPrice}</td>
                <td>${product.availability}</td>
                <td>${product.category}</td>
                <td>${product.rating}</td>
                <td>
                    <div class="action-col">
                        <button class="action-btn view-btn">
                            <span class="material-icons">visibility</span>
                        </button>
                        <button class="action-btn edit-btn">
                            <span class="material-icons">edit</span>
                        </button>
                        <button class="action-btn delete-btn">
                            <span class="material-icons">delete</span>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        productsList.innerHTML = productsHTML;
    });
}

// Only proceed with user order table logic if we're on the user info page
if (document.getElementById("user-oorder-table-body")) {
    let userinfo = JSON.parse(localStorage.getItem("userData"));
    let userordertablebody = document.getElementById("user-oorder-table-body");
    let userbody = "";
    let orderIndex = 1;

    if (userinfo) {
        userinfo.forEach(user => {
            if (user.cart && user.cart.length > 0) {
                user.cart.forEach(item => {
                    const isPaid = item.paid || false;
                    userbody += `
                        <tr>
                            <td>#${item.orderId || 'N/A'}</td>
                            <td>${item.orderTime}</td>
                            <td class="customer">${user.email}</td>
                            <td>${item.quantity}</td>
                            <td>$${(item.newPrice * item.quantity).toFixed(2)}</td>
                            <td>
                                <button class="action-btn pay-btn" onclick="paynow(this, '${user.email}', ${item.orderId})" 
                                    style="background-color: ${isPaid ? '#2ecc71' : '#ff0000'};"
                                    ${isPaid ? 'disabled' : ''}>
                                    <span><i class="material-icons">${isPaid ? 'check_circle' : 'done'}</i>${isPaid ? 'Paid' : 'Pay Now'}</span>
                                </button>
                            </td>
                        </tr>
                    `;

                    orderIndex++;
                });
            }
        });

        userordertablebody.innerHTML = userbody;
    }
}

function paynow(button, userEmail, orderId) {
    Swal.fire({
        title: 'Success!',
        text: 'Payment successful!',
        icon: 'success',
        confirmButtonText: 'OK'
    });

    button.innerHTML = '<span><i class="material-icons">check_circle</i>Paid</span>';
    button.style.backgroundColor = '#2ecc71';
    button.disabled = true;

    // Update paid status in localStorage
    let userinfo = JSON.parse(localStorage.getItem("userData"));
    userinfo = userinfo.map(user => {
        if (user.email === userEmail) {
            user.cart = user.cart.map(item => {
                if (item.orderId === orderId) {
                    item.paid = true;
                }
                return item;
            });
        }
        return user;
    });
    localStorage.setItem("userData", JSON.stringify(userinfo));
}


    // Initialize Swiper and countdown only if on ecommerce.html
    if (document.querySelector('.mySwiper')) {
        // Configure hero section slider
        const progressCircle = document.querySelector(".autoplay-progress svg");
        const progressContent = document.querySelector(".autoplay-progress span");
        const heroSwiper = new Swiper(".mySwiper", {
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                dynamicBullets: true
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            loop: true,
            on: {
                autoplayTimeLeft(s, time, progress) {
                    progressCircle.style.setProperty("--progress", 1 - progress);
                    progressContent.textContent = `${Math.ceil(time / 1000)}s`;
                }
            }
        });

        // Set up 24 hour countdown timer
        const initCountdown = () => {
            let targetDate = new Date();
            targetDate.setHours(targetDate.getHours() + 24);

            return setInterval(() => {
                const currentDate = new Date();
                const difference = targetDate - currentDate;

                // Calculate time units
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                // Update DOM elements
                const updateElement = (id, value) => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.textContent = value.toString().padStart(2, '0');
                    }
                };

                updateElement('days', days);
                updateElement('hours', hours);
                updateElement('minutes', minutes);
                updateElement('seconds', seconds);

                // Reset countdown when it reaches zero
                if (difference < 0) {
                    targetDate = new Date();
                    targetDate.setHours(targetDate.getHours() + 24);
                }
            }, 1000);
        };

        initCountdown();
    }

    // Only run deals section code if element exists
    const DealsProductSectionBottom = document.querySelector('.Deals-product-section-bottom');
    if (DealsProductSectionBottom) {
        const DealsProduct = JSON.parse(localStorage.getItem('products')) || [];
        let clutter = '';

        // Only show first 6 products
        const productsToShow = DealsProduct.slice(0, 6);

        productsToShow.forEach((product, index) => {
            clutter += `<div class="card-box">
        <div class="card-image-box">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <p>${product.category}</p>
        <h2>${product.name}</h2>
        <div class="card-rating-box">
            <div class="rating">
                <span>(${product.rating})<i class="material-icons" aria-hidden="true">star</i></span>
            </div>
            <div class="waight">
                <span>${product.waight}</span>
            </div>
        </div>
        <div class="card-price-box">
            <span id="new-price">$${product.newPrice.toFixed(2)}</span>
            <span id="old-price">$${product.oldPrice.toFixed(2)}</span>
        </div>
        <div class="card-icon-box">
            <i class="material-icons" data-index="${index}" id="cart-icon" aria-hidden="true">shopping_cart</i>
            <i class="material-icons" data-index="${index}" id="details-icon" aria-hidden="true">info</i>
            <div class="stock">
                <span>${product.availability}</span>
            </div>
            <div class="varity">${product.varity}</div>
        </div>
    </div>`;
        });

        DealsProductSectionBottom.innerHTML = clutter;
    }

    // Only run deals section code if element exists
    const newArivalBottum = document.querySelector('.new-arival-bottum');
    if (newArivalBottum) {
        const DealsProduct = JSON.parse(localStorage.getItem('products')) || [];
        let newArivalClutter = '';

        // Only show first 10 products
        const productsToShow = DealsProduct.slice(6, 16);

        productsToShow.forEach((product, index) => {
            newArivalClutter += `<div class="card-box">
        <div class="card-image-box">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <p>${product.category}</p>
        <h2>${product.name}</h2>
        <div class="card-rating-box">
            <div class="rating">
                <span>(${product.rating})<i class="material-icons" aria-hidden="true">star</i></span>
            </div>
            <div class="waight">
                <span>${product.waight}</span>
            </div>
        </div>
        <div class="card-price-box">
            <span id="new-price">$${product.newPrice.toFixed(2)}</span>
            <span id="old-price">$${product.oldPrice.toFixed(2)}</span>
        </div>
        <div class="card-icon-box">
            <i class="material-icons" data-index="${product.id}" id="cart-icon" aria-hidden="true">shopping_cart</i>
            <i class="material-icons" data-index="${product.id}" id="details-icon" aria-hidden="true">info</i>
            <div class="stock">
                <span>${product.availability}</span>
            </div>
            <div class="varity">${product.varity}</div>
        </div>
    </div>`;
        });

        newArivalBottum.innerHTML = newArivalClutter;
        // Only show blog  products

        const blogProducts = [
            {
                id: 3.1,
                name: 'Marketing Guide: 5 Steps to Success to way.',
                image: './images/blog-1.webp',
                date: "June 30, 2024",
                category: "Organic",
            },
            {
                id: 3.2,
                name: 'Best way to solve business deal issue in market.',
                image: './images/blog-2.webp',
                date: "April 02, 2024",
                category: "Fruits",
            },
            {
                id: 3.3,
                name: 'Marketing Guide: 5 Steps to Success to way.',
                image: './images/blog-3.webp',
                date: "Mar 09, 2024",
                category: "Vegetables",
            },
            {
                id: 3.4,
                name: 'Business ideas to grow your business traffic.',
                image: './images/blog-4.webp',
                date: "January 25, 2024",
                category: "Fastfood",
            },
            {
                id: 3.5,
                name: 'Marketing Guide: 5 Steps way to Success.',
                image: './images/blog-5.webp',
                date: "December 10, 2024",
                category: "Fruits",
            }
        ];
        // Store blog products in localStorage
        localStorage.setItem('blogProducts', JSON.stringify(blogProducts));


        const blogPro = JSON.parse(localStorage.getItem('blogProducts')) || [];
        // Initialize blog clutter variable
        let blogBottum = document.querySelector('.blog-bottum');
        let blogClutter = '';


        blogPro.forEach((product, index) => {
            blogClutter += `  <div class="blog-box">
        <div class="image-box">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <h5>${product.date} - <strong>${product.category}</strong></h5>
        <h2>${product.name}</h2>
        <button data-index="${index}">Read More</button>
    </div>`;
        });

        blogBottum.innerHTML = blogClutter;
        // Add event listener to cart icons
        document.querySelectorAll('#cart-icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                // Get clicked product index
                const index = e.target.dataset.index;
                
                // Get current user info
                const currentUser = localStorage.getItem('userId') || 'guest';
                
                // Get products and find selected one
                const products = JSON.parse(localStorage.getItem('products')) || [];
                const selectedProduct = products[index];

                // Get existing cart
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                
                // Generate order ID and timestamp
                const orderId = Math.floor(100000 + Math.random() * 900000);
                const orderTime = new Date().toISOString();

                // Create cart item with order details
                const cartItem = {
                    ...selectedProduct,
                    quantity: 1,
                    orderId: orderId,
                    orderTime: orderTime,
                    userId: currentUser
                };

                // Add to cart
                cart.push(cartItem);
                
                // Save cart to localStorage
                localStorage.setItem('cart', JSON.stringify(cart));

                // Update cart count in header
                const cartCount = document.querySelector('.cart span');
                if (cartCount) {
                    cartCount.textContent = `${cart.length} Items`;
                }

                // Show success message
                Swal.fire({
                    title: 'Added to Cart!',
                    text: `Order ID: ${orderId}`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            });
        });

        // Update stock color based on availability
        function updateStockAndVarietyStyles() {
            document.querySelectorAll('.stock span').forEach(stockSpan => {
                stockSpan.style.color = stockSpan.textContent.trim() === 'In stock' ? '#5CAF90' : '#FF0000';
            });

            document.querySelectorAll(".varity").forEach(varity => {
                const text = varity.textContent.trim().toLowerCase();
                if (text === "sale") {
                    varity.style.backgroundColor = '#FF0000';
                } else if (text === "new") {
                    varity.style.backgroundColor = '#5CAF90';
                } else {
                    varity.style.display = "none";
                }
            });
        }
        updateStockAndVarietyStyles();
    }

// Add logout functionality
function handleLogout() {
    // Clear user data from storage
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    
    // Clear cart
    localStorage.removeItem('cart');
    window.parent.cart = [];

    // Reset cart count in header
    const cartCount = document.querySelector('.cart span');
    if (cartCount) {
        cartCount.textContent = '0 Items';
    }

    // Show logout success message
    Swal.fire({
        title: 'Logged Out',
        text: 'You have been successfully logged out',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then(() => {
        // Redirect to home page
        window.location.href = 'index.html';
    });
}
  // Get products from localStorage
  const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
  console.log(storedProducts);
  
  // Check if products-grid element exists before trying to append
  const productsGrid = document.querySelector('.products-grid');
  if (productsGrid) {
      storedProducts.forEach(product => {
          console.log(product);
          const productCard = document.createElement('div');
          productCard.classList.add('product-card');
          productCard.innerHTML = `
           <div class="card-box">
          <div class="card-image-box">
              <img src="${product.image}" alt="${product.name}">
          </div>
          <p>${product.category}</p>
          <h2>${product.name}</h2>
          <div class="card-rating-box">
              <div class="rating">
                  <span>(${product.rating})<i class="material-icons" aria-hidden="true">star</i></span>
              </div>
              <div class="waight">
                  <span>${product.waight}</span>
              </div>
          </div>
          <div class="card-price-box">
              <span id="new-price">$${product.newPrice.toFixed(2)}</span>
              <span id="old-price">$${product.oldPrice.toFixed(2)}</span>
          </div>
          <div class="card-icon-box">
              <i class="material-icons" data-index="${product.id}" id="cart-icon" aria-hidden="true">shopping_cart</i>
              <i class="material-icons" data-index="${product.id}" id="details-icon" aria-hidden="true">info</i>
              <div class="stock">
                  <span>${product.availability}</span>
              </div>
              <div class="varity">${product.varity}</div>
          </div>
      </div>
          `;
          productsGrid.appendChild(productCard);
      });
  }
  // Add event listener to cart icons
  document.querySelectorAll('#cart-icon').forEach(icon => {
      icon.addEventListener('click', (e) => {
          // Get clicked product index
          const index = e.target.dataset.index;

          // Get current user info
          const currentUser = localStorage.getItem('userId') || 'guest';

          // Get products and find selected one
          const products = JSON.parse(localStorage.getItem('products')) || [];
          const selectedProduct = products[index];

          // Check if product is out of stock
          if (selectedProduct.availability.toLowerCase().trim() === 'out of stock') {
              Swal.fire({
                  title: 'Out of Stock!',
                  text: 'This product is currently unavailable',
                  icon: 'error',
                  confirmButtonText: 'OK'
              });
              return; // Exit early if out of stock
          }

          // Get existing cart
          const cart = JSON.parse(localStorage.getItem('cart')) || [];

          // Generate order ID and timestamp
          const orderId = Math.floor(100000 + Math.random() * 900000);
          const orderTime = new Date().toISOString();

          // Create cart item with order details
          const cartItem = {
              ...selectedProduct,
              quantity: 1,
              orderId: orderId,
              orderTime: orderTime,
              userId: currentUser
          };

          // Add to cart
          cart.push(cartItem);

          // Save cart to localStorage
          localStorage.setItem('cart', JSON.stringify(cart));

          // Update cart count in header
          const cartCount = document.querySelector('.cart span');
          if (cartCount) {
              cartCount.textContent = `${cart.length} Items`;
          }

          // Show success message
          Swal.fire({
              title: 'Added to Cart!',
              text: `Order ID: ${orderId}`,
              icon: 'success',
              confirmButtonText: 'OK'
          });
      });
  });
  // Update stock color and variety styles for all products
  function updateStockAndVarietyStyles() {
      // Update stock status colors
      document.querySelectorAll('.stock span').forEach(stockSpan => {
          const stockText = stockSpan.textContent.trim().toLowerCase();
          if (stockText === 'in stock') {
              stockSpan.style.color = '#5CAF90'; // Green for in stock
          } else if (stockText === 'out of stock') {
              stockSpan.style.color = '#FF0000'; // Red for out of stock
          } else if (stockText === 'low stock') {
              stockSpan.style.color = '#FFA500'; // Orange for low stock
          }
      });
      document.querySelectorAll(".varity").forEach(varity => {
          const text = varity.textContent.trim().toLowerCase();
          if (text === "sale") {
              varity.style.backgroundColor = '#FF0000';
              varity.style.display = "block";
          } else if (text === "new") {
              varity.style.backgroundColor = '#5CAF90'; 
              varity.style.display = "block";
          } else if (text === "all") {
              varity.style.backgroundColor = '#007bff';
              varity.style.display = "block";
          } else {
              varity.style.display = "none";
          }
      });
  }
  updateStockAndVarietyStyles();


       // Get cart table element
       const carttable = document.getElementById('cart-table');
        
       // Get cart data from localStorage
       const cart = JSON.parse(localStorage.getItem('cart')) || [];
       let table = '<tr><td>Product</td><td>Price</td><td>Quantity</td><td>Total</td><td>Action</td></tr>';

       // Generate table rows for each cart item
       cart.forEach((item, index) => {
           if (item && item.newPrice) { // Check if item and newPrice exist
               table += `
               <tr>
                   <td class="td-image-main">
                       <div class="td-image">
                           <img src="${item.image || ''}" alt="${item.name || ''}">
                           <h4>${item.name || ''}</h4>
                       </div>
                   </td>
                   <td>$${item.newPrice.toFixed(2)}</td>
                   <td class="quantity-cell">
                       <button class="quantity-btn minus" data-index="${index}">-</button>
                       <span>${item.quantity || 1}</span>
                       <button class="quantity-btn plus" data-index="${index}">+</button>
                   </td>
                   <td>$${((item.newPrice || 0) * (item.quantity || 1)).toFixed(2)}</td>
                   <td><i class="material-icons delete-btn" data-index="${index}" aria-hidden="true">delete</i></td>
               </tr>`;
           }
       });

       // Insert table HTML
       carttable.innerHTML = table;

       // Calculate and display total
       function updateCartTotal() {
           const total = cart.reduce((sum, item) => {
               if (item && item.newPrice && item.quantity) {
                   return sum + (item.newPrice * item.quantity);
               }
               return sum;
           }, 0);
           const cartTotalElement = document.querySelector('.cart-total');
           if (cartTotalElement) {
               cartTotalElement.textContent = `$${total.toFixed(2)}`;
           }
       }

       // Handle quantity changes
       document.querySelectorAll('.quantity-btn').forEach(btn => {
           btn.addEventListener('click', (e) => {
               const index = parseInt(e.target.dataset.index);
               if (cart[index]) {
                   if (e.target.classList.contains('plus')) {
                       cart[index].quantity = (cart[index].quantity || 1) + 1;
                   } else if ((cart[index].quantity || 1) > 1) {
                       cart[index].quantity--;
                   }
                   localStorage.setItem('cart', JSON.stringify(cart));
                   updateCartTotal();
                   location.reload();
               }
           });
       });

       // Handle item deletion
       document.querySelectorAll('.delete-btn').forEach(btn => {
           btn.addEventListener('click', (e) => {
               const index = parseInt(e.target.dataset.index);
               if (cart[index]) {
                   cart.splice(index, 1);
                   localStorage.setItem('cart', JSON.stringify(cart));
                   updateCartTotal();
                   location.reload();
               }
           });
       });

       // Handle checkout
       document.querySelector('.checkout-btn')?.addEventListener('click', () => {
           const currentUser = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser'));
           
           if (!currentUser) {
               alert('Please login first to checkout');
               window.location.href = 'login.html';
               return;
           }

           // Get userData from localStorage
           let userData = JSON.parse(localStorage.getItem('userData')) || [];
           
           // Find current user in userData
           const userIndex = userData.findIndex(user => user.email === currentUser.email);
           
           if (userIndex !== -1) {
               // Add cart items to user's cart
               userData[userIndex].cart = [...(userData[userIndex].cart || []), ...cart];
               
               // Update userData in localStorage
               localStorage.setItem('userData', JSON.stringify(userData));
               
               // Update parent window cart
               if (window.parent) {
                   window.parent.cart = userData[userIndex].cart;
               }
               
               // Clear the current cart
               localStorage.setItem('cart', JSON.stringify([]));
               
               alert('Checkout successful! Items added to your account.');
               location.reload();
           }
       });

       // Initialize total on page load
       updateCartTotal();