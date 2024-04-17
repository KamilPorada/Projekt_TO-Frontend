import DatabaseConnectionForm from '@/components/forms/DatabaseConnectionForm'
import HeroDatabase from '../public/img/hero-database.png'

const Home = () => {
	return (
		<div className='container flex justify-center items-center w-screen h-screen'>
			<DatabaseConnectionForm />
		</div>
	)
}

export default Home
