import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import Loader from "../loader";

const Order = () => {
  const params = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${url}/order/findOne/${params.id}`,
          setHeaders()
        );

        setOrder(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrder();
  }, [params.id]);

  return (
    <StyleOrder>
      {loading ? (
        <Loader />
      ) : (
        <>
          <OrderContainer>
            <h2>Details de commande</h2>
            <p>
              Status de la livraison:{" "}
              {order.delivery_status === "pending" ? (
                <Pending>A traiter</Pending>
              ) : order.delivery_status === "dispatched" ? (
                <Dispatched>En cours</Dispatched>
              ) : order.delivery_status === "delivered" ? (
                <Delivered>Délivré</Delivered>
              ) : (
                "erreur"
              )}
            </p>

            <h3>Produits commandés</h3>
            <Items>
              {order.products?.map((product, index) => (
                <Item key={index}>
                  <span>{product.description}</span>
                  <span>{product.quantity}</span>
                  <span>
                    {"€" + (product.amount_total / 100).toLocaleString()}
                  </span>
                </Item>
              ))}
            </Items>
            <div>
              <h3>Prix total</h3>
              <p>{"€" + (order.total / 100).toLocaleString()}</p>
            </div>
            <div>
              <h3>Details de livraison</h3>
              <p>Client: {order.shipping?.name}</p>
              <p>Ville: {order.shipping?.address.city}</p>
              <p>Email: {order.shipping?.email}</p>
            </div>
          </OrderContainer>
        </>
      )}
    </StyleOrder>
  );
};

export default Order;

const StyleOrder = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
  h3 {
    margin: 1.5rem 0 0.5rem 0;
  }
`;

const OrderContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
`;

const Items = styled.div`
  span {
    margin-right: 1.5rem;
    &:first-child {
      font-weight: bold;
    }
  }
`;

const Item = styled.li`
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Pending = styled.span`
  color: rgb(253, 181, 40);
  background: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Dispatched = styled.span`
  color: rgb(38, 198, 249);
  background: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Delivered = styled.span`
  color: rgb(102, 108, 255);
  background: rgb(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
