import axios from "axios";

const EID = '126363';

export const API_URL = `http://185.244.172.108:8081/v1/outlay-rows/entity/${EID}`;

const $api = axios.create({
    baseURL: API_URL,
})

export default $api