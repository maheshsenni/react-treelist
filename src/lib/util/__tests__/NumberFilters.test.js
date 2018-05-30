import {
  number_eq,
  number_neq,
  number_gt,
  number_gte,
  number_lt,
  number_lte,
} from '../NumberFilters';

const TEST_DATA = [{
  name: 'Tony',
  age: 45
}, {
  name: 'Steve',
  age: null
}, {
  name: 'NATASHA'
}, {
  name: 'Clint',
  age: 25
}, {
  name: 'Thor',
  age: '1000'
}];

describe('Number filter tests', function() {

  describe('Equal to filter', function() {
    it('should export equal to function', function() {
      expect(number_eq).toBeDefined();
    });

    it('should return only matching values', function() {
      const result = number_eq(TEST_DATA, 'age', 25);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Clint');
    });

    it('should return empty array when input data is empty', function() {
      const result = number_eq([], 'age', 25);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

    it('should return non-strict matching values', function() {
      const result = number_eq(TEST_DATA, 'age', 1000);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Thor');
    });

  });

  describe('Not equal to filter', function() {
    it('should export not equal to function', function() {
      expect(number_neq).toBeDefined();
    });

    it('should return only non matching values', function() {
      const result = number_neq(TEST_DATA, 'age', 25);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(4);
      expect(result[0].name).not.toBe('Clint');
      expect(result[1].name).not.toBe('Clint');
      expect(result[2].name).not.toBe('Clint');
      expect(result[3].name).not.toBe('Clint');
    });

    it('should return empty array when input data is empty', function() {
      const result = number_neq([], 'age', 25);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

    it('should not return same value in different type', function() {
      const result = number_neq(TEST_DATA, 'age', 1000);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(4);
      expect(result[0].name).not.toBe('Thor');
      expect(result[1].name).not.toBe('Thor');
      expect(result[2].name).not.toBe('Thor');
      expect(result[3].name).not.toBe('Thor');
    });

  });

  describe('Greater than filter', function() {
    it('should export greater than function', function() {
      expect(number_gt).toBeDefined();
    });

    it('should return values greater than filter value', function() {
      const result = number_gt(TEST_DATA, 'age', 25);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Tony');
      expect(result[1].name).toBe('Thor');
    });

    it('should return empty array when input data is empty', function() {
      const result = number_gt([], 'age', 25);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

  });

  describe('Greater than or equal filter', function() {
    it('should export greater than function', function() {
      expect(number_gte).toBeDefined();
    });

    it('should return values greater than or equal to filter value', function() {
      const result = number_gte(TEST_DATA, 'age', 25);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(3);
      expect(result[0].name).toBe('Tony');
      expect(result[1].name).toBe('Clint');
      expect(result[2].name).toBe('Thor');
    });

    it('should return empty array when input data is empty', function() {
      const result = number_gte([], 'age', 25);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

  });

  describe('Less than filter', function() {
    it('should export less than function', function() {
      expect(number_lt).toBeDefined();
    });

    it('should return values less than filter value', function() {
      const result = number_lt(TEST_DATA, 'age', 45);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Clint');
    });

    it('should return empty array when input data is empty', function() {
      const result = number_lt([], 'age', 25);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

  });

  describe('Less than or equal filter', function() {
    it('should export less than function', function() {
      expect(number_lte).toBeDefined();
    });

    it('should return values less than or equal to filter value', function() {
      const result = number_lte(TEST_DATA, 'age', 1000);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(3);
      expect(result[0].name).toBe('Tony');
      expect(result[1].name).toBe('Clint');
      expect(result[2].name).toBe('Thor');
    });

    it('should return empty array when input data is empty', function() {
      const result = number_lte([], 'age', 25);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

  });

});