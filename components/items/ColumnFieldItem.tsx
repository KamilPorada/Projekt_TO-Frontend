import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faCircle, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

interface Props {
	width: number
	column: {
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
	}
	removable: boolean
	onDelete: () => void
	onEdit: () => void
}

const ColumnFieldItem: React.FC<Props> = ({ column, width, onDelete, removable, onEdit }) => {
	const fieldType =
		column.fieldType === 'decimal'
			? 'decimal(' + column.fieldSize1 + ',' + column.fieldSize2 + ')'
			: column.fieldType === 'varchar'
			? 'varchar(' + column.fieldSize1 + ')'
			: column.fieldType === 'char'
			? 'char(' + column.fieldSize1 + ')'
			: column.fieldType
	const additionalParametersString =
		(column.isPrimaryKey ? 'PRIMARY KEY,' : '') +
		(column.isAutoincrement ? ' AUTO INCREMENT,' : '') +
		(column.isForeignKey ? ` FOREIGN KEY(${column.foreignTable} -> ${column.foreignField}),` : '') +
		(column.isUnique ? ' UNIQUE,' : '') +
		(column.isNotNull ? ' NOT NULL' : '')

	const handleDeleteClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation()
		onDelete()
	}

	return (
		<div
			className={`flex flex-row justify-between items-center w-[${width}px] border-b overflow-x-auto font-thin mt-1`}>
			<div className='flex flex-row justify-between items-center w-full h-full'>
				<div className='flex flex-row justify-center items-center gap-2 w-24'>
					<FontAwesomeIcon
						icon={column.isPrimaryKey || column.isForeignKey ? faKey : faCircle}
						className={`${
							!column.isPrimaryKey && !column.isForeignKey
								? 'text-blue-400'
								: column.isPrimaryKey
								? 'text-mainColor'
								: 'text-purple-500'
						} ${!column.isPrimaryKey && !column.isForeignKey ? 'text-[8px]' : ''} w-4`}
					/>
					<p className='text-black text-sm w-24'>{column.fieldName}</p>
				</div>
				<p className='w-32 mr-2 text-sm uppercase'>{fieldType}</p>
				<p className='w-96 text-sm'>{additionalParametersString}</p>
				<div onClick={onEdit} className={`${removable ? 'block' : 'hidden'}`}>
					<FontAwesomeIcon icon={faPenToSquare} className='text-blue-500 w-4 cursor-pointer' />
				</div>
				<div onClick={handleDeleteClick} className={`${removable ? 'block' : 'hidden'} mx-1`}>
					<FontAwesomeIcon icon={faTrash} className='text-red-700 w-4 cursor-pointer' />
				</div>
			</div>
		</div>
	)
}

export default ColumnFieldItem
