import { expect } from 'chai';
import {
  number_eq,
  number_neq,
  number_gt,
  number_gte,
  number_lt,
  number_lte,
} from '../../src/js/util/NumberFilters';

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
      expect(number_eq).to.exist;
    });

    it('should return only matching values', function() {
      const result = number_eq(TEST_DATA, 'age', 25);
      expect(result).to.be.an('array');
      expect(result.length).to.equal(1);
      expect(result[0].name).to.equal('Clint');
    });

    it('should return empty array when input data is empty', function() {
      const result = number_eq([], 'age', 25);
      expect(result).to.be.an('array');
      expect(result.length).to.equal(0);
    });

    it('should return non-strict matching values', function() {
      const result = number_eq(TEST_DATA, 'age', 1000);
      expect(result).to.be.an('array');
      expect(result.length).to.equal(1);
      expect(result[0].name).to.equal('Thor');
    });

  });

  describe('Not equal to filter', function() {
    it('should export not equal to function', function() {
      expect(number_neq).to.exist;
    });

    it('should return only non matching values', function() {
      const result = number_neq(TEST_DATA, 'age', 25);
      expect(result).to.be.an('array');
      expect(result.length).to.equal(4);
      expect(result[0].name).to.not.equal('Clint');
      expect(result[1].name).to.not.equal('Clint');
      expect(result[2].name).to.not.equal('Clint');
      expect(result[3].name).to.not.equal('Clint');
    });

    it('should return empty array when input data is empty', function() {
      const result = number_neq([], 'age', 25);
      expect(result).to.be.an('array');
      expect(result.length).to.equal(0);
    });

    it('should not return same value in different type', function() {
      const result = number_neq(TEST_DATA, 'age', 1000);
      expect(result).to.be.an('array');
      expect(result.length).to.equal(4);
      expect(result[0].name).to.not.equal('Thor');
      expect(result[1].name).to.not.equal('Thor');
      expect(result[2].name).to.not.equal('Thor');
      expect(result[3].name).to.not.equal('Thor');
    });

  });

  describe('Greater than filter', function() {
    it('should export greater than function', function() {
      expect(number_gt).to.exist;
    });

    it('should return values greater than filter value', function() {
      const result = number_gt(TEST_DATA, 'age', 25);
      expect(result).to.be.an('array');
      expect(result.length).to.equal(2);
      expect(result[0].name).to.equal('Tony');
      expect(result[1].name).to.equal('Thor');
    });

    it('should return empty array when input data is empty', function() {
      const result = number_gt([], 'age', 25);
      expect(result).to.be.an('array');
      expect(result.length).to.equal(0);
    });

  });

  describe('Greater than or equal filter', function() {
    it('should export greater than function', function() {
      expect(number_gte).to.exist;
    });

    it('should return values greater than or equal to filter value', function() {
      const result = number_gte(TEST_DATA, 'age', 25);
      expect(result).to.be.an('array');
      expect(result.length).to.equal(3);
      expect(result[0].name).to.equal('Tony');
      expect(result[1].name).to.equal('Clint');
      expect(result[2].name).to.equal('Thor');
    });

    it('should return empty array when input data is empty', function() {
      const result = number_gte([], 'age', 25);
      expect(result).to.be.an('array');
      expect(result.length).to.equal(0);
    });

  });

  describe('Less than filter', function() {
    it('should export less than function', function() {
      expect(number_lt).to.exist;
    });

    it('should return values less than filter value', function() {
      const result = number_lt(TEST_DATA, 'age', 45);
      expect(result).to.be.an('array');
      expect(result.length).to.equal(1);
      expect(result[0].name).to.equal('Clint');
    });

    it('should return empty array when input data is empty', function() {
      const result = number_lt([], 'age', 25);
      expect(result).to.be.an('array');
      expect(result.length).to.equal(0);
    });

  });

  describe('Less than or equal filter', function() {
    it('should export less than function', function() {
      expect(number_lte).to.exist;
    });

    it('should return values less than or equal to filter value', function() {
      const result = number_lte(TEST_DATA, 'age', 1000);
      expect(result).to.be.an('array');
      expect(result.length).to.equal(3);
      expect(result[0].name).to.equal('Tony');
      expect(result[1].name).to.equal('Clint');
      expect(result[2].name).to.equal('Thor');
    });

    it('should return empty array when input data is empty', function() {
      const result = number_lte([], 'age', 25);
      expect(result).to.be.an('array');
      expect(result.length).to.equal(0);
    });

  });

});