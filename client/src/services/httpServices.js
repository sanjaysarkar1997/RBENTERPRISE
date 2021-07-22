import Swal from "sweetalert2";
import http from "../apis/instance";
import { loading } from "../Redux/action/loading";
import store from "../store";

const httpServicesPost = async (url, data = {}, header = {}) => {
  try {
    store.dispatch(loading(true));
    let returnData = await http.post(url, data, header);
    if (returnData.data.error) {
      Swal.fire("Error", "Something went wrong", "error");
      return [];
    } else {
      return returnData.data.results;
    }
  } catch (error) {
    Swal.fire("Error", "Something went wrong", "error");
  } finally {
    store.dispatch(loading(false));
  }
};
const httpServicesGet = async (url) => {
  try {
    store.dispatch(loading(true));
    let returnData = await http.get(url);
    if (returnData.data.error) {
      Swal.fire("Error", "Something went wrong", "error");
      return [];
    } else {
      return returnData.data.results;
    }
  } catch (error) {
    Swal.fire("Error", "Something went wrong", "error");
    return [];
  } finally {
    store.dispatch(loading(false));
  }
};

export { httpServicesPost, httpServicesGet };
