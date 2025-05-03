"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"

// Define types for the fee data structure
type BatchElements = {
  admYear: number
  course: string
  branchCode: string
  studentType: string
}

type FeeItem = {
  feeId: number
  batchElements: BatchElements
  regdYear: number
  description: string
  amount: number
  comments: string
  tfwType: string
  tatFees: number
  tactFfees: null | number
  payType: string
}

type YearData = {
  TFW?: FeeItem[]
  NTFW?: FeeItem[]
  ALL?: FeeItem[]
}

type FeeData = {
  [year: string]: YearData
}

interface FeeStructureProps {
  feeData: FeeData
}

export default function FeeStructure({ feeData }: FeeStructureProps) {
  // Get all years from the data
  const years = Object.keys(feeData)
  const [activeYear, setActiveYear] = useState(years[0] || "1")

  // Calculate totals for each category
  const calculateTotal = (items: FeeItem[] | undefined) => {
    if (!items) return 0
    return items.reduce((sum, item) => sum + item.amount, 0)
  }

  // Get the current year's data
  const currentYearData = feeData[activeYear] || {}

  // Calculate totals
  const tfwTotal = calculateTotal(currentYearData.TFW)
  const ntfwTotal = calculateTotal(currentYearData.NTFW)
  const allTotal = calculateTotal(currentYearData.ALL)

  // Calculate grand totals
  const tfwGrandTotal = tfwTotal + allTotal
  const ntfwGrandTotal = ntfwTotal + allTotal

  return (
    <div className="space-y-6">
      {/* Year selector */}
      <Tabs value={activeYear} onValueChange={setActiveYear} className="w-full flex flex-col gap-3">
        <TabsList className="mb-4">
          {years.map((year) => (
            <TabsTrigger className="px-8 py-2" key={year} value={year}>
              Year {year}
            </TabsTrigger>
          ))}
        </TabsList>

        {years.map((year) => (
          <TabsContent key={year} value={year} className="space-y-6">
            {/* Fee structure cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* TFW Column */}
              <FeeCard
                title="TFW"
                description="Tuition Fee Waiver"
                items={currentYearData.TFW}
                total={tfwTotal}
              />

              {/* NTFW Column */}
              <FeeCard
                title="NTFW"
                description="Non-Tuition Fee Waiver"
                items={currentYearData.NTFW}
                total={ntfwTotal}
              />

              {/* ALL Column */}
              <FeeCard
                title="ALL"
                description="Common Fees"
                items={currentYearData.ALL}
                total={allTotal}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

interface FeeCardProps {
  title: string
  description: string
  items?: FeeItem[]
  total: number
}

function FeeCard({
  title,
  description,
  items = [],
  total,
}: FeeCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <Badge variant="outline">{description}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {items && items.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.feeId}>
                  <TableCell className="font-medium">{item.description}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="bg-muted/50">
                <TableCell className="font-bold text-lg">Subtotal</TableCell>
                <TableCell className="text-right text-lg font-bold">{formatCurrency(total)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <div className="py-8 text-center text-muted-foreground">No {title} fees available</div>
        )}

        {/* Show ALL fees if this is TFW or NTFW card */}
        {/* {(title === "TFW" || title === "NTFW") && allItems && allItems.length > 0 && (
          <>
            <div className="mt-6 mb-2 font-semibold text-sm">Common Fees (ALL)</div>
            <Table>
              <TableBody>
                {allItems.map((item) => (
                  <TableRow key={item.feeId}>
                    <TableCell className="font-medium">{item.description}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )} */}

        {/* Grand Total */}
        {/* {showGrandTotal && grandTotal !== undefined && (
          <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
            <span className="font-bold text-lg">Grand Total</span>
            <span className="font-bold text-lg">{formatCurrency(grandTotal)}</span>
          </div>
        )} */}
      </CardContent>
    </Card>
  )
}
