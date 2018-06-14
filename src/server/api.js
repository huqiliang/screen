const baseUrl = "http://115.159.43.44:82/api";
const commonServer = "http://api.ihotel.cn";
import axios from "axios";
import _ from "lodash";

const baseOptions = {
  hotelGroupCode: "JLSJYSWJDG",
  hotelCode: "JLSJYSWJD"
};

export const hotelList = opt => {
  let body = _.extend({}, baseOptions, opt);
  return axios.post(`${baseUrl}/hotel/hotelListAll.json`, body);
};

export const weatherList = params => {
  return axios.get(`${commonServer}/s/weather`, {
    params
  });
};
