import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import { EquipmentRow } from '../../../../src/pages/new-recipe/components';
import { IEquipment } from '../../../../src/store/data/types';

const amount =             1;
const changeEquipmentRow = jest.fn();
const equipment = [
  {id: 1, name: "Cutting Board", equipment_type_id: 2, owner_id: 1, equipment_type_name: "Preparing", description: "You need one.", image: "nobsc-cutting-board"},
  {id: 2, name: "Metal Spatula", equipment_type_id: 3, owner_id: 1, equipment_type_name: "Cooking",   description: "You need one.", image: "nobsc-metal-spatula"},
];
const myPrivateEquipment: IEquipment[] = [];
const id =                 1;
const removeEquipmentRow = jest.fn();
const rowKey =             "XYZ";
const type =               2;

let wrapper: ShallowWrapper;

describe('EquipmentRow', () => {
  beforeEach(() => {
    wrapper = shallow(
      <EquipmentRow
        amount={amount}
        changeEquipmentRow={changeEquipmentRow}
        equipment={equipment}
        id={id}
        key={rowKey}
        myPrivateEquipment={myPrivateEquipment}
        removeEquipmentRow={removeEquipmentRow}
        rowKey={rowKey}
        type={type}
      />
    );
  });

  it('displays an amount select element', () => {
    expect(wrapper.find('select[name="amount"]')).toHaveLength(1);
  });

  it('displays a type select element', () => {
    expect(wrapper.find('select[name="type"]')).toHaveLength(1);
  });

  it('displays an equipment select element', () => {
    expect(wrapper.find('select[name="equipment"]')).toHaveLength(1);
  });

  it('filters equipment options by current type', () => {
    // should not have Metal Spatula option
    const equipmentOptions = wrapper.find('select[name="equipment"]');
    expect(equipmentOptions.find('option[value="2"]')).toHaveLength(0);
  });

  it('displays a button element with text Remove', () => {
    expect(wrapper.find('.recipe-row__button--remove').text()).toEqual("Remove");
  });
});