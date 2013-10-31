window.onload = function() {
var editorBtn = document.getElementById('editorBtn');
var element = document.getElementById('editor');

editorBtn.addEventListener('click', function(e) {
  e.preventDefault();

  if (element.isContentEditable) {
    // Disable Editing
    element.contentEditable = 'false';
    editorBtn.innerHTML = 'Enable Editing';
    // You could save any changes here.
  } else {
    element.contentEditable = 'true';
    editorBtn.innerHTML = 'Disable Editing';
  }
});
};
