# Creating Immersive Experiences with the Fullscreen API

Having the ability to take elements, or even entire pages fullscreen allows developers to create fully immersive experiences for the user. You can remove the distractions from other apps and help the user to focus on the task at hand. Whether your watching a movie, playing a game, or just trying to get some work done, going fullscreen can really help to keep you focussed.

In this blog post you’re going to learn the ins and outs of the Fullscreen API. You’ll be learning how to take any element fullscreen, and how to style fullscreen elements using CSS pseudo-classes.


## Browser Support for the Fullscreen API

All the major desktop browsers include support for the Fullscreen API. However the implementations across these different browsers are inconsistent. Aside from the familiar vendor prefixes, the names of methods vary, as does the use of camelcase.

| IE   | Firefox | Chrome | Safari | Opera |
| :-:  | :-----: | :----: | :----: | :---: |
| 11.0 | 10.0+   | 15.0+  | 5.1+   | 12.1+ |

Source: <http://caniuse.com/fullscreen>

The current WebKit and Trident (IE) implementations are closest to the W3C standard for the [Fullscreen API](http://www.w3.org/TR/fullscreen/). However, no browser currently supports the non-vendor-prefixed API methods and properties.

Support on mobile is currently confined to the Android versions of Chrome, Firefox and Opera. The Blackberry browser also include partial support for the API.

| iOS Safari  | Android Browser | Blackberry Browser | Opera Mobile | Chrome for Android | Firefox for Android | IE Mobile |
| :-:  | :-----: | :--: | :---: | :---: | :---: | :---: |
| - | - | 10.0 | 16.0 | 31.0 | 25.0 | - |

Source: <http://caniuse.com/fullscreen>

In this post I’ll take you through the various different implementations as they stand today. Keep in mind that these may change in the future.


## Going Fullscreen

You can make any HTML element fullscreen using the `requestFullscreen` method. For example, you could make the whole page fullscreen using the following statement.

```
document.documentElement.requestFullscreen();
```

* * * * *

**Note**: If you call `requestFullscreen` on the document body, WebKit and Blink based browsers will squash the width of the page to the smallest size possible to display the content. To avoid this you should go fullscreen on the document element instead (`document.documentElement`).

* * * * *

The `requestFullscreen` method must be called in response to a direct user action, like a mouse click or a key press. This prevents websites from using the API for undesirable purposes, like displaying fullscreen ads.

The implementations of `requestFullscreen` vary across browsers. The examples below show the methods for WebKit, Gecko and Trident browsers. Note the uppercase 
’S’ in the Gecko implementation.

```
document.documentElement.webkitRequestFullscreen(); // Chrome, Opera & Safari (WebKit)
document.documentElement.mozRequestFullScreen(); // Firefox (Gecko)
document.documentElement.msRequestFullscreen(); // Internet Explorer (Trident)
```

You may want to create a helper function that abstracts away the complexity of supporting all these vendor prefixes from your main code. The example below shows how this could be achieved.

```
var requestFullscreen = function (ele) {
    if (ele.requestFullscreen) {
        ele.requestFullscreen();
    } else if (ele.webkitRequestFullscreen) {
        ele.webkitRequestFullscreen();
    } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen();
    } else if (ele.msRequestFullscreen) {
        ele.msRequestFullscreen();
    } else {
        // Fallback
        console.log('Fullscreen API is not supported.');
    }
};
```


## Exiting Fullscreen

To exit fullscreen mode you can use the `exitFullscreen` method. This should be called on the `document` object.

```
document.exitFullscreen();
```

Again, the implementations of this method varies between the different browsers. The implementation in Firefox’s Gecko rendering engine uses the non-standard `mozCancelFullScreen` method.

```
document.webkitExitFullscreen(); // Chrome, Opera & Safari
document.mozCancelFullScreen(); // Firefox
document.msExitFullscreen(); // Internet Explorer
```

Again, we see the uppercase ’S’ featured in the Gecko (Firefox) method. This convention is consistent across the entire Gecko implementation of the API.

You could also create a helper function to abstract away the complexity of exiting fullscreen mode. The example below shows how you could achieve this.

```
var exitFullscreen = function () {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else {
        // Fallback
        console.log('Fullscreen API is not supported.');
    }
};
```


## Document Properties

As well as the `requestFullscreen` and `exitFullscreen` methods, the API also extends the `document` object by adding two new properties. These are `fullscreenEnabled` and `fullscreenElement`.

### fullscreenEnabled

The `fullscreenEnabled` property has a boolean value that is set to `true` if the document has the ability to display elements fullscreen. 

```
document.fullscreenEnabled;
```

The vendor-prefixed versions of the `fullscreenEnabled` property are as follows:

```
document.webkitFullscreenEnabled; // Chrome, Opera & Safari
document.mozFullScreenEnabled; // Firefox
document.msFullscreenEnabled; // Internet Explorer
```

### fullscreenElement

The `fullscreenElement` property will return the HTML element that is currently displayed fullscreen. The property will be set to `null` if there’s no element in fullscreen mode.

```
document.fullscreenElement;
```

Here are the vendor-prefixed versions of this property:

```
document.webkitFullscreenElement; // Chrome, Opera & Safari
document.mozFullScreenElement; // Firefox
document.msFullscreenElement; // Internet Explorer
```


## Styling Elements in Fullscreen Mode

There is a `:fullscreen` CSS pseudo-class that applies to elements in fullscreen mode. This functions in a similar way to `:hover` or `:focus` if you are familiar with CSS.

```
/* W3C Standard */
selector:fullscreen {

}
```

Again, the naming of this pseudo-class varies across browsers. The examples below show the vendor-prefixed versions for Chrome, Firefox, Opera, Safari and Internet Explorer.

```
/* Webkit (Chrome, Opera & Safari) */
selector:-webkit-full-screen {

}

/* Gecko (Firefox) */
selector:-moz-full-screen {

}

/* Trident (Internet Explorer) */
selector:-ms-fullscreen {

}
```


## Examples of using the Fullscreen API

Now that you understand how the API works lets take a look at a couple of examples. You’ve already seen how to make the entire document fullscreen. In this section you’re going to look at examples that use videos and images.

### Fullscreen Videos

A common use case of the Fullscreen API is to display media like videos fullscreen. This can be done by calling the `requestFullscreen` method directly on the `<video>` element. Remember that this will need to occur as the result of a user interaction.

```
var video = document.getElementById('video');
var button = document.getElementById('btn');

button.addEventListener('click', function(e) {
    video.requestFullscreen();
});
```

Of course this example shows the nice, clean standardised version of the API. For this to work you would need to use the vendor-prefixed versions mentioned earlier.


### Fullscreen Images

You can display images fullscreen in much the same way as videos. In WebKit browsers, images will be displayed in the center of the screen, and as close to their original dimensions as possible. Firefox will stretch images to fill the entire screen.

```
var image = document.getElementById('image');
var button = document.getElementById('btn');

button.addEventListener('click', function(e) {
    image.requestFullscreen();
});
```


## Final Thoughts

The Fullscreen API enables web developers to match the immersive experiences that were only previously possible with native applications. The current implementations of this API may be a little inconsistent, but this feature is certainly not going to get any less important as time goes by. 

One thing we haven’t spoken about a lot in this post is how the Fullscreen API applies to mobile. Mobile devices are arguably one of the most important platforms for this new browser feature. The inherent lack of screen space on a mobile device means that any extra pixels that you can get your hands on are a big bonus. 

Just because you now have the power to go fullscreen doesn’t mean that you should though. You need to seriously consider whether your desire to go fullscreen is just a greed for attention, or if viewing your app fullscreen will make a significant and positive impact to the user experience.


## Useful Links

* [Fullscreen API W3C Specification](http://www.w3.org/TR/fullscreen/)
* [Using Fullscreen Mode (MDN)](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode)
* [Microsoft Fullscreen API Documentation](http://msdn.microsoft.com/en-us/library/ie/dn265028(v=vs.85).aspx)