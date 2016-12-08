const path = require('path');
const baseDir = __dirname + '../../../../';
const automation = require(path.resolve(baseDir + 'app/automation/automation.js'));

describe('automation test suite', () => {

  it('map topology to engagement sample test', () => {
    const mockTopology = require(path.resolve(baseDir + 'app/automation/mocks/topology-sample.json'));
    const mockEngagement = require(path.resolve(baseDir + 'app/automation/mocks/automation-api-sample.json'));

    let actualEngagement =  automation.mapTopologyToEngagement(mockTopology);
    expect(actualEngagement).toEqual(mockEngagement);
  });

  it('map topology to engagement nodejs test', () => {
    const mockTopology = require(path.resolve(baseDir + 'app/automation/mocks/topology-nodejs.json'));
    const mockEngagement = require(path.resolve(baseDir + 'app/automation/mocks/automation-api-nodejs.json'));

    let actualEngagement =  automation.mapTopologyToEngagement(mockTopology);
    expect(actualEngagement).toEqual(mockEngagement);
  });

  it('map topology to engagement mongodb test', () => {
    const mockTopology = require(path.resolve(baseDir + 'app/automation/mocks/topology-mongodb.json'));
    const mockEngagement = require(path.resolve(baseDir + 'app/automation/mocks/automation-api-mongodb.json'));

    let actualEngagement =  automation.mapTopologyToEngagement(mockTopology);
    expect(actualEngagement).toEqual(mockEngagement);
  });

  it('map topology to engagement mongodb build tool none test', () => {
    const mockTopology = require(path.resolve(baseDir + 'app/automation/mocks/topology-mongodb.json'));
    const mockEngagement = require(path.resolve(baseDir + 'app/automation/mocks/automation-api-mongodb.json'));

    //modify build tool to equal "none" and ensure we don't have a changed base_image
    for(let i = 0; i < mockTopology.project_templates.length; i++){
      for(let j = 0; j < mockTopology.project_templates[i].apps; j++){
        mockTopology.project_templates[i].apps[j].build_tool = "none";
      }
    }

    let actualEngagement =  automation.mapTopologyToEngagement(mockTopology);
    expect(actualEngagement).toEqual(mockEngagement);
  });

  xit('map topology to engagement jenkins test', () => {
    const mockTopology = require(path.resolve(baseDir + 'app/automation/mocks/topology-jenkins.json'));
    const mockEngagement = require(path.resolve(baseDir + 'app/automation/mocks/automation-api-jenkins.json'));

    let actualEngagement =  automation.mapTopologyToEngagement(mockTopology);
    expect(actualEngagement).toEqual(mockEngagement);
  });

  xit('map topology to engagement nexus test', () => {
    const mockTopology = require(path.resolve(baseDir + 'app/automation/mocks/topology-nexus.json'));
    const mockEngagement = require(path.resolve(baseDir + 'app/automation/mocks/automation-api-nexus.json'));

    let actualEngagement =  automation.mapTopologyToEngagement(mockTopology);
    expect(actualEngagement).toEqual(mockEngagement);
  });

  xit('map topology to engagement automation api test', () => {
    const mockTopology = require(path.resolve(baseDir + 'app/automation/mocks/topology-automation-server.json'));
    const mockEngagement = require(path.resolve(baseDir + 'app/automation/mocks/automation-api-automation-server.json'));

    let actualEngagement =  automation.mapTopologyToEngagement(mockTopology);
    expect(actualEngagement).toEqual(mockEngagement);
  });

});
