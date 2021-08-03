import API from "~/global/request/api";
import axios from "~/global/request/axios";
const uploadService = {
  uploadFile(params) {
    return axios.post(API.file_upload, params);
  }
}
export default uploadService;