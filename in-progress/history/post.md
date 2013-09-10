Getting Started with The History API
====================================

![Getting Started with The History API](history-api.jpg)

Over the past decade, web applications have evolved to make heavy use of JavaScript in order to dynamically load content into web pages. One of the big challenges that developers face when creating these applications is preserving an accurate and useful browser history. Without this many of a browsers most used features, like the back and forward buttons, will not work as expected.

Browsers traditionally create history entries when a new page is visited but with a lot of applications now using AJAX to dynamically load content this method of tracking the session history is no longer sufficient. The History API gives developers the ability to navigate and manipulate the  history so that an accurate representation of the user's browsing pattern can be stored.

## Navigating The Session History

In this first section you are going to learn about the methods used to navigate between history entries. Some of these methods mimic the functionality of the browser's native controls.

All of the following methods and properties are part of the `History` object that can be accessed using `window.history`. 

***
**Note**: The history interface is scoped to the current tab or frame so you can only navigate or manipulate the history associated with the current session. You cannot use the History API to access the global history for the browser as a whole.
***

### The back() Method

Calling the `back()` method will cause the browser to navigate back to the previous entry in the session history. This mimics the behaviour of the browsers native back button.

<pre class="javascript">
window.history.back();
</pre>

### The forward() Method

The `forward()` method will cause the browser to navigate one place forward in the browser history.

<pre class="javascript">
window.history.forward();
</pre>

### The go(n) Method

The `go(n)` method allows you to navigate back or forward `n` number of places in the session history. To navigate backwards `n` should be a negative number.

<pre class="javascript">
// Go back two entries.
window.history.go(-2);

// Go forward 3 entries.
window.history.go(3);
</pre>

### The length Property

The history objects `length` property tells you how many entries are in the session history. This can be useful when used in conjunction with the `go()` method.

<pre class="javascript">
// Go back to the first page.
// (Assuming the you are starting on the last page.)
var moves = window.history.length - 1;
window.history.go(-moves);
</pre>

## Manipulating The Session History

Now that you know how to navigate the browser history lets take a look at the methods used to create and manipulate history entries.

### The pushState() Method

The `pushState()` method is used to create a new history entry. This method has three parameters:

* `stateObj` - The state object is used to store data that is associated the new history entry. This could include the page title, a URL to load via AJAX or even the page content itself.
* `title` - The `title` parameter should act as a description for the history entry.
* `URL` - (optional) This is the URL that will be associated with the history entry. The browser won't load this URL when `pushState()` is called, but will display it in the address bar. It's worth noting that this URL may be loaded if the user decides to refresh the page or restarts the browser.

<pre class="javascript">
// Creates a new history entry.
window.history.pushState(stateObj, title, URL);
</pre>

### The replaceState() Method

The `replaceState()` method is similar to `pushState()` in that it takes the same three parameters. However, rather than creating a new history entry, `replaceState()` updates the current history entry. This can be useful if you want to add some data to your state object after `pushState()` has been called.

<pre class="javascript">
// Updates the current history entry.
window.history.replaceState(stateObj, title, URL);
</pre>


***
**Note**: The `pushState()` and `replaceState()` methods will not cause a `hashchange` event to be fired.
***


### The popstate Event

The `popstate` event is fired on `window` when the active history entry changes. Most commonly when the browsers back or forward buttons are clicked (or a call to `back()`, `forward()` or `go()` is executed).

The event passed into the listener callback contains a `state` property that is used to retrieve the state object that is associated with the history entry.

<pre class="javascript">
window.addEventListener('popstate', function(event) {
  var state = event.state;
});
</pre>

It's worth noting that calls to `pushState()` and `replaceState()` will not trigger a `popstate` event.

Chrome and Safari will fire a `popstate` event when the page loads but Firefox doesn't.


### The state Property

To retrieve the state object for the current history entry you can examine the `state` property on the `window.history` object. This is useful if you need to read the state object when a `popstate` event has not been fired.

<pre class="javascript">
window.history.state;
</pre>

## Demo: Using the History API in The Wild

Now that you understand how the History API works I'm going to guide you through how to build a simple web application that makes use of the API.

In this section you are going to build an application that consists of a number of pages that are loaded from a JavaScript object. You will use the History API to create history entries for each of the pages as they are displayed.

<a class="button orange" href="http://demos.matt-west.com/history-api/" target="_blank">See the Demo</a> <a class="button " href="http://cl.ly/223v1N3e211k" target="_blank">Download The Code Resources</a>

### Creating the HTML and CSS

To begin with you will need to create an HTML file that contains some navigation links, a `<h1>` for the page title and a `<div>` for the content.

The `style.css` file used in this demo can be found in the code resources.

<pre class="html">
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;title&gt;History API Demo&lt;/title&gt;

  &lt;link rel=&quot;stylesheet&quot; href=&quot;style.css&quot;&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div id=&quot;page-wrapper&quot;&gt;
    &lt;nav&gt;
      &lt;ul&gt;
        &lt;li&gt;&lt;a href=&quot;index.html&quot; class=&quot;load-content&quot;&gt;Home&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href=&quot;about.html&quot; class=&quot;load-content&quot;&gt;About&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href=&quot;products.html&quot; class=&quot;load-content&quot;&gt;Products&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href=&quot;contact.html&quot; class=&quot;load-content&quot;&gt;Contact&lt;/a&gt;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/nav&gt;

    &lt;h1 id=&quot;title&quot;&gt;&lt;/h1&gt;
    &lt;div id=&quot;content&quot;&gt;&lt;/div&gt;
  &lt;/div&gt;

  &lt;script src=&quot;history.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>

### Setting Up Your JavaScript

Now that you've got your HTML and CSS setup you need to create a file that will contain your JavaScript code.

Create a new file called `history.js` and add to it the following code.

<pre class="javascript">
window.onload = function() {
  
  // Content for the pages.
  // Note: You would probably want to load the page content using 
  // AJAX in a real application.
  var pages = {
    index: {
      title: "Home Page",
      content: "This is the home page."
    },
    about: {
      title: "About",
      content: "Some content about the business."
    },
    products: {
      title: "Products",
      content: "Buy some of our great products!"
    },
    contact: {
      title: "Contact",
      content: "Say hello! We love to chat."
    }
  }

  // Put the rest of the code in this tutorial here.
}
</pre>

Here you have created a JavaScript object called `pages` that contains four pages. Each of the pages has a title and some content.

***
**Note**: The code download includes a second example that demonstrates how to use AJAX to load the page content. Check out the `history-ajax.js` file.
***

Next you need to get references to some of the key elements on the page. The ones we are most interested in are the navigation links, the `<h1>` for the title and the `<div>` for the content.

Add the following to your JavaScript file.

<pre class="javascript">
// Get references to the page elements.
var navLinks = document.querySelectorAll('.load-content');
var titleElement = document.getElementById('title');
var contentElement = document.getElementById('content');
</pre>


### Updating the Page Content

Next up you need to write a function that will update the content displayed on the page from the state object that is retrieved when `popstate` is fired. Lets call this function `updateContent()` and give it one parameter, `stateObj`.

Here you first want to use the `stateObj.title` property to update the `document.title` and `innerHTML` property of the `titleElement`. Then use the `stateObj.content` property to update `contentElement.innerHTML`.

We also add an `if` statement here to make sure that the state object is not null.

<pre class="javascript">
// Update the page content.
var updateContent = function(stateObj) {
  // Check to make sure that this state object is not null.
  if (stateObj) {
    document.title = stateObj.title;
    titleElement.innerHTML = stateObj.title;
    contentElement.innerHTML = stateObj.content;
  }
};
</pre>


### Adding Event Listeners For The Navigation Links

Now we need to setup some event listeners that will fire when the user clicks on one of the navigation buttons. We use a `for` loop here to cycle through each of the `navLinks` and apply the listener for the `click` event.

Inside the callback of the event listener a call to `e.preventDefault()` should stop the browser from attempting to load the link.

We then need to fetch the page data from the `pages` array. We do this by first getting the value of the `href` attribute on the link that was clicked. This is then split at the `.` producing an array like `["index", "html"]`. Selecting the first element in this array gives us the key needed to access the appropriate data in the `pages` array.

A call to `updateContent()` ensures that the fetched data is displayed on the screen. Here we pass in the `pageData` we just retrieved. This is the same object that will be used later as the state object in our `pushState()` call.

Finally we need to create a new history element so we issue a call to `pushState()`, passing in `pageData` as the state object, `pageData.title` as the title and `pageURL` as the URL.

<pre class="javascript">
// Attach click listeners for each of the nav links.
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('click', function(e) {
    e.preventDefault();

    // Fetch the page data using the URL in the link.
    var pageURL = this.attributes['href'].value;
    var pageData = pages[pageURL.split('.')[0]];

    // Update the title and content.
    updateContent(pageData);
    
    // Create a new history item.
    history.pushState(pageData, pageData.title, pageURL);
  });
}
</pre>


### Listening For The popstate Event

Next we need to setup an event listener for the `popstate` event. This should simply call the `updateContent()` function and pass in the state object associated with the event.

Remember, the `popstate` event is called whenever the user clicks the back or forward buttons in the browser, or after calls to `back()`, `forward()` or `go()`.

<pre class="javascript">
// Update the page content when the popstate event is called.
window.addEventListener('popstate', function(event) {
  updateContent(event.state)
});
</pre>


### Loading The Initial Content

The final task is to make sure that the data for the home page is displayed when the page first loads. To do this we need to call the `updateContent()` function and pass in the `pages.index` object.

We also need to update the current history object so that the state object matches the data for the home page, otherwise there will be no data to display if the user navigates back to this history entry. To do this we can use the `replaceState()` method. Pass in `pages.index` as the state object, `pages.index.title` as the title and an empty string (`''`) as the URL.

<pre class="javascript">
// Load initial content.
updateContent(pages.index);

// Update this history event so that the state object contains
// the data for the homepage.
history.replaceState(pages.index, pages.index.title, '');
</pre>

That's it! You've now created a simple web application that uses the History API to manage the session history.

<a class="button orange" href="http://demos.matt-west.com/history-api/" target="_blank">See the Demo</a> <a class="button " href="http://cl.ly/223v1N3e211k" target="_blank">Download The Code Resources</a>

## Browser Support

Browser support for the History API is very good. All five major desktop browsers have support for the API.

| IE  | Firefox | Chrome | Safari | Opera |
| :-: | :-----: | :----: | :----: | :---: |
| 10+ | 4.0+    | 5.0+   | 5.0+   | 11.5+ |

All major mobile browsers also include support for the History API.

| iOS Safari | Android Browser | Chrome for Android | Firefox for Android | Opera Mobile | IE Mobile | Blackberry |
| :--------: | :-------------: | :----------------: | :-----------------: | :----------: | :-------: | :--------: |
| 4.2+       | 2.2, 2.3, 4.2+  | 29.0+              | 23.0+               | 11.1+        | 10.0+     | 7.0+       |

Source: <http://caniuse.com/#feat=history>

## Final Thoughts

In this blog post you have learned how to use the History API to navigate and manipulate the session history.

There is no question that the History API has a place in modern web applications. As we continue to develop increasingly complex client-side applications we need to make sure that we don't break the native functionality of the browser. The History API provides a simple solution to this problem. With great browser support there really is no reason why you can't start using this today.

How do you plan to use the History API in your projects? Share your thoughts in the comments.

## Useful Links

* [Can I use... History API](http://caniuse.com/#feat=history)
* [The History Interface Specification (WHATWG)](http://www.whatwg.org/specs/web-apps/current-work/multipage/history.html#the-history-interface)
