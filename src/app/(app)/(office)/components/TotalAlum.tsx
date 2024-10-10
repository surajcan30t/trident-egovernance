import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface StudentData {
  id: number
  branch: string
  value: number
  color: string
}
const TotoalAlum: React.FC = () => {
  const bgcolors = ['green', 'blue', 'yellow', 'orange', 'violet', 'sky', 'red', 'teal']
  const studentData: StudentData[] = [
    { id: 0, branch: 'CSE', value: 1200, color: bgcolors[0] },
    { id: 1, branch: 'CST', value: 3000, color: bgcolors[1] },
    { id: 2, branch: 'CSIT', value: 600, color: bgcolors[2] },
    { id: 3, branch: 'CSAIML', value: 520, color: bgcolors[3] },
    { id: 4, branch: 'MECH', value: 4000, color: bgcolors[4] },
    { id: 5, branch: 'CIVIL', value: 550, color: bgcolors[5] },
    { id: 6, branch: 'BIOTECH', value: 450, color: bgcolors[6] },

  ]
  return (
    <>
      <Card className='bg-lime-200'>
        <CardHeader>
          <CardTitle>Total Alumni</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-row gap-3 text-black'>
            {studentData.map((data, index) => (console.log(index, data),
              <div key={data.id} className={`flex flex-row items-center border border-gray-500 rounded-md px-2`}>
                <div className="flex flex-col gap-0" >
                  <div className='uppercase'>{data.branch}</div>
                  <span className="text-xl font-bold">{data.value}</span>
                </div>
              </div>
            ))}

          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default TotoalAlum