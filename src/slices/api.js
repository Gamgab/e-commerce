/*export const url = "https://api-shop.osc-fr1.scalingo.io/api";*/
export const url = "http://localhost:5000/api";

// ajout du token dans le header de la requete
export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
