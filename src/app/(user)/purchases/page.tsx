
import fetchPurchases from "../fetchPurchases";
import ProductsSection from "@/app/(products)/ProductsSection";

const AllPurchases = async () => {
  
  try {
   
    const purchases = await fetchPurchases()

    return <ProductsSection 
      title = "Все покупки"
      viewAllButton = {{text: "На главную", href: "/"}}
      products = {purchases}
    />
  } catch  {
    return <div className="text-red-500">Ошибка: не удалось загрузить покупки</div>;
  }
}

export default AllPurchases;
