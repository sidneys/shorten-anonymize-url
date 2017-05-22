'use strict';


/**
 * Modules
 * External
 * @constant
 */
const chai = require('chai');
const mocha = require('mocha');

/**
 * Modules
 * Internal
 * @constant
 */
const main = require('../lib/main');


/**
 * @constant
 */
const describe = mocha.describe;
const expect = chai.expect;
const it = mocha.it;


/**
 * Run tests
 */
describe('shortenAnonymizeUrl', () => {
    it('Should return the shortened anonymized url', () => {
        const url = 'www.google.com';

        return main(url).then((shortenedAnonymizedUrl) => {
            expect(shortenedAnonymizedUrl).be.a('string');
        });
    });
});
