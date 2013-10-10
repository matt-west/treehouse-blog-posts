Reading Files Using The HTML5 FileReader API
==================================

HTML5 saw the introduction of a number of new APIs that can be used to handle files in the browser. These APIs make it much easier to accomplish tasks like reading and writing files or uploading a file created using JavaScript.

In this blog post you are going to learn how to use the [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) API to read the contents of a file from your local hard drive. You will be creating two demo applications. The first application will handle reading and then displaying the contents of a text file. The second will read an image file and then generate a data URL that will be used to display the image on the page.

Lets get going!


## The FileReader Interface

The `FileReader` interface provides a number of methods that can be used to read either `File` or `Blob` objects. These methods are all _asynchronous_ which means that your program will not stall whilst a file is being read. This is particularly useful when dealing with large files.

The following code shows how to create a new instance of `FileReader`.

<pre class="javascript">
var reader = new FileReader();
</pre>

In the following sections we are going to take a look at the methods provided by `FileReader`.


### readAsText()

The `readAsText()` method can be used to read text files. This method has two parameters. The first parameter is for the `File` or `Blob` object that is to be read. The second parameter is used to specify the encoding of the file. This second parameter is optional. If you don't specify an encoding `UTF-8` is assumed by default.

As this is an asynchronous method we need to setup an event listener for when the file has finished loading. When the `onload` event is called we can examine the `result` property of our `FileReader` instance to get the file's contents. You will need to use this same approach for all of the read methods provided by `FileReader`.

<pre class="javascript">
var reader = new FileReader();

reader.onload = function(e) {
  var text = reader.result;
}

reader.readAsText(file, encoding);
</pre>


### readAsDataURL()

The `readAsDataURL()` method takes in a `File` or `Blob` and produces a [data URL](http://css-tricks.com/data-uris/). This is basically a base64 encoded string of the file data. You can use this data URL for things like setting the `src` property for an image. We will look at how to do this later in the images demo.

<pre class="javascript">
var reader = new FileReader();

reader.onload = function(e) {
  var dataURL = reader.result;
}

reader.readAsDataURL(file);
</pre>


### readAsBinaryString()

The `readAsBinaryString()` method can be used to read any type of file. The method returns the raw binary data from the file. If you use `readAsBinaryString()` along with the `XMLHttpRequest.sendAsBinary()` method you can upload any file to a server using JavaScript.

<pre class="javascript">
var reader = new FileReader();

reader.onload = function(e) {
  var rawData = reader.result;
}

reader.readAsBinaryString(file);
</pre>


### readAsArrayBuffer()

The `readAsArrayBuffer()` method will read a `Blob` or `File` object and produce an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer). An `ArrayBuffer` is a fixed-length binary data buffer. They can come in handy when manipulating files (like converting a JPEG image to PNG).

<pre class="javascript">
var reader = new FileReader();

reader.onload = function(e) {
  var arrayBuffer = reader.result;
}

reader.readAsArrayBuffer(file);
</pre>


### abort()

The `abort()` method will stop a read operation. This can come in handy when reading large files.

<pre class="javascript">
reader.abort();
</pre>

Now that you have an understanding of how the `FileReader` API works lets take a look at a couple of examples.

## Example: Reading Text Files With The FileReader API

!!! Insert Demo Image !!!

<a class="button orange" href="http://codepen.io/matt-west/full/KjEHg" target="_blank">See the Demo</a> <a class="button" href="http://cl.ly/3h2R222J1j47" target="_blank">Download The Code</a> <a class="button" href="http://codepen.io/matt-west/pen/KjEHg" target="_blank">View on CodePen</a>

In this section you are going to learn how to build a small JavaScript application that reads a text file and displays it's contents within a `<pre>` element.

To get started we first need to setup the HTML for our demo. We are going to use a file `<input>` to handle selecting our file but you could also use [drag and drop](http://blog.teamtreehouse.com/implementing-native-drag-and-drop). We also need to add a `<pre>` element that will be used for displaying the file's contents.

<pre class="html">
&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
  &lt;meta charset=&quot;utf-8&quot;&gt;
  &lt;title&gt;File API&lt;/title&gt;

  &lt;link rel=&quot;stylesheet&quot; href=&quot;style.css&quot;&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div id=&quot;page-wrapper&quot;&gt;

    &lt;h1&gt;Text File Reader&lt;/h1&gt;
    &lt;div&gt;
      Select a text file: 
      &lt;input type=&quot;file&quot; id=&quot;fileInput&quot;&gt;
    &lt;/div&gt;
    &lt;pre id=&quot;fileDisplayArea&quot;&gt;&lt;/pre&gt;

  &lt;/div&gt;

  &lt;script src=&quot;text.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>

You can find a copy of the stylesheet used in this demo in the code resources.

Now it's time to start writing the JavaScript code for your application. Create a new file called `text.js` to house this code.

First we need to get references to the important elements within our HTML. Here we get references to the file `<input>` and the `<pre>` element and store them in variables called `fileInput` and `fileDisplayArea`. We also setup an event listener on the `fileInput` that listens for the `change` event. This will be fired whenever the user selects a file.

<pre class="javascript">
window.onload = function() {
    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');

    fileInput.addEventListener('change', function(e) {
      // Put the rest of the demo code here.
    });
}
</pre>

Now we need to write the code that will handle reading the text file. We first fetch the first file from our input by examining the `fileInput`s `files` property and store this in a variable called `file`. We then create another variable called `textType` that holds a regular expression that we will use later to test that the selected file is indeed a text file.

<pre class="javascript">
var file = fileInput.files[0];
var textType = /text.*/;
</pre>

In this next block of code we first check to make sure that the selected file is a text file by testing it's `type` property. If the file is not a text file we show a `File not supported!` message on the page.

Once we have determined that the file type is correct we create a new instance of `FileReader`. Next we setup an event listener for the `onload` event. Within this event listener we add some code that will update the `innerText` property of `fileDisplayArea` using the `result` property from our `FileReader`.

Finally we call the `readAsText()` method, passing in the `file` variable that we created earlier.

<pre>
if (file.type.match(textType)) {
  var reader = new FileReader();

  reader.onload = function(e) {
    fileDisplayArea.innerText = reader.result;
  }

  reader.readAsText(file);  
} else {
  fileDisplayArea.innerText = "File not supported!";
}
</pre>

If you load up the [live demo](http://codepen.io/matt-west/full/KjEHg) you should be able to select a file from your local hard drive and see it's contents displayed on the page.


## Example: Reading Image Files With The FileReader API

!!! Insert Demo Image !!!

<a class="button orange" href="http://codepen.io/matt-west/full/CfilG" target="_blank">See the Demo</a> <a class="button" href="http://cl.ly/3h2R222J1j47" target="_blank">Download The Code</a> <a class="button" href="http://codepen.io/matt-west/pen/CfilG" target="_blank">View on CodePen</a>

For our next demo we are going to create an application that reads an image file and then displays that image on the page. To do this we are going to be using the `readAsDataURL()` method.

The HTML markup for this demo is very similar to the HTML we used before. The main difference is that we are now using a `<div>` element as our `fileDisplayArea` rather than a `<pre>`. Note that the name of the JavaScript file has also changed to `images.js`.

<pre class="html">
&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
  &lt;meta charset=&quot;utf-8&quot;&gt;
  &lt;title&gt;File API&lt;/title&gt;

  &lt;link rel=&quot;stylesheet&quot; href=&quot;style.css&quot;&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div id=&quot;page-wrapper&quot;&gt;

    &lt;h1&gt;Image File Reader&lt;/h1&gt;
    &lt;div&gt;
      Select an image file: 
      &lt;input type=&quot;file&quot; id=&quot;fileInput&quot;&gt;
    &lt;/div&gt;
    &lt;div id=&quot;fileDisplayArea&quot;&gt;&lt;/div&gt;

  &lt;/div&gt;

  &lt;script src=&quot;images.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>

The initial JavaScript code for this demo is exactly the same as before. We get references to the key elements in our HTML and then setup an event listener for the file `<input>`.

<pre class="javascript">
window.onload = function() {
    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');

    fileInput.addEventListener('change', function(e) {
      // Put the rest of the demo code here.
    });
}
</pre>

Next we start by fetching the first file from `fileInput`. We then create the regular expression for checking the file type. This time we want an image file so the regular expression is: `/image.*/`.

As before, we do a check to make sure that the selected file is indeed an image.

We're now at the point where things start to get a little different. We start by creating a new instance of `FileReader` and then setting up an event listener for the `onload` event.

When this event listener is called we first need to clear out `fileDisplayArea` just in case there is already an image in there. We can do this by setting `fileDisplayArea.innerHTML` to an empty string.

Next we create a new `Image` instance and set it's `src` property to the data URL that is generated by `readAsDataURL()`. Remember, the data URL can be accessed from the `FileReader`'s `result` property. We then add `img` to the `fileDisplayArea` using `appendChild()`.

Finally we issue a call to `readAsDataURL()` and pass in the selected image file.

<pre class="javascript">
var file = fileInput.files[0];
var imageType = /image.*/;

if (file.type.match(imageType)) {
  var reader = new FileReader();

  reader.onload = function(e) {
    fileDisplayArea.innerHTML = "";

    // Create a new image.
    var img = new Image();
    // Set the img src property using the data URL.
    img.src = reader.result;

    // Add the image to the page.
    fileDisplayArea.appendChild(img);
  }

  reader.readAsDataURL(file); 
} else {
  fileDisplayArea.innerHTML = "File not supported!";
}
</pre>

Load up the [live demo]() and select a file from your hard drive. You should see that the file is display on the page. If you were to use the browser's developer tools to examine the `<img>` element you would see that the `src` attribute has been set using the data URL for the image you selected.


## Browser Support for the FileReader API

Browser support for the `FileReader` API is pretty good. The API will work in the latest versions of all the major desktop browsers. It's worth noting that Internet Explorer only started supporting `FileReader` in IE10.

| IE   | Firefox | Chrome | Safari | Opera  |
| :--: | :-----: | :----: | :----: | :----: |
| 10+  | 3.6+    | 6.0+   | 6.0+   | 11.1+  |

Source: <http://caniuse.com/filereader>


## Final Thoughts

Historically there has been a big divide between the capabilities of a native app and that of an application built with pure web technologies. Whilst I don't deny that this gap still exists, APIs like `FileReader` are really helping to close up the divide.

In this post you have learned how to use the `FileReader` API to read a file from the user's hard drive and display it's contents on the page. If you feel like a challenge why not try to create an application that allows the user to drop a file onto the page rather than using an `<input>` element. My previous post on [implementing native drag and drop](http://blog.teamtreehouse.com/implementing-native-drag-and-drop) should help to get you started.

## Useful Links

* [Can I Use... FileReader API](http://caniuse.com/filereader)
* [FileReader Docs (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
* [File API Specification (W3C)](http://www.w3.org/TR/FileAPI/#FileReader-interface)
