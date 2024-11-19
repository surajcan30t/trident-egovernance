import { NextResponse, NextRequest } from 'next/server';
import puppeteer from 'puppeteer';

interface RequestBody {
  htmlContent: string;
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
    const { htmlContent } = body;

    if (!htmlContent) {
      return NextResponse.json({
        status: 400,
        message: 'HTML content is required',
      });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: 'load' });

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
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ status: 500, message: 'Error generating PDF' });
  }
}
