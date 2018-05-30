import {
  is_null,
  is_not_null
} from '../CommonFilters';

const TEST_DATA = [{
  name: 'Tony',
  age: 45
}, {
  name: 'Steve',
  age: null
}, {
  name: 'NATASHA'
}];

describe('Common filter tests', function() {

  describe('Is null filter', function() {
    it('should export is null function', function() {
      expect(is_null).toBeDefined();
    });

    it('should return only null values', function() {
      const result = is_null(TEST_DATA, 'age');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Steve');
    });

    it('should return empty array when input data is empty', function() {
      const result = is_null([], 'age');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

    it('should ignore object if key is not defined', function() {
      const result = is_null(TEST_DATA, 'age');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Steve');
    });
  });

  describe('Not null filter', function() {
    it('should export is not null function', function() {
      expect(is_not_null).toBeDefined();
    });

    it('should return only non null values', function() {
      const result = is_not_null(TEST_DATA, 'age');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2);
      expect(result[0].name).not.toBe('Steve');
      expect(result[1].name).not.toBe('Steve');
    });

    it('should return empty array when input data is empty', function() {
      const result = is_not_null([], 'age');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

    it('should include object if key is not defined', function() {
      const result = is_not_null(TEST_DATA, 'age');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2)
      expect(result[0].name).toBe('Tony');
      expect(result[1].name).toBe('NATASHA');
    });
  });

});