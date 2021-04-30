import axios from "axios";

const API_URL = "http://localhost:8080/";

class ItemsService {

    findAll() {
    return axios
      .get(API_URL + "findAll")
  }

    findItem(newItemData) {
        return axios
        .post(API_URL + "findItem",newItemData)

    }

    addItem(newItemData) {
        return axios
        .post(API_URL + "addItem",newItemData)
    }
}

export default new ItemsService();