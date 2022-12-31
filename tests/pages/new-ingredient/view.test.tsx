import { shallow } from 'enzyme';
import React from 'react';

import { LoaderButton } from '../../../src/components';
import { NewIngredientView } from '../../../src/pages/new-ingredient/view';

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
  feedback:             "Some message.",
  fullCrop:             "",
  image:                null,
  ingredientTypes:      [{id: 11, name: "Vegetable"}, {id: 12, name: "Fruit"}],
  loading:              false,
  name:                 "",
  onCropChange,
  onCropComplete,
  onImageLoaded,
  onSelectFile,
  prevImage:            "nobsc-ingredient-default",
  staffIsAuthenticated: false,  // TO DO: test for this
  submit,
  theme:                "light",
  tinyCrop:             "",
  typeId:               1
};

describe('NewIngredientView', () => {
  describe('when creating', () => {
    it('displays a h1 element with text Create New Private Ingredient', () => {
      const wrapper = shallow(<NewIngredientView editing={false} {...intialProps} />);
      expect(wrapper.find('h1').text()).toEqual("Create New Private Ingredient");
    });
  });

  describe('when editing', () => {
    it('displays a h1 element with text Edit Private Ingredient', () => {
      const wrapper = shallow(<NewIngredientView editing={true} {...intialProps} />);
      expect(wrapper.find('h1').text()).toEqual("Edit Private Ingredient");
    });
  });

  describe('content', () => {
    const wrapper =
      shallow(<NewIngredientView editing={false} {...intialProps} />);

    it('displays feedback', () => {
      expect(wrapper.find('p.feedback').text()).toEqual("Some message.");
    });

    it('displays a h2 element with text Type Of Ingredient', () => {
      expect(wrapper.find('h2').contains("Type of Ingredient")).toEqual(true);
    });

    it('displays an ingredient type select element', () => {
      expect(wrapper.find('select[name="ingredientType"]')).toHaveLength(1);
    });

    it('displays a h2 element with text Name', () => {
      expect(wrapper.find('h2').contains("Name")).toEqual(true);
    });

    it('displays a name input element', () => {
      expect(wrapper.find('input.new-ingredient-name')).toHaveLength(1);
    });

    it('displays a h2 element with text Description', () => {
      expect(wrapper.find('h2').contains("Description")).toEqual(true);
    });

    it('displays a description textarea element', () => {
      expect(wrapper.find('textarea.new-ingredient-description')).toHaveLength(1);
    });

    it('displays a h2 element with text Image of Ingredient', () => {
      expect(wrapper.find('h2').contains("Image of Ingredient")).toEqual(true);
    });

    // TO DO: finish

    it('displays a Link to /dashboard with text Cancel', () => {
      expect(wrapper.find('.new-ingredient__cancel-button').props().to).toEqual("/dashboard");
      expect(wrapper.find('.new-ingredient__cancel-button').props().children).toEqual("Cancel");
    });

    it('displays a LoaderButton with text Create', () => {
      expect(wrapper.find(LoaderButton).props().text).toEqual("Create");
    });
  });
});