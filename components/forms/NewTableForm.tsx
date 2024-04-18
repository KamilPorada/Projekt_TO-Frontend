'use client'
import React, { useState } from 'react';
import Button from '../UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faPlus } from '@fortawesome/free-solid-svg-icons';
import AddColumnForm from './AddColumnForm';

interface TableColumn {
    fieldName: string;
    fieldType: string;
    fieldSize1: number;
    fieldSize2: number;
    isPrimaryKey: boolean;
    isForeignKey: boolean;
    foreignTable: string;
    foreignField: string;
    isAutoincrement: boolean;
    isUnique: boolean;
    isNotNull: boolean;
}

const NewTableForm: React.FC = () => {
    const [tableName, setTableName] = useState<string>('');
    const [columns, setColumns] = useState<TableColumn[]>([]);
    const [showAddColumnForm, setShowAddColumnForm] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleAddColumn = (newColumn: TableColumn) => {
        setColumns(prevColumns => [...prevColumns, newColumn]);
        setShowAddColumnForm(false); 
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col justify-center items-center w-full sm:w-4/5 md:w-3/5 bg-white rounded-md shadow-lg p-5'>
            <div className='flex flex-col justify-center items-center text-center'>
                <div className='flex flex-row justify-center items-center gap-4 text-mainColor mb-2'>
                    <h2 className='text-xl md:text-2xl uppercase font-semibold'>Nowa tabela</h2>
                    <FontAwesomeIcon icon={faTable} className='text-2xl md:text-3xl text-shadow' />
                </div>
                <h3 className='text-sm md:text-base font-semibold'>Tworzenie tabeli</h3>
                <p className='text-sm md:text-base font-thin'>
                    Uzupełnij nazwę tabeli a następnie poprzez znak plusa dodawaj kolejne kolumny do tabeli. Wybierz jej nazwę,
                    typ danych oraz inne dodatkowe parametry!
                </p>
            </div>
            <div className='flex flex-col w-full mt-3 text-sm'>
                <label>Nazwa tabeli:</label>
                <input
                    type='text'
                    className='p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor'
                    value={tableName}
                    onChange={e => setTableName(e.target.value)}
                />
            </div>
            <div className='flex flex-row justify-between items-center w-full mt-5'>
                <p className='text-sm text-left'>Kolumny tabeli</p>
                <Button className='flex justify-center items-center px-4' onClick={() => setShowAddColumnForm(true)}>
                    <FontAwesomeIcon className='text-xs' icon={faPlus} />
                </Button>
            </div>

            {showAddColumnForm && <AddColumnForm onAddColumn={handleAddColumn} />}

            <Button  className='w-full mt-10' onClick={()=>{
                console.log(columns)
            }}>Stwórz nową tabelę</Button>
        </form>
    );
};

export default NewTableForm;
