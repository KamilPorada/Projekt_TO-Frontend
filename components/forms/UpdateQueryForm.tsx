'use client'
import React, { useState, useEffect } from 'react'
import Button from '../UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'
import ColumnToUpdateItem from '../Items/ColumnToUpdateItem'
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

const UpdateQueryForm: React.FC = () => {
	const [tableName, setTableName] = useState<string>('')
	const [tables, setTables] = useState<string[]>([])
	const [selectedTable, setSelectedTable] = useState<Table | undefined>()
	const [selectedTableColumns, setSelectedTableColumns] = useState<TableColumn[]>([])
	const [selectedWhereTableColumns, setWhereSelectedTableColumns] = useState<TableColumn[]>([])

	const initialColumnValues = [{ columnName: '', columnValue: '' }]
	const [columnValues, setColumnValues] = useState(initialColumnValues)
	const initialWhereStatementValues = [{ whereColumnName: '', whereColumnSign: '', whereColumnValue: '' }]
	const [whereStatementValues, setWhereStatementValues] = useState(initialWhereStatementValues)
	const [whereColumnOperatorValue, setWhereColumnOperatorValue] = useState([{ whereOperator: '' }])

	const [isOperator, setIsOperator] = useState<boolean>(true)

	const [numbersOfColumnToShow, setNumbersOfColumnToShow] = useState<number>(1)

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [sqlCode, setSqlCode] = useState(``)

	const handleModalOpen = () => {
		setIsModalOpen(true)
	}

	const handleModalClose = () => {
		setIsModalOpen(false)
	}

	const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedTableName = event.target.value

		fetch(`http://localhost:8000/db/fields?tablename=${selectedTableName}`)
			.then(response => response.json())
			.then(data => {
				setSelectedTable(data)
			})
			.catch(error => {
				console.error('Error fetching column names:', error)
			})

		console.log(selectedTableName)
		console.log(selectedTable)

		const filteredColumns = selectedTable?.columns.filter(
			column => !(column.fieldType === 'INTEGER' && column.isPrimaryKey && column.isAutoincrement)
		)

		setTableName(selectedTableName)
		setSelectedTableColumns(filteredColumns || [])
		setWhereSelectedTableColumns(selectedTable?.columns || [])
		if (filteredColumns) setNumbersOfColumnToShow(filteredColumns.length)

		resetFormFields()
	}

	const resetFormFields = () => {
		setSelectedTableColumns([])
		setColumnValues(initialColumnValues)
		setWhereStatementValues(initialWhereStatementValues)
		setWhereColumnOperatorValue([{ whereOperator: '' }])
		setIsOperator(true)
	}

	const handleInputChange = (index: number, columnName: string, columnValue: string) => {
		const newInputSelectValues = [...columnValues]
		newInputSelectValues[index] = { columnName, columnValue }
		setColumnValues(newInputSelectValues)
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

	const handleAddField = () => {
		if (columnValues.length < numbersOfColumnToShow) {
			setColumnValues([...columnValues, { columnName: '', columnValue: '' }])
		}
	}

	const handleAddWhereField = () => {
		if (columnValues.length < numbersOfColumnToShow) {
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

	const handleSubmit = async () => {
		const cleanWhereStatementValues = whereStatementValues.filter(value => {
			return value.whereColumnName !== '' || value.whereColumnSign !== '' || value.whereColumnValue !== ''
		})

		const cleanWhereColumnOperatorValue = whereColumnOperatorValue.filter(value => {
			return value.whereOperator !== ''
		})

		const dataToSend = {
			tableName: tableName,
			columnValues: columnValues,
			whereStatementValues: cleanWhereStatementValues,
			whereColumnOperatorValue: cleanWhereColumnOperatorValue,
		}

		console.log(dataToSend)

		try {
			const response = await fetch('YOUR_API_ENDPOINT', {
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
				console.error('Failed to send data')
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
			.then(data => {
				setTables(data)
			})
			.catch(error => {
				console.error('Error fetching table names:', error)
			})
	}, [])

	useEffect(() => {
		if (selectedTable) {
			const filteredColumns = selectedTable.columns.filter(
				column => !(column.fieldType === 'INTEGER' && column.isPrimaryKey && column.isAutoincrement)
			)
			setSelectedTableColumns(filteredColumns)
			setWhereSelectedTableColumns(selectedTable.columns)

			if (filteredColumns) {
				setNumbersOfColumnToShow(filteredColumns.length)
			} else {
				setNumbersOfColumnToShow(0)
			}
		}
	}, [selectedTable])

	return (
		<>
			<div className='flex flex-col justify-center items-center w-full sm:w-4/5 md:w-3/5 lg:w-1/2 bg-white rounded-md shadow-lg p-5'>
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
						{tables.map(table => (
							<option key={table} value={table}>
								{table}
							</option>
						))}
					</select>
				</div>
				{tableName && (
					<>
						<div className='flex flex-row justify-between items-center w-full my-2'>
							<p className='text-sm'>Columns to update:</p>
							<Button
								className='flex justify-center items-center px-3 mx-0'
								disabled={columnValues.length == numbersOfColumnToShow}
								onClick={handleAddField}>
								<FontAwesomeIcon className='text-xs' icon={faPlus} />
							</Button>
						</div>
						{columnValues.map((value, index) => (
							<div key={index} className='w-full'>
								<ColumnToUpdateItem
									index={index}
									columns={selectedTableColumns}
									columnName={value.columnName}
									columnValue={value.columnValue}
									onInputChange={handleInputChange}
								/>
							</div>
						))}

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
					Update Row
				</Button>
			</div>
			{isModalOpen && <Modal onAction={handleExecute} onClose={handleModalClose} code={sqlCode} />}
		</>
	)
}

export default UpdateQueryForm
