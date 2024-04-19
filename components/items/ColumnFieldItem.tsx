import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faCircle } from '@fortawesome/free-solid-svg-icons'

interface Props {
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
	}
}

const ColumnFieldItem: React.FC<Props> = ({ column }) => {
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

	return (
		<div className='flex flex-row justify-between items-center w-[640px] border-b overflow-x-auto font-thin'>
			<div className='flex flex-row justify-between items-center w-full h-full'>
				<div className='flex flex-row justify-center items-center gap-2 w-28 mr-2'>
					<FontAwesomeIcon
						icon={column.isPrimaryKey || column.isForeignKey ? faKey : faCircle}
						className={`${
							!column.isPrimaryKey && !column.isForeignKey
								? 'text-blue-400'
								: column.isPrimaryKey
								? 'text-mainColor'
								: 'text-red-600'
						} ${!column.isPrimaryKey && !column.isForeignKey ? 'text-[8px]' : ''} w-4`}
					/>
					<p className='text-black text-sm w-24'>{column.fieldName}</p>
				</div>
				<p className='w-36 mr-2 text-sm'>{fieldType}</p>
				<p className='w-96 text-sm'>{additionalParametersString}</p>
			</div>
		</div>
	)
}

export default ColumnFieldItem
