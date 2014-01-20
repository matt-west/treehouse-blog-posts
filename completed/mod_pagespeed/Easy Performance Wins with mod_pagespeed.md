# Easy Performance Wins with mod_pagespeed

Web performance is a brilliant, but sometimes complex world. Concatenating and minifying files, optimising images, setting up caching, these are all tasks that can lead to great performance wins. We know that this stuff is good for performance but actually putting these strategies into practice can sometimes be tedious. A team at Google recognised this problem and came up with the idea of creating a web server module that would take of a whole bunch of performance optimizations for you; thus mod_pagespeed was born.

In this post you're going to learn how to set up mod_pagespeed on an Apache web server. You'll also be learning how to configure optimization filters that are provided by the module.

* * * * *

**Note**: This post assumes a familiarity with using the command line, SSH, and basic Apache configurations.

* * * * *

## Performance Optimizations Covered by mod_pagespeed

The PageSpeed module (mod_pagespeed) contains a number of _filters_ that are each responsible for taking care of an optimization task. By default, filters are enabled that handle: 

* Image Optimization (Compression and Resizing)
* CSS & JavaScript Concatenation, Minification, and Inlining
* Asset Caching

As well as these common optimizations there are filters available for a wide range of other tasks, including:

* Deferred Loading of JavaScript and Images
* Removal of HTML Comments and Whitespace
* Lazy-loading Images (only loaded when they become visible in the viewport)
* Google Analytics Injection
* and more...

Later in this post you'll learn how to enable these additional filters in the PageSpeed configuration.


## Installing mod_pagespeed For Apache

In this post we're going to focussing on setting up the PageSpeed module for an Apache web server. It's worth noting that there is also an equivalent module available for [nginx](https://developers.google.com/speed/pagespeed/module/build_ngx_pagespeed_from_source).

* * * * *

**Note**: In order to install the mod_pagespeed module you will need to have SSH access to your web server. If you use a shared hosting service this may not be the case, and therefore I'd advise you to contact your hosting provider and enquire if they have support for mod_pagespeed. You can also check to see if the module is enabled using a [phpinfo file](https://kb.mediatemple.net/questions/764/How+can+I+create+a+phpinfo.php+page%3F).

* * * * *

To install the mod_pagespeed module follow these steps.

### 1. Open a Connection to Your Server

Start by opening up Terminal and creating a new SSH connection to your server.

```
ssh user@hostname  # e.g. ssh root@127.0.0.1
```

### 2. Download the Package

[Download](https://developers.google.com/speed/pagespeed/module/download) the appropriate package for your server environment. You can use the `wget` program to save this file directly to your server.
	
```
wget <package url>
```

* **32 Bit (Debian/Ubuntu)**: <https://dl-ssl.google.com/dl/linux/direct/mod-pagespeed-stable_current_i386.deb>
* **64 Bit (Debian/Ubuntu)**: <https://dl-ssl.google.com/dl/linux/direct/mod-pagespeed-stable_current_amd64.deb>
* **32 Bit (CentOS/Fedora)**: <https://dl-ssl.google.com/dl/linux/direct/mod-pagespeed-stable_current_i386.rpm>
* **64 Bit (CentOS/Fedora)**: <https://dl-ssl.google.com/dl/linux/direct/mod-pagespeed-stable_current_x86_64.rpm>

### 3. Install the Package

Next you need to install the package. Instructions for doing this vary depending on what type of server you are using.

For Debian/Ubuntu servers:

```
sudo dpkg -i mod-pagespeed-*.deb
sudo apt-get -f install
```

For CentOS/Fedora servers:

```
# only if 'at' is not installed
sudo yum install at

# install the package
sudo rpm -U mod-pagespeed-*.rpm
```

### 4. Restart Apache

The mod_pagespeed module should now be installed on your server. All you need to do now is restart Apache.

```
service apache2 restart
```

The installation process should have enabled the new module for you. You can check this by looking for the `pagespeed.conf` and `pagespeed.load` files in the `/etc/apache2/mods-enabled` directory. If these two files are present the module will be loaded by Apache and you're good to go!

If you can't find these` files in the `mods-enabled` folder, execute the following commands to enable the module and restart the web server.

```
cd /etc/apache2/mods-enabled
ln -s ../mods-available/pagespeed.* ./

# Restart Apache
service apache2 restart
```

Simply by installing mod_pagespeed you've bagged yourself a bunch of great performance wins. By default, mod_pagespeed will be enabled for all of the websites on your server.

!!! Images

Try visiting one of the websites on the server and take a look at the source code in your browser. You'll see that mod_pagespeed has changed things around a bit. You may now have CSS and JavaScript assets (maybe even some small images) inline within your HTML. This reduces the number of HTTP requests that are needed to load the page, resulting in faster load times.


## Configuring mod_pagespeed

The mod_pagespeed module comes with some of the most commonly used filters enabled by default. In this section you're going to learn how to enable some of the other optimization filters that are provided.

The master configuration file for mod_pagespeed can be found at `/etc/apache2/mods-available/pagespeed.conf`. This defines the global configuration for mod_pagespeed and therefore any changes that you make to this file will affect all of the websites on your server. This is great if you want all of your websites to use the same filters but there may be times when this is not the case. 

If you're using [virtual hosts](http://httpd.apache.org/docs/current/vhosts/), an ideal place to put your site-specific PageSpeed filters is within the host configuration. Depending on your setup, you may find virtual hosts declared within the files in the `/etc/apache2/sites-available` folder.

The snippet below shows an example `VirtualHost` configuration with mod_pagespeed directives.

```
<VirtualHost *:80>
  DocumentRoot /www/example
  ServerName www.example.come
  
  # mod_pagespeed configuration
  ModPagespeedEnableFilters lazyload_images
  ModPagespeedDisableFilters inline_css
</VirtualHost>
```

You can also use a `.htaccess` file if you don't have access to the configuration for you virtual host.

* * * * *

**Note**: By default, virtual hosts will inherit the options specified in the master `pagespeed.conf` file. This behaviour is controlled using the `ModPagespeedInheritVHostConfig` directive. Setting this to `off` would cause each of the virtual hosts to have a completely independent PageSpeed configuration.

* * * * *

### Rewrite Levels

PageSpeed uses two different levels to make configuration simple. The `CoreFilters` level enables a default set of filters that will make your website faster. You can then enable or disable filters to modify the configuration as you wish.

Alternatively you can disable `CoreFilters` by setting the `RewriteLevel` to `PassThrough`. You will then need to manually enable all of the filters that you wish to use.

```
ModPagespeedRewriteLevel PassThrough
```

Unless you have some very specific requirements it's often best to leave the `RewriteLevel` as `CoreFilters` and then modify the enabled filters in the host configuration.

### Enabling Filters

To enable a filter you use the `ModPagespeedEnableFilters` directive.

```
ModPagespeedEnableFilters <filter_name>,<filter2_name>
```

You can find a full list of the different filters available [here](https://developers.google.com/speed/pagespeed/module/config_filters).

Note than some filters rely on additional configuration variables, such as the `insert_ga` filter which will automatically insert the Google Analytics code into your pages.

```
ModPagespeedEnableFilters insert_ga
ModPagespeedAnalyticsID <Analytics ID>
```

Refer to the [documentation](https://developers.google.com/speed/pagespeed/module/config_filters) for each of the options to find out if you need to set additional variables.

### Disabling Filters

To disable a filter you use the `ModPagespeedDisableFilters` directive.

```
ModPagespeedDisableFilters <filter_name>,<filter2_name>
```

Specifying this in your host config will override the options specified in `pagespeed.conf`.

As well as disabling filters you can also forbid virtual hosts from using specific filters. This is done using the `ModPagespeedForbidFilters` directive.

```
ModPagespeedForbidFilters <filter_name>,<filter2_name>
```

Forbidding access to filters can be useful if you manage a server that hosts many different websites.

### Disabling mod_pagespeed for a Website

You can disable the PageSpeed module completely for a specific website by setting `ModPagespeed` to `off` in your host configuration.

```
ModPagespeed off
```

If you only need to temporarily disable mod_pagespeed for testing purposes, you can just add the `ModPagespeed=off` query parameter to the URL.

```
http://example.com/index.html?ModPagespeed=off
```


## Final Thoughts

We all know that optimizing websites for performance is a big part of web development today, but taking care of all the different optimization tasks can often become tedious. The PageSpeed module you've learned about here takes care of much of this headache; leaving you to do what you do best - build great websites.

I highly recommend that you take a little time to install this module on your web servers. For a minimal amount of effort you can unlock a wide range of performance gains and supercharge your websites.


## Useful Links

* [PageSpeed Module Homepage](https://developers.google.com/speed/pagespeed/module)
* [Google Code Project](https://code.google.com/p/modpagespeed/)
* [mod_pagespeed Filter Examples](http://www.modpagespeed.com/)
* [Nginx Install Instructions](https://developers.google.com/speed/pagespeed/module/build_ngx_pagespeed_from_source)
* [Configuring PageSpeed Filters](https://developers.google.com/speed/pagespeed/module/config_filters)