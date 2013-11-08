# Getting Started with Grunt

Grunt is a task runner that can dramatically improve your front-end development workflow. With the use of a number of grunt plugins you can automate tasks such as compiling SASS and coffeescript; optimizing images; and validating your JavaScript code with JSHint. 

You may have used something like CodeKit or Hammer to handle these tasks in the past. I think both of these apps are great (and have used them extensively in the past) but where Grunt wins out is customizability. There are masses of plugins available to help integrate everything from image optimizing to CSS style injection into your workflow.

In this blog post you are going to learn how to set up grunt and configure tasks to handle Compass & SASS compilation, JSHint, and CSS styling injection.

Lets get started.


## Installing the Grunt Command Line Interface

Our first job is to install the Grunt command line interface. This is responsible for locating the grunt library in your project and loading the `Gruntfile.js` configuration (more on this later).

Grunt and Grunt plugins are both installed using [npm](https://npmjs.org/), the Node.js package manager. If you don't have Node.js installed on your machine visit the [download page](http://nodejs.org/download/) and grab the installer for your operating system. Follow the steps in the installation wizard and you should be up and running in no time. npm is included in the install.

Once you have Node.js and npm installed you can install the `grunt-cli` package.

```sh
npm install -g grunt-cli
```

The `-g` flag will install `grunt-cli` globally so you will only ever have to run this command once.


## Creating a package.json File

Now that you've got the Grunt CLI installed it's time to install the Grunt task runner.

In order to better manage the dependencies for your project it's best to create a `package.json` file. If you're familiar with Rails development this is similar to a `Gemfile`.

The `package.json` file should be placed in the root of your project. This file defines data about the project such as the project name, version and author. The `package.json` file is also responsible for managing dependencies. The `devDependencies` property defines the different packages that are needed for your application.

```js
{
  "name": "project-name",
  "version": "0.1.0",
  "author": "Your Name",
  "devDependencies": {
    "grunt": "~0.4.1",
    "grunt-contrib-jshint": "~0.6.3",
    "grunt-contrib-watch": "~0.5.3",
    "grunt-contrib-compass": "~0.6.0"
  }
}
```

***
**Note**: This is a very basic example of a `package.json` file. For a comprehensive list of all the properties that can be specified check out [the documentationn](https://npmjs.org/doc/json.html).
***

Once you have created your `package.json` file you can install all of the dependencies you specified using a single command:

```sh
npm install
```

This command will fetch all of the packages and store them in a new `node_modules` directory in your project route. You may want to add this directory to you `.gitignore` file (or similar) so that it doesn't get checked in to version control. Make sure that your `package.json` file is added to version control though, as this is what other developers will use to make sure that they have all the packages installed that the project needs.

If you want to install addition packages you can again use the `npm install` command. This time specifying the name of the package you wish to install. 

```sh
npm install <module> --save-dev
```

Using the `--save-dev` flag will cause npm to automatically add this package to the dependencies in your `package.json` file. A handy little trick to save you some time and make sure that you don't forget to update the file yourself.


## Defining Tasks in the Gruntfile

Next you need to create a file called `Gruntfile.js`. This is where you define and configure the tasks that you want Grunt to run.

Lets take a look at an example that uses the plugins specified in your `package.json` file.

```js
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      css: {
        files: [
          '**/*.sass',
          '**/*.scss'
        ],
        tasks: ['compass']
      },
      js: {
        files: [
          'assets/js/*.js',
          'Gruntfile.js'
        ],
        tasks: ['jshint']
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'assets/sass',
          cssDir: 'assets/css',
          outputStyle: 'compressed'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'assets/js/*.js']
    }
  });
  
  // Load the Grunt plugins.
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Register the default tasks.
  grunt.registerTask('default', ['watch']);
};
```

### The Wrapper Function

All of code for your Gruntfile must be placed within the 'wrapper' function. This convention is needed so that Grunt can understand the file.

```js
module.exports = function(grunt) {
  // Configuration, Tasks and Plugins.
};
```

### Project Configuration

The next section in the Gruntfile is the project configuration. This is handled by the `grunt.initConfig` method. This method should be passed an object containing the project configuration as well as any task configurations.

The `pkg: grunt.file.readJSON('package.json'),` line imports the config data from the `package.json` file you created earlier. Many Grunt plugins rely on this data for things like the project name and version.

```js
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  task: {...},
  task_two: {...}
});
```

### Configuring Tasks

Each Grunt task has it's own configuration within the object passed to `grunt.configInit`. The name of the property containing the task configuration is almost always the same as the name of the grunt task.

Lets run through the task configurations in your Gruntfile.

The **watch** task executes other tasks when certain files are changed. This is useful for doing things like compiling your SASS files to CSS every time that a SASS file is saved. The configuration for the watch task looks as follows.

```js
watch: {
  css: {
    files: [
      '**/*.sass',
      '**/*.scss'
    ],
    tasks: ['compass']
  },
  js: {
    files: [
      'assets/js/*.js',
      'Gruntfile.js'
    ],
    tasks: ['jshint']
  }
},
```

In this configuration we have defined two different *targets*. One to handle what should happen when a SASS file changes, and one to handle changes to JavaScript files. The `files` property of both of these targets specifies which files the watch task should monitor. You can use wildcards (*) here to save yourself having to list out each file individually. The `tasks` property defines an array of grunt tasks that should be executed when a change is made to one of the files in that target.

The Gruntfile uses the `grunt-contrib-compass` plugin to compile SASS so that you have the added goodness of [Compass](http://compass-style.org/). There is also a [pure SASS plugin](https://github.com/gruntjs/grunt-contrib-sass) if you don't use Compass.

```js
compass: {
  dist: {
    options: {
      sassDir: 'assets/sass',
      cssDir: 'assets/css',
      outputStyle: 'compressed'
    }
  }
},
```

The config for the **compass** plugin is pretty straight-forward. Within the `options` property you define the directory containing your SASS files and the directory that you want the compiled CSS to be output to. The `outputStyle` property allows you to specify how the SASS code should be compiled. Specifying `compressed` here will output a CSS file that has been minified.  

Next up, lets take a look at the **JSHint** task. If you haven't used [JSHint](http://www.jshint.com/) before it's a really neat tool for checking your JavaScript code for errors. It can also be used to help enforce a style guide so that your code is easily readable to everyone working on a project.

```js
jshint: {
  options: {
    jshintrc: '.jshintrc'
  },
  all: ['Gruntfile.js', 'assets/js/*.js']
}
```

The `all` property here is used to specify which files should be checked with JSHint. Again wildcards (*) have been used here to select all the JavaScript files in the `assets/js` directory.

You can specify the options that JSHint should run with using the `options` property. You can either list these directly in the Gruntfile or extract them out into a `.jshintrc` file. I like to use a `.jshintrc` file because it's easier to maintain.

Here's an example of what a simple `.jshintrc` file looks like.

```js
{
  "node": true,
  "esnext": true,
  "curly": false,
  "smarttabs": true,
  "indent": 2,
  "quotmark": "single",
  "globals": {
    "jQuery": true
  }
}
```

***
**Note**: For a full list of JSHint options check out the [documentation](http://www.jshint.com/docs/options/).
***

In this section we've only touched on some of the configuration options for the grunt tasks we're using. For more information check out the documentation for each of the plugins.

* [Watch Documentation](https://github.com/gruntjs/grunt-contrib-watch)
* [Compass Documentation](https://github.com/gruntjs/grunt-contrib-compass)
* [JSHint Documentation](https://github.com/gruntjs/grunt-contrib-jshint)


### Loading the Plugins

The next section in the Gruntfile is used for loading each of the plugins you wish to use. These need to be specified in your `package.json` file and installed using `npm install`. If you try to run grunt without installing a plugin it will just display error.

```js
// Load the Grunt plugins.
grunt.loadNpmTasks('grunt-contrib-compass');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-jshint');
```


### Registering the Default Tasks

The `grunt.registerTask` method is used specify a default set of tasks that should run when the `grunt` command is executed.

```js
// Register the default tasks.
grunt.registerTask('default', ['watch']);
```

The first parameter of this method specifies the name of the task (in this case 'default') and the second contains an array of the tasks you wish to be executed. The `watch` task we defined earlier takes care of calling the `compass` and `jshint` tasks, so we only need to specify `watch` here.


## Running Grunt

So all this configuration stuff is great but how do you actually run grunt?

Executing the `grunt` command in your terminal will run all of the tasks specified in your `default` task.

You can also run tasks individually by passing the task name to the `grunt` command.

```sh
grunt           // Runs default tasks
grunt compass   // Just runs the compass task
```


## Adding New Plugins

Now that you have an understanding of how to set up and run Grunt, lets add another plugin that will handle [CSS style injection](http://css-tricks.com/style-injection-is-for-winners/). This is a really neat tool that updates the CSS in the browser without refreshing the page.

Start by installing the `grunt-browser-sync` package. Use the `--save-dev` flag to automatically update your `package.json` file.

```sh
npm install grunt-browser-sync --save-dev
```

You then need to load the plugin in your Gruntfile.

```js
grunt.loadNpmTasks('grunt-browser-sync');
```

Next add the configuration for the `browser_sync` task to your Gruntfile. This specifies which CSS files should be injected into the page. The plugin can also handle images, JavaScript and markup files. However, these will trigger a full page refresh.

```js
browser_sync: {
  files: {
    src : [
      'assets/css/*.css',
      'assets/img/*',
      'assets/js/*.js',
      '**/*.html'
    ],
  },
  options: {
    watchTask: true
  }
},
```

The `watchTask` option is set to `true` here because we are using the `watch` plugin. As we are compiling SASS, we need to make sure that the order in which tasks are executed is correct. Otherwise browser sync might inject the CSS before the new CSS file has been generated by the `compass` task.

***
**Note**: The true power of browser sync becomes apparent when testing a site across multiple devices. The plugin will do it's best to determine your IP on the network so that syncing works across devices. However, if you are using custom domains or browser sync isn't finding the correct IP, you can specify your host using the `host` property.

```js
host: 'treehouse.dev'
```
***

Next you need to update the default tasks to include `browser_sync`.

```js
grunt.registerTask('default', ['browser_sync', 'watch']);
```

Browser Sync uses [WebSockets](http://blog.teamtreehouse.com/an-introduction-to-websockets) to send messages to the browser that trigger style injections or full page refreshes. When you first execute the `grunt` command you will be given two lines to add to your HTML that will create the WebSocket connection.

```html
<script src='http://YOUR_HOST:3000/socket.io/socket.io.js'></script>
<script src='http://YOUR_HOST:3001/browser-sync-client.min.js'></script>
```

You're done! You should now be able to make updates to your CSS, JavaScript and markup files and have the changes displayed in the browser automatically. Not having to manually refresh the browser window every time you change a file is really nice.


## Final Thoughts

If you're looking for ways to improve your workflow Grunt is definitely a good place to start. Hopefully this blog post has showed you how to get set up with Grunt and introduced you to some of the plugins that make it such a great tool.

I held out on using Grunt in my own workflow for quite a while, but as soon as I tried it out I wished that I had started using it sooner. If you take a look through the [plugins directory](http://gruntjs.com/plugins) on the Grunt website you'll be sure to find a bunch of things that will help to save you time.

What do you think of Grunt? Share your thoughts in the comments.


## Useful Links

* [Grunt Project](http://gruntjs.com/)
* [NPM Registry](https://npmjs.org/)
* [Node.js](http://nodejs.org/)