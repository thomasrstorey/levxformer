var expect = require('chai').expect,
    levxformer = require('../levxformer.js'),
    cases = [{
            args: ['Saturday', 'Sunday'], 
            expected: {
                distance: 3,
                matrix: [[0, 1, 2, 3, 4, 5, 6, 7, 8],
                         [1, 0, 1, 2, 3, 4, 5, 6, 7],
                         [2, 1, 1, 2, 2, 3, 4, 5, 6],
                         [3, 2, 2, 2, 3, 3, 4, 5, 6],
                         [4, 3, 3, 3, 3, 4, 3, 4, 5],
                         [5, 4, 3, 4, 4, 4, 4, 3, 4],
                         [6, 5, 4, 4, 5, 5, 5, 4, 3]],
               getState: function (i) {
                   var steps = ['Sunday', 'Saunday', 'Satunday', 'Saturday'];
                   return steps[i];
               }
            }
        }, {
            args: ['kitten', 'sitting'],
            expected: {
                distance: 3,
                matrix: [[0, 1, 2, 3, 4, 5, 6],
                         [1, 1, 2, 3, 4, 5, 6],
                         [2, 2, 1, 2, 3, 4, 5],
                         [3, 3, 2, 1, 2, 3, 4],
                         [4, 4, 3, 2, 1, 2, 3],
                         [5, 5, 4, 3, 2, 2, 3],
                         [6, 6, 5, 4, 3, 3, 2],
                         [7, 7, 6, 5, 4, 4, 3]],
               getState: function () {}
            }
        }, {
            args: ['book', 'back'],
            expected: {
                distance: 2,
                matrix: [[0, 1, 2, 3, 4],
                         [1, 0, 1, 2, 3],
                         [2, 1, 1, 2, 3],
                         [3, 2, 2, 2, 3],
                         [4, 3, 3, 3, 2]],
                getState: function () {}
            }
        }, {
            args: ['dmitri', 'alexei'],
            expected: {
                distance: 5,
                matrix: [[0, 1, 2, 3, 4, 5, 6],
                         [1, 1, 2, 3, 4, 5, 6],
                         [2, 2, 2, 3, 4, 5, 6],
                         [3, 3, 3, 3, 4, 5, 6],
                         [4, 4, 4, 4, 4, 5, 6],
                         [5, 5, 5, 5, 5, 5, 6],
                         [6, 6, 6, 5, 6, 6, 5]],
               getState: function () {}
            }
        },
    ];

describe('levxformer,', function () {
    
    it('is callable', function () {
        expect(levxformer).to.be.a('function');
    });

    describe('when called with two strings as arguments,', function () {
        
        it('returns an object', function () {
            cases.forEach(function (c) {
                var out = levxformer.apply(null, c.args);
                expect(out).to.be.a(typeof c.expected);
            });
        });
        
        describe('the output object,', function () {
            it('has a `matrix` property', function () {
                cases.forEach(function (c) {
                    var out = levxformer.apply(null, c.args);
                    expect(out.matrix).to.exist;
                });
            });
            
            it('has a `distance` property', function () {
                cases.forEach(function (c) {
                    var out = levxformer.apply(null, c.args);
                    expect(out.distance).to.exist;
                });
            });
            
            it('has a `getState` property', function () {
                cases.forEach(function (c) {
                    var out = levxformer.apply(null, c.args);
                    expect(out.getState).to.exist;
                });
            });
        });

        describe('the output distance property,', function () {
            it('is a number', function () {
                cases.forEach(function (c) {
                    var out = levxformer.apply(null, c.args);
                    expect(out.distance).to.be.a(typeof c.expected.distance);
                });
            });
            it('is equal to the Levenshtein distance between the two strings.', function () {
                cases.forEach(function (c) {
                    var out = levxformer.apply(null, c.args);
                    expect(out.distance).to.equal(c.expected.distance);
                });
            });
        });

        describe('the output matrix property,', function () {
            it('is a 2D array with dimensions m+1 * n+1 (where m and n are the lengths of the input strings.)', function () {
                cases.forEach(function (c) {
                    var out = levxformer.apply(null, c.args);
                    expect(out.matrix.length).to.equal(c.args[1].length + 1);
                    expect(out.matrix[0].length).to.equal(c.args[0].length + 1);
                });
            });
            describe('each of its values i, j,', function () {
                cases.forEach(function (c) {
                    var out = levxformer.apply(null, c.args);

                    for (var j = 0; j <= c.args[0].length; j++){
                        for (var i = 0; i <= c.args[1].length; i++){
                            (function (i, j){
                                it(i + ', ' + j +' is the Levenshtein distance between prefixes ' 
                                + c.args[1].slice(0, j) + ' and ' 
                                + c.args[0].slice(0, i), function () {
                                    expect(out.matrix[i][j]).to.equal(c.expected.matrix[i][j]);
                                });
                            })(i, j);
                        }
                    }
                })
            });
        });

        describe('the output getState property,', function () {
            it('is a function', function () {
                cases.forEach(function (c) {
                    var out = levxformer.apply(null, c.args);
                    expect(out.getState).to.be.a('function');
                });
            });
            it('returns the intermediate state of the string at the provided '
            +  'step number argument s, where 0<=s<=d where d is the distance '
            +  'between the two strings.', function () {
                cases.forEach(function (c) {
                    var out = levxformer.apply(null, c.args);
                    for (var i = 0; i <= out.distance; i++){
                        expect(out.getState(i)).to.equal(c.expected.getState(i));
                    }
                });
            });
        });
    });
});