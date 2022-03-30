import { Variable } from "../Variable";

export async function AddJob(data) {
    console.log(data);
    let res = await fetch(Variable.API_URL + "/admin/addJob/" + localStorage.getItem("id"),{
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      res = await res.json();
      alert(res);
}
