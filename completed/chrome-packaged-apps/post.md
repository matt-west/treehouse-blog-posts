# Creating Packaged Apps for Google Chrome

In this tutorial you are going to use the To-Do application that you created in '[Create Your Own To-Do App with HTML5 and IndexedDB](http://blog.teamtreehouse.com/create-your-own-to-do-app-with-html5-and-indexeddb)'. If you haven't already built this application you might want to work through that blog post first, or alternatively you can download all the code you need to get started [here](https://s3.amazonaws.com/west-treehouse/todo-list-indexeddb.zip).


## What are Packaged Apps?

Packaged apps allow you to build applications using HTML, CSS and JavaScript that run in a browser environment but that have many of the same capabilities as native apps.

Packaged Apps in Chrome can access APIs that allow them to interact with things like USB devices, extending the capabilities of a packaged app far past that of a standard web application. They can also run in an independent, chrome-less window; making them feel a lot more like a native app.


## The App Manifest

The app manifest is used to provide information about your app such as the name, a description about what it does and the icon that should be displayed on the new tab page. This file is also used to declare any permissions that your app might need to run. We're not using any specialised Chrome APIs in our to-do app so we don't need to declare anything.

Create a new file in your project directory called `manifest.json` and add to it the following code.

<pre>
{
  "name": "To-Do List",
  "description": "A simple to-do list application.",
  "version": "0.1",
  "manifest_version": 2,
  "app": {
    "background": {
      "scripts": ["background.js"]
    }
  },
  "icons": {
    "16": "icon-16.png",
    "128": "icon-128.png"
  }
}
</pre>

***
**Note:** For a full explanation of all the permitted fields in the app manifest check out the documentation: [http://developer.chrome.com/apps/manifest.html](http://developer.chrome.com/apps/manifest.html)
***


## Adding the App Icons

Each packaged app can be launched from the new-tab page and therefore will need an icon. For this project I have created two icons for your to-do app that can be downloaded [here](https://s3.amazonaws.com/west-treehouse/to-do-packaged-app-assets.zip).

!!! TODO: Add icon images.

[Download the  project assets](https://s3.amazonaws.com/west-treehouse/to-do-packaged-app-assets.zip) and copy the `icon-16.png` and `icon-128.png` files into your project folder. 


## Updating the Stylesheet

As the packaged app will run in it's own window we need to make a few small changes to the `style.css` file. This will make the app more responsive to different sized windows.

Retrieve the updated `style.css` file from the [project assets](https://s3.amazonaws.com/west-treehouse/to-do-packaged-app-assets.zip) and add it to your project folder, overriding the existing file.


## Creating the Background JavaScript File 

The app window is launched using a background JavaScript file. This file is loaded when the user launches the app.

The background JavaScript file should contain an event listener for the `chrome.app.runtime.onLaunched` event. Inside this event listener you should create a new chrome window that is 500 pixels wide and 650 pixels high and load in the `index.html` file.

Create a file called `background.js` and add to it the following JavaScript code.

<pre>
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    "bounds": {
      "width": 500,
      "height": 650
    }
  });
});
</pre>

If you look back at your `manifest.json` file you will see that `background.js` has been declared in the `app.background.scripts` section as shown below.

<pre>
"app": {
  "background": {
    "scripts": ["background.js"]
  }
},
</pre>


## Testing Your App

You've now completed everything that you need to do to get your to-do app to run as a packaged app in Chrome. To test out your app follow these steps.

* Open the Extensions page: `Tools` > `Extensions`.
* Make sure that the `Developer Mode` checkbox is ticked.
* Click `Load unpacked extension...`
* Select the folder containing your to-do app.
* You're done!

Now you should see that your app has been added to the list of extensions. If you open a new tab and click the to-do app icon, a new window should appear containing the to-do list app.

Try adding a few items and then closing the app. If you then open it back up again you should see that all of your to-do items have survived the restart. They are being stored in IndexedDB, just like before.


## Final Thoughts

In this blog post you have learned the basics of how to create a packaged app by adapting the to-do list application that you had previously built.

I'm really excited about the possibilities that are opened up packaged apps. Gaining access to the new advanced APIs in Chrome allows developers to build a whole new ecosystem of in-browser apps that can interact more closely with device hardware.

If you are interested in learning more about packaged apps I recommend that you check out the Packaged Apps documentation at [developer.chrome.com/apps/](http://developer.chrome.com/apps/about_apps.html).

As always, I'd love to hear your thoughts about packaged apps for Chrome and how you might use them in your projects.


