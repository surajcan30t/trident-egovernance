import { NextResponse, NextRequest } from 'next/server';
import path from 'path';
import puppeteer, { Puppeteer } from 'puppeteer';
import QRCode from 'qrcode';
import fs from 'fs/promises'

interface PersonalDetails {
  regdNo?: string;
  studentName?: string;
  gender?: string;
  course?: string;
  branchCode?: string;
  admissionYear?: number;
  currentYear?: number;
  email?: string;
}

interface RequestBody {
  personalDetails: PersonalDetails;
  mrDetails: FeeDetails;
  url: string | undefined;
  paymentReceiver: string;
}

interface FeeDetails {
  mrNo: number;
  paymentDate: string;
  tat: TatDetails[];
  tactF: any[];
  feeCollectionDetails: FeeCollectionDetails;
  paymentDuesDetails: PaymentDuesDetails;
  tatTotalAmount: TatTotalPayment;
  tactFTotalAmount: TatTotalPayment;
}

interface Header {
  paymentDate: string;
  mrNo: number;
}

interface TatDetails {
  mrNo: number;
  id: number;
  slNo: number;
  particulars: string;
  amount: number;
}

interface FeeCollectionDetails {
  date: string;
  paymentMode: string;
  ddNo: string | null;
  ddDate: string | null;
  ddBank: string | null;
}

interface PaymentDuesDetails {
  arrears: number;
  currentDues: number;
  totalPaid: number;
  amountDue: number;
}

interface TatTotalPayment {
  amount: number;
  amountInWords: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    if (req.method !== 'POST') {
      return NextResponse.json({
        status: 405,
        message: 'Only POST requests are allowed',
      });
    }

    const body: RequestBody = await req.json();
    const { personalDetails, mrDetails, url, paymentReceiver } = body;
    // Generate HTML content before launching browser
    const htmlContent = url
      ? await htmlEContentGenerator(
          personalDetails,
          mrDetails,
          url,
          paymentReceiver,
        )
      : htmlContentGenerator(personalDetails, mrDetails);

    if (!htmlContent) {
      return NextResponse.json({
        status: 400,
        message: 'HTML content is required',
      }, {status: 400});
    }

    const browser = await puppeteer.launch(
      { 
        timeout: 0,
        headless: true,
        args: ['--no-sandbox'],
      });
    const page = await browser.newPage();

    page.setDefaultTimeout(100000)

    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded', timeout: 0 });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=money_receipt.pdf',
      },
    },
  );
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ status: 500, message: 'Error generating PDF' }, { status: 500});
  }
}

const getBase64Image = async (relativePath: string): Promise<string> => {
  const imagePath = path.join(process.cwd(), 'public', relativePath);
  const imageBuffer = await fs.readFile(imagePath);
  const base64 = imageBuffer.toString('base64');
  return `data:image/jpeg;base64,${base64}`;
};

const tatlogo = await getBase64Image('tat-logo.jpg');

const generateQRCode = async (url: string) => {
  try {
    return await QRCode.toDataURL(url);
  } catch (error) {
    console.error('Error generating QR Code:', error);
    return null;
  }
};

const htmlEContentGenerator = async (
  personal: PersonalDetails,
  feeDetails: FeeDetails,
  url: string,
  paymentReceiver: string,
) => {
  const qrCode = await generateQRCode(url);
  if (!qrCode) {
    return null;
  }

  const qrCodeImage = `
  <div style="text-align: right; margin-top: 20px;">
      <img src="${qrCode}" alt="QR Code" style="width: 150px; height: 150px;" />
      <p style="font-size: smaller; font-weight: bold; text-align: center; margin-top: 0;">Scan to verify</p>
  </div>
  `;

  //personal details
  const personalDetails: string = `
  <tr>
    <td>NAME:</td>
    <td>${personal.studentName}</td>
  </tr>
  <tr>
    <td>REGDNO:</td>
    <td>${personal.regdNo}</td>
  </tr>
  <tr>
    <td>COURSE:</td>
    <td>${personal.course}</td>
  </tr>
  <tr>
    <td>BRANCH:</td>
    <td>${personal.branchCode}</td>
  </tr>
  <tr>
    <td>ADMISSIONYEAR:</td>
    <td>${personal.admissionYear}</td>
  </tr>
  `;
  //tat
  const tat: string = feeDetails.tat
    .map(
      (collection: TatDetails, index: number) => `
    <tr key="${collection.slNo}" style="width: 100%">
        <td style="width: 10%">${index + 1}</td>
        <td align="left" style="width: 70%">${collection.particulars}</td>
        <td align="right" style="width: 20%">${collection.amount.toFixed(2)}</td>
    </tr>
  `,
    )
    .join('');

  //tactf
  const tactf: string = feeDetails.tactF
    .map(
      (collection: TatDetails, index: number) => `
    <tr key="${collection.slNo}" style="width: 100%">
      <td style="width: 10%">${index + 1}</td>
      <td align="left" style="width: 70%">${collection.particulars}</td>
      <td align="right" style="width: 20%">${collection.amount.toFixed(2)}</td>
    </tr>
  `,
    )
    .join('');

  const paymentDuesDetails: string = feeDetails.paymentDuesDetails
    ? `
          <div id="duesd" style="text-align:left; margin-top: 0;">
              <i>Details of Dues:</i>
              <div>
                  <table cellspacing="0" rules="all" border="1" id="GridView3"
                      style="border-collapse:collapse;text-align: left">
                      <tr>
                        <th scope="col">Arrears</th>
                        <th scope="col">Current Dues</th>
                        <th scope="col">Total Paid</th>
                        <th scope="col">Amount Due</th>
                      </tr>
                      <tr>
                        <td align="right">${feeDetails.paymentDuesDetails.arrears}</td>
                        <td align="right">${feeDetails.paymentDuesDetails.currentDues}</td>
                        <td align="right">${feeDetails.paymentDuesDetails.totalPaid}</td>
                        <td align="right">${feeDetails.paymentDuesDetails.amountDue}</td>
                      </tr>
                  </table>
              </div>
          </div>
  `
    : '';

  const tatTotals: string = feeDetails.tatTotalAmount
    ? `
              <tr
                        style="border-right-style: solid; border-right-width: 1px; border-bottom-style: solid; border-bottom-width: 1px; border-left-style: solid; border-left-width: 1px">
                        <td class="style2" colspan="2">TOTAL:</td>
                        <td align="right" colspan="2">
                            <table cellspacing="0" border="0" id="FormView2" style="border-collapse:collapse;">
                                <tr>
                                    <td colspan="2">
                                        <span id="FormView2_Expr1Label"
                                            style="font-weight: 700; text-align: right;">${feeDetails.tatTotalAmount.amount}</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr
                        style="border-right-style: solid; border-right-width: 1px; border-bottom-style: solid; border-bottom-width: 1px; border-left-style: solid; border-left-width: 1px">
                        <td colspan="4" align="right" style="font-weight: bold">
                            <span id="Label3">( ${feeDetails.tatTotalAmount.amountInWords} )</span>
                        </td>
                    </tr>
  `
    : '';

  const tactFTotals: string = feeDetails.tactFTotalAmount
    ? `
              <tr
                        style="border-right-style: solid; border-right-width: 1px; border-bottom-style: solid; border-bottom-width: 1px; border-left-style: solid; border-left-width: 1px">
                        <td class="style2" colspan="2">TOTAL:</td>
                        <td align="right" colspan="2">
                            <table cellspacing="0" border="0" id="FormView3" style="border-collapse:collapse;">
                                <tr>
                                    <td colspan="2">
                                        <span id="FormView3_Expr1Label"
                                            style="font-weight: 700; text-align: right;">${feeDetails.tactFTotalAmount.amount}</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr
                        style="border-right-style: solid; border-right-width: 1px; border-bottom-style: solid; border-bottom-width: 1px; border-left-style: solid; border-left-width: 1px">
                        <td colspan="4" align="right" style="font-weight: bold">
                            <span id="Label4">( ${feeDetails.tactFTotalAmount.amountInWords} )</span>
                        </td>
                    </tr>
  `
    : '';

  const htmlContent = `
  <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <link rel="stylesheet" type="text/css" media="print" href="print.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="screen.css" />
    <title>
        Money Receipt
    </title>
    <style type="text/css">
        @media print {
            @page {
                margin: 0;
                size: auto;
            }
            body {
                margin: 0;
                padding: 0;
            }
        }

        .style1 {
            display: flex;
            flex-direction: column;
        }

        .style2 {
            font-weight: bold;
            text-align: center;
        }

        .style3 {
            width: 714px;
        }

        .style4 {
            font-size: xx-small;
        }

        .style5 {
            font-size: xx-small;
            font-weight: bold;
        }

        .style6 {
            width: 714px;
            font-weight: bold;
            text-align: right;
        }

        .style7 {
            text-align: left;
            height: 20px;
        }

        .style8 {
            font-size: small;
        }

        .style9 {
            font-weight: bold;
            text-align: right;
            width: 532px;
        }

        .style10 {
            font-weight: bold;
            text-align: center;
            width: 419px;
        }

        .backdrop {
            margin: 2rem;
            padding: 0.1rem;
            background-position: center center;
            border-style: solid;
            border-width: 1px;
            background-image: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
                url(${tatlogo});
            background-repeat: no-repeat;
            background-size: 50%;
        }
    </style>
</head>

<body>
    <form name="form1" method="post" action="mr.aspx" id="form1">

        <div class="printBackgroundClass backdrop">
            <div class="style1">
                <div class="head-section" width="98%">
                    <div style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                        <div width="30%" align="center">
                            <img id="Image1"
                                src=${tatlogo}
                                style="height:89px;width:100px;border-width:0px;text-align: center" />
                        </div>
                        <div width="70%" align="center">
                            <span id="Label1" style="font-size:Large;font-weight:bold;">TRIDENT ACADEMY OF
                                TECHNOLOGY</span>
                            <br />
                            <b><span class="style8">F2/A, Chandaka Industrial Estate, Bhubaneswar - 751024.,
                                    Odisha</span><br class="style8" />
                                <span class="style8">Tel.: 0674-6649037, 6649038&nbsp;&nbsp;&nbsp;&nbsp;
                                    Fax.:0674-6649043</span></b><br />
                        </div>
                    </div>
                </div>
                <div class="mr-title"
                    style="display: flex; justify-content: center; color:gold; font-weight:bold; text-align: center; font-size: large;">
                    <div style="background-color: black; padding: 4px">
                        MONEY RECEIPT
                    </div>
                </div>
                <br />
            </div>
            <table cellspacing="0" border="0" id="FormView1" style="width:99%;border-collapse:collapse;">
                <tr>
                    <td colspan="2">
                        <table width="100%">
                            <tr>
                                <td align="left">
                                    <b>MRNO:
                                        <span id="FormView1_MRNOLabel">${feeDetails.mrNo}</span>
                                    </b>
                                </td>
                                <td align="right">
                                    <b>DATE:
                                        <span id="FormView1_DATELabel">${feeDetails.paymentDate}</span>
                                    </b>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>

            <br />
            <div>
                <table cellspacing="0" rules="all" border="1" id="DetailsView1"
                    style="height:127px;width:363px;border-collapse:collapse;text-align: left">
                    ${personalDetails}
                </table>
            </div>
            <div id="tatfd">

                <br />
                <table style="width: 100%">
                    <tr>
                        <td colspan="4">
                            <div>
                                <table cellspacing="0" rules="all" border="1" id="GridView1"
                                    style="width:100%; border-collapse:collapse; text-align:center">
                                    <tr>
                                        <th scope="col" style="width: 10%">SLNO</th>
                                        <th scope="col" style="width: 70%">PARTICULARS</th>
                                        <th scope="col" style="width: 20%">AMOUNT</th>
                                    </tr>
                                    ${tat}
                                </table>
                            </div>
                        </td>
                    </tr>
                    ${tatTotals}
                    <tr
                        style="border-right-style: solid; border-right-width: 1px; border-bottom-style: solid; border-bottom-width: 1px; border-left-style: solid; border-left-width: 1px">
                        <td colspan="4" align="center" style=" text-decoration:underline">&nbsp;</td>
                    </tr>
                    <tr
                        style="border-right-style: solid; border-right-width: 1px; border-bottom-style: solid; border-bottom-width: 1px; border-left-style: solid; border-left-width: 1px">
                        <td align="center" class="style2" style="">
                            &nbsp;</td>
                        <td align="center" class="style2" style="">
                            &nbsp;</td>
                        <td align="center" class="style9" style="">
                            &nbsp;</td>
                    </tr>

                </table>

            </div>

            <div id="tactfd">


                <table style="width: 100%">
                    <tr>
                        <td colspan="4" style="font-weight: bold; text-decoration: underline; text-align: center;">
                            Collection on behalf of Service
                            Provider
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <div>
                                <table cellspacing="0" rules="all" border="1" id="GridView4"
                                    style="width:100%;border-collapse:collapse;text-align: center">
                                    <tr>
                                        <th scope="col" style="width: 10%">SLNO</th>
                                        <th scope="col" style="width: 70%">PARTICULARS</th>
                                        <th scope="col" style="width: 20%">AMOUNT</th>
                                    </tr>
                                    ${tactf}
                                </table>
                            </div>
                        </td>
                    </tr>
                    ${tactFTotals}
                    <tr
                        style="border-right-style: solid; border-right-width: 1px; border-bottom-style: solid; border-bottom-width: 1px; border-left-style: solid; border-left-width: 1px">
                        <td colspan="4" align="center" style=" text-decoration:underline">&nbsp;</td>
                    </tr>
                    <tr
                        style="border-right-style: solid; border-right-width: 1px; border-bottom-style: solid; border-bottom-width: 1px; border-left-style: solid; border-left-width: 1px">
                        <td align="center" class="style2">
                            &nbsp;</td>
                        <td align="center" class="style2">
                            &nbsp;</td>
                        <td align="center" class="style10">
                            &nbsp;</td>
                    </tr>
                </table>
            </div>

            <div style="margin-top: 10px; margin-bottom: 10px; display: flex; flex-direction: row; justify-content: space-between; align-items: flex-start; margin-bottom: 0;">
                <div
                    style="display: flex; flex-direction: column; justify-content: space-between; align-items: flex-start; margin-bottom: 0;">
                    <div style="flex: 1;">
                        <div class="style7">
                            <i>Received as per following details:</i><br />
                        </div>
                        <div>
                            <table cellspacing="0" rules="all" border="1" id="GridView2"
                                style="border-collapse:collapse;text-align: left">
                                <tr>
                                    <th scope="col">PAYMENTMODE</th>
                                    <th scope="col">DDNO</th>
                                    <th scope="col">DDDATE</th>
                                    <th scope="col">DDBANK</th>
                                </tr>
                                <tr>
                                    <td>${feeDetails.feeCollectionDetails.paymentMode}</td>
                                    <td>${feeDetails.feeCollectionDetails.ddNo || ''}</td>
                                    <td>${feeDetails.feeCollectionDetails.ddDate || ''}</td>
                                    <td>${feeDetails.feeCollectionDetails.ddBank || ''}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    ${paymentDuesDetails}

                </div>

                ${qrCodeImage}
            </div>

            <table>
                <tr>
                    <td class="style3" style="text-align: left"><span class=""
                            style="font-size: smaller; font-weight: bold">Cheques/DDs are subject to realisation.
                        </span><b>
                    </td>
                    <td class="style6">&nbsp;</td>
                </tr>
            </table>
            <br />
            <div style="font-size: smaller; font-weight: bold; width: 99%; text-align: center;">This is a computer generated receipt and does not require signature. Receipt generated by ${paymentReceiver}</div>

        </div>


        <br />
    </form>
</body>

</html>
  `;

  return htmlContent;
};

const htmlContentGenerator = (
  personal: PersonalDetails,
  feeDetails: FeeDetails,
) => {
  const personalDetails: string = `
  <tr>
    <td>NAME:</td>
    <td>${personal.studentName}</td>
  </tr>
  <tr>
    <td>REGDNO:</td>
    <td>${personal.regdNo}</td>
  </tr>
  <tr>
    <td>COURSE:</td>
    <td>${personal.course}</td>
  </tr>
  <tr>
    <td>BRANCH:</td>
    <td>${personal.branchCode}</td>
  </tr>
  <tr>
    <td>ADMISSIONYEAR:</td>
    <td>${personal.admissionYear}</td>
  </tr>
  `;
  //tat
  const tat: string = feeDetails.tat
    .map(
      (collection: TatDetails, index: number) => `
    <tr key="${collection.slNo}">
      <td>${index + 1}</td>
      <td align="left">${collection.particulars}</td>
      <td align="right">${collection.amount.toFixed(2)}</td>
    </tr>
  `,
    )
    .join('');

  //tactf
  const tactf: string = feeDetails.tactF
    .map(
      (collection: TatDetails, index: number) => `
    <tr key="${collection.slNo}">
      <td>${index + 1}</td>
      <td align="left">${collection.particulars}</td>
      <td align="right">${collection.amount.toFixed(2)}</td>
    </tr>
  `,
    )
    .join('');

  const paymentDuesDetails: string = feeDetails.paymentDuesDetails
    ? `
  <div id="duesd" style="text-align:left">
            <i>Details of Dues:</i>
            <div>
              <table cellspacing="0" rules="all" border="1" id="GridView3"
                     style="border-collapse:collapse;text-align: left">
                <tr>
                  <th scope="col">Arrears</th>
                  <th scope="col">Current Dues</th>
                  <th scope="col">Total Paid</th>
                  <th scope="col">Amount Due</th>
                </tr>
                <tr>
                  <td align="right">${feeDetails.paymentDuesDetails.arrears}</td>
                  <td align="right">${feeDetails.paymentDuesDetails.currentDues}</td>
                  <td align="right">${feeDetails.paymentDuesDetails.totalPaid}</td>
                  <td align="right">${feeDetails.paymentDuesDetails.amountDue}</td>
                </tr>
              </table>
            </div>
          </div>
  `
    : '';

  const tatTotals: string = feeDetails.tatTotalAmount
    ? `
  <tr
                style="border-right-style: solid; border-right-width: 1px; border-bottom-style: solid; border-bottom-width: 1px; border-left-style: solid; border-left-width: 1px">
                <td class="style2" colspan="2">TOTAL:</td>
                <td align="right" colspan="2">
                  <table cellspacing="0" border="0" id="FormView2" style="border-collapse:collapse;">
                    <tr>
                      <td colspan="2">
                        <span id="FormView2_Expr1Label" style="font-weight: 700; text-align: right;">${feeDetails.tatTotalAmount.amount}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr
                style="border-right-style: solid; border-right-width: 1px; border-bottom-style: solid; border-bottom-width: 1px; border-left-style: solid; border-left-width: 1px">
                <td colspan="4" align="right" style="font-weight: bold">
                  <span id="Label3">( ${feeDetails.tatTotalAmount.amountInWords} )</span>
                </td>
              </tr>
  `
    : '';

  const tactFTotals: string = feeDetails.tactFTotalAmount
    ? `
  <tr
                style="border-right-style: solid; border-right-width: 1px; border-bottom-style: solid; border-bottom-width: 1px; border-left-style: solid; border-left-width: 1px">
                <td class="style2" colspan="2">TOTAL:</td>
                <td align="right" colspan="2">
                  <table cellspacing="0" border="0" id="FormView3" style="border-collapse:collapse;">
                    <tr>
                      <td colspan="2">
                        <span id="FormView3_Expr1Label" style="font-weight: 700; text-align: right;">${feeDetails.tactFTotalAmount.amount}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr
                style="border-right-style: solid; border-right-width: 1px; border-bottom-style: solid; border-bottom-width: 1px; border-left-style: solid; border-left-width: 1px">
                <td colspan="4" align="right" style="font-weight: bold">
                  <span id="Label4">( ${feeDetails.tactFTotalAmount.amountInWords} )</span>
                </td>
              </tr>
  `
    : '';

  const htmlContent = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <link rel="stylesheet" type="text/css" media="print" href="print.css" />
      <link rel="stylesheet" type="text/css" media="screen" href="screen.css" />
      <title>
        Money Receipt
      </title>
      <style type="text/css">
        .style1
        {
          display: flex;
          flex-direction: column;
        }
        .style2
        {
          font-weight: bold;
          text-align: center;
        }
        .style3
        {
          width: 714px;
        }
        .style4
        {
          font-size: xx-small;
        }
        .style5
        {
          font-size: xx-small;
          font-weight: bold;
        }
        .style6
        {
          width: 714px;
          font-weight: bold;
          text-align: right;
        }
        .style7
        {
          text-align: left;
          height: 20px;
        }
        .style8
        {
          font-size: small;
        }
        .style9
        {
          font-weight: bold;
          text-align: right;
          width: 532px;
        }
        .style10
        {
          font-weight: bold;
          text-align: center;
          width: 419px;
        }
        .backdrop
        {
          margin: 2rem;
          padding: 0.1rem;
          background-position: center center;
          border-style: solid;
          border-width: 1px;
          background-image: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
                    url(${tatlogo});
          background-repeat: no-repeat;
          background-size: 50%;
          position: relative;
          z-index: 1;
        }
        </style>
      </head>
      <body>
      <form name="form1" method="post" action="mr.aspx" id="form1">

        <div class="printBackgroundClass backdrop">
          <div class="style1">
            <div class="head-section" width="98%">
              <div style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                <div width="30%" align="center">
                  <img id="Image1"
                       src=${tatlogo}
                       style="height:89px;width:100px;border-width:0px;text-align: center;position:relative;z-index:2;" />
                </div>
                <div width="70%" align="center">
                  <span id="Label1" style="font-size:Large;font-weight:bold;">TRIDENT ACADEMY OF TECHNOLOGY</span>
                  <br />
                  <b><span class="style8">F2/A, Chandaka Industrial Estate, Bhubaneswar - 751024., Odisha</span><br class="style8" />
                    <span class="style8">Tel.: 0674-6649037, 6649038&nbsp;&nbsp;&nbsp;&nbsp;
                      Fax.:0674-6649043</span></b><br />
                </div>
              </div>
            </div>
            <div class="mr-title"
              style="display: flex; justify-content: center; color:gold; font-weight:bold; text-align: center; font-size: large;"> 
              <div style="background-color: black; padding: 4px">
                MONEY RECEIPT
              </div>
            </div>
            <br />
          </div>
          <table cellspacing="0" border="0" id="FormView1" style="width:99%;border-collapse:collapse;">
            <tr>
              <td colspan="2">
                <table width="100%">
                  <tr>
                    <td align="left">
                      <b>MRNO:
                      <span id="FormView1_MRNOLabel">${feeDetails.mrNo}</span>
                      </b>
                    </td>
                    <td align="right">
                      <b>DATE:
                      <span id="FormView1_DATELabel">${feeDetails.paymentDate}</span>
                      </b>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <br />
          <div>
            <table cellspacing="0" rules="all" border="1" id="DetailsView1" style="height:127px;width:363px;border-collapse:collapse;text-align: left">
              ${personalDetails}
            </table>
          </div>
          <div id="tatfd">

            <br />
            <table>
              <tr>
                <td colspan="4">
                  <div>
                    <table cellspacing="0" rules="all" border="1" id="GridView1"
                           style="width:100%; border-collapse:collapse; text-align:center">
                      <tr>
                        <th scope="col">SLNO</th>
                        <th scope="col">PARTICULARS</th>
                        <th scope="col">AMOUNT</th>
                      </tr>
                      ${tat}
                    </table>
                  </div>
                </td>
              </tr>
              ${tatTotals}
              <tr
                style="border-right-style: solid; border-right-width: 1px; border-bottom-style: solid; border-bottom-width: 1px; border-left-style: solid; border-left-width: 1px">
                <td colspan="4" align="center" style=" text-decoration:underline">&nbsp;</td>
              </tr>
              <tr
                style="border-right-style: solid; border-right-width: 1px; border-bottom-style: solid; border-bottom-width: 1px; border-left-style: solid; border-left-width: 1px">
                <td align="center" class="style2" style="">
                  &nbsp;</td>
                <td align="center" class="style2" style="">
                  &nbsp;</td>
                <td align="center" class="style9" style="">
                  &nbsp;</td>
                <td align="center" class="style2" style="">
                  Receiving Officer<br />
                  For TAT
                </td>
              </tr>

            </table>

          </div>

          <div id="tactfd">


            <table>
              <tr>
                <td colspan="4" style="font-weight: bold; text-decoration: underline; text-align: center;">Collection on behalf of Service
                  Provider
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <div>
                    <table cellspacing="0" rules="all" border="1" id="GridView4"
                           style="width:100%;border-collapse:collapse;text-align: center">
                      <tr>
                        <th scope="col">SLNO</th>
                        <th scope="col">PARTICULARS</th>
                        <th scope="col">AMOUNT</th>
                      </tr>
                      ${tactf}
                    </table>
                  </div>
                </td>
              </tr>
              ${tactFTotals}
              <tr
                style="border-right-style: solid; border-right-width: 1px; border-bottom-style: solid; border-bottom-width: 1px; border-left-style: solid; border-left-width: 1px">
                <td colspan="4" align="center" style=" text-decoration:underline">&nbsp;</td>
              </tr>
              <tr
                style="border-right-style: solid; border-right-width: 1px; border-bottom-style: solid; border-bottom-width: 1px; border-left-style: solid; border-left-width: 1px">
                <td align="center" class="style2">
                  &nbsp;</td>
                <td align="center" class="style2">
                  &nbsp;</td>
                <td align="center" class="style10">
                  &nbsp;</td>
                <td align="center" class="style2">
                  Receiving Officer<br />
                  For Service Provider through TAT
                </td>
              </tr>
            </table>
          </div>
          <div class="style7">
            <i>Received as per following details:</i><br />
          </div>
          <div>
            <table cellspacing="0" rules="all" border="1" id="GridView2"
                   style="border-collapse:collapse;text-align: left">
              <tr>
                <th scope="col">PAYMENTMODE</th>
                <th scope="col">DDNO</th>
                <th scope="col">DDDATE</th>
                <th scope="col">DDBANK</th>
              </tr>
              <tr>
                <td>${feeDetails.feeCollectionDetails.paymentMode}</td>
                <td>${feeDetails.feeCollectionDetails.ddNo || ''}</td>
                <td>${feeDetails.feeCollectionDetails.ddDate || ''}</td>
                <td>${feeDetails.feeCollectionDetails.ddBank || ''}</td>
              </tr>
            </table>
          </div>
          ${paymentDuesDetails}
          <table>
            <tr>
              <td class="style3" style="text-align: left"><span class="" style="font-size: smaller; font-weight: bold">Cheques/DDs are subject to realisation.
            </span><b>
                <br class="style4" />
              </b><span class="" style="font-size: smaller; font-weight: bold">Please Check the Money Receipt before Leaving the Counter</span><br />
              </td>
              <td class="style6">&nbsp;</td>
            </tr>
          </table>
          <br />
          <div style="font-size: smaller; font-weight: bold; width: 99%; text-align: center;">This is a computer generated receipt</div>

        </div>


        <br />
      </form>
      </body>
      </html>
  `;

  return htmlContent;
};

/*
TESTING JSON
{
  "personalDetails": {
    "regdNo": "REGD47474747",
    "course": "B.TECH.",
    "studentName": "Bulk Student47", 
    "gender": "MALE",
    "branchCode": "MECH",
    "admissionYear": "2024",
    "currentYear": 1,
    "email": "student47@example.com"
  },
  "mrDetails": {
    "paymentDate": "04-01-2025",
    "mrNo": 7662,
    "tat": [
      {
        "slNo": 1,
        "particulars": "TUITION FEE",
        "amount": 50000
      },
      {
        "slNo": 2,
        "particulars": "DEVELOPMENT FEE", 
        "amount": 20000
      },
      {
        "slNo": 3,
        "particulars": "LABORATORY FEE",
        "amount": 15000
      },
      {
        "slNo": 4,
        "particulars": "LIBRARY FEE",
        "amount": 5000
      },
      {
        "slNo": 5,
        "particulars": "EXAMINATION FEE",
        "amount": 8000
      },
      {
        "slNo": 6,
        "particulars": "REGISTRATION FEE",
        "amount": 3000
      },
      {
        "slNo": 7,
        "particulars": "MISCELLANEOUS FEE",
        "amount": 5000
      }
    ],
    "tatTotalAmount": {
      "amount": 106000,
      "amountInWords": "Rupees one hundred six thousand Only"
    },
    "tactF": [
      {
        "slNo": 1,
        "particulars": "HOSTEL FEE",
        "amount": 50000
      },
      {
        "slNo": 2,
        "particulars": "MESS FEE",
        "amount": 30000
      },
      {
        "slNo": 3,
        "particulars": "TRANSPORT FEE",
        "amount": 14000
      }
    ],
    "tactFTotalAmount": {
      "amount": 94000,
      "amountInWords": "Rupees ninety-four thousand Only"
    },
    "feeCollectionDetails": {
      "date": "04-01-2025",
      "paymentMode": "CASH",
      "ddNo": null,
      "ddDate": null,
      "ddBank": null
    },
    "paymentDuesDetails": {
      "arrears": 0,
      "currentDues": 148500,
      "totalPaid": 200000,
      "amountDue": -51500
    }
  },
  "url": "http://172.16.9.202:3000/verifymr?key=eyJhbGciOiJIUzI1NiJ9.eyJudW1iZXIiOjc2NjIsImlhdCI6MTczNTk3NDY0OSwiZXhwIjoxNzM1OTc4MjQ5fQ.CurO1LQNfgoc3bOia9Sd7dE3ypycQsl63kIjjabqeWg",
  "paymentReceiver": "Akash Choudhury"
}


*/
