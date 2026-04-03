
import fetchProductsByCategory from "../fetchproducts";
import GenericProductsListPage from "../GenericListPage";

export const metadata = {
  title: 'Акции магазина "Северяночка"',
  description: "Акционные товары магазина ",
};


  const AllActions = async ({
    searchParams
  }: {
    searchParams: Promise<{page?: string; 
    itemsPerPage?: string }>
  }) => {
    
      return (<GenericProductsListPage 
        searchParams={searchParams} 
        props={{
          fetchData: () => fetchProductsByCategory('actions'),
          pageTitle: "Все акции",
          basePath: "/actions",
          errorMessage: "Ошибка: не удалось загрузить акции"
        }}
      />)
  }

export default AllActions;
