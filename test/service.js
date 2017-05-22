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
const chai = require('chai');
const chaiFs = require('chai-fs');
const mocha = require('mocha');

/**
 * Modules
 * Configuration
 */
appRootPath.setPath(path.join(__dirname, '..'));
chai.use(chaiFs);
const describe = mocha.describe;
const expect = chai.expect;
const it = mocha.it;

/**
 * Modules
 * Internal
 * @constant
 */
const packageJson = require(path.join(appRootPath.path, 'package.json'));


/**
 * Modules
 * Internal
 * @constant
 */
const service = require('../lib/service');


/**
 * Run tests
 */
describe('installService', () => {
    it('Should install the macOS service', () => {
        const templateFilePath = path.join(appRootPath.path, 'templates', 'macos-service.workflow');
        const targetFilePath = path.join(os.homedir(), 'Library', 'Services', `${packageJson.name}.workflow`);

        service.install();

        expect(templateFilePath).to.be.a.directory('ok').and.equal(targetFilePath, 'ok');
    });
});

describe('uninstallService', () => {
    it('Should uninstall the macOS service', () => {
        const targetFilePath = path.join(os.homedir(), 'Library', 'Services', `${packageJson.name}.workflow`);

        service.uninstall();

        expect(targetFilePath).to.not.be.a.path('ok');
    });
});
