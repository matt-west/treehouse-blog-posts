With the introduction of products like Siri and Google Now, speech technology has really taken off in the past few years. Various organisations have been working on speech recognition and synthesis for decades, but it seems like only recently that this technology has become reliable enough to be useful to the masses.

A few weeks ago we looked at [how to add simple speech recognition to your web apps](http://blog.teamtreehouse.com/accepting-speech-input-html5-forms). In this blog post you’re going to turn the tables and learn how to get your web apps talking. To do this you’re going to be learning about the Speech Synthesis API.

***

**Browser Support**: The Speech Synthesis API is supported in Chrome 33+ and Safari. At the time of writing, the stable channel of Chrome is at version 32 so you will need to be running either the [Chrome Dev channel](http://www.chromium.org/getting-involved/dev-channel) or [Chrome Canary](http://www.google.co.uk/intl/en/chrome/browser/canary.html) to see this in action.

***

## Basic Speech Synthesis

The Speech Synthesis API is surprisingly easy to implement. In fact, it only takes two lines of code to get your web app talking to users.

```
var utterance = new SpeechSynthesisUtterance('Hello Treehouse');
window.speechSynthesis.speak(utterance);
```

In this example you start by creating a new instance of `SpeechSynthesisUtterance` and passing in the text that you’d like to be spoken. The second line passes the instance of     `SpeechSynthesisUtterance` to the `speak` method on the `speechSynthesis` interface.

Let’s take a closer look at how the `speechSynthesis` interface works.


## The `speechSynthesis` Interface

In terms of the Speech Synthesis API, the text you that wish to be spoken is contained within an _utterance_ object (`SpeechSynthesisUtterance`). This utterance object also contains information about how the text should be spoken. The `speechSynthesis` interface is responsible for processing this utterance object, placing it in a queue of utterances that need to be synthesised, and controlling the playback of the resulting speech.

The `speechSynthesis` interface (which is available on the `window` object) provides a number of methods that allow you to control speech synthesis in your app. These methods are:

* `speak(SpeechSynthesisUtterance)` - This method should be passed an instance of `SpeechSynthesisUtterance`. It will then add this to the queue of _utterances_ that need to be spoken.
* `cancel()` - This method will remove all utterances from the queue. If an utterance is currently being spoken, it will be stopped.
* `pause()` - This method will immediately pause any utterances that are being spoken.
* `resume()` - This method will cause the browser to resume speaking an utterance that was previously paused.
* `getVoices()` - This method returns a list of all the voices that are supported by the browser. We’ll take a closer look at this later on.

As well as these methods, the `speechSynthesis` interface also includes a number of attributes that can be useful for checking the current state of speech synthesis in the browser.

* `pending` - This attribute will be set to `true` if there are utterances in the queue that have not yet started speaking.
* `speaking` - This attribute will be `true` if an utterance is currently being spoken.
* `paused` - This attribute will be `true` if an utterance is currently paused.

The default value for all of these attributes is `false`.


## Choosing Voices

One of the coolest things about the Speech Synthesis API is that there are a variety of different voices to choose from. Some of these voices are localised to better match the accents of different regions, whereas others just provide you with interesting voices to match the character of your app.

To get a list of voices that are supported by the browser you can use the `speechSynthesis.getVoices()` method. This will return a list of `SpeechSynthesisVoice` objects for you to choose from.

```
var voices = window.speechSynthesis.getVoices();
```

Each of these `SpeechSynthesisVoice`objects has a number of attributes.

* `name` - A human-readable name that describes the voice.
* `voiceURI` - A URI specifying the location of the speech synthesis service for this voice.
* `lang` - The language code for this voice.
* `default` - Set to `true` if this is the default voice used by the browser.
* `localService` - The API can use both local and remote services to handle speech synthesis. If this attribute is set to `true` the speech synthesis for this voice is handled by a local service. If it’s `false` a remote service is being used. This attribute can be useful if you’re building an app that needs to work offline. You could use a remote service when an internet connection is present, and fallback to a local service if a connection is not available.

***

**Note**: The same voices aren’t always available across different browsers. Make sure that you test your app in as many browsers as possible and provide fallback voices where appropriate.

***

To use a voice, set the `voice` property on your `SpeechSynthesisUtterance` instance to the desired `SpeechSynthesisVoice` object. The example below shows how to do this.

```
var utterance = new SpeechSynthesisUtterance('Hello Treehouse');
var voices = window.speechSynthesis.getVoices();

utterance.voice = voices.filter(function(voice) { return voice.name == 'Alex'; })[0];

window.speechSynthesis(utterance);
```

Here we use the standard `filter` method available on arrays to find the object in the `voices` list that has the name ‘Alex’. We then use this object to set the `voice` property on `utterance` (our instance of `SpeechSynthesisUtterance`).


## Setting Up Your SpeechSynthesisUtterance Objects

As well as setting the `voice`, there are a number of other attributes that you can use to define the behaviour of your `SpeechSynthesisUtterance` instances. These control things like the volume, pitch, and rate at which the utterance should be spoken.

The `text` attribute allows you to set the text that you wish to be spoken. This will override any text that was previously passed to the `SpeechSynthesisUtterance` constructor.

```
utterance.text = 'Hello Treehouse';
```

The `lang` attribute gives you the ability to specify the language of the text. This will default to the language of the HTML document.

```
utterance.lang = 'en-US';
```

The `volume` property allows you to adjust the volume of the speech. A _float_ value between 0 and 1 should be specified here. The default is 1.

```
utterance.volume = 1;
```

The `rate` attribute defines the speed at which the text should be spoken. This should be a _float_ value between 0 and 10, the default being 1.

```
utterance.rate = 1;
```

The `pitch` attribute controls how high or low the text is spoken. This should be a _float_ value between 0 and 2, with a value of 1 being the default.

```
utterance.pitch = 1;
```

***

**Note**: The `volume`, `rate`, and `pitch` attributes are not supported by all voices.

***

I’ve put together a demo that allows you to see how these attributes affect the speech output. Have a play with the different voices and controls. I’ll meet you back here in a minute or two.

!!! Insert Demo Image

!!! Insert Demo Links


## Listening for SpeechSynthesisUtterance Events

The last part of the Speech Synthesis API that we’re going to look at today are `SpeechSynthesisUtterance` events. These events allow you to monitor the status of your utterances.

* `onstart` - The `start` event is fired when the utterance has begun to be spoken.
* `onend` - The `end` event is fired once the utterance has been spoken.
* `onerror` - The `error` event is fired if an error occurs that prevents the utterance from being spoken.
* `onpause` -  The `pause` event is fired if the utterance is paused whilst being spoken.
* `onresume` - The `resume` event is fired if a paused utterance resumes being spoken.
* `onboundary` - The `boundary` event is fired whenever a word or sentence boundary is reached while the utterance is being spoken.
* `onmark` - The `mark` event is fired when a ‘mark’ tag is reached in a [Speech Synthesis Markup Language](http://www.w3.org/TR/speech-synthesis/) (SSML) file. We haven’t covered SSML in this post. Just know that it’s possible to pass your speech data to an utterance using an XML-based SSML document. The main advantage of this being that  it makes it easier to manage speech content when building applications that have large amount of text that need to be synthesised.

You can listen out for these events on an instance of `SpeechSynthesisUtterance` by attaching a function to the event or by using the `addEventListener()` method.

```
var utterance = new SpeechSynthesisUtterance('Hello Treehouse');

utterance.onstart = function(event) {
    console.log('The utterance started to be spoken.')
};

window.speechSynthesis(utterance);
```


## Checking for Browser Support

Before we wrap up, lets take a quick look at how you can test to see if a browser supports the Speech Synthesis API. As I mentioned earlier, this feature is currently only available in Chrome 33+ and Safari.

To check for browser support simply look for the `speechSynthesis` interface on the `window` object.

```
if ('speechSynthesis' in window) {
    // You're good to go!
} else {
    // Ah man, speech synthesis isn't supported.
}
```


## Final Thoughts

In this post you’ve learnt how to use the Speech Synthesis API to give a voice to your web applications. I strongly encourage you to [fork the demo on codepen](http://codepen.io/matt-west/pen/wGzuJ) and play around with the code.

As more apps start to adopt speech technology we’re seeing the rise of a more conversational style of interaction between humans and devices. I’m hoping that this will free us from a world where everyone seems to be staring at a screen. Speech recognition and synthesis is a true example of  technology developing to such a level that it can just fade away into the background.

_I couldn’t be more excited about the potential for speech technology on the web, but what are your thoughts? Share your views in the comments below._


## Further Reading

* [W3C Speech API Specification](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#tts-section)
* [W3C Speech Synthesis Markup Language (SSML) Specification](http://www.w3.org/TR/speech-synthesis/)
