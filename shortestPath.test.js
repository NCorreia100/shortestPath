const expect = require('chai').expect;
const shortestPath = require('./shortestPath');

describe('shortestPath', function () {

    it('should return -1 if input is not an array', function () {
        expect(shortestPath()).to.equal(-1);
    });

    it('should return -1 if input doesn\'t contain a 9', function () {
        let arr = [
            [0, 0],
            [0, 0]
        ];
        expect(shortestPath(arr)).to.equal(-1);
    });

    it('should return -1 if path to 9 is blocked', function () {
        let arr = [
            [0, 1],
            [1, 9]
        ];
        expect(shortestPath(arr)).to.equal(-1);
    });

    it('should return 0 if start coordinate contains 9', function () {
        let arr = [
            [9, 1],
            [1, 9]
        ];
        expect(shortestPath(arr)).to.equal(0);
    });

    it('should move in all 4 directions', function () {
        let arr = [
            [0, 1, 9, 0],
            [0, 0, 1, 0],
            [1, 0, 1, 0],
            [1, 0, 0, 0]
        ];
        expect(shortestPath(arr)).to.equal(10);
    });

    it('should start at next coordinate to the right if initial coordinate is an obstacle', function () {
        let arr = [
            [1, 1, 1, 0],
            [0, 0, 1, 0],
            [1, 0, 1, 0],
            [1, 9, 0, 0]
        ];
        expect(shortestPath(arr)).to.equal(5);
    });

    it('should start at next coordinate down if the whole first row contains obstacles', function () {
        let arr = [
            [1, 1, 1, 1],
            [1, 0, 1, 9],
            [1, 0, 1, 0],
            [1, 0, 0, 0]
        ];
        expect(shortestPath(arr)).to.equal(6);
    });
    
    it('should return shortest distance if there are multiple solutions', function () {
        let arr = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 0, 1, 1, 0],
            [0, 1, 0, 9, 0, 0, 0],
            [0, 1, 1, 0, 1, 1, 0],
            [0, 1, 1, 0, 1, 1, 0]
            [0, 0, 0, 0, 0, 0, 0]
        ];
        expect(shortestPath(arr)).to.equal(12);
    });

    it('should process large datasets without causing stackoverflow', function () {
        let arr = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 9, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        expect(shortestPath(arr)).to.equal(98);
    });



});