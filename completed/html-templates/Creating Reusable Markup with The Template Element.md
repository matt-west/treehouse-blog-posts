Templates are one of the key tools at any developers disposable. They make it easier for us to build complex websites that are maintainable and easy for other developers to understand. With the exception of a few JavaScript frameworks, most templating is done on the server. When a request comes in to the server the templating engine pieces together the relevant templates and sends the constructed page down to the browser. This is great for a lot of use cases but with the increasing popularity of applications that run solely on the client-side we need a robust solution for handling templates in the browser. Enter the new `<template>` element. 

## The &lt;template&gt; Element

The `<template>` element allows developers to create client-side templates made up of chunks of reusable DOM. The key thing about HTML templates is that they are *inert*. Your templates are not rendered by the browser until you *activate* them using JavaScript. This also means that any content they contain (images, video, audio) will not be loaded or played until the template is put to use.

It’s also worth noting that content within a template is not considered part of the main document. Trying to select an element within a template from the main `document` object will not work. Instead you first have to select the template and then use `querySelector()` to access the element you want to target. You will see an example of this later.

## Checking for Browser Support

The `<template>` element is currently supported in Chrome, Firefox and Opera (15+).

You can detect support for HTML templates by checking to see if the `content` property is present on a `<template>` element. Here is an example:

<pre>
if (‘content’ in document.createElement(‘template’)) {
  // Templates are supported.
} else {
  // Templates are not supported :(
}
</pre>

## Creating HTML Templates

Creating a template is pretty straight-forward. All you need to do is create a `<template>` element and give it an appropriate ID.

Lets take a look at an example template that could be used for a blog comment.

<pre>
&lt;template id=&quot;comment-template&quot;&gt;
  &lt;li class=&quot;comment&quot;&gt;
    &lt;div class=&quot;comment-author&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;comment-body&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;comment-actions&quot;&gt;
      &lt;a href=&quot;#reply&quot; class=&quot;reply&quot;&gt;Reply&lt;/a&gt;
    &lt;/div&gt;
  &lt;/li&gt;
&lt;/template&gt;
</pre>

Here we create a template with the ID `comment-template`. Our template’s content consists of a list item (`<li>`) with a number of `<div>`s that contain the comment author, body and a link for users to write a reply.

You can also include CSS and JavaScript within your templates using the `<style>` and `<script>` elements.


## Using HTML Templates

In order to use your template you will need to write a little JavaScript. Lets take a look at an example.

<pre>
var tmpl = document.getElementById('comment-template');
document.body.appendChild(tmpl.content.cloneNode(true));
</pre>

Here we start by getting a reference to our `<template>` element using it’s ID and store this in a variable named `tmpl`.  In this example we are not manipulating anything within the template so we just create a copy of the it’s content (`tmpl.content.cloneNode(true)`) and add this to the `document.body`.

Now that we’ve covered the basics I think you’re ready to move onto something a little more complex.

In this next example we are going to render a series of blog comments using a template. Lets assume that there is an unordered list (`<ul>`) element in the main document that we want to add our comments to.

***
**Note**: I’ve created a variable named `comments` that contains an array of comment objects for us to play around with. In reality you would probably be loading this data via AJAX.
***

<pre>
// An array of comments.
var comments = [
  {'author': 'Joe', 'body': 'I love this product.'},
  {'author': 'Mary', 'body': 'Great idea. I have got to get me one of these!'},
  {'author': 'Eric', 'body': 'These things are fantastic. I bought three.'}
];

// Get a reference to the comments list in the main DOM.
var commentsList = document.getElementById('comments');

// Loop through each of the comments and add them to the comments list.
for (var i = 0; i < comments.length; i++) {
  var comment = comments[i];
  var tmpl = document.getElementById('comment-template').content.cloneNode(true);
  tmpl.querySelector('.comment-author').innerText = comment.author;
  tmpl.querySelector('.comment-body').innerText = comment.body;
  commentsList.appendChild(tmpl);
}
</pre>

Here we start by getting a reference to the comments list in the main DOM.

We then loop through the items in the `comments` array. Each time we create a new variable called `comment` and initialize it with the appropriate comment in the array. This just makes the code a little more readable.

We then select our `<template>` element and make a clone of the content using `content.cloneNode()`. This just means that we can add our text without changing the original template.

Next we find the `<div>` elements that should contain the comment author and body by calling the `querySelector` on our `tmpl` variable. Then we update the `innerText` properties of these elements so that they contain the author and body content.

Finally we add our cloned template content to the `commentsList` using the `appendChild` method.

!!! INSERT IMAGE OF COMMENTS !!!

## Final Thoughts

In this blog post you have learned how to use the new HTML `<template>` element to define chunks of DOM that can be reused by your applications. Although browser support is currently confined to Chrome, Firefox and the latest release of Opera I’m optimistic that we will see support emerging in other browsers too.

It’s worth remembering that as HTML templates rely on the use of JavaScript, we do create a bit of an accessibility issue as screen-readers will not be able to see the content rendered using templates. It’s important to think this through and provide fallbacks for assistive technologies where appropriate.

## Useful Links

* [Can I use... Templates](http://caniuse.com/#feat=template)
* [HTML’s New Template Tag](http://www.html5rocks.com/en/tutorials/webcomponents/template/)
* [W3C HTML Templates Specification](http://www.w3.org/TR/html-templates/)
* Related: [Working with Shadow DOM](http://blog.teamtreehouse.com/working-with-shadow-dom)
