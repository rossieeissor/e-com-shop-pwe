import { CartItemContainer, ItemDetails, Name } from "./cart-item.styles";

type CartItemProps = {
  cartItem: Item
}

export type Item = {
  id?: number,
  name: string,
  imageUrl: string,
  price: number,
  quantity: number

}

const CartItem = ({ cartItem }: CartItemProps) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <Name>{name}</Name>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
