const assert = require('assert');
const { greet, greetIn_Russian } = require('../app.js');
const { test, describe } = require('node:test');


describe('Greet Functions Tests', () => {
    test('greet returns correct greeting in english', () => {
        const actualResult = greet('Raaz');
        const expectedResult = 'Hello, Raaz!';
        assert.strictEqual(actualResult, expectedResult);
    });
    test('greet returns correct greeting in russian', () => {
        const actualResult = greetIn_Russian('Raaz');
        const expectedResult = 'привет, Raaz!';
        assert.strictEqual(actualResult, expectedResult);
    });
})
