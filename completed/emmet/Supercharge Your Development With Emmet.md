Emmet is a text-editor plugin that provides a number of tools to help you quickly write HTML and CSS code.  The plugin, which was previousl known as _Zen Coding_, allows you to generate HTML elements using a CSS-like syntax.

In this post you’re going to be learning how to use the Emmet syntax to generate HTML and CSS code.

## Plugins For Your Favorite Text Editor

Before we get started you’ll need to install the Emmet plugin for your text editor. There’s a whole bunch of plugins available that cover most of the popular text editors.

Click the link for your text editor below and follow the instructions to install the plugin.

* [Sublime Text](https://github.com/sergeche/emmet-sublime#readme)
* [Eclipse](https://github.com/emmetio/emmet-eclipse#readme)
* [TextMate](https://github.com/emmetio/Emmet.tmplugin#readme)
* [Coda](https://github.com/emmetio/Emmet.codaplugin#readme)
* [Espresso](https://github.com/emmetio/Emmet.sugar#readme)
* [Chocolat](https://github.com/sergeche/emmet.chocmixin#readme)
* [Notepad++](https://github.com/emmetio/npp#readme)
* [Brackets](https://github.com/emmetio/brackets-emmet#readme)
* [NetBeans](https://github.com/emmetio/netbeans#readme)
* [Adobe Dreamweaver](https://github.com/emmetio/dreamweaver#readme)

## Generating Elements

Now that you’ve got the Emmet plugin installed lets take a look at the syntax that you will be using to generate elements.

```
ul>li>img+p
```

Emmet uses  _abbreviations_ to define the elements that you want to generate. The syntax for these abbreviations is very much like CSS so it might look familiar to you. 

Once you’re done writing an abbreviation, hitting the `TAB` key will trigger Emmet to parse the line and generate the requested code. The example above would generate the following code. 

```
<ul>
    <li>
        <img src="" alt="">
        <p></p>
    </li>
</ul>
```

Lets dive a bit deeper into the Emmet syntax to see how you can create more complex abbreviations.

### Child >

The child operator `>` is used to nest elements within each other.

```
section>div>p
```

The example above will generate the following markup.

```
<section>
    <div>
        <p></p>
    </div>
</section>
```

### Sibling +

The sibling operator `+` is used to create elements at the same level as the previous element in the abbreviation.

```
section+div+p
```

This example generates the following HTML.

```
<section></section>
<div></div>
<p></p>
```

### Climb-up ^

The climb-up `^` operator is used to move up one level in the tree structure. This can come in handy when you’re using the child operator `>`.

```
section>div>p>a^p
```

In this abbreviation two paragraph elements will be created within the div but only the first paragraph will contain a link. 

```
<section>
    <div>
        <p><a href=""></a></p>
        <p></p>
    </div>
</section>
```

### Multiplication

The multiplication operator `*` is used to define how many occurrences of the element should be generated. The operator applies to the last element before the operator (unless you are using grouping).

```
ul>li*5
```

This example will generate an unordered list with five list items.

```
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

### Grouping

You can group together sections of an abbreviation using parenthesis `()`. Grouping is useful when creating complex abbreviations.

```
ul>(li>a)*3
```

This simple example will generate an unordered list and three list items, each of which contain a link.

```
<ul>
    <li><a href=""></a></li>
    <li><a href=""></a></li>
    <li><a href=""></a></li>
</ul>
```

Lets take a look at a more complex example.

```
div>header+(article>p*3)+footer>p
```

In this abbreviation we have defined a div element that contains an header, article and footer. The article element also contains three paragraph elements.

This abbreviation would generate the following HTML.

```
<div>
    <header></header>
    <article>
        <p></p>
        <p></p>
        <p></p>
    </article>
    <footer>
        <p></p>
    </footer>
</div>
```

## Setting Attributes

You can also use the Emmet syntax to add attributes to your generated elements. In this section you are going to learn how to define IDs, classes and other attributes in your abbreviations.

### IDs

IDs are defined using the familiar pound-sign `#` syntax from CSS.

```
div#main
```

This simple example will generate a `<div>` element with the ID `main`.

```
<div id="main"></div>
```

### Classes

Classes are defined using the dot-syntax `.`. You can string together multiple classes just as you do in CSS.

```
div.content.page
```

This example will generate a `<div>` element with the classes `content` and `page`.

```
<div class="content page"></div>
```

### Custom Attributes

You can add any attribute you want by enclosing the attribute definition with box brackets `[]`.

```
a[target="_blank"]
```

This example generates a link with the `target` attribute set to `_blank`.

```
<a href="" target="_blank"></a>
```

### Item Numbering

Emmet also includes a feature that allows you to automatically add numbers to your HTML. This is useful for applications like setting unique classes on list items. Just add a dollar sign `$` to your abbreviation where you want the number to appear and Emmet will take care of the rest.

```
ul>li.item$*5
```

Here Emmet will add the current index to the classes for each of the list items. 

```
<ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
</ul>
```

### Reverse Numbering

Using `$` alone will cause elements to be numbered in ascending order. There may however be occasions when you wish to reverse this ordering. This can be done by adding the `@-` syntax after the dollar sign `$`.

```
ul>li.item$@-*5
```

In this example the list item classes will be numbered in descending order.

```
<ul>
    <li class="item5"></li>
    <li class="item4"></li>
    <li class="item3"></li>
    <li class="item2"></li>
    <li class="item1"></li>
</ul>
```

## Setting Text

You can set the text that should be contained within an element by placing it in curly braces `{}`.

```
p{Hello Treehouse!}
```

This abbreviation will generate a simple `<p>` element with the text `Hello Treehouse!`.

```
<p>Hello Treehouse!</p>
```

You can even use the numbering syntax we looked at earlier within the curly braces.

```
ul>(li>a{Item $})*5
```

This abbreviation will create five list items containing text that is numbered.

```
<ul>
    <li><a href="">Item 1</a></li>
    <li><a href="">Item 2</a></li>
    <li><a href="">Item 3</a></li>
    <li><a href="">Item 4</a></li>
    <li><a href="">Item 5</a></li>
</ul>
```

## Using Snippets

Another great feature in Emmet is the ability to quickly generate snippets of code using preset abbreviations.

```
html:5
```

The example above generates a simple HTML5 compliant page template.

```
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>

</body>
</html>
```

Take a look at the [documentation](http://docs.emmet.io/customization/snippets/) for more about the snippets that are available.

## Using Emmet with CSS

Emmet also includes a number of abbreviations to help you generate CSS code. These abbreviations are often shorthand versions of the CSS property names. You can find a full list of the CSS abbreviations that are available by examining the Emmet [`snippets.json`](https://github.com/emmetio/emmet/blob/master/snippets.json) file.

```
tsh
```

This abbreviation will generate the CSS syntax needed for the `text-shadow` property.

```
text-shadow: hoff voff blur #000
```

Adding a hyphen `-` before the abbreviation will trigger Emmet to generate vendor prefixes for the property.

```
-tsh
```

If your text editor supports tabstops Emmet will place multiple cursors so that you can fill out values for all of the vendor-prefixed properties simultaneously.

```
-webkit-text-shadow: hoff voff blur #000
-moz-text-shadow: hoff voff blur #000
-ms-text-shadow: hoff voff blur #000
-o-text-shadow: hoff voff blur #000
text-shadow: hoff voff blur #000
```

## Final Thoughts

I’ve been using Emmet for a few months now and I’ve found it really useful. Especially when I need to quickly generate a list or table.

We’ve covered a lot of the syntax in this blog post but Emmet has a whole bunch of other features that we haven’t looked at. If you’re interested in finding out more I recommend that you spend a bit of time looking through the [Emmet documentation](http://docs.emmet.io/).

What are your thoughts about Emmet? Share your views in the comments below.

## Useful Links

* [Emmet Documentation](http://docs.emmet.io/)
* [Emmet Plugins](http://emmet.io/download/)
