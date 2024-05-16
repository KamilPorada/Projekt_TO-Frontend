import React from 'react'

interface TableColumn {
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

interface ColumnToUpdateItemProps {
	index: number
	columns: TableColumn[]
	columnName: string
	columnValue: string
	onInputChange: (index: number, columnName: string, columnValue: string) => void
}

const ColumnToUpdateItem: React.FC<ColumnToUpdateItemProps> = ({
	index,
	columns,
	columnName,
	columnValue,
	onInputChange,
}) => {
	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onInputChange(index, event.target.value, columnValue) 
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onInputChange(index, columnName, event.target.value)
	}

	return (
		<div className='flex flex-row justify-between items-center w-full gap-1 divek'>
			<div className='flex flex-col w-full text-sm'>
				<label>Column name:</label>
				<select
					value={columnName}
					onChange={handleSelectChange}
					className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'>
					<option value=''>Column</option>
					{columns.map((column, idx) => (
						<option key={idx} value={column.fieldName}>
							{column.fieldName}
						</option>
					))}
				</select>
			</div>
			<div className='flex flex-col w-full text-sm'>
				<label>New Value:</label>
				<input
					type='text'
					value={columnValue}
					onChange={handleInputChange}
					className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'
				/>
			</div>
		</div>
	)
}

export default ColumnToUpdateItem
