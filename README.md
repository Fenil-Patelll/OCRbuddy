# OCRbuddy
The "OCRbuddy" project is a simple web application designed to simplify extracting text from images or PDFs and converting them into downloadable PDFs. Leveraging Amazon Web Services (AWS), OCRbuddy seamlessly integrates AWS Lambda, API Gateway, S3, Elastic Beanstalk, and SNS services to deliver a reliable, scalable, and secure OCR (Optical Character Recognition) solution. The primary goal of OCRbuddy is to help users effortlessly extract and manage textual information from images or PDF documents, enhancing productivity; this app can help students, professors, educators, and anyone who can use it.

# Project Objective
Text Extraction: OCRbuddy aims to provide users with a straightforward platform to upload images or PDFs and automatically extract the textual content using AWS TextExtract services.

PDF Generation: Upon extracting the text from the uploaded files, OCRbuddy converts it into a well-structured PDF document. Users can then download the PDF, making sharing, storing, and accessing the information more accessible.

Email Notification: OCRbuddy allows users to receive email notifications containing links to the generated PDFs. By integrating AWS SNS (Simple Notification Service), users can subscribe and conveniently receive links to their converted documents in their email inbox.
