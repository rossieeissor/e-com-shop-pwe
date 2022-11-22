import {
  DeirectoryItemContainer,
  BackgroundImage,
  Body,
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <DeirectoryItemContainer>
      <BackgroundImage
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></BackgroundImage>
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DeirectoryItemContainer>
  );
};

export default DirectoryItem;
