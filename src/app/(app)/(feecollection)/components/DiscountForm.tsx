import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const DiscountForm = ({ regdNo }: { regdNo: string }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='w-full' variant="trident" size='lg'>Apply Discount</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[40rem]">
          <DialogHeader>
            <DialogTitle>Discount Form</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DiscountForm
