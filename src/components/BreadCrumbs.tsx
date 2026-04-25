'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import iconToRight from "../../public/icons-header/icon-arrow-right.svg"
import { PATH_TRANSLATION } from "../../utils/pathTranslations"



const BreadCrumbs = () => {
    const pathName = usePathname()
    
    if (pathName === '/' || pathName === '/search') return null

    const pathSegment = pathName.split("/").filter((segment) =>  segment !== "")

    const breadcrumbs = pathSegment.map((segment, index) => {
        const href = "/" + pathSegment.slice(0, index + 1).join("/")
        return {
             label: PATH_TRANSLATION[segment] || segment,
             href,
             isLast: index === pathSegment.length - 1
        }
    })
    breadcrumbs.unshift({
        label: "Главная",
        href: "/",
        isLast: false
    })


    return (
        <nav className="px-[max(12px,calc((100%-1208px)/2))] my-6">
            <ol className="flex item-center gap-4 text-[8px] md:text-xs">
                {breadcrumbs.map((item, index) => (
                    <li key={index} className="flex item-center gap-4">
                        <div className={item.isLast ? "text-[#8f8f8f]" 
                                                    : "text-[#414141 hover:underline cursor-pointer]" }>
                            {item.isLast ? 
                                item.label : <Link href={item.href}>{item.label}</Link> 
                            }   
                        </div>
                        {!item.isLast && (
                            <Image 
                                src={iconToRight} 
                                alt={`Переход от ${item.label} к ${breadcrumbs[breadcrumbs.length - 1].label}`}
                                width={24}
                                height={24}
                                sizes="24px"
                            />
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
export default BreadCrumbs