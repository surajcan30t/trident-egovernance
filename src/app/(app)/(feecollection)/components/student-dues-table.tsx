import React from 'react'
import {
	getStudentDuesDetails,
} from '@/app/(app)/(feecollection)/server-actions-fee-collection/actions';
import { DataTable } from './fee-data-table-components/data-table'
import { columns } from './fee-data-table-components/dues-details-columns'
// import { useDataTable } from '@/hooks/use-data-table'
// import { DataTableFilterField } from '../../../../../types/types';
// import { StudentDuesDetails } from '../feecollection-schemas/schema';

const getFianance = async () => {
	const response = await getStudentDuesDetails()
	console.log('response', response)
	return response
}

// const filterFields: DataTableFilterField<StudentDuesDetails>[] = [
// 	{
// 		id: 'regdYear',
// 		label: 'Name',
// 	},
// 	{
// 		id: 'course',
// 		label: 'Name',
// 	},
// 	{
// 		id: 'branch',
// 		label: 'Branch',
// 	},
// ]

const StudentDuesDetailsTable = async ({ query }: { query: { from: string | null, to: string | null, sessionId: string | null } }) => {
	const { from, to, sessionId } = query
	const data = await getFianance()
	// const { table } = useDataTable({
	// 	data,
	// 	columns,
	// 	pageCount: -1,
	// 	filterFields
	// })
	return (
		<>
			<div className="flex flex-row-reverse justify-center gap-2 mx-auto w-full">
				<DataTable columns={columns} data={data} />
			</div>
		</>
	)
}
export default StudentDuesDetailsTable
