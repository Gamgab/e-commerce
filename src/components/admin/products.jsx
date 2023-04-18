import { Outlet, useNavigate } from "react-router-dom";
import { AdminHeaders, PrimaryButton } from "./commonstyled";

const Products = () => {
  const navigate = useNavigate();

  return (
    <>
      <AdminHeaders>
        Produits
        <PrimaryButton
          onClick={() => navigate("/admin/products/create-product")}
        >
          Ajouter
        </PrimaryButton>
      </AdminHeaders>

      <Outlet />
    </>
  );
};

export default Products;
