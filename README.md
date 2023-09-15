# OCRbuddy
The "OCRbuddy" project is a simple web application designed to simplify extracting text from images or PDFs and converting them into downloadable PDFs. Leveraging Amazon Web Services (AWS), OCRbuddy seamlessly integrates AWS Lambda, API Gateway, S3, Elastic Beanstalk, and SNS services to deliver a reliable, scalable, and secure OCR (Optical Character Recognition) solution. The primary goal of OCRbuddy is to help users effortlessly extract and manage textual information from images or PDF documents, enhancing productivity; this app can help students, professors, educators, and anyone who can use it.

# Project Objective
Text Extraction: OCRbuddy aims to provide users with a straightforward platform to upload images or PDFs and automatically extract the textual content using AWS TextExtract services.

PDF Generation: Upon extracting the text from the uploaded files, OCRbuddy converts it into a well-structured PDF document. Users can then download the PDF, making sharing, storing, and accessing the information more accessible.

Email Notification: OCRbuddy allows users to receive email notifications containing links to the generated PDFs. By integrating AWS SNS (Simple Notification Service), users can subscribe and conveniently receive links to their converted documents in their email inbox.

# Final Architecture

OCRbuddy's final architecture leverages various AWS cloud mechanisms to deliver a scalable and efficient OCR (Optical Character Recognition) web application. The cloud mechanisms used in the architecture are:

1. AWS Elastic Beanstalk: Hosts the frontend application, providing an easy-to-use platform for deploying, managing, and scaling web applications.

2. AWS Lambda: Executes serverless functions for OCR processing, text extraction, PDF generation, and email notification. Lambda allows automatic scaling based on request volume.

3. AWS API Gateway: Serves as the entry point for users to interact with the application. It forwards HTTP requests to the corresponding Lambda functions for processing.

4. Amazon S3: Stores the generated PDFs, making them accessible for users to download. S3 provides high durability, availability, and security for data storage.

5. AWS Simple Notification Service (SNS): Enables email notifications for users who request them. It sends PDF links to the provided email addresses; the message only goes if the user confirms the subscription.

6. AWS Textract: Takes an image or PDF as input, processes the machine learning OCR, and gives the text as output, which is then used to generate the PDF.

![OCRBuddy Architecture](https://github.com/Fenil-Patelll/OCRbuddy/assets/58760354/fbcccfd0-9f4e-41da-92d4-2638f821ca58)

# Delivery Model


OCRbuddy adopts a delivery model combining PaaS (Platform as a Service) and FaaS (Function as a Service).

- PaaS: The front end of OCRbuddy is hosted on AWS Elastic Beanstalk, a PaaS offering. Elastic Beanstalk abstracts away the complexities of infrastructure management, making it easier for developers to deploy and manage web applications. It provides a platform where developers can focus on application development rather than infrastructure setup.

- FaaS: The backend OCR processing is handled by AWS Lambda, a FaaS service. Lambda allows developers to run code in response to events without managing servers. In this case, Lambda functions are used to process OCR requests triggered by users through API Gateway. FaaS enables serverless computing, where developers can focus on writing code in the form of functions executed on demand. Also, I had the flexibility to increase the timeout period of the process as the image extraction is a heavy task; I have to increase the lambda function timeout period.

In conclusion, OCRbuddy's deployment model is based on the Public Cloud, specifically utilizing AWS services. The delivery model combines PaaS (Elastic Beanstalk) for the front end and FaaS (Lambda) for the backend OCR processing, offering benefits such as scalability, cost efficiency, and developer productivity.

# Programming Languages and Code
OCRbuddy is built using ReactJS for the front end and Node.js for the back end. ReactJS is used on the front end due to its component-based architecture, which facilitates modularity and reusability. Node.js, known for its event-driven, non-blocking I/O model, is chosen for the backend to handle asynchronous operations efficiently.

The frontend code is responsible for user interactions, uploading files, and displaying results. The backend code, implemented as AWS Lambda functions, handles OCR processing, text extraction, PDF generation, and email notification.

# Deployment to the Cloud
The application is deployed to AWS using CloudFormation, which allows for infrastructure as code. The CloudFormation template defines all the AWS resources required for the application, including the Elastic Beanstalk environment, Lambda functions, API Gateway, S3 buckets, etc.

Once the CloudFormation stack is created, it automatically provisions and configures the necessary resources, making the application ready for use.

   
