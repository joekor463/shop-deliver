'use client'

import GridCategoryBlock from "@/app/(articles)/GridCategoryBlock"
import { CatalogProps } from "@/types/catalog"
import { useEffect, useState } from "react"

const CatalogPage = () => {
    const [categories, setCategories] = useState<CatalogProps[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [hoveredCategoryId, setHoveredCatagoryId] = useState<string | null>(null)
    const [draggedCategory, setDraggedCategory] = useState<CatalogProps | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const isAdmin = true

    const fetchCategories = async () => {
        try {
            const response = await fetch("api/catalog")
            if (!response.ok) throw new Error (`Ошибка ответа сервера ${response.status}`)

            const data: CatalogProps[] = await response.json()
            console.log(data)
            setCategories(data.sort((a, b) => a.order - b.order))                
        } catch (error) {
            console.error("Не удалось получить категории: ", error)
            setError("Не удалось получить категории")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        fetchCategories()
    }, [])

    const updateOrderDB = async () => {
        try {
            const response = await fetch("api/catalog", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(
                    categories.map((category, index) => ({
                        _id: category._id,
                        order: index + 1,
                        title: category.title,
                        img: category.img,
                        colspan: category.colSpan,
                        tabletColSpan: category.tabletColSpan,
                        mobileColSpan: category.mobileColSpan
                    }))
                )
            })

            if(!response.ok) throw new Error("Ошибка при обновлении порядка")

            const result = await response.json()
            
            if(result.success) {
                console.log("Порядок успешно обновлен в БД")
            }
        } catch(error) {
            console.error("Ошибка при сохранении порядка : ", error)
            setError("Ошибка при сохранении порядка")
        }
    }

    const handleToggleEditing = async () => {
        if (isEditing) {
            await updateOrderDB()
        }
        setIsEditing(!isEditing)
    }

    const handleDragStart = (category: CatalogProps) => {
        if(isEditing) {
            setDraggedCategory(category)
        }
    }

    const handleDragOver = (e: React.DragEvent, categoryId: string) => {
        e.preventDefault()
        if (draggedCategory && draggedCategory._id !== categoryId) {
          setHoveredCatagoryId(categoryId)   
        }
    }

    const handleDragLeave = () => {
        setHoveredCatagoryId(null)
    }

    const handleDrop = (e: React.DragEvent, targetCategoryId: string) => {
        e.preventDefault()
        
        if(!isEditing || !draggedCategory) return 

        setCategories((prevCategories) => {
            const draggedIndex = prevCategories.findIndex(
                (c)=> c._id === draggedCategory._id
            )

            const targetIndex = prevCategories.findIndex(
                (c)=> c._id === targetCategoryId
            )

            if (draggedIndex === -1 || targetIndex === -1) return prevCategories

            const newCategories = [...prevCategories]

            const draggedItem = newCategories[draggedIndex]
            const targetItem = newCategories[targetIndex]

            const draggedSizes = {
                mobileColSpan: draggedItem.mobileColSpan,
                tabletColSpan: draggedItem.tabletColSpan,
                colSpan: draggedItem.colSpan
            }

            const targetSizes = {
                mobileColSpan: targetItem.mobileColSpan,
                tabletColSpan: targetItem.tabletColSpan,
                colSpan: targetItem.colSpan
            }

            newCategories[targetIndex] = {...draggedItem, ...targetSizes}
            newCategories[draggedIndex] = {...targetItem, ...draggedSizes}
            
            return newCategories
        })
        setDraggedCategory(null)
        setHoveredCatagoryId(null)
    }

    const resetLayout = () => {
        fetchCategories()
    }

    if (isLoading) {
        return <div className="text-center py-8">Загрузка каталога</div>
    }
    if (error) {
        return <div className="text-center py-8 text-red-500">{error} </div>
    }
    if (!categories.length) {
        return <div className="text-center py-8 text-grey-500">Категорий каталога не найден </div>
    }
    return (
        <section className="px-[max(12px,calcl((100%-1208px)/2))] mx-auto mb-20">
            {isAdmin && (
                <div className="flex  justify-end mb-4">
                    <button onClick={handleToggleEditing}
                    className="border border-(--color-primary) hover:text-white 
                    hover:bg-[#ff6633] hover:border-transparent active-shadow-(--shadow-button-active
                    w-1/2 h-10 rounder p-2 justify-center items-center text-(--color-primary)
                    transition-all duration-300 cursor-pointer select-none"
                    >
                        {isEditing ? "Закончить редактирование" : "Изменить расположение"}
                    </button>
                    {isEditing && (
                        <button onClick={resetLayout}
                        className="ml-3 p-2 text-xs justify-center items-center active:shadow-
                    (--shadow-button-active) border-none rounded cursor-pointer transitions-colors
                    duration-300 bg-[#f3f2f1] hower:shadow-(--shadow-button-secondary)"
                        >
                            Сбросить</button>
                    )}
                </div>
            )}
            <h1 className="mb-4 md:mb-8 xl:mb-10 flex flex-row text-4xl mb:text-5xl
            xl:text-[64px] text-[#414141] font-bold "> 
                Каталог
            </h1>
           <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 
                            md:gap-6 xl:gap-8">
             {categories.map((category) => (
                <div 
                    key={category._id} 
                    className={`${category.mobileColSpan}
                    ${category.tabletColSpan} ${category.colSpan }bg-gray-100 rounded
                    overflow-hidden min-h-50 h-full  ${isEditing ?
                         "border-2border-dashed border-grey-200" : "" }
                    `}
                        onDragOver={(e)=> handleDragOver(e, category._id) }
                    >
                    <div className={`h-full w-full ${draggedCategory?._id === category._id ?
                        "opacity-50" : " "   
                        }`}
                        draggable={isEditing}
                        onDragStart={()=> handleDragStart(category)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e)=> handleDrop(e, category._id)}
                        >
                        <GridCategoryBlock 
                            id={category.id} 
                            title={category.title} 
                            img={category.img}/>
                    </div>
                </div>
             ))}
           </div>
        </section>
    )
}
export default CatalogPage