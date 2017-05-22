'use strict';


/**
 * Modules
 * Node
 * @constant
 */
const os = require('os');
const fs = require('fs-extra');
const path = require('path');

/**
 * Modules
 * External
 * @constant
 */
const appRootPath = require('app-root-path');
const chalk = require('chalk');
const replace = require('replace');

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
 * @constant
 * @default
 */
const messagePrefix = chalk['bold']['cyan'](`[${packageJson.name}]`);
const errorPrefix = chalk['bold']['red'](`[${packageJson.name}]`);


/**
 * Template name
 * @constant
 * @default
 */
const templateName = 'macos-service';

/**
 * Default template/target filenames
 * @constant
 * @default
 */
const templateFileName = `${templateName}.workflow`;
const targetFileName = `${packageJson.name}.workflow`;

/**
 * Template/target directories
 * @constant
 */
const templatesDirectory = path.join(appRootPath.path, 'templates');
const servicesDirectory = path.join(os.homedir(), 'Library', 'Services');


/**
 * Absolute template/target filepaths
 * @constant
 */
const templateFilePath = path.join(templatesDirectory, templateFileName);
const targetFilePath = path.join(servicesDirectory, targetFileName);


/**
 * Template text strings
 * @constant
 * @default
 */
const templateStringMap = {
    __SCRIPT_FILEPATH__: path.join(appRootPath.path, packageJson.bin[packageJson.name]),
    __SCRIPT_NAME__: `${packageJson.name}`,
    __SCRIPT_NOTIFICATION__: `URL copied to Clipboard`,
    __SCRIPT_VERSION__: packageJson.version
};


/**
 * Install Service
 * @returns {Boolean} Result
 *
 * @public
 */
let installService = () => {
    //console.log(messagePrefix, 'installService');

    const exists = fs.pathExistsSync(targetFilePath);
    if (exists) {
        console.log(errorPrefix, `${templateName} already installed, overwriting`);
        console.log(errorPrefix, targetFilePath);
    }

    let installed;
    try {
        // Copy source files to target location
        fs.copySync(templateFilePath, targetFilePath, { overwrite: true });

        // Replace template strings at target location
        Object.keys(templateStringMap).forEach((template) => {
            replace({
                regex: template,
                replacement: templateStringMap[template],
                paths: [targetFilePath],
                recursive: true,
                silent: true
            });

            // DEBUG
            // console.log(messagePrefix, `template strings:`, template);
        });

        console.log(messagePrefix, `${templateName} installed`);
        console.log(messagePrefix, targetFilePath);

        installed = true;
    } catch (err) {
        console.log(errorPrefix, err.message);

        installed = false;
    } finally {
        return installed;
    }
};

/**
 * Uninstall Service
 * @returns {Boolean} Result
 *
 * @public
 */
let uninstallService = () => {
    //console.log(messagePrefix, 'uninstallService');

    const exists = fs.pathExistsSync(targetFilePath);
    if (!exists) {
        console.log(messagePrefix, `${templateName} not installed`);
        return;
    }

    let installed;
    try {
        // Remove target filesystem location
        fs.removeSync(targetFilePath);

        console.log(messagePrefix, `${templateName} removed`);
        console.log(messagePrefix, targetFilePath);

        installed = false;
    } catch (err) {
        console.log(errorPrefix, err.message);

        installed = true;
    } finally {
        return !installed;
    }
};


/**
 * @exports
 */
module.exports = {
    install: installService,
    uninstall: uninstallService
};
