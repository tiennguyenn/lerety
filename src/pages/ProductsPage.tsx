import { Link, useSearchParams } from "react-router-dom";
import { products } from "../db";

function ProductsPage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const filterProducts = () => {
    if (search) {
      return products.filter(
        (prod) => prod.name.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
    }

    return products;
  };

  return (
    <>
      <h2>Products</h2>
      <ul>
        {filterProducts().map((product) => (
          <li key={product.id}>
            <p>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductsPage;
