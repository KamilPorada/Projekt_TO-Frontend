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
        }));
    };
    
    

	const handleAddColumn = () => {
		onAddColumn(newColumn)
		setNewColumn(initialColumnState)
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
			</div>
			<div className='flex flex-col w-full mt-3 text-sm'>
				<label>Typ zmiennej:</label>
				<select
					value={newColumn.fieldType}
					onChange={e => {
                        if(e.target.value !== 'decimal'){
                            setNewColumn(prevState => ({
                                ...prevState,
                                fieldSize1: 0,
                                fieldSize2: 0
                            }));
                        } 
                        if(e.target.value !== 'char'){
                            setNewColumn(prevState => ({
                                ...prevState,
                                fieldSize1: 0,
                                fieldSize2: 0
                            }));
                        } 
                        if(e.target.value !== 'varchar'){
                            setNewColumn(prevState => ({
                                ...prevState,
                                fieldSize1: 0,
                                fieldSize2: 0
                            }));
                        }
                        handleChange('fieldType', e.target.value)}}
					className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'>
					<option value=''>Wybierz typ...</option>
					{variableTypes.map((type, idx) => (
						<option key={idx} value={type}>
							{type}
						</option>
					))}
				</select>
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
				</div>
			)}

			<div className='flex flex-row justify-between items-center w-full mt-3 text-sm'>
				<label>Klucz główny</label>
				<input
					type='checkbox'
					className='p-1 mt-1 bg-gray-100'
					checked={newColumn.isPrimaryKey}
					onChange={() => handleChange('isPrimaryKey', !newColumn.isPrimaryKey)}
				/>
			</div>

			<div className='flex flex-row justify-between items-center w-full mt-3 text-sm'>
				<label>Klucz obcy</label>
				<input
					type='checkbox'
					className='p-1 mt-1 bg-gray-100'
					checked={newColumn.isForeignKey}
					onChange={() => {
                        if(!newColumn.isForeignKey === false){
                            console.log("Jestem tutaj!")
                            setNewColumn(prevState => ({
                                ...prevState,
                                foreignTable: '',
                                foreignField: ''
                            }));
                        }
                        handleChange('isForeignKey', !newColumn.isForeignKey)}}
				/>
			</div>
			{newColumn.isForeignKey && (
				<div className='flex flex-row justify-between items-center gap-2'>
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
				</div>
			)}

			<div className='flex flex-row justify-between items-center w-full mt-3 text-sm'>
				<label>Autoinkrementacja</label>
				<input
					type='checkbox'
					className='p-1 mt-1 bg-gray-100'
					checked={newColumn.isAutoincrement}
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
