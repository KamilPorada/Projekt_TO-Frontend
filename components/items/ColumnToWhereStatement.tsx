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

interface ColumnToWhereStatementItemProps {
	index: number
	columns: TableColumn[]
	whereColumnName: string
	whereColumnSign: string
	whereColumnValue: string
	onInputChange: (index: number, whereColumnName: string, whereColumnSign: string, whereColumnValue: string) => void
}

const ColumnToWhereStatementItem: React.FC<ColumnToWhereStatementItemProps> = ({
	index,
	columns,
	whereColumnName,
	whereColumnSign,
	whereColumnValue,
	onInputChange,
}) => {
	const handleWhereColumnNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onInputChange(index, event.target.value, whereColumnSign, whereColumnValue)
	}

	const handleWhereColumnSignChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onInputChange(index, whereColumnName, event.target.value, whereColumnValue)
	}

	const handleWhereColumnValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onInputChange(index, whereColumnName, whereColumnSign, event.target.value)
	}

	return (
		<div className='flex flex-row justify-between items-center w-full gap-1'>
			<div className='flex flex-col w-full text-sm'>
				<label>Column name:</label>
				<select
					value={whereColumnName}
					onChange={handleWhereColumnNameChange}
					className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'>
					<option value=''>Column</option>
					{columns.map(column => (
						<option key={column.fieldName} value={column.fieldName}>
							{column.fieldName}
						</option>
					))}
				</select>
			</div>
			<div className='flex flex-col w-full text-sm'>
				<label>Sign:</label>
				<select
					value={whereColumnSign}
					onChange={handleWhereColumnSignChange}
					className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'>
					<option value=''>Select Sign</option>
					<option value='=='>{'=='}</option>
					<option value='!='>{'!='}</option>
					<option value='>'>{'>'}</option>
					<option value='>='>{'>='}</option>
					<option value='<'>{'<'}</option>
					<option value='<='>{'<='}</option>
				</select>
			</div>
			<div className='flex flex-col w-full text-sm'>
				<label>Where Value:</label>
				<input
					type='text'
					value={whereColumnValue}
					onChange={handleWhereColumnValueChange}
					className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'
				/>
			</div>{' '}
		</div>
	)
}

export default ColumnToWhereStatementItem
