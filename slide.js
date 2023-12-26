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
      // Initialize cart items array
      cartItems = [];
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
    var cartItems = document.getElementById("cartItems").children;

    // Check if the item is already in the cart
    var existingCartItem = findCartItem(productName);

    if (existingCartItem) {
        // If the item is in the cart, update the quantity
        existingCartItem.quantity += 1;
        updateCartItem(existingCartItem);
    } else {
        // If the item is not in the cart, create a new item
        var listItem = document.createElement("li");

        // Create a div for each cart item
        var cartItemDiv = document.createElement("div");
        cartItemDiv.className = "cart-item";

        // Display the product name
        cartItemDiv.appendChild(document.createTextNode(productName));

        // Create a dropdown for quantity
        var quantityDropdown = document.createElement("select");
        quantityDropdown.id = "quantityDropdown";
        for (var i = 0; i <= 10; i++) {
            var option = document.createElement("option");
            option.value = i;
            option.text = i;
            quantityDropdown.appendChild(option);
        }

        // Append the dropdown to the cart item div
        cartItemDiv.appendChild(quantityDropdown);

        // Append the cart item div to the list
        listItem.appendChild(cartItemDiv);

        // Append the list item to the cart items list
        document.getElementById("cartItems").appendChild(listItem);

        // Add the product to the cart items array with initial quantity as 1
        cartItems.push({ productName: productName, quantity: 1 });

        // Update the total price and display it
        updateTotalPrice();
    }
}

function updateQuantity(productName, newQuantity) {
  // Find the cart item by product name
  var cartItem = findCartItem(productName);

  // Update the quantity if the cart item exists
  if (cartItem) {
      cartItem.quantity = newQuantity;

      // Update the total price and display it
      updateTotalPrice();
  }
}

function updateTotalPrice() {
  var totalPrice = 0;

  // Calculate the total price based on cart items
  for (var i = 0; i < cartItems.length; i++) {
      var cartItem = cartItems[i];
      var productPrice = getProductPrice();
      totalPrice += cartItem.quantity * productPrice;
  }

  // Display the total price in the cart modal
  document.getElementById("cartTotalPrice").innerText = "$" + totalPrice.toFixed(2);
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

// Function to update the cart item
function updateCartItem(cartItem) {
    cartItem.element.innerHTML = cartItem.productName + " x" + cartItem.quantity;
    cartItem.element.dataset.quantity = cartItem.quantity;
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
  // Retrieve selected quantity from the dropdown
  var quantityDropdown = document.getElementById("quantityDropdown");
  var selectedQuantity = quantityDropdown.value;

  // Perform checkout logic with the selected quantity
  // For now, let's just show a notification
  showNotification("Checkout with quantity: " + selectedQuantity);
  
  // Close the cart modal
  closeCartModal();
}