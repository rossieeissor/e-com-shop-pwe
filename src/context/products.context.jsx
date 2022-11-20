import { createContext, useState, useEffect } from "react";
// import SHOP_DATA from "../shop-data.json";
import { fetchHatsFromDataBase } from "../utils/firebase/firebase.utils";

export const ProductsContext = createContext({
  products: [],
  setProducts: () => null,
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  let value = { products, setProducts };

  useEffect(() => {
    const fetchHats = async () => {
      const hats = await fetchHatsFromDataBase();
      setProducts(hats);
    };
    fetchHats();
  }, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
