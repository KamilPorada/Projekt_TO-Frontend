import React, { useState } from 'react'
import Button from '../UI/Button'

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

interface Props {
	onAddColumn: (newColumn: TableColumn) => void
}

const AddColumnForm: React.FC<Props> = ({ onAddColumn }) => {
	const initialColumnState: TableColumn = {
		fieldName: '',
		fieldType: '',
		fieldSize1: 0,
		fieldSize2: 0,
		isPrimaryKey: false,
		isForeignKey: false,
		foreignTable: '',
		foreignField: '',
		isAutoincrement: false,
		isUnique: false,
		isNotNull: false,
	}

	const [newColumn, setNewColumn] = useState<TableColumn>(initialColumnState)
	const [errors, setErrors] = useState<any>({})

	const variableTypes = [
		'integer',
		'bool',
		'float',
		'double',
		'decimal',
		'date',
		'datetime',
		'timestamp',
		'time',
		'char',
		'varchar',
	]

	const handleChange = (field: keyof TableColumn, value: any) => {
		setNewColumn(prevState => ({
			...prevState,
			[field]: value,
		}))
	}

	const handleAddColumn = () => {
		const validationErrors: any = {}

		// Walidacja nazwy kolumny
		if (!newColumn.fieldName.trim()) {
			validationErrors.fieldName = 'Nazwa kolumny jest wymagana'
		}

		// Walidacja typu danych
		if (!newColumn.fieldType) {
			validationErrors.fieldType = 'Typ danych jest wymagany'
		}

		// Walidacja dodatkowych inputów w zależności od wybranego typu danych
		if (newColumn.fieldType === 'decimal') {
			if (newColumn.fieldSize1 <= 0 || newColumn.fieldSize2 < 0) {
				validationErrors.fieldSize = 'Podaj poprawne wartości dla liczby cyfr całkowitych i dziesiętnych miejsc'
			}
		} else if (newColumn.fieldType === 'char' || newColumn.fieldType === 'varchar') {
			if (newColumn.fieldSize1 <= 0) {
				validationErrors.fieldSize = 'Podaj poprawną długość łańcucha'
			}
		}

		if (newColumn.isForeignKey === true) {
			if (!newColumn.foreignTable || !newColumn.foreignField) {
				validationErrors.foreignKey = 'Wypełnij nazwę tabeli i kolumny dla klucza obcego'
			}
		}

		if (Object.keys(validationErrors).length === 0) {
			// Brak błędów, dodaj kolumnę
			onAddColumn(newColumn)
			setNewColumn(initialColumnState)
			setErrors({})
		} else {
			// Wystąpiły błędy, ustaw błędy i zaznacz nieprawidłowe pola
			setErrors(validationErrors)
		}
	}

	return (
		<div className='w-full ring-1 ring-gray-300 rounded-md shadow-lg p-2 mt-4'>
			<p className='font-semibold text-center'>Kolumna {newColumn.fieldName}</p>
			<div className='flex flex-col w-full mt-1 text-sm'>
				<label>Nazwa kolumny:</label>
				<input
					type='text'
					className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'
					value={newColumn.fieldName}
					onChange={e => handleChange('fieldName', e.target.value)}
				/>
				{errors.fieldName && <span className='text-red-500 text-xs'>{errors.fieldName}</span>}
			</div>
			<div className='flex flex-col w-full mt-3 text-sm'>
				<label>Typ zmiennej:</label>
				<select
					value={newColumn.fieldType}
					onChange={e => {
						if (e.target.value !== 'decimal') {
							setNewColumn(prevState => ({
								...prevState,
								fieldSize1: 0,
								fieldSize2: 0,
							}))
						}
						if (e.target.value !== 'char') {
							setNewColumn(prevState => ({
								...prevState,
								fieldSize1: 0,
								fieldSize2: 0,
							}))
						}
						if (e.target.value !== 'varchar') {
							setNewColumn(prevState => ({
								...prevState,
								fieldSize1: 0,
								fieldSize2: 0,
							}))
							if (e.target.value !== 'integer') {
								setNewColumn(prevState => ({
									...prevState,
									isAutoincrement: false,
								}))
							}
							if (e.target.value === 'bool') {
								setNewColumn(prevState => ({
									...prevState,
									isPrimaryKey: false,
								}))
							}
						}
						handleChange('fieldType', e.target.value)
					}}
					className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'>
					<option value=''>Wybierz typ...</option>
					{variableTypes.map((type, idx) => (
						<option key={idx} value={type}>
							{type}
						</option>
					))}
				</select>
				{errors.fieldType && <span className='text-red-500 text-xs'>{errors.fieldType}</span>}
			</div>
			{newColumn.fieldType === 'decimal' && (
				<div className='flex flex-col justify-center w-full'>
					<div className='flex flex-col mt-3 text-sm'>
						<label>Liczba cyfr całkowitych:</label>
						<input
							type='number'
							className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'
							onChange={e => handleChange('fieldSize1', parseInt(e.target.value))}
						/>
					</div>
					<div className='flex flex-col mt-3 text-sm'>
						<label>Liczba dziesiętnych miejsc po przecinku:</label>
						<input
							type='number'
							className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'
							onChange={e => handleChange('fieldSize2', parseInt(e.target.value))}
						/>
					</div>
					{errors.fieldSize && <span className='text-red-500 text-xs'>{errors.fieldSize}</span>}
				</div>
			)}

			{(newColumn.fieldType === 'char' || newColumn.fieldType === 'varchar') && (
				<div className='flex flex-col w-full mt-3 text-sm'>
					<label>Długość łancucha</label>
					<input
						type='number'
						className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'
						onChange={e => handleChange('fieldSize1', parseInt(e.target.value))}
					/>
					{errors.fieldSize && <span className='text-red-500 text-xs'>{errors.fieldSize}</span>}
				</div>
			)}

			<div className='flex flex-row justify-between items-center w-full mt-3 text-sm'>
				<label>Klucz główny</label>
				<input
					type='checkbox'
					className='p-1 mt-1 bg-gray-100'
					checked={newColumn.isPrimaryKey}
					disabled={newColumn.fieldType === 'bool'}
					onChange={() => {
						if (newColumn.fieldType === 'integer') {
							setNewColumn(prevState => ({
								...prevState,
								isAutoincrement: true,
							}))
						}
						handleChange('isPrimaryKey', !newColumn.isPrimaryKey)
					}}
				/>
			</div>

			<div className='flex flex-row justify-between items-center w-full mt-3 text-sm'>
				<label>Klucz obcy</label>
				<input
					type='checkbox'
					className='p-1 mt-1 bg-gray-100'
					checked={newColumn.isForeignKey}
					onChange={() => {
						if (!newColumn.isForeignKey === false) {
							setNewColumn(prevState => ({
								...prevState,
								foreignTable: '',
								foreignField: '',
							}))
						}
						handleChange('isForeignKey', !newColumn.isForeignKey)
					}}
				/>
			</div>
			{newColumn.isForeignKey && (
				<div className='flex flex-col justify-between items-left  gap-2'>
					<div className='flex flex-col w-full mt-3 text-sm'>
						<label>Tabela</label>
						<input
							type='text'
							className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'
							value={newColumn.foreignTable}
							onChange={e => handleChange('foreignTable', e.target.value)}
						/>
					</div>
					<div className='flex flex-col w-full mt-3 text-sm'>
						<label>Kolumna</label>
						<input
							type='text'
							className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'
							value={newColumn.foreignField}
							onChange={e => handleChange('foreignField', e.target.value)}
						/>
					</div>
                    {errors.foreignKey && <span className='text-red-500 text-xs'>{errors.foreignKey}</span>}
				</div>
                
			)}

			<div className='flex flex-row justify-between items-center w-full mt-3 text-sm'>
				<label>Autoinkrementacja</label>
				<input
					type='checkbox'
					className='p-1 mt-1 bg-gray-100'
					checked={newColumn.isAutoincrement}
					disabled={newColumn.fieldType !== 'integer'}
					onChange={() => handleChange('isAutoincrement', !newColumn.isAutoincrement)}
				/>
			</div>
			<div className='flex flex-row justify-between items-center w-full mt-3 text-sm'>
				<label>Wartości kolumny unikalne</label>
				<input
					type='checkbox'
					className='p-1 mt-1 bg-gray-100'
					checked={newColumn.isUnique}
					onChange={() => handleChange('isUnique', !newColumn.isUnique)}
				/>
			</div>
			<div className='flex flex-row justify-between items-center w-full mt-3 text-sm'>
				<label>Kolumna nie może być pusta</label>
				<input
					type='checkbox'
					className='p-1 mt-1 bg-gray-100'
					checked={newColumn.isNotNull}
					onChange={() => handleChange('isNotNull', !newColumn.isNotNull)}
				/>
			</div>
			<div className='flex justify-center items-center w-full'>
				<Button className='w-full mt-3' onClick={handleAddColumn}>
					Dodaj kolumnę
				</Button>
			</div>
		</div>
	)
}

export default AddColumnForm
