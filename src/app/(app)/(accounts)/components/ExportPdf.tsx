'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

interface PersonalDetails {
  regdNo?: string;
  studentName?: string;
  gender?: string;
  branchCode?: string;
  admissionYear?: number;
  currentYear?: number;
}

export default function ExportPdf(): JSX.Element {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({});
  const [mrDetails, setMrDetails] = useState<any>({});
  const [tatAmount, settatAmount] = useState('')
  const [tatAmountInwords, settatAmountInwords] = useState('')
  const [tactFAmount, settactFAmount] = useState('')
  const [tactFAmountInwords, settactFAmountInwords] = useState('')
  const searchParams = useSearchParams();
  const regdNo = searchParams.get('registrationNo');
  const mrNo = searchParams.get('mrNo');

  const handleGeneratePDF = async (): Promise<void> => {
    if(status === 'authenticated'){
      setIsLoading(true);
      try {
        const response = await fetch('/api/generate-pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ personalDetails, mrDetails }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate PDF');
        }

        // Download the PDF
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `money_receipt${regdNo}-${mrNo}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }else return
  };
  const handlePrint = () => {
    const printSection = document.getElementById('print-section');
    if (!printSection) {
      return;
    }
    //
    // Temporarily clone the print section and print
    const newWindow: Window | null = window.open('', '_blank');
    newWindow?.document.write(printSection.innerHTML);
    newWindow?.document.close();
    newWindow?.print();
    newWindow?.close();
  };

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'authenticated' && session?.user?.accessToken) {
      const fetchPersonalDetails = async (registrationNo: string) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-basic-student-details/${registrationNo}`,
            {
              method: 'GET',
              cache: 'no-store',
              headers: {
                'Authorization': `Bearer ${session.user.accessToken}`,
              },
            },
          );
          const data = await response.json();
          setPersonalDetails(data);
          return data;
        } catch (e) {
        }
      };
      const fetchMrDetails = async (moneyReceiptNo: string) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-money-receipt/${moneyReceiptNo}`,
            {
              method: 'GET',
              cache: 'no-store',
              headers: {
                'Authorization': `Bearer ${session.user.accessToken}`,
              },
            },
          );
          const data = await response.json();
          setMrDetails(data);
          settatAmount(data.tatTotalAmount.amount)
          settatAmountInwords(data.tatTotalAmount.amountInWords)
          settactFAmount(data.tactFTotalAmount.amount)
          settactFAmountInwords(data.tactFTotalAmount.amountInWords)
          return data;
        } catch (e) {
        }
      };
      regdNo && fetchPersonalDetails(regdNo);
      mrNo && fetchMrDetails(mrNo);
    } else return;
  }, [regdNo, mrNo, session?.user?.accessToken]);

  return (
    <div>
      <Button
        variant="trident"
        onClick={handleGeneratePDF}
        className="float-end m-2"
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Download PDF'}
      </Button>

      <Button
        variant="trident"
        onClick={handlePrint}
        className="float-end m-2"
        disabled={isLoading}
      >
        Print
      </Button>
      <div className="bg-cover bg-no-repeat border p-4" id="print-section">
        <table className="w-full border-collapse mt-0">
          <tbody>
            <tr>
              <td className="border p-0 font-bold">MRNO: {mrDetails.mrNo}</td>
              <td className="text-right border p-0 font-bold">
                Date: {mrDetails.paymentDate}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-1">
          <table className="w-full border-collapse border text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-0 font-bold">SLNO</th>
                <th className="border p-0 font-bold">PARTICULARS</th>
                <th className="border p-0 font-bold">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {mrDetails?.tat?.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="text-left border p-0">{index + 1}</td>
                  <td className="text-left border p-0">{item.particulars}</td>
                  <td className="text-right border p-0">{item.amount}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-200">
                <td className="text-left border p-0 font-bold" colSpan={2}>
                  TOTAL:
                </td>
                <td className="text-right border p-0">
                  {tatAmount}
                </td>
              </tr>
              <tr>
                <td className="text-right border p-0 font-bold" colSpan={3}>
                  ( {tatAmountInwords} )
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-1">
          <h3 className="font-bold underline mb-1 text-center">
            Collection on behalf of Service Provider
          </h3>
          <table className="w-full border-collapse text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-0 font-bold">SLNO</th>
                <th className="border p-0 font-bold">PARTICULARS</th>
                <th className="border p-0 font-bold">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {mrDetails?.tactF?.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="text-left border p-0">{index + 1}</td>
                  <td className="text-left border p-0">{item.particulars}</td>
                  <td className="text-right border p-0">{item.amount}</td>
                </tr>
              ))}
              {/*<tr>*/}
              {/*  <td className="text-left border p-0">1</td>*/}
              {/*  <td className="text-left border p-0">ACTIVITY FEE - SEM7</td>*/}
              {/*  <td className="text-right border p-0">1500.00</td>*/}
              {/*</tr>*/}
            </tbody>
            <tfoot>
              <tr className="bg-gray-200">
                <td className="text-left border p-0 font-bold" colSpan={2}>
                  TOTAL:
                </td>
                <td className="text-right border p-0">
                  {tactFAmount}
                </td>
              </tr>
              <tr>
                <td className="text-right border p-0 font-bold" colSpan={3}>
                  ({tactFAmountInwords})
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
