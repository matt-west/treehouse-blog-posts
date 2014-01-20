With the rise in popularity of mobile web apps there’s been a big push to develop device APIs that allow web developers to reach out of the browser and access the underlying device hardware. We’ve seen the introduction of getUserMedia, allowing you to access the device camera; the device orientation API, enabling the development of interactive gaming experiences; and the touch events API.

In this post you’re going to learn about the Battery Status API. Another member in the family of device APIs that are helping to expand the capabilities of mobile web apps.


## The BatteryManager Object

The Battery Status API allows you to access information about the device battery, including it’s charging status and current power level. This information is exposed through the `BatteryManager` object.

The `BatteryManager` object can be accessed on the global `navigator` object. 

```
var battery = navigator.battery || navigator.mozBattery;
```

Older versions of Firefox used the vendor-prefixed name `mozBattery`. The prefix was dropped in Firefox 16.


## BatteryManager Properties

The `BatteryManager` object includes a number of _read only_ properties that can be used to acquire information about the device’s power status. 

### Charging Status

The `charging` property is a boolean (`true` / `false`) value indicating whether the battery is currently charging or not.

```
navigator.battery.charging;
```

### Charging Time

The `chargingTime` property represents the time in seconds until the battery is fully charged.

```
navigator.battery.chargingTime;
```

### Discharging Time

The `dischargingTime` property represents the time in seconds until the battery is completely discharged and the system is suspended.

```
navigator.battery.dischargingTime;
```

### Battery Level

The `level` property indicates the level of charge in the battery, represented as a number between 0 and 1.

```
navigator.battery.level;
```


## BatteryManager Events

As well as these four properties, the `BatteryManager` also defines a number of events that can be used to monitor changes in battery status.

### Changes in Charging State

Changes to the `charging` property can be monitored by listening for the `chargingchange` event. This will be fired whenever the charging state changes. For example, when the power cord is plugged in, or the battery is full.

```
navigator.battery.onchargingchange = function(event) {
    // A change in charging state occurred.
};
```

### Changes in Charging Time

The `chargingtimechange` event can be used to listen for changes in the `chargingtime` property.

```
navigator.battery.onchargingtimechange = function(event) {
    // The charging time was updated.
};
```

### Changes in Discharging Time

The `dischargingtimechange` event is fired when the `dischargingtime` property is updated.

```
navigator.battery.ondischargingtimechange = function(event) {
    // The discharging time was updated.
};
```

### Changes in Battery Level

The `levelchange` event is used to track changes to the level of charge in the battery.

```
navigator.battery.onlevelchange = function(event) {
    // The battery level changed.
}
```


## Browser Support for the Battery Status API

The Battery Status API is currently supported in Firefox 11+ (16+ for the the unprefixed API).

The API was previously implemented in Chromium but has since been removed after lengthy [discussions](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/fzoG6Phr09k) around the [specification](http://www.w3.org/TR/battery-status/) and potential use cases.

An [intent to implement](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/fzoG6Phr09k) was recently posted in the blink-dev discussion group, but there’s no indication of when (or if) this will make it into Blink.

As this API interacts with the underlying device hardware it’s not possible to create a polyfill which adds this functionality to other browsers.


## The Battery Status API in Action

!!! Image of Battery Monitor App

I’ve put together a simple demo app to show how you can use the events and properties of the `BatteryManager` object to create a battery monitor. Explore the source code on [codepen](http://codepen.io/matt-west/pen/vIwra) to see how it works.

<a class="button orange" href="http://codepen.io/matt-west/full/vIwra" target="_blank">See the Demo</a> <a class="button" href="http://codepen.io/matt-west/pen/vIwra" target="_blank">View on CodePen</a> <a class="button" href="http://codepen.io/matt-west/share/zip/vIwra" target="_blank">Download the Code</a>


## Summary

In this post you’ve learned how to use the Battery Status API to monitor a device’s power usage. Having access to this information allows you to build applications that can adapt based on different power conditions. For example, you may choose not to run battery-intensive animations if the device isn’t plugged into a power source, or the battery is low.

Despite the somewhat troubled past this API has had in Chromium, I’m confident that we’ll see it reach more browsers in the future. Until then you can still use this API to progressively enhance the functionality of your web apps in Firefox.

What are your thoughts about the Battery Status API? Are you glad to see more device APIs being implemented, or is this something you’re not that bothered about?


## Further Reading

* [Battery Status API Spec (W3C)](http://www.w3.org/TR/battery-status/)
* [MDN: BatteryManager Docs](https://developer.mozilla.org/en-US/docs/Web/API/BatteryManager)
