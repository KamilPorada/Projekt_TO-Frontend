// import Navigation from '@/components/Navigation'
import './globals.css'
import { Inter } from 'next/font/google'

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
				{/* <Navigation/> */}
				<main className={inter.className}>{children}</main>
			</body>
		</html>
	)
}
