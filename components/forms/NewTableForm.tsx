'use client'
import React, { useState } from 'react'
import Button from '../UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faPlus } from '@fortawesome/free-solid-svg-icons'
import AddColumnForm from './AddColumnForm'
import ColumnFieldItem from '../items/ColumnFieldItem'
import ColumnFieldItemHeader from '../items/ColumnFieldItemHeader'

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

const NewTableForm: React.FC = () => {
	const [tableName, setTableName] = useState<string>('')
	const [columns, setColumns] = useState<TableColumn[]>([])
	const [showAddColumnForm, setShowAddColumnForm] = useState<boolean>(false)
	const [isTableNameEntered, setIsTableNameEntered] = useState<boolean>(false)
	const [tableNameError, setTableNameError] = useState<string>('')
	const [columnsError, setColumnsError] = useState<string>('')

	const handleSubmit = async () => {

		if (!isTableNameEntered) {
			setTableNameError('Table name is required')
			return
		}

		if (columns.length === 0) {
			setColumnsError('No columns added to the table')
			return
		}

		const dataToSend = {
			tableName: tableName,
			columns: columns,
		}

		console.log(dataToSend)
        // window.location.reload();

		try {
		    const response = await fetch('URL', {
		        method: 'POST',
		        headers: {
		            'Content-Type': 'application/json'
		        },
		        body: JSON.stringify(dataToSend)
		    });

		    if (response.ok) {
		        console.log('Data sent successfully');
		    } else {
		        console.error('Failed to send data');
		    }
		} catch (error) {
		    console.error('Error sending data:', error);
		}
	}

	const handleAddColumn = (newColumn: TableColumn) => {
		setColumns(prevColumns => [...prevColumns, newColumn])

		if (columns.length < -1) {
			setColumnsError('No columns added to the table')
		} else {
			setColumnsError('')
		}

		setShowAddColumnForm(false)
	}

	const handleTableNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setTableName(value)
		setIsTableNameEntered(value.trim().length > 0)
		setTableNameError(value.trim().length === 0 ? 'Table name is required' : '')
	}

	return (
		<div
			onSubmit={handleSubmit}
			className='flex flex-col justify-center items-center w-full sm:w-4/5 md:w-3/5 bg-white rounded-md shadow-lg p-5 overflow-x-auto'>
			<div className='flex flex-col justify-center items-center text-center'>
				<div className='flex flex-row justify-center items-center gap-4 text-mainColor mb-2'>
					<h2 className='text-xl md:text-2xl uppercase font-semibold'>New Table</h2>
					<FontAwesomeIcon icon={faTable} className='text-2xl md:text-3xl text-shadow' />
				</div>
				<h3 className='text-sm md:text-base font-semibold'>Create Table</h3>
				<p className='text-sm md:text-base font-thin'>
					Enter the table name and then use the plus sign to add columns to the table. Choose its name, data type, and
					other additional parameters!
				</p>
			</div>
			<div className='flex flex-col w-full mt-3 text-sm'>
				<label>Table Name:</label>
				<input
					type='text'
					className={`p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor ${
						tableNameError && 'border-red-500'
					}`}
					value={tableName}
					onChange={handleTableNameChange}
				/>
				{tableNameError && <span className='text-red-500 text-xs'>{tableNameError}</span>}
			</div>
			<div className='flex flex-row justify-between items-center w-full mt-5'>
				<p className='text-sm text-left'>Table Columns</p>
				<Button className='flex justify-center items-center px-4' onClick={() => setShowAddColumnForm(true)}>
					<FontAwesomeIcon className='text-xs' icon={faPlus} />
				</Button>
			</div>
			{columnsError && <span className='text-red-500 text-xs mt-2 text-left w-full'>{columnsError}</span>}
			<ColumnFieldItemHeader />
			{columns.map((column, index) => (
				<ColumnFieldItem key={index} column={column} />
			))}
			{showAddColumnForm && <AddColumnForm onAddColumn={handleAddColumn} />}
			<Button className='w-full mt-10' onClick={handleSubmit}>Create New Table</Button>
		</div>
	)
}

export default NewTableForm
