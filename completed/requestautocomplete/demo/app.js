(function(){
  
  // Get the form and checkout button.
  var form = document.getElementById('checkout-form');
  var checkoutBtn = document.getElementById('checkout-btn');
  
  
  // Add an event listener for when the checkout button is clicked.
  checkoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Check for requestAutocomplete support.
    if (form.requestAutocomplete) {
      // We are go for launch, request the payment and shipping details.
      form.requestAutocomplete();  
    } else {
      // No support, redirect to the old school checkout page.
      window.location = '/checkout/';
    }
  });
  
  
  // Listen for a successful autocomplete.
  form.addEventListener('autocomplete', function(e) {
    // All is good, submit the form.
    form.submit();
  });
  
  
  // Listen for errors on autocomplete.
  form.addEventListener('autocompleteerror', function(e) {
    if (e.reason == 'cancel') {
      console.log('The user cancelled!');
    } else if (e.reason == 'invalid') {
      console.log('The data provided is invalid!');
    } else if (e.reason == 'disabled') {
      console.log('requestAutocomplete has either been disabled or has been called without an action from the user!');
    } else {
      console.log('An unknown error occured!');
    }
  });
  
  
  // Just for demo.
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    alert('The payment details have been collected. The user would now be forwarded to a confirmation page.');
  });
  
}());
