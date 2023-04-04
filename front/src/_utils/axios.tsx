import axios from "axios";

// axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
// const DOMAIN = "https://i8a408.p.ssafy.io";

const DOMAIN = process.env.REACT_APP_BASE_URL
axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해
export async function request(method:string, url:string, data?:any) {
  let response: any
  axios({
    method,
    url: DOMAIN + url,
    data
  })
    .then((res) => response = res.data)
    .catch((err) => console.log(err));
  return response;
};