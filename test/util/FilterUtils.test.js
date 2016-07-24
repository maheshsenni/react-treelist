import { expect } from 'chai';
import getFilteredData from '../../src/js/util/FilterUtils';

describe('FilterUtils tests', function() {
  describe('Export check', function() {
    it('should export "getFilteredData" function', function() {
      expect(getFilteredData).to.exist;
    });
  });
});