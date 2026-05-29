 "use client"

import { ChangeEvent } from "react";
import { formStyles } from "../styles";
import { regions } from "@/data/regions";
import Image from "next/image";

interface SelectRegionProps {  
  value: string;
  onChangeAction: (e: ChangeEvent<HTMLSelectElement>) => void;
  region?: Array<{value: string; label: string}> 
}

const SelectRegion = ({value, onChangeAction}: SelectRegionProps) => {
    return (
        <div>
            <label htmlFor="region" className={formStyles.label}>
                Регион
            </label>
            <div className="relative">
                <select 
                    id="region"
                    value={value}
                    onChange={onChangeAction}
                    className={`${formStyles.input} apperance-none pr-8 cursor-pointer`}
                >                 
                   {regions.map((region) => (
                        <option key={region.value}>{region.label}</option>
                   ))}     
                </select>
                <div className="absolute right-2 top-2 transform -transform-y-1/2
                                pointer-events-none">
                    <Image 
                        src="/icon-products/icon-arrow-right.svg" 
                        alt="Выберите регион"
                        width={24} 
                        height={24}
                        className="rotate-90"
                    />
                </div>
            </div>
        </div>
    )
}
export default SelectRegion