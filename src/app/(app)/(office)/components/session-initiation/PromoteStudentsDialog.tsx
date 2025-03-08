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
import { useParams, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"

interface SessionWiseStudentData {
  regdNo: string,
  studentName: string
}

interface PromoteStudentDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  type: string,
  studentData: Row<SessionWiseStudentData>["original"][]
  unSelectedStudentData?: Row<SessionWiseStudentData>["original"][]
  showTrigger?: boolean
  onSuccess?: () => void
}

export function PromoteStudentsDialog({
  type,
  studentData,
  unSelectedStudentData,
  showTrigger = true,
  onSuccess,
  ...props
}: PromoteStudentDialogProps) {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const path = useParams()
  const prevSessionId = path.session
  const admYear = searchParams.get('admissionYear')
  const startDate = searchParams.get('startDate')
  const sessionId = searchParams.get('sessionId')
  const course = searchParams.get('course')
  const studentType = searchParams.get('studentType')
  const currentYear = searchParams.get('regdYear')

  const [isPromotePending, startPromoteTransition] = React.useTransition()

  function onPromoteNonPromoted() {
    startPromoteTransition(async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/office/initiate-session/promote-not-promoted-students`, {
        body: JSON.stringify({
          admYear,
          prevSessionId,
          startDate,
          sessionId,
          course,
          regdNos: studentData.map(regdNo => regdNo.regdNo),
          studentType,
          currentYear,
          promotionType: false,
          notPromoted: unSelectedStudentData?.map(redgNo => redgNo.regdNo),
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      })
      if (response.status !== 200) {
        toast(
          {
            variant: "destructive",
            title: "Something went wrong.",
            description: "Please try again later.",
          }
        )
      }
      else {

        props.onOpenChange?.(false)
        window.location.reload()
        toast({
          variant: "success",
          title: "Promoted successfully.",
          description: `Promoted ${studentData.length} students to new session.`,
      })
      onSuccess?.()
      }
    })
  }

  function onPromote() {
    startPromoteTransition(async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/office/initiate-session/initiate`, {
        body: JSON.stringify({
          admYear,
          prevSessionId,
          startDate,
          sessionId,
          course,
          regdNos: studentData.map(regdNo => regdNo.regdNo),
          studentType,
          currentYear,
          promotionType: true,
          notPromoted: unSelectedStudentData?.map(redgNo => redgNo.regdNo),
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      })
      if (response.status !== 200) {
        toast(
          {
            variant: "destructive",
            title: "Something went wrong.",
            description: "Please try again later.",
          }
        )
      }
      else {

        props.onOpenChange?.(false)
        window.location.reload()
        toast({
          variant: "success",
          title: "Promoted successfully.",
          description: `Promoted ${studentData.length} students to new session.`,
      })
      onSuccess?.()
      }
    })
  }

  return (
    <Dialog {...props}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-green-500 text-white" size="default">
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
            variant="trident"
            onClick={type === 'promoted' ? onPromote : onPromoteNonPromoted}
            disabled={isPromotePending}
          >
            {isPromotePending && (
              <Loader
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Promote
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

}