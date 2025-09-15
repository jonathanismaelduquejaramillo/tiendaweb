// Datos de productos de ejemplo
const productos = [
    {
        id: 1,
        nombre: "Laptop Gaming Pro",
        categoria: "laptops",
        precio: 1299.99,
        precioOriginal: 1599.99,
        descripcion: "Laptop de alta performance para gaming con RTX 4060 y procesador Intel i7",
        imagen: "fas fa-laptop",
        enOferta: true,
        descuento: 19
    },
    {
        id: 2,
        nombre: "Smartphone Ultra 5G",
        categoria: "smartphones",
        precio: 899.99,
        precioOriginal: 999.99,
        descripcion: "Smartphone con cámara de 108MP, 5G y batería de larga duración",
        imagen: "fas fa-mobile-alt",
        enOferta: true,
        descuento: 10
    },
    {
        id: 3,
        nombre: "Auriculares Bluetooth",
        categoria: "accesorios",
        precio: 199.99,
        precioOriginal: 299.99,
        descripcion: "Auriculares inalámbricos con cancelación de ruido activa",
        imagen: "fas fa-headphones",
        enOferta: true,
        descuento: 33
    },
    {
        id: 4,
        nombre: "Tablet Pro 12\"",
        categoria: "tablets",
        precio: 799.99,
        precioOriginal: null,
        descripcion: "Tablet profesional con pantalla de 12 pulgadas y procesador M2",
        imagen: "fas fa-tablet-alt",
        enOferta: false,
        descuento: 0
    },
    {
        id: 5,
        nombre: "MacBook Air M3",
        categoria: "laptops",
        precio: 1199.99,
        precioOriginal: null,
        descripcion: "La laptop más delgada con chip M3 y hasta 18 horas de batería",
        imagen: "fas fa-laptop",
        enOferta: false,
        descuento: 0
    },
    {
        id: 6,
        nombre: "iPhone 15 Pro",
        categoria: "smartphones",
        precio: 1199.99,
        precioOriginal: 1299.99,
        descripcion: "iPhone con titanio, cámara pro y chip A17 Pro",
        imagen: "fas fa-mobile-alt",
        enOferta: true,
        descuento: 8
    },
    {
        id: 7,
        nombre: "AirPods Pro",
        categoria: "accesorios",
        precio: 249.99,
        precioOriginal: null,
        descripcion: "Auriculares con cancelación de ruido adaptativa",
        imagen: "fas fa-headphones",
        enOferta: false,
        descuento: 0
    },
    {
        id: 8,
        nombre: "Smart Watch Ultra",
        categoria: "accesorios",
        precio: 449.99,
        precioOriginal: 599.99,
        descripcion: "Reloj inteligente resistente con GPS y monitor de salud",
        imagen: "fas fa-clock",
        enOferta: true,
        descuento: 25
    },
    {
        id: 9,
        nombre: "Gaming Laptop RTX",
        categoria: "laptops",
        precio: 1899.99,
        precioOriginal: 2199.99,
        descripcion: "Laptop gaming con RTX 4080, 32GB RAM y pantalla 144Hz",
        imagen: "fas fa-laptop",
        enOferta: true,
        descuento: 14
    },
    {
        id: 10,
        nombre: "Webcam 4K Pro",
        categoria: "accesorios",
        precio: 159.99,
        precioOriginal: 199.99,
        descripcion: "Cámara web 4K con micrófono dual integrado",
        imagen: "fas fa-video",
        enOferta: true,
        descuento: 20
    },
    {
        id: 11,
        nombre: "Mouse Gaming RGB",
        categoria: "accesorios",
        precio: 89.99,
        precioOriginal: null,
        descripcion: "Mouse inalámbrico para gaming con iluminación RGB personalizable",
        imagen: "fas fa-mouse",
        enOferta: false,
        descuento: 0
    },
    {
        id: 12,
        nombre: "Monitor 4K 32\"",
        categoria: "accesorios",
        precio: 699.99,
        precioOriginal: 899.99,
        descripcion: "Monitor 4K UHD de 32 pulgadas con tecnología HDR",
        imagen: "fas fa-desktop",
        enOferta: true,
        descuento: 22
    }
];

// Estado del carrito
let carrito = [];
let categoriaActual = 'todos';

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    cargarProductos();
    actualizarContadorCarrito();
});

// Funciones principales
function cargarProductos() {
    const grid = document.getElementById('productosGrid');
    const productosFiltrados = categoriaActual === 'todos' 
        ? productos 
        : productos.filter(p => p.categoria === categoriaActual);
    
    grid.innerHTML = '';
    
    productosFiltrados.forEach(producto => {
        const card = crearCardProducto(producto);
        grid.appendChild(card);
    });
}

function crearCardProducto(producto) {
    const card = document.createElement('div');
    card.className = 'producto-card';
    card.setAttribute('data-categoria', producto.categoria);
    
    card.innerHTML = `
        <div class="producto-img">
            <i class="${producto.imagen} fa-3x"></i>
            ${producto.enOferta ? `<div class="badge">-${producto.descuento}%</div>` : ''}
        </div>
        <div class="producto-info">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <div class="producto-precio">
                <div>
                    <span class="precio">${producto.precio}</span>
                    ${producto.precioOriginal ? `<span class="precio-original">${producto.precioOriginal}</span>` : ''}
                </div>
            </div>
            <button class="add-to-cart" onclick="agregarAlCarrito(${producto.id})">
                <i class="fas fa-shopping-cart"></i> Agregar al Carrito
            </button>
        </div>
    `;
    
    card.onclick = (e) => {
        if (!e.target.classList.contains('add-to-cart')) {
            mostrarDetalleProducto(producto);
        }
    };
    
    return card;
}

function filtrarCategoria(categoria) {
    categoriaActual = categoria;
    
    // Actualizar botones activos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    cargarProductos();
}

function buscarProductos() {
    const termino = document.getElementById('searchInput').value.toLowerCase();
    const grid = document.getElementById('productosGrid');
    
    const productosFiltrados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(termino) ||
        producto.descripcion.toLowerCase().includes(termino) ||
        producto.categoria.toLowerCase().includes(termino)
    );
    
    grid.innerHTML = '';
    
    if (productosFiltrados.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--gray);">
                <i class="fas fa-search fa-3x" style="margin-bottom: 1rem;"></i>
                <h3>No se encontraron productos</h3>
                <p>Intenta con otros términos de búsqueda</p>
            </div>
        `;
    } else {
        productosFiltrados.forEach(producto => {
            const card = crearCardProducto(producto);
            grid.appendChild(card);
        });
    }
}

// Funciones del carrito
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    const itemExistente = carrito.find(item => item.id === productoId);
    
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    actualizarCarrito();
    mostrarNotificacion('Producto agregado al carrito');
}

function eliminarDelCarrito(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    actualizarCarrito();
}

function actualizarCantidad(productoId, nuevaCantidad) {
    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(productoId);
        return;
    }
    
    const item = carrito.find(item => item.id === productoId);
    if (item) {
        item.cantidad = nuevaCantidad;
        actualizarCarrito();
    }
}

function actualizarCarrito() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (carrito.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart fa-3x" style="margin-bottom: 1rem; color: var(--gray);"></i>
                <h3>Tu carrito está vacío</h3>
                <p>Agrega algunos productos para comenzar</p>
            </div>
        `;
        cartTotal.textContent = '0.00';
    } else {
        cartItems.innerHTML = '';
        let total = 0;
        
        carrito.forEach(item => {
            total += item.precio * item.cantidad;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-img">
                    <i class="${item.imagen}"></i>
                </div>
                <div class="cart-item-info">
                    <h4>${item.nombre}</h4>
                    <div class="cart-item-price">${item.precio}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="actualizarCantidad(${item.id}, ${item.cantidad - 1})">-</button>
                        <span>${item.cantidad}</span>
                        <button class="quantity-btn" onclick="actualizarCantidad(${item.id}, ${item.cantidad + 1})">+</button>
                    </div>
                    <button class="remove-item" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        
        cartTotal.textContent = total.toFixed(2);
    }
    
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    const contador = document.getElementById('cartCount');
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    contador.textContent = totalItems;
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    cartSidebar.classList.toggle('open');
    overlay.style.display = cartSidebar.classList.contains('open') ? 'block' : 'none';
}

function procederCheckout() {
    if (carrito.length === 0) {
        mostrarNotificacion('Tu carrito está vacío', 'error');
        return;
    }
    
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    mostrarNotificacion('Redirigiendo al proceso de pago...', 'success');
    
    // Simular proceso de checkout
    setTimeout(() => {
        alert(`¡Gracias por tu compra!\nTotal: ${total.toFixed(2)}\nPedido procesado exitosamente.`);
        carrito = [];
        actualizarCarrito();
        toggleCart();
    }, 2000);
}

// Funciones del modal
function mostrarDetalleProducto(producto) {
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="modal-product-img">
            <i class="${producto.imagen} fa-4x"></i>
        </div>
        <h2>${producto.nombre}</h2>
        <p style="color: var(--gray); margin-bottom: 1rem;">${producto.descripcion}</p>
        <div class="producto-precio" style="margin-bottom: 1.5rem;">
            <div>
                <span class="precio" style="font-size: 2rem;">${producto.precio}</span>
                ${producto.precioOriginal ? `<span class="precio-original">${producto.precioOriginal}</span>` : ''}
            </div>
            ${producto.enOferta ? `<div class="badge">-${producto.descuento}%</div>` : ''}
        </div>
        <div style="margin-bottom: 1.5rem;">
            <h4>Características:</h4>
            <ul style="margin-top: 0.5rem; color: var(--gray);">
                <li>• Garantía de 2 años</li>
                <li>• Envío gratuito</li>
                <li>• Soporte técnico 24/7</li>
                <li>• Devolución en 30 días</li>
            </ul>
        </div>
        <button class="add-to-cart" onclick="agregarAlCarrito(${producto.id}); cerrarModal();" style="width: 100%; font-size: 1.2rem; padding: 1.2rem;">
            <i class="fas fa-shopping-cart"></i> Agregar al Carrito
        </button>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Funciones de utilidad
function scrollToProducts() {
    document.getElementById('productos').scrollIntoView({
        behavior: 'smooth'
    });
}

function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
}

function mostrarNotificacion(mensaje, tipo = 'success') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.innerHTML = `
        <i class="fas fa-${tipo === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${mensaje}</span>
    `;
    
    // Estilos para la notificación
    Object.assign(notificacion.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: tipo === 'success' ? 'var(--success-color)' : 'var(--danger-color)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: 'var(--shadow-lg)',
        zIndex: '1003',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        animation: 'slideInRight 0.3s ease-out'
    });
    
    document.body.appendChild(notificacion);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notificacion.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// Event listeners adicionales
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        cerrarModal();
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    }
});

// Búsqueda en tiempo real
document.getElementById('searchInput').addEventListener('input', function() {
    const termino = this.value.toLowerCase();
    if (termino.length >= 2) {
        buscarProductos();
    } else if (termino.length === 0) {
        cargarProductos();
    }
});

// Cerrar carrito al hacer clic fuera
document.addEventListener('click', function(e) {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartIcon = document.querySelector('.cart');
    
    if (cartSidebar.classList.contains('open') && 
        !cartSidebar.contains(e.target) && 
        !cartIcon.contains(e.target)) {
        toggleCart();
    }
});

// Animaciones CSS adicionales
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);