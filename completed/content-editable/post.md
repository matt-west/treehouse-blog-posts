# In-Browser Editing with contenteditable

One of the lesser-known HTML attributes is `contenteditable`. This attribute allows you to turn a standard read-only HTML element into an interactive, rich-text editor.

When Tim Berners-Lee built the first web browser in 1990, he created modes for both browsing and editing HTML documents. However as the web grew, browsers transitioned to a more read-only state. The `contenteditable` attribute and associated element properties bring native content editing back to the browser.

!!! Insert Image !!!
Source: <http://info.cern.ch/NextBrowser.html> 

In this blog post you are going to learn how to use the `contenteditable` attribute to allow users to edit page content directly within their browser. You'll also be taking a look at the properties that allow you to manipulate an element's editable state using JavaScript.


## HTML Element Attribute

You can make an element editable by adding the `contenteditable` attribute in your markup. This attribute has three possible values: `true`, `false`, and `inherit`. Specifying `inherit` will make the element editable if it's immediate parent is editable.

```html
<div id="editor" contenteditable="true">
  ...
</div>
```

!!! Demo Button !!!

***
**Note**: Editable elements are included in the tab order and can therefore be focussed using the tab key. This makes them accessible to users that might not be able to use a mouse. The `tabindex` attribute can be used to specify where in the tab order the editable element should fall.
***


## Making Elements Editable in JavaScript

!!! IMAGE !!!

As well as the `contenteditable` HTML attribute it is also possible to make an element editable using JavaScript. This involves two element properties:

* `isContentEditable` - This property will return **true** if the element is editable and **false** if it is not.
* `contentEditable` - This property can be used to set the editable status of an element. Supported values are the same as those used for the `contenteditable` attribute: `true`, `false`, and `inherit`.

```
var editor = document.getElementById('editor');
editor.isContentEditable;
editor.contentEditable = true;
```

Lets take a look at an example of how you could use a button to toggle an element's editable state.

```html
<button id="editorBtn" type="button">Enable Editing</button>
<div id="editor">
  ...
</div>
```

Here you've created simple `<button>` and `<div>` elements. Notice that the `<div>` doesn't have a `contenteditable` attribute.

```js
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
```

In this JavaScript code you start by creating two variables that represent the `<button>` and `<div>` elements on the page. You then attach an event listener to the `editorBtn` that will be fired when the user clicks the button. Inside the callback function of this event listener you examine the `<div>` element's `isContentEditable` property to determine whether the element is currently editable. If it is, you disable editing by setting the element's `contentEditable` property to `false`, and update the button text to `Enable Editing`. If the element is not editable you first enable editing and then change the button text to `Disable Editing`.

!!! DEMO BUTTONS !!!


## Making an Entire Page Editable

!!! IMAGE !!!

If you'd like to make an entire web page editable you can use the `designMode` property of the `document` object. Setting this property to `'on'` will enable editing. This also works on documents within iframes.

```js
document.designMode = 'on';
```

Try turning on `designMode` for this page using your browser's dev tools. Once enabled you should be able to edit all of the page content.

If you're not familiar with using your browser's dev tools, here's some steps to get you going.

* Open up your browser's dev tools. (Right-click anywhere on the page and select 'Inspect Element')
* Switch to the **Console** tab.
* Type the following into the console and press enter: `document.designMode = 'on';`


## Browser Support for contenteditable

Support for `contenteditable` is very good. Internet Explorer was the first browser to implement this technology, way back in IE 5.5 (circa 2000). Since then, `contenteditable` has been [standardized by the WHATWG](http://www.whatwg.org/specs/web-apps/current-work/multipage/editing.html#attr-contenteditable).

| IE   | Firefox | Chrome | Safari | Opera |
| ---- | ------- | ------ | ------ | ----- |
| 5.5+ | 3.5+    | 4.0+   | 3.1+   | 9.0+  |


Source: <http://caniuse.com/#feat=contenteditable>


## Final Thoughts

Enabling the ability to simply click an element and make an update enables a really enjoyable editing experience for the user. The `contenteditable` attribute makes implementing this interaction effortless.

You could enable this same behaviour by cleverly swapping in an `<input>` or `<textarea>` when an element is clicked. This is in fact the way that a number of websites still handle inline editing. The problem with this approach is that it involves writing a load of JavaScript to switch in the new `<input>` or `<textarea>`, and CSS to match it's styling to the original element. Using `contenteditable` solves both of these issues.

How do you see yourself using `contenteditable` in your projects? Share your thoughts in the comments below.


## Useful Links

* [WHATWG Standard](http://www.whatwg.org/specs/web-apps/current-work/multipage/editing.html#attr-contenteditable)
* [Can I us... contenteditable](http://caniuse.com/#feat=contenteditable)
* [WorldWideWeb, the first web client](http://www.w3.org/People/Berners-Lee/WorldWideWeb.html)
