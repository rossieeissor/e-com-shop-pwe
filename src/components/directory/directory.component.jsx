import DirectoryItem from "../directory-item/directory-item.component";

import { DirectoryContainer } from "./directory.styles";

const categories = [
  {
    id: 1,
    title: "mouses",
    imageUrl: "https://i.postimg.cc/8Crdpfrg/mouses1.png",
  },
  {
    id: 2,
    title: "keyboars",
    imageUrl: "https://i.postimg.cc/T3sqvJ1c/keyboards1.jpg",
  },
  {
    id: 3,
    title: "headsets",
    imageUrl: "https://i.postimg.cc/L6N3NpMw/headsets1.jpg",
  },
  {
    id: 4,
    title: "monitors",
    imageUrl: "https://i.postimg.cc/bwrH5ByJ/monitors1.jpg",
  },
  {
    id: 5,
    title: "chairs",
    imageUrl: "https://i.postimg.cc/VLYFqN2X/chairs1.jpg",
  },
];

const Directory = () => {
  return (
    <DirectoryContainer>
      {categories.map(category => (
        <DirectoryItem category={category} key={category.id} />
      ))}
    </DirectoryContainer>
  );
};

export default Directory;
