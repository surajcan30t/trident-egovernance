"use client"

import * as React from "react"
import { type Row } from "@tanstack/react-table"
import { Loader, Plus } from "lucide-react"
import { toast } from '@/hooks/use-toast'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface SessionWiseStudentData {
  regdNo: string,
  studentName: string
}

interface PromoteStudentDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  studentData: Row<SessionWiseStudentData>["original"][]
  showTrigger?: boolean
  onSuccess?: () => void
}

export function PromoteStudentsDialog({
  studentData,
  showTrigger = true,
  onSuccess,
  ...props
}: PromoteStudentDialogProps) {
  const [isPromotePending, startPromoteTransition] = React.useTransition()

  function onPromote() {
    startPromoteTransition(async () => {


      // if (error) {
      // toast(
      //   {
      //     variant: "destructive",
      //     title: "Something went wrong.",
      //     description: "Please try again later.",
      //   }
      // )
      return
      // }

      props.onOpenChange?.(false)
      toast({
        variant: "success",
        title: "Promoted successfully.",
        description: `Promoted ${studentData.length} students to new session.`,
      })
      onSuccess?.()
    })
  }

  return (
    <Dialog {...props}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button variant="outline" size="default">
            <Plus className="mr-2 size-4" aria-hidden="true" />
            Promote to new session
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This will promote{" "}
            <span className="font-medium">{studentData.length}</span>
            {studentData.length === 1 ? " student" : " students"} to new session.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            aria-label="Promote selected rows"
            variant="destructive"
            onClick={onPromote}
            disabled={isPromotePending}
          >
            {isPromotePending && (
              <Loader
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

}