import React from 'react';
import {shallow, mount, render } from 'enzyme';

//capture all errors and warnings in Jest mock functions
console.error = jest.genMockFunction();
console.warn = jest.genMockFunction();

const path = require('path');
const baseDir = __dirname + '../../../../../';
const CreateTopologyForm = require(path.resolve(baseDir + 'components/Forms/CreateTopologyForm.js')).default;

describe('CreateTopology Form test suite', () => {

  it('should set the topology name when a value is passed to the component', () => {
    let handleSubmit = () => {};
    let handleCancel = () => {};
    let value = { name: 'Test Topology', description: 'We <3 Javascript'};

    const wrapper = mount(
      <CreateTopologyForm handleSubmit={ handleSubmit } handleCancel={ handleCancel } value={value}/>
    );

    expect(wrapper.find('#input1').html()).toEqual('<input type="text" class="form-control" id="input1" placeholder="topology-name" value="Test Topology">');
    expect(wrapper.find('#input2').props().value).toEqual(value.description);
  });

});