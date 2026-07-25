const products = [
    { id: 1, title: 'انگشتر طرح گل', category: 'ring', price: '۱۲,۵۰۰,۰۰۰', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=500' },
    { id: 2, title: 'گردنبند مروارید', category: 'necklace', price: '۱۸,۷۰۰,۰۰۰', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=500' },
    { id: 3, title: 'گوشواره بخیه‌ای', category: 'earrings', price: '۸,۲۰۰,۰۰۰', img: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=500' },
    { id: 4, title: 'انگشتر تک نگین', category: 'ring', price: '۱۵,۰۰۰,۰۰۰', img: 'https://images.unsplash.com/photo-1603561591411-071c4f723932?q=80&w=500' }
];

let cart = [];

function renderProducts(filter = 'all') {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    filtered.forEach(p => {
        grid.innerHTML += `
            <div class="product-card">
                <img src="${p.img}" alt="${p.title}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${p.title}</h3>
                    <p class="product-meta">عیار ۱۸ | وزن تقریبی: ۳ گرم</p>
                    <p class="product-price">${p.price} تومان</p>
                    <button class="add-to-cart" onclick="addToCart(${p.id})">افزودن به سبد</button>
                </div>
            </div>
        `;
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
    
    const icon = document.getElementById('cart-icon');
    icon.classList.add('shake');
    setTimeout(() => icon.classList.remove('shake'), 500);
}

function updateCart() {
    document.getElementById('cart-count').innerText = cart.length;
    const itemsContainer = document.getElementById('cart-items');
    itemsContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        itemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${item.price} تومان</div>
                    <button class="remove-item" onclick="removeFromCart(${index})">حذف</button>
                </div>
            </div>
        `;
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// مدیریت باز و بسته شدن سبد خرید
document.getElementById('cart-icon').onclick = () => document.getElementById('cart-drawer').classList.add('open');
document.getElementById('close-cart').onclick = () => document.getElementById('cart-drawer').classList.remove('open');

// فیلترها
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderProducts(e.target.dataset.filter);
    };
});

// واتساپ
document.getElementById('whatsapp-order').onclick = () => {
    if(cart.length === 0) return alert('سبد خرید شما خالی است');
    let text = "سلام، سفارش جدید از سایت:\n";
    cart.forEach(item => text += `- ${item.title} (${item.price} تومان)\n`);
    window.open(`https://wa.me/989123456789?text=${encodeURIComponent(text)}`);
};

renderProducts();
