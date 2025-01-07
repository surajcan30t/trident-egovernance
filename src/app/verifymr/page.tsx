'use client'

import { CheckCircleIcon } from "lucide-react";
import { useState, useEffect } from "react";

const Page = (props: any) => {
  const { searchParams } = props;
  const key = searchParams.key;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collectionDetails, setCollectionDetails] = useState<any>(null);
  const [receiptGenerator, setReceiptGenerator] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollectionDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/public/resource`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
          },
          body: JSON.stringify({ token: key })
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        // Get custom headers
        const receiptGenerator = response.headers.get('Payment-Receiver');

        const data = await response.json();
        setCollectionDetails(data);
        setReceiptGenerator(receiptGenerator);
      } catch (err) {
        console.error('Error fetching collection details:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionDetails();
  }, [key]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!collectionDetails) {
    return <div>No data found</div>;
  }

  return (
    <div className="p-4 flex flex-col items-center ">
      <div className="text-xl font-semibold mb-6 bg-green-500 text-white p-2 rounded-lg">
        <div className="flex items-center">
          <CheckCircleIcon className="w-6 h-6 mr-2" />Verified Money Receipt
        </div>
      </div>
      <div className="head-section w-[98%] mb-8 ">
        <div className="flex flex-row justify-center items-center gap-4">
          <div className="flex-shrink-0">
            <img
              id="Image1"
              src="https://tridentpublicdata.s3.ap-south-1.amazonaws.com/logos/tat-logo.jpg"
              className="h-24 w-24 object-contain"
              alt="TAT Logo"
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold mb-2">
              TRIDENT ACADEMY OF TECHNOLOGY
            </span>
            <div className="text-center">
              <p className="font-semibold mb-1">
                F2/A, Chandaka Industrial Estate, Bhubaneswar - 751024., Odisha
              </p>
              <p className="font-semibold">
                Tel.: 0674-6649037, 6649038 | Fax.: 0674-6649043
              </p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6">Money Receipt</h1>
      <div className="w-full max-w-4xl bg-white shadow-2xl border rounded-lg p-6">
        <div className="flex justify-between mb-6">
          <div className="font-bold text-lg">MR No: {collectionDetails.mrNo}</div>
          <div className="font-bold text-lg">Date: {collectionDetails.paymentDate}</div>
        </div>

        <div className="mb-8">
          <h3 className="font-bold text-xl underline mb-4 text-center">College Fee Collection</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">SL No</th>
                <th className="border p-3 text-left">Particulars</th>
                <th className="border p-3 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {collectionDetails.tat.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="border p-3">{item.slNo}</td>
                  <td className="border p-3">{item.particulars}</td>
                  <td className="border p-3 text-right">{item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-bold">
                <td className="border p-3" colSpan={2}>Total:</td>
                <td className="border p-3 text-right">{collectionDetails.tatTotalAmount.amount.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="border p-3 italic" colSpan={3}>
                  ({collectionDetails.tatTotalAmount.amountInWords})
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mb-8">
          <h3 className="font-bold text-xl underline mb-4 text-center">Service Provider Collection</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">SL No</th>
                <th className="border p-3 text-left">Particulars</th>
                <th className="border p-3 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {collectionDetails.tactF.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="border p-3">{item.slNo}</td>
                  <td className="border p-3">{item.particulars}</td>
                  <td className="border p-3 text-right">{item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-bold">
                <td className="border p-3" colSpan={2}>Total:</td>
                <td className="border p-3 text-right">{collectionDetails.tactFTotalAmount.amount.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="border p-3 italic" colSpan={3}>
                  ({collectionDetails.tactFTotalAmount.amountInWords})
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-bold text-lg mb-4">Payment Details</h4>
            <div className="space-y-2">
              <div><span className="font-semibold">Mode:</span> {collectionDetails.feeCollectionDetails.paymentMode}</div>
              {collectionDetails.feeCollectionDetails.ddNo && (
                <>
                  <div><span className="font-semibold">DD No:</span> {collectionDetails.feeCollectionDetails.ddNo}</div>
                  <div><span className="font-semibold">DD Date:</span> {collectionDetails.feeCollectionDetails.ddDate}</div>
                  <div><span className="font-semibold">DD Bank:</span> {collectionDetails.feeCollectionDetails.ddBank}</div>
                </>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-bold text-lg mb-4">Payment Summary</h4>
            <div className="space-y-2">
              <div><span className="font-semibold">Arrears:</span> ₹{collectionDetails.paymentDuesDetails.arrears.toFixed(2)}</div>
              <div><span className="font-semibold">Current Dues:</span> ₹{collectionDetails.paymentDuesDetails.currentDues.toFixed(2)}</div>
              <div><span className="font-semibold">Total Paid:</span> ₹{collectionDetails.paymentDuesDetails.totalPaid.toFixed(2)}</div>
              <div><span className="font-semibold">Amount Due:</span> ₹{collectionDetails.paymentDuesDetails.amountDue.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 p-6 rounded-lg">
          <div className="text-center">
            <span className="font-semibold">Receipt Generated By:</span> {receiptGenerator}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
