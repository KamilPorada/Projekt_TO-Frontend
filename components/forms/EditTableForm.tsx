'use client'
import React, { useState } from 'react'
import Button from '../UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faPlus } from '@fortawesome/free-solid-svg-icons'
import AddColumnForm from './AddColumnForm'
import ColumnFieldItem from '../Items/ColumnFieldItem'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Table {
	name: string
	columns: {
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
		editMode: number // 1 - dodawane, 2 - modyfikowane, 3 - usuwane
	}[]
}

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

interface EditTableFormProps {
	editedTable: Table | null
	onTableEdited: () => void
}

const EditTableForm: React.FC<EditTableFormProps> = ({ editedTable, onTableEdited }) => {
	const [tableName, setTableName] = useState<string>(editedTable ? editedTable.name : '')
	const [columns, setColumns] = useState<TableColumn[]>(editedTable?.columns || [])
	const [editedColumn, setEditedColumn] = useState<TableColumn | undefined>(undefined)
	const [showAddColumnForm, setShowAddColumnForm] = useState<boolean>(false)
	const [isTableNameEntered, setIsTableNameEntered] = useState<boolean>(false)
	const [tableNameError, setTableNameError] = useState<string>('')
	const [columnsError, setColumnsError] = useState<string>('')

	const handleSubmit = async () => {
		if (!isTableNameEntered && tableName.trim() !== editedTable?.name) {
			setTableNameError('Table name is required')
			return
		}

		if (columns.length === 0) {
			setColumnsError('No columns added to the table')
			return
		}

		const dataToUpdate = {
			tableName: tableName,
			columns: columns,
		}

		console.log(dataToUpdate)

		// try {
		// 	const response = await fetch('URL', {
		// 		method: 'PATCH', // zmiana na metodę PATCH
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: JSON.stringify(dataToUpdate)
		// 	});

		// 	if (response.ok) {
		// 		console.log('Data updated successfully');
		// 	} else {
		// 		console.error('Failed to update data');
		// 	}
		// } catch (error) {
		// 	console.error('Error updating data:', error);
		// }
		toast.success('Pomyślnie edytowano dane tabeli!', {
			position: 'top-center',
		})
		onTableEdited()
	}

	const handleAddColumn = (newColumn: TableColumn) => {
		const isEditingExistingColumn = columns.some(col => col === editedColumn)

		if (isEditingExistingColumn) {
			setColumns(prevColumns => {
				const updatedColumns = prevColumns.map(col => {
					if (col === editedColumn) {
						return newColumn
					}
					return col
				})
				return updatedColumns
			})
			newColumn.editMode = 2 //edytowana kolumna podczas edycji tabeli
		} else {
			setColumns(prevColumns => [...prevColumns, newColumn])
			newColumn.editMode = 1 //nowa kolumna podczas edycji abeli
		}
		setShowAddColumnForm(false)
		setEditedColumn(undefined)
	}

	const handleEditColumn = (editedColumn: TableColumn) => {
		setEditedColumn(editedColumn)
		setShowAddColumnForm(true)
	}

	const handleDeleteColumn = (index: number) => {
		setColumns(prevColumns => {
			const updatedColumns = [...prevColumns]
			updatedColumns.splice(index, 1)
			return updatedColumns.map(column => ({ ...column, editMode: 3 })) //usuwana kolumna podczas edycji tabeli
		})
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
					<h2 className='text-xl md:text-2xl uppercase font-semibold'>Edit Table</h2>
					<FontAwesomeIcon icon={faTable} className='text-2xl md:text-3xl text-shadow' />
				</div>
				<h3 className='text-sm md:text-base font-semibold'>Edit Table</h3>
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
			{columns.map((column, index) => (
				<ColumnFieldItem
					key={index}
					column={column}
					width={640}
					removable={true}
					onDelete={() => handleDeleteColumn(index)}
					onEdit={() => handleEditColumn(column)}
				/>
			))}
			{showAddColumnForm && (
				<AddColumnForm onAddColumn={handleAddColumn} editedColumn={editedColumn} columns={columns} />
			)}
			<Button className='w-full mt-10' onClick={handleSubmit}>
				Edit Table
			</Button>
		</div>
	)
}

export default EditTableForm
