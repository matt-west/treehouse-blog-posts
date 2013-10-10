# An Introduction to The Page Visibility API

The days of browsing the web using a single window (or tab) are long gone. Most of us now browse with multiple windows and/or tabs open at the same time. As developers we have never had a way of telling whether our web page is visible to the user or if it's buried away amongst a stack of inactive tabs. This is all changing due to the introduction of the Page Visibility API.

The Page Visibility API gives developers a way of checking to see if their web page is visible to the user. The API also includes an event that gives developers the ability to easily write code that will be executed when the page's visibility changes.

In this blog post you are going to learn how to use the Page Visibility API to pause a video when a web page is hidden, and then resume playback when the page becomes visible again.

Lets get started by taking a look at how the API works.


## Checking The Page Visibility

The Page Visibility API adds two new properties to the `document` interface:

* `document.hidden`
* `document.visibilityState`

The new `hidden` property is a boolean that is set to `true` if the page is hidden and `false` if it's visible. 

The `visibilityState` property is a string that describes the current state of the page. It can be one of the following: 

* `hidden` - The page is not visible on any screen.
* `visible` - The page is visible to the user.
* `prerender` - The page has been loaded off-screen and is not visible.
* `unloaded` - The page is going to be unloaded (the user is navigating away from this page).

***
**Note:** These properties are still vendor prefixed in Chrome and Opera. Firefox removed the vendor prefix in version 17. To be safe, make sure that you check to see if a vendor prefix is required before using these properties in your code. We will see an example of how to do this later in the demo.
***

## Listening For Changes in Visibility State

In addition to the new `document` properties the Page Visibility API also introduces the `visibilitychange` event. This event is fired on `document` when the user shows or hides the window/tab.

<pre class="javascript">
document.addEventListener('visibilitychange', function(event) {
  if (document.hidden) {
    // The page is hidden.
  } else {
    // The page is visible.
  }
});
</pre>

***
**Note:** This event is also vendor-prefixed in some browsers. Take a look at the demo application to see how to check for prefixes.
***


## Demo: Pausing a Video When The Window is Hidden

!!! Insert Demo Image !!!

<a class="button orange" href="http://codepen.io/matt-west/full/hGFLs" target="_blank">See the Demo</a> <a class="button" href="https://dl.dropboxusercontent.com/u/24084952/Treehouse%20Demos/page-visibility-demo.zip" target="_blank">Download The Code</a> <a class="button" href="http://codepen.io/matt-west/pen/hGFLs" target="_blank">View on CodePen</a>

Now that you understand how to use the Page Visibility API lets take a look at an example.

In this section we are going to create a demo application that uses the Page Visibility API to pause a video when the page is hidden, and then start it back up when the page becomes visible again.

First we need to setup the HTML markup for our demo. We're going to be using the `<video>` element so that we can easily control the playback of the video.

The stylesheet and videos used in this demo can be found in the code resources.

<pre class="html">
&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
  &lt;meta charset=&quot;utf-8&quot;&gt;
  &lt;title&gt;PageVisibility API Demo&lt;/title&gt;

  &lt;link rel=&quot;stylesheet&quot; href=&quot;style.css&quot;&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div id=&quot;page-wrapper&quot;&gt;
    
    &lt;h1&gt;PageVisibility API Demo&lt;/h1&gt;

    &lt;video id=&quot;video&quot; width=&quot;640&quot; height=&quot;365&quot; controls&gt;
      &lt;source src=&quot;videos/mikethefrog.webm&quot; type=&quot;video/webm&quot;&gt;
      &lt;source src=&quot;videos/mikethefrog.ogv&quot; type=&quot;video/ogv&quot;&gt;
      &lt;source src=&quot;videos/mikethefrog.mp4&quot; type=&quot;video/mp4&quot;&gt;
      &lt;p&gt;
        Your browser doesn&#039;t support HTML5 video.
        &lt;a href=&quot;videos/mikethefrog.mp4&quot;&gt;Download&lt;/a&gt; the video instead.
      &lt;/p&gt;
    &lt;/video&gt;

  &lt;/div&gt;

  &lt;script src=&quot;app.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>

Now that we've got the HTML setup we need to start writing the JavaScript that will monitor the page visibility. Create a new file called `app.js`.

To get started we need to write a bit of code that will determine whether to use vendor prefixes. This `getPrefix()` function checks to see if the `hidden` property is present on `document`. If it is, we don't need to use vendor prefixes so we can return `null`. If `hidden` is not present we need to loop through all of the possible vendor prefixes until we find the property. Once we've found the prefix we simply return the prefix string. If we get to the end of the function without finding the prefix the API must not be supported so we just return `null`.

<pre class="javascript">
// Get the prefix for this browser.
function getPrefix() {
  // Check to see if the browser supports the unprefixed property.
  if ('hidden' in document) {
    // No prefix needed, return null.
    return null;
  }

  // Loop through all the possible prefixes.
  var prefixes = ['moz', 'ms', 'o', 'webkit'];

  for (var i = 0; i < prefixes.length; i++) {
    var testPrefix = prefixes[i] + 'Hidden';
    if (testPrefix in document) {
      return prefixes[i];
    }
  }

  // The API must not be supported in this browser.
  return null;
}
</pre>

Next we need to write a few helper functions that will generate the correct property and event names based on the prefix that is returned by `getPrefix()`.

***
**Note:** We won't be using the `document.visibilityState` property in this demo but I've included a helper function here just in case you need it in the future.
***

<pre class="javascript">
// Prefix the hidden property.
function getHiddenProperty(prefix) {
  if (prefix) {
    return prefix + 'Hidden';
  } else {
    return 'hidden';
  }
}

// Prefix the visbilityState property.
function getVisibilityStateProperty(prefix) {
  if (prefix) {
    return prefix + 'VisibilityState';
  } else {
    return 'visibilityState';
  }
}

// Prefix the visibilitychange event.
function getVisibilityEvent(prefix) {
  if (prefix) {
    return prefix + 'visibilitychange';
  } else {
    return 'visibilitychange';
  }
}
</pre>

Okay, so now that we've got cross-browser compatibility covered we can start writing the main code for our application.

In the first section we call the `getPrefix()` function to find out if we need to use a vendor prefix in our code. We then create variables called `hidden` and `visibilityChangeEvent` and initialize these using the helper methods we wrote earlier. We also create a variable called `wasPlaying` and set it's value to `false`. This will be used as a way of remembering whether the video was playing when the page lost visibility.

Next we get a reference to our video and store this in a variable called `video`.

Finally we setup an event listener that will be executed when the `visibilitychange` event is fired. We use the `visibilityChangeEvent` variable we created earlier to make sure that the correct vendor-prefixed version is being used (if required).

<pre class="javascript">
// The cross browser compatibility code.
...

window.onload = function() {
  // Get the prefix for this browser.  
  var prefix = getPrefix();

  // Prefix the document properties/events we will be using.
  var hidden = getHiddenProperty(prefix);
  var visibilityChangeEvent = getVisibilityEvent(prefix);

  // Variable to track if the video was playing when the page visibility changed.
  var wasPlaying = false;

  // Get a reference to the video.
  var video = document.getElementById('video');

  // Listen for the visibilitychange event.
  document.addEventListener(visibilityChangeEvent, function(e) {

  });

}
</pre>

Now it's time to write the code that will handle pausing and playing the video.

First we check to see if the page is visible or hidden. If the page is hidden we also need to check if the video is playing or not. When the video is playing we need to set the `wasPlaying` variable to `true` and pause the video. If the video was paused to begin with we just make sure that `wasPlaying` is set to `false`.

If the page is visible we need to check if the video was playing before the page became hidden. We do this using the `wasPlaying` variable. If the value of `wasPlaying` is `true` we call `video.play()` to resume playback.

<pre class="javascript">
// If the document is hidden we want to pause the video.
if (document[hidden]) {
  // Check to see if the video is playing
  if (video.paused == false) {
    // Set the wasPlaying flag to true.
    wasPlaying = true;

    // Pause the video.
    video.pause();
  } else {
    // Make sure the wasPlaying is set to false if the video was paused.
    wasPlaying = false;
  }
} else {
  // If the video was playing before we lost visibility, restart it.
  if (wasPlaying) {
    // Play the video.
    video.play();
  }
}
</pre>

That's all the code that we need for this example. Load up the [live demo](http://codepen.io/matt-west/full/hGFLs) and see it in action.


## Browser Support For The Page Visibility API

Support for the Page Visibility API is a recent addition in IE10. Chrome and Firefox have included support for a while. However current versions of Chrome and Opera require the `webkit` prefix. Firefox 17 and below require the `moz` prefix. Safari is said to be introducing support for the Page Visibility API in version 7.

| IE   | Firefox | Chrome | Safari | Opera  |
| :--: | :-----: | :----: | :----: | :----: |
| 10+  | 10.0+   | 14.0+  | 7.0+   | 12.1+  |

Source: <http://caniuse.com/#feat=pagevisibility>


## Final Thoughts

Up until the introduction of the Page Visibility API developers have only had to consider how their websites act when they are visible. This has all changed now. We now need to be thinking about how we can make our websites better citizens of the browser.

There are a whole bunch of things that websites do that become irrelevant if the user can't see the page. Animations is the first example that springs to mind. Browsers already have some native functionality that helps to recover resources from inactive pages, but we can help to make things even better by being responsible with how our websites behave when hidden.


## Useful Links

* [Page Visibility API Specification (W3C)](http://www.w3.org/TR/page-visibility/)
* [Can I Use... PageVisibility API](http://caniuse.com/#feat=pagevisibility)
* [Using the Page Visibility API (Google Developers)](https://developers.google.com/chrome/whitepapers/pagevisibility)
