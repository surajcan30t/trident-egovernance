import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const DailyCollection = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Daily Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-2xl font-bold text-gray-900">&#8377; 200000</span>
              </div>
            </div>
          </div>
        </CardContent>

      </Card>
    </>
  )
}

export default DailyCollection