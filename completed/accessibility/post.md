Making Your Website Accessible
==============================

As browser capabilities continue to grow the websites that we are building are getting ever more complex. Fancy JavaScript UIs are great for showing off the latest technologies but they can cause a real problem for assistive technologies like screen readers.

Unfortunately accessibility is one of those topics that often gets overlooked by a lot of developers. This makes me a little sad. If we want the web to remain a place that can be enjoyed by everyone, we need to be considering our users at both ends of the spectrum.

In this article my aim is to show you just how easy it is to make your websites accessible.


## Why Should You Care About Accessibility?

There are three main reasons why you should care about making your websites accessible.

### #1 It's the Right Thing To Do

This reason alone should be all you need to convince you that accessibility is worth the time and effort.

Building accessible websites is just simply the right thing to do.

As developers we enormous power to create anything that our minds can dream of. It's our responsibility to make sure that the things that we create can be enjoyed by everyone, regardless of whether they might have a disability.

### #2 You Will Become a Better At What You Do

Whether you are a programmer, designer, copywriter or any other web professional, having a focus on accessibility will help you to improve your skills.

Lets look at the example of a programmer. Building accessible websites means that you need to write good, standards-compliant code. That point in itself has a lot of benefits outside of the realm of accessibility. Writing good code that complies with W3C and WHATWG standards means that it is going to be easier for others to understand, which is a big bonus if you work on a team with other programmers.

The same benefits are present for designers. Having a conscious focus on accessibility will make you consider how your choice of color and layout will effect users that are color blind or suffer motor impairments (a loss or limitation of muscle control).

In the fantastic documentary [Objectified](http://www.objectifiedfilm.com/) industrial designer [Dan Formosa](http://danformosa.com/) said something that has really stuck with me.

> What we really need to do to design is look at the extremes.  
> The weakest, or the person with arthritis, or the athlete, or the strongest person.  
> Because if we understand what the extremes are, the middle will take care of itself.

That last line is particularly powerful. When we are designing we need to think about the power users. How can we make using our application easier for people that spend significant amounts of time using it? Keyboard shortcuts in GMail are a good example of designing for power users.

We also need to think about people at the other end of the spectrum. What can we do to make our site easier to navigate for blind people that rely on screen readers? Will somebody that has trouble moving a mouse precisely be able to click that small button?

Asking all these questions forces you to think more deeply about whatever it is that you are building. It develops your understanding of problems and expands your skills as a web professional.

### #3 You May Be Required To By Law

***
**Disclaimer**: I am not a lawyer and the following should not be taken as legal advice.
***

In some countries there are laws that require certain organizations (usually government) to make all digital information accessible.

Section 508 of the Rehabilitation Act in the United States requires that all Federal agencies make digital information accessible to everyone.

The UK has a British Standard (BS8878) that makes recommendations on accessibility but there is no legal requirement for anyone to follow them.

## An Introduction to Screen Readers

Before we dive into how you can make your website more accessible lets first take a look at one of the most common assistive technologies begin used, screen readers.

If you've never used a screen reader before I definitely recommend that you get one installed on your computer (if it didn't come with one) and give it a go. You will probably need to read the help documentation first so that you understand how to move around a web page.

If you are a Mac user you should have [VoiceOver](http://www.apple.com/uk/accessibility/voiceover/) already installed. You can fire it up in _System Preferences_.

For Linux users the best screen reader I have used is [ORCA](https://live.gnome.org/Orca).

Windows users should check out [NVDA](http://community.nvda-project.org/).

You might be surprised at how difficult it is to navigate a website using the screen reader alone. I know that I was the first time I used one. Now imagine that every time you wanted to check your Facebook feed, post a tweet or do a simple web search you had to use a screen reader. It's a bit of an eye-opener.

Now that you've explored some of the reasons why you should care about accessibility, lets take a look at some practical tips for making your websites more accessible.

## Semantic Markup and WAI-ARIA

Using the new semantic HTML elements such as `<header>`, `<footer>` and `<article>` can help computer programs to identify key areas of content on the page. This is because the HTML5 specification explicitly defines what types of content these elements should contain.

The concept here is great, but as HTML5 is still evolving a lot of companies that develop assistive technologies have not yet implemented the new standard. This means that while the use of these new elements should make accessibility easier for developers, many of the tools on the market today simply don't understand them.

Before HTML5 came along there was an effort to give greater meaning to HTML markup through a standard called [WAI-ARIA](http://www.w3.org/TR/wai-aria) (Accessible Rich Web Applications). This standard defines a number of _roles_ that page elements can have. Some of these roles closely mirror the new HTML5 semantic elements (such as _article_ and _main_) but there are a few unique ones too. HTML elements are assigned a role using a `role` attribute.

    <div role="article">...</div>

If you want to learn more about WAI-ARIA check out this great article from Opera Software: [Introduction to WAI-ARIA](http://dev.opera.com/articles/view/introduction-to-wai-aria/).

Even though a lot of screen readers don't currently understand the new semantic elements I personally think that using them is a better approach than WAI-ARIA.

***
**Note:** The W3C is working on some guidelines for [using WAI-ARIA in HTML5](http://www.w3.org/TR/aria-in-html/).
***

## Making Web Forms Accessible

There a couple of key things that you can do to make your web forms accessible. In this article I am going to focus on the proper use of labels and the `tabindex` attribute.

### Using Labels

Labels are really important for users that rely on screen readers for navigating the web. Without them it can be really difficult for these users to fill in your web forms.

Simply adding labels to your form isn't quite good enough. You need to make sure that you are properly assigning each label to it's corresponding input element(s).

To do this you need to first give your `<input>` element an ID. You then add a `for` attribute to your `<label>` element and set its value to the ID that you just gave your input. An example of this can be found below.

    <label for="name">Name:</label>
    <input type="text" name="name" id="name">

An added benefit of assigning labels to inputs is that the area taken up by the label becomes a clickable target for the input. So if you click the label the input will gain focus, or if it is a checkbox or radio button it will toggle the input state. This is really useful for users with motor impairments that might not be able to accurately target small form controls.

### Using The tabindex Attribute

The `tabindex` attribute gives you a way of specifying the order in which inputs should be focused when the tab key is being used to navigate through a web form.

The default order that inputs are focused is determined by the placement of the `<input>` elements in the HTML markup. If you want to change this order for any reason you should specify the `tabindex` on all of the `<input>` elements in the form. Passing in a value between 1 and _n_ (where _n_ is the total number of input elements).

    <label for="name">Name:</label>
    <input type="text" name="name" id="name" tabindex="1">

    <label for="email">Email:</label>
    <input type="email" name="email" id="email" tabindex="3">

    <label for="phone">Phone:</label>
    <input type="tel" name="phone" id="phone" tabindex="2">

In the example above the focus order will move from the name input to the phone input and then finally to the email input.

If you have a web form with a slightly irregular layout, manipulating the focus order can really help users relying on assistive technologies.

## Accessible Images

To make your images accessible you need to ensure that you add a detailed description of the image in the `alt` attribute. When a screen reader encounters an image, this is the text that it will read to the user.

    <img src="cows.jpg" alt="Cows grazing in a field on a sunny day.">

You should be able to build up a mental picture of the image by reading the `alt` text alone.

## Creating Accessible Links

There are two accessibility considerations to make when creating links. The first is to think about the anchor text that will become the clickable link. This text should make sense if it was taken out of the context of the page. 'Click here' is a really bad example of anchor text.

The second consideration is the use of a `title` attribute. This can be used to add a description of the page that you are linking to. This description will then be displayed in a tool-tip when the user hovers their mouse over the link and may also be read aloud by a screen reader.

    <a href="http://teamtreehouse.com" title="Learn how to use HTML, CSS and JavaScript to create websites by watching videos on TeamTreehouse.com">Learn to build websites with Treehouse</a>

## Tackling Tables

Tables can be tricky to understand for assistive technologies. In this section you are going to learn about two techniques you can use to give your tables greater meaning.

### Adding Captions

The `<caption>` element can be used to add a description of the data in the table. This should be placed directly after the opening tag of the `<table>` element.

    <table>
      <caption>
        Table 1.1 shows the exam scores of 120 pupils in the Physics exam.
      </caption>
      ...
    </table>

Captions will be displayed on the page so you will probably want to style them using CSS.

Screen readers will read the caption aloud before continuing on to the data. This helps to give the user more context around the data in the table.

### Scoped Table Headers

It is important to use table headers (`<th>` elements) to markup row or column headings in your tables. You can however go one step further and use the `scope` attribute to define whether the heading refers to the data in the column or in the row. This is done by setting the `scope` attributes value to either `col` or `row`.

For example, if you were marking up a restaurant menu you might use table headings scoped to the column for the column headings in the first row, and table headings scoped to the row for the title of each individual menu item. This is because the name of each menu item is associated with the price of that item. Here is some HTML markup to demonstrate this.

    <table>
      <thead>
        <tr>
          <th scope="col">Menu Item</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Scrambled Egg with Salmon</th>
          <td>$3.50</td>
        </tr>
        ...
      </tbody>
    </table>

Defining scopes on table headers makes it much easier for computer programs to understand the relationships between data in your tables.

## Tools for Testing Accessibility

Now that you've picked up some tips on how to make your websites more accessible lets take a look through some tools that you can use to test your websites.

### Screen Readers

!!! IMAGE HERE !!!

The best way of testing for accessibility is to utilize the tools that your users will be using. Use a screen reader to navigate your website and identify areas that are difficult to access. Could you move some of your markup around so that the main navigation is encountered sooner by the screen reader?

### Web Accessibility Evaluation Tool (WAVE)

!!!IMAGE HERE!!!

[WAVE](http://wave.webaim.org/) is a really useful tool for identifying issues in your websites. The tool works in a similar way to the W3C HTML validator. You pass in a URL to your web page and it then analyzes the page against a list of common accessibility issues. WAVE gives you recommendations around page structure, navigation, the correct use of elements (and attributes) as well as much more.

### Spur

!!!IMAGE HERE!!!

[Spur](http://www.spurapp.com) is a great web application for testing the visual design of your websites. It allows you to apply a variety of effects - such as greyscale, high contrast and blur - to a snapshot of your website. These effects can be really useful for evaluating the use of color in your designs.

### Color Oracle

!!!IMAGE HERE!!!

[Color Oracle](http://colororacle.org/) is another great tool for testing the colors used in your web page designs. This tool replicates a number of types of color blindness, such as _Deuteranopia_, _Protanopia_ and _Tritanopia_. It can be really useful for identifying areas in your designs that may need to adjusted to better cater to color blind users.


## Summary

In this article you've taken a look at some of the techniques and tools that you can use to make your websites more accessible. However there are some things that we haven't covered. I recommend that you check out the W3C [Web Accessibility Initiativee](http://www.w3.org/WAI/) for more information on what you can do to make your websites accessible to everyone.

I'm interested to hear about your experiences when dealing with accessibility. Share your thoughts in the comments below.
