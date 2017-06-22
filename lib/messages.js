'use strict';


/**
 * Modules
 * Node
 * @constant
 */
const os = require('os');
const path = require('path');

/**
 * Modules
 * External
 * @constant
 */
const appRootPath = require('app-root-path');
const chalk = require('chalk');
const indentString = require('indent-string');
const pad = require('pad');
const wordWrap = require('word-wrap');

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


/**
 * Environment
 * @constant
 */
const isCli = parseInt(process.env['ISCLI']) === 0 ? false : true;

/**
 * @constant
 * @default
 */
const widthIndent = 4;

/**
 * Layout Sizes
 */
let widthTotal = 80;
if (isCli) {
    const windowSize = require('window-size');
    widthTotal = windowSize.width;
}
const widthMax = widthTotal - (widthIndent * 2);
const widthColumn = parseInt(widthTotal / 4);


/**
 * Format table headers
 * @param {String} text - Text
 * @returns {String} Padded Texot
 */
let formatTextHeader = (text) => {
    let header;
    header = `${chalk['bold'](text.toUpperCase())}`;

    return header;
};

/**
 * Format and wrap multi-line text
 * @param {String} text - String
 * @returns {String} Formatted string
 */
let formatTextParagraph = (text) => {
    return `${wordWrap(text, { indent: ' '.repeat(widthIndent), width: widthMax })}${os.EOL}`;
};

/**
 * Format table row
 * @param {String} rowTitle - String
 * @param {String=} rowText - String
 * @returns {String} Formatted string
 */
let formatTableRow = (rowTitle, rowText = '') => {
    let row;

    row = `${indentString(pad(rowTitle, widthColumn, { colors: true }), widthIndent)} ${rowText}${os.EOL}`;

    return row;
};


/**
 * Help
 */
let logHelp = () => {
    console.log(formatTextHeader('name'));
    console.log(formatTextParagraph(`${packageJson.name} v${packageJson.version}`));

    console.log(formatTextHeader('usage'));
    console.log(formatTableRow(`${chalk['bold'](packageJson.name)} [ ${chalk['bold']('--install')} | ${chalk['bold']('--uninstall')} ] [ ${chalk['bold']('--key-bitly')} ${chalk['underline']('key')} ] [ ${chalk['bold']('--key-googl')} ${chalk['underline']('key')} ] ${chalk['underline']('url')}`));

    console.log(formatTextHeader('options'));
    console.log(formatTableRow(`${chalk['underline']('url')}`, `URL to shorten`));

    if (os.platform() === 'darwin') {
        console.log(formatTableRow(`${chalk['bold']('--install')}`, `Install macOS Automator Service`));
        console.log(formatTableRow(`${chalk['bold']('--uninstall')}`, `Uninstall macOS Automator Service`));
    }

    console.log(formatTableRow(`${chalk['bold']('--key-bitly')} ${chalk['underline']('key')}`, `Custom bit.ly API key`));
    console.log(formatTableRow(`${chalk['bold']('--key-googl')} ${chalk['underline']('key')}`, `Custom goo.gl API key`));

    console.log(formatTableRow(`${chalk['bold']('--help')}`, `Show help`));
    console.log(formatTableRow(`${chalk['bold']('--version')}`, `Print version`));
};


/**
 * @exports
 */
module.exports = {
    help: logHelp
};
