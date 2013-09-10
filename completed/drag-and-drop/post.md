Implementing Native Drag and Drop
=================================

Drag and Drop is one of those interactions that can really help to make an interface simple to use. There are plenty of JavaScript libraries that can be used to create drag and drop interfaces but what many people don't know is that all of the major browsers actually have native support for drag and drop.

In this blog post you are going to learn how to make use of the native Drag and Drop API in order to create your own Drag and Drop interfaces.

## Making Elements Draggable

To get us started we are first going to take a look at how to make HTML elements draggable. This is done using the `draggable` attribute.

Setting the value of the `draggable` attribute to `true` informs the browser that this element can be dragged.

<pre>
&lt;div draggable=&quot;true&quot;&gt;Draggable Div&lt;/div&gt;
</pre>

***
**Note**: Some elements such as `<a>` and `<img>` are draggable by default in many browsers. It's best to explicitly add a `draggable` attribute just to be safe though.
***

## Listening for Drag Events

There are a number of events that are fired during a drag interaction. Some of these events are fired on the element that is being dragged and others are fired on elements on the page that serve as drop targets.

* `dragstart` - This event is fired on an element when it starts to be dragged by the user. It is not fired when dragging a file into the browser from the file system.
* `drag` - This event is continuously fired on the element being dragged during the interaction.
* `dragenter` - This event is fired when the dragged element enters a target element. The event listener should be setup on the target.
* `dragleave` - This event is fired when the dragged element leaves the target element.
* `dragover` - This event is continuously fired whilst the dragged element is over the target element.
* `drop` - This event is fired when the dragged element or file is dropped.
* `dragend` - This event is fired once the drag interaction has completed. It applies to the element that was dragged.

***
**Note**: Mouse events (such as `mousemove`) are not fired during a drag and drop interaction.
***

You can use a simple event listener to execute some code when one of these events is fired. For example the following would print out the text 'Drag Interaction Started!' to the console when the user initiated a drag interaction.

<pre>
draggableElement.addEventListener('dragstart', function(e) {
  console.log('Drag Interaction Started!');
});
</pre>

## The DataTransfer Object

When a drag interaction is initiated a `DataTransfer` object is created that is associated with the interaction. This object is used to store information about the drag interaction as well as data items.

Lets take a look at some of the properties and methods that the `DataTransfer` object has.

* `dropEffect` - The type of drag and drop interaction. This determines which cursor the browser should display during the interaction. Possibly values are: copy, move, link and none.
* `effectAllowed` - Specifies which types are allowed for this interaction. Possibly values are: copy, move, link, copyLink, copyMove, linkMove, all, none and uninitialized (the default, treated the same as all).
* `files` - A `FileList` containing `File` objects associated with this drag. This property comes in handy when dragging files into the browser.
* `types` - A list of format types for the data stored in the `DataTransfer` object.
* `setData(format, data)` - This method is used to store some data within the `DataTransfer` object. The format string should be used to specify the format of the data being stored (i.e. 'text', 'url', 'text/html').
* `getData(format)` - This method is used to retrieve data from the `DataTransfer` object.
* `clearData(format)` - This method is used to clear out data stored in the `DataTransfer` object. Specifying the optional `format` parameter will only delete data that matches that format, otherwise all data will be deleted.
* `setDragImage(imgElement, x, y)` - This method is used to specify a custom image that should be displayed when the element is being dragged. By default, many browsers will just display a semi-transparent version of the source element. You should pass in an `img` element (not a path to an image) as well as `x` and `y` parameters that specify the position of the image relative to the mouse cursor.

The `dataTransfer` object is accessible on the event that is passed into your event listener function blocks. For example:

<pre>
draggableElement.addEventListener('dragstart', function(event) {
  event.dataTransfer.setData('text', 'Hello World!');
});
</pre>

## Drag and Drop with Page Elements

Now that you have some knowledge about the Drag and Drop API lets take a look at an example. Here we are going to keep things relatively simple and just focus on moving page elements, later you'll learn how to drag files into the browser.

<a href="http://demos.matt-west.com/drag-and-drop/" target="_blank" class="button orange">See The Demo</a> <a href="http://cl.ly/3g150v2z1019" target="_blank" class="button">Download The Code</a>

First we need to write a bit of HTML that includes some draggable elements and a `<div>` element that will act as our drop target.

<pre>
&lt;ul id=&quot;drag-elements&quot;&gt;
  &lt;li draggable=&quot;true&quot;&gt;Element One&lt;/li&gt;
  &lt;li draggable=&quot;true&quot;&gt;Element Two&lt;/li&gt;
  &lt;li draggable=&quot;true&quot;&gt;Element Three&lt;/li&gt;
  &lt;li draggable=&quot;true&quot;&gt;Element Four&lt;/li&gt;
  &lt;li draggable=&quot;true&quot;&gt;Element Five&lt;/li&gt;
&lt;/ul&gt;

&lt;div id=&quot;drop-target-one&quot;&gt;
  Drop Here!
&lt;/div&gt;
</pre>

Now that the HTML is setup we need to switch over to a JavaScript file and start writing some code to handle the Drag and Drop interaction.

Lets start by creating some variables and initializing them with the elements in our markup. The `elementDragged` variable will be used to track which of the elements is currently being dragged (this will come in handy later).

<pre>
// Get the div element that will serve as the drop target.
var dropZoneOne = document.querySelector('#drop-target-one');

// Get the draggable elements.
var dragElements = document.querySelectorAll('#drag-elements li');

// Track the element that is being dragged.
var elementDragged = null;
</pre>

The next thing to do is to setup event listeners for when the drag interaction starts and ends. These event listeners should be applied to each of the draggable elements so I've setup a `for` loop that will cycle through all of the elements stored in the `dragElements` variable.

When the `dragstart` event is fired we need to set the value of the `effectAllowed` property to `move`. We are also going to store the text content of the dragged element within our `dataTransfer` object. Finally we'll set the `elementDragged` variable that we created earlier to the element that is being dragged.

For the `dragend` event we just need to do a little cleanup and set the `elementDragged` variable back to `null`.

<pre>
for (var i = 0; i < dragElements.length; i++) {

  // Event Listener for when the drag interaction starts.
  dragElements[i].addEventListener('dragstart', function(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text', this.innerHTML);
    elementDragged = this;
  });

  // Event Listener for when the drag interaction finishes.
  dragElements[i].addEventListener('dragend', function(e) {
    elementDragged = null;
  });

};
</pre>

Next we need to create an event listener that will fire when the element is dragged over the drop target. This should set the `dropEffect` property of the `dataTransfer` object to `move`, prompting the browser to update the cursor style.

Make sure to setup this event listener outside of the `for` loop used previously, and using the `dropZoneOne` variable.

<pre>
// Event Listener for when the dragged element is over the drop zone.
dropZoneOne.addEventListener('dragover', function(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  e.dataTransfer.dropEffect = 'move';

  return false;
});
</pre>

***
**Note**: Calling `e.preventDefault()` and `e.stopPropagation()` (used later in this post) just stops the browser from executing any default behaviour that might mess with our drag interaction.
***

It would be nice if the styling of the drop zone changed when the element was dragged over it. To do this we need to apply a class to the drop target when the `dragenter` event is fired and then remove this class when `dragleave` is fired.

***
**Note**: We use `dragenter` and `dragleave` rather than `dragover` because `dragover` is called continuously whilst this element is over the target. `dragenter` and `dragleave` are only called once each. It's best to minimize the amount of work the browser has to do wherever possible.
***

<pre>
// Event Listener for when the dragged element enters the drop zone.
dropZoneOne.addEventListener('dragenter', function(e) {
  this.className = "over";
});

// Event Listener for when the dragged element leaves the drop zone.
dropZoneOne.addEventListener('dragleave', function(e) {
  this.className = "";
});
</pre>

The final event listener we need to setup is for the `drop` event. When this is fired we need to do a few things. First we need to remove the `over` class from the drop target. We then need to retrieve the data that we stored in the `dataTransfer` object and use it to update the text displayed in the drop target. Finally we need to remove the dragged element from the DOM.

<pre>
// Event Listener for when the dragged element dropped in the drop zone.
dropZoneOne.addEventListener('drop', function(e) {
  if (e.preventDefault) e.preventDefault(); 
  if (e.stopPropagation) e.stopPropagation(); 

  this.className = "";
  this.innerHTML = "Dropped " + e.dataTransfer.getData('text');

  // Remove the element from the list.
  document.querySelector('#drag-elements').removeChild(elementDragged);

  return false;
});
</pre>

If you've been coding along you should now have a working Drag and Drop UI!

For those that haven't, you can always check out the live demo.

<a href="http://demos.matt-west.com/drag-and-drop/" target="_blank" class="button orange">See the Demo</a>

## Drag and Drop with Files

Now that you're feeling a bit more confident with the Drag and Drop API lets take a look at an example that is a little more complex.

In this section you are going to learn how to drag a text file into the browser, read the contents of that file and the display the contents on the page. 

To get started we first need to write some HTML. This time we just need a drop target and a `<pre>` element that will be used to display the contents of the file.

<pre>
&lt;div id=&quot;dd-files&quot;&gt;Drop a .txt file here&lt;/div&gt;
&lt;pre id=&quot;file-content&quot;&gt;&lt;/pre&gt;
</pre>

As we did before, lets start the JavaScript code by getting references to the two elements in our markup.

<pre>
var dropZoneTwo = document.querySelector('#dd-files');
var fileContentPane = document.querySelector('#file-content');
</pre>

Next we need to setup an event listener that will set the `dropEffect` to `copy` when the file is dragged over the drop target.

***
**Note**: The `dragstart` event is not fired when dragging a file into the browser.
***

<pre>
// Event Listener for when the dragged file is over the drop zone.
dropZoneTwo.addEventListener('dragover', function(e) {
  if (e.preventDefault) e.preventDefault(); 
  if (e.stopPropagation) e.stopPropagation(); 

  e.dataTransfer.dropEffect = 'copy';
});
</pre>

Now we need to setup an event listener for `dragenter` that will add a class to the drop target when the file enters the element. We also need an event listener for `dragleave` to remove that class when the dragged file leaves.

<pre>
// Event Listener for when the dragged file enters the drop zone.
dropZoneTwo.addEventListener('dragenter', function(e) {
  this.className = "over";
});

// Event Listener for when the dragged file leaves the drop zone.
dropZoneTwo.addEventListener('dragleave', function(e) {
  this.className = "";
});
</pre>

When the file is dropped in the target element we need to remove the class, read the file and then display the file's contents on the screen.

We can access the file by taking a look at the `dataTransfer` object's `files` property.

First we use an `if` statement to check that there are files associated with this drag interaction. Then we retrieve the first file and pass this to the `readTextFile` function that we will write next.

<pre>
// Event Listener for when the dragged file dropped in the drop zone.
dropZoneTwo.addEventListener('drop', function(e) {
  if (e.preventDefault) e.preventDefault(); 
  if (e.stopPropagation) e.stopPropagation(); 

  this.className = "";

  var fileList = e.dataTransfer.files;

  if (fileList.length > 0) {
    readTextFile(fileList[0]);
  }
});
</pre>

The final piece of the puzzle is the `readTextFile` function. This is responsible for reading the contents of a file and adding it to the `<pre>` element in your markup.

If you haven't dealt with blobs or the `FileReader` API before the following code may look a bit alien.

First we create a new instance of `FileReader` (`reader`) and then define a callback that should be executed when the file has loaded. Inside this callback we first examine the event to check if the FileReade is done. If it is, we get the content from `reader.result` and update the `innerHTML` property of the `fileContentPane` to include the file name and content.

Now that we have the callback sorted we create a blob from the file that was dragged into the browser and then pass this to the `reader.readAsBinaryString()` function.

<pre>
// Read the contents of a file.
function readTextFile(file) {
  var reader = new FileReader();

  reader.onloadend = function(e) {
    if (e.target.readyState == FileReader.DONE) {
      var content = reader.result;
      fileContentPane.innerHTML = "File: " + file.name + "\n\n" + content;
    }
  }

  var blob = file.slice(0, file.size);
  reader.readAsBinaryString(blob);
}
</pre>

If you open up the live demo you should be able to drop a .txt file onto the target and see the contents of the file displayed in the `<pre>` element below.

<a href="http://demos.matt-west.com/drag-and-drop/" target="_blank" class="button orange">See The Demo</a> <a href="http://cl.ly/3g150v2z1019" target="_blank" class="button">Download The Code</a>

## Browser Compatibility

Browser support for native drag and drop is actually pretty good. All the major desktop browsers support the API. Support amongst mobile browsers is poor though, with only IE Mobile supporting native drag and drop.

* IE 10+ - Partially supported in versions 5.5 and up (no files)
* IE Mobile 10
* Firefox 3.5+
* Chrome 4.0+
* Safari 3.1+
* Opera 12+

You can find a comprehensive list of supported browsers at [caniuse.com](http://caniuse.com/#feat=dragndrop).

## Final Thoughts

The Drag and Drop API has a lot of possible uses within modern web applications. With pretty robust browser support on desktop it seems that we could be seeing it used a lot more in the future.

The future is a little more blurry for mobile devices though. Touch screen devices are a natural environment for drag and drop interfaces and yet (despite significant advances in other areas related to touch) native drag and drop is still missing.

I'm interested to hear your thoughts on the Drag and Drop API. How do you see yourself using the API in your projects? and what are your thoughts about Drag and Drop on mobile?

## Useful Links

* [Drag and Drop Specification (WHATWG)](http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html)
* [Drag and Drop Documentation (MDN)](https://developer.mozilla.org/en-US/docs/DragDrop/Drag_and_Drop)
* [Can I use... Drag and Drop](http://caniuse.com/#feat=dragndrop)
