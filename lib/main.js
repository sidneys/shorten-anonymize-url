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
const Bitly = require('bitly');
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
const bitlyApikey = process.env['BITLY_KEY'] || '33db7d7468dce517e159c6dd760fa072579c644e';
const googlApikey = process.env['GOOGL_KEY'] || 'AIzaSyDdReujz-9qrhURv49ECQNEM_HyXTn1kWA';

/**
 * Dereferer URL prefix
 * @constant
 */
const urlAnonymizerPrefix = 'https://dereferer.me/?';

/**
 * Log prefix
 * @constant
 */
const messagePrefix = chalk['bold']['cyan'](`[${packageJson.name}]`);
const errorPrefix = chalk['bold']['red'](`[${packageJson.name}]`);


/**
 * Shorten and anonymize urls
 * @param {String} inputUrl - Long URL
 * @param {String=} bitlyKey - bit.ly API key
 * @param {String=} googlKey - goog.l API key
 * @returns {Promise} Shortened and anonymized URL
 */
let shortenAnonymizeUrl = (inputUrl, bitlyKey = bitlyApikey, googlKey = googlApikey) => {
    // Convert input to String
    inputUrl = inputUrl.toString();

    // Trim whitespace, newlines
    inputUrl = inputUrl.trim();

    // Remove all words after the first
    inputUrl = inputUrl.split(/\s/)[0];

    return new Promise((resolve, reject) => {
        // goo.gl
        googl.setKey(googlKey);
        googl.shorten(inputUrl)
            .then((googlUrl) => {
                // derefer
                const dereferencedUrl = `${urlAnonymizerPrefix}${googlUrl}`;
                // bit.ly
                const bitly = new Bitly(bitlyKey);
                bitly.shorten(dereferencedUrl)
                    .then((result) => {
                        const data = result.data;
                        const bitlyUrl = data.url;

                        if (bitlyUrl) {
                            resolve(bitlyUrl);
                        } else {
                            reject(new Error(result.status_txt));
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    });

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
    const argvBitlyKey = argv['key-bitly'];
    const argvGooglKey = argv['key-googl'];
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
        const result = serviceInstall.uninstall();
        process.exit(result === true ? 0 : 1);
    }

    // Set input URL
    if (!argvUrl) {
        messages.help();
        process.exit(1);
    }

    // Set API Key (bit.ly)
    const bitlyKey = argvBitlyKey || bitlyApikey;

    if (!bitlyKey) {
        console.log(errorPrefix, 'bit.ly API Key required');
        process.exit(1);
    }

    // Set API Key (goo.gl)
    const googlKey = argvGooglKey || googlApikey;

    if (!googlKey) {
        console.log(errorPrefix, 'goo.gl API Key required');
        process.exit(1);
    }

    // Run
    shortenAnonymizeUrl(argvUrl, bitlyKey, googlKey)
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.error(err.message);
        });
}


/**
 * @exports
 */
module.exports = shortenAnonymizeUrl;
