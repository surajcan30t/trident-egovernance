'use client'
import React, { useState } from 'react'
import { useParticulars } from './FeeDetailsFilterProvider';
import { DataTable } from '@/components/data-table'
import { columns } from './fee-data-table-components/dues-details-columns'
import { DataTableSkeleton } from '@/components/data-table-skeleton';
import { useDataTable } from '@/hooks/use-data-table'
import { DataTableFilterField } from '../../../../../types-global/types';
import { StudentDuesDetails } from '../feecollection-schemas/schema';
import { DataTableToolbar } from '@/components/data-table-toolbar';



const StudentDuesDetailsTable = ({ data }: { data: StudentDuesDetails[] }) => {

	const { branches } = useParticulars();
	const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
	const branch = [...new Set(Object.values(branches).flatMap(branchObj => Object.values(branchObj).map(b => b.branchCode)))];
	const filterFields: DataTableFilterField<StudentDuesDetails>[] = [
		{
			id: 'regdYear',
			label: 'Regd Year',
			options: [
				{ value: 1, label: '1' },
				{ value: 2, label: '2' },
				{ value: 3, label: '3' },
				{ value: 4, label: '4' }
			]
		},
		{
			id: 'course',
			label: 'Course',
			options: Object.keys(branches).map((course) => ({
				value: course,
				label: course
			}))
		},
		{
			id: "branch",
			label: "Branch",
			options: selectedCourses.length > 0
        ? selectedCourses.flatMap(course => 
            Object.values(branches[course]).map(branchInfo => ({
              value: branchInfo.branchCode,
              label: `${branchInfo.branchCode} (${course})`  // Adding course name for clarity
            }))
          )
        : []
		}
	]

	const { table } = useDataTable({
		data,
		columns,
		onFilterChange: (filters) => {
      const courseFilter = filters.find(f => f.id === 'course');
      if (courseFilter) {
        const courseValues = Array.isArray(courseFilter.value) 
          ? courseFilter.value 
          : [courseFilter.value];
        setSelectedCourses(courseValues);
      }
    }
	});

	return (
		<>
			<div className="flex flex-row-reverse justify-center gap-2 mx-auto w-full">
				<React.Suspense
					fallback=
					{<DataTableSkeleton columnCount={5} searchableColumnCount={2} cellWidths={["5rem", "20rem", "12rem", "12rem", "8rem"]} shrinkZero />}>
					{data ?
						(<DataTable table={table} className="w-full">
							<DataTableToolbar table={table} filterFields={filterFields} />
						</DataTable>) :
						(
							<div>
								<p>No data available</p>
							</div>
						)
					}
				</React.Suspense>
			</div>
		</>
	)
}
export default StudentDuesDetailsTable


// [
//   {
//     "course": "B.TECH.",
//     "branches": [
//       {
//         "branchCode": "CSE",
//         "branch": "COMPUTER SCIENCE AND ENGINEERING",
//         "course": "B.TECH.",
//         "courseInProgress": 1
//       },
//       {
//         "branchCode": "EEE",
//         "branch": "ELECTRICAL AND ELECTRONICS ENGINEERING",
//         "course": "B.TECH.",
//         "courseInProgress": 1
//       },
//       {
//         "branchCode": "ETC",
//         "branch": "ELECTRONICS & TELE-COMMUNICATION ENGINEERING",
//         "course": "B.TECH.",
//         "courseInProgress": 1
//       },
//       {
//         "branchCode": "IT",
//         "branch": "INFORMATION TECHNOLOGY",
//         "course": "B.TECH.",
//         "courseInProgress": 0
//       },
//       {
//         "branchCode": "MECH",
//         "branch": "MECHANICAL ENGINEERING",
//         "course": "B.TECH.",
//         "courseInProgress": 1
//       },
//       {
//         "branchCode": "BME",
//         "branch": "BIOMEDICAL ENGINEERING",
//         "course": "B.TECH.",
//         "courseInProgress": 0
//       },
//       {
//         "branchCode": "CIVIL",
//         "branch": "CIVIL  ENGINEERING",
//         "course": "B.TECH.",
//         "courseInProgress": 1
//       },
//       {
//         "branchCode": "EE",
//         "branch": "ELECTRICAL ENGINEERING",
//         "course": "B.TECH.",
//         "courseInProgress": 1
//       },
//       {
//         "branchCode": "BIOTECH",
//         "branch": "BIOTECHNOLOGY",
//         "course": "B.TECH.",
//         "courseInProgress": 1
//       },
//       {
//         "branchCode": "EEVD",
//         "branch": "ELECTRONICS ENGINEERING IN VLSI DESIGN",
//         "course": "B.TECH.",
//         "courseInProgress": 1
//       },
//       {
//         "branchCode": "CSDS",
//         "branch": "COMPUTER SCIENCE ENGINEERING IN DATA SCIENCE",
//         "course": "B.TECH.",
//         "courseInProgress": 1
//       },
//       {
//         "branchCode": "CSIT",
//         "branch": "COMPUTER SCIENCE AND INFORMATION TECHNOLOGY",
//         "course": "B.TECH.",
//         "courseInProgress": 1
//       },
//       {
//         "branchCode": "CSAIML",
//         "branch": "COMPUTER SCIENCE AND ENGINEERING IN AI AND ML",
//         "course": "B.TECH.",
//         "courseInProgress": 1
//       },
//       {
//         "branchCode": "CST",
//         "branch": "COMPUTER SCIENCE AND TECHNOLOGY",
//         "course": "B.TECH.",
//         "courseInProgress": 1
//       }
//     ]
//   },
//   {
//     "course": "M.TECH.",
//     "branches": [
//       {
//         "branchCode": "ETC",
//         "branch": "ELECTRONICS & TELE-COMMUNICATION ENGINEERING",
//         "course": "M.TECH.",
//         "courseInProgress": 1
//       },
//       {
//         "branchCode": "CSE",
//         "branch": "COMPUTER SCIENCE AND ENGINEERING",
//         "course": "M.TECH.",
//         "courseInProgress": 1
//       },
//       {
//         "branchCode": "VLSI",
//         "branch": "VLSI DESIGN",
//         "course": "M.TECH.",
//         "courseInProgress": 1
//       },
//       {
//         "branchCode": "AIML",
//         "branch": "ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING",
//         "course": "M.TECH.",
//         "courseInProgress": 1
//       },
//       {
//         "branchCode": "DS",
//         "branch": "DATA SCIENCE",
//         "course": "M.TECH.",
//         "courseInProgress": 1
//       },
//       {
//         "branchCode": "EVT",
//         "branch": "ELECTRIC VEHICLE TECHNOLOGY",
//         "course": "M.TECH.",
//         "courseInProgress": 1
//       },
//       {
//         "branchCode": "ENVE",
//         "branch": "ENVIRONMENTAL ENGINEERING",
//         "course": "M.TECH.",
//         "courseInProgress": 1
//       },
//       {
//         "branchCode": "EENVE",
//         "branch": "ELECTRICAL AND ENVIRONMENTAL ENGINEERING",
//         "course": "M.TECH.",
//         "courseInProgress": 1
//       }
//     ]
//   },
//   {
//     "course": "MCA",
//     "branches": [
//       {
//         "branchCode": "MCA",
//         "branch": "MASTER IN COMPUTER APPLICATION",
//         "course": "MCA",
//         "courseInProgress": 1
//       }
//     ]
//   },
//   {
//     "course": "MBA",
//     "branches": [
//       {
//         "branchCode": "MBA",
//         "branch": "MASTER IN BUSINESS ADMINISTRATION",
//         "course": "MBA",
//         "courseInProgress": 1
//       }
//     ]
//   }
// ]