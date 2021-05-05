import axios from "axios";
import authHeader from './auth-header.js';

const API_URL = "http://localhost:8080/vendor/";

class VendorService {

    findAll() {
    return axios
      .get(API_URL + "findAll",{ headers: authHeader() })
  }

    findItem(newItemData) {
        return axios
        .post(API_URL + "findVendor",newItemData,{ headers: authHeader() })

    }

    addItem(newItemData) {
        return axios
        .post(API_URL + "addVendor",newItemData,{ headers: authHeader() })
    }

    deleteItem(newItemData) {
        return axios
        .post(API_URL + "deleteVendor",newItemData,{ headers: authHeader() })
    }
}

export default new VendorService();