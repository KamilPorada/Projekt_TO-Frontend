import { useState } from 'react'
import ColumnFieldItem from './ColumnFieldItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faPenToSquare, faTrash, faCode } from '@fortawesome/free-solid-svg-icons'
import Button from '../UI/Button'

const TableItem: React.FC<{
	tableName: string
	columns: {
		fieldName: string
		fieldType: string
		fieldSize1: number
		fieldSize2: number
		isPrimaryKey: boolean
		isForeignKey: boolean
		foreignTable: string
		foreignField: string
		isAutoincrement: boolean
		isUnique: boolean
		isNotNull: boolean
		editMode: number
	}[]
	handleDelete: () => Promise<void>
	handleEdit: (tableName: string) => void
}> = props => {
	const [showModal, setShowModal] = useState(false)

	const handleDeleteClick = async () => {
		setShowModal(true)
	}

	const handleConfirmDelete = async () => {
		await props.handleDelete()
		setShowModal(false)
	}

	const handleCancelDelete = () => {
		setShowModal(false)
	}

	return (
		<>
			<div className='flex flex-col justify-center items-center bg-white rounded-md overflow-hidden'>
				<div className='flex flex-row justify-between items-center gap-3 w-full bg-mainColor p-2 text-white'>
					<div className='flex flex-row gap-3'>
						<FontAwesomeIcon icon={faTable} className='text-xl' />
						<p>{props.tableName}</p>
					</div>
					<div className='flex flex-row gap-3'>
						<FontAwesomeIcon
							icon={faPenToSquare}
							className='text-xl hover:text-secondaryColor transition-colors cursor-pointer'
							onClick={() => props.handleEdit(props.tableName)}
						/>
						<FontAwesomeIcon
							icon={faTrash}
							className='text-xl hover:text-secondaryColor transition-colors cursor-pointer'
							onClick={handleDeleteClick}
						/>
					</div>
				</div>
				<div className='flex flex-col justify-center items-center p-2'>
					{props.columns.map((column, index) => (
						<ColumnFieldItem
							key={index}
							column={column}
							width={500}
							removable={false}
							onDelete={() => null}
							onEdit={() => null}
						/>
					))}
				</div>
			</div>
			{showModal && (
				<div className='fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50'>
					<div className='bg-white p-4 rounded w-3/4 sm:w-auto'>
						<div className='flex flex-row justify-center items-center gap-3'>
							<h3 className='font-bold text-lg lg:text-2xl'>SQL Query</h3>
							<FontAwesomeIcon icon={faCode} className='text-2xl lg:text-3xl text-mainColor' />
						</div>
						<p
							className='text-sm lg:text-base italic font-thin whitespace-pre-line my-3 text-center'
							dangerouslySetInnerHTML={{ __html: `DROP TABLE IF EXISTS ${props.tableName};` }}
						/>
						<div className='flex justify-center mt-4'>
							<Button onClick={handleCancelDelete}>Cancel</Button>
							<Button onClick={handleConfirmDelete}>Execute</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default TableItem
