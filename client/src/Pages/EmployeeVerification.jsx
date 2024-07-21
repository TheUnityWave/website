import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const EmployeeVerification = () => {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isPhotoTaken, setIsPhotoTaken] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [employeeData, setEmployeeData] = useState({
        hometownAddress: '',
        currentAddress: '',
        isHometownVerified: false,
        isCurrentAddressVerified: false,
        isAadhaarUploaded: false,
        step5Data: {
            question1: '',
            question2: '',
            question3: ''
        },
        isQuestionsVerified: false,
        EmployeePhoto: null
    });
    const [verificationProgress, setVerificationProgress] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
                        isHometownVerified: data.isHometownVerified || false,
                        isCurrentAddressVerified: data.isCurrentAddressVerified || false,
                        isAadhaarUploaded: data.isAadhaarUploaded || false,
                        step5Data: {
                            question1: data.policeVerificationDetails.question1 || '',
                            question2: data.policeVerificationDetails.question2 || '',
                            question3: data.policeVerificationDetails.question3 || ''
                        },
                        isQuestionsVerified: data.isQuestionsVerified || false,
                        EmployeePhoto: data.EmployeePhoto || null
                    });
                    setIsPhotoTaken(!!data.EmployeePhoto);
                    setCapturedImage(data.EmployeePhoto || null);
                } else {
                    console.error('Failed to fetch employee data');
                }
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployeeData();
    }, []);

    useEffect(() => {
        const stepsCompleted = [
            isPhotoTaken,
            employeeData.isHometownVerified,
            employeeData.isCurrentAddressVerified,
            employeeData.isAadhaarUploaded,
            employeeData.step5Data.question1 !== '',
            employeeData.step5Data.question2 !== '',
            employeeData.step5Data.question3 !== '',
            employeeData.isQuestionsVerified
        ].filter(step => step).length;

        const totalSteps = 8;
        const progressPercentage = (stepsCompleted / totalSteps) * 100;

        setVerificationProgress(progressPercentage);
    }, [isPhotoTaken, employeeData]);

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
        setEmployeeData(prevData => ({ ...prevData, EmployeePhoto: imageData }));
        closeCamera();
        setIsPhotoTaken(true);
    };

    const retakePhoto = () => {
        setIsPhotoTaken(false);
        setCapturedImage(null);
        openCamera();
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
            } else {
                alert('Failed to verify hometown address');
            }
        } catch (error) {
            console.error('Error submitting hometown address:', error);
            alert('An error occurred while submitting hometown address');
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
            } else {
                alert('Failed to verify current address');
            }
        } catch (error) {
            console.error('Error submitting current address:', error);
            alert('An error occurred while submitting current address');
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
            } else {
                alert('Failed to upload Aadhaar card');
            }
        } catch (error) {
            console.error('Error submitting Aadhaar card:', error);
            alert('An error occurred while submitting Aadhaar card');
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
            } else {
                alert('Failed to verify questions');
            }
        } catch (error) {
            console.error('Error submitting questions:', error);
            alert('An error occurred while submitting questions');
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

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
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
                alert('Employee photo saved successfully');
            } else {
                alert('Failed to save employee photo');
            }
        } catch (error) {
            console.error('Error submitting photo:', error);
            alert('An error occurred while submitting photo');
        }
    };

    return (
        <div className="flex">
            <div className="p-4 md:p-8 bg-gray-100 flex-1">
                <h2 className="text-2xl bg-cyan-900 text-white font-semibold py-4 px-6 mb-4 rounded-md">
                    Employee Verification
                </h2>
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <h3 className="text-lg font-semibold mb-4">Step 1: Capture Photo</h3>
                    {isPhotoTaken ? (
                        <div>
                            <img src={capturedImage} alt="Captured" className="mb-4 w-1/4" />
                            <p className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                                Verified
                            </p>

                            {/* <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                                onClick={retakePhoto}
                            >
                                Retake Photo
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handlePhotoSubmit}
                            >
                                Save Photo
                            </button> */}
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
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={openCamera}
                                >
                                    Open Camera
                                </button>
                            )}
                        </div>
                    )}
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <h3 className="text-lg font-semibold mb-4">Step 2: Verify Hometown Address</h3>
                    {!employeeData.hometownAddress ? (
                        <div>
                            <input
                                type="text"
                                placeholder="Hometown Address"
                                className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
                                value={employeeData.hometownAddress}
                                onChange={(e) => setEmployeeData({ ...employeeData, hometownAddress: e.target.value })}
                            />

                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
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
                    {!employeeData.currentAddress ? (
                        <div>
                            <input
                                type="text"
                                placeholder="Current Address"
                                className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
                                value={employeeData.currentAddress}
                                onChange={(e) => setEmployeeData({ ...employeeData, currentAddress: e.target.value })}
                            />
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
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
                    <input
                        type="file"
                        ref={aadhaarFileRef}
                        className="mb-4"
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleAadhaarSubmit}
                    >
                        Upload Aadhaar Card
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <h3 className="text-lg font-semibold mb-4">Step 5: Answer Police Verification Questions</h3>
                    {!employeeData.step5Data ? (
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
                                className="bg-blue-500 text-white px-4 py-2 rounded"
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
            <div className="relative">
                <button
                    className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={toggleSidebar}
                >
                    {isSidebarOpen ? '❌' : '☰'}
                </button>
                <div className={`fixed top-0 right-0 h-full bg-white shadow-lg w-64 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
                    <h2 className="text-2xl bg-cyan-900 text-white font-semibold py-4 px-6 mb-4">
                        Verification Progress
                    </h2>
                    <div className="p-4">
                        <div className="mb-4">
                            <div className="flex justify-between items-center">
                                <span>Step 1</span>
                                <span>{isPhotoTaken ? '✅' : '❌'}</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between items-center">
                                <span>Step 2</span>
                                <span>{employeeData.isHometownVerified ? '✅' : '❌'}</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between items-center">
                                <span>Step 3</span>
                                <span>{employeeData.isCurrentAddressVerified ? '✅' : '❌'}</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between items-center">
                                <span>Step 4</span>
                                <span>{employeeData.isAadhaarUploaded ? '✅' : '❌'}</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between items-center">
                                <span>Step 5</span>
                                <span>{employeeData.isQuestionsVerified ? '✅' : '❌'}</span>
                            </div>
                        </div>
                        <div className="bg-gray-200 rounded-full h-4 mt-4">
                            <div
                                className="bg-green-500 h-4 rounded-full"
                                style={{ width: `${verificationProgress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default EmployeeVerification;
