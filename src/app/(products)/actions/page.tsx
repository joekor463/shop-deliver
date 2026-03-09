
import fetchProductsByCategory from "../fetchproducts";
import ProductsSection from "../ProductsSection";

const AllActions = async () => {
  
  try {
   
    const products = await fetchProductsByCategory("actions")

    return <ProductsSection 
      title = "Все акции"
      viewAllButton = {{text: "На главную", href: "/"}}
      products = {products}
    />
  } catch  {
    return <div className="text-red-500">Ошибка: не удалось загрузить акции</div>;
  }
}

export default AllActions;
