As developers we often need to create widgets for interfaces that make it easier to accomplish certain tasks. These might be sliders for controlling video playback, calendar pickers for selecting dates or any other number of other useful widgets. The problem that we face when creating these widgets is how to manage *encapsulation*.

The widgets that we write are often reused on a number of other pages, but how do we make sure that none of the code on those pages will interfere with code used to build the widget itself. This problem of creating a boundary between the widgtet code you *wrote* and the code that will *consume* your widget is something that [Web Components](http://www.webcomponentsshift.com/) aims to solve.

***
**Note:** The traditional way of fixing the encapsulation problem is to use iframes. However this is far from an ideal solution and can often cause problems.
***

In this blog post you are going to look at Shadow DOM, one of the four key building blocks that make up Web Components.

## A Brief Introduction to Shadow DOM

Shadow DOM allows the browser to inject a subtree of DOM elements into the rendered document that is displayed on the screen. This has no effect on the DOM tree in your main document, the browser handles Shadow DOM on-the-fly as it renders a page. Confused? Let me explain using an example.

Browser makers have actually been using Shadow DOM for quite awhile now to build interface widgets like those lovely range inputs and datepickers that came about in HTML5. These widgets are actually built using HTML and CSS. You cannot see the individual elements that make up these widgets in the dev tools because they use Shadow DOM, but trust me, they are there.

If you turn on support for Shadow DOM in Chrome Dev Tools you can dig down and see the elements that make up these widgets. To Enable this follow these steps:

1. Open the Chrome Dev Tools.
2. Open the settings pane by clicking the cog icon in the lower right corner.
3. In the ‘General’ tab enable ‘Show Shadow DOM’.

Now if you inspect a widget such as a range input you should be able to look into the Shadow DOM by clicking the little grey arrow to the left of the element. The figure below shows the elements that make up a range input in Chrome.

!!! Insert shadow_dom_range_input_inspector.png

***
**Browser Support:** Shadow DOM is only currently supported in Chrome and Opera 15.
[Can I use... Shadow DOM](http://caniuse.com/#feat=shadowdom)
***

## How Shadow DOM Works

Shadow DOM introduces a new kind of node that can be associated with elements, this is called a **shadow root**. An element that has a shadow root associated with it is known as a **shadow host**. When an element is a shadow host, the content of the shadow root is rendered instead of the content of the host element. Lets take a look at a simple example.

<pre>
&lt;div&gt;Hello, World!&lt;/div&gt;
&lt;script&gt;
  var host = document.querySelector(‘div’);
  var root = host.wekbitCreateShadowRoot();
  root.textContent = ‘Hello, Treehouse!’;
&lt;/script&gt;
</pre>

Here we first create a `<div>` element that will become our shadow host. We then use JavaScript to create a shadow root on our host element using the `webkitCreateShadowRoot` method. Finally we change the `textContent` on the shadow root to be ‘Hello, Treehouse!’.

***
**Note:** You should not really put content in the Shadow DOM as it’s not accessible by search engines or screen readers. However, for the purposes of this simple example we will make an exception.
***

The figure below shows how this is rendered by the browser. Notice how the original ‘Hello, World!’ text node is still there, just not being rendered on the screen.

!!! INSERT Image of text shadow DOM example

Now that you understand the basics of how Shadow DOM works, lets take a look at a more complex example.

## Creating Reusable Widgets Using Shadow DOM

In this section you are going to learn how to build a simple music player widget that makes use of Shadow DOW and HTML templates. The widget you are going to build is pictured below.

!!! Insert picture of media widget.

***
**Note:** In order to keep this example relatively simple we are not going to worry about building a widget that actually plays music. We are just going to focus on the bit that involves Shadow DOM.
***

Using Shadow DOM you are going to split the *presentation* layer of the widget (the playback controls and styling) from the widget *content* (song name and artist). This practice of splitting content and presentation is key to build widgets that are reusable.

### Creating the Template

To start we are going to create a HTML template for our widget. This will be responsible for the playback controls and overall style of the music player.

<pre>
&lt;template id=&quot;musicPlayerTemplate&quot;&gt;
  &lt;style&gt;
    .outer {
      width: 350px;
      font-family: Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.4);
    }

    .info {
      background: #545454; 
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#545454), color-stop(100%,#212121)); 
      background: -webkit-linear-gradient(top,  #545454 0%,#212121 100%);
      background: linear-gradient(to bottom,  #545454 0%,#212121 100%);
      padding: 1.5em;
      text-align: center;
    }

    .song {
      color: #FFFFFF;
      font-size: 1.5em;
    }

    .artist {
      margin-top: 0.5em;
      color: #BABABA;
      font-size: 0.9em;
    }

    .controls {
      padding: 1em;
      text-align: center;
      background: #f7f7f7;
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f7f7f7), color-stop(100%,#e6e6e6));
      background: -webkit-linear-gradient(top,  #f7f7f7 0%,#e6e6e6 100%);
      background: linear-gradient(to bottom,  #f7f7f7 0%,#e6e6e6 100%);
    }

    button {
      background: #f9f9f9;
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f9f9f9), color-stop(100%,#d9d9d9)); 
      background: -webkit-linear-gradient(top,  #f9f9f9 0%,#d9d9d9 100%);
      background: linear-gradient(to bottom,  #f9f9f9 0%,#d9d9d9 100%); 
      border: 1px solid #BABABA;
      border-radius: 3px;
      font-size: 0.8em;
      padding: 0.3em 0.6em;
      cursor: pointer;
    }
  &lt;/style&gt;

  &lt;div class=&quot;outer&quot;&gt;
    &lt;div class=&quot;info&quot;&gt;
      &lt;div class=&quot;song&quot;&gt;
        &lt;!-- &lt;content select=&quot;.song&quot;&gt;&lt;/content&gt; --&gt;
        Song Name
      &lt;/div&gt;
      &lt;div class=&quot;artist&quot;&gt;
        &lt;!-- &lt;content select=&quot;.artist&quot;&gt;&lt;/content&gt; --&gt;
        Artist
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;controls&quot;&gt;
      &lt;button class=&quot;play&quot;&gt;Play&lt;/button&gt;
      &lt;button class=&quot;pause&quot;&gt;Pause&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;
</pre>

Now that we've got our presentation code sorted we need to write the code that will make use of our widget.

### Projecting the Content

To put our widget to work we first need to create the element that will become our shadow host. This should contain the content that our widget needs (the song name and artist).

<pre>
&lt;div id=&quot;musicPlayer&quot;&gt;
  &lt;span class=&quot;song&quot;&gt;Orange Skies&lt;/span&gt;
  &lt;span class=&quot;artist&quot;&gt;Newton Faulkner&lt;/span&gt;
&lt;/div&gt;
</pre>

Note that we've given the two `<span>` elements classes. Our widget needs to display the song that is playing along with the artist. In order to do this we **project** this content into place using `<content>` elements.

By default all of the content from the shadow host will be projected into the template at the location of the `<content>` element. However, we have two separate pieces of content that need to be displayed in different positions within our widget. Fortunately the `<content>` element has a `select` attribute that allows you to specify which element in your shadow host the content should be projected from. If you look back at your template code you should notice two `<content>` elements like the ones below.

<pre>
&lt;div class=&quot;song&quot;&gt;
**  &lt;content select=&quot;.song&quot;&gt;&lt;/content&gt;**
&lt;/div&gt;
&lt;div class=&quot;artist&quot;&gt;
**  &lt;content select=&quot;.artist&quot;&gt;&lt;/content&gt;**
&lt;/div&gt;
</pre>

Here we use the `select` attribute to specify the class of the element which the projected content should come from.

The last thing we need to do is write some JavaScript code that will create a new shadow root and load the HTML template for our widget.

<pre>
&lt;script&gt;
  var host = document.querySelector(&#039;#musicPlayer&#039;);
  var shadow = host.webkitCreateShadowRoot();
  var template = document.querySelector(&#039;#musicPlayerTemplate&#039;);
  shadow.appendChild(template.content);
  template.remove();
&lt;/script&gt;
</pre>

Here we first get a reference to the shadow host (a `<div>` with the ID `musicPlayer`) and create a new shadow root as we did before. We then get a reference to the template that we created for our widget. Finally we add the template content to the shadow root and remove the original template from the main document DOM. As we used `<content>` elements the browser will take care of projecting the content into the correct places in our widget.

That’s everything you need to know to start building your own widgets using Shadow DOM!

## Final Thoughts

Hopefully this article has showed you how useful Shadow DOM can be when it comes to creating reusable widgets for your interfaces. 

Browser support for Shadow DOM is currently confined to Chrome and Opera 15 which means that it's not quite ready for prime-time yet. However, I think that it has great potential and could really revolutionize how we build websites.

I’m interested to hear your thoughts on Shadow DOM. How would you use it in your projects?

## Useful Links

* [W3C Shadow DOM Specification](http://www.w3.org/TR/shadow-dom/)
* [HTML5 Demos: Shadow DOM Visualizer](http://html5-demos.appspot.com/static/shadowdom-visualizer/index.html)
* [Shadow DOM 301: Advanced Concepts & DOM APIs](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/)
