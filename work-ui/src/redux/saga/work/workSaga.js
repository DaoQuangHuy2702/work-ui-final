import { call, delay, fork, put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import * as types from '../../actions/work/actionTypes';
import { loadWorksApi, 
         loadWorkApi, 
         addWorkApi, 
         updateWorkApi, 
         deleteWorkApi } from '../../api/work/api';
import { loadWorksSuccess, 
         loadWorksError, 
         loadWorkSuccess, 
         loadWorkError, 
         addWorkSuccess, 
         addWorkError, 
         updateWorkSuccess, 
         updateWorkError, 
         deleteWorkError, 
         deleteWorkSuccess} from '../../actions/work/actions';

//function get works
function* onLoadWorksStartAsync({ payload }) {
    try {
        const response = yield call(loadWorksApi, payload);
        if(response.status === 200) {
            yield delay(300);
            yield put(loadWorksSuccess(response.data));
        }
    } catch(error) {
        yield put(loadWorksError(error.response));
    }
}

function* onLoadWorks() {
    yield takeEvery(types.LOAD_WORKS_START, onLoadWorksStartAsync);
}

//function get work
function* onLoadWorkStartAsync({ payload }) {
    try {
        const response = yield call(loadWorkApi, payload);
        if(response.status === 200) {
            yield delay(300);
            yield put(loadWorkSuccess(response.data));
        }
    } catch(error) {
        yield put(loadWorkError(error.response))
    }
}

function* onLoadWork() {
    yield takeEvery(types.LOAD_WORK_START, onLoadWorkStartAsync);
}

//function add work
function* onAddWorkStartAsync({ payload }) {
    try {
        const response = yield call(addWorkApi, payload);
        if(response.status === 200) {
            yield put(addWorkSuccess(response.data));
        }
    } catch(error) {
        yield put(addWorkError(error.response));
    }
}

function* onAddWork() {
    yield takeLatest(types.ADD_WORK_START, onAddWorkStartAsync);
}

//function update work
function* onUpdateWorkStartAsync({ payload: {workId, work} }) {
    try {
        const response = yield call(updateWorkApi, workId, work);
        if(response.status === 200) {
            yield put(updateWorkSuccess(response.data));
        }
    } catch(error) {
        yield put(updateWorkError(error.response));
    }
}

function* onUpdateWork() {
    yield takeLatest(types.UPDATE_WORK_START, onUpdateWorkStartAsync);
}

//function delete work
function* onDeleteWorkStartAsync({ payload }) {
    try {
        const response = yield call(deleteWorkApi, payload);
        if(response.status === 204) {
            yield delay(300);
            yield put(deleteWorkSuccess(payload));
        }
    } catch(error) {
        yield put(deleteWorkError(error.response));
    }
}

function* onDeleteWork() {
    yield takeEvery(types.DELETE_WORK_START, onDeleteWorkStartAsync);
}

const workSaga = [
    fork(onLoadWorks),
    fork(onLoadWork),
    fork(onAddWork),
    fork(onUpdateWork),
    fork(onDeleteWork)
];

export default workSaga;