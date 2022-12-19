import { useSelector, useDispatch } from "react-redux";

import Button from "../button/button.componnet";

import { BUTTON_TYPE_CLASSES } from "../button/button.componnet";

import { CategoryItem } from "../../store/categories/categories.types";

import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles";

type ProductCardProps = {
  product: CategoryItem
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const addProductToCart = () => {
    dispatch(addItemToCart(cartItems, product));
  };

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
