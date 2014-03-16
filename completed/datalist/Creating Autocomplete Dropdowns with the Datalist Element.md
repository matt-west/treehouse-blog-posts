The `<datalist>` element is a new addition in the HTML5 specification which allows developers to create native autocomplete dropdowns for their web applications. This type of user interface component is commonly used on form fields and search boxes as it helps the user to input data faster. In the past, autocomplete dropdowns could only be achieved using JavaScript.

In this blog post you’re going to learn how to use the `<datalist>` element to create native autocomplete dropdowns for your applications.

Lets get started.


## The `<datalist>` Element

!!! Insert image/gif of dropdown.

The `<datalist>` element is used to specify all of the possible values for the autocomplete list. Each of these values is defined using an `<option>` element, as shown in the example below.

```
<datalist id="languages">
  <option value="HTML">
  <option value="CSS">
  <option value="JavaScript">
  <option value="Java">
  <option value="Ruby">
  <option value="PHP">
  <option value="Go">
  <option value="Erlang">
  <option value="Python">
  <option value="C">
  <option value="C#">
  <option value="C++">
</datalist>
```

The `<datalist>` element should have an `id` attribute. To link your datalist to an `<input>` element you need to specify a `list` attribute on the input and set it’s value to the `id` of your datalist.

```
<input type="text" list="languages">
``` 

That is all you need to add auto-complete functionality to an `<input>` element. The browser will take care of searching the datalist options for matching values and then displaying those to the user.


## Loading Options via AJAX

!!! Insert image/gif of HTML elements dropdown.

If you want to add a large number of options to your `<datalist>` you may want to store those values in an external JSON file. You can then fetch this file via AJAX and populate the `<datalist>` options once the page has loaded. Lets look at an example of how to do this.

As before we start off with `<input>` and `<datalist>` elements. Ensure that you link the two using the `id` and `list` attributes.

```
<input type="text" id="ajax" list="json-datalist" placeholder="e.g. datalist">
<datalist id="json-datalist"></datalist>
```

We then need to get references to these two elements in the JavaScript code.

```
// Get the <datalist> and <input> elements.
var dataList = document.getElementById('json-datalist');
var input = document.getElementById('ajax');
```

Next we need to load the JSON file (`html-elements.json`) and populate the options for the `<datalist>` element. For this example we’re just using an array of strings but it’s also possible to use a more complex data structure.

```
// Create a new XMLHttpRequest.
var request = new XMLHttpRequest();

// Handle state changes for the request.
request.onreadystatechange = function(response) {
  if (request.readyState === 4) {
    if (request.status === 200) {
      // Parse the JSON
      var jsonOptions = JSON.parse(request.responseText);
  
      // Loop over the JSON array.
      jsonOptions.forEach(function(item) {
        // Create a new <option> element.
        var option = document.createElement('option');
        // Set the value using the item in the JSON array.
        option.value = item;
        // Add the <option> element to the <datalist>.
        dataList.appendChild(option);
      });
      
      // Update the placeholder text.
      input.placeholder = "e.g. datalist";
    } else {
      // An error occured :(
      input.placeholder = "Couldn't load datalist options :(";
    }
  }
};

// Update the placeholder text.
input.placeholder = "Loading options...";

// Set up and make the request.
request.open('GET', 'html-elements.json', true);
request.send();
```

This code will load the `html-elements.json` file using an `XMLHttpRequest`. Once the file has been fetched we parse the raw JSON data so that we have a JavaScript array to work with. We then loop over each of the items in this array. Each time we create a new `<option>` element, set the `value` attribute to the current item in the array, and then add this `<option>` element to the `<datalist>`.

In this example we’re also using the `<input>` element’s `placeholder` property to display the loading status for the datalist options.

<a class="button orange" href="http://codepen.io/matt-west/full/jKnzG" target="_blank">See the Demo</a> <a class="button" href="http://codepen.io/matt-west/pen/jKnzG" target="_blank">View on CodePen</a>


## Browser Support

Support for the `<datalist>` element amongst browsers is pretty good. Safari is the only modern web browser not to include support for `<datalist>`. It’s worth noting that the implementation of this element in IE10 is known to be [buggy](http://playground.onereason.eu/2013/04/ie10s-lousy-support-for-datalists/).

| IE   | Firefox | Chrome | Safari | Opera |
| :-:  | :-----: | :----: | :----: | :---: |
| 10.0+ | 4.0+   | 20.0+  | -  | 9.0+ |

Source: <http://caniuse.com/#feat=datalist>


## Final Thoughts

In this post you’ve learned how to use the `<datalist>` element to create native autocomplete dropdowns for your web applications. You’ve also learned how to use AJAX to populate datalist options from an external JSON file.

The `<datalist>` element is just one of a number of new elements which provide native implementations of commonly used UI components. By making these elements really simple to use, browser vendors are removing the need for developers to rely on JavaScript libraries in these areas. Standardising the behaviour of UI components also has the added benefit of creating a more consistent experience for users across the web.


## Useful Links

* [Can I use... datalist](http://caniuse.com/#feat=datalist)
* [WHATWG Spec](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-button-element.html#the-datalist-element)
