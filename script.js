
const registerForm = document.querySelector('.register-form');
const loginForm = document.querySelector('.login-form');

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
        createdAt: new Date().toISOString()
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
        window.location.href = './ecomerce.html';
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


const _0x4c5956=_0x3d64;function _0xb7c4(){const _0x26ff8b=['28gvKKds','American\x20Cream\x20&\x20Onion\x20Flavour','906780BKrEfr','/images/product-15.webp','Tuber\x20root','In\x20stock','12801723JfIZiC','Cookies','/images/product-16.webp','200g','/images/product-14.webp','1242LjumxT','Foods','2256jljuwl','826080xosusw','Snacks','766XvAVSV','/images/product-6.webp','/images/product-2.webp','1941PDGcXs','1kg','/images/product-11.webp','5kg','/images/product-9.webp','/images/product-5.webp','Mix\x20Snack','Vegetables','/images/product-8.webp','Blue\x20berry','752425LivmhD','Stick\x20Fiber\x20Masala\x20Magic','Sweet\x20Corn','/images/product-3.webp','Out\x20of\x20stock','Natural\x20Hub\x20Cherry\x20Karonda','4995FlLwyx','1pcs','sale','51065ESgFjB','Dried\x20Fruits','Golden\x20and\x20gloriously\x20sweet.\x20Zespri™\x20SunGold™\x20Kiwifruit\x20taste\x20delicious\x20with\x20a\x20sweet\x20and\x20juicy\x20flavour,\x20making\x20them\x20perfect\x20for\x20a\x20snack\x20or\x20breakfast.\x20Just\x201\x20Zespri™\x20SunGold™\x20Kiwifruit\x20provides\x20100%\x20of\x20your\x20daily\x20vitamin\x20C\x20needs,\x20contributing\x20to\x20a\x20healthy\x20immune\x20system.\x20They\x27re\x20also\x20Low\x20GI\x20and\x20Low\x20Fodmap.','/images/product-4.webp','Mixed\x20Nuts\x20Berries\x20Pack','1.5kg','Kamalam\x20Fruit','/images/product-1.webp','8pcs','/images/product-12.webp','Fruit','Fresh\x20Fruit','new','Pineapple'];_0xb7c4=function(){return _0x26ff8b;};return _0xb7c4();}function _0x3d64(_0x44a443,_0x433d0a){const _0xb7c4b2=_0xb7c4();return _0x3d64=function(_0x3d64c9,_0x581e9d){_0x3d64c9=_0x3d64c9-0x1b6;let _0x567801=_0xb7c4b2[_0x3d64c9];return _0x567801;},_0x3d64(_0x44a443,_0x433d0a);}(function(_0x3caadd,_0x4efd16){const _0x45ac5c=_0x3d64,_0x5dfea0=_0x3caadd();while(!![]){try{const _0x966af3=-parseInt(_0x45ac5c(0x1e2))/0x1+parseInt(_0x45ac5c(0x1bc))/0x2*(parseInt(_0x45ac5c(0x1bf))/0x3)+-parseInt(_0x45ac5c(0x1e0))/0x4*(parseInt(_0x45ac5c(0x1c9))/0x5)+-parseInt(_0x45ac5c(0x1b7))/0x6*(-parseInt(_0x45ac5c(0x1d2))/0x7)+parseInt(_0x45ac5c(0x1b9))/0x8*(-parseInt(_0x45ac5c(0x1cf))/0x9)+parseInt(_0x45ac5c(0x1ba))/0xa+parseInt(_0x45ac5c(0x1e6))/0xb;if(_0x966af3===_0x4efd16)break;else _0x5dfea0['push'](_0x5dfea0['shift']());}catch(_0x5ef6c4){_0x5dfea0['push'](_0x5dfea0['shift']());}}}(_0xb7c4,0xd8b1e));let products=[{'id':0x0,'name':_0x4c5956(0x1ce),'image':_0x4c5956(0x1d9),'rating':4.5,'waight':_0x4c5956(0x1c0),'oldPrice':0x41,'newPrice':0x31,'category':'Fruit','availability':_0x4c5956(0x1e5),'varity':_0x4c5956(0x1de),'description':_0x4c5956(0x1d4)},{'id':0x1,'name':'Fresh\x20Mango\x20juice\x20pack','image':_0x4c5956(0x1be),'rating':2.5,'waight':'600ml','oldPrice':35.38,'newPrice':30.33,'category':_0x4c5956(0x1e4),'availability':_0x4c5956(0x1cd),'varity':'','description':_0x4c5956(0x1d4)},{'id':0x2,'name':'Multi\x20Grain\x20Combo\x20Cookies','image':_0x4c5956(0x1cc),'rating':3.9,'waight':'5kg','oldPrice':45.2,'newPrice':38.63,'category':_0x4c5956(0x1e7),'availability':_0x4c5956(0x1e5),'varity':_0x4c5956(0x1d1),'description':_0x4c5956(0x1d4)},{'id':0x3,'name':_0x4c5956(0x1ce),'image':_0x4c5956(0x1d5),'rating':3.3,'waight':'5kg','oldPrice':45.2,'newPrice':38.63,'category':_0x4c5956(0x1d3),'availability':_0x4c5956(0x1e5),'varity':_0x4c5956(0x1de),'description':_0x4c5956(0x1d4)},{'id':0x4,'name':_0x4c5956(0x1ca),'image':_0x4c5956(0x1c4),'rating':4.5,'waight':'2kg','oldPrice':20.2,'newPrice':18.63,'category':_0x4c5956(0x1b8),'availability':_0x4c5956(0x1cd),'varity':'','description':'Golden\x20and\x20gloriously\x20sweet.\x20Zespri™\x20SunGold™\x20Kiwifruit\x20taste\x20delicious\x20with\x20a\x20sweet\x20and\x20juicy\x20flavour,\x20making\x20them\x20perfect\x20for\x20a\x20snack\x20or\x20breakfast.\x20Just\x201\x20Zespri™\x20SunGold™\x20Kiwifruit\x20provides\x20100%\x20of\x20your\x20daily\x20vitamin\x20C\x20needs,\x20contributing\x20to\x20a\x20healthy\x20immune\x20system.\x20They\x27re\x20also\x20Low\x20GI\x20and\x20Low\x20Fodmap.'},{'id':0x5,'name':_0x4c5956(0x1d6),'image':_0x4c5956(0x1bd),'rating':4.5,'waight':_0x4c5956(0x1d7),'oldPrice':49.2,'newPrice':42.13,'category':'Dried\x20Fruits','availability':'In\x20stock','varity':_0x4c5956(0x1d1),'description':_0x4c5956(0x1d4)},{'id':0x6,'name':'Sungold\x20Kiwifruit\x20Punnet','image':'/images/product-7.webp','rating':4.3,'waight':'500g','oldPrice':39.6,'newPrice':0x21,'category':_0x4c5956(0x1dc),'availability':_0x4c5956(0x1e5),'description':_0x4c5956(0x1d4),'varity':'new'},{'id':0x7,'name':_0x4c5956(0x1e1),'image':_0x4c5956(0x1c7),'rating':3.7,'waight':_0x4c5956(0x1e9),'oldPrice':37.38,'newPrice':29.33,'category':_0x4c5956(0x1bb),'availability':'Out\x20of\x20stock','varity':'','description':'Golden\x20and\x20gloriously\x20sweet.\x20Zespri™\x20SunGold™\x20Kiwifruit\x20taste\x20delicious\x20with\x20a\x20sweet\x20and\x20juicy\x20flavour,\x20making\x20them\x20perfect\x20for\x20a\x20snack\x20or\x20breakfast.\x20Just\x201\x20Zespri™\x20SunGold™\x20Kiwifruit\x20provides\x20100%\x20of\x20your\x20daily\x20vitamin\x20C\x20needs,\x20contributing\x20to\x20a\x20healthy\x20immune\x20system.\x20They\x27re\x20also\x20Low\x20GI\x20and\x20Low\x20Fodmap.'},{'id':0x8,'name':'Dates\x20Value\x20Fresh\x20Pouch','image':_0x4c5956(0x1c3),'rating':3.9,'waight':_0x4c5956(0x1c2),'oldPrice':85.4,'newPrice':66.3,'category':_0x4c5956(0x1d3),'availability':_0x4c5956(0x1e5),'varity':_0x4c5956(0x1d1),'description':_0x4c5956(0x1d4)},{'id':0x9,'name':'Fresh\x20Mango\x20juice\x20pack','image':'/images/product-10.webp','rating':3.3,'waight':_0x4c5956(0x1c0),'oldPrice':21.2,'newPrice':16.05,'category':_0x4c5956(0x1dd),'availability':_0x4c5956(0x1e5),'varity':_0x4c5956(0x1de),'description':'Golden\x20and\x20gloriously\x20sweet.\x20Zespri™\x20SunGold™\x20Kiwifruit\x20taste\x20delicious\x20with\x20a\x20sweet\x20and\x20juicy\x20flavour,\x20making\x20them\x20perfect\x20for\x20a\x20snack\x20or\x20breakfast.\x20Just\x201\x20Zespri™\x20SunGold™\x20Kiwifruit\x20provides\x20100%\x20of\x20your\x20daily\x20vitamin\x20C\x20needs,\x20contributing\x20to\x20a\x20healthy\x20immune\x20system.\x20They\x27re\x20also\x20Low\x20GI\x20and\x20Low\x20Fodmap.'},{'id':0xa,'name':_0x4c5956(0x1cb),'image':_0x4c5956(0x1c1),'rating':4.9,'waight':'3\x20pcs','oldPrice':17.2,'newPrice':0xa,'category':_0x4c5956(0x1c6),'availability':_0x4c5956(0x1cd),'varity':'','description':'Golden\x20and\x20gloriously\x20sweet.\x20Zespri™\x20SunGold™\x20Kiwifruit\x20taste\x20delicious\x20with\x20a\x20sweet\x20and\x20juicy\x20flavour,\x20making\x20them\x20perfect\x20for\x20a\x20snack\x20or\x20breakfast.\x20Just\x201\x20Zespri™\x20SunGold™\x20Kiwifruit\x20provides\x20100%\x20of\x20your\x20daily\x20vitamin\x20C\x20needs,\x20contributing\x20to\x20a\x20healthy\x20immune\x20system.\x20They\x27re\x20also\x20Low\x20GI\x20and\x20Low\x20Fodmap.'},{'id':0xb,'name':_0x4c5956(0x1d8),'image':_0x4c5956(0x1db),'rating':0x5,'waight':'6pcs','oldPrice':80.2,'newPrice':60.13,'category':_0x4c5956(0x1dd),'availability':_0x4c5956(0x1e5),'varity':_0x4c5956(0x1d1),'description':_0x4c5956(0x1d4)},{'id':0xc,'name':_0x4c5956(0x1c8),'image':'/images/product-13.webp','rating':3.3,'waight':_0x4c5956(0x1da),'oldPrice':0x1e,'newPrice':26.13,'category':'Fresh\x20Fruit','availability':_0x4c5956(0x1e5),'varity':'new','description':_0x4c5956(0x1d4)},{'id':0xd,'name':_0x4c5956(0x1df),'image':_0x4c5956(0x1b6),'rating':0x4,'waight':_0x4c5956(0x1d0),'oldPrice':0x16,'newPrice':16.13,'category':_0x4c5956(0x1dd),'availability':_0x4c5956(0x1e5),'varity':_0x4c5956(0x1de),'description':_0x4c5956(0x1d4)},{'id':0xe,'name':'Mixed\x20Nuts\x20&\x20Almonds\x20Dry\x20Fruits','image':_0x4c5956(0x1e3),'rating':4.6,'waight':'500g','oldPrice':0x31,'newPrice':66.13,'category':_0x4c5956(0x1b8),'availability':'Out\x20of\x20stock','varity':'','description':_0x4c5956(0x1d4)},{'id':0xf,'name':'Berry\x20&\x20Grapes','image':_0x4c5956(0x1e8),'rating':2.6,'waight':'500g','oldPrice':0x31,'newPrice':30.13,'category':_0x4c5956(0x1c5),'availability':_0x4c5956(0x1e5),'varity':_0x4c5956(0x1de),'description':'Golden\x20and\x20gloriously\x20sweet.\x20Zespri™\x20SunGold™\x20Kiwifruit\x20taste\x20delicious\x20with\x20a\x20sweet\x20and\x20juicy\x20flavour,\x20making\x20them\x20perfect\x20for\x20a\x20snack\x20or\x20breakfast.\x20Just\x201\x20Zespri™\x20SunGold™\x20Kiwifruit\x20provides\x20100%\x20of\x20your\x20daily\x20vitamin\x20C\x20needs,\x20contributing\x20to\x20a\x20healthy\x20immune\x20system.\x20They\x27re\x20also\x20Low\x20GI\x20and\x20Low\x20Fodmap.'}];


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
        reader.onload = function(e) {
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
    const productsList = document.getElementById('table-body');
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

document.addEventListener('DOMContentLoaded', renderProducts);

document.getElementById('select-all').addEventListener('click', function (e) {
    const checkboxes = document.querySelectorAll('.products-list input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = e.target.checked;
    });
});

// Add event delegation for delete buttons
document.querySelector('.products-list').addEventListener('click', function (e) {
    // Check if clicked element is delete button or its child
    const deleteBtn = e.target.closest('.delete-btn');
    if (!deleteBtn) return;

    // Find the table row
    const row = deleteBtn.closest('tr');

    // Get product name from the row to identify product
    const productName = row.querySelector('h3').textContent;

    // Get products from localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Filter out the product to delete
    products = products.filter(product => product.name !== productName);

    // Save updated products back to localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Remove the row from DOM
    row.remove();
});

// Add event listener for category filter
document.getElementById('category-filter').addEventListener('change', function () {
    const selectedCategory = this.value;
    if (selectedCategory === 'All Collection') {
        renderProducts(); // Show all products
        return;
    }

    // Get products from localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Filter products by selected category
    const filteredProducts = products.filter(product =>
        product.category === selectedCategory
    );

    // Render filtered products
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

// Add event listener for price filter dropdown
document.getElementById('price-filter').addEventListener('change', function () {
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


// Add event listener for sort-by dropdown
document.getElementById('sort-by').addEventListener('change', function () {
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


// Add event listener for search input
document.getElementById('search-filter').addEventListener('input', (e) => {
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
