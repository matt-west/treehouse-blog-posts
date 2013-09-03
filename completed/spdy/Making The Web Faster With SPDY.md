SPDY (pronounced “*speedy*”) is a new technology that aims to decrease page load times by fixing a number of flaws present in HTTP 1.1. It’s not a replacement for HTTP but instead adds a number of features that help to make web transactions faster.

***
**Note**: The HTTP 2.0 Working Group has chosen to use SPDY as a starting point for the new HTTP 2.0 specification, but SPDY itself was not designed to be a direct replacement.
***

SPDY was initially developed at Google and is used on almost all Google products. It is also being used by other tech companies such as Facebook, Twitter and WordPress.com.

In this article you are going to learn the basics of how SPDY works and how it helps to speed up web performance.

## How SPDY Fits Into The Existing Architecture

SPDY works by adding an additional layer to the request stack that augments the existing functionality of HTTP.

!!! Insert Stack Image Here

Before we look at the features that SPDY introduces, lets first take a look at the problems that SPDY aims to solve.

## Problems Introduced in HTTP 1.1

HTTP 1.1 has a number of flaws that affect the efficiency of requests between a client and server. These flaws impose limitations on the performance of your websites.

The aim of SPDY is to provide functionality that helps to solve the following problems.

### Limited Number of Connections

Due to the way that HTTP is designed, each resource requires a separate HTTP request to a server. Modern browsers currently support up to 6 simultaneous connections to a server. This means that if your website requires more than 6 resources from the same server the browser will have to wait until one of the resources has been downloaded before it can open up another request. This can have a significant impact on the overall page load time.

Developers have used a strategy called [HTTP pipelining](http://en.wikipedia.org/wiki/HTTP_pipelining) to get around this problem, however this still suffers from the [First-In, First-Out](https://en.wikipedia.org/wiki/FIFO) (FIFO) problem.

***
**Note**: Research carried out by [HTTPArchive](http://httparchive.org/trends.php) found that the average web page consists of 84 requests from 30 different domains.
***

### HTTP Headers

Another issue that is present in HTTP is the use of uncompressed or unnecessary headers. [HTTP headers](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields) are fundamental to the way that web transactions work but all this data still needs to be sent over the wire and so the more headers you have, the longer your request will take.

While there are technologies in use today that compress headers they are usually optional. There is the potential for a significant saving by compressing request headers or emitting headers that are not needed.

### Developer Workarounds

Web developers have adopted a number of strategies in order to decrease the load times of their web pages. These include things like:

* **Image Spriting** - Combining a number of smaller images into one image ‘sprite’ and then using some clever CSS to display the correct section of the sprite image on the page.
* **Concatenation and Minification** - Combining multiple CSS or JS files in order to reduce the number of HTTP requests in a page. Minification refers to the practice of removing whitespace and other supplementary content from files in order to reduce their size.
* **Domain Sharding** - Placing resources under different sub-domains so that the browser can open more parallel connections.
* **Inline Resources** - Using Data URIs to embed images into the HTML code, again reducing the number of HTTP requests.

While all of these strategies are effective at speeding up page load times they can be a pain to implement. Fixing some of the issues in HTTP 1.1 would eliminate the need for developers to worry about adopting these workarounds.

## Solving These Problems with SPDY

Now that you understand some of the problems that SPDY aims to fix, lets take a look at some of the key features that make up SPDY.

### Multiplexed Streams

With SPDY, requests are mapped to **streams**. SPDY allows for multiple concurrent streams to use a single connection between the client and browser. This massively reduces the amount of time that is taken to establish connections.

These connections are *bidirectional* and therefore streams can be initiated from both the client and server. More on this later.

### Prioritized Streams

SPDY streams include prioritization. The client can instruct a server that certain resources are more important than others and therefore should be sent as soon as the bandwidth is available.

This helps to solve the ‘first-in, first-out’ problem I mentioned earlier.

### Header Compression

SPDY compresses request and response headers in order to minimize the amount of data being sent over the wire. [Experiments](http://www.chromium.org/spdy/spdy-whitepaper) carried out by Google observed an ~88% reduction in the size of request headers and an ~85% reduction in the size of response headers after enabling compression. This amounted to a saving of between 45 and 1142 ms in the overall page load time.

The SPDY team is also experimenting with ways of eliminating headers that are unnecessary. For example, after the user-agent header has been sent to the server we should be able to safely assume that it will not change for the rest of the session. We can therefore omit this from future requests, reducing the size of the header data.

### Server Push

Another great feature of SPDY is the ability to create server-initiated streams. These allow the server to push resources down to the client before the client has requested them.

For example, a server could parse an HTML file and see that it contains a `<link>` element that references a CSS stylesheet. Traditionally the server would have to wait until the client issued a request for the stylesheet before it could send it down. However as we know that the client will need this file why don’t we just send it automatically. We would then eliminate the time it takes for the client’s request to reach the server (also know as [*latency*](http://en.wikipedia.org/wiki/Latency_(engineering))).

The priciniple here is essentially equivalent to using [Data URIs](http://css-tricks.com/data-uris/) to embed images within the HTML markup of a page. We know that the resource will be required so it makes sense to eliminate the need for the extra request.

## Using SPDY Today

Now that you’ve seen what SPDY has to offer, I’m sure that you are wondering how you can put it to use. The good news is that SPDY is ready for primetime. As I mentioned earlier many companies including Google, Facebook and Twitter have it running on production systems today.

For Apache users there is a module available called [mod_spdy](https://developers.google.com/speed/spdy/mod_spdy/).
Nginx users should check out the [ngx_http_spdy_module](http://nginx.org/en/docs/http/ngx_http_spdy_module.html).

***
**Note**: You don’t need to modify any of your site content in order to start using SPDY.
***

One thing to keep in mind is that SPDY requires SSL. This does introduce a small latency penalty but ensures a secure connection between the client and server.

Browsers with support for SPDY currently include Chrome, Firefox and Opera. Microsoft also recently confirmed that SPDY will be supported in IE11.

## Final Thoughts

Hopefully you should now have a basic understanding of what SPDY is and how it fits in with the rest of the web stack.

SPDY promises to make our lives as developers a lot easier by eliminating the need to implement workarounds for the bottlenecks found in HTTP 1.1. The days of creating image sprites and implementing domain sharding may well be coming to an end.

## Useful Links
* [High Performance Browser Networking](http://chimera.labs.oreilly.com/books/1230000000545) by Ilya Grigorik
*  [Apache Module: mod_spdy](https://developers.google.com/speed/spdy/mod_spdy/)
* [Nginx Module: ngx_http_spdy_module](http://nginx.org/en/docs/http/ngx_http_spdy_module.html)
* [SPDY: An experimental protocol for a faster web](http://www.chromium.org/spdy/spdy-whitepaper)
* [Can I use SPDY?](http://caniuse.com/spdy)
* [SPDY Website Checker](http://spdycheck.org/)
