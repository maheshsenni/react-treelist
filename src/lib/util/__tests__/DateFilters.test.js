import {
  date_eq,
  date_neq,
  date_af,
  date_oaf,
  date_bf,
  date_obf,
} from '../DateFilters';

describe('Date filter tests', function() {

  describe('Equal to filter', function() {
    it('should export equal to function', function() {
      expect(date_eq).toBeDefined();
    });
  });

  describe('Not equal to filter', function() {
    it('should export not equal to function', function() {
      expect(date_neq).toBeDefined();
    });
  });

  describe('After filter', function() {
    it('should export after function', function() {
      expect(date_af).toBeDefined();
    });
  });

  describe('On or after filter', function() {
    it('should export on or after function', function() {
      expect(date_oaf).toBeDefined();
    });
  });

  describe('Before filter', function() {
    it('should export before function', function() {
      expect(date_bf).toBeDefined();
    });
  });

  describe('On or before filter', function() {
    it('should export on or before function', function() {
      expect(date_obf).toBeDefined();
    });
  });

});