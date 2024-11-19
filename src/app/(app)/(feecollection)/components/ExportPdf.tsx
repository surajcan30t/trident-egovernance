'use client'
import { useState } from 'react';

export default function ExportPdf(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGeneratePDF = async (): Promise<void> => {
    setIsLoading(true);

    // Define HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
<head>
<meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Money Receipt</title>
    <style>
        body {
  font-family: Arial, sans-serif;
}

.receipt-container {
  border: 1px solid #000;
  padding: 16px;
  background-position: center;
  background-repeat: no-repeat;
}

.header {
  text-align: right;
}

.print-button {
  color: #3b82f6;
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
}

.print-button:hover {
  color: #1d4ed8;
}

.logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.logo {
  height: 96px;
  width: 96px;
  object-fit: cover;
}

.institution-info {
  text-align: center;
  margin-left: 16px;
}

.institution-name {
  font-size: 24px;
  font-weight: bold;
}

.address, .contact {
  font-size: 14px;
}

.receipt-title {
  text-align: center;
  background: #000;
  color: #fbbf24;
  font-weight: bold;
  font-size: 18px;
  text-decoration: underline;
  padding: 8px;
}

.info-table {
  width: 100%;
  margin-top: 16px;
  border-collapse: collapse;
}

.student-info-table {
  width: 100%;
  margin-top: 16px;
  border-collapse: collapse;
  text-align: left;
}

.student-info-table .label {
  font-weight: bold;
}

.student-info-table td {
  border: 1px solid #000;
  padding: 8px;
}

.fees-table {
  width: 100%;
  margin-top: 16px;
  border-collapse: collapse;
  text-align: center;
}

.fees-table th, .fees-table td {
  border: 1px solid #000;
  padding: 8px;
}

.signature-section {
  margin: 16px 0;
  text-align: right;
}

.additional-collection h3 {
  text-align: center;
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 8px;
}

.notes {
  text-align: center;
  font-size: 14px;
  color: #6b7280;
}

.computer-generated {
  margin-top: 16px;
  display: block;
}
    </style>
</head>
<body>
  <div class="receipt-container">
    <div class="header">
      <button onclick="handlePrint()" class="print-button">Print</button>
    </div>

    <div class="logo-section">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSmsSAyIqMb0jTnpNo9bfdSXekx-ZDmFGNAg&s" alt="Logo" class="logo">
      <div class="institution-info">
        <h1 class="institution-name">TRIDENT ACADEMY OF TECHNOLOGY</h1>
        <p class="address">F2/A, Chandaka Industrial Estate, Bhubaneswar - 751024, Odisha</p>
        <p class="contact">Tel.: 0674-6649037, 6649038 | Fax: 0674-6649043</p>
      </div>
    </div>

    <h2 class="receipt-title">MONEY RECEIPT</h2>

    <table class="info-table">
      <tr>
        <td class="font-bold">MRNO: 146002</td>
        <td class="text-right font-bold">DATE: 08/08/2024</td>
      </tr>
    </table>

    <div class="student-info">
      <table class="student-info-table">
        <tr>
          <td class="label">NAME:</td>
          <td class="value">SWAYAM PRAKASH MOHANTY</td>
        </tr>
        <tr>
          <td class="label">REGDNO:</td>
          <td class="value">2101289370</td>
        </tr>
        <tr>
          <td class="label">COURSE:</td>
          <td class="value">B.TECH.</td>
        </tr>
        <tr>
          <td class="label">BRANCH:</td>
          <td class="value">CST</td>
        </tr>
        <tr>
          <td class="label">ADMISSION YEAR:</td>
          <td class="value">2021</td>
        </tr>
      </table>
    </div>

    <div class="fees-table-section">
      <table class="fees-table">
        <thead>
          <tr>
            <th>SLNO</th>
            <th>PARTICULARS</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>COURSE/TUITION FEE - SEM7</td>
            <td class="text-right">44500.00</td>
          </tr>
          <tr>
            <td>2</td>
            <td>BPUT REGISTRATION FEE - SEM7</td>
            <td class="text-right">1500.00</td>
          </tr>
          <tr>
            <td>3</td>
            <td>PRE PLACEMENT TRAINING FEE - SEM7</td>
            <td class="text-right">1500.00</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-left font-bold">TOTAL:</td>
            <td class="text-right">47500.00</td>
          </tr>
          <tr>
            <td colspan="3" class="text-right font-bold">( Rupees Forty Seven Thousand Five Hundred Only )</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div class="signature-section">
      <p>Receiving Officer For TAT</p>
    </div>

    <div class="additional-collection">
      <h3>Collection on behalf of Service Provider</h3>
      <table class="fees-table">
        <thead>
          <tr>
            <th>SLNO</th>
            <th>PARTICULARS</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>ACTIVITY FEE - SEM7</td>
            <td class="text-right">1500.00</td>
          </tr>
          <tr>
            <td>2</td>
            <td>INDUSTRY-READY TRAINING FEE - SEM7</td>
            <td class="text-right">2500.00</td>
          </tr>
          <tr>
            <td>3</td>
            <td>PLACEMENT-POOL MEMBERSHIP - SEM7</td>
            <td class="text-right">2500.00</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-left font-bold">TOTAL:</td>
            <td class="text-right">6500.00</td>
          </tr>
          <tr>
            <td colspan="3" class="text-right font-bold">( Rupees Six Thousand Five Hundred Only )</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div class="notes">
      <p><i>Cheques/DDs are subject to realization.</i></p>
      <p><i>Please check the Money Receipt before leaving the counter.</i></p>
      <p class="computer-generated"><i>This is a computer-generated receipt.</i></p>
    </div>
  </div>
</body>
</html>
    `;

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ htmlContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Download the PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'money_receipt.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div
        className="bg-center bg-no-repeat border border-solid p-4"
      >
        <div className="text-right">
          <button
            onClick={handlePrint}
            className="text-blue-500 underline hover:text-blue-700"
          >
            Print
          </button>
        </div>

        <div className="flex justify-center items-center mb-4">
          <img
            src="/tat-logo.jpg"
            alt="Logo"
            className="h-24 w-24 object-cover"
          />
          <div className="text-center ml-4">
            <h1 className="text-2xl font-bold">
              TRIDENT ACADEMY OF TECHNOLOGY
            </h1>
            <p className="text-sm">
              F2/A, Chandaka Industrial Estate, Bhubaneswar - 751024, Odisha
            </p>
            <p className="text-sm">
              Tel.: 0674-6649037, 6649038 | Fax: 0674-6649043
            </p>
          </div>
        </div>

        <h2 className="text-center bg-black text-yellow-300 font-bold text-lg underline py-2">
          MONEY RECEIPT
        </h2>

        <table className="w-full border-collapse mt-4">
          <tbody>
          <tr>
            <td className="font-bold">MRNO: 146002</td>
            <td className="text-right font-bold">DATE: 08/08/2024</td>
          </tr>
          </tbody>
        </table>

        <div className="mt-4">
          <table className="w-full border border-collapse text-left">
            <tbody>
            <tr>
              <td className="border p-2 font-bold">NAME:</td>
              <td className="border p-2">SWAYAM PRAKASH MOHANTY</td>
            </tr>
            <tr>
              <td className="border p-2 font-bold">REGDNO:</td>
              <td className="border p-2">2101289370</td>
            </tr>
            <tr>
              <td className="border p-2 font-bold">COURSE:</td>
              <td className="border p-2">B.TECH.</td>
            </tr>
            <tr>
              <td className="border p-2 font-bold">BRANCH:</td>
              <td className="border p-2">CST</td>
            </tr>
            <tr>
              <td className="border p-2 font-bold">ADMISSIONYEAR:</td>
              <td className="border p-2">2021</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <table className="w-full border border-collapse text-center">
            <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">SLNO</th>
              <th className="border p-2">PARTICULARS</th>
              <th className="border p-2">AMOUNT</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td className="border p-2">1</td>
              <td className="border p-2 text-left">COURSE/TUITION FEE - SEM7</td>
              <td className="border p-2 text-right">44500.00</td>
            </tr>
            <tr>
              <td className="border p-2">2</td>
              <td className="border p-2 text-left">
                BPUT REGISTRATION FEE - SEM7
              </td>
              <td className="border p-2 text-right">1500.00</td>
            </tr>
            <tr>
              <td className="border p-2">3</td>
              <td className="border p-2 text-left">
                PRE PLACEMENT TRAINING FEE - SEM7
              </td>
              <td className="border p-2 text-right">1500.00</td>
            </tr>
            </tbody>
            <tfoot>
            <tr className="bg-gray-100">
              <td className="font-bold text-left p-2" colSpan={2}>
                TOTAL:
              </td>
              <td className="border p-2 text-right">47500.00</td>
            </tr>
            <tr>
              <td className="text-right p-2 font-bold" colSpan={3}>
                ( Rupees Forty Seven Thousand Five Hundred Only)
              </td>
            </tr>
            </tfoot>
          </table>
        </div>

        <div className='mt-4 mb-4 flex justify-end'>
          <p className='w-1/12 text-center'>Recieving Officer For TAT</p>
        </div>

        <div className="mt-4">
          <h3 className="text-center font-bold underline mb-2">
            Collection on behalf of Service Provider
          </h3>
          <table className="w-full border border-collapse text-center">
            <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">SLNO</th>
              <th className="border p-2">PARTICULARS</th>
              <th className="border p-2">AMOUNT</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td className="border p-2">1</td>
              <td className="border p-2 text-left">ACTIVITY FEE - SEM7</td>
              <td className="border p-2 text-right">1500.00</td>
            </tr>
            <tr>
              <td className="border p-2">2</td>
              <td className="border p-2 text-left">
                INDUSTRY-READY TRAINING FEE - SEM7
              </td>
              <td className="border p-2 text-right">2500.00</td>
            </tr>
            <tr>
              <td className="border p-2">3</td>
              <td className="border p-2 text-left">
                PLACEMENT-POOL MEMBERSHIP - SEM7
              </td>
              <td className="border p-2 text-right">2500.00</td>
            </tr>
            </tbody>
            <tfoot>
            <tr className="bg-gray-100">
              <td className="font-bold text-left p-2" colSpan={2}>
                TOTAL:
              </td>
              <td className="border p-2 text-right">6500.00</td>
            </tr>
            <tr>
              <td className="text-right p-2 font-bold" colSpan={3}>
                ( Rupees Six Thousand Five Hundred Only)
              </td>
            </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          <i>Cheques/DDs are subject to realization.</i>
          <br />
          <i>Please check the Money Receipt before leaving the counter.</i>
          <br />
          <span className="block mt-4">This is a computer-generated receipt.</span>
        </div>
      </div>
      <h1>Generate Money Receipt</h1>
      <button onClick={handleGeneratePDF} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Download PDF'}
      </button>
    </div>
  );
}
