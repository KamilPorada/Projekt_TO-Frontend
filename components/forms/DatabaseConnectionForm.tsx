'use client'
import React, { useState } from 'react'
import Button from '../UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

const DatabaseConnectionForm: React.FC = () => {
	const [login, setLogin] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [databaseName, setDatabaseName] = useState<string>('')
	const [ipAddress, setIpAddress] = useState<string>('')
	const [port, setPort] = useState<string>('')
	const [errors, setErrors] = useState<{ [key: string]: boolean }>({
		login: false,
		password: false,
		databaseName: false,
		ipAddress: false,
		port: false,
	})
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const data = {
			login,
			password,
			databaseName,
			ipAddress,
			port,
		}

		try {
			const response = await fetch('http://localhost:8000/db/connect', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			if (response.ok) {
				console.log('Connection successful')
				toast.success('Correctly connection to the database!', {
					position: 'top-center',
				})
				router.push('/table')
			} else {
				console.error('Failed to connect')
			}
		} catch (error) {
			console.error('Error connecting to backend:', error)
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col justify-center items-center w-full sm:w-4/5 md:w-3/5 lg:w-1/2 bg-white rounded-md shadow-lg p-5'>
			<div className='flex flex-col justify-center items-center text-center'>
				<div className='flex flex-row justify-center items-center gap-4 text-mainColor mb-2'>
					<h2 className='text-xl md:text-2xl uppercase font-semibold'>Database</h2>
					<FontAwesomeIcon icon={faDatabase} className='text-2xl md:text-3xl text-shadow' />
				</div>
				<h3 className='text-sm md:text-base font-semibold'>Connection Parameters</h3>
				<p className='text-sm md:text-base font-thin'>Fill in the connection parameters with correct data</p>
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
				<label>Password:</label>
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
				<label>Database Name:</label>
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
				<label>IP Address:</label>
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
			<Button className='w-full mt-10'>Connect</Button>
		</form>
	)
}

export default DatabaseConnectionForm
