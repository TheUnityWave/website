import React, { useState, useRef, useEffect } from 'react';

const EmployeeVerification = () => {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isPhotoTaken, setIsPhotoTaken] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [hometownAddress, setHometownAddress] = useState('');
    const [currentAddress, setCurrentAddress] = useState('');
    const [isHometownVerified, setIsHometownVerified] = useState(false);
    const [isCurrentAddressVerified, setIsCurrentAddressVerified] = useState(false);
    const [isAadhaarUploaded, setIsAadhaarUploaded] = useState(false);
    const [isQuestionsVerified, setIsQuestionsVerified] = useState(false);
    const [verificationProgress, setVerificationProgress] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [step5Data, setStep5Data] = useState({
        question1: '',
        question2: '',
        question3: ''
    });
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Calculate verification progress percentage
    useEffect(() => {
        const stepsCompleted = [
            isPhotoTaken,
            isHometownVerified,
            isCurrentAddressVerified,
            isAadhaarUploaded, // Include Aadhaar upload in progress calculation
            step5Data.question1 !== '',
            step5Data.question2 !== '',
            step5Data.question3 !== '',
            isQuestionsVerified // Include custom questions verification in progress calculation
        ].filter(step => step).length;

        const totalSteps = 8; // Total number of verification steps
        const progressPercentage = (stepsCompleted / totalSteps) * 100;

        setVerificationProgress(progressPercentage);
    }, [isPhotoTaken, isHometownVerified, isCurrentAddressVerified, isAadhaarUploaded, step5Data, isQuestionsVerified]);

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

    const retakePhoto = () => {
        setIsPhotoTaken(false);
        setCapturedImage(null);
        openCamera();
    };

    const handleHometownSubmit = () => {
        setIsHometownVerified(true); 
    };

    const handleCurrentAddressSubmit = () => {
        setIsCurrentAddressVerified(true); 
    };

    const handleAadhaarSubmit = () => {
        setIsAadhaarUploaded(true); 
    };

    const handleQuestionsSubmit = () => {
        setIsQuestionsVerified(true); 
    };

    const handleQuestionChange = (event) => {
        const { name, value } = event.target;
        setStep5Data(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex">
            <div className="p-4 md:p-8 bg-gray-100 flex-1">
                {/* Verification Steps */}
                <h2 className="text-2xl bg-cyan-900 text-white font-semibold py-4 px-6 min-h-16">
                    Fill in the details to complete your verification
                </h2>

                {/* Verification Progress */}
                <div className="bg-white p-4 md:p-6 rounded shadow-md mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Verification Progress</h3>
                        <div className="flex items-center">
                            <div className="bg-gray-300 h-2 rounded-full flex-1 mr-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full"
                                    style={{ width: `${verificationProgress}%` }}
                                ></div>
                            </div>
                            <span>{Math.round(verificationProgress)}%</span>
                        </div>
                    </div>
                </div>

                {/* Step 1: Take a Photo */}
                <div className="bg-white p-4 md:p-6 rounded shadow-md mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Step 1: Take a Photo*</h3>
                        {isPhotoTaken ? (
                            <div className="flex items-center">
                                <span className="bg-green-500 text-white px-3 py-1 rounded-md mr-2">Verified</span>
                            </div>
                        ) : (
                            <button className="bg-cyan-900 text-white px-4 py-2 rounded" onClick={openCamera}>
                                Capture Now
                            </button>
                        )}
                    </div>
                    {isCameraOpen && (
                        <div className="mt-4">
                            <video ref={videoRef} className="w-full md:w-64 h-auto rounded mb-4"></video>
                            <div className="flex justify-between">
                                {!isPhotoTaken && (
                                    <button className="bg-green-600 text-white px-4 py-2 rounded mr-2" onClick={takePhoto}>
                                        Take Photo
                                    </button>
                                )}
                                <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={closeCamera}>
                                    Close Camera
                                </button>
                            </div>
                            <canvas ref={canvasRef} className="hidden" width="640" height="480"></canvas>
                        </div>
                    )}
                    {capturedImage && (
                        <div className="mt-4">
                            <h3 className="text-lg font-medium mb-2">Captured Photo:</h3>
                            <img src={capturedImage} alt="Captured" className="w-full md:w-64 h-auto rounded" />
                            <button className="bg-cyan-900 text-white px-4 py-2 rounded mt-2" onClick={retakePhoto}>
                                Retake Photo
                            </button>
                        </div>
                    )}
                </div>

                {/* Step 2: Enter Hometown Address */}
                <div className="bg-white p-4 md:p-6 rounded shadow-md mb-6">
                    <h3 className="text-lg font-medium mb-2">Step 2: Enter your Hometown Address*</h3>
                    {!isHometownVerified ? (
                        <>
                            <input
                                type="text"
                                value={hometownAddress}
                                onChange={(e) => setHometownAddress(e.target.value)}
                                className="border border-gray-300 p-2 w-full rounded mb-2"
                                placeholder="Enter your hometown address"
                            />
                            <button
                                className="bg-cyan-900 text-white px-4 py-2 rounded"
                                onClick={handleHometownSubmit}
                            >
                                Submit
                            </button>
                        </>
                    ) : (
                        <>
                            <p>{hometownAddress}</p>
                            <span className="bg-green-500 text-white px-3 py-1 rounded-md">Verified</span>
                        </>
                    )}
                </div>

                {/* Step 3: Enter Current Address */}
                <div className="bg-white p-4 md:p-6 rounded shadow-md mb-6">
                    <h3 className="text-lg font-medium mb-2">Step 3: Enter your Current Address*</h3>
                    {!isCurrentAddressVerified ? (
                        <>
                            <input
                                type="text"
                                value={currentAddress}
                                onChange={(e) => setCurrentAddress(e.target.value)}
                                className="border border-gray-300 p-2 w-full rounded mb-2"
                                placeholder="Enter your current address"
                            />
                            <button
                                className="bg-cyan-900 text-white px-4 py-2 rounded"
                                onClick={handleCurrentAddressSubmit}
                            >
                                Submit
                            </button>
                        </>
                    ) : (
                        <>
                            <p>{currentAddress}</p>
                            <span className="bg-green-500 text-white px-3 py-1 rounded-md">Verified</span>
                        </>
                    )}
                </div>

                {/* Step 4: Upload Aadhaar Card */}
                <div className="bg-white p-4 md:p-6 rounded shadow-md mb-6">
                    <h3 className="text-lg font-medium mb-2">Step 4: Upload your Aadhaar Card*</h3>
                    {!isAadhaarUploaded ? (
                        <>
                            <input
                                type="file"
                                className="border border-gray-300 p-2 w-full rounded mb-2"
                            />
                            <button
                                className="bg-cyan-900 text-white px-4 py-2 rounded"
                                onClick={handleAadhaarSubmit}
                            >
                                Submit
                            </button>
                        </>
                    ) : (
                        <>
                            <span className="bg-green-500 text-white px-3 py-1 rounded-md">Verified</span>
                        </>
                    )}
                </div>

                {/* Step 5: Custom Form */}
                <div className="bg-white p-4 md:p-6 rounded shadow-md mb-6">
                    <h3 className="text-lg font-medium mb-2">Step 5: Custom Verification Questions*</h3>
                    {!isQuestionsVerified ? (
                        <>
                            <div className="mb-4">
                                <label htmlFor="question1" className="block text-sm font-medium text-gray-700">
                                    Question 1
                                </label>
                                <input
                                    type="text"
                                    id="question1"
                                    name="question1"
                                    value={step5Data.question1}
                                    onChange={handleQuestionChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                    placeholder="Enter answer for question 1"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="question2" className="block text-sm font-medium text-gray-700">
                                    Question 2
                                </label>
                                <input
                                    type="text"
                                    id="question2"
                                    name="question2"
                                    value={step5Data.question2}
                                    onChange={handleQuestionChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                    placeholder="Enter answer for question 2"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="question3" className="block text-sm font-medium text-gray-700">
                                    Question 3
                                </label>
                                <input
                                    type="text"
                                    id="question3"
                                    name="question3"
                                    value={step5Data.question3}
                                    onChange={handleQuestionChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                    placeholder="Enter answer for question 3"
                                />
                            </div>
                            <button
                                className="bg-cyan-900 text-white px-4 py-2 rounded"
                                onClick={handleQuestionsSubmit}
                            >
                                Submit
                            </button>
                        </>
                    ) : (
                        <>
                            <span className="bg-green-500 text-white px-3 py-1 rounded-md">Verified</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeVerification;
