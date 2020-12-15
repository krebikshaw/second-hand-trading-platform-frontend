import React, { useEffect } from 'react';
import { Navbar } from '../../../components';
import { StandardNavPage } from '../../../components/Page';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import useProduct from '../../../hooks/productHooks/useProduct';
import { useDispatch } from 'react-redux';
import {
  Breadcrumb,
  PurchaseInfoLeft,
  PurchaseInfoRight,
} from '../../../components/productSystem';
import {
  setProducts,
  setCategory,
  setHasMoreProducts,
  setErrorMessage,
} from '../../../redux/slices/productSlice/productSlice';

const ProductInfoContainer = styled.section`
  margin-top: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PurchaseInfo = styled.section`
  display: flex;
`;

const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    product,
    vendorInfo,
    products,
    category,
    hasMoreProducts,
    productErrorMessage,
    handleVendorProductMoreButton,
    handleGetProduct,
  } = useProduct();

  useEffect(() => {
    handleGetProduct(id);
    return () => {
      dispatch(setProducts([]));
      dispatch(setCategory([]));
      dispatch(setErrorMessage(null));
      dispatch(setHasMoreProducts(true));
    };
  }, []);
  return (
    <>
      <Navbar />
      <StandardNavPage>
        <ProductInfoContainer>
          <Breadcrumb category={category} product={product} />
          <PurchaseInfo>
            <PurchaseInfoLeft product={product} category={category} />
            <PurchaseInfoRight
              product={product}
              products={products}
              id={vendorInfo.id}
              productId={id}
              vendorInfo={vendorInfo}
              hasMoreProducts={hasMoreProducts}
              handler={handleVendorProductMoreButton}
              productErrorMessage={productErrorMessage}
            />
          </PurchaseInfo>
        </ProductInfoContainer>
      </StandardNavPage>
    </>
  );
};

export default ProductPage;
