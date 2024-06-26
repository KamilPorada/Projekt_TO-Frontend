import SideNavigation from '@/components/Navigation/SideNavigation'
import './globals.css'
import { Inter } from 'next/font/google'
import { ToastContainer, Zoom } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'MySQL Designer',
	description: 'Aplikacja umożliwiająca tworzenie oraz modelowanie relacyjnej bazy danych MySQL',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<script src='https://kit.fontawesome.com/1c70c2797d.js'></script>
			</head>
			<body>
				<ToastContainer draggable={false} transition={Zoom} autoClose={4000} />
				<SideNavigation />
				<main className={inter.className}>{children}</main>
			</body>
		</html>
	)
}
