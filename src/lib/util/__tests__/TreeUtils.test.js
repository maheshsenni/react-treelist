import {
    getClassName
} from '../TreeUtils';

describe('TreeUtils tests', function() {

    describe('getClassName', function() {
        it('should return string untouched', function() {
            expect(getClassName('myclass')).toBe('myclass');
        });

        it('should return empty string if null', function() {
            expect(getClassName(null)).toBe('');
        });

        it('should apply function to given data', function() {
            const fun = function(data) {
                return data.field;
            };
            expect(getClassName(fun, {
                field: 'myfield'
            })).toBe('myfield');
        });
    });    

});