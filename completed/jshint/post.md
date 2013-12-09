JSHint is a tool that can help you to write more reliable and consistent JavaScript code. The tool works by checking your code for a number of common errors. If you’ve ever spent half an hour trying to debug your code only to find that you missed a comma somewhere, you’ll understand how useful JSHint can be.

As well as catching errors in your code, JSHint can be used to enforce coding conventions and [style guides](https://github.com/styleguide). This is really useful is you work in a team as it helps to keep your codebase consistent and easily readable. 

In this post you’re going to learn how to set up and use JSHint. You’ll be taking a look at some plugins that are available for popular text editors, as well as some example JSHint configurations.

## Installing JSHint

JSHint is available through the node package manager (npm). If you don’t have npm installed, go to the [node.js website](http://nodejs.org/) and download a copy of node for your OS. This will install both node.js and npm.

Once you have npm installed, open up terminal and type:

```
npm install -g jshint
```

The `-g` flag means that `jshint` will be installed globally on your system. This allows you to access the executable from any directory.

## Using JSHint on The Command Line

Now that you have JSHint installed lets test a file. You can either [download the demo file](http://cl.ly/code/3G190Q0t3Q1Y) or test a file that you already have on your hard drive.

Open up terminal and navigate to the folder that contains your JavaScript file. Then run the following command to test the file:

```
jshint demo.js
```

If you used the `demo.js` file you should see two errors as shown below.

!!! Insert image of errors

If JSHint doesn’t find any problems with your code nothing will be output into the terminal window. Open up the `demo.js` file in your favorite text editor and add the two missing semi-colons. Running JSHint again should now return no errors.

## Configuring JSHint

One of the best things about JSHint is that it can be configured to meet the needs of you or your team. This configuration can also be easily shared amongst everyone working on a project, ensuring that all the developers are working against the same conventions.

You can define your configuration in two ways. Either by adding [special comments](http://www.jshint.com/docs/) to your code or by storing your configuration in a `.jshintrc` file. I prefer to keep my configuration separate from the code whenever possible, so in this section we’re going to focus on setting up a `.jshintrc` file.

An added advantage of using a dedicated configuration file is that you can use the same configuration to check all of the JavaScript files in your project. For this to work the `.jshintrc` file should be placed at the root of your project.

Lets take a look at a simple example:

```
{
  "curly": true,
  "eqeqeq": true,
  "undef": true,
  "globals": {
    "jQuery": true
  }
}
```

A number of configuration options have been used here to specify coding conventions. 

* `curly` enforces that all code blocks should be surrounded with curly braces. 
* `eqeqeq` prohibits the use of `==` and `!=`, instead developers should use `===` and `!===`.
* `undef` specifies that an error should be thrown if a variable has been used the was not declared.
* `globals` allows you to tell JSHint about global variables that are defined outside the file being tested (`document`, `window`, `jQuery`...). The boolean value specifies if the variable is writeable. Setting the value to `false` (default) means the variable is read-only. The `globals` option should be used when the `undef` option is set to `true`.

You can find a full list of configuration options in the [JSHint documentation](http://www.jshint.com/docs/options/).

***

**Note**: Notice that the configuration options are specified using JSON. This is a requirement for all `.jshintrc` files.

***

If you’re curious, here are some links to JSHint configurations for popular projects:

* [HTML5 Boilerplate .jshintrc](https://github.com/h5bp/html5boilerplate.com/blob/master/.jshintrc)
* [Yeoman Ember.js Generator .jshintrc](https://github.com/yeoman/generator-ember/blob/master/.jshintrc)
* [Twitter Bootstrap .jshintrc](https://github.com/twbs/bootstrap/blob/master/js/.jshintrc)

## Plugins for Popular Text Editors

!!! Insert image of sublime text with error

Running JSHint from the command line can become a bit tedious. Ideally you want to get real-time feedback about any errors as you write your code. There are a whole bunch of plugins available that can bring the goodness of JSHint directly into your favorite text editor. I’ve listed some of the most popular below.

* SublimeText: [SublimeLinter](https://github.com/SublimeLinter/SublimeLinter)
* Vim: [jshint2.vim](https://github.com/Shutnik/jshint2.vim)
* Textmate: [JSHint.tmbundle](https://github.com/bodnaristvan/JSHint.tmbundle)
* Visual Studio: [SharpLinter](https://github.com/jamietre/SharpLinter)
* Brackets / Edge Code: [Brackets JSHint](https://github.com/cfjedimaster/brackets-jshint/)
* Notepad++: [jslintnpp](http://sourceforge.net/projects/jslintnpp/)
* gEdit: [gEdit JSHint](https://github.com/Kilian/gedit-jshint)

Refer to the documentation for each of these plugins for install and configuration instructions.

***

**Bonus**: There’s a [JSHint plugin](https://github.com/gruntjs/grunt-contrib-jshint) available for grunt too!

***

## Final Thoughts

JSHint has become a crucial tool in my development process. It’s saved me so much time by pointing out errors as I make them. I’ve also found that being able to enforce styling conventions has helped me to write much cleaner code.

I hope that this post has given you an insight into how JSHint can fit into your own development process. Take a minute to set up and configure this simple tool and you will never be caught out by trivial errors again.

## Useful Links

* [JSHint Documentation](http://www.jshint.com/docs/)
* [JSHint Configuration Options](http://www.jshint.com/docs/options/)
* [JSHint Grunt Pluign](https://github.com/gruntjs/grunt-contrib-jshint)
