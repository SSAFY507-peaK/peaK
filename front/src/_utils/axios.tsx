import axios from "axios";

// axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

const DOMAIN = process.env.REACT_APP_BASE_URL + "/api"
axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해
export async function request(method:string, url:string, data?:any, headers?:any) {
  let response: any
  if (data) {
    await axios({
      method,
      url: DOMAIN + url,
      data,
      headers
    })
      .then((res) => response = res.data)
      .catch((err) => console.log(err));
  } else {
    await axios({
      method,
      url: DOMAIN + url,
      headers
    })
      .then((res) => response = res.data)
      .catch((err) => console.log(err));
  }
    return response;
};
