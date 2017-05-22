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
const googl = require('goo.gl');
const minimist = require('minimist');

/**
 * Modules
 * Configuration
 */
appRootPath.setPath(path.join(__dirname, '..'));

/**
 * Modules
 * Internal
 * @constant
 */
const packageJson = require(path.join(appRootPath.path, 'package.json'));
const messages = require(path.join(appRootPath.path, 'lib', 'messages'));
const serviceInstall = require(path.join(appRootPath.path, 'lib', 'service-install'));


/**
 * goo.gl API Key
 * @constant
 */
const defaultKey = process.env['GOOGL_KEY'] || 'AIzaSyDdReujz-9qrhURv49ECQNEM_HyXTn1kWA';

/**
 * Dereferer URL prefix
 * @constant
 */
const urlAnonymizerPrefix = 'https://anonym.to/?';

/**
 * Log prefix
 * @constant
 */
const messagePrefix = chalk['bold']['cyan'](`[${packageJson.name}]`);
const errorPrefix = chalk['bold']['red'](`[${packageJson.name}]`);


/**
 * Shorten and anonymize urls
 * @param {String} inputUrl - Long URL
 * @param {String=} key - goog.l API key
 * @returns {Promise} Shortened and anonymized URL
 */
let shortenAnonymizeUrl = (inputUrl, key = defaultKey) => {
    // Convert input to String
    inputUrl = inputUrl.toString();

    // Trim whitespace, newlines
    inputUrl = inputUrl.trim();

    // Remove all words after the first
    inputUrl = inputUrl.split(/\s/)[0];

    return new Promise((resolve, reject) => {
        // Apply API Key (goo.gl)
        googl.setKey(key);
        googl.shorten(inputUrl)
            .then((shortUrl) => {
                resolve(`${urlAnonymizerPrefix}${shortUrl}`);
            })
            .catch((err) => {
                reject(err);
            });
    });
};


/**
 * Commandline interface
 */
if (require.main === module) {
    // Parse arguments
    const argv = minimist(process.argv.slice(2), {
        'boolean': ['help', 'version', 'install', 'uninstall']
    });

    const argvHelp = argv['help'];
    const argvVersion = argv['version'];
    const argvUrl = argv._[0];
    const argvKey = argv['key'];
    const argvInstall = argv['install'];
    const argvUninstall = argv['uninstall'];

    // DEBUG
    //console.log('argv', argv);

    // Help
    if (argvHelp) {
        messages.help();
        process.exit(0);
    }

    // Version
    if (argvVersion) {
        console.log(messagePrefix, `v${packageJson.version}`);
        process.exit(0);
    }

    // Service Install
    if (argvInstall) {
        const result = serviceInstall.install();
        process.exit(result === true ? 0 : 1);
    }

    // Service Uninstall
    if (argvUninstall) {
        const result = serviceInstall.install();
        process.exit(result === true ? 0 : 1);
    }

    // Set input URL
    if (!argvUrl) {
        console.log(errorPrefix, 'URL argument required.');
        process.exit(1);
    }

    // Set API Key (goo.gl)
    const key = argvKey || defaultKey;

    if (!key) {
        console.log(errorPrefix, 'API Key (goo.gl) required.');
        process.exit(1);
    }

    // Run
    shortenAnonymizeUrl(argvUrl, key)
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err.message);
        });
}


/**
 * @exports
 */
module.exports = shortenAnonymizeUrl;
