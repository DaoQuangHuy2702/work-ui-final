import { all } from 'redux-saga/effects'
import workSaga from './saga/work/workSaga';

export default function* rootSaga() {
    yield all([...workSaga]);
}