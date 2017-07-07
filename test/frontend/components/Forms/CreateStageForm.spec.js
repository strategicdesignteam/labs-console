import React from 'react';
import { mount } from 'enzyme';

const path = require('path');

const baseDir = `${__dirname}/../../../../`;
const CreateStageForm = require(path.resolve(
  `${baseDir}components/Forms/CreateStageForm.js`
)).default;

// capture all errors and warnings in Jest mock functions
console.error = jest.genMockFunction();
console.warn = jest.genMockFunction();

describe('Create Stage Form test suite', () => {
  it('should set the stage name when a value is passed to the component', () => {
    const handleSubmit = () => {};
    const handleCancel = () => {};
    const infrastructurePipeline = {};
    const infrastructures = [];
    const value = { name: 'Test Stage' };

    const wrapper = mount(
      <CreateStageForm handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        value={value}
        infrastructurePipeline={infrastructurePipeline}
        infrastructures={infrastructures}/>
    );

    expect(wrapper.find('#input1').html()).toEqual(
      '<input type="text" class="form-control" id="input1" placeholder="stage-name" value="Test Stage">'
    );
    expect(wrapper.find('#input1').props().value).toEqual(value.name);
  });
});
