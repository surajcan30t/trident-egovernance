'use client'
import { Table, TableHead, TableHeader, TableRow, TableBody, TableFooter, TableCaption, TableCell } from '@/components/ui/table'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { StudentSectionData, studentSectionData } from '../../office-schemas/schema'
import { parseCourse } from '@/lib/course-parser'
import { EditSectionFormModal } from './CreateorEditSectionFormModal'
import PulseLoader from 'react-spinners/PulseLoader'
import { Button } from '@/components/ui/button'

const SectionTable = () => {
  const searchParams = useSearchParams()
  console.log('srarchparams', searchParams)
  const [sectionData, setSectinoData] = useState<StudentSectionData[] | []>([])
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [notFoundError, setNotFoundError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [method, setMethod] = useState<string>('create')
  useEffect(() => {
    const parsedCourse = parseCourse(searchParams.get('course') as string)
    const getData = async () => {
      try {
        if (searchParams.get('section') === null) return;
        else {
          setLoading(true)
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/office/get-section-data?course=${parsedCourse}&branchCode=${searchParams.get('branch')}&sem=${searchParams.get('sem')}&section=${searchParams.get('section')}`)
          const data = await response.json()
          console.log('data', data)
          if (response.status === 200) {
            setSectinoData(data.studentSectionData.sort((a: any, b: any) => a.collegeRollNo - b.collegeRollNo))
          }
          else if (response.status === 404) {
            setSectinoData([])
            setShowEditModal(true)
            setNotFoundError(data.detail)
          }
        }
      } catch (error) {

      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [searchParams])

  return (
    <>
      <div className='w-[70vw] flex flex-col justify-center items-center'>
        <div className='w-full flex flex-row justify-center items-start'>
          {
            loading ? <div className='flex justify-end items-center h-[30vh] text-2xl text-stone-950 font-bold'><PulseLoader /></div> :
              <>
                <Table className='rounded-lg w-[50vw]'>
                  <TableHeader>
                    <TableRow className=''>
                      <TableHead className="text-center bg-sky-200 text-black">Roll No.</TableHead>
                      <TableHead className="text-center bg-sky-200 text-black">Registration No.</TableHead>
                      <TableHead className="text-center bg-sky-200 text-black">Labgroup</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className='border'>
                    {sectionData.length > 0 ? <>
                      {sectionData.map((invoice) => (
                        <TableRow key={invoice.regdNo}>
                          <TableCell className="font-medium">{invoice.collegeRollNo}</TableCell>
                          <TableCell>{invoice.regdNo}</TableCell>
                          <TableCell className="text-right">{invoice.labGroup}</TableCell>
                        </TableRow>
                      ))}</>
                      :
                      <TableRow>
                        <TableCell colSpan={3} className="font-medium text-center">No data available</TableCell>
                      </TableRow>
                    }
                  </TableBody>
                </Table>
              </>
          }
          <div className='flex flex-col gap-2 justify-center items-end'>
            <Button variant={'trident'} size={'lg'} onClick={() => { setShowEditModal(true), setMethod('create') }}>Create New Section</Button>
            {sectionData.length > 0 && <Button variant={'trident'} size={'lg'} onClick={() => { setShowEditModal(true), setMethod('update') }}>Update Existing Section</Button>}
          </div>
        </div>
        <EditSectionFormModal method={method} message={notFoundError} open={showEditModal} setOpen={setShowEditModal} />
      </div>
    </>
  )
}

export default SectionTable