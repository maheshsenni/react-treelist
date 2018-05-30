import {
  string_eq,
  string_neq,
  string_sw,
  string_ew,
  string_c,
  string_dc,
  string_e,
  string_ne
} from '../StringFilters';

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
      expect(string_eq).toBeDefined();
    });

    it('should return only matching strings', function() {
      const result = string_eq(TEST_DATA, 'sex', 'female');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
    });

    it('should return empty array when input data is empty', function() {
      const result = string_eq([], 'sex', 'female');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

    it('should ignore object if key is not defined', function() {
      delete TEST_DATA[0].sex;
      expect(TEST_DATA[0].sex).toBeUndefined();
      
      const result = string_eq(TEST_DATA, 'sex', 'male');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      
      TEST_DATA[0].sex = 'male';
      expect(TEST_DATA[0].sex).toBe('male');
    });
  });

  describe('Not equal to filter', function() {

    it('should export string not equals function', function() {
      expect(string_neq).toBeDefined();
    });

    it('should return non only matching strings', function() {
      const result = string_neq(TEST_DATA, 'sex', 'female');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2);
    });

    it('should return empty array when input data is empty', function() {
      const result = string_neq([], 'sex', 'female');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

    it('should include objects where key is not defined', function() {
      delete TEST_DATA[0].sex;
      expect(TEST_DATA[0].sex).toBeUndefined();
      
      const result = string_neq(TEST_DATA, 'sex', 'male');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2);
      
      TEST_DATA[0].sex = 'male';
      expect(TEST_DATA[0].sex).toBe('male');
    });
  });

  describe('Starts with filter', function() {
    
    it('should export string starts with function', function() {
      expect(string_sw).toBeDefined();
    });

    it('should return strings starting with filter value', function() {
      const result = string_sw(TEST_DATA, 'sex', 'male');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Tony');
      expect(result[1].name).toBe('Steve');
    });

    it('should return empty array when input data is empty', function() {
      const result = string_sw([], 'sex', 'male');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

    it('should ignore object if key is not defined', function() {
      delete TEST_DATA[0].sex;
      expect(TEST_DATA[0].sex).toBeUndefined();

      const result = string_sw(TEST_DATA, 'sex', 'male');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Steve');

      TEST_DATA[0].sex = 'male';
    });

    it('should ignore object if value is not a string', function() {
      TEST_DATA[0].sex = 123;

      const result = string_sw(TEST_DATA, 'sex', 'male');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Steve');

      TEST_DATA[0].sex = 'male';
    });
  });

  describe('Ends with filter', function() {
    
    it('should export ends starts with function', function() {
      expect(string_ew).toBeDefined();
    });

    it('should return strings ending with filter value', function() {
      const result = string_ew(TEST_DATA, 'name', 'y');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Tony');
    });

    it('should ignore case', function() {
      const result = string_ew(TEST_DATA, 'name', 'ha');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('NATASHA');
    });

    it('should ignore object if value is not a string', function() {
      TEST_DATA[0].sex = 123;

      const result = string_ew(TEST_DATA, 'sex', 'e');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Steve');
      expect(result[1].name).toBe('NATASHA');

      TEST_DATA[0].sex = 'male';
    });

  });

  describe('Contains filter', function() {
    
    it('should export contains function', function() {
      expect(string_c).toBeDefined();
    });

    it('should return strings containing filter value', function() {
      const result = string_c(TEST_DATA, 'name', 'on');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Tony');
    });

    it('should ignore case', function() {
      const result = string_c(TEST_DATA, 'name', 'at');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('NATASHA');
    });

    it('should ignore object if value is not a string', function() {
      TEST_DATA[0].name = 123;

      const result = string_c(TEST_DATA, 'name', 'on');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);

      TEST_DATA[0].name = 'Tony';
    });

  });

  describe('Does not contain filter', function() {
    
    it('should export does not contain function', function() {
      expect(string_dc).toBeDefined();
    });

    it('should return strings not containing filter value', function() {
      const result = string_dc(TEST_DATA, 'name', 'on');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2);
      expect(result[0].name).not.toBe('Tony');
      expect(result[1].name).not.toBe('Tony');
    });

    it('should ignore case', function() {
      const result = string_dc(TEST_DATA, 'name', 'at');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2);
      expect(result[0].name).not.toBe('NATASHA');
      expect(result[1].name).not.toBe('NATASHA');
    });

    it('should include object if value is not a string', function() {
      TEST_DATA[0].name = 123;

      const result = string_dc(TEST_DATA, 'name', 'at');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe(123);
      expect(result[1].name).toBe('Steve');

      TEST_DATA[0].name = 'Tony';
    });

  });

  describe('Empty filter', function() {
    
    it('should export empty function', function() {
      expect(string_e).toBeDefined();
    });

    it('should return strings that are empty', function() {
      const tempName = TEST_DATA[0].name;
      TEST_DATA[0].name = '';

      const result = string_e(TEST_DATA, 'name');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('');

      TEST_DATA[0].name = tempName;
    });

    it('should return object if key is not defined', function() {
      const tempName = TEST_DATA[0].name;
      delete TEST_DATA[0].name;

      const result = string_e(TEST_DATA, 'name');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBeUndefined();

      TEST_DATA[0].name = tempName;
    });

    it('should not return keys that are non-strings', function() {
      TEST_DATA[0].name = 123;

      const result = string_e(TEST_DATA, 'name');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);

      TEST_DATA[0].name = 'Tony';
    });

  });

  describe('Not empty filter', function() {
    
    it('should export not empty function', function() {
      expect(string_ne).toBeDefined();
    });

    it('should return strings that are not empty', function() {
      TEST_DATA[0].name = '';

      const result = string_ne(TEST_DATA, 'name');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2);
      expect(result[0].name.length).toBeGreaterThan(0);
      expect(result[1].name.length).toBeGreaterThan(0);

      TEST_DATA[0].name = 'Tony';
    });

    it('should not return object if key is not defined', function() {
      delete TEST_DATA[0].name;

      const result = string_ne(TEST_DATA, 'name');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2);
      expect(result[0].name).toBeDefined();
      expect(result[1].name).toBeDefined();

      TEST_DATA[0].name = 'Tony';
    });

    it('should return keys that are non-strings', function() {
      TEST_DATA[0].name = 123;

      const result = string_ne(TEST_DATA, 'name');
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(3);

      TEST_DATA[0].name = 'Tony';
    });

  });

});