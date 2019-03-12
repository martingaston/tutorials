import { put, takeEvery, all } from 'redux-saga/effects'

// this function blocks the generator
const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* helloSaga() {
  console.log("Hello Sagas!")
}

// what is the need for the worker/watcher saga pattern?

// worker saga 

export function* incrementAsync() {
  // when a promise is yielded, sagas will suspend until resolved
  yield delay(1000)
  // when the promise completes it continues until the next yield
  // put() is a saga Effect
  // when the saga middleware recieves a saga Effect, it will also pause
  yield put({ type: 'INCREMENT' })
}

// watcher saga 

export function* watchIncrementAsync() {
  // takeEvery listens for dispatched actions 
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}


export default function* rootSaga() {
  // all instructs the saga middleware to run all functions in parallel
  yield all([
    helloSaga(),
    watchIncrementAsync(),
  ])
}
