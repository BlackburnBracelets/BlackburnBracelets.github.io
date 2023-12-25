// Initialize slide indexes array
var slideIndexes = [];

// Function to initialize each slideshow
function initializeSlideshows() {
    var slideshows = document.getElementsByClassName("slideshow");

    for (var i = 0; i < slideshows.length; i++) {
        var initialSlideIndex = 1;

        // Set custom data attribute to first current image index
        slideshows[i].setAttribute("data-currentslide", initialSlideIndex);

        // Initialize the current slide index
        slideIndexes[i] = initialSlideIndex;

        // Show the initial slide
        showDivs(initialSlideIndex, i);
    }
}

// Function to navigate to the next or previous slide
function plusDivs(n, j) {
    // Get custom data attribute value of current image index for slideshow class index j
    slideIndexes[j] += n;

    // Show the updated slide
    showDivs(slideIndexes[j], j);
}

// Function to navigate to a specific slide
function currentDiv(n, j) {
    // Show the specified slide
    showDivs(slideIndexes[j] = n, j);
}

// Function to display the current slide
function showDivs(n, j) {
    var slideshow = document.getElementsByClassName("slideshow")[j];
    var slides = slideshow.getElementsByClassName("mySlides");
    var dots = slideshow.getElementsByClassName("dot");

    // Handle slide index overflow
    if (n > slides.length) {
        slideIndexes[j] = 1;
    }
    if (n < 1) {
        slideIndexes[j] = slides.length;
    }

    // Set custom data attribute to the current image index
    slideshow.setAttribute("data-currentslide", slideIndexes[j]);

    // Hide all slides and remove active class from dots
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (var i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Display the current slide and mark the corresponding dot as active
    slides[slideIndexes[j] - 1].style.display = "block";
    dots[slideIndexes[j] - 1].className += " active";
}

// Call the function to initialize slideshows when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    initializeSlideshows();
});

function addToCart(productName) {
    // Add your logic for adding to cart here
    // For now, let's just show a notification
    showNotification(productName + " added to cart!");
    // You can add the product to the cart modal as well
    addToCartModal(productName);
}

// Function to show the notification with fading effect
function showNotification(message) {
  var notification = document.getElementById("notification");
  notification.innerHTML = message;
  notification.classList.add("show"); // Add the "show" class
  setTimeout(function () {
      notification.classList.remove("show"); // Remove the "show" class after 3 seconds
  }, 3000); // Hide the notification after 3 seconds
}

// Shopping Cart Modal functions
function addToCartModal(productName) {
    var cartItems = document.getElementById("cartItems");

    // Check if the product is already in the cart
    var existingItem = findCartItem(productName);

    if (existingItem) {
        // Update the quantity if the product is already in the cart
        existingItem.quantity++;
        updateCartItem(existingItem);
    } else {
        // Add a new item to the cart
        var listItem = document.createElement("li");
        listItem.dataset.productName = productName;
        listItem.dataset.quantity = 1;
        listItem.appendChild(document.createTextNode(productName + " x1"));
        cartItems.appendChild(listItem);
    }

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

// Function to update the cart item
function updateCartItem(cartItem) {
    cartItem.element.innerHTML = cartItem.productName + " x" + cartItem.quantity;
    cartItem.element.dataset.quantity = cartItem.quantity;
}

// Function to handle showing the cart modal
function openCartModal() {
  var cartModal = document.getElementById("cartModal");
  cartModal.style.display = "block";
}

// Function to handle closing the cart modal
function closeCartModal() {
  var cartModal = document.getElementById("cartModal");
  cartModal.style.display = "none";
}
