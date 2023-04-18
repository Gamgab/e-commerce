import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ordersEdit, ordersFetch } from "../../../slices/ordersSlice";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function OrderList() {
  const { list } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("list:", list);

  React.useEffect(() => {
    dispatch(ordersFetch());
  }, [dispatch]);

  const rows =
    list &&
    list.map((order) => {
      return {
        id: order._id,
        cName: order.shipping.name,
        amount: (order.total / 100)?.toLocaleString(),
        deliveryStatus: order.delivery_status,
        date: moment(order.createdAt).fromNow(),
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "cName", headerName: "Utilisateur", width: 120 },
    { field: "amount", headerName: "Montant(€)", width: 100 },
    {
      field: "deliveryStatus",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            {params.row.deliveryStatus === "pending" ? (
              <Pending>A Traiter</Pending>
            ) : params.row.deliveryStatus === "dispatched" ? (
              <Dispatched>Accepté</Dispatched>
            ) : params.row.deliveryStatus === "delivered" ? (
              <Delivered>Délivré</Delivered>
            ) : (
              "error"
            )}
          </div>
        );
      },
    },
    { field: "date", headerName: "Date", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 220,
      renderCell: (params) => {
        return (
          <Actions>
            <DispatchBtn onClick={() => handleOrderDispatch(params.row.id)}>
              Accepter
            </DispatchBtn>
            <DeliveryBtn onClick={() => handleOrderDelivered(params.row.id)}>
              Délivrer
            </DeliveryBtn>
            <View onClick={() => navigate(`/order/${params.row.id}`)}>
              Voir
            </View>
          </Actions>
        );
      },
    },
  ];

  const handleOrderDispatch = (id) => {
    dispatch(
      ordersEdit({
        id,
        delivery_status: "dispatched",
      })
    );
  };

  const handleOrderDelivered = (id) => {
    dispatch(
      ordersEdit({
        id,
        delivery_status: "delivered",
      })
    );
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}

const Pending = styled.div`
  color: rgb(253, 181, 40);
  background: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Dispatched = styled.div`
  color: rgb(38, 198, 249);
  background: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Delivered = styled.div`
  color: rgb(102, 108, 255);
  background: rgb(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    outline: none;
    padding: 3px 5px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const View = styled.button`
  background-color: rgb(114, 225, 40);
`;

const DispatchBtn = styled.button`
  background-color: rgb(38, 198, 249);
`;

const DeliveryBtn = styled.button`
  background-color: rgb(102, 108, 255);
`;
