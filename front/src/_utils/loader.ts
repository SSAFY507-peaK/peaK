import axios from "axios";

export async function IdolLists () {

  let idolLists:string[] = await axios.get('https://j8a507.p.ssafy.io/api/idol/list')
    .then(response => response.data)
    .catch(error => console.log(error))

  return idolLists;
}