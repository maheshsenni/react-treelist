import { expect } from 'chai';
import getSortedData from '../../src/js/util/SortUtils';

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
      expect(getSortedData).to.exist;
    });
  });

  describe('Single key sort tests', function() {
    // string field
    it('Should sort string field in ascending order', function() {
      const result = getSortedData(TEST_DATA, { name: 'asc' });
      expect(result).to.be.an('array');
      expect(result.length).to.equal(TEST_DATA.length);
      expect(result[0].name).to.equal('Clint');
      expect(result[1].name).to.equal('NATASHA');
      expect(result[2].name).to.equal('Steve');
      expect(result[3].name).to.equal('Tony');
      expect(result[4].name).to.equal(null);
      expect(result[5].name).to.equal(undefined);
    });

    it('Should sort string field in descending order', function() {
      const result = getSortedData(TEST_DATA, { name: 'desc' });
      expect(result).to.be.an('array');
      expect(result.length).to.equal(TEST_DATA.length);
      expect(result[5].name).to.equal('Clint');
      expect(result[4].name).to.equal('NATASHA');
      expect(result[3].name).to.equal('Steve');
      expect(result[2].name).to.equal('Tony');
      expect(result[1].name).to.equal(null);
      expect(result[0].name).to.equal(undefined);
    });

    // number field
    // it('Should sort number field in ascending order', function() {
    //   const result = getSortedData(TEST_DATA, { age: 'asc' });
    //   expect(result).to.be.an('array');
    //   expect(result.length).to.equal(TEST_DATA.length);
    //   expect(result[0].age).to.equal('Clint');
    //   expect(result[1].age).to.equal('NATASHA');
    //   expect(result[2].age).to.equal('Steve');
    //   expect(result[3].age).to.equal('Tony');
    //   expect(result[4].age).to.equal(null);
    //   expect(result[5].age).to.equal(undefined);
    // });

    // it('Should sort number field in descending order', function() {
    //   const result = getSortedData(TEST_DATA, { age: 'desc' });
    //   expect(result).to.be.an('array');
    //   expect(result.length).to.equal(TEST_DATA.length);
    //   expect(result[5].age).to.equal('Clint');
    //   expect(result[4].age).to.equal('NATASHA');
    //   expect(result[3].age).to.equal('Steve');
    //   expect(result[2].age).to.equal('Tony');
    //   expect(result[1].age).to.equal(null);
    //   expect(result[0].age).to.equal(undefined);
    // });
  });  
});