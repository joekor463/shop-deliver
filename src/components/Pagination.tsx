"use client"

import { PaginationProps } from "@/types/paginationProps"
import { number } from "motion"
import Link from "next/link"

 const createPageUrl = (basePath: string, params: URLSearchParams, page: number) => {
            const newParams = new URLSearchParams(params)
            newParams.set("page", page.toString()) 
            return `${basePath}?${newParams.toString()}`   
        }

const getVisiblePages = (totalPages: number, currentPage: number) => {
    if (totalPages <= 5 ){
        return Array.from({length: totalPages}, (_, i) => i + 1 )
    }
    let start = Math.max(1, currentPage - 2)
    let end = Math.min(totalPages, currentPage + 2)

    if (currentPage <= 3) {
        end = 5
    } else if (currentPage >= totalPages - 2) {
        start = totalPages - 4
    }
    const pages: (number | string)[] = []

    if (start > 1) pages.push(1)
    if (start > 2) pages.push("...")        
    
    for (let i = start; i <= end; i++) pages.push(i)

    if (end < totalPages - 1) pages.push("...")
        
    if (end < totalPages) pages.push(totalPages)  

    console.log(pages)        
        
    return pages        
    
}

const Pagination = ({
    totalItems, 
    currentPage, 
    basePath, 
    itemsPerPage, 
    searchQuery} : PaginationProps) => {
        const totalPages = Math.ceil(totalItems) / itemsPerPage
        const params = new URLSearchParams(searchQuery)
        const visiblePages = getVisiblePages(totalPages, currentPage)

       

    const buttonBase = "px-4 py-2 rounded duration-300" 
    const buttonActive = "bg-[#ff6633] text-white hover:bg-[#70c05b]"
    const buttonDisabled = "opacity-50 cursor-not-allowed"       

    return (
        <div className="flex justify-center gap-4 mt-8 mb-12">
            <Link 
                href={createPageUrl(basePath, params, 1)} 
                onClick={(e) => {
                    if (currentPage === 1) e.preventDefault()
                }}
                aria-disabled={currentPage === 1}
                className={`${buttonBase} ${
                    currentPage === 1 ? buttonDisabled : buttonActive
                }`}               
            >
                В начало
            </Link>
            <Link 
                href={createPageUrl(basePath, params, currentPage - 1)} 
                onClick={(e) => {
                    if (currentPage === 1) e.preventDefault()
                }}
                aria-disabled={currentPage === 1}
                className={`${buttonBase} ${
                    currentPage === 1 ? buttonDisabled : buttonActive
                }`}
            >Назад</Link>

        {visiblePages.map((page, index) => {
            if (page === "...") {
                return (
                    <span key={`ellipsis-${index}`}>...</span>
                )
            }
            return <Link 
                key={page} 
                href={createPageUrl(basePath, params, page as number)}>
                    {page}
                </Link>
            })}    

            <Link 
                href={createPageUrl(basePath, params, currentPage + 1)} 
                onClick={(e) => {
                    if (currentPage === totalPages) e.preventDefault()
                }}
                aria-disabled={currentPage === totalPages}
                className={`${buttonBase} ${
                    currentPage === totalPages ? buttonDisabled : buttonActive
                }`}
                >Вперед
            </Link>
            <Link 
                href={createPageUrl(basePath, params, totalPages)} 
                onClick={(e) => {
                    if (currentPage === 1) e.preventDefault()
                }}
                aria-disabled={currentPage === totalPages}
                className={`${buttonBase} ${
                    currentPage === totalPages ? buttonDisabled : buttonActive
                }`}
            >
                В конец
            </Link>
        </div>
        
    )
}
export default Pagination