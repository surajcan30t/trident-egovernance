'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useEffect, useState } from 'react';

const FeeDataGrid = () => {
  const [activesem, setactivesem] = useState('')
  const [nextsem, setnextsem] = useState('')
  useEffect(() => {
    const sem = 2 * (Math.floor(Math.random() * 4)) + 1
    setactivesem(sem.toString())
    setnextsem((sem + 1).toString())
  }, [])

  return (
    <Tabs defaultValue="account" className="w-[50vw]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={`Semester ${activesem}`}>Semester {activesem}</TabsTrigger>
        <TabsTrigger value={`Semester ${nextsem}`}>Semester {nextsem}</TabsTrigger>
      </TabsList>
      <TabsContent value={`Semester ${activesem}`}>
        <Card>
          <CardHeader>
            <CardDescription>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <table className="w-full uppercase text-start">
              <thead>
                <tr>
                  <th className="border">Description</th>
                  <th className="border">Amount Due</th>
                  <th className="border">Amount Paid</th>
                  <th className="border">AMT Paid At OJEE</th>
                  <th className="border">Balance AMT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border">Industry ready training fee</td>
                  <td className="border">2500.00</td>
                  <td className="border">2500.00</td>
                  <td className="border">0.00</td>
                  <td className="border">0.00</td>
                </tr>
                <tr>
                  <td className="border">Placement Pool Membership fee</td>
                  <td className="border">2500.00</td>
                  <td className="border">2500.00</td>
                  <td className="border">0.00</td>
                  <td className="border">0.00</td>
                </tr>
                <tr>
                  <td className="border">Course Fee</td>
                  <td className="border">2500.00</td>
                  <td className="border">2500.00</td>
                  <td className="border">0.00</td>
                  <td className="border">0.00</td>
                </tr>
                <tr>
                  <td className="border">Activity fee</td>
                  <td className="border">2500.00</td>
                  <td className="border">2500.00</td>
                  <td className="border">0.00</td>
                  <td className="border">0.00</td>
                </tr>
                <tr>
                  <td className="border">pre placement training fee</td>
                  <td className="border">2500.00</td>
                  <td className="border">2500.00</td>
                  <td className="border">0.00</td>
                  <td className="border">0.00</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value={`Semester ${nextsem}`}>
        <Card>
          <CardHeader>
            <CardDescription>
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <table className="w-full uppercase text-start">
              <thead>
                <tr>
                  <th className="border">Description</th>
                  <th className="border">Amount Due</th>
                  <th className="border">Amount Paid</th>
                  <th className="border">AMT Paid At OJEE</th>
                  <th className="border">Balance AMT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border">Industry ready training fee 1</td>
                  <td className="border">2500.00</td>
                  <td className="border">2500.00</td>
                  <td className="border">0.00</td>
                  <td className="border">0.00</td>
                </tr>
                <tr>
                  <td className="border">Placement Pool Membership fee</td>
                  <td className="border">2500.00</td>
                  <td className="border">2500.00</td>
                  <td className="border">0.00</td>
                  <td className="border">0.00</td>
                </tr>
                <tr>
                  <td className="border">Course Fee</td>
                  <td className="border">2500.00</td>
                  <td className="border">2500.00</td>
                  <td className="border">0.00</td>
                  <td className="border">0.00</td>
                </tr>
                <tr>
                  <td className="border">Activity fee</td>
                  <td className="border">2500.00</td>
                  <td className="border">2500.00</td>
                  <td className="border">0.00</td>
                  <td className="border">0.00</td>
                </tr>
                <tr>
                  <td className="border">pre placement training fee</td>
                  <td className="border">2500.00</td>
                  <td className="border">2500.00</td>
                  <td className="border">0.00</td>
                  <td className="border">0.00</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>

    // <div className="w-full h-full flex flex-col justify-center items-center text-sm">
    //   <div className="border rounded-lg flex flex-row w-1/5 text-base font-semibold">
    //     <div className="w-full bg-blue-400 rounded-l-lg flex justify-center items-center">
    //       Semester {activesem}
    //     </div>
    //     <div className="w-full rounded-r-lg flex justify-center items-center">
    //       Semester {parseInt(activesem) + 1}
    //     </div>
    //   </div>
    //   <div className="border h-full rounded-lg flex flex-row w-4/5">
    //     <div className="w-full bg-blue-400 rounded-l-lg flex flex-col justify-center items-center">
    //       <table className="w-full uppercase text-start">
    //         <thead>
    //           <tr>
    //             <th className="border">Description</th>
    //             <th className="border">Amount Due</th>
    //             <th className="border">Amount Paid</th>
    //             <th className="border">AMT Paid At OJEE</th>
    //             <th className="border">Balance AMT</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           <tr>
    //             <td className="border">Industry ready training fee</td>
    //             <td className="border">2500.00</td>
    //             <td className="border">2500.00</td>
    //             <td className="border">0.00</td>
    //             <td className="border">0.00</td>
    //           </tr>
    //           <tr>
    //             <td className="border">Placement Pool Membership fee</td>
    //             <td className="border">2500.00</td>
    //             <td className="border">2500.00</td>
    //             <td className="border">0.00</td>
    //             <td className="border">0.00</td>
    //           </tr>
    //           <tr>
    //             <td className="border">Course Fee</td>
    //             <td className="border">2500.00</td>
    //             <td className="border">2500.00</td>
    //             <td className="border">0.00</td>
    //             <td className="border">0.00</td>
    //           </tr>
    //           <tr>
    //             <td className="border">Activity fee</td>
    //             <td className="border">2500.00</td>
    //             <td className="border">2500.00</td>
    //             <td className="border">0.00</td>
    //             <td className="border">0.00</td>
    //           </tr>
    //           <tr>
    //             <td className="border">pre placement training fee</td>
    //             <td className="border">2500.00</td>
    //             <td className="border">2500.00</td>
    //             <td className="border">0.00</td>
    //             <td className="border">0.00</td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     </div>
    //     <div className="w-full rounded-r-lg flex flex-col justify-center items-center">
    //       <table className="w-full uppercase text-start">
    //         <thead>
    //           <tr>
    //             <th className="border">Description</th>
    //             <th className="border">Amount Due</th>
    //             <th className="border">Amount Paid</th>
    //             <th className="border">AMT Paid At OJEE</th>
    //             <th className="border">Balance AMT</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           <tr>
    //             <td className="border">Industry ready training fee</td>
    //             <td className="border">2500.00</td>
    //             <td className="border">2500.00</td>
    //             <td className="border">0.00</td>
    //             <td className="border">0.00</td>
    //           </tr>
    //           <tr>
    //             <td className="border">Placement Pool Membership fee</td>
    //             <td className="border">2500.00</td>
    //             <td className="border">2500.00</td>
    //             <td className="border">0.00</td>
    //             <td className="border">0.00</td>
    //           </tr>
    //           <tr>
    //             <td className="border">Course Fee</td>
    //             <td className="border">2500.00</td>
    //             <td className="border">2500.00</td>
    //             <td className="border">0.00</td>
    //             <td className="border">0.00</td>
    //           </tr>
    //           <tr>
    //             <td className="border">Activity fee</td>
    //             <td className="border">2500.00</td>
    //             <td className="border">2500.00</td>
    //             <td className="border">0.00</td>
    //             <td className="border">0.00</td>
    //           </tr>
    //           <tr>
    //             <td className="border">pre placement training fee</td>
    //             <td className="border">2500.00</td>
    //             <td className="border">2500.00</td>
    //             <td className="border">0.00</td>
    //             <td className="border">0.00</td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>
  );
};

export default FeeDataGrid;
