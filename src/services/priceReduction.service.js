import axios from "axios";
import authHeader from "./auth-header.js";

const API_URL = "http://localhost:8080/priceReduction/";

class PriceReductionService {
  findAll() {
    return axios.get(API_URL + "findAll", { headers: authHeader() });
  }
}

export default new PriceReductionService();
