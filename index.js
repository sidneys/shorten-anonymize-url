#!/usr/bin/env node
'use strict';


/**
 * Modules
 * Node
 * @constant
 */
const path = require('path');

/**
 * Modules
 * External
 * @constant
 */
const appRootPath = require('app-root-path');
const chalk = require('chalk');
const copyPaste = require('copy-paste');
const googl = require('goo.gl');
const minimist = require('minimist');
const say = require('say');

/**
 * Modules
 * Configuration
 */
appRootPath.setPath(__dirname);

/**
 * Modules
 * Internal
 * @constant
 */
const packageJson = require(path.join(appRootPath.path, 'package.json'));


/**
* @constant
*/
const apiKey = 'AIzaSyBF7Btyd-alhCQX27vSUjZYu_HlwjiBHa8';

/**
* @constant
* @default
*/
const urlPrefix = 'http://anonym2.com/?';
const logPrefix = chalk.bold(`[${packageJson.name} v${packageJson.version}]`);
const styleMessage = chalk.bold.cyan;
const styleError = chalk.bold.red;



/**
 * Main
 * @public
 */
let main = () => {
    const argv = minimist(process.argv.slice(2));
    const url = argv._[0];

    if (!url) {
        console.error(logPrefix, styleError(`Error: URL argument required.`));
        process.exit(0);
    }

    // Set API Key
    googl.setKey(apiKey);

    // Shorten
    googl.shorten(url).then((shortUrl) => {
        const anonUrl = `${urlPrefix}${shortUrl}`;
        copyPaste.copy(anonUrl, () => {
          console.log(logPrefix, styleMessage(`Copied to clipboard: ${anonUrl}`));
          say.speak('URL is anonymous.', 'Samantha', 1.0);
        })
    }).catch(function(err) {
        console.error(logPrefix, styleError(`Error: ${err}`));
    });
};


main();