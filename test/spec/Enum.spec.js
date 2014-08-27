define(
    function (require) {
        var Enum = require('Enum');

        describe('Enum', function () {
            it('should be a constructor', function () {
                expect(typeof Enum).toBe('function');
            });

            expect('constructor', function () {
                it('should accept no arguments', function () {
                    expect(function () { new Enum(); }).not.toThrow();
                });

                it('should accept multiple enum items', function () {
                    var Simple = new Enum(
                        { text: 'x', alias: 'X' },
                        { text: 'y', alias: 'Y' },
                        { text: 'z', alias: 'Z' }
                    );
                    expect(Simple.X).toBe(0);
                    expect(Simple.Y).toBe(1);
                    expect(Simple.Z).toBe(2);
                    expect(Simple[0]).toBe('X');
                    expect(Simple[1]).toBe('Y');
                    expect(Simple[2]).toBe('Z');
                });

                it('should accept enum items with custom value', function () {
                    var Ordered = new Enum(
                        { text: 'x', alias: 'X', value: 1 },
                        { text: 'y', alias: 'Y', value: 3 },
                        { text: 'z', alias: 'Z', value: 5 }
                    );
                    expect(Ordered.X).toBe(1);
                    expect(Ordered.Y).toBe(3);
                    expect(Ordered.Z).toBe(5);
                    expect(Ordered[1]).toBe('X');
                    expect(Ordered[3]).toBe('Y');
                    expect(Ordered[5]).toBe('Z');
                });

                it('should throw if text is not given', function () {
                    expect(function () { new Enum({ alias: 'X' }); }).toThrow();
                });

                it('should throw if alias is not given', function () {
                    expect(function () { new Enum({ text: 'x' }); }).toThrow();
                });
            });

            describe('add Element method', function () {
                it('should add an enum item without value', function () {
                    var Status = new Enum();
                    Status.addElement({ text: 'x', alias: 'X' });
                    expect(Status.X).toBe(0);
                    expect(Status[0]).toBe('X');
                });

                it('should add an enum item with custom value', function () {
                    var Status = new Enum();
                    Status.addElement({ text: 'x', alias: 'X', value: 1 });
                    expect(Status.X).toBe(1);
                    expect(Status[1]).toBe('X');
                });

                it('should throw if elements if not provided', function () {
                    var Status = new Enum();
                    expect(function () { Status.addElement(); }).toThrow();
                });

                it('should throw if elements is not an object', function () {
                    var Status = new Enum();
                    expect(function () { Status.addElement(null); }).toThrow();
                    expect(function () { Status.addElement(undefined); }).toThrow();
                    expect(function () { Status.addElement(true); }).toThrow();
                    expect(function () { Status.addElement(false); }).toThrow();
                    expect(function () { Status.addElement(1); }).toThrow();
                    expect(function () { Status.addElement('string'); }).toThrow();
                });

                it('should throw if text is not given', function () {
                    var Status = new Enum();
                    expect(function () { Status.addElement({ alias: 'X' }); }).toThrow();
                });

                it('should throw if alias is not given', function () {
                    var Status = new Enum();
                    expect(function () { Status.addElement({ text: 'x' }); }).toThrow();
                });

                it('should throw if value duplicates', function () {
                    var Status = new Enum();
                    Status.addElement({ text: 'x', alias: 'X', value: 1 });
                    expect(function () { Status.addElement({ text: 'y', alias: 'Y', value: 1 }); }).toThrow();
                });

                it('should throw if alias duplicates', function () {
                    var Status = new Enum();
                    Status.addElement({ text: 'x', alias: 'X' });
                    expect(function () { Status.addElement({ text: 'y', alias: 'X' }); }).toThrow();
                });

                it('should not effect the enum class if given enum item is modified', function () {
                    var Status = new Enum();
                    var element = { text: 'x', alias: 'X' };
                    Status.addElement(element);
                    element.alias = 'Y';
                    expect(Status[0]).toBe('X');
                });
            });

            describe('from* method', function () {
                it('should get an enum item from expected argument', function () {
                    var element = { text: 'x', alias: 'X', value: 1 };
                    var Status = new Enum(element);
                    expect(Status.fromText('x')).toEqual(element);
                    expect(Status.fromAlias('X')).toEqual(element);
                    expect(Status.fromValue(1)).toEqual(element);
                });

                it('should return null if enum does not contain given text', function () {
                    var element = { text: 'x', alias: 'X', value: 1 };
                    var Status = new Enum(element);
                    expect(Status.fromText('y')).toBe(null);
                });

                it('should return null if enum does not contain given alias', function () {
                    var element = { text: 'x', alias: 'X', value: 1 };
                    var Status = new Enum(element);
                    expect(Status.fromAlias('Y')).toBe(null);
                });

                it('should return null if enum does not contain given value', function () {
                    var element = { text: 'x', alias: 'X', value: 1 };
                    var Status = new Enum(element);
                    expect(Status.fromValue(2)).toBe(null);
                });

                it('should not effect the enum class if returned enum item is modified', function () {
                    var element = { text: 'x', alias: 'X', value: 1 };
                    var Status = new Enum(element);

                    var fromText = Status.fromText('x');
                    fromText.text = 'y';
                    expect(Status.fromText('x')).toEqual(element);

                    var fromAlias = Status.fromAlias('X');
                    fromAlias.text = 'y';
                    expect(Status.fromAlias('X')).toEqual(element);

                    var fromValue = Status.fromValue(1);
                    fromValue.text = 'y';
                    expect(Status.fromValue(1)).toEqual(element);
                });
            });

            describe('get*From* method', function () {
                var Status = new Enum({ text: 'x', alias: 'X', value: 1 });

                it('should get return alias from text', function () {
                    expect(Status.getAliasFromText('x')).toBe('X');
                });

                it('should get return alias from value', function () {
                    expect(Status.getAliasFromValue(1)).toBe('X');
                });

                it('should get return text from alias', function () {
                    expect(Status.getTextFromAlias('X')).toBe('x');
                });

                it('should get return text from value', function () {
                    expect(Status.getTextFromValue(1)).toBe('x');
                });

                it('should get return value from alias', function () {
                    expect(Status.getValueFromAlias('X')).toBe(1);
                });

                it('should get return value from text', function () {
                    expect(Status.getValueFromText('x')).toBe(1);
                });

                it('should return null if enum does not contain given value', function () {
                    expect(Status.getAliasFromValue(2)).toBe(null);
                    expect(Status.getTextFromValue(2)).toBe(null);
                    expect(Status.getTextFromAlias('Y')).toBe(null);
                    expect(Status.getValueFromAlias('Y')).toBe(null);
                    expect(Status.getAliasFromText('y')).toBe(null);
                    expect(Status.getValueFromText('Y')).toBe(null);
                });
            });

            describe('toArray method', function () {
                var elements = [
                    { text: 'x', alias: 'X', value: 1 },
                    { text: 'y', alias: 'Y', value: 3 },
                    { text: 'z', alias: 'Z', value: 5 }
                ];
                var Ordered = new Enum(elements[0], elements[1], elements[2]);

                it('should return an array containing all enum items', function () {
                    expect(Ordered.toArray()).toEqual(elements);
                });

                it('should pick specified elements if hint is given as string', function () {
                    expect(Ordered.toArray('X', 'Z')).toEqual([elements[0], elements[2]]);
                });

                it('should insert any number of enum items if hint is given as object', function () {
                    var insertion = [
                        { text: 'a', alias: 'A', value: 7 },
                        { text: 'b', alias: 'B', value: 9 }
                    ];
                    expect(Ordered.toArray('X', insertion[0], insertion[1])).toEqual([elements[0], insertion[0], insertion[1]]);
                });
            });
        });
    }
);
