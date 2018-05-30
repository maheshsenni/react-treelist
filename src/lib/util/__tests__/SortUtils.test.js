import getSortedData from '../SortUtils';

const TEST_DATA = [{
  name: 'Tony',
  age: 45,
  bday: 1469416538075 // 2
}, {
  name: 'Steve',
  age: 23,
  bday: 1469216438075 // 1
}, {
  name: 'NATASHA',
  age: null,
  bday: 1469916538075 // 3
}, {
  name: 'Clint',
  bday: null
}, {
  name: null,
  age: 29
}, {
}];

describe('SortUtils tests', function() {
  describe('Export check', function() {
    it('should export "getSortedData" function', function() {
      expect(getSortedData).toBeDefined();
    });
  });

  describe('Single key sort tests', function() {
    // string field
    it('Should sort string field in ascending order', function() {
      const result = getSortedData(TEST_DATA, { name: 'asc' });
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(TEST_DATA.length);
      expect(result[0].name).toBe('Clint');
      expect(result[1].name).toBe('NATASHA');
      expect(result[2].name).toBe('Steve');
      expect(result[3].name).toBe('Tony');
      expect(result[4].name).toBe(null);
      expect(result[5].name).toBe(undefined);
    });

    it('Should sort string field in descending order', function() {
      const result = getSortedData(TEST_DATA, { name: 'desc' });
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(TEST_DATA.length);
      expect(result[5].name).toBe('Clint');
      expect(result[4].name).toBe('NATASHA');
      expect(result[3].name).toBe('Steve');
      expect(result[2].name).toBe('Tony');
      expect(result[1].name).toBe(null);
      expect(result[0].name).toBe(undefined);
    });
  });  
});