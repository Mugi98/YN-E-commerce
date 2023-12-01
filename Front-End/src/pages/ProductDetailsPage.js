import NavBar from "../features/navbar/Navbar";
import ProductDetails from "../features/product/components/product-details/ProductDetails";

function ProductDetailsPage() {
  return (
    <div>
      <NavBar>
        <ProductDetails></ProductDetails>
      </NavBar>
    </div>
  );
}

export default ProductDetailsPage;
