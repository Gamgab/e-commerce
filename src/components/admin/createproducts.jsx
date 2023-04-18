import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { productsCreate } from "../../slices/productsSlice";
import { PrimaryButton } from "./commonstyled";
import { useNavigate } from "react-router-dom";

const CreateProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  console.log(productImg);

  const handleProductImgUpload = (e) => {
    const file = e.target.files[0];

    transformFile(file);
  };

  const transformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      // readDataAsURL > onloadend > .result va lire les données du fichier sous la forme d'une chaîne de caractères encodée en base64
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      // l'image sera enlevé si on annule
      setProductImg("");
    }
  };

  // à l'envoie du formulaire, on dispatch vers l'action reducer
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      productsCreate({
        name,
        brand,
        price,
        desc,
        image: productImg,
      })
    );
    navigate("/admin/products");
  };

  // RENDER FORMULAIRE
  return (
    <StyledCreateProduct>
      <StyledForm onSubmit={handleSubmit}>
        <h3>Ajouter un nouveau produit</h3>
        <input
          type="file"
          accept="image/"
          onChange={handleProductImgUpload}
          required
        />
        <select onChange={(e) => setBrand(e.target.value)} required>
          <option value="">Choisir la marque</option>
          <option value="iphone">Iphone</option>
          <option value="samsung">Samsung</option>
          <option value="xiaomi">Xiaomi</option>
          <option value="other">Autre marque</option>
        </select>
        <input
          type="text"
          required
          placeholder="nom"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="Prix"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="Description"
          onChange={(e) => setDesc(e.target.value)}
        />
        <PrimaryButton type="submit">Envoyer</PrimaryButton>
      </StyledForm>
      <ImagePreview>
        {productImg ? (
          <>
            <img src={productImg} alt="le produit" />
          </>
        ) : (
          <p>La preview de l'image uploadée</p>
        )}
      </ImagePreview>
    </StyledCreateProduct>
  );
};

export default CreateProducts;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;
  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;
    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }
  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);
  img {
    max-width: 100%;
  }
`;
