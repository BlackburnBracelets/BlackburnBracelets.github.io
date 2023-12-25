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

  // Create a div for each cart item
  var cartItemDiv = document.createElement("div");
  cartItemDiv.className = "cart-item";

  // Display the product name
  cartItemDiv.appendChild(document.createTextNode(productName));

  // Create a dropdown for quantity
  var quantityDropdown = document.createElement("select");
  quantityDropdown.id = "quantityDropdown";
  for (var i = 1; i <= 10; i++) {
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
  cartItems.appendChild(listItem);
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

function openCartModal() {
    var cartModal = document.getElementById("cartModal");
    cartModal.style.display = "block";
}

function closeCartModal() {
    var cartModal = document.getElementById("cartModal");
    cartModal.style.display = "none";
}