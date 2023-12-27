// Initialize slide indexes array
var slideIndexes = [];

// Initialize cart items array
var cartItems = [];

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

// Function to add or update an item in the cart modal
function addToCartModal(productName) {
    // Check if the item is already in the cart
    var existingItem = findCartItem(productName);

    if (existingItem) {
        // Update the quantity if the product is already in the cart
        existingItem.quantity++;
        // Update the dataset and text content separately
        existingItem.element.dataset.quantity = existingItem.quantity;
        existingItem.element.textContent = productName + " x" + existingItem.quantity;
        updateCartItem(existingItem);
    } else {
        // Add a new item to the cart
        var listItem = document.createElement("li");
        listItem.dataset.productName = productName;
        listItem.dataset.quantity = 1;
        listItem.appendChild(document.createTextNode(productName + " x1"));

        // Append the new item to the container that holds all cart items
        document.getElementById("cartItems").appendChild(listItem);

        // Add the new item to the cartItems array
        cartItems.push({ element: listItem, productName: productName, quantity: 1 });
    }
    // Update the total price and display it
    updateTotalPrice();
}



// Function to update the cart item
function updateCartItem(cartItem) {
    cartItem.element.innerHTML = cartItem.productName + " x" + cartItem.quantity;

    // Update the total price and display it
    updateTotalPrice();
}

function updateTotalPrice() {
    var totalPrice = 0;
    var totalQuantity = 0;

    // Calculate the total price and quantity based on cart items
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        var productPrice = getProductPrice();
        totalPrice += cartItem.quantity * parseFloat(productPrice);
        totalQuantity += cartItem.quantity;
    }

    // Display the total price and quantity in the cart modal
    document.getElementById("cartTotalPrice").textContent = "Total Price: $" + totalPrice.toFixed(2);
    document.getElementById("cartTotalQuantity").textContent = "Total Quantity: " + totalQuantity;
}

function getProductPrice() {
    // You can implement logic to get the price of each product based on its name
    // For simplicity, assuming all products have the same price in this example
    return 25.00; // Replace with actual logic for getting product price
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

   // Update the total price when opening the cart modal
   updateTotalPrice();
}

// Function to handle closing the cart modal
function closeCartModal() {
  var cartModal = document.getElementById("cartModal");
  cartModal.style.display = "none";
}

function checkout() {
    // Retrieve total quantity from the displayed element
    var totalQuantityElement = document.getElementById("cartTotalQuantity");
    var totalQuantity = parseInt(totalQuantityElement.textContent.replace("Total Quantity: ", ""));

    // Perform checkout logic with the total quantity
    // For now, let's just show a notification
    showNotification("Checkout with quantity: " + totalQuantity);

    // Close the cart modal
    closeCartModal();
}
