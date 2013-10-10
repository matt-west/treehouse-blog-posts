window.onload = function () {
  
  // Get the buttons.
  var dialogBtn = document.getElementById('launchDialog');
  var modalBtn = document.getElementById('launchModal');
  var styledModalBtn = document.getElementById('launchStyledModal');
  var closeBtns = document.querySelectorAll('.close');
  
  
  // Get the dialogs.
  var dialog = document.getElementById('dialog');
  var modal = document.getElementById('modal');
  var styledModal = document.getElementById('styledModal');
  
  
  // Setup Event Listeners
  dialogBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    dialog.show();
  });
  
  modalBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    modal.showModal();
  });
  
  styledModalBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    styledModal.showModal();
  });
  
  for (var i = 0; i < closeBtns.length; i++) {
    closeBtns[i].addEventListener('click', function(e) {
      this.parentNode.close();
    });
  }
  
  
};
