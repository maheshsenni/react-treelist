import getFilteredData from '../FilterUtils';

describe('FilterUtils tests', function() {
  describe('Export check', function() {
    it('should export "getFilteredData" function', function() {
      expect(getFilteredData).toBeDefined();
    });
  });
});