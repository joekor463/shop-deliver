import { ProductCardProps } from "./product"

export interface GenericProductListPageProps {
    fetchdata: () => Promise<ProductCardProps[]>
    pageTitle: string
    basePath: string
    errorMessage: string
}