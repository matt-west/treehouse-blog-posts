# Getting Started with the FileSystem API

In recent years we have seen the introduction of a whole new set of APIs that aim to give developers the power to store data on a user's machine. In this blog post you are going to learn how to use the FileSystem API. This API gives developers the ability to create a virtual filesystem on the user's machine that they can then use for storing files.

By the end of this blog post you will have created a simple HTML5 text editor that allows you to create, read and edit files that are stored in the app's filesystem.

Lets get going!


## Key Concepts and Restrictions

Before we dive into looking at some code I first want to cover a few of the key concepts and restrictions that you need to keep in mind when using the FileSystem API.

### Asynchronous vs Synchronous

There are two versions of the FileSystem API. One for *synchronous* calls and another for *asynchronous* calls. In this blog post I am going to be focusing on the asynchronous version of the API. Whilst it is sometimes useful to have the ability to execute operations synchronously, you will usually want to use the asynchronous API so that you don't hold up any other code that needs to be executed or cause the UI to hang.



### Storage Types and Quotas

There are two types of filesystems that you can request from the browser: *temporary* or *persistent*.

Data stored in a **temporary** filesystem may be deleted by the browser to free up space for another application. The advantage of using a temporary filesystem is that it is automatically granted by the browser, the user does not have to explicitly allow the browser to store data on their machine. Temporary storage is great for storing non-essential app data or for things like caching assets.

Data stored in a **persistent** filesystem is held in the browser until the user deletes it. You should use persistent storage if you plan to store data that is essential to your app. The slight downside of using a persistent filesystem is that the user has to grant you permission to store data. When your app first requests a filesystem a banner will be displayed asking for permission. Once the user has granted permission they will not be shown the banner again unless you request more space for storing data.

For more information on offline storage check out this whitepaper by Google:  
[Managing HTML5 Offline Storage](https://developers.google.com/chrome/whitepapers/storage)

Filesystems using temporary storage are given a fixed amount of space to store data. This is known as the *quota*. Persistent filesystems however can request a bigger quota if needed. In Chrome this is done using the [Quota Management API](https://developers.google.com/chrome/whitepapers/storage#managing_quota). We will look at an example of how to request more storage later in this post.

### Handling Errors

Many of the methods provided by the FileSystem API support an error callback. Whilst this is technically optional, you will want to include an error handler so that you can debug your application if something goes wrong.

Here is an example of a simple error handler. We will be using this in our project that's coming up soon.

<pre>
function errorHandler(error) {
  var message = '';

  switch (error.code) {
    case FileError.SECURITY_ERR:
      message = 'Security Error';
      break;
    case FileError.NOT_FOUND_ERR:
      message = 'Not Found Error';
      break;
    case FileError.QUOTA_EXCEEDED_ERR:
      message = 'Quota Exceeded Error';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      message = 'Invalid Modification Error';
      break;
    case FileError.INVALID_STATE_ERR:
      message = 'Invalid State Error';
      break;
    default:
      message = 'Unknown Error';
      break;
  }

  console.log(message);
}
</pre>


### Sandboxing

Your app's filesystem is *sandboxed*. This means that you can only access files that exist within your app's designated filesystem. The files in your app's filesystem are also protected from being accessed by any other applications. This is an important security feature.

***
**Note**: A common misconception about the FileSystem API is that it can be used to access any file on the user's hard drive. There are a number of reasons why this is not possible, but it ultimately comes down to security.
***

### Same-Origin Policy

Each sandboxed filesystem is linked to a specific origin. An origin is the combination of the protocol, domain and port.

You cannot access filesystems that belong to a different origin.

### Apps must be served over HTTP or HTTPS

If you want to use the FileSystem API you must server you application using `http://` or `https://`. Apps served using `file://` do not have access to the API.

### No Executable Files

For security purposes you cannot create executable files within the filesystem.


## Browser Support

Support for the FileSystem API is currently restricted to Google Chrome, and more recently Opera. Both of these browsers current use the `webkit` prefix. A [specification](http://www.w3.org/TR/file-system-api/) for the FileSystem API has been submitted to the W3C.

| IE   | Firefox | Chrome | Safari | Opera  |
| :--: | :-----: | :----: | :----: | :----: |
| -    | -       | 13.0+  | -      | 15.0+  |

Source: [Can I use - FileSystem API](http://caniuse.com/filesystem)

***
**Note**: Google Chrome originally introduced partial support for the FileSystem API in version 8.0.
***

### How To Detect Browser Support

A simple way of detecting support for the FileSystem API is to look for the `requestFileSystem` method on the `window` object. Keep in mind that the API is currently prefixed in Chrome and Opera.

<pre>
// Handle vendor prefixes.
window.requestFileSystem = window.requestFileSystem || 
                           window.webkitRequestFileSystem;

// Check for support.
if (window.requestFileSystem) {
  // FileSystem Supported :)
} else {
  // FileSystem Not Supported :(
}
</pre>

## Requesting a File System

* `type`
* `size`
* `successCallback`
* `errorCallback` (optional)

<pre>
// requestFileSystem is prefixed in Google Chrome and Opera.
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

window.requestFileSystem(type, size, successCallback, errorCallback);
</pre>

### Managing Your Storage Quota

* `type`
* `size`
* `successCallback`
* `errorCallback`

Temporary / Persistent Storage

* `navigator.webkitTemporaryStorage`
* `navigator.webkitPersistentStorage`

<pre>
navigator.webkitPersistentStorage.requestQuota(
  1024 * 1024 * 10,
  function(grantedSize) {

    // Request a file system with the new size.
    window.requestFileSystem(window.PERSISTENT, grantedSize, function(filesystem) {
      
      // Do something with your new (larger) filesystem

    }, errorHandler);

  }, function(error) {
    console.log('Error', error);
  }
);
</pre>


## Managing Files

Okay, so now that you've got an understanding of some of the key concepts and restrictions that govern the FileSystem API it's time to dive into the technical stuff.

In this section you are going to learn all about how to create, read, edit and delete files.

### The FileEntry Interface

#### Properties

* `isFile` (boolean)
* `name` (string)
* `fullPath` (string)

#### Methods

* `getMetadata(successCallback, errorCallback)`
* `remove(successCallback, errorCallback)`
* `moveTo(dirEntry, newName, successCallback, errorCallback)`
* `copyTo(dirEntry, newName, successCallback, errorCallback)`
* `getParent(successCallback, errorCallback)`
* `toURL(mimeType)`
* `file(successCallback, errorCallback)`
* `createWriter(successCallback, errorCallback)`

### Creating Files

<pre>
function onInitFileSystem(filesystem) {
  filesystem.root.getFile('treehouse.txt', { create: true, exclusive: true },
    function(fileEntry) {

      // Do something with your new file.

    }, errorHandler);
}

window.requestFileSystem(window.TEMPORARY, 1024 * 1024, onInitFileSystem,
  errorHandler);
</pre>


### Reading Files

<pre>
filesystem.root.getFile('treehouse.txt', {}, function(fileEntry) {

  fileEntry.file(function(file) {
    var reader = new FileReader();

    reader.onload = function(e) {
      var viewerElement = document.createElement('pre');
      viewerElement.innerHTML = this.result;
      document.body.appendChild(viewerElement);
    };

    reader.readAsText(file);
  }, errorHandler);

}, errorHandler);
</pre>


### Writing to Files

<pre>
filesystem.root.getFile('treehouse.txt', {create: true}, function(fileEntry) {

  fileEntry.createWriter(function(fileWriter) {

    fileWriter.onwriteend = function(e) {
      console.log('Write completed!');
    };

    fileWriter.onerror = function(e) {
      console.log('Write error: ' + e.toString());
    };

    var contentBlob = new Blob(['Treehouse rocks!'], {type: 'text/plain'});

    fileWriter.write(contentBlob);

  }, errorHandler);

}, errorHandler);
</pre>


### Deleting Files

<pre>
filesystem.root.getFile('treehouse.txt', {create: false}, function(fileEntry) {

  fileEntry.remove(function(e) {
    console.log('File deleted');
  }, errorHandler);

}, errorHandler);
</pre>


### Adding Files From The Desktop

<pre>
&lt;input type=&quot;file&quot; id=&quot;filePicker&quot; multiple&gt;
</pre>

<pre>
// Listen for the change event that is fired when the user finishes selecting
// files from the desktop.
document.getElementById('filePicker').addEventListener('change', function(e) {
  // Get the selected files.
  var files = this.files;

  // Request the file system.
  window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(filesystem) {
    // Copy each of the files to the filesystem.
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      // Create a new file in the app filesystem.
      filesystem.root.getFile(file.name, {create: true, exclusive: true},
        function(fileEntry) {

          // Create a file writer.
          fileEntry.createWriter(function(fileWriter) {

            // Write the contents of the selected file to the file in the app
            // filesystem.
            fileWriter.write(file);

          }, errorHandler);

        }, errorHandler);

    }

  }, errorHandler);

});
</pre>


### Copying Files

<pre>
function copy(workingDirectory, source, destination) {
  workingDirectory.getFile(source, {}, function(fileEntry) {

    workingDirectory.getDirectory(destination, {}, function(dirEntry) {
      fileEntry.copyTo(dirEntry);
    }, errorHandler);

  }, errorHandler);
}

window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(filesystem) {
  copy(filesystem.root, '/folder1/treehouse.txt', 'folder2/');
}, errorHandler);
</pre>


### Renaming Files

<pre>
function rename(workingDirectory, source, newName) {
  workingDirectory.getFile(source, {}, function(fileEntry) {

    fileEntry.moveTo(workingDirectory, newName);

  }, errorHandler);
}

window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(filesystem) {
  rename(filesystem.root, 'treehouse.txt', 'mikethefrog.txt');
}, errorHandler);
</pre>


### Moving Files

<pre>
function move(source, directoryName) {
  filesystem.root.getFile(source, {}, function(fileEntry) {

    filesystem.root.getDirectory(directoryName, {}, function(dirEntry) {
      fileEntry.moveTo(dirEntry);
    }, errorHandler);

  }, errorHandler);
}

window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(filesystem) {
  move(filesystem.root, '/treehouse.txt', 'folder/');
}, errorHandler);
</pre>


## Managing Directories

### The DirectoryEntry Interface

#### Properties

* `isDirectory` (boolean)
* `name` (string)
* `fullPath` (string)

#### Methods

* `createReader()`
* `getFile(path, options, successCallback, errorCallback)`
* `getDirectory(path, options, successCallback, errorCallback)`
* `removeRecursively(successCallback, errorCallback)`

These methods are also available on the `FileEntry` interface.

* `getMetadata(successCallback, errorCallback)`
* `remove(successCallback, errorCallback)`
* `moveTo(dirEntry, newName, successCallback, errorCallback)`
* `copyTo(dirEntry, newName, successCallback, errorCallback)`
* `getParent(successCallback, errorCallback)`



### Creating Directories

<pre>
window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(filesystem) {

  filesystem.root.getDirectory('videos', {create: true}, function(dirEntry) {
    // Do something with your new directory.
  }, errorHandler);

}, errorHandler);
</pre>


### Listing The Files in a Directory

<pre>
function toArray(list) {
  return Array.prototype.slice.call(list || [], 0);
}

function listEntries(entries) {
  var list = document.getElementById('fileList');

  entries.forEach(function(entry, i) {
    var li = document.createElement('li');
    li.innerHTML = entry.name;
    list.appendChild(li);
  });
}

function onInitFileSystem(filesystem) {

  var dirReader = filesystem.root.createReader();
  var entries = [];

  var readEntries = function() {

    dirReader.readEntries(function(results) {

      if (!results.length) {
        listEntries(entries.sort().reverse());
      } else {
        entries = entries.concat(toArray(results));
        readEntries();
      }

    }, errorHandler);

  };

  readEntries();

}

window.requestFileSystem(window.TEMPORARY, 1024 * 1024, onInitFileSystem,
  errorHandler);
</pre>


### Deleting Directories

<pre>
filesystem.root.getDirectory('folder/of/things', {}, function(dirEntry) {

  // Remove the directory.
  dirEntry.remove(function(e) {
    console.log('Folder deleted');
  }, errorHandler);

}, errorHandler);
</pre>


### Copying Directories

<pre>
function copy(workingDirectory, source, destination) {
  workingDirectory.getDirectory(source, {}, function(workingDirEntry) {

    workingDirectory.getDirectory(destination, {}, function(dirEntry) {
      workingDirEntry.copyTo(dirEntry);
    }, errorHandler);

  }, errorHandler);
}

window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(filesystem) {
  copy(filesystem.root, '/folder1', 'old/');
}, errorHandler);
</pre>


### Renaming Directories

<pre>
function rename(workingDirectory, source, newName) {
  workingDirectory.getDirectory(source, {}, function(dirEntry) {

    dirEntry.moveTo(workingDirectory, newName);

  }, errorHandler);
}

window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(filesystem) {
  rename(filesystem.root, '/folder', 'newfoldername');
}, errorHandler);
</pre>


### Moving Directories

<pre>
function move(workingDirectory, source, destination) {
  workingDirectory.getDirectory(source, {}, function(sourceDirEntry) {

    workingDirectory.getDirectory(destination, {}, function(destDirEntry) {
      sourceDirEntry.moveTo(destDirEntry);
    }, errorHandler);

  }, errorHandler);
}

window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(filesystem) {
  move(filesystem.root, '/one', '/two');
}, errorHandler);
</pre>


## FileSystem URLs

<pre>
fileEntry.toURL();
</pre>


## Inspecting the FileSystem with Chrome Dev Tools


## Demo

### Setting up the HTML and CSS

<pre>
&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
  &lt;meta charset=&quot;utf-8&quot;&gt;
  &lt;title&gt;FileSystem APIs Demo&lt;/title&gt;

  &lt;link rel=&quot;stylesheet&quot; href=&quot;style.css&quot;&gt;
&lt;/head&gt;
&lt;body&gt;

  &lt;div id=&quot;page-wrapper&quot; class=&quot;clearfix&quot;&gt;
    &lt;h1&gt;A Simple HTML5 Text Editor&lt;/h1&gt;
    &lt;p&gt;Powered by the FileSystem APIs.&lt;/p&gt;

    &lt;form action=&quot;#&quot; method=&quot;POST&quot; id=&quot;file-form&quot;&gt;
      &lt;div class=&quot;field&quot;&gt;
        &lt;input type=&quot;text&quot; name=&quot;filename&quot; id=&quot;filename&quot; placeholder=&quot;Filename (e.g. treehouse.txt)&quot;&gt;
      &lt;/div&gt;
      &lt;div class=&quot;field&quot;&gt;
        &lt;textarea name=&quot;content&quot; id=&quot;content&quot; placeholder=&quot;Type your content here...&quot;&gt;&lt;/textarea&gt;
      &lt;/div&gt;
      &lt;div class=&quot;field&quot;&gt;
        &lt;button type=&quot;submit&quot;&gt;Save File&lt;/button&gt;
        &lt;div id=&quot;messages&quot;&gt;&lt;/div&gt;
      &lt;/div&gt;
    &lt;/form&gt;

    &lt;div id=&quot;files&quot;&gt;
      &lt;h2&gt;File Browser&lt;/h2&gt;
      &lt;ul id=&quot;file-list&quot;&gt;&lt;/ul&gt;
    &lt;/div&gt;

  &lt;/div&gt;

  &lt;script src=&quot;app.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>


### Writing The JavaScript


#### 1. Get References to Key HTML Elements

<pre>
window.onload = function() {

  // Allow for vendor prefixes.
  window.requestFileSystem = window.requestFileSystem ||
                             window.webkitRequestFileSystem;


  // Create a variable that will store a reference to the FileSystem.
  var filesystem = null;

  // Get references to the page elements.
  var form = document.getElementById('file-form');
  var filenameInput = document.getElementById('filename');
  var contentTextArea = document.getElementById('content');
  var fileList = document.getElementById('file-list');
  var messageBox = document.getElementById('messages');


  // The rest of the code goes here...
};
</pre>


#### 2. Create an Error Handler

<pre>
// A simple error handler to be used throughout this demo.
function errorHandler(error) {
  var message = '';

  switch (error.code) {
    case FileError.SECURITY_ERR:
      message = 'Security Error';
      break;
    case FileError.NOT_FOUND_ERR:
      message = 'Not Found Error';
      break;
    case FileError.QUOTA_EXCEEDED_ERR:
      message = 'Quota Exceeded Error';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      message = 'Invalid Modification Error';
      break;
    case FileError.INVALID_STATE_ERR:
      message = 'Invalid State Error';
      break;
    default:
      message = 'Unknown Error';
      break;
  }

  console.log(message);
}
</pre>


#### 3. Request a FileSystem

<pre>
// Request a FileSystem and set the filesystem variable.
function initFileSystem() {
  navigator.webkitPersistentStorage.requestQuota(1024 * 1024,
    function(grantedSize) {

      // Request a file system with the new size.
      window.requestFileSystem(window.PERSISTENT, grantedSize, function(fs) {

        // Set the filesystem variable.
        filesystem = fs;

        // Setup event listeners on the form.
        setupFormEventListener();

        // Update the file browser.
        listFiles();

      }, errorHandler);

    }, function(error) {
      console.log('Error', error);
    }
  );
}

// Start the app by requesting a FileSystem (if the browser supports the API)
if (window.requestFileSystem) {
  initFileSystem();
} else {
  alert('Sorry! Your browser doesn\'t support the FileSystem API :(');
}
</pre>


#### 4. Setup Event Listeners for the Form

<pre>
// Add event listeners on the form.
function setupFormEventListener() {

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get the form data.
    var filename = filenameInput.value;
    var content = contentTextArea.value;

    // Save the file.
    saveFile(filename, content);
  });

}
</pre>


#### 5. Saving Form Data to Files

<pre>
// Save a file in the FileSystem.
function saveFile(filename, content) {
  filesystem.root.getFile(filename, {create: true}, function(fileEntry) {

    fileEntry.createWriter(function(fileWriter) {

      fileWriter.onwriteend = function(e) {
        // Update the file browser.
        listFiles();

        // Clean out the form field.
        filenameInput.value = '';
        contentTextArea.value = '';

        // Show a saved message.
        messageBox.innerHTML = 'File saved!';
      };

      fileWriter.onerror = function(e) {
        console.log('Write error: ' + e.toString());
        alert('An error occurred and your file could not be saved!');
      };

      var contentBlob = new Blob([content], {type: 'text/plain'});

      fileWriter.write(contentBlob);

    }, errorHandler);

  }, errorHandler);
}
</pre>


#### 6. Listing Files in The File Browser

<pre>
function toArray(list) {
  return Array.prototype.slice.call(list || [], 0);
}


function getEntries(entries) {
  // Clear out the current file browser entries.
  fileList.innerHTML = '';

  entries.forEach(function(entry, i) {
    var li = document.createElement('li');
    var link = document.createElement('a');
    link.innerHTML = entry.name;
    link.className = 'edit-file';
    link.setAttribute('data-filename', entry.name);
    li.appendChild(link);
    fileList.appendChild(li);

    // Setup an event listener that will load the file when the link
    // is clicked.
    link.addEventListener('click', function(e) {
      e.preventDefault();
      loadFile(entry.name);
    });
  });
}


function listFiles() {
  var dirReader = filesystem.root.createReader();
  var entries = [];

  var readEntries = function() {
    dirReader.readEntries(function(results) {
      if (!results.length) {
        getEntries(entries.sort().reverse());
      } else {
        entries = entries.concat(toArray(results));
        readEntries();
      }
    }, errorHandler);
  };

  readEntries();
}
</pre>


#### 7. Loading Files From The FileSystem

<pre>
function loadFile(filename) {
  filesystem.root.getFile(filename, {}, function(fileEntry) {

    fileEntry.file(function(file) {
      var reader = new FileReader();

      reader.onload = function(e) {
        // Update the form fields.
        filenameInput.value = filename;
        contentTextArea.value = this.result;
      };

      reader.readAsText(file);
    }, errorHandler);

  }, errorHandler);
}
</pre>

#### 8. You’re Done!


## Offline First

> If you want to make something work offline, it has to be offline first.

[Jake Archibald](https://twitter.com/jaffathecake), Developer Advocate @ Google  
Source: *[The Big Web Show: Episode #95](http://5by5.tv/bigwebshow/95)*

If you're building a web app that you want to work offline you need to start by assuming that your app is offline to begin with. View the internet connection as an add-on that won't always be available.

I know that this is counter to the usual way of doing things but it will really help you to make smarter design decisions. Building web applications that work offline is a whole other ball game. We're used to assuming that the internet connection is always there but with offline applications sometimes it is, sometimes it's not. Strategies for synchronizing data with a server need to be present from the start, not bolted on later.


## Final Thoughts


## Useful Links

* [Can I use: Filesystem & FileWriter API](http://caniuse.com/filesystem)
* [File API: Directories and System Specification (W3C)](http://www.w3.org/TR/file-system-api/)
* [Quota Management API Specification (W3C)](http://www.w3.org/TR/quota-api/)
* [Managing HTML5 Offline Storage](https://developers.google.com/chrome/whitepapers/storage)
* [Exploring the FileSystem APIs (HTML5Rocks)](http://www.html5rocks.com/en/tutorials/file/filesystem/)