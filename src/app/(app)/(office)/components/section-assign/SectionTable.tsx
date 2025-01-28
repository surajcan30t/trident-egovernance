'use client'
import { Table, TableHead, TableHeader, TableRow, TableBody, TableFooter, TableCaption, TableCell } from '@/components/ui/table'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { StudentSectionData, studentSectionData } from '../../office-schemas/schema'
import { parseCourse } from '@/lib/course-parser'
import { EditSectionFormModal } from './CreateorEditSectionFormModal'

const SectionTable = () => {
  const searchParams = useSearchParams()
  console.log('srarchparams', searchParams)
  const [sectionData, setSectinoData] = useState<StudentSectionData[] | []>([])
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [notFoundError, setNotFoundError] = useState<string>('')
  useEffect(() => {
    const parsedCourse = parseCourse(searchParams.get('course') as string)
    const getData = async () => {
      try {
        if (searchParams.get('section') === null) return;
        else {

          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/office/get-section-data?course=${parsedCourse}&branchCode=${searchParams.get('branch')}&sem=${searchParams.get('sem')}&section=${searchParams.get('section')}`)
          const data = await response.json()
          console.log('data', data)
          if (response.status === 200) {
            setSectinoData(data.studentSectionData)
          }
          else if (response.status === 404) {
            setSectinoData([])
            setShowEditModal(true)
            setNotFoundError(data.detail)
          }
        }
      } catch (error) {

      }
    }
    getData()
  }, [searchParams])

  return (
    <>
      <div className='w-[80%]'>
        <Table className='border rounded-lg'>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Roll No.</TableHead>
              <TableHead>Registration No.</TableHead>
              <TableHead className="text-right">Labgroup</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sectionData.map((invoice) => (
              <TableRow key={invoice.regdNo}>
                <TableCell className="font-medium">{invoice.collegeRollNo}</TableCell>
                <TableCell>{invoice.regdNo}</TableCell>
                <TableCell className="text-right">{invoice.labGroup}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <EditSectionFormModal message={notFoundError} open={showEditModal} setOpen={setShowEditModal} />
      </div>
    </>
  )
}

export default SectionTable