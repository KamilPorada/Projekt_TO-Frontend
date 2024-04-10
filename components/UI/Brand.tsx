import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNodes } from '@fortawesome/free-solid-svg-icons'

const Brand = () => {
	return (
		<div className='flex flex-col justify-start items-start transform translate-x-1/4 mb-5'>
			<FontAwesomeIcon icon={faCircleNodes} className='text-4xl md:text-5xl text-mainColor' />
            <p className='mt-2 text-xl md:text-2xl font-semibold text-white'>MySQL</p>
            <p className='text-xl md:text-2xl font-semibold text-white transform translate-x-1/4'>Designer</p>
		</div>
	)
}

export default Brand
