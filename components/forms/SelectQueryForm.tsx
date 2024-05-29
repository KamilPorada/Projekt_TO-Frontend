'use client'
import React, { useState, useEffect } from 'react'
import Button from '../UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'
import ColumnToWhereStatementItem from '../Items/ColumnToWhereStatement'
import Modal from '../UI/Modal'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

const SelectQueryForm: React.FC = () => {
	const [tableName, setTableName] = useState<string>('')
	const [tables, setTables] = useState<string[]>([])
	const [columnNames, setColumnNames] = useState<string[]>([])
	const [selectedTableColumns, setSelectedTableColumns] = useState<TableColumn[]>([])
	const [selectedWhereTableColumns, setWhereSelectedTableColumns] = useState<TableColumn[]>([])

	const initialColumnValues = [{ columnName: '', columnValue: '' }]
	const [columnValues, setColumnValues] = useState(initialColumnValues)
	const initialWhereStatementValues = [{ whereColumnName: '', whereColumnSign: '', whereColumnValue: '' }]
	const [whereStatementValues, setWhereStatementValues] = useState(initialWhereStatementValues)
	const [whereColumnOperatorValue, setWhereColumnOperatorValue] = useState([{ whereOperator: '' }])

	const [isOperator, setIsOperator] = useState<boolean>(true)
	const [selectedColumns, setSelectedColumns] = useState<string[]>([])

	const [limit, setLimit] = useState<string | number>('')

	const [orderBy, setOrderBy] = useState<string>('none')

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [sqlCode, setSqlCode] = useState(``)

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

	const handleModalOpen = () => {
		setIsModalOpen(true)
	}

	const handleModalClose = () => {
		setIsModalOpen(false)
	}

	const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedTableName = event.target.value
		const selectedTable = dummyTables.find(table => table.name === selectedTableName)

		if (selectedTable) {
			const filteredColumns = selectedTable.columns.filter(
				column => !(column.fieldType === 'integer' && column.isPrimaryKey && column.isAutoincrement)
			)

			setTableName(selectedTableName)
			setSelectedTableColumns(filteredColumns)
			setWhereSelectedTableColumns(selectedTable.columns)
			resetFormFields()
		}
	}

	const resetFormFields = () => {
		setSelectedColumns([])
		setColumnValues(initialColumnValues)
		setWhereStatementValues(initialWhereStatementValues)
		setWhereColumnOperatorValue([{ whereOperator: '' }])
		setIsOperator(true)
		setLimit('')
		setOrderBy('none')
	}

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = event.target
		if (value === '*') {
			if (checked) {
				setSelectedColumns(['*'])
			} else {
				setSelectedColumns([])
			}
		} else {
			if (checked) {
				setSelectedColumns(prev => [...prev, value])
			} else {
				setSelectedColumns(prev => prev.filter(column => column !== value))
			}
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
		if (columnValues.length < selectedTableColumns.length + 1) {
			setColumnValues([...columnValues, { columnName: '', columnValue: '' }])
		}

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

	const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value === '' ? '' : parseInt(event.target.value, 10)
		setLimit(value)
	}

	const handleOrderByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setOrderBy(event.target.value)
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
			selectedColumns: selectedColumns,
			whereStatementValues: cleanWhereStatementValues,
			whereColumnOperatorValue: cleanWhereColumnOperatorValue,
			limit: limit === '' ? 'none' : limit,
			orderBy: orderBy,
		}

		console.log('Data to send:', dataToSend)
		try {
			const response = await fetch('/api/select', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(dataToSend),
			})

			if (response.ok) {
				const responseData = await response.json()
				setSqlCode(responseData.response)
				handleModalOpen()
			} else {
				console.error('Error sending data:', response.statusText)
			}
		} catch (error) {
			console.error('Error sending data:', error)
		}
	}

	const handleExecute = async () => {
		toast.success('The operation was executed successfully!', {
			position: 'top-center',
		})

		try {
			const acceptResponse = await fetch('http://localhost:8000/db/newsql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(sqlCode),
			})

			if (acceptResponse.ok) {
				console.log('Sql code sent successfully')
				handleModalClose()
			} else {
				console.error('Failed to send sql code')
				//obsługa w przypadku błędu tj. czerwony sql a poniżej błąd z mysql jak będzie połączenie to ddorobie
			}
		} catch (error) {
			console.error('Error sending sql code:', error)
		}
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

	useEffect(() => {
		fetch('http://localhost:8000/db/tablesname')
			.then(response => response.json())
			.then(data => setTables(data))
			.catch(error => {
				console.error('Error fetching table names:', error)
			})
	}, [])

	useEffect(() => {
		fetch(`http://localhost:8000/db/fieldsname?tablename=${tableName}`)
			.then(response => response.json())
			.then(data => {
				setColumnNames(data)
			})
			.catch(error => {
				console.error('Error fetching column names:', error)
			})
	}, [tables])

	return (
		<>
			<div className='flex flex-col justify-center items-center w-full sm:w-4/5 md:w-3/5 lg:w-1/2 bg-white rounded-md shadow-lg p-5'>
				<div className='flex flex-col justify-center items-center text-center'>
					<div className='flex flex-row justify-center items-center gap-4 text-mainColor mb-2'>
						<h2 className='text-xl md:text-2xl uppercase font-semibold'>Select Query</h2>
						<FontAwesomeIcon icon={faPenToSquare} className='text-2xl md:text-3xl text-shadow' />
					</div>
					<h3 className='text-sm md:text-base font-semibold'>Select Rows</h3>
					<p className='text-sm md:text-base font-thin'>Fill in the values for the row to be selected</p>
				</div>
				<div className='flex flex-col w-full mt-3 text-sm'>
					<label>Select Table:</label>
					<select
							value={tableName}
							onChange={handleTableChange}
							className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'>
							<option value=''>Select table...</option>
							{tables.map((table, idx) => (
								<option key={idx} value={table}>
									{table}
								</option>
							))}
						</select>
				</div>
				{tableName && (
					<>
						<div className='flex flex-row justify-between items-center w-full my-2'>
							<p className='text-sm'>Columns to select:</p>
						</div>
						<div className='flex flex-col w-full my-1 text-sm'>
							<label className='flex items-center'>
								<input
									type='checkbox'
									value='*'
									checked={selectedColumns.includes('*')}
									onChange={handleCheckboxChange}
									className='mr-2'
								/>
								ALL (*)
							</label>
							{selectedTableColumns.map((column, index) => (
								<label key={index} className='flex items-center'>
									<input
										type='checkbox'
										value={column.fieldName}
										checked={selectedColumns.includes(column.fieldName)}
										onChange={handleCheckboxChange}
										className='mr-2'
									/>
									{column.fieldName}
								</label>
							))}
						</div>

						<div className='flex flex-col w-full my-2 text-sm'>
							<div className='flex flex-row justify-between items-center w-full my-2'>
								<p className='text-sm'>Columns for where statement:</p>
								<Button
									className='flex justify-center items-center px-3 mx-0'
									disabled={columnValues.length == selectedTableColumns.length + 1}
									onClick={handleAddWhereField}>
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
						<div className='flex flex-col w-full my-2 text-sm'>
							<label htmlFor='limit'>Limit:</label>
							<input
								type='number'
								id='limit'
								value={limit}
								onChange={handleLimitChange}
								className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'
							/>
						</div>
						<div className='flex flex-col w-full my-2 text-sm'>
							<label>Order By:</label>
							<label className='flex items-center'>
								<input
									type='radio'
									name='orderBy'
									value='none'
									checked={orderBy === 'none'}
									onChange={handleOrderByChange}
									className='mr-2'
								/>
								None
							</label>
							<label className='flex items-center'>
								<input
									type='radio'
									name='orderBy'
									value='asc'
									checked={orderBy === 'asc'}
									onChange={handleOrderByChange}
									className='mr-2'
								/>
								Ascending
							</label>
							<label className='flex items-center'>
								<input
									type='radio'
									name='orderBy'
									value='desc'
									checked={orderBy === 'desc'}
									onChange={handleOrderByChange}
									className='mr-2'
								/>
								Descending
							</label>
						</div>
					</>
				)}
				<Button className='w-full mt-5' disabled={!isOperator} onClick={handleSubmit}>
					Select Rows
				</Button>
			</div>
			{isModalOpen && <Modal onAction={handleExecute} onClose={handleModalClose} code={sqlCode} />}
		</>
	)
}

export default SelectQueryForm
