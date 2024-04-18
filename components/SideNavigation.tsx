'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faDatabase, faTable, faFileCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import Brand from './UI/Brand'

function SideBar() {
	const [isMenuVisible, setIsMenuVisible] = useState(true)

	const currentYear = new Date().getFullYear()

	const handleMenuButton = () => {
		setIsMenuVisible(true)
	}

	const handleXButton = () => {
		setIsMenuVisible(false)
	}

	return (
		<>
			<div
				className='fixed top-5 left-2 flex flex-row justify-around items-center w-[100px] px-1/5 uppercase bg-secondaryColor text-white rounded-md cursor-pointer z-20'
				onClick={handleMenuButton}>
				<FontAwesomeIcon icon={faBars} />
				<p className='hamburger-menu__text'>menu</p>
			</div>
			<nav
				className={`fixed top-0 bottom-0 flex flex-col justify-start w-[200px] sm:w-[220px] h-screen pt-14 px-2 bg-secondaryColor transform transition-transform duration-300 z-30  ${
					isMenuVisible ? 'translate-x-0' : '-translate-x-full'
				}`}>
				<div className='absolute top-5 left-5 text-white cursor-pointer' onClick={handleXButton}>
					<FontAwesomeIcon icon={faXmark} />
				</div>

				<div className='flex flex-col space-y-2 mt-5 px-1'>
					<Brand />
					<Link href={'/'}>
						<div className='flex flex-row justify-between items-center mt-2 text-white font-thin cursor-pointer transition hover:text-mainColor hover:font-normal'>
							<p className='text-sm md:text-base'>Baza danych</p>
							<FontAwesomeIcon icon={faDatabase} />
						</div>
					</Link>
					<div className='h-px w-full bg-zinc-600'></div>
					<Link href={'/table'}>
						<div className='flex flex-row justify-between items-center mt-2 text-white font-thin cursor-pointer transition hover:text-mainColor hover:font-normal'>
							<p className='text-sm md:text-base'>Tabela</p>
							<FontAwesomeIcon icon={faTable} />
						</div>
					</Link>
					<div className='h-px w-full bg-zinc-600'></div>
					<Link href={'/operation'}>
						<div className='flex flex-row justify-between items-center mt-2 text-white font-thin cursor-pointer transition hover:text-mainColor hover:font-normal'>
							<p className='text-sm md:text-base'>Operacja</p>
							<FontAwesomeIcon icon={faFileCircleQuestion} />
						</div>
					</Link>
					<div className='h-px w-full bg-zinc-600'></div>
				</div>
				<footer className='absolute bottom-0 w-full -mx-2 mb-2 flex flex-col text-center text-white text-xs sm:text-sm font-light'>
					<p>&copy; {currentYear} MySQL Designer</p>
					<p>Wszelkie prawa zastrzeżone</p>
				</footer>
			</nav>
		</>
	)
}

export default SideBar
