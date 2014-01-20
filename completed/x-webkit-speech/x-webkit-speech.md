# Accepting Speech Input in HTML5 Forms

The way that we interact with computers has changed dramatically over the past decade. Touch-screen mobile devices and laptop trackpads have enabled a much more intuitive form of interaction than that achievable using a traditional mouse. These changes haven't been limited to just hardware, the software that runs on our modern-day computing devices has become just as big an enabler of user interactions. Gestures, predictive text, and speech recognition are all examples of software innovations that have improved the way in which we interact with our devices.

Speech recognition has somewhat eluded innovators for decades. Many organisations have tried (with varying levels of success) to create reliable speech recognition technologies that will transform how we interact with devices. There is one company however that looks to have cracked the speech recognition problem - Google.

In this post you’ll be learning how to take advantage of Google’s speech recognition technologies to enhance your web forms. You’ll learn how to give Chrome users the ability to use speech to enter text into `<input>` elements, and how to detect support for this new speech capability in browsers.

Lets get started.


## Enabling Speech Input

Enabling support for speech input is as simple as adding an attribute to your `<input>` elements. The `x-webkit-speech` attribute will indicate to the browser that the user should be given the option to complete this form field using speech input. 

```
<input type="text" x-webkit-speech>
```

When speech input is enabled the element will have a small microphone icon displayed on the right of the input. Clicking on this icon will launch a small dialog to show that your speech is being recorded. You can also launch this dialog by focussing the element and then pressing `Ctrl` + `Shift` + `.` on Windows, or `Command` + `Shift` + `.` on Mac.

!!! Insert Image (or even GIF! muwahahaha)

!!! Demo link.

You can test to see if an element has speech input enabled with JavaScript by examining it’s `webkitSpeech` property. This is a boolean  property and will therefore be set to `true` or `false`.

```
element.webkitSpeech;
```

It’s also possible to enable speech input on an element by setting it’s `webkitSpeech` property to `true`.

### A Caveat About Input Types

Speech input is not available for all of the different HTML5 input types. In my testing I found that the `text`,  `number`, and `tel` types do support speech input but the `email`, `url`, `date`, and `month` input types don’t.

The `datetime` input type does currently display the microphone icon, however I believe this is because Chrome is treating `datetime` inputs as `text` inputs due to it’s lack of support for the `datetime` input type.

If you apply the `x-webkit-speech` attribute to an `<input>` element with an unsupported input type, the `webkitSpeech` property on that element will still be set to `true`. Therefore you cannot rely on this property to tell if the browser is displaying the speech input controls, only that the browser supports speech input in general.


## Detecting Browser Support

A simple way of checking if the user’s browser supports `x-webkit-speech` is to look for the `webkitSpeech` property on an `<input>` element. An example of how to do this is shown below.

```
if (document.createElement('input').webkitSpeech === undefined) {
    // Not supported
} else {
    // Supported!
}
```

Google Chrome is the only browser that currently supports speech input. We’ll examine the reasons for this in the next section.


## How Speech Recognition Works

!!! Insert diagram.

The browser relies on an external service to handle speech-to-text conversion. Your speech input is sent to this service which then analyses the audio and constructs a textual representation. The text is then sent back to the browser which populates the `<input>` element to complete the process. Many speech-to-text services incorporate machine-learning algorithms which make the service more accurate over time.

* * * 

**Note:** A side effect of using an external service to handle speech-to-text is that you will need to have an internet connection for speech input to work. This is something to keep in mind if you plan for your web application to work offline.

* * *

The Chrome browser relies on Google’s proprietary speech recognition service to provide the speech input functionality behind `x-webkit-speech`. Google has had a team working on speech recognition and natural language processing for a long time. It’s this team that’s been responsible for developing the complex systems needed to provide a reliable speech-to-text service for products like Google Translate and Voice Search.

* * *

**Note:** If you're interested in learning more about speech-to-text works check out the [speech recognition papers]() published by Google engineers.

!!! Need link here.

* * *

Developing speech-to-text services is incredibly difficult and requires a significant amount of investment. This is probably the main reason why no other browser vendor has implemented speech recognition yet. Even licensing such a technology would involve a considerable financial investment. However now that Apple has acquired Siri, I’m interested to see if speech recognition will make it’s way into Safari some time soon.


## Summary

In this post you’ve learned how to enable speech input on `<input>` elements. As well as the `x-webkit-speech` attribute, there is a more advanced [Web Speech API](http://updates.html5rocks.com/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API) that we haven’t covered in this post. This API allows developers to add speech recognition functionality to more aspects of their applications, and even synthesize speech from text.

Whether it's the computer on your desk, or the phone in your pocket, software innovations like Google’s Voice Search and Apple’s Siri are paving the way for a revolution in how we interact with computers. Welcome to the future, now if only someone could figure out that teleportation thing.


## Further Reading

* [Speech Input Demo](http://codepen.io/matt-west/pen/wbpqu)
* [Voice Driven Web Apps: Introduction to the Web Speech API](http://updates.html5rocks.com/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API)