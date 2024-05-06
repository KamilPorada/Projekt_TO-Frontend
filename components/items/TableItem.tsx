import { useState } from 'react'
import ColumnFieldItem from './ColumnFieldItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import Button from '../UI/Button'

const TableItem: React.FC<{
	name: string
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
						<p>{props.name}</p>
					</div>
					<div className='flex flex-row gap-3'>
						<FontAwesomeIcon
							icon={faPenToSquare}
							className='text-xl hover:text-secondaryColor transition-colors cursor-pointer'
							onClick={() => props.handleEdit(props.name)}
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
						<ColumnFieldItem key={index} column={column} width={500} removable={false}  onDelete={() => null} />
					))}
				</div>
			</div>
			{showModal && (
				<div className='fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50'>
					<div className='bg-white p-4 rounded w-3/4 sm:w-auto'>
						<p className='text-black font-semibold'>Czy na pewno chcesz usunąć tę tabelę?</p>
						<div className='flex justify-end mt-4'>
							<Button className='' onClick={handleConfirmDelete}>
								Tak
							</Button>
							<Button className='' onClick={handleCancelDelete}>
								Nie
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default TableItem
