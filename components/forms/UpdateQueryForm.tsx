'use client'
import React, { useState } from 'react'
import Button from '../UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

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
}

interface Table {
	name: string
	columns: TableColumn[]
}

const UpdateQueryForm: React.FC = () => {
	const [tableName, setTableName] = useState<string>('')
	const [selectedTableColumns, setSelectedTableColumns] = useState<TableColumn[]>([])
	const [updateColumnName, setUpdateColumnName] = useState<string>('')
	const [updateColumnValue, setUpdateColumnValue] = useState<string>('')
	const [whereColumnName, setWhereColumnName] = useState<string>('')
	const [whereColumnValue, setWhereColumnValue] = useState<string>('')

	const dummyTables: Table[] = [
		{
			name: 'users',
			columns: [
				{
					fieldName: 'id',
					fieldType: 'integer',
					fieldSize1: 0,
					fieldSize2: 0,
					isPrimaryKey: true,
					isForeignKey: false,
					foreignTable: '',
					foreignField: '',
					isAutoincrement: true,
					isUnique: true,
					isNotNull: true,
				},
				{
					fieldName: 'username',
					fieldType: 'varchar',
					fieldSize1: 50,
					fieldSize2: 0,
					isPrimaryKey: false,
					isForeignKey: false,
					foreignTable: '',
					foreignField: '',
					isAutoincrement: false,
					isUnique: false,
					isNotNull: true,
				},
				{
					fieldName: 'email',
					fieldType: 'varchar',
					fieldSize1: 100,
					fieldSize2: 0,
					isPrimaryKey: false,
					isForeignKey: false,
					foreignTable: '',
					foreignField: '',
					isAutoincrement: false,
					isUnique: true,
					isNotNull: true,
				},
			],
		},
		{
			name: 'products',
			columns: [
				{
					fieldName: 'id',
					fieldType: 'integer',
					fieldSize1: 0,
					fieldSize2: 0,
					isPrimaryKey: true,
					isForeignKey: false,
					foreignTable: '',
					foreignField: '',
					isAutoincrement: true,
					isUnique: true,
					isNotNull: true,
				},
				{
					fieldName: 'name',
					fieldType: 'varchar',
					fieldSize1: 100,
					fieldSize2: 0,
					isPrimaryKey: false,
					isForeignKey: false,
					foreignTable: '',
					foreignField: '',
					isAutoincrement: false,
					isUnique: false,
					isNotNull: true,
				},
				{
					fieldName: 'price',
					fieldType: 'decimal',
					fieldSize1: 10,
					fieldSize2: 2,
					isPrimaryKey: false,
					isForeignKey: false,
					foreignTable: '',
					foreignField: '',
					isAutoincrement: false,
					isUnique: false,
					isNotNull: true,
				},
			],
		},
		{
			name: 'orders',
			columns: [
				{
					fieldName: 'id',
					fieldType: 'integer',
					fieldSize1: 0,
					fieldSize2: 0,
					isPrimaryKey: true,
					isForeignKey: false,
					foreignTable: '',
					foreignField: '',
					isAutoincrement: true,
					isUnique: true,
					isNotNull: true,
				},
				{
					fieldName: 'product_id',
					fieldType: 'integer',
					fieldSize1: 0,
					fieldSize2: 0,
					isPrimaryKey: false,
					isForeignKey: true,
					foreignTable: 'products',
					foreignField: 'id',
					isAutoincrement: false,
					isUnique: false,
					isNotNull: true,
				},
				{
					fieldName: 'quantity',
					fieldType: 'integer',
					fieldSize1: 0,
					fieldSize2: 0,
					isPrimaryKey: false,
					isForeignKey: false,
					foreignTable: '',
					foreignField: '',
					isAutoincrement: false,
					isUnique: false,
					isNotNull: true,
				},
			],
		},
	]

	const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedTableName = event.target.value
		const selectedTable = dummyTables.find(table => table.name === selectedTableName)
		if (selectedTable) {
			setTableName(selectedTableName)
			setSelectedTableColumns(selectedTable.columns)
			setUpdateColumnName('')
			setUpdateColumnValue('')
			setWhereColumnName('')
			setWhereColumnValue('')
		}
	}

	const handleUpdateColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setUpdateColumnName(event.target.value)
	}

	const handleUpdateValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUpdateColumnValue(event.target.value)
	}

	const handleWhereColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setWhereColumnName(event.target.value)
	}

	const handleWhereValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setWhereColumnValue(event.target.value)
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = {
			tableName: tableName,
			tableColumn: updateColumnName,
			updateValue: updateColumnValue,
			whereStatement: {
				whereColumn: whereColumnName,
				whereValue: whereColumnValue,
			},
		}

		console.log('Sending data to server:', data)

		// try {
		// 	const response = await fetch('YOUR_API_ENDPOINT', {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 		body: JSON.stringify(data),
		// 	})

		// 	if (response.ok) {
		// 		console.log('Data sent successfully')
		// 	} else {
		// 		console.error('Failed to send data')
		// 	}
		// } catch (error) {
		// 	console.error('Error sending data:', error)
		// }
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col justify-center items-center w-full sm:w-4/5 md:w-3/5 lg:w-1/2 bg-white rounded-md shadow-lg p-5'>
			<div className='flex flex-col justify-center items-center text-center'>
				<div className='flex flex-row justify-center items-center gap-4 text-mainColor mb-2'>
					<h2 className='text-xl md:text-2xl uppercase font-semibold'>Update Query</h2>
					<FontAwesomeIcon icon={faPenToSquare} className='text-2xl md:text-3xl text-shadow' />
				</div>
				<h3 className='text-sm md:text-base font-semibold'>Update Row</h3>
				<p className='text-sm md:text-base font-thin'>Fill in the values for the row to be updated</p>
			</div>
			<div className='flex flex-col w-full mt-3 text-sm'>
				<label>Select Table:</label>
				<select
					value={tableName}
					onChange={handleTableChange}
					className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'>
					<option value=''>Table</option>
					{dummyTables.map(table => (
						<option key={table.name} value={table.name}>
							{table.name}
						</option>
					))}
				</select>
			</div>
			{tableName && (
				<>
					<div className='flex flex-col w-full mt-3 text-sm'>
						<label>Select Column to Update:</label>
						<select
							value={updateColumnName}
							onChange={handleUpdateColumnChange}
							className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'>
							<option value=''>Column</option>
							{selectedTableColumns.map(column => (
								<option key={column.fieldName} value={column.fieldName}>
									{column.fieldName}
								</option>
							))}
						</select>
					</div>
					<div className='flex flex-col w-full mt-3 text-sm'>
						<label>New Value:</label>
						<input
							type='text'
							value={updateColumnValue}
							onChange={handleUpdateValueChange}
							className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'
						/>
					</div>
					<div className='flex flex-col w-full mt-3 text-sm'>
						<p>Where Statement:</p>
						<div className='flex flex-col w-full mt-3 text-sm'>
							<label>Select Column for Where Statement:</label>
							<select
								value={whereColumnName}
								onChange={handleWhereColumnChange}
								className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'>
								<option value=''>Column</option>
								{selectedTableColumns.map(column => (
									<option key={column.fieldName} value={column.fieldName}>
										{column.fieldName}
									</option>
								))}
							</select>
						</div>
						<div className='flex flex-col w-full mt-3 text-sm'>
							<label>Where Value:</label>
							<input
								type='text'
								value={whereColumnValue}
								onChange={handleWhereValueChange}
								className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'
							/>
						</div>{' '}
					</div>
				</>
			)}
			<Button className='w-full mt-10'>Update Row</Button>
		</form>
	)
}

export default UpdateQueryForm
