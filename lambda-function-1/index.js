const AWS = require('aws-sdk');
const textract = new AWS.Textract();
const s3 = new AWS.S3();
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event, context) => {
  try {
    console.log(event)
    console.log(event.body)
    const body = JSON.parse(event.body)
    const files = body.files;
    console.log(files)
    const pdfDataList = [];

    for (const fileData of files) {
      console.log("in for looop")
      // Decode the Base64 file data
      const fileBuffer = Buffer.from(fileData, 'base64');

      // Call the AWS Textract service to extract text from the image
      const textData = await extractTextFromImage(fileBuffer);

      // Generate a PDF with the extracted text
      const pdfData = await generatePDF(textData);
      console.log("generated pdf")
      console.log(pdfData)
      pdfDataList.push(pdfData);
    }

    // Merge PDFs into a single PDF
    const mergedPdfData = await mergePDFs(pdfDataList);

    console.log("Merged Pdf")
    console.log(mergedPdfData)
    // Upload the merged PDF to S3
    const bucketName = 'text-extract-image-pdf';
    const fileName = `output_${uuidv4()}.pdf`;

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: mergedPdfData,
      ContentType: 'application/pdf',
    };

    const s3Response = await uploadToS3(params);

    console.log("S3 Upload Response");
    console.log(s3Response);

    async function uploadToS3(params) {
      return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
          if (err) {
            reject(err);
          } else {

            resolve(data);
          }
        });
      });
    }
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ success: true, message: 'PDF uploaded successfully',pdfUrl: s3Response.Location }),
    };
  } catch (error) {
    console.error('Error processing images:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ success: false, message: 'Error processing images' }),
    };
  }

  async function extractTextFromImage(imageBytes) {
    // const imageBytes = fs.readFileSync(imagePath);
    console.log("Inside TextExtract")
    console.log(typeof imageBytes)
    const params = {
        Document: {
            Bytes: imageBytes,
        },
    };
  
    return new Promise((resolve, reject) => {
        textract.detectDocumentText(params, (err, data) => {
            
            if (err) {
                reject(err);
            } else {
                // Extract the text from the Textract response
                const extractedText = data.Blocks
                    .filter((block) => block.BlockType === 'LINE')
                    .map((block) => block.Text)
                    .join('\n');
  
                resolve(extractedText);
            }
        });
    });
  }
  
  async function generatePDF(text) {
    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument();
    doc.text(text, 100, 100);
    return new Promise((resolve) => {
        const chunks = [];
        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.end();
    });
  }
  async function mergePDFs(pdfDataList) {
    // Merge PDFs using the 'pdf-lib' library
    const { PDFDocument, rgb } = require('pdf-lib');
  
    const mergedPdfDoc = await PDFDocument.create();
    for (const pdfData of pdfDataList) {
        const pdfDoc = await PDFDocument.load(pdfData);
        const pages = await mergedPdfDoc.copyPages(pdfDoc, pdfDoc.getPageIndices());
        pages.forEach((page) => {
            mergedPdfDoc.addPage(page);
        });
    }
    return mergedPdfDoc.save();
  }

};

