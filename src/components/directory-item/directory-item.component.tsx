import { useNavigate } from "react-router-dom";

import {
  DeirectoryItemContainer,
  BackgroundImage,
  Body,
} from "./directory-item.styles";

type DirectoryItemProps = {
  category: {
    imageUrl: string;
    title: string}
}

const DirectoryItem = ({ category }: DirectoryItemProps) => {
  const { imageUrl, title } = category;

  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate(`shop/${title}`);
  };

  return (
    <DeirectoryItemContainer onClick={navigateHandler}>
      <BackgroundImage imageUrl={imageUrl}></BackgroundImage>
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DeirectoryItemContainer>
  );
};

export default DirectoryItem;
