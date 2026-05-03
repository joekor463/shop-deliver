import { SearchProduct } from "./searchProduct";

export interface SearchReultsProps {
    isLoading: boolean;
    query: string;
    groupedProducts: {category: string; products: SearchProduct[]}[];
    resetSearch: () => void
}