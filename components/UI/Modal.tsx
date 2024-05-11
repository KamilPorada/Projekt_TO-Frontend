// Modal.js
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'

interface ModalProps {
	onClose: () => void
	onAction: () => void
	code: string
}

const Modal: React.FC<ModalProps> = ({ onClose, onAction, code }) => {
	return (
		<div className='fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-40 p-5'>
			<div className='flex flex-col justify-center items-center gap-5 bg-white w-full sm:w-1/2 lg:w-1/3 rounded-lg p-10'>
				<div className='flex flex-row justify-center items-center gap-3'>
					<h3 className='font-bold text-lg lg:text-2xl'>SQL Query</h3>
					<FontAwesomeIcon icon={faCode} className='text-2xl lg:text-3xl text-mainColor' />
				</div>
				<p
					className='text-sm lg:text-base italic font-thin whitespace-pre-line'
					dangerouslySetInnerHTML={{ __html: code }}
				/>

				<div className='flex flex-row justify-center items-center gap-4'>
					<Button onClick={onClose}>Cancel</Button>
					<Button onClick={onAction}>Execute</Button>
				</div>
			</div>
		</div>
	)
}

export default Modal
