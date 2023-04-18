import axios from "axios";
import { useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import { url } from "../slices/api";

const PayButton = ({ cartItems, subtotal }) => {
  //const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  const handleCheckOut = () => {
    axios
      .post(`${url}/stripe/create-checkout-session`, {
        cartItems,
        userId: user._id,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={() => handleCheckOut()}>Payer</button>
    </>
  );
};

export default PayButton;
