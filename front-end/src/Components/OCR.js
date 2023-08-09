import React, {useState} from "react";
import axios from "axios";
import { FileInput, Label, Button, Spinner, Card,TextInput} from 'flowbite-react';
import {HiMail} from "react-icons/hi";

export default function OCRComp(){
    const [selectedFiles, setSelectedFiles] = useState();
    const [loading, setLoading] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('');
    const [fileNames, setFileNames] = useState([]);
    const [email, setEmail] = useState("");
    const [emailResponse, setEmailResponse] = useState("");
    const [showEmailInput, setShowEmailInput] = useState(false);
    const apiUrl1 = process.env.REACT_APP_ApiUrl1;
    const apiUrl2 = process.env.REACT_APP_ApiUrl2;
    const handleFileChange = async (e) => {
        const files = [...e.target.files];
        await setSelectedFiles(files);

        // Update the state with the names of the selected files
        const names = files.map((file) => file.name);
        setFileNames(names);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedFiles.length === 0) {
            alert('Please select at least one image file.');
            return;
        }

        setLoading(true);
        const fileDataList = [];
        for (let i = 0; i < selectedFiles.length; i++) {
            const reader = new FileReader();

            reader.onload = () => {
                // The result of the reader will be in base64 format
                const fileData = reader.result.split(',')[1];
                fileDataList.push(fileData);

                if (fileDataList.length === selectedFiles.length) {
                    // After processing all files, send the data to the backend
                    console.log(fileData)
                    sendDataToBackend(fileDataList);
                }
            };

            // Read the file as a Data URL (base64 format)
            reader.readAsDataURL(selectedFiles[i]);
        }
    };

    const sendDataToBackend = async (fileDataList) => {
        try {
            console.log(fileDataList);
            const response = await axios.post(apiUrl1, {
                files: fileDataList,
            });
            console.log(response)
            setPdfUrl(response.data.pdfUrl);
            setLoading(false);
            setShowEmailInput(true);
        } catch (error) {
            console.error('Error uploading images:', error);
            setLoading(false);
        }
    };

    const handleSendEmail = async () => {
        try {
            const response = await axios.post(apiUrl2, {
                email: email,
                pdfUrl: pdfUrl,
            });

            setEmailResponse(response.data);

        } catch (error) {
            console.error('Error sending email notification:', error);
        }
    };

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr", // Three equal columns
                gap: "10px", // Add some space between columns
                minHeight:'78vh'
            }}
        >
            <div style={{ gridColumn: "2 / 3",marginTop:"1%", alignSelf: "flex-start"}}>
                <div style={{ display: "flex", flexDirection: "column",alignItems: "center", marginBottom: "10px" }}>
                    <img src="OCRFlowImage.jpg" alt="Your Image" style={{ width: "70%", marginRight: "10px" }} />
                    <div className="mb-2 block">
                        <Label style={{fontSize:"16px"}} value="Use Our OCR tool to recognize text from image and pdf"></Label>
                    </div>
                </div>
                <Card style={{alignItems:"center"}}>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="max-w-md" id="fileUpload">
                            <div className="mb-2 block">
                                <Label htmlFor="file" value="Upload files" />
                            </div>
                            <FileInput
                                type="file"
                                name="file"
                                multiple
                                onChange={handleFileChange}
                                helperText={fileNames.join(", ")}
                                id="file"
                            />
                        </div>

                        <Button type="submit" color="gray" enabled={loading}>
                            {loading ? (
                                <Spinner>
                                    <span className="p1-3">Converting...</span>
                                </Spinner>
                            ) : (
                                "Convert to PDF"
                            )}
                        </Button>
                        {pdfUrl && (
                            <div style={{alignItems: "center"}}>
                                <div className="mb-2 block">
                                    <Label htmlFor="file" value="PDF Genereted" />
                                </div>

                                    <Button style={{margin:'auto',backgroundColor:'#374151'}}>
                                        <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                                            Open PDF
                                        </a>
                                    </Button>
                            </div>
                        )}
                        {showEmailInput && (
                            <>
                                <div className="max-w-md">
                                    <div className="mb-2 block">
                                        <Label style={{fontSize:'1em',margin:'auto'}} htmlFor="email4" value="Or Get it through Email!😄"/>
                                    </div>
                                    <TextInput
                                        icon={HiMail}
                                        type="email"
                                        id="email4"
                                        name="email"
                                        placeholder="your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Button to send email */}
                                <Button style={{backgroundColor:'#374151'}} type="button" onClick={handleSendEmail}>
                                    Send Me Email!
                                </Button>
                                {/* Show email response */}
                                {emailResponse && <div> <Label style={{fontSize:'1em'}} htmlFor="file" value={emailResponse.message} /></div>}
                            </>
                        )}
                    </form>
                </Card>
            </div>
        </div>

    )
}