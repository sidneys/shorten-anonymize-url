# shorten-anonymize-url [![Beta](https://img.shields.io/badge/status-beta-red.svg?style=flat)]() [![npm](https://img.shields.io/npm/v/shorten-anonymize-url.svg?style=flat-square)](https://npmjs.com/package/shorten-anonymize-url) [![dependencies](https://img.shields.io/david/sidneys/shorten-anonymize-url.svg?style=flat-square)](https://npmjs.com/package/shorten-anonymize-url) [![devDependencies](https://img.shields.io/david/dev/sidneys/shorten-anonymize-url.svg?style=flat-square)](https://npmjs.com/package/desktop-dimmer)

------

<p align="center">
  <b>Shorten and anonymize (<a href="https://en.wikipedia.org/wiki/URL_redirection#Removing_referer_information">derefer</a>)</b> URLs at the same time.<br>
   Supports Commandline and programmatic usage.<br><br>
  Enables <b>right-click URL shortening</b> on macOS via <a href="https://en.wikipedia.org/wiki/List_of_macOS_components#Automator">Automator</a></b>.<br>
  Includes a macOS Automator <a href="https://thenextweb.com/lifehacks/2011/06/07/how-to-create-mac-os-x-services-with-automator/">Service Workflow</a> and (un-)installation routines.<br><br>
  Uses <a href="https://goo.gl">goo.gl</a> and <a href="https://anonym2.com">anonym2</a> under the hood.<br>
  Available for macOS, Windows and Linux.
</p>

------


## Contents

1. [Commandline Use](#commandline_use)
1. ['Right-Click' URL Shortener (macOS)](#right-click_url_shortener_(macos))
1. [Programmatic Use](#programmatic_use)
1. [Platform Support](#platform_support)
1. [Roadmap](#roadmap)
1. [Contribute](#contribute)
1. [Author](#author)


## <a name="commandline_use"/></a> Commandline Use

### Installation

```bash
$ npm install --global shorten-anonymize-url
```

### Use

```bash
$ shorten-anonymize-url <url>
```

### Show all Options

```bash
$ shorten-anonymize-url --help
```

### Example

```bash
$ shorten-anonymize-url www.google.com
>> http://anonym2.com/?https://goo.gl/fbsS
```


## <a name="right-click_url_shortener_(macos)"/></a> Right-Click URL Shortener (macOS only)

![screenshot-macos](./resources/screenshots/screenshot-macos-1.png)


The module includes a global [Service](https://www.macosxautomation.com/services/) for macOS [Automator](https://en.wikipedia.org/wiki/List_of_macOS_components#Automator), as well as an automated installation and uninstallation routine.

### Features

The global shortener service does the following:

 1. It takes any marked url within macOS,
 1. shortens and anonymizes it,
 1. copies the resulting shortened and anonymized URL to the macOS clipboard.

This enables global url shortening and anonymizing.

### Compatibility

The global nature of macOS Services makes this module available to nearly all macOS apps, such as [Safari](https://www.apple.com/safari/), [Finder](https://en.wikipedia.org/wiki/Finder_(software)), [Google Chrome](https://www.google.de/chrome/browser/desktop/) or [Microsoft Office for Mac](https://products.office.com/en-us/mac/microsoft-office-for-mac).

### Requirements for the macOS Service

Install [the commandline module](#commandline-use).

### Install the macOS Service

Run the commandline module with the **--service-install** argument:

```bash
$ shorten-anonymize-url --service-install
```

### Uninstall the macOS Service

Run the commandline module with the **--service-uninstall** argument:

```bash
$ shorten-anonymize-url --service-uninstall
```

### Use the macOS Service

1. Mark any URL (or any text),
1. right-click,
1. open the 'Services' menu,
1. Click 'shorten-anonymize-url'

The clipboard now contains the shortened and anonymized URL.

## <a name="programmatic_use"/></a> Programmatic Use

### Installation

```bash
$ npm install --save shorten-anonymize-url
```

### API

The module returns a `Function`:

```js
const shortenAnonymizeUrl = require('shorten-anonymize-url')
```

The `Function` returns a `Promise` and takes 2 arguments:

```js
const promise = shortenAnonymizeUrl(url, key)
```

 - **url** *String* - Bundle identifier for the callback function
 - [optional] **apikey** *String* - goo.gl API key

The `Promise` resolves with 1 property:

```js
promise.then((url) => {
    console.log(url);
})
```

 - **url** *String* - **Shortened anonymised url**

### Example

```js
const shortenAnonymizeUrl = require('shorten-anonymize-url')

shortenAnonymizeUrl('www.google.com')
.then((url) => {
    console.log(url);
    // Returns:
    // http://anonym2.com/?https://goo.gl/fbsS
})
.catch((err) => {
    console.error(err);
})
```


## <a name="platform_support"/></a> Platform Support

Tested on macOS Sierra, Windows 10 Anniversary and Ubuntu 17.10.
Global 'Right-Click' url shortening only supported on macOS for now.


## <a name="roadmap"/></a> Roadmap ![img](https://img.shields.io/badge/proposals-welcome-green.svg?style=flat)

- [ ] Global 'Right-Click' URL shortening for Windows
- [ ] Global 'Right-Click' URL shortening for Linux
- [ ] CI-based automated Testing


## <a name="contribute"/></a> Contribute ![Contribute](https://img.shields.io/badge/contributions-wanted-red.svg?style=flat-square)

Read the [contribution documentation](https://github.com/sidneys/shorten-anonymize-url/blob/release/CONTRIBUTING.md) first.

- [Dev Chat](http://gitter.im/sidneys/shorten-anonymize-url): Talk about features and suggestions.
- [Issues](http;//github.com/sidneys/shorten-anonymize-url/issues) File bugs and document issues.


## <a name="author"/></a> Author

[sidneys](http://sidneys.github.io) 2017


