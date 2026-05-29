"use client"

import Link from "next/link"
import { buttonStyles, formStyles } from "../styles"



const RegFormFooter = ({isFormValid} : {isFormValid : boolean}) => {
    return (
        <div>
            <button
                type="submit"
                
                className={`${buttonStyles.base} ${isFormValid ? buttonStyles.active : 
                    buttonStyles.inactive}`}
            >
                 Продолжить 
            </button>
            <Link href="/login" className={formStyles.loginLink}>
                    Вход
            </Link>
        </div>
    )
}
export default RegFormFooter