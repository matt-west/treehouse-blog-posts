# An Introduction to Web Sockets

In this blog post we're going to cover how to use WebSockets to create real-time web applications. Before we dive into learning about the WebSocket protocol and API I first want to spend a little time going through some of problems that face real-time web applications and how the WebSocket spec aims to solve them.

## A Brief History of Real-Time Web Applications

The web was built around the idea that a client's job is to request data from a sever, and a server's job is to fulfil those requests. This paradigm went unchallenged for a number of years but with the introduction of AJAX around 2005 many people started to explore the possibilities of making connections between a client and server *bidirectional*.

Web applications had grown up a lot and were now consuming more data than ever before. The biggest thing holding them back was the traditional HTTP model of client initiated transactions. To overcome this a number of different strategies were devised to allow servers to *push* data to the client. One of the most popular of these strategies was [*long-polling*](http://en.wikipedia.org/wiki/Push_technology#Long_polling). This involves keeping a HTTP connection open until the server has some data to push down to the client.

The problem with all of these solutions is that they carry the overhead of HTTP. Every time you make a HTTP request a bunch of headers and cookie data are transferred to the server. This can add up to a reasonably large amount of data that needs to be transferred, which in turn increases [*latency*](http://en.wikipedia.org/wiki/Latency_(engineering)). If you're building something like a browser-based game, reducing latency is crucial to keeping things running smoothly. The worst part of this is that a lot of these headers and cookies aren't actually needed to fulfil the client's request.

What we really need is a way of creating a persistent, low latency connection that can support transactions initiated by either the client or server. This is exactly what WebSockets provide and in this post you are going to learn all about how to use them in your own applications.


## How WebSockets Work

WebSockets provide a persistent connection between a client and server that both parties can use to start sending data at any time. 

The client establishes a WebSocket connection through a process known as the WebSocket handshake. This process starts with the client sending a regular HTTP request to the server. An `Upgrade` header is included in this request that informs the server that the client wishes to establish a WebSocket connection.

Here is a simplified example of the initial request headers.

```http
GET ws://websocket.example.com/ HTTP/1.1
Origin: http://example.com
Connection: Upgrade
Host: websocket.example.com
Upgrade: websocket
```

***
**Note:** WebSocket URLs use the `ws` scheme. There is also `wss` for secure WebSocket connections which is the equivalent of `HTTPS`.
***


If the server supports the WebSocket protocol, it agrees to the upgrade and communicates this through an `Upgrade` header in the response.

```http
HTTP/1.1 101 WebSocket Protocol Handshake
Date: Wed, 16 Oct 2013 10:07:34 GMT
Connection: Upgrade
Upgrade: WebSocket
```

Now that the handshake is complete the initial HTTP connection is replaced by a WebSocket connection that uses the same underlying TCP/IP connection. At this point either party can starting sending data.

With WebSockets you can transfer as much data as you like without incurring the overhead associated with traditional HTTP requests. Data is transferred through a WebSocket as *messages*. Each of which consists of one or more *frames* containing the data you are sending (the payload). In order to ensure the message can be properly reconstructed when it reaches the client each frame is prefixed with 4-12 bytes of data about the payload. Using this frame-based messaging system helps to reduce the amount of non-payload data that is transferred, leading to significant reductions in latency.

***
**Note:** It's worth noting that the client will only be notified about a new message once all of the frames have been received and the original message payload has been reconstructed.
***


## Setting up the Demo

In true Treehouse style you're going to be learning about the WebSocket API by creating a simple demo application that communicates with a WebSocket server. Before we dive into the details of the API you first need to set up a few files for your demo.

<a class="button orange" href="http://codepen.io/matt-west/full/tHlBb" target="_blank">See the Demo</a> <a class="button" href="http://cl.ly/2m303J2H0P0g" target="_blank">Download The Code</a> <a class="button" href="http://codepen.io/matt-west/pen/tHlBb" target="_blank">View on CodePen</a>

Create an `index.html` file and populate it with the following markup.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>WebSockets Demo</title>
  
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="page-wrapper">
    <h1>WebSockets Demo</h1>

    <div id="status">Connecting...</div>

    <ul id="messages"></ul>

    <form id="message-form" action="#" method="post">
      <textarea id="message" placeholder="Write your message here..." required></textarea>
      <button type="submit">Send Message</button>
      <button type="button" id="close">Close Connection</button>
    </form>
  </div>

  <script src="app.js"></script>
</body>
</html>
```

Here you have created a few key elements that will be used in your application. These include a `<div>` for displaying messages about the connection status; a list that will be used to display messages sent to, and received from the server; and a form for inputting messages.

The `style.css` file referenced here can be found in the code resources download.

Next up create a file called `app.js` and add the following JavaScript code to it.

```javascript
window.onload = function() {

  // Get references to elements on the page.
  var form = document.getElementById('message-form');
  var messageField = document.getElementById('message');
  var messagesList = document.getElementById('messages');
  var socketStatus = document.getElementById('status');
  var closeBtn = document.getElementById('close');

  // The rest of the code in this tutorial will go here...
};
```

Here you have created a number of variables and initialized them by fetching key elements on the page.


## Opening Connections

Okay so now that you've got your demo application set up we can start learning about the WebSocket API. To begin with you are going to learn how to create a new WebSocket connection.

Creating WebSocket connections is really simple. All you have to do is call the `WebSocket` constructor and pass in the URL of your server.

Copy the following code into your `app.js` file to create a new WebSocket connection.

```javascript
// Create a new WebSocket.
var socket = new WebSocket('ws://echo.websocket.org');
```

Once the connection has been established the `open` event will be fired on your WebSocket instance.

For your demo application you are going to add an event listener that will update the status `<div>` with a message to show the user that a connection has been established.

Add the following code to you `app.js` file.

```javascript
// Show a connected message when the WebSocket is opened.
socket.onopen = function(event) {
  socketStatus.innerHTML = 'Connected to: ' + event.currentTarget.URL;
  socketStatus.className = 'open';
};
```

Here you also add the class `open` to the status `<div>`, this is purely for styling purposes.


## Handling Errors

You can handle any errors that occur by listening out for the `error` event.

For your demo application you're just going to add some code that will log any errors to the console.

```javascript
// Handle any errors that occur.
socket.onerror = function(error) {
  console.log('WebSocket Error: ' + error);
};
```


## Sending Messages

To send a message through the WebSocket connection you call the `send()` method on your `WebSocket` instance; passing in the data you want to transfer.

```javascript
socket.send(data);
```

You can send both text and binary data through a WebSocket.

For your demo application you need to send the contents of the textarea to the server when the form is submitted. To do this you first need to set up an event listener on the form.

Add the following code to your `app.js` file.

```javascript
// Send a message when the form is submitted.
form.onsubmit = function(e) {
  e.preventDefault();

  // Retrieve the message from the textarea.
  var message = messageField.value;

  // Send the message through the WebSocket.
  socket.send(message);

  // Add the message to the messages list.
  messagesList.innerHTML += '<li class="sent"><span>Sent:</span>' + message +
                            '</li>';

  // Clear out the message field.
  messageField.value = '';

  return false;
};
```

When the form is submitted this code will retrieve the message from the `messageField` and send it through the WebSocket. The message is then added to the `messagesList` and displayed on the screen. To finish up, the value of `messageField` is reset ready for the user to type in a new message.


## Receiving Messages

When a message is received the `message` event is fired. This event includes a property called `data` that can be used to access the contents of the message.

For the demo application you need to create an event listener that will be fired when a new message is received. Your code should then retrieve the message from the event and display it in the `messagesList`.

To achieve this, copy the following code into your `app.js` file.

```javascript
// Handle messages sent by the server.
socket.onmessage = function(event) {
  var message = event.data;
  messagesList.innerHTML += '<li class="received"><span>Received:</span>' +
                             message + '</li>';
};
```


## Closing Connections

Once you're done with your WebSocket you can terminate the connection using the `close()` method.

```javascript
socket.close();
```

After the connection has been closed the browser will fire a `close` event. Attaching an event listener to the `close` event allows you to perform any clean up that you might need to do.

For your demo you will want to update the connection status when the connection is closed. Add the following code to your `app.js` file to do this. 

```javascript
// Show a disconnected message when the WebSocket is closed.
socket.onclose = function(event) {
  socketStatus.innerHTML = 'Disconnected from WebSocket.';
  socketStatus.className = 'closed';
};
```

To complete the demo application you need to add an event listener that will be fired when the 'Close Connection' button is clicked. This should call `close()` on the WebSocket.

```javascript
// Close the WebSocket connection when the close button is clicked.
closeBtn.onclick = function(e) {
  e.preventDefault();

  // Close the WebSocket.
  socket.close();

  return false;
};
```

Your demo application is now complete!

Open `index.html` in your browser and try sending some messages. You should see that the server echoes your messages back to you.


## Monitoring WebSocket Traffic with the Chrome Dev Tools

!!! Insert image of Chrome Dev Tools.

The developer tools in Google Chrome include a feature for monitoring traffic through a WebSocket. You can access this tool by following these steps:

* Open up the Developer Tools.
* Switch to the `Network` tab.
* Click on the entry for your WebSocket connection.
* Switch to the `Frames` tab.

This tools will show you a summary of all the data sent through the connection. In my testing it didn't seem to update automatically so you might need to switch in and out of the `Frames` tab if you're sending messages with the dev tools open.


## WebSockets on the Server

In this article we have mainly focused on how to use WebSockets from a client-side perspective. If you're looking to build your own WebSocket server there are plenty of libraries out there that can help you out. One of the most popular is [socket.io](http://socket.io/), a Node.JS library that provides cross-browser fallbacks so you can confidently use WebSockets in your applications today.

Some other libraries include:

* C++: [libwebsockets](http://git.warmcat.com/cgi-bin/cgit/libwebsockets/)
* Errlang: [Shirasu.ws](https://github.com/michilu/shirasu)
* Java: [Jetty](http://www.eclipse.org/jetty/)
* Node.JS: [ws](https://github.com/einaros/ws)
* Ruby: [em-websocket](https://github.com/igrigorik/em-websocket)
* Python: [Tornado](https://github.com/facebook/tornado), [pywebsocket](https://code.google.com/p/pywebsocket/)


## Browser Support for WebSockets

WebSockets are supported in almost all modern web browsers. The only exceptions being the Android browser and Opera Mini.

For up-to-date information on browser support check out: [Can I use Web Sockets](http://caniuse.com/websockets).


## Final Thoughts

In this post you've learned about the WebSocket protocol and how to use the new API to build real-time web applications.

WebSockets represent a big step in the evolution of the internet. Just as AJAX changed the game in the mid 2000s; having the ability to open bidirectional, low latency connections enables a whole new generation of real-time web applications. Including what I hope will be some pretty awesome games!

If you're interested in learning more about WebSockets - and browser networking in general - I recommend checking out some of the links below.


## Further Reading

* [High Performance Browser Networking: WebSocket](http://chimera.labs.oreilly.com/books/1230000000545/ch17.html)
* [IETF WebSocket Protocol](http://tools.ietf.org/html/rfc6455)
* [WebSocket.org](http://www.websocket.org/)
* [WebSockets (MDN)](https://developer.mozilla.org/en/docs/WebSockets)
* [WebSocket Specification (WHATWG)](http://www.whatwg.org/specs/web-apps/current-work/multipage/network.html)
* [Can I Use: Web Sockets](http://caniuse.com/websockets)
