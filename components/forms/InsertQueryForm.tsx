'use client'
import React, { useState, useEffect } from 'react'
import Button from '../UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
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
}

interface Table {
	name: string
	columns: TableColumn[]
}

const InsertQueryForm: React.FC = () => {
	const [tableName, setTableName] = useState<string>('')
	const [tables, setTables] = useState<string[]>([])
	const [selectedTableColumns, setSelectedTableColumns] = useState<TableColumn[]>([])
	const [selectedTable, setSelectedTable] = useState<Table | undefined>()
	const [columnValues, setColumnValues] = useState<{ [key: string]: string }>({})

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
		const initialColumnValues: { [key: string]: string } = {}
		selectedTable?.columns.forEach(column => {
			initialColumnValues[column.fieldName] = ''
		})
		setColumnValues(initialColumnValues)
	}

	const handleColumnValueChange = (event: React.ChangeEvent<HTMLInputElement>, columnName: string) => {
		const value = event.target.value
		setColumnValues(prevState => ({
			...prevState,
			[columnName]: value,
		}))
	}

	const getInputType = (fieldType: string): string => {
		switch (fieldType) {
			case 'integer':
				return 'number'
			case 'bool':
				return 'checkbox'
			case 'float':
			case 'double':
			case 'decimal':
				return 'number'
			case 'date':
			case 'datetime':
			case 'timestamp':
				return 'datetime-local'
			case 'time':
				return 'time'
			case 'char':
			case 'varchar':
				return 'text'
			default:
				return 'text'
		}
	}

	const handleSubmit = async () => {
		const columnNames = Object.keys(columnValues)
		const dataToSend = {
			tableName: tableName,
			columns: columnNames
				.map(columnName => {
					const column = selectedTableColumns.find(col => col.fieldName === columnName)

					if (column && column.isPrimaryKey && column.fieldType === 'integer' && column.isAutoincrement) {
						return null
					} else {
						return {
							columnName: columnName,
							value: columnValues[columnName],
						}
					}
				})
				.filter(column => column !== null),
		}
		console.log(dataToSend)

		try {
			const response = await fetch('URL', {
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
			const initialColumnValues: { [key: string]: string } = {}
			selectedTable.columns.forEach(column => {
				initialColumnValues[column.fieldName] = ''
			})
			setColumnValues(initialColumnValues)
		}
	}, [selectedTable])

	return (
		<>
			<div className='flex flex-col justify-center items-center w-full sm:w-4/5 md:w-3/5 lg:w-1/2 bg-white rounded-md shadow-lg p-5'>
				<div className='flex flex-col justify-center items-center text-center'>
					<div className='flex flex-row justify-center items-center gap-4 text-mainColor mb-2'>
						<h2 className='text-xl md:text-2xl uppercase font-semibold'>Insert Query</h2>
						<FontAwesomeIcon icon={faPlus} className='text-2xl md:text-3xl text-shadow' />
					</div>
					<h3 className='text-sm md:text-base font-semibold'>Add New Row</h3>
					<p className='text-sm md:text-base font-thin'>Fill in the values for the new row</p>
				</div>
				<div className='flex flex-col w-full mt-3 text-sm '>
					<label>Select Table:</label>
					<select
						onChange={handleTableChange}
						className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'>
						<option value=''>table</option>
						{tables.map(table => (
							<option key={table} value={table}>
								{table}
							</option>
						))}
					</select>
				</div>
				{selectedTableColumns.map(column => (
					<div key={column.fieldName} className='flex flex-col w-full mt-3 text-sm'>
						<label>{column.fieldName}:</label>
						<input
							type={getInputType(column.fieldType)}
							value={columnValues[column.fieldName]}
							onChange={event => handleColumnValueChange(event, column.fieldName)}
							className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'
						/>
					</div>
				))}
				<Button className='w-full mt-5' onClick={handleSubmit}>
					Insert Row
				</Button>
			</div>
			{isModalOpen && <Modal onAction={handleExecute} onClose={handleModalClose} code={sqlCode} />}
		</>
	)
}

export default InsertQueryForm
