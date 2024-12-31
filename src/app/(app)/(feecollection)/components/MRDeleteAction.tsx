import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteMrDetails } from '@/app/(app)/(feecollection)/server-actions-fee-collection/actions';
import { PiTrashFill } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import React from 'react';

export const MRDeleteAction = ({mrNo}:{mrNo: string}) => {

  function deleteAction(mrNo:string){
    try {
      deleteMrDetails(mrNo);
    }catch (e) {
      console.error(e);
    }
  }
  return(
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="bg-red-500 py-0 text-sm"
            size={'sm'}
          >
            <PiTrashFill />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure want to delete?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the Money Receipt details for MR number - <b>{mrNo}</b>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              deleteAction(mrNo);
            }}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}