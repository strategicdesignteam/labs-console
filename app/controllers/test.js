var RedHatInsightsService = require('./RedHatInsightsService');
var result = null;

RedHatInsightsService.getInsightsReportForGroup({ id: 7 }, (err, report) => {
  if (err) console.log(err);
  console.log(report);
});
