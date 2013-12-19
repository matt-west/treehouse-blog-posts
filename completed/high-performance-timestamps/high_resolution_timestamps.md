# High Resolution Timestamps

As the browser has evolved the possibilities of what can be achieved on the web have greatly increased. Technologies like Flash have given way to newcomers like Canvas and WebGL. But as we create more complex applications for the web we also need to be mindful of performance. To provide truly engaging experiences our applications need to run smoothly, which means there’s a lot of testing to do during development.

In this blog post you’re going to learn how to test the performance of your applications using high resolution timestamps.

## Obtaining High Resolution Timestamps

Unlike regular timestamps created with `Date.now()`, a high resolution timestamp is precise to a thousandth of a millisecond. Having this level of precision can be very useful when testing code that needs to run really fast. If you’ve ever developed games or animations you might understand just how useful this can be.

***

**Note**: If you read my previous post on [`requestAnimationFrame`](http://blog.teamtreehouse.com/efficient-animations-with-requestanimationframe) you may remember that all of the code used to draw a single frame needs to be executed within 16.67 milliseconds.

***

To generate a high resolution timestamp ([DOMHighResTimeStamp](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp)) you use the `now` method that is available on the `performance` object.

```
performance.now()

Example result: 5081.6239999985555
```

This `performance` object also includes other data that can be useful for testing, including a `PerformanceTiming` object that is accessible via `performance.timing`.

!!! Insert Screenshot of developer tools

The `PerformanceTiming` object contains a property called [`navigationStart`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming.navigationStart). The value of this property is a regular timestamp that represents when the browser started to load the page. The timestamps in the `PerformanceTiming` object are relative to the [Unix epoch](http://en.wikipedia.org/wiki/Unix_time), however high resolution timestamps are not. Instead these timestamps are measured relative to the value of `performance.timing.navigationStart`.

```
Date.now()				// 1387445119319
performance.now()	// 7865.671999999904
```

***

**Note**: Measuring relative to `navigationStart` is more than adequate for performance testing as your app doesn’t need to know how many milliseconds have passed since the Unix epoch. As longs as all your measurements are taken relative to the same point, the results will be accurate.

***

## Using High Resolution Timestamps

Timing how long it takes for your code to execute is fairly straightforward. You need to create a variable before and after the piece of code you wish to test, and populate those variables with the value returned by `performance.now()`. Subtracting the first variable from the second variable will then give you the amount of time that your code took to execute.

The code below shows a simple example of how to do this.

```
// Take a timestamp at the beginning.
var start = performance.now();

// Execute the code being timed.
doTasks();

// Take a final timestamp.
var end = performance.now();

// Calculate the time taken and output the result in the console
console.log('doTasks took ' + (end - start) + ' milliseconds to execute.');
```

## Browser Support

Browser support for `performance.now()` is reasonably good among modern browsers, with Safari being the only exception. Paul Irish has put together a [polyfill](https://gist.github.com/paulirish/5438650) that imitates the behaviour of `performance.now()`. Be sure to read the comment at the top of the file if you intend to use it in your own projects.

| IE  | Firefox | Chrome | Safari | Opera |
| :-: | :-----: | :----: | :----: | :---: |
| 10+  | 15.0+    | 20.0+   | -   | 15+  |


## Final Thoughts

In this blog post you have learned how to use `performance.now()` to obtain high resolution timestamps, and how these can be used to test the performance of your code.

High resolution timestamps enable a new level of precision when testing the performance of JavaScript code. That’s not to say that regular timestamps are now obsolete. For a lot of applications a regular timestamp will do just fine. However,
for those that work in environments that demand lightning fast code execution this new level of accuracy is incredibly useful.

## Useful Links

* [MDN Documentation for Performance.now()](https://developer.mozilla.org/en-US/docs/Web/API/Performance.now())
* [When milliseconds are not enough: performance.now()](http://updates.html5rocks.com/2012/08/When-milliseconds-are-not-enough-performance-now)
* [High Resolution Time W3C Specification](https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/HighResolutionTime/Overview.html#sec-DOMHighResTimeStamp)
