import axios from "axios";
import authHeader from './auth-header.js';

const API_URL = "http://localhost:8080/";

class ItemsService {

    findAll() {
    return axios
      .get(API_URL + "findAll",{ headers: authHeader() })
  }

    findItem(newItemData) {
        return axios
        .post(API_URL + "findItem",newItemData,{ headers: authHeader() })

    }

    addItem(newItemData) {
        return axios
        .post(API_URL + "addItem",newItemData,{ headers: authHeader() })
    }
}

export default new ItemsService();