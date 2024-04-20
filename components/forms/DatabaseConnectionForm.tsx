import React, { useState } from 'react';
import Button from '../UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

const DatabaseConnectionForm: React.FC = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [databaseName, setDatabaseName] = useState<string>('');
    const [ipAddress, setIpAddress] = useState<string>('');
    const [port, setPort] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({
        login: false,
        password: false,
        databaseName: false,
        ipAddress: false,
        port: false,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            login,
            password,
            databaseName,
            ipAddress,
            port,
        };

        try {
            const response = await fetch('URL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Connection successful');
            } else {
                console.error('Failed to connect');
            }
        } catch (error) {
            console.error('Error connecting to backend:', error);
        }
    };

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col justify-center items-center w-full sm:w-4/5 md:w-3/5 lg:w-1/2 bg-white rounded-md shadow-lg p-5'>
			<div className='flex flex-col justify-center items-center text-center'>
				<div className='flex flex-row justify-center items-center gap-4 text-mainColor mb-2'>
					<h2 className='text-xl md:text-2xl uppercase font-semibold'>Baza danych</h2>
					<FontAwesomeIcon icon={faDatabase} className='text-2xl md:text-3xl text-shadow' />
				</div>
				<h3 className='text-sm md:text-base font-semibold'>Parametry połączenia</h3>
				<p className='text-sm md:text-base font-thin'>Uzupełnij poprawnymi danymi parametry połączenia z bazą danych</p>
			</div>
			<div className='flex flex-col w-full mt-3 text-sm '>
				<label>Login:</label>
				<input
					type='text'
					className={`p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor ${
						errors.login ? 'border border-red-500' : ''
					}`}
					value={login}
					onChange={e => setLogin(e.target.value)}
				/>
			</div>
			<div className='flex flex-col w-full mt-3 text-sm'>
				<label>Hasło:</label>
				<input
					type='password'
					className={`p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor ${
						errors.password ? 'border border-red-500' : ''
					}`}
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
			</div>
			<div className='flex flex-col w-full mt-3 text-sm'>
				<label>Nazwa bazy danych:</label>
				<input
					type='text'
					className={`p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor ${
						errors.databaseName ? 'border border-red-500' : ''
					}`}
					value={databaseName}
					onChange={e => setDatabaseName(e.target.value)}
				/>
			</div>
			<div className='flex flex-col w-full mt-3 text-sm'>
				<label>Adres IP:</label>
				<input
					type='text'
					className={`p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor ${
						errors.ipAddress ? 'border border-red-500' : ''
					}`}
					value={ipAddress}
					onChange={e => setIpAddress(e.target.value)}
				/>
			</div>
			<div className='flex flex-col w-full mt-3 text-sm'>
				<label>Port:</label>
				<input
					type='text'
					className={`p-1 mt-1 bg-gray-100 rounded-sm shadow-md focus:outline-mainColor ${
						errors.port ? 'border border-red-500' : ''
					}`}
					value={port}
					onChange={e => setPort(e.target.value)}
				/>
			</div>
			<Button className='w-full mt-10'>Połącz się</Button>
		</form>
	)
}

export default DatabaseConnectionForm
