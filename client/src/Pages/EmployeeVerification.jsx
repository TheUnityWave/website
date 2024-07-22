import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmployeeVerification = () => {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isPhotoTaken, setIsPhotoTaken] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);

    const [employeeData, setEmployeeData] = useState({
        hometownAddress: '',
        currentAddress: '',
        step5Data: {
            question1: '',
            question2: '',
            question3: ''
        },
    });
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const aadhaarFileRef = useRef(null);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employee/get-employee', {
                    headers: {
                        'auth-token': localStorage.getItem('token')
                    }
                });

                if (response.status === 200) {
                    const data = response.data;
                    setEmployeeData({
                        hometownAddress: data.hometownAddress || '',
                        currentAddress: data.currentAddress || '',
                        isHometownVerified: (data.hometownAddress ? true : false),
                        isCurrentAddressVerified: (data.currentAddress ? true : false),
                        AadhaarCard: data.AdhaarCard,
                        isAadhaarUploaded: (data.AdhaarCard ? true : false),
                        step5Data: {
                            question1: data.policeVerificationDetails.question1 || '',
                            question2: data.policeVerificationDetails.question2 || '',
                            question3: data.policeVerificationDetails.question3 || ''
                        },
                        isQuestionsVerified: (data.policeVerificationDetails.question1 ? true : false),
                        EmployeePhoto: data.EmployeePhoto
                    });
                    setIsPhotoTaken(!!data.EmployeePhoto);
                    setCapturedImage(data.EmployeePhoto);
                } else {
                    console.error('Failed to fetch employee data');
                }
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployeeData();
    }, []);

    const openCamera = () => {
        setIsCameraOpen(true);
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            })
            .catch((err) => {
                console.error("Error accessing the camera: ", err);
            });
    };

    const closeCamera = () => {
        setIsCameraOpen(false);
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    const takePhoto = () => {
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = canvasRef.current.toDataURL('image/png');
        setCapturedImage(imageData);
        closeCamera();
        setIsPhotoTaken(true);
    };

    const handleHometownSubmit = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/employee/employee-verification',
                { hometownAddress: employeeData.hometownAddress },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'auth-token': localStorage.getItem('token')
                    }
                }
            );

            if (response.status === 200) {
                setEmployeeData(prevData => ({ ...prevData, isHometownVerified: true }));
                toast.success("Address Uploaded");
            } else {
                toast.success("Something went wrong");
            }
        } catch (error) {
            console.error('Error submitting hometown address:', error);
            toast.success("Something went wrong");
        }
    };

    const handleCurrentAddressSubmit = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/employee/employee-verification',
                { currentAddress: employeeData.currentAddress },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'auth-token': localStorage.getItem('token')
                    }
                }
            );

            if (response.status === 200) {
                setEmployeeData(prevData => ({ ...prevData, isCurrentAddressVerified: true }));
                toast.success("Address Uploaded");
            } else {
                toast.success("Something went wrong");
            }
        } catch (error) {
            console.error('Error submitting current address:', error);
            toast.success("Something went wrong");
        }
    };

    const handleAadhaarSubmit = async () => {
        try {
            const formData = new FormData();
            if (aadhaarFileRef.current.files[0]) {
                formData.append('AdhaarCard', aadhaarFileRef.current.files[0]);
            }

            const response = await axios.post('http://localhost:5000/api/employee/employee-verification', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'auth-token': localStorage.getItem('token')
                }
            });

            if (response.status === 200) {
                setEmployeeData(prevData => ({ ...prevData, isAadhaarUploaded: true }));
                toast.success("Aadhaar Card Uploaded");
            } else {
                toast.success("Something went wrong");
            }
        } catch (error) {
            console.error('Error submitting Aadhaar card:', error);
            toast.success("Something went wrong");
        }
    };

    const handleQuestionsSubmit = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/employee/employee-verification',
                { policeVerificationDetails: employeeData.step5Data },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'auth-token': localStorage.getItem('token')
                    }
                }
            );

            if (response.status === 200) {
                setEmployeeData(prevData => ({ ...prevData, isQuestionsVerified: true }));
                toast.success("Police Verification Done");
            } else {
                toast.success("Something went wrong");
            }
        } catch (error) {
            console.error('Error submitting questions:', error);
            toast.success("Something went wrong");
        }
    };

    const handleQuestionChange = (event) => {
        const { name, value } = event.target;
        setEmployeeData(prevData => ({
            ...prevData,
            step5Data: {
                ...prevData.step5Data,
                [name]: value
            }
        }));
    };

    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    const handlePhotoSubmit = async () => {
        try {
            const formData = new FormData();
            if (capturedImage) {
                const photoBlob = dataURItoBlob(capturedImage);
                formData.append('EmployeePhoto', photoBlob, 'employee_photo.png');
            }

            const response = await axios.post('http://localhost:5000/api/employee/employee-verification', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'auth-token': localStorage.getItem('token')
                }
            });

            if (response.status === 200) {
                toast.success("Photo saved successfully");
                setTimeout(() => {
                    window.location.reload();
                }, 2500);
            } else {
                toast.success("Something went wrong");
            }
        } catch (error) {
            console.error('Error submitting photo:', error);
            toast.success("Something went wrong");
        }
    };

    return (
        <div className="flex h-3/5">
            <div className="p-4 md:p-8 bg-gray-100 flex-1 overflow-y-auto h-[calc(100vh-72px-2rem)]">
                <h2 className="text-2xl bg-cyan-900 text-white font-semibold py-4 px-6 mb-4 rounded-md">
                    Employee Verification
                </h2>
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <h3 className="text-lg font-semibold mb-4">Step 1: Capture Photo</h3>
                    {employeeData.EmployeePhoto ? (
                        <div>
                            <img src={employeeData.EmployeePhoto} alt="Captured" className="mb-4 w-1/4" />
                            <p className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                                Verified
                            </p>
                        </div>
                    ) : (
                        <div>
                            {isCameraOpen ? (
                                <div>
                                    <video ref={videoRef} width="640" height="480" className="mb-4" />
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                        onClick={takePhoto}
                                    >
                                        Capture Photo
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={closeCamera}
                                    >
                                        Close Camera
                                    </button>
                                    <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
                                </div>
                            ) : (
                                <div>
                                    {capturedImage ? (
                                        <div>
                                            <img src={capturedImage} alt="Captured" className="mb-4 w-1/4" />
                                            <button
                                                className="bg-cyan-900 text-white px-4 py-2 rounded"
                                                onClick={handlePhotoSubmit}
                                            >
                                                Save Photo
                                            </button>
                                        </div>
                                    ) :
                                        (
                                            <button
                                                className="bg-cyan-900 text-white px-4 py-2 rounded"
                                                onClick={openCamera}
                                            >
                                                Open Camera
                                            </button>
                                        )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <h3 className="text-lg font-semibold mb-4">Step 2: Verify Hometown Address</h3>
                    {employeeData.isHometownVerified === false ? (
                        <div>
                            <input
                                type="text"
                                placeholder="Hometown Address"
                                className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
                                value={employeeData.hometownAddress}
                                onChange={(e) => setEmployeeData({ ...employeeData, hometownAddress: e.target.value })}
                            />

                            <button
                                className="bg-cyan-900 text-white px-4 py-2 rounded"
                                onClick={handleHometownSubmit}
                            >
                                Verify Hometown Address
                            </button>
                        </div>
                    ) :
                        (
                            <div>
                                <p>{employeeData.hometownAddress}</p>
                                <p className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                                    Verified
                                </p>
                            </div>
                        )}

                </div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <h3 className="text-lg font-semibold mb-4">Step 3: Verify Current Address</h3>
                    {employeeData.isCurrentAddressVerified === false ? (
                        <div>
                            <input
                                type="text"
                                placeholder="Current Address"
                                className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
                                value={employeeData.currentAddress}
                                onChange={(e) => setEmployeeData({ ...employeeData, currentAddress: e.target.value })}
                            />
                            <button
                                className="bg-cyan-900 text-white px-4 py-2 rounded"
                                onClick={handleCurrentAddressSubmit}
                            >
                                Verify Current Address
                            </button>
                        </div>
                    ) :
                        (
                            <div>
                                <p>{employeeData.currentAddress}</p>
                                <p className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                                    Verified
                                </p>
                            </div>
                        )}

                </div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <h3 className="text-lg font-semibold mb-4">Step 4: Upload Aadhaar Card</h3>
                    {employeeData.isAadhaarUploaded === false ? (
                        <div>
                            <input
                                type="file"
                                ref={aadhaarFileRef}
                                className="mb-4"
                            />
                            <button
                                className="bg-cyan-900 text-white px-4 py-2 rounded"
                                onClick={handleAadhaarSubmit}
                            >
                                Upload Aadhaar Card
                            </button>
                        </div>
                    ) :
                        (
                            <div>
                                <a href={employeeData.AadhaarCard} target="_blank" rel="noopener noreferrer" className="mb-4 w-1/4 text-blue-500 underline">View Aadhaar Card</a>
                                <p className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                                    Verified
                                </p>
                            </div>
                        )}
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <h3 className="text-lg font-semibold mb-4">Step 5: Answer Police Verification Questions</h3>
                    {employeeData.isQuestionsVerified === false ? (
                        <div>
                            <input
                                type="text"
                                name="question1"
                                placeholder="Question 1"
                                className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
                                value={employeeData.step5Data.question1}
                                onChange={handleQuestionChange}
                            />
                            <input
                                type="text"
                                name="question2"
                                placeholder="Question 2"
                                className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
                                value={employeeData.step5Data.question2}
                                onChange={handleQuestionChange}
                            />
                            <input
                                type="text"
                                name="question3"
                                placeholder="Question 3"
                                className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
                                value={employeeData.step5Data.question3}
                                onChange={handleQuestionChange}
                            />
                            <button
                                className="bg-cyan-900 text-white px-4 py-2 rounded"
                                onClick={handleQuestionsSubmit}
                            >
                                Verify Questions
                            </button>
                        </div>
                    ) :
                        (
                            <p className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                                Verified
                            </p>

                        )}

                </div>
            </div>
        </div >
    );
};

export default EmployeeVerification;
