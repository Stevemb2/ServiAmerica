const functions = require('./functions');

test('Adds 1 + 2 to equal 3', () => {
    expect(functions.add(1, 2)).toBe(3);
});

