# Getting Started with the WebP Image Format

When it comes to optimizing websites for performance one of the biggest goals is to reduce the amount of data that needs to be sent to the browser (the payload).  As images commonly make up the [largest chunk](https://docs.google.com/presentation/d/1NidHQ-HAWpgQiYJ44gOfgcp_FQ2u59WE4eHuSvwddXY/present#slide=id.gaf22bf02_4_0) of the overall page size, it's a good idea to find ways to reduce the size of your images. There are plenty of tools available that can compress images in order to decrease the file size but you're still limited to a certain extent by the file type. The way in which images are encoded has a big impact on the size of the resulting files.

In this blog post you're going to learn about a new image format called WebP that aims to reduce the size of images without compromising their quality.


## What is WebP?

!!! Insert Image Comparison

WebP is an image format developed by Google which can reduce the file size of your images by [up to 34%](https://developers.google.com/speed/webp/docs/webp_study) when compared with JPEG images. This can have a significant impact on both page load times and bandwidth usage.

After the [Chrome Web Store](https://chrome.google.com/webstore) switched to using WebP last year, the team at Google reported an average reduction of 30% in the size of images across the site. This amounts to a saving of several terabytes a day in bandwidth! Google is also currently using WebP for images on the [Play Store](https://play.google.com/store).

The WebP format supports both [lossless](http://en.wikipedia.org/wiki/Lossless_compression) and [lossy](http://en.wikipedia.org/wiki/Lossy_data_compression) image compression, as well as alpha channel transparency, color profiles, metadata, and animation. This feature set starts to make WebP look like a one-stop solution for images on the web.

The importance of developing a better image format is reinforced when you think about how browsing trends have changed over the past few years. Mobile browsing now accounts for 15% of all global internet traffic and that figure is still rising. However, the networks that these mobile devices rely on for data hasn't improved at the same rate. For much of the population mobile browsing is still restricted by low bandwidth connections that can make downloading web pages frustratingly slow. Using technologies like WebP to reduce the overall payload size of your web pages helps to alleviate some of this frustration.


## Pros and Cons of Using WebP

Using WebP has many benefits over more traditional image formats like JPEG, PNG or GIF.

* **Small File Size**
* **Increased Quality** - When compared to compressing images to the same file size using other formats.
* **Royalty Free** - WebP was open-sourced under a BSD-style license by Google in 2010.
* **One Format to Rule Them All** - WebP has the ability to replace JPEG, PNG and GIF to become a single format for all images on the web.

Although WebP has been around since 2010, support is still limited. This is the main drawback of using WebP today (we'll look at a way around this in the next section).

* **Browser Support** - WebP is currently supported in Chrome and Opera on the desktop. Mobile support is limited to the native Android browser and Chrome for Android. You'll learn more about how to handle this limitation later in this post.
* **Native OS Support** - WebP is not currently supported natively in any operating systems. Google has primarily developed the format for the web, but there is a [codec available](https://developers.google.com/speed/webp/docs/webp_codec) that adds support to the Windows Imaging Component.

* * * * *

**Note**: It's possible to use WebP images within Android and [iOS apps](https://github.com/carsonmcdonald/WebP-iOS-example), however in this post we're just going to focus on web applications.

* * * * *

## Converting Images to WebP

By now you should have some of idea of what makes WebP different and why it is a good idea to consider using it in your web applications. In this section you're going to learn how to convert your existing images to the WebP format.

Google has developed a number of command line utilities for converting images to WebP. You can download these from the Google Developers website [here](https://developers.google.com/speed/webp/download).  Once you have a copy of the utilities you may want to add the utilities `bin` folder to your local PATH. This can be done by adding the following lines to the `.bash_profile` file in your home directory (Mac/Linux).

```
PATH=$PATH:"/path/to/libwebp-utilities/bin"
export PATH
```

You will need to update the path within the quotes to represent the location of the WebP utilities folder on your system. Once you restart your terminal you should be able to access the utilities on the command line.

Alternatively, on a Mac you can install the utilities using [homebrew](http://brew.sh/).

```
brew install webp
```

* * * * *

**Note:** Be aware that the version of the utilities available via homebrew may not always match the latest release available through the project website.

* * * * *

Once you have the utilities installed you can convert a JPEG or PNG image to WebP using the `cwebp` utility.

```
cwebp [options] -q quality input.jpg -o output.webp
```

The `quality` option should be a number between 0 (poor) and 100 (very good). A typical quality value is about 80, but you may want to play around with this until you reach a balance between file size and quality that you're happy with.

For a full list of options that can be used with this utility run the `cwebp` command with the `-longhelp` flag, or check out the [documentation](https://developers.google.com/speed/webp/docs/cwebp).

* * * * *

**Note**: You can use the [`dwebp`](https://developers.google.com/speed/webp/docs/dwebp) utility to convert your WebP images back to PNG, PAM, PPM or PGM images.

```
dwebp input_file.webp [options] [-o output_file]
```

* * * * *


## Automatic Conversion with the PageSpeed Module

It's great to have these utilities available to manually convert images to WebP but as we saw early, not all browsers support this image format yet. We need a way of serving WebP images to those that can view them, and a fallback to JPEGs or PNGs for those that can't. You could write some elaborate server-side code that figures out whether a user's browser supports WebP and then serves the appropriate file to them, but luckily you don't have to.

The [PageSpeed module](https://developers.google.com/speed/pagespeed/module) developed by Google includes a feature that will automatically convert your images to WebP and serve them up to browsers that supports the format. This works like magic and it's pretty simple to set up. All you have to do is add a single line to your host configuration that enables this feature.

```
ModPagespeedEnableFilters convert_jpeg_to_webp
```

* * * * *

**Note**: If you're not familiar with the PageSpeed module check out my previous post on [how to set up mod_pagespeed on an Apache web server](http://blog.teamtreehouse.com/automating-web-performance-best-practices-mod_pagespeed).

* * * * *

Enabling the [`convert_jpeg_to_webp`](https://developers.google.com/speed/pagespeed/module/filter-image-optimize#convert_jpeg_to_webp) filter will cause the PageSpeed module's image optimizer to automatically convert and serve WebP images were appropriate. Initially this just works for JPEG images but you can add support for PNGs too by enabling the [`convert_png_to_jpeg`](https://developers.google.com/speed/pagespeed/module/filter-image-optimize#convert_png_to_jpeg) filter.

```
ModPagespeedEnableFilters convert_png_to_jpeg
```

Google reports that [over 300,000 websites](https://docs.google.com/presentation/d/1NidHQ-HAWpgQiYJ44gOfgcp_FQ2u59WE4eHuSvwddXY/present#slide=id.gaf22bf02_2_111) are currently using the PageSpeed module (or service) to serve WebP images to users.

If you have the ability to use the PageSpeed module on your server this is a really easy way to make sure that you're taking advantage of the benefits of WebP.


## Final Thoughts

In this post you've learned how using the WebP image format can help to reduce the overall size of your web pages, and therefore decrease page load times. It's evident that WebP has a number of advantages over JPEG or PNG, both in the balance between size and quality, and in the features supported by this emerging format.

Although browser support for WebP still has a lot of room for improvement, using Google's PageSpeed module allows you to easily get the benefits of WebP without alienating user's with browsers that don't support the format.

For me, taking advantage of WebP through the PageSpeed module seems like a no-brainer, but what are your thoughts? Let us know in the comments below.

## Useful Links

* [Google Developers: WebP](https://developers.google.com/speed/webp/)
* [WebP: enabling faster, smarter and more beautiful web](https://docs.google.com/presentation/d/1NidHQ-HAWpgQiYJ44gOfgcp_FQ2u59WE4eHuSvwddXY/present)
* [PageSpeed Module: Convert JPEG to WebP](https://developers.google.com/speed/pagespeed/module/filter-image-optimize#convert_jpeg_to_webp)
* [Can I Use... WebP](http://caniuse.com/webp)