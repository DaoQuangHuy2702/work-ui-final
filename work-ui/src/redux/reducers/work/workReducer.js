import { message } from "antd";
import * as types from "../../actions/work/actionTypes";

const initialState = {
    data: [],
    loading: false,
    error: null
};

const workReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.LOAD_WORKS_START:
        case types.LOAD_WORK_START:
        case types.ADD_WORK_START:
        case types.UPDATE_WORK_START:
        case types.DELETE_WORK_START:
            return {
                ...state,
                loading: true
            };

        case types.LOAD_WORKS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false
            }

        case types.LOAD_WORK_SUCCESS:
            return {
                ...state,
                work: action.payload,
                loading: false
            }

        case types.ADD_WORK_SUCCESS:
            message.success("Thêm mới thành công")
            return {
                ...state,
                data: {...state.data, items: [action.payload, ...state.data.items]},
                loading: false
            }

        case types.UPDATE_WORK_SUCCESS:
            message.success("Cập nhật thành công")
            return {
                ...state,
                loading: false,
                data: {...state.data, items: state.data.items.map((item) => {
                    if (item.id !== action.payload.id) return item;
                    return action.payload
                  })}
            }

        case types.DELETE_WORK_SUCCESS:
            message.success("Xóa thành công")
            return {
                ...state,
                loading: false
            }

        case types.LOAD_WORKS_ERROR:
        case types.LOAD_WORK_ERROR:
        case types.ADD_WORK_ERROR:
        case types.UPDATE_WORK_ERROR:
        case types.DELETE_WORK_ERROR:
            message.error("Error 400");
            return {
                ...state,
                loading: false
            }

        default:
            return state;
    }
}

export default workReducer;

