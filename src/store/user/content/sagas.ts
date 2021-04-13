import axios from 'axios';
import { call, delay, put } from 'redux-saga/effects';

import { NOBSCAPI as endpoint } from '../../../config/NOBSCAPI';
import { dataGetMyContentSaga } from '../../data/sagas';
import { userMessage, userMessageClear } from '../actions';
import {
  IUserCreateNewContent,
  IUserEditContent,
  IUserDeleteContent
} from './types';

export function* userCreateNewContentSaga(action: IUserCreateNewContent) {
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

      const { data: { fullName, fullSignature, thumbSignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/get-signed-url/content`,
        {fileType: fullImage.type},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        fullSignature,
        fullImage,
        {headers: {'Content-Type': fullImage.type}}
      );

      yield call(
        [axios, axios.put],
        thumbSignature,
        thumbImage,
        {headers: {'Content-Type': thumbImage.type}}
      );

      image = fullName;

    } else {

      image = 'nobsc-content-default';

    }

    const { data: { message } } = yield call(
      [axios, axios.post],
      `${endpoint}/user/content/create`,
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
    
    yield put(userMessage(message));

    yield call(dataGetMyContentSaga);

  } catch(err) {

    yield put(userMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* userEditContentSaga(action: IUserEditContent) {
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

      const { data: { fullName, fullSignature, thumbSignature } } = yield call(
        [axios, axios.post],
        `${endpoint}/user/get-signed-url/content`,
        {fileType: fullImage.type},
        {withCredentials: true}
      );

      yield call(
        [axios, axios.put],
        fullSignature,
        fullImage,
        {headers: {'Content-Type': fullImage.type}}
      );

      yield call(
        [axios, axios.put],
        thumbSignature,
        thumbImage,
        {headers: {'Content-Type': thumbImage.type}}
      );

      image = fullName;

    } else {

      image = prevImage;

    }

    const { data: { message } } = yield call(
      [axios, axios.put],
      `${endpoint}/user/content/update`,
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

    yield put(userMessage(message));

    yield call(dataGetMyContentSaga);

  } catch(err) {

    yield put(userMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(userMessageClear());
}

export function* userDeleteContentSaga(action: IUserDeleteContent) {
  try {

    const { data: { message } } = yield call(
      [axios, axios.delete],
      `${endpoint}/user/content/delete`,
      {withCredentials: true, data: {id: action.id}}
    );

    yield put(userMessage(message));

    yield call(dataGetMyContentSaga);

  } catch(err) {

    yield put(userMessage('An error occurred. Please try again.'));

  }

  yield delay(4000);
  yield put(userMessageClear());
}