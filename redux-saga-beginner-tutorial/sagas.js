import { put, takeEvery, all } from 'redux-saga/effects'

// this function blocks the generator
const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* helloSaga() {
  console.log("Hello Sagas!")
}

// worker saga 

export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

// watcher saga 

export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
  ])
}
