import { expect } from 'chai';
import {
  date_eq,
  date_neq,
  date_af,
  date_oaf,
  date_bf,
  date_obf,
} from '../../src/js/util/DateFilters';

const TEST_DATA = [{
  name: 'Tony',
  bday: 1469416538075 // 2
}, {
  name: 'Steve',
  bday: 1469216438075 // 1
}, {
  name: 'NATASHA',
  bday: 1469916538075 // 3
}, {
  name: 'Clint',
  bday: null
}, {
  name: 'Thor'
}];

describe('Date filter tests', function() {

  describe('Equal to filter', function() {
    it('should export equal to function', function() {
      expect(date_eq).to.exist;
    });
  });

  describe('Not equal to filter', function() {
    it('should export not equal to function', function() {
      expect(date_neq).to.exist;
    });
  });

  describe('After filter', function() {
    it('should export after function', function() {
      expect(date_af).to.exist;
    });
  });

  describe('On or after filter', function() {
    it('should export on or after function', function() {
      expect(date_oaf).to.exist;
    });
  });

  describe('Before filter', function() {
    it('should export before function', function() {
      expect(date_bf).to.exist;
    });
  });

  describe('On or before filter', function() {
    it('should export on or before function', function() {
      expect(date_obf).to.exist;
    });
  });

});