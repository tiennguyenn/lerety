import { useState } from "react";
import { Product, products } from "../db";

function ProductsPage() {
  const [list, setList] = useState(products);
  return (
    <>
      <h2>Products</h2>
      <form>
        <input name="search" placeholder="Search" />
      </form>
      <ul>
        {list.map((product) => (
          <li>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductsPage;
