import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import {
  NOBSCBackendAPIEndpointOne
} from '../../../config/NOBSCBackendAPIEndpointOne';
import { staffMessage, staffMessageClear } from '../actions';
import {
  IStaffCreateNewContent,
  IStaffEditContent,
  IStaffDeleteContent
} from './types';

const endpoint = NOBSCBackendAPIEndpointOne;

export function* staffCreateNewContentSaga(action: IStaffCreateNewContent) {
  let {
    contentTypeId,
    published,
    title,
    items,
    image,
    fullImage,
    thumbImage
  } = action.contentInfo;

  try {

    if (fullImage && thumbImage) {

      const res1 = yield call(
        [axios, axios.post],
        `${endpoint}/staff/get-signed-url/content`,
        {fileType: fullImage.type},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        res1.data.fullSignature,
        fullImage,
        {headers: {'Content-Type': fullImage.type}}
      );

      yield call(
        [axios, axios.put],
        res1.data.thumbSignature,
        thumbImage,
        {headers: {'Content-Type': thumbImage.type}}
      );

      image = res1.data.fullName;

    } else {

      image = 'nobsc-content-default';

    }

    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/staff/content/create`,
      {
        contentInfo: {
          contentTypeId,
          published,
          title,
          items,
          image
        }
      },
      {withCredentials: true}
    );

    yield put(staffMessage(message));

  } catch(err) {

    yield put(staffMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(staffMessageClear());
}

export function* staffEditContentSaga(action: IStaffEditContent) {
  let {
    id,
    contentTypeId,
    published,
    title,
    items,
    image,
    fullImage,
    thumbImage,
    prevImage
  } = action.contentInfo;

  try {

    if (fullImage && thumbImage) {

      const res1 = yield call(
        [axios, axios.post],
        `${endpoint}/staff/get-signed-url/content`,
        {fileType: fullImage.type},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        res1.data.fullSignature,
        fullImage,
        {headers: {'Content-Type': fullImage.type}}
      );

      yield call(
        [axios, axios.put],
        res1.data.thumbSignature,
        thumbImage,
        {headers: {'Content-Type': thumbImage.type}}
      );

      image = res1.data.fullName;

    } else {

      image = prevImage;

    }

    const { data: { message } } = yield call(
      [axios, axios.put],
      `${endpoint}/staff/content/update`,
      {
        contentInfo: {
          id,
          contentTypeId,
          published,
          title,
          items,
          image,
          prevImage
        }
      },
      {withCredentials: true}
    );

    yield put(staffMessage(message));

  } catch(err) {

    yield put(staffMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(staffMessageClear());
}

export function* staffDeleteContentSaga(action: IStaffDeleteContent) {
  try {

    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/staff/content/delete`,
      {withCredentials: true, data: {id: action.id}}
    );

    yield put(staffMessage(message));

  } catch(err) {

    yield put(staffMessage('An error occurred. Please try again.'));
    
  }

  yield delay(4000);
  yield put(staffMessageClear());
}