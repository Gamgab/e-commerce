// api Render
/*export const url = "https://shop-api-4i7l.onrender.com/api";*/
// api localhost
/*export const url = "http://localhost:5000/api";*/
// api Railway
export const url = "https://web-production-c3be.up.railway.app/api";

// ajout du token dans le header de la requete
export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
