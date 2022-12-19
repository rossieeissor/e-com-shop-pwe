import { useSelector } from "react-redux";

import Spinner from "../../components/spinner/spinner.component";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/categories.selector";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const categoriesIsLoading = useSelector(selectCategoriesIsLoading);

  return (
    <>
      {categoriesIsLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map(title => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </>
  );
};

export default CategoriesPreview;
