import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { usersFetch } from "../../../slices/usersSlice";
//import moment from "moment";
//import { useNavigate } from "react-router-dom";

export default function UserList() {
  const { list } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  console.log("list:", list);

  React.useEffect(() => {
    dispatch(usersFetch());
  }, [dispatch]);

  const rows =
    list &&
    list.map((user) => {
      return {
        id: user._id,
        cName: user.name,
        email: user.email,
        admin: user.isAdmin,
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "cName", headerName: "Utilisateur", width: 120 },
    { field: "email", headerName: "Email", width: 180 },
    {
      field: "admin",
      headerName: "Role",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {params.row.admin === true ? (
              <Pending>Administrateur</Pending>
            ) : params.row.admin === false ? (
              <Dispatched>Client</Dispatched>
            ) : (
              "error"
            )}
          </div>
        );
      },
    },
    /*{
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 220,
      renderCell: (params) => {
        return (
          <Actions>
            <DispatchBtn onClick={() => handleUserDispatch(params.row.id)}>
              Accepter
            </DispatchBtn>
            <DeliveryBtn onClick={() => handleUserDelivered(params.row.id)}>
              Délivrer
            </DeliveryBtn>
            <View onClick={() => navigate(`/user/${params.row.id}`)}>
              Voir
            </View>
          </Actions>
        );
      },
    },*/
  ];
  /*
  const handleUserDispatch = (id) => {
    dispatch(
      usersEdit({
        id,
        delivery_status: "dispatched",
      })
    );
  };

  const handleUserDelivered = (id) => {
    dispatch(
      usersEdit({
        id,
        delivery_status: "delivered",
      })
    );
  };
*/
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
