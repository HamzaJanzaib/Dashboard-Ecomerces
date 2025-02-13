
// function addProduct() {
//     // Get all input values
//     const productData = {
//         name: document.getElementById('product-name').value,
//         category: document.getElementById('product-categories').value,
//         sku: document.getElementById('product-sku').value,
//         weight: document.getElementById('product-weight').value,
//         description: document.getElementById('product-description').value,
//         status: document.getElementById('product-status').value,
//         stock: document.getElementById('product-stock').value,
//         rating: document.getElementById('product-rating').value,
//         price: document.getElementById('product-price').value,
//         specialPrice: document.getElementById('product-special-price').value,
//         image: document.getElementById('file-upload').files[0]?.name || ''
//     };

//     // Validate required fields
//     if (!productData.name || !productData.category || !productData.price) {
//         alert('Please fill in all required fields (Name, Category, Price)');
//         return;
//     }

//     // Get existing products from localStorage or initialize empty array
//     let products = JSON.parse(localStorage.getItem('products')) || [];

//     // Add new product with ID
//     productData.id = products.length + 1;
//     products.push(productData);

//     // Save back to localStorage
//     localStorage.setItem('products', JSON.stringify(products));

//     // Clear form
//     clearForm();

//     alert('Product added successfully!');
//     window.location.href = 'manage.html';
// }

// function clearForm() {
//     document.getElementById('product-name').value = '';
//     document.getElementById('product-categories').selectedIndex = 0;
//     document.getElementById('product-sku').value = '';
//     document.getElementById('product-weight').value = '';
//     document.getElementById('product-description').value = '';
//     document.getElementById('product-status').value = '';
//     document.getElementById('product-stock').value = '';
//     document.getElementById('product-rating').value = '';
//     document.getElementById('product-price').value = '';
//     document.getElementById('product-special-price').value = '';
//     document.getElementById('file-upload').value = '';
// }

// function cancelProduct() {
//     clearForm();
//     window.location.href = 'manage.html';
// }


// const manageProducts = [
//     {
//         id: 1,
//         name: 'Natural Hub Cherry Karonda',
//         image: 'images/product-1.webp',
//         rating: 4.5,
//         weight: '1kg',
//         oldPrice: 65.00,
//         newPrice: 49.00,
//         category: 'Fruit',
//         availability: 'In stock',
//         variety: "new",
//     },
//     {
//         id: 2,
//         name: 'Fresh Mango juice pack',
//         image: 'images/product-2.webp',
//         rating: 2.5,
//         weight: '600ml',
//         oldPrice: 35.38,
//         newPrice: 30.33,
//         category: 'Tuber root',
//         availability: 'Out of stock',
//         variety: "",
//     },
//     {
//         id: 3,
//         name: 'Multi Grain Combo Cookies',
//         image: 'images/product-3.webp',
//         rating: 3.9,
//         weight: '5kg',
//         oldPrice: 45.20,
//         newPrice: 38.63,
//         category: 'Cookies',
//         availability: 'In stock',
//         variety: "sale",
//     },
//     {
//         id: 4,
//         name: 'Natural Hub Cherry Karonda',
//         image: 'images/product-4.webp',
//         rating: 3.3,
//         weight: '5kg',
//         oldPrice: 45.20,
//         newPrice: 38.63,
//         category: 'Dried Fruits',
//         availability: 'In stock',
//         variety: "new"
//     },
//     {
//         id: 5,
//         name: 'Stick Fiber Masala Magic',
//         image: 'images/product-5.webp',
//         rating: 4.5,
//         weight: '2kg',
//         oldPrice: 20.20,
//         newPrice: 18.63,
//         category: 'Foods',
//         availability: 'Out of stock',
//         variety: "",
//     },
//     {
//         id: 6,
//         name: 'Mixed Nuts Berries Pack',
//         image: 'images/product-6.webp',
//         rating: 4.5,
//         weight: '1.5kg',
//         oldPrice: 49.20,
//         newPrice: 42.13,
//         category: 'Dried Fruits',
//         availability: 'In stock',
//         variety: "sale",
//     }
// ];

// function renderProducts() {
//     const productsList = document.querySelector('.products-list');
//     let productsHTML = `
//         <div class="list-header">
//             <div class="header-item">Product Info</div>
//             <div class="header-item">Price</div>
//             <div class="header-item">Stock</div>
//             <div class="header-item">Status</div>
//         </div>
//     `;

//     manageProducts.forEach(product => {
//         // Calculate progress bar width based on availability
//         const progressWidth = product.availability === 'In stock' ? '90%' : '10%';
//         const stockCount = product.availability === 'In stock' ? '1000' : '0';
//         const stockText = product.availability === 'In stock' ? '900/1000' : '0/1000';

//         productsHTML += `
//             <div class="product-item">
//                 <div class="product-info">
//                     <img src="${product.image}" alt="${product.name}">
//                     <div class="product-details">
//                         <h3>${product.name}</h3>
//                         <span class="product-id">ID : ${product.id}</span>
//                     </div>
//                 </div>
//                 <div class="product-price">$${product.newPrice.toFixed(2)}</div>
//                 <div class="product-stock">
//                     <div class="stock-count">${stockCount}</div>
//                     <div class="stock-bar">
//                         <div class="progress" style="width: ${progressWidth}"></div>
//                     </div>
//                     <div class="stock-text">${stockText}</div>
//                 </div>
//                 <div class="product-status">
//                     <label class="switch">
//                         <input type="checkbox" ${product.availability === 'In stock' ? 'checked' : ''}>
//                         <span class="slider"></span>
//                     </label>
//                 </div>
//             </div>
//         `;
//     });

//     productsList.innerHTML = productsHTML;
// }

// document.addEventListener('DOMContentLoaded', renderProducts);



