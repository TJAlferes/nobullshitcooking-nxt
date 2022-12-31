import { shallow } from 'enzyme';
import React from 'react';

import { LoaderButton } from '../../../src/components';
import { NewEquipmentView } from '../../../src/pages/new-equipment/view';

const cancelImage =       jest.fn();
const changeDescription = jest.fn();
const changeName =        jest.fn();
const submit =            jest.fn();
const changeType =        jest.fn();
const onCropChange =      jest.fn();
const onCropComplete =    jest.fn();
const onImageLoaded =     jest.fn();
const onSelectFile =      jest.fn();

const intialProps = {
  cancelImage,
  changeDescription,
  changeName,
  changeType,
  crop:                 {aspect: 280 / 172},
  description:          "",
  equipmentTypes:       [{id: 2, name: "Preparing"}, {id: 3, name: "Cooking"}],
  feedback:             "Some message.",
  fullCrop:             "",
  image:                null,
  loading:              false,
  name:                 "",
  onCropChange,
  onCropComplete,
  onImageLoaded,
  onSelectFile,
  prevImage:            "nobsc-equipment-default",
  staffIsAuthenticated: false,  // TO DO: test for this
  submit,
  theme:                "light",
  tinyCrop:             "",
  typeId:               1
};

describe('NewEquipmentView', () => {
  describe('when creating', () => {
    it('displays a h1 element with text Create New Private Equipment', () => {
      const wrapper = shallow(<NewEquipmentView editing={false} {...intialProps} />);
      expect(wrapper.find('h1').text()).toEqual("Create New Private Equipment");
    });
  });

  describe('when editing', () => {
    it('displays a h1 element with text Edit Private Equipment', () => {
      const wrapper = shallow(<NewEquipmentView editing={true} {...intialProps} />);
      expect(wrapper.find('h1').text()).toEqual("Edit Private Equipment");
    });
  });

  describe('content', () => {
    const wrapper =
      shallow(<NewEquipmentView editing={false} {...intialProps} />);

    it('displays feedback', () => {
      expect(wrapper.find('p.feedback').text()).toEqual("Some message.");
    });

    it('displays a h2 element with text Type Of Equipment', () => {
      expect(wrapper.find('h2').contains("Type of Equipment")).toEqual(true);
    });

    it('displays an equipment type select element', () => {
      expect(wrapper.find('select[name="equipmentType"]')).toHaveLength(1);
    });

    it('displays a h2 element with text Name', () => {
      expect(wrapper.find('h2').contains("Name")).toEqual(true);
    });

    it('displays a name input element', () => {
      expect(wrapper.find('input.new-equipment-name')).toHaveLength(1);
    });

    it('displays a h2 element with text Description', () => {
      expect(wrapper.find('h2').contains("Description")).toEqual(true);
    });

    it('displays a description textarea element', () => {
      expect(wrapper.find('textarea.new-equipment-description')).toHaveLength(1);
    });

    it('displays a h2 element with text Image of Equipment', () => {
      expect(wrapper.find('h2').contains("Image of Ingredient")).toEqual(true);
    });

    // TO DO: finish

    it('displays a Link to /dashboard with text Cancel', () => {
      expect(wrapper.find('.new-equipment__cancel-button').props().to).toEqual("/dashboard");
      expect(wrapper.find('.new-equipment__cancel-button').props().children).toEqual("Cancel");
    });

    it('displays a LoaderButton with text Create', () => {
      expect(wrapper.find(LoaderButton).props().text).toEqual("Create");
    });
  });
});