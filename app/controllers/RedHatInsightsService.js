var superagent = require('superagent');
var async = require('async');
var mockInsightsGroups = require('./mocks/mockInsightsGroups');
var mockInsightsSystems = require('./mocks/mockInsightsSystems');
var mockInsightsSystem = require('./mocks/mockInsightsSystem');

exports.getInsightsReportForGroup = function (infrastructure, callback) {
  var categories = {};

  async.waterfall(
    [
      async.apply(getInsightsGroupForInfrastructure, infrastructure),
      getSystemsForGroup,
      getSystemsReports,
      (systemReports, callback) => {
        if (systemReports && systemReports.length) {
          for (var i = 0; i < systemReports.length; i++) {
            parseSystemReportCategories(systemReports[i], categories);
          }
        }
        callback(null, categories);
      }
    ],
    (err, categories) => {
      callback(err, categories);
    }
  );
};

function getInsightsGroupForInfrastructure(infrastructure, callback) {
  if (process.env.INSIGHTS_URL && process.env.INSIGHTS_AUTH) {
    get('groups', (err, groups) => {
      if(err) return callback(err);
      var found = false;
      if (groups && groups.length) {
        groups.forEach((group) => {
          if (group.display_name.split('_')[1] == infrastructure.id) {
            found = true;
            callback(null, group.id);
          }
        });
      }
      if (!found) {
        callback(
          `Unable to find Insights Group for infra: ${infrastructure.id}`
        );
      }
    });
  }
  else {
    // mock group id
    callback(null, mockInsightsGroups.mock[0].id);
  }
}

function getSystemsForGroup(groupId, callback) {
  if (process.env.INSIGHTS_URL && process.env.INSIGHTS_AUTH) {
    get(`systems?group=${groupId}`, (err, data) => {
      if(err) callback(err);
      else if (data && data.resources && data.resources.length) {
        callback(null, data.resources);
      }
      else {
        callback(`There are no Insights systems for group id: ${groupId}`);
      }
    });
  }
  else {
    // mock systems
    callback(null, mockInsightsSystems.mock.resources);
  }
}

function getSystemsReports(systems, callback) {
  var systemRequests = [];
  for (var i = 0; i < systems.length; i++) {
    var querySystem = async.apply(getSystem, systems[i].system_id);
    systemRequests.push(querySystem);
  }
  async.parallel(systemRequests, (err, results) => {
    callback(err, results);
  });
}

function getSystem(systemId, callback) {
  if (process.env.INSIGHTS_URL && process.env.INSIGHTS_AUTH) {
    get(`systems/${systemId}/reports`, (err, system) => {
      if(err) callback(err);
      else if (system) {
        callback(null, system);
      }
      else {
        callback(`No such system exists: ${systemId}`);
      }
    });
  }
  else {
    // mock system
    callback(null, mockInsightsSystem.mock);
  }
}

function parseSystemReportCategories(systemReports, categories) {
  if (systemReports.reports && systemReports.reports.length) {
    for (var i = 0; i < systemReports.reports.length; i++) {
      var category = systemReports.reports[i].rule.category;
      if (categories.hasOwnProperty(category)) {
        categories[category] += 1;
      }
      else {
        categories[category] = 1;
      }
    }
  }
  return categories;
}

function get(url, callback) {
  superagent
    .get(process.env.INSIGHTS_URL + url)
    .set({
      'Content-Type': 'application/json',
      Authorization: process.env.INSIGHTS_AUTH
    })
    .on('error', err => callback(err))
    .end((err, response) => {
      if (err) {
        if(response && response.status === 401){
          console.log('401: Unable to authenticate with Red Hat Insights API. Check INSIGHTS_AUTH.');
        }
        callback(err);
      }
      else if(response.text){
        console.log(process.env.INSIGHTS_URL + url);
        // console.log(JSON.stringify(response.text));
        var data = JSON.parse(response.text);
        callback(null, data);
      } else {
        return callback('Error. Unable to retrieve Red Hat Insights reports.');
      }
    });
}
