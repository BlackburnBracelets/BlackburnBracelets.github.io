var slideIndex = 1;
var z = document.getElementsByClassName("slideshow");
for (i = 0; i < z.length; i++) {
    //set custom data attribute to first current image index
    z[i].setAttribute("data-currentslide", 1);
    showDivs(z[i].getAttribute("data-currentslide"), i);
}
function plusDivs(n, j) {
    //get custom data attribute value of current image index to slideshow class index j
    slideIndex = parseInt(z[j].getAttribute("data-currentslide"));
    showDivs(slideIndex += n, j);
}
function currentDiv(n, j) {
    showDivs(slideIndex = n, j); /* showDivs Not showSlides*/
}
function showDivs(n, j) {
    var i;
    var z = document.getElementsByClassName("slideshow")[j];
    var x = z.getElementsByClassName("mySlides");
    var dots = z.getElementsByClassName("dot");
    if (n > x.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = x.length;
    }
    //set custom data attribute to current image index
    z.setAttribute("data-currentslide", slideIndex);
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    x[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function addToCart(productName) {
    // Add your logic for adding to cart here
    // For now, let's just show a notification
    showNotification(productName + " added to cart!");
    // You can add the product to the cart modal as well
    addToCartModal(productName);
}

function showNotification(message) {
    var notification = document.getElementById("notification");
    notification.innerHTML = message;
    notification.style.display = "block";
    setTimeout(function () {
        notification.style.display = "none";
    }, 3000); // Hide the notification after 3 seconds
}

// Shopping Cart Modal functions
function addToCartModal(productName) {
    var cartItems = document.getElementById("cartItems");
    var listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(productName));
    cartItems.appendChild(listItem);
}

function openCartModal() {
    var cartModal = document.getElementById("cartModal");
    cartModal.style.display = "block";
}

function closeCartModal() {
    var cartModal = document.getElementById("cartModal");
    cartModal.style.display = "none";
}