import { delay, put } from 'redux-saga/effects';

import { systemMessage, systemMessageClear } from '../system/state';

// IDK... does this workerHelper make testing harder???

export function* workerHelper(worker: () => Generator<any, void, unknown>) {
  try {
    yield* worker();
  } catch(err) {
    yield put(systemMessage('An error occurred. Please try again.'));
  }

  yield delay(4000);
  yield put(systemMessageClear());
}
