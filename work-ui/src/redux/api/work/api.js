import axios from "axios";

const URL = "http://localhost:8080/o/work-rest/1.0/works";

const getConfig = () => ({
    auth: {
        username: 'daoquanghuy2702@gmail.com',
        password: 'test'
    },
    header: {
        "Access-Control-Allow-Origin": "*"
    }
})

export const loadWorksApi = async (params) => {
    const config = {...getConfig(), params};
    return await axios.get(URL, config)
}

export const loadWorkApi = async (workId) => {
    const config = {...getConfig()};
    return await axios.get(`${URL}/${workId}`, config)
}

export const addWorkApi = async (work) => {
    const config = {...getConfig()};
    return await axios.post(URL, {...work}, config);
}

export const updateWorkApi = async (workId, work) => {
    const config = {...getConfig()};
    return await axios.put(`${URL}/${workId}`, {...work}, config)
}

export const deleteWorkApi = async (workId) => {
    const config = {...getConfig()};
    return await axios.delete(`${URL}/${workId}`, config)
}