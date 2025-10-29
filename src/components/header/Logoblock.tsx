import Image from "next/image"
import Link from "next/link"
import iconLogo from "/public/icons-header/icon-logo.svg"
import iconText from "/public/icons-header/icon-text.png"
const LogoBlock = () => {
	return (
		<Link href="/" className="flex flex-row gap-3 items-center cursor-pointer">
			<div className="relative w-10 h-8 md:w-12 md:h-10 xl:w-10 xl:h-8">
				<Image 
					src={iconLogo} alt="Логотип" fill 
					sizes='(max-width:768px) 100vw, (max-width: 1200px) 50vw, 33vw '
				/>
			</div>
			<div className='relative hidden md:block w-25 h-3'> 
				<Image 
					src={iconText} alt="Северяночка" fill 
					sizes="100px"
				/>
			</div>
		</Link>
	)
}
export default LogoBlock