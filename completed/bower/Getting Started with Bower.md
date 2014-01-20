# Getting Started with Bower

There are now more libraries and frameworks available for front-end development than ever before. It's not uncommon to have five or more of these libraries involved in a single project. But keeping track of all these libraries and making sure they're up-to-date can be tricky. Enter [Bower](http://bower.io), a package manager that makes it easy to manage all your application's front-end dependencies.

In this blog post you are going to learn how to get up and running with Bower. You'll start by installing the Bower command-line utility and then go on to learn about the various commands that are available for managing packages.

Lets get started!

## Installing Bower

Bower can be installed using [npm](https://npmjs.org/), the Node package manager. If you don't already have npm installed, head over to the [Node.js website](http://nodejs.org/) and download the relevant copy of Node.js for your system. The npm program is included with the install of Node.js.

Once you have npm installed, open up Terminal (or Command Prompt) and enter the following command:

```
npm install -g bower
```

This will install Bower _globally_ on your system.

Now that you have Bower installed, we can start looking at the commands that are used to manage packages.


## Finding Packages

There are two different ways that you can find Bower packages. Either using the online [component directory](http://sindresorhus.com/bower-components/), or using the command line utility.

To search for packages on the command line you use the `search` command. This should be followed by your search query.

```
bower search <query>
```

For example to search for packages that contain the word 'jquery' you could do the following:

```
bower search jquery
```

This command would return a whole bunch of results, some of which are displayed in the snippet below.

```
Search results:

    jquery git://github.com/components/jquery.git
    jquery-ui git://github.com/components/jqueryui
    jquery.cookie git://github.com/carhartl/jquery-cookie.git
    jquery-placeholder git://github.com/mathiasbynens/jquery-placeholder.git
    jquery-file-upload git://github.com/blueimp/jQuery-File-Upload.git
    jasmine-jquery git://github.com/velesin/jasmine-jquery
    jquery.ui git://github.com/jquery/jquery-ui.git
    ...
```

Each result displays the name of the package and a Git endpoint. You will need either the name or Git endpoint to install a package.


## Installing Packages

To add a new Bower package to your project you use the `install` command. This should be passed the name of the package you wish to install.

```
bower install <package>
```

As well as using the package name, you can also install a package by specifying one of the following:

* A Git endpoint such as `git://github.com/components/jquery.git`
* A path to a local Git repository.
* A shorthand endpoint like `components/jquery`. Bower will assume that GitHub is being used, in which case, the endpoint is the part after `github.com` in the repository URL.
* A URL to a `zip` or `tar` file. The files contents will be extracted automatically.

You can install a specific version of the package by adding a pound-sign (#) after the package name, followed by the version number.

```
bower install <package>#<version>
```

Installed packages will be placed in a `bower_components` directory. This is created in the folder which the `bower` program was executed. You can change this destination using the [configuration options](https://docs.google.com/document/d/1APq7oA9tNao1UYWyOm8dKqlRP2blVkROYLZ2fLIjtWc/edit#heading=h.motxgepy7e9s) in a `.bowerrc` file.

- bower_components
	- jquery
		- jquery.js
		- jquery.min.js
		- jquery.min.map
		- ...
	- modernizr
		- modernizr.js
		- ... 

Once installed, you can use a package by simply adding a `<script>` or `<link>` tag to your HTML markup. Although Bower packages most commonly contain JavaScript files, they can also contain CSS or even images. 

```
<script src="path/to/bower_components/jquery/jquery.min.js"></script>
```

## Installing Packages Using a bower.json File

If you are using multiple packages within your project it's often a good idea to list these packages in a `bower.json` file. This will allow you to install and update multiple packages with a single command.

```
{
  "name": "app-name",
  "version": "0.0.1",
  "dependencies": {
    "sass-bootstrap": "~3.0.0",
    "modernizr": "~2.6.2",
    "jquery": "~1.10.2"
  },
  "private": true
}
```

The simple example above shows a `bower.json` file which defines some information about the projects as well as a list of dependencies. The `bower.json` file is actually used to define a Bower package, so in effect you're creating your own package that contains all of the dependencies for your application.

The properties used in this example are explained below.

* `name` - The name of your application/package.
* `version` - A version number for your application/package.
* `dependencies` - The packages that are required by your application. You should specify a version number for each of these packages as shown in the example above. Specifying `latest`, will cause Bower to install the most recent release of a package.
* `private` - Setting this property to `true` means that you want the package to remain private and do not wish to add it to the registry in the future.

Once you've got your `bower.json` file set up you can simply execute the `bower install` command to install all of the packages you have specified.

Bower includes a handy utility that will help you to create a `bower.json` file for your project. Executing the `bower init` command at the root of your project will launch an interactive program that will create the file for you. However, you may still need to add some packages to the file yourself.

- - - - -

**Note**: For a full list of properties that can be added to your `bower.json` file check out the [specification](https://docs.google.com/document/d/1APq7oA9tNao1UYWyOm8dKqlRP2blVkROYLZ2fLIjtWc/edit#heading=h.58mcp4yqv20).

- - - - -


## Listing Installed Packages

You can easily find out which packages are installed using the `list` command.

```
bower list
```

The snippet below shows the output for a simple project that uses jQuery, Modernizr and Sass. Notice that Bower also does a check to see if a newer version of each of the packages is available.

```
bower check-new     Checking for new versions of the project dependencies..
yo-webapp#0.0.0 /Users/mattwest/websites/yo-webapp
├── jquery#1.10.2 (latest is 2.0.3)
├── modernizr#2.6.3 (latest is 2.7.1)
└─┬ sass-bootstrap#3.0.2
  └── jquery#1.10.2 (2.0.3 available)
```


## Updating Packages

Updating a package is pretty straightforward. If you've used a `bower.json` file you can execute a simple `update` command to update all of the packages at once. However, the update tool will abide by the version restrictions you've specified in the `bower.json` file.

```
bower update
```

To update an individual package you again use the `update` command, this time specifying the name of the package you wish to update.

```
bower update <package>
```

## Uninstalling Packages

To remove a package you can use the `uninstall` command followed by the name of the package you wish to remove.

```
bower uninstall <package>
```

It's possible to remove multiple packages at once by listing the package names.

```
bower uninstall jquery modernizr sass-bootstrap
```


## Final Thoughts

Package managers have revolutionised how we share code. They've made using code libraries easier than ever before, and have taken away much of the headache of dealing with updates.

For a long time front-end developers looked at projects like RubyGems with envy; wishing that one day we too would have a straight-forward way of managing project dependencies. Bower has provided us with that tool. As more great libraries become common-place among our web applications, the complexity of our projects will inevitably increase. Bower provides us with a way of managing this complexity.


## Useful Links
* [Bower](http://bower.io/)
* [Bower GitHub Repository](https://github.com/bower/bower)
* [Bower Component Directory](http://sindresorhus.com/bower-components/)