import * as types from './actionTypes';

export const loadWorksStart = (params) => ({
    type: types.LOAD_WORKS_START,
    payload: params
});

export const loadWorksSuccess = (works) => ({
    type: types.LOAD_WORKS_SUCCESS,
    payload: works
});

export const loadWorksError = (error) => ({
    type: types.LOAD_WORKS_ERROR,
    payload: error
});

export const loadWorkStart = (workId) => ({
    type: types.LOAD_WORK_START,
    payload: workId
});

export const loadWorkSuccess = (work) => ({
    type: types.LOAD_WORK_SUCCESS,
    payload: work
});

export const loadWorkError = (error) => ({
    type: types.LOAD_WORK_ERROR,
    payload: error
});

export const addWorkStart = (work) => ({
    type: types.ADD_WORK_START,
    payload: work
});

export const addWorkSuccess = (work) => ({
    type: types.ADD_WORK_SUCCESS,
    payload: work
});

export const addWorkError = (error) => ({
    type: types.ADD_WORK_ERROR,
    payload: error
});

export const updateWorkStart = (workId, work) => ({
    type: types.UPDATE_WORK_START,
    payload: {workId, work}
});

export const updateWorkSuccess = (work) => ({
    type: types.UPDATE_WORK_SUCCESS,
    payload: work
});

export const updateWorkError = (error) => ({
    type: types.UPDATE_WORK_ERROR,
    payload: error
});

export const deleteWorkStart = (workId) => ({
    type: types.DELETE_WORK_START,
    payload: workId
});

export const deleteWorkSuccess = (workId) => ({
    type: types.DELETE_WORK_SUCCESS,
    payload: workId
});

export const deleteWorkError = (error) => ({
    type: types.DELETE_WORK_ERROR,
    payload: error
});



