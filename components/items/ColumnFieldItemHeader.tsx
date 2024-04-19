import React from 'react'

function ColumnFieldItemHeader() {
	return (
		<>
			<div className='flex w-[640px] mb-2'>
				<div className='flex flex-row justify-between items-center w-full h-full text-sm'>
					<p className='w-28 mr-2 border-r border-black'>Column Name</p>
					<p className='w-36 mr-2 border-r border-black'>Datatype</p>
                    <p className='w-96 border-r border-black'>Additional parameters</p>
				</div>
			</div>
		</>
	)
}

export default ColumnFieldItemHeader
