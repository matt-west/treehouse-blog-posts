Cross-Domain Messaging With postMessage
===============================================

As we build an ecosystem where web applications can interact with one another we need a way of securely sending messages between windows. The `postMessage()` method provides just that.

For a long time sending messages between windows was only possible if the windows used the same protocol, port, and host. The `postMessage()` method lifts this restriction by providing a way to securely pass messages across domains.

In this blog post you are going to learn how to use the `postMessage()` method to communicate between a controller window and a receiver window running different domains.

## Sending Messages with postMessage()

The `postMessage()` method accepts two parameters.

* `message` - A string or object that will be sent to the receiving window.
* `targetOrigin` - The URL of the window that the message is being sent to. The protocol, port and hostname of the target window must match this parameter for the message to be sent. Specifying `"*"` will match any URL however this is strongly discouraged for security reasons.

This method should be called on the window that the message is being sent to. A reference to the target window can be obtained in a number of different ways:

* When using `window.open()` a reference to the new window will be returned by the `open()` method.
* For iframes you can access the `contentWindow` property on the desired iframe.

<pre class="javascript">
targetWindow.postMessage('Hello World!', 'http://example.com');
</pre>

Now lets take a look at how to receive messages sent to a window.

## Setting up Event Listeners to Receive Messages

When a call to `postMessage()` is executed successfully a [`MessageEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent) will be fired on the receiving window. You can use a standard event listener to watch for this event and execute some code when it occurs.

The event passed into the listener callback has a property called `data` that can be used to access the string or object that was sent by `postMessage()`.

<pre class="javascript">
window.addEventListener('message', function(e) {
  var message = e.data;
});
</pre>

## Demo: Communicating with an iframe

!!! Insert Image Here !!!

Now that you understand how to use `postMessage()` to pass messages between two windows on different domains lets take a look at an example.

In this section we are going to go through the code needed to create a simple demo that passes a message from a _controller_ page to a _receiver_ page that is embedded using an iframe.

<a class="button orange" href="http://codepen.io/matt-west/full/lpExI" target="_blank">See the Demo</a> <a class="button" href="http://cl.ly/3M1x3T1M0X2C" target="_blank">Download The Code</a> <a class="button" href="http://codepen.io/matt-west/pen/lpExI" target="_blank">View on CodePen</a>

### The Controller Window

To get started we need to write some HTML for the controller page. The main elements here are a `<button>` that will be used to send the message and an `<iframe>` that will display the receiver page (which is hosted on a different domain).

<pre class="html">
&lt;h1&gt;Controller Window&lt;/h1&gt;
&lt;p&gt;
  This document is on the domain: http://codepen.io
&lt;/p&gt;
&lt;p&gt;
  &lt;button id=&quot;send&quot;&gt;Send Message&lt;/button&gt;
&lt;/p&gt;

&lt;iframe id=&quot;receiver&quot; src=&quot;http://demos.matt-west.com/post-message/receiver.html&quot; width=&quot;500&quot; height=&quot;200&quot;&gt;
  &lt;p&gt;Your browser does not support iframes.&lt;/p&gt;
&lt;/iframe&gt;
</pre>

Turning to the JavaScript for the controller page, our first job is to get a reference to the receiver window and store it in a variable called `receiver`. We then get a reference to the button and store this in a variable called `btn`.

Next we need to write a function that will handle sending the message. This will be called when the user clicks the 'Send Message' button. In this function we call `postMessage()` on our `receiver` variable and pass in `'Hello Treehouse!'` as our message data. The receiver page is hosted on the domain `http://demos.matt-west.com` so we pass in that URL for the `targetOrigin` parameter.

Finally we setup an event listener on `btn` that will call the `sendMessage()` function when the button is clicked.

<pre class="javascript">
window.onload = function() {
  // Get the window displayed in the iframe.
  var receiver = document.getElementById('receiver').contentWindow;
  
  // Get a reference to the 'Send Message' button.
  var btn = document.getElementById('send');

  // A function to handle sending messages.
  function sendMessage(e) {
    // Prevent any default browser behaviour.
    e.preventDefault();

    // Send a message with the text 'Hello Treehouse!' to the receiver window.
    receiver.postMessage('Hello Treehouse!', 'http://demos.matt-west.com');
  }

  // Add an event listener that will execute the sendMessage() function
  // when the send button is clicked.
  btn.addEventListener('click', sendMessage);
}
</pre>

That's everything that we need for the controller window so lets move on and take a look at the code for the receiver.

### The Receiver Window

The HTML for the receiver window is pretty basic. The only key element here is a `<div>` with the ID `message` that will be used to display the message data passed to the window.

<pre class="html">
&lt;h1&gt;Receiver Window&lt;/h1&gt;
&lt;p&gt;
  This document is on the domain: http://demos.matt-west.com
&lt;/p&gt;
&lt;div id=&quot;message&quot;&gt;&lt;/div&gt;
</pre>

In the JavaScript for the receiver window we first need to get a reference to the `<div>` element in our HTML.

Next we create a function called `receiveMessage` that will be executed when the window receives a new message. Inside this function we first check to make sure that the message is coming from `http://s.codepen.io` (the domain for the controller page). Any website can pass a message to your page so it's best to always check the origin of the message before executing any code. The origin can be found by examining the `origin` property on the event. We then retrieve the message data from the `data` property of the `event`
 and use this to update the content of `messageEle`.

Finally we setup an event listener on the `window` that will execute the `receiveMessage()` function when the `message` event is fired.

<pre class="javascript">
window.onload = function() {
  // Get a reference to the div on the page that will display the
  // message text.
  var messageEle = document.getElementById('message');

  // A function to process messages received by the window.
  function receiveMessage(e) {
    // Check to make sure that this message came from the correct domain.
    if (e.origin !== "http://s.codepen.io")
      return;

    // Update the div element to display the message.
    messageEle.innerHTML = "Message Received: " + e.data;
  }

  // Setup an event listener that calls receiveMessage() when the window
  // receives a new MessageEvent.
  window.addEventListener('message', receiveMessage);
}
</pre>

If you load up the [live demo](http://codepen.io/matt-west/pen/lpExI) you should see that clicking the 'Send Message' button causes the `Hello Treehouse!` text to be displayed in the iframe. Success!

Try downloading the code archive and setting up this example for yourself. Be sure to change the domains in the JavaScript code to match your own.

## Browser Support For postMessage

Support for `postMessage()` has been around in browsers for some time now. Internet Explorer has included support since version 8 but it's worth noting that IE8 and IE9 only support `postMessage()` for communicating between a document and an iframe, support for cross-window/tab messaging arrived in IE10.

| IE  | Firefox | Chrome | Safari | Opera |
| :-: | :-----: | :----: | :----: | :---: |
| 8+  | 3.0+    | 1.0+   | 4.0+   | 9.5+  |


## Final Thoughts

In this blog post you have learned how to use `postMessage()` to communicate between two web pages that are hosted on different domains.

There are a few security considerations that need to be taken into account when using `postMessage()`. First make sure that you are always specifying full URLs as your `targetOrigin` parameter and not just using wildcards (`*`), otherwise you could inadvertently send data to a malicious website. Checking the origin of messages sent to your web pages is also a good way of keeping your pages secure.

It may not be something that you will find yourself using everyday but `postMessage()` is a really handy tool to have in your toolbox, especially if you do a lot of work with iframes.



## Useful Links

* [Window.postMessage Documentation (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/window.postMessage)
* [Can I use... Cross-Document Messaging](http://caniuse.com/#feat=x-doc-messaging)
