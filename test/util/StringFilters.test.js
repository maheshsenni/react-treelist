import { expect } from 'chai';
import {
  string_eq,
  string_neq,
  string_sw,
  string_ew,
  string_c,
  string_dc,
  string_e,
  string_ne
} from '../../src/js/util/StringFilters';

const TEST_DATA = [{
  name: 'Tony',
  sex: 'male',
  age: 45
}, {
  name: 'Steve',
  sex: 'MALE',
  age: 32
}, {
  name: 'NATASHA',
  sex: 'FEMALE',
  age: 23
}];

describe('String filter tests', function() {

  describe('Equal to filter', function() {
    it('should export string equals function', function() {
      expect(string_eq).to.exist;
    });

    it('should return only matching strings', function() {
      const result = string_eq(TEST_DATA, 'sex', 'female');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(1);
    });

    it('should return empty array when input data is empty', function() {
      const result = string_eq([], 'sex', 'female');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(0);
    });

    it('should ignore object if key is not defined', function() {
      delete TEST_DATA[0].sex;
      expect(TEST_DATA[0].sex).to.not.exist;
      
      const result = string_eq(TEST_DATA, 'sex', 'male');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(1);
      
      TEST_DATA[0].sex = 'male';
      expect(TEST_DATA[0].sex).to.equal('male');
    });
  });

  describe('Not equal to filter', function() {

    it('should export string not equals function', function() {
      expect(string_neq).to.exist;
    });

    it('should return non only matching strings', function() {
      const result = string_neq(TEST_DATA, 'sex', 'female');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(2);
    });

    it('should return empty array when input data is empty', function() {
      const result = string_neq([], 'sex', 'female');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(0);
    });

    it('should include objects where key is not defined', function() {
      delete TEST_DATA[0].sex;
      expect(TEST_DATA[0].sex).to.not.exist;
      
      const result = string_neq(TEST_DATA, 'sex', 'male');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(2);
      
      TEST_DATA[0].sex = 'male';
      expect(TEST_DATA[0].sex).to.equal('male');
    });
  });

  describe('Starts with filter', function() {
    
    it('should export string starts with function', function() {
      expect(string_sw).to.exist;
    });

    it('should return strings starting with filter value', function() {
      const result = string_sw(TEST_DATA, 'sex', 'male');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(2);
      expect(result[0].name).to.equal('Tony');
      expect(result[1].name).to.equal('Steve');
    });

    it('should return empty array when input data is empty', function() {
      const result = string_sw([], 'sex', 'male');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(0);
    });

    it('should ignore object if key is not defined', function() {
      delete TEST_DATA[0].sex;
      expect(TEST_DATA[0].sex).to.not.exist;

      const result = string_sw(TEST_DATA, 'sex', 'male');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(1);
      expect(result[0].name).to.equal('Steve');

      TEST_DATA[0].sex = 'male';
    });

    it('should ignore object if value is not a string', function() {
      TEST_DATA[0].sex = 123;

      const result = string_sw(TEST_DATA, 'sex', 'male');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(1);
      expect(result[0].name).to.equal('Steve');

      TEST_DATA[0].sex = 'male';
    });
  });

  describe('Ends with filter', function() {
    
    it('should export ends starts with function', function() {
      expect(string_ew).to.exist;
    });

    it('should return strings ending with filter value', function() {
      const result = string_ew(TEST_DATA, 'name', 'y');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(1);
      expect(result[0].name).to.equal('Tony');
    });

    it('should ignore case', function() {
      const result = string_ew(TEST_DATA, 'name', 'ha');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(1);
      expect(result[0].name).to.equal('NATASHA');
    });

    it('should ignore object if value is not a string', function() {
      TEST_DATA[0].sex = 123;

      const result = string_ew(TEST_DATA, 'sex', 'e');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(2);
      expect(result[0].name).to.equal('Steve');
      expect(result[1].name).to.equal('NATASHA');

      TEST_DATA[0].sex = 'male';
    });

  });

  describe('Contains filter', function() {
    
    it('should export contains function', function() {
      expect(string_c).to.exist;
    });

    it('should return strings containing filter value', function() {
      const result = string_c(TEST_DATA, 'name', 'on');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(1);
      expect(result[0].name).to.equal('Tony');
    });

    it('should ignore case', function() {
      const result = string_c(TEST_DATA, 'name', 'at');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(1);
      expect(result[0].name).to.equal('NATASHA');
    });

    it('should ignore object if value is not a string', function() {
      TEST_DATA[0].name = 123;

      const result = string_c(TEST_DATA, 'name', 'on');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(0);

      TEST_DATA[0].name = 'Tony';
    });

  });

  describe('Does not contain filter', function() {
    
    it('should export does not contain function', function() {
      expect(string_dc).to.exist;
    });

    it('should return strings not containing filter value', function() {
      const result = string_dc(TEST_DATA, 'name', 'on');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(2);
      expect(result[0].name).to.not.equal('Tony');
      expect(result[1].name).to.not.equal('Tony');
    });

    it('should ignore case', function() {
      const result = string_dc(TEST_DATA, 'name', 'at');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(2);
      expect(result[0].name).to.not.equal('NATASHA');
      expect(result[1].name).to.not.equal('NATASHA');
    });

    it('should include object if value is not a string', function() {
      TEST_DATA[0].name = 123;

      const result = string_dc(TEST_DATA, 'name', 'at');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(2);
      expect(result[0].name).to.equal(123);
      expect(result[1].name).to.equal('Steve');

      TEST_DATA[0].name = 'Tony';
    });

  });

  describe('Empty filter', function() {
    
    it('should export empty function', function() {
      expect(string_e).to.exist;
    });

    it('should return strings that are empty', function() {
      TEST_DATA[0].name = '';

      const result = string_e(TEST_DATA, 'name');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(1);
      expect(result[0].name).to.be.a('string');
      expect(result[0].name.length).to.equal(0);

      TEST_DATA[0].name = 'Tony';
    });

    it('should return object if key is not defined', function() {
      delete TEST_DATA[0].name;

      const result = string_e(TEST_DATA, 'name');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(1);
      expect(result[0].name).to.not.exist;

      TEST_DATA[0].name = 'Tony';
    });

    it('should not return keys that are non-strings', function() {
      TEST_DATA[0].name = 123;

      const result = string_e(TEST_DATA, 'name');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(0);

      TEST_DATA[0].name = 'Tony';
    });

  });

  describe('Not empty filter', function() {
    
    it('should export not empty function', function() {
      expect(string_ne).to.exist;
    });

    it('should return strings that are not empty', function() {
      TEST_DATA[0].name = '';

      const result = string_ne(TEST_DATA, 'name');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(2);
      expect(result[0].name.length).to.be.above(0);
      expect(result[1].name.length).to.be.above(0);

      TEST_DATA[0].name = 'Tony';
    });

    it('should not return object if key is not defined', function() {
      delete TEST_DATA[0].name;

      const result = string_ne(TEST_DATA, 'name');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(2);
      expect(result[0].name).to.exist;
      expect(result[1].name).to.exist;

      TEST_DATA[0].name = 'Tony';
    });

    it('should return keys that are non-strings', function() {
      TEST_DATA[0].name = 123;

      const result = string_ne(TEST_DATA, 'name');
      expect(result).to.be.an('array');
      expect(result.length).to.equal(3);

      TEST_DATA[0].name = 'Tony';
    });

  });

});