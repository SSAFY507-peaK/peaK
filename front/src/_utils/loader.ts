import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function IdolLists() {
  let idolLists: string[] = await axios
    .get(`${BASE_URL}/api/idol/list`)
    .then(response => response.data)
    .catch(error => console.log(error));

  return idolLists;
}
