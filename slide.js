// Initialize slide index
var slideIndex = 1;

// Initialize cart items array
var cartItems = [];

// Function to initialize the slideshow
function initializeSlideshow() {
    showSlide(slideIndex);
}

// Function to navigate to the next or previous slide
function plusSlide(n) {
    showSlide(slideIndex += n);
}

// Function to navigate to a specific slide
function currentSlide(n) {
    showSlide(slideIndex = n);
}

// Function to display the current slide
function showSlide(n) {
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (var i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Function to add a product to the cart
function addToCart(productName) {
    showNotification(productName + " added to cart!");
    addToCartModal(productName);
}

// Function to show a notification
function showNotification(message) {
    var notification = document.getElementById("notification");
    notification.innerHTML = message;
    notification.classList.add("show");
    setTimeout(function () {
        notification.classList.remove("show");
    }, 3000);
}

// Function to add a product to the cart modal
function addToCartModal(productName) {
    var existingCartItem = findCartItem(productName);

    if (existingCartItem) {
        updateQuantity(productName, existingCartItem.quantity + 1);
    } else {
        var cartItem = createCartItem(productName);
        document.getElementById("cartItems").appendChild(cartItem);
        cartItems.push({ productName: productName, quantity: 1 });
        updateTotalPrice();
    }
}

// Function to create a cart item element
function createCartItem(productName) {
    var listItem = document.createElement("li");
    var cartItemDiv = document.createElement("div");
    cartItemDiv.className = "cart-item";
    cartItemDiv.appendChild(document.createTextNode(productName));

    var quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.value = 1;
    quantityInput.min = 1;
    quantityInput.addEventListener("input", function () {
        updateQuantity(productName, parseInt(quantityInput.value) || 0);
    });

    cartItemDiv.appendChild(quantityInput);
    listItem.appendChild(cartItemDiv);
    return listItem;
}

// Function to update the quantity and total price
function updateQuantity(productName, newQuantity) {
    var cartItem = findCartItem(productName);
    cartItem.quantity = newQuantity;
    updateCartItem(cartItem);
    updateTotalPrice();
}

// Function to update the cart item element
function updateCartItem(cartItem) {
    cartItem.element.innerHTML = cartItem.productName + " x" + cartItem.quantity;
}

// Function to update the total price
function updateTotalPrice() {
    var totalPrice = cartItems.reduce(function (total, cartItem) {
        var productPrice = getProductPrice();
        return total + cartItem.quantity * productPrice;
    }, 0);

    document.getElementById("cartTotalPrice").textContent = "Total Price: $" + totalPrice.toFixed(2);
}

// Function to retrieve the product price (replace with actual logic)
function getProductPrice() {
    return 25.00;
}

// Function to find a cart item by product name
function findCartItem(productName) {
    var cartItems = document.getElementById("cartItems").children;

    for (var i = 0; i < cartItems.length; i++) {
        var item = cartItems[i];
        if (item.dataset.productName === productName) {
            return {
                element: item,
                productName: productName,
                quantity: parseInt(item.dataset.quantity)
            };
        }
    }

    return null;
}

// Function to handle showing the cart modal
function openCartModal() {
    var cartModal = document.getElementById("cartModal");
    cartModal.style.display = "block";
    updateTotalPrice();
}

// Function to handle closing the cart modal
function closeCartModal() {
    var cartModal = document.getElementById("cartModal");
    cartModal.style.display = "none";
}

// Function to handle checkout
function checkout() {
    showNotification("Checkout with quantity: " + getSelectedQuantity());
    closeCartModal();
}

// Function to retrieve the selected quantity (replace with actual logic)
function getSelectedQuantity() {
    var quantityDropdown = document.getElementById("quantityDropdown");
    return quantityDropdown.value;
}

// Call the function to initialize the slideshow when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    initializeSlideshow();
});
