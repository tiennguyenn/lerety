import { useParams } from "react-router-dom";
import { products } from "../db";

function ProductPage() {
  const params = useParams();

  const product = products.find((prod) => {
    if (!prod.id || !params.id) {
      return false;
    }

    return prod.id == parseInt(params.id);
  });

  return (
    <>
      <h2>Product page</h2>
      {product && (
        <div>
          <p>{product.name}</p>
          <p>{product.description}</p>
        </div>
      )}
    </>
  );
}

export default ProductPage;
