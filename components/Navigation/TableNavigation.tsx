'use client'
import { useState } from 'react'

import SectionTitle from '../UI/SectionTitle'
import Button from '../UI/Button'
import NewTableForm from '../Forms/NewTableForm'
import EditTableForm from '../Forms/EditTableForm'
import TablesList from '../Items/TablesList'

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
	}[]
}

interface TableNavigationProps {
	handleEdit: (tableName: string) => void
}
const TableNavigation: React.FC<TableNavigationProps> = () => {
	const [isLists, setIsLists] = useState(false)
	const [editedTable, setEditedTable] = useState<Table | null>(null)
	const [isEditedTable, setIsEditedTable] = useState(false)

	const handleTableList = () => {
		setIsLists(true)
		setIsEditedTable(false)
	}

	const handleNewTable = () => {
		setIsLists(false)
		setIsEditedTable(false)
	}

	const handleEdit = (editedTable: Table) => {
		setEditedTable(editedTable)
		setIsLists(false)
		setIsEditedTable(true)
	}

	const handleTableCreated = () => {
        setIsLists(true);
        setIsEditedTable(false);
    }

	const handleTableEdited = () => {
        setIsLists(true);
        setIsEditedTable(false);
    }

	return (
		<>
			<div className='w-full h-full pt-10'>
				<SectionTitle title={isEditedTable ? 'Edit Table' : isLists ? 'List of tables' : 'New Table'} />

				<div className='flex justify-around items-center mx-auto mt-10'>
					<Button onClick={handleNewTable} disabled={isEditedTable ? false : !isLists}>
						New table
					</Button>
					<Button onClick={handleTableList} disabled={isEditedTable ? false : isLists}>
						List of tables
					</Button>
				</div>
				<div className=' w-full h-full flex justify-center items-center mt-16 md:mt-32'>
					{!isLists && !isEditedTable && <NewTableForm onTableCreated={handleTableCreated} />}
					{isLists && !isEditedTable && <TablesList handleEdit={handleEdit} />}
					{isEditedTable && <EditTableForm editedTable={editedTable} onTableEdited={handleTableEdited}/>}
				</div>
			</div>
		</>
	)
}

export default TableNavigation
