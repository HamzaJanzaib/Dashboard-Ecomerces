
function addProduct() {
    // Get all input values
    const productData = {
        name: document.getElementById('product-name').value,
        category: document.getElementById('product-categories').value,
        sku: document.getElementById('product-sku').value,
        weight: document.getElementById('product-weight').value,
        description: document.getElementById('product-description').value,
        status: document.getElementById('product-status').value,
        stock: document.getElementById('product-stock').value,
        rating: document.getElementById('product-rating').value,
        price: document.getElementById('product-price').value,
        specialPrice: document.getElementById('product-special-price').value,
        image: document.getElementById('file-upload').files[0]?.name || ''
    };

    // Validate required fields
    if (!productData.name || !productData.category || !productData.price) {
        alert('Please fill in all required fields (Name, Category, Price)');
        return;
    }

    // Get existing products from localStorage or initialize empty array
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Add new product with ID
    productData.id = products.length + 1;
    products.push(productData);

    // Save back to localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Clear form
    clearForm();

    alert('Product added successfully!');
    window.location.href = 'manage.html';
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
