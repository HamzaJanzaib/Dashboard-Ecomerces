
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
        window.location.href = './manage.html';
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


let products = [

    {
        id: 0,
        name: 'Natural Hub Cherry Karonda',
        image: '/images/product-1.webp',
        rating: 4.5,
        waight: '1kg',
        oldPrice: 65.00,
        newPrice: 49.00,
        category: 'Fruit',
        availability: 'In stock',
        varity: "new",
        description: "Golden and gloriously sweet. Zespri™ SunGold™ Kiwifruit taste delicious with a sweet and juicy flavour, making them perfect for a snack or breakfast. Just 1 Zespri™ SunGold™ Kiwifruit provides 100% of your daily vitamin C needs, contributing to a healthy immune system. They're also Low GI and Low Fodmap.",
    },
    {
        id: 1,
        name: 'Fresh Mango juice pack',
        image: '/images/product-2.webp',
        rating: 2.5,
        waight: '600ml',
        oldPrice: 35.38,
        newPrice: 30.33,
        category: 'Tuber root',
        availability: 'Out of stock',
        varity: "",
        description: "Golden and gloriously sweet. Zespri™ SunGold™ Kiwifruit taste delicious with a sweet and juicy flavour, making them perfect for a snack or breakfast. Just 1 Zespri™ SunGold™ Kiwifruit provides 100% of your daily vitamin C needs, contributing to a healthy immune system. They're also Low GI and Low Fodmap.",
    },
    {
        id: 2,
        name: 'Multi Grain Combo Cookies',
        image: '/images/product-3.webp',
        rating: 3.9,
        waight: '5kg',
        oldPrice: 45.20,
        newPrice: 38.63,
        category: 'Cookies',
        availability: 'In stock',
        varity: "sale",
        description: "Golden and gloriously sweet. Zespri™ SunGold™ Kiwifruit taste delicious with a sweet and juicy flavour, making them perfect for a snack or breakfast. Just 1 Zespri™ SunGold™ Kiwifruit provides 100% of your daily vitamin C needs, contributing to a healthy immune system. They're also Low GI and Low Fodmap.",
    },
    {
        id: 3,
        name: 'Natural Hub Cherry Karonda',
        image: '/images/product-4.webp',
        rating: 3.3,
        waight: '5kg',
        oldPrice: 45.20,
        newPrice: 38.63,
        category: 'Dried Fruits',
        availability: 'In stock',
        varity: "new",
        description: "Golden and gloriously sweet. Zespri™ SunGold™ Kiwifruit taste delicious with a sweet and juicy flavour, making them perfect for a snack or breakfast. Just 1 Zespri™ SunGold™ Kiwifruit provides 100% of your daily vitamin C needs, contributing to a healthy immune system. They're also Low GI and Low Fodmap.",
    },
    {
        id: 4,
        name: 'Stick Fiber Masala Magic',
        image: '/images/product-5.webp',
        rating: 4.5,
        waight: '2kg',
        oldPrice: 20.20,
        newPrice: 18.63,
        category: 'Foods',
        availability: 'Out of stock',
        varity: "",
        description: "Golden and gloriously sweet. Zespri™ SunGold™ Kiwifruit taste delicious with a sweet and juicy flavour, making them perfect for a snack or breakfast. Just 1 Zespri™ SunGold™ Kiwifruit provides 100% of your daily vitamin C needs, contributing to a healthy immune system. They're also Low GI and Low Fodmap.",
    },
    {
        id: 5,
        name: 'Mixed Nuts Berries Pack',
        image: '/images/product-6.webp',
        rating: 4.5,
        waight: '1.5kg',
        oldPrice: 49.20,
        newPrice: 42.13,
        category: 'Dried Fruits',
        availability: 'In stock',
        varity: "sale",
        description: "Golden and gloriously sweet. Zespri™ SunGold™ Kiwifruit taste delicious with a sweet and juicy flavour, making them perfect for a snack or breakfast. Just 1 Zespri™ SunGold™ Kiwifruit provides 100% of your daily vitamin C needs, contributing to a healthy immune system. They're also Low GI and Low Fodmap.",
    },
    {
        id: 6,
        name: 'Sungold Kiwifruit Punnet',
        image: '/images/product-7.webp',
        rating: 4.3,
        waight: '500g',
        oldPrice: 39.60,
        newPrice: 33.00,
        category: 'Fruit',
        availability: 'In stock',
        description: "Golden and gloriously sweet. Zespri™ SunGold™ Kiwifruit taste delicious with a sweet and juicy flavour, making them perfect for a snack or breakfast. Just 1 Zespri™ SunGold™ Kiwifruit provides 100% of your daily vitamin C needs, contributing to a healthy immune system. They're also Low GI and Low Fodmap.",
        varity: "new",
    },
    {
        id: 7,
        name: 'American Cream & Onion Flavour',
        image: '/images/product-8.webp',
        rating: 3.7,
        waight: '200g',
        oldPrice: 37.38,
        newPrice: 29.33,
        category: 'Snacks',
        availability: 'Out of stock',
        varity: "",
        description: "Golden and gloriously sweet. Zespri™ SunGold™ Kiwifruit taste delicious with a sweet and juicy flavour, making them perfect for a snack or breakfast. Just 1 Zespri™ SunGold™ Kiwifruit provides 100% of your daily vitamin C needs, contributing to a healthy immune system. They're also Low GI and Low Fodmap.",

    },
    {
        id: 8,
        name: 'Dates Value Fresh Pouch',
        image: '/images/product-9.webp',
        rating: 3.9,
        waight: '5kg',
        oldPrice: 85.40,
        newPrice: 66.30,
        category: 'Dried Fruits',
        availability: 'In stock',
        varity: "sale",
        description: "Golden and gloriously sweet. Zespri™ SunGold™ Kiwifruit taste delicious with a sweet and juicy flavour, making them perfect for a snack or breakfast. Just 1 Zespri™ SunGold™ Kiwifruit provides 100% of your daily vitamin C needs, contributing to a healthy immune system. They're also Low GI and Low Fodmap.",
    },
    {
        id: 9,
        name: 'Fresh Mango juice pack',
        image: '/images/product-10.webp',
        rating: 3.3,
        waight: '1kg',
        oldPrice: 21.20,
        newPrice: 16.05,
        category: 'Fresh Fruit',
        availability: 'In stock',
        varity: "new",
        description: "Golden and gloriously sweet. Zespri™ SunGold™ Kiwifruit taste delicious with a sweet and juicy flavour, making them perfect for a snack or breakfast. Just 1 Zespri™ SunGold™ Kiwifruit provides 100% of your daily vitamin C needs, contributing to a healthy immune system. They're also Low GI and Low Fodmap.",
    },
    {
        id: 10,
        name: 'Sweet Corn',
        image: '/images/product-11.webp',
        rating: 4.9,
        waight: '3 pcs',
        oldPrice: 17.20,
        newPrice: 10.00,
        category: 'Vegetables',
        availability: 'Out of stock',
        varity: "",
        description: "Golden and gloriously sweet. Zespri™ SunGold™ Kiwifruit taste delicious with a sweet and juicy flavour, making them perfect for a snack or breakfast. Just 1 Zespri™ SunGold™ Kiwifruit provides 100% of your daily vitamin C needs, contributing to a healthy immune system. They're also Low GI and Low Fodmap.",
    },
    {
        id: 11,
        name: 'Kamalam Fruit',
        image: '/images/product-12.webp',
        rating: 5.0,
        waight: '6pcs',
        oldPrice: 80.20,
        newPrice: 60.13,
        category: 'Fresh Fruit',
        availability: 'In stock',
        varity: "sale",
        description: "Golden and gloriously sweet. Zespri™ SunGold™ Kiwifruit taste delicious with a sweet and juicy flavour, making them perfect for a snack or breakfast. Just 1 Zespri™ SunGold™ Kiwifruit provides 100% of your daily vitamin C needs, contributing to a healthy immune system. They're also Low GI and Low Fodmap.",
    },
    {
        id: 12,
        name: 'Blue berry',
        image: '/images/product-13.webp',
        rating: 3.3,
        waight: '8pcs',
        oldPrice: 30.00,
        newPrice: 26.13,
        category: 'Fresh Fruit',
        availability: 'In stock',
        varity: "new",
        description: "Golden and gloriously sweet. Zespri™ SunGold™ Kiwifruit taste delicious with a sweet and juicy flavour, making them perfect for a snack or breakfast. Just 1 Zespri™ SunGold™ Kiwifruit provides 100% of your daily vitamin C needs, contributing to a healthy immune system. They're also Low GI and Low Fodmap.",
    },
    {
        id: 13,
        name: 'Pineapple',
        image: '/images/product-14.webp',
        rating: 4.0,
        waight: '1pcs',
        oldPrice: 22.00,
        newPrice: 16.13,
        category: 'Fresh Fruit',
        availability: 'In stock',
        varity: "new",
        description: "Golden and gloriously sweet. Zespri™ SunGold™ Kiwifruit taste delicious with a sweet and juicy flavour, making them perfect for a snack or breakfast. Just 1 Zespri™ SunGold™ Kiwifruit provides 100% of your daily vitamin C needs, contributing to a healthy immune system. They're also Low GI and Low Fodmap.",
    },
    {
        id: 14,
        name: 'Mixed Nuts & Almonds Dry Fruits',
        image: '/images/product-15.webp',
        rating: 4.6,
        waight: '500g',
        oldPrice: 49.00,
        newPrice: 66.13,
        category: 'Foods',
        availability: 'Out of stock',
        varity: "",
        description: "Golden and gloriously sweet. Zespri™ SunGold™ Kiwifruit taste delicious with a sweet and juicy flavour, making them perfect for a snack or breakfast. Just 1 Zespri™ SunGold™ Kiwifruit provides 100% of your daily vitamin C needs, contributing to a healthy immune system. They're also Low GI and Low Fodmap.",
    },
    {
        id: 15,
        name: 'Berry & Grapes',
        image: '/images/product-16.webp',
        rating: 2.6,
        waight: '500g',
        oldPrice: 49.00,
        newPrice: 30.13,
        category: 'Mix Snack',
        availability: 'In stock',
        varity: "new",
        description: "Golden and gloriously sweet. Zespri™ SunGold™ Kiwifruit taste delicious with a sweet and juicy flavour, making them perfect for a snack or breakfast. Just 1 Zespri™ SunGold™ Kiwifruit provides 100% of your daily vitamin C needs, contributing to a healthy immune system. They're also Low GI and Low Fodmap.",
    }


]
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
