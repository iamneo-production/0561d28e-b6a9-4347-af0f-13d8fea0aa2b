import { Variable } from "../Variable";

export async function PostAdminData(formData) {
    let res = await fetch(Variable.API_URL + "/admin/signup",{
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      res = await res.json();
    return res;
}
