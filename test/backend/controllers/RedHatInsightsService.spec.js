const path = require('path');
const baseDir = `${__dirname}/../../../`;
const RedHatInsightsService = require(path.resolve(
  `${baseDir}app/controllers/RedHatInsightsService.js`
));

describe('Red Hat Insights Service test suite', () => {
  it('should return the correct Insights summary result given our mock data', (done) => {
    const expectedSummaryResult = {
      Security: 3,
      Availability: 1,
      Stability: 1,
      Performance: 1
    };

    RedHatInsightsService.getInsightsReportForGroup(
      { id: 7 },
      (err, actualResult) => {
        if (err) console.log(err);
        expect(actualResult).toEqual(expectedSummaryResult);
        done();
      }
    );
  });
});
