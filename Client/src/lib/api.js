import axios from "axios";

export const baseURL = "http://127.0.0.1:8080/";
const config = { headers: { 'Content-Type': 'multipart/form-data' } };

export const uploadData = (formData, pathPara) => {
    return axios.post(baseURL + 'uploading/' + pathPara, formData, config)
}

export const getDirInfoByType = (typeName) => {
    return axios.get(baseURL + 'dir-data', { params: { type: typeName } })
}

export const execute_command_by_type = (formValues, cmdType) => {
    return axios.post(baseURL + 'execute_command', formValues, { params: { cmd_type: cmdType } })
}

export const getDataByTableName = (tableName) => {
    return axios.get(baseURL + 'db_data', { params: { table_name: tableName } })
}
