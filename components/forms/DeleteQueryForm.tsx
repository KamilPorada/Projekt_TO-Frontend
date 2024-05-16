'use client'
import React, { useState, useEffect } from 'react'
import Button from '../UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import ColumnToWhereStatementItem from '../Items/ColumnToWhereStatement'

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

interface Table {
	name: string
	columns: TableColumn[]
}

const DeleteQueryForm: React.FC = () => {
	const [tableName, setTableName] = useState<string>('')
	const [selectedWhereTableColumns, setWhereSelectedTableColumns] = useState<TableColumn[]>([])

	const initialWhereStatementValues = [{ whereColumnName: '', whereColumnSign: '', whereColumnValue: '' }]
	const [whereStatementValues, setWhereStatementValues] = useState(initialWhereStatementValues)
	const [whereColumnOperatorValue, setWhereColumnOperatorValue] = useState([{ whereOperator: '' }])

	const [isOperator, setIsOperator] = useState<boolean>(true)

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
					editMode: 0,
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
					editMode: 0,
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
					editMode: 0,
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
					editMode: 0,
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
					editMode: 0,
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
					editMode: 0,
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
					editMode: 0,
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
					editMode: 0,
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
					editMode: 0,
				},
			],
		},
	]

	const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedTableName = event.target.value
		const selectedTable = dummyTables.find(table => table.name === selectedTableName)

		if (selectedTable) {
			setTableName(selectedTableName)
			setWhereSelectedTableColumns(selectedTable.columns)
		}
	}

	const handleWhereInputChange = (
		index: number,
		whereColumnName: string,
		whereColumnSign: string,
		whereColumnValue: string
	) => {
		const newInputSelectValues = [...whereStatementValues]
		newInputSelectValues[index] = { whereColumnName, whereColumnSign, whereColumnValue }
		setWhereStatementValues(newInputSelectValues)
	}

	const handleAddWhereField = () => {
		if (!isOperator) {
			setWhereStatementValues([
				...whereStatementValues,
				{ whereColumnName: '', whereColumnSign: '', whereColumnValue: '' },
			])
		} else {
			setWhereColumnOperatorValue([...whereColumnOperatorValue, { whereOperator: '' }])
		}
		setIsOperator(prev => !prev)
	}

	const handleWhereOperatorChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
		const { value } = event.target
		const newWhereColumnOperatorValue = [...whereColumnOperatorValue]
		newWhereColumnOperatorValue[index] = { whereOperator: value }
		setWhereColumnOperatorValue(newWhereColumnOperatorValue)
	}

	const handleSubmit = async () => {
		const cleanWhereStatementValues = whereStatementValues.filter(value => {
			return value.whereColumnName !== '' || value.whereColumnSign !== '' || value.whereColumnValue !== ''
		})

		const cleanWhereColumnOperatorValue = whereColumnOperatorValue.filter(value => {
			return value.whereOperator !== ''
		})

		const dataToSend = {
			tableName: tableName,
			whereStatementValues: cleanWhereStatementValues,
			whereColumnOperatorValue: cleanWhereColumnOperatorValue,
		}

		console.log(dataToSend)

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

	useEffect(() => {
		if (isOperator) {
			setWhereColumnOperatorValue([...whereColumnOperatorValue, { whereOperator: '' }])
		} else {
			setWhereStatementValues([
				...whereStatementValues,
				{ whereColumnName: '', whereColumnSign: '', whereColumnValue: '' },
			])
		}
	}, [isOperator])

	return (
		<div className='flex flex-col justify-center items-center w-full sm:w-4/5 md:w-3/5 lg:w-1/2 bg-white rounded-md shadow-lg p-5'>
			<div className='flex flex-col justify-center items-center text-center'>
				<div className='flex flex-row justify-center items-center gap-4 text-mainColor mb-2'>
					<h2 className='text-xl md:text-2xl uppercase font-semibold'>Delete Query</h2>
					<FontAwesomeIcon icon={faTrash} className='text-2xl md:text-3xl text-shadow' />
				</div>
				<h3 className='text-sm md:text-base font-semibold'>Delete Row</h3>
				<p className='text-sm md:text-base font-thin'>Fill in the values for the row to be deleted</p>
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
					<div className='flex flex-col w-full my-2 text-sm'>
						<div className='flex flex-row justify-between items-center w-full my-2'>
							<p className='text-sm'>Columns to where statement:</p>
							<Button className='flex justify-center items-center px-3 mx-0' onClick={handleAddWhereField}>
								<FontAwesomeIcon className='text-xs' icon={faPlus} />
							</Button>
						</div>
					</div>
					{whereStatementValues.map((value, index) => (
						<div key={index} className='w-full'>
							{index % 2 === 0 ? (
								<ColumnToWhereStatementItem
									index={index}
									columns={selectedWhereTableColumns}
									whereColumnName={value.whereColumnName}
									whereColumnSign={value.whereColumnSign}
									whereColumnValue={value.whereColumnValue}
									onInputChange={handleWhereInputChange}
								/>
							) : (
								<div key={index} className='flex flex-col justify-start w-full mt-2'>
									<p className='text-sm text-left'>Logical operator:</p>
									<select
										value={whereColumnOperatorValue[index - 1].whereOperator}
										onChange={event => handleWhereOperatorChange(event, index - 1)}
										className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md text-sm focus:outline-mainColor w-1/3'>
										<option value=''>Select operator</option>
										<option value='and'>AND</option>
										<option value='or'>OR</option>
									</select>
								</div>
							)}
						</div>
					))}
				</>
			)}
			<Button className='w-full mt-5' disabled={!isOperator} onClick={handleSubmit}>
				Delete Row
			</Button>
		</div>
	)
}

export default DeleteQueryForm
