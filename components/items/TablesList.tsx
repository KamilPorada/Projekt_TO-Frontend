import { useState, useEffect } from 'react'
import TableItem from './TableItem'
import Modal from '../UI/Modal'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Table {
	tableName: string
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
		editMode: number
	}[]
}

const TablesList: React.FC<{
	handleEdit: (table: Table) => void
}> = props => {
	const [allTables, setAllTables] = useState<Table[]>([])
	const [filteredTables, setFilteredTables] = useState<Table[]>([])
	const [loading, setLoading] = useState(true)
	
	const fetchTables = async () => {
		try {
			const response = await fetch('http://localhost:8000/db/tables')
			const data = await response.json()

			setAllTables(data)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	const handleDelete = async (tableName: string) => {
		try {
			await fetch(`http://localhost:8000/db/deltable`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(tableName),
			})

			const filteredTables = allTables.filter(table => table.tableName !== tableName)

			toast.success('Successfully deleted the table!', {
				position: 'top-center',
			})

			setAllTables(filteredTables)
			setFilteredTables(filteredTables)
			setLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	const handleEdit = (tableName: string) => {
		const editedTable = allTables.find(table => table.tableName === tableName)
		if (editedTable) {
			props.handleEdit(editedTable)
		} else {
			console.log(`Nie znaleziono tabeli o nazwie ${tableName}`)
		}
	}

	useEffect(() => {
		fetchTables()
		setLoading(false)
	}, [loading])

	if (loading) {
		return (
			<section className='container py-20'>
				<p className='mt-10 text-black text-center'>Wczytywanie danych...</p>
			</section>
		)
	}

	return (
		<>
			<div className='flex flex-row justify-center items-center flex-wrap gap-16'>
				{filteredTables.length > 0 ? (
					filteredTables.map(table => (
						<TableItem
							key={table.tableName}
							tableName={table.tableName}
							columns={table.columns}
							handleDelete={() => handleDelete(table.tableName)}
							handleEdit={handleEdit}
						/>
					))
				) : (
					<p className='w-full mt-10 text-black text-center'>Brak tabel!</p>
				)}
			</div>
		</>
	)
}

export default TablesList
