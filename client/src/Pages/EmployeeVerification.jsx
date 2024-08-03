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
        });
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const aadhaarFileRef = useRef(null);
    const policeVerificationRef = useRef(null);

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
                    policeVerification: data.policeVerification,
                    ispoliceVerification: (data.policeVerification ? true : false),
                    
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

    useEffect(() => {
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

    // PHOTO SUBMIT.
    const handlePhotoSubmit = async () => {
        try {
            const formData = new FormData();
            if (capturedImage) {
                const photoBlob = dataURItoBlob(capturedImage);
                formData.append('EmployeePhoto', photoBlob, 'employee_photo.png');
                console.log(photoBlob);
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

    // PHOTO UDPATE.
    const handlePhotoUpdate = async () => {
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
                    policeVerification: data.policeVerification,
                    ispoliceVerification: (data.policeVerification ? true : false),
                    EmployeePhoto: null
                });
                setIsPhotoTaken(false);
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
                setCapturedImage(data.EmployeePhoto);
            } else {
                console.error('Failed to fetch employee data');
            }
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    }

    // HOME TOWN SUBMIT.
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

    // HOME TOWN UPDATE.
    const handleHometownUpdate = async () => {
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
                    isHometownVerified: false,
                    isCurrentAddressVerified: (data.currentAddress ? true : false),
                    AadhaarCard: data.AdhaarCard,
                    isAadhaarUploaded: (data.AdhaarCard ? true : false),
                    policeVerification: data.policeVerification,
                    ispoliceVerification: (data.policeVerification ? true : false),
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
    }

    // CURRENT ADDRESS SUBMIT.
    const handleCurrentAddressUpdate = async () => {
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
                    isCurrentAddressVerified: false,
                    AadhaarCard: data.AdhaarCard,
                    isAadhaarUploaded: (data.AdhaarCard ? true : false),
                    policeVerification: data.policeVerification,
                    ispoliceVerification: (data.policeVerification ? true : false),
                });
                setIsPhotoTaken(!!data.EmployeePhoto);
                setCapturedImage(data.EmployeePhoto);
            } else {
                console.error('Failed to fetch employee data');
            }
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    }

    // CURRENT ADDRESS UPDATE.
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

    // Police CARD SUBMIT.
    const handlePoliceSubmit = async () => {
        try {
            const formData = new FormData();
            if (policeVerificationRef.current.files[0]) {
                formData.append('policeVerification', policeVerificationRef.current.files[0]);
            }

            const response = await axios.post('http://localhost:5000/api/employee/employee-verification', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'auth-token': localStorage.getItem('token')
                }
            });

            if (response.status === 200) {
                setEmployeeData(prevData => ({ ...prevData, ispoliceVerification: true }));
                fetchEmployeeData();
                toast.success("Police Verification Uploaded");
            } else {
                toast.success("Something went wrong");
            }
        } catch (error) {
            console.error('Error submitting Police Verification:', error);
            toast.success("Something went wrong");
        }
    };

    // AADHAAR CARD UPDATE.
    const handlePoliceUpdate = async () => {
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
                    isAadhaarUploaded:true,
                    
                    policeVerification: data.policeVerification,
                    ispoliceVerification: false,
                    
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
    }
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
                fetchEmployeeData();
                toast.success("Aadhaar Card Uploaded");
            } else {
                toast.success("Something went wrong");
            }
        } catch (error) {
            console.error('Error submitting Aadhaar card:', error);
            toast.success("Something went wrong");
        }
    };

    // AADHAAR CARD UPDATE.
    const handleAadhaarUpdate = async () => {
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
                    isAadhaarUploaded: false,
                    
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
    }


    return (
        <div className="flex">
            <div className=" md:p-4 bg-[#f3f4f6] flex-1">
                <h2 className="text-2xl bg-cyan-900 text-white font-semibold py-3 px-6 mb-4 rounded-md">
                    Employee Verification
                </h2>
                <div className='overflow-y-auto h-[calc(85vh-72px-2rem)]'>
                    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                        <h3 className="text-lg font-semibold mb-4">Step 1: Capture Photo</h3>
                        {employeeData.EmployeePhoto ? (
                            <div>
                                <div className='flex items-center justify-between'>
                                    <img src={employeeData.EmployeePhoto} alt="Captured" className="mb-4 w-1/4" />
                                    <p className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                                        Verified
                                    </p>
                                </div>
                                <button
                                    className="bg-cyan-900 text-white px-3 py-1 rounded"
                                    onClick={handlePhotoUpdate}
                                >
                                    Update
                                </button>
                            </div>
                        ) : (
                            <div>
                                {isCameraOpen ? (
                                    <div>
                                        <video ref={videoRef} width="300" height="300" className="mb-4" />
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
                        <h3 className="text-lg font-semibold mb-4">Step 2: Hometown Address</h3>
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
                                    <div className='flex justify-between'>
                                        <p className='italic'>{employeeData.hometownAddress}</p>
                                        <p className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                                            Verified
                                        </p>
                                    </div>
                                    <button
                                        className="bg-cyan-900 text-white px-3 py-1 rounded"
                                        onClick={handleHometownUpdate}
                                    >
                                        Update
                                    </button>
                                </div>
                            )}

                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                        <h3 className="text-lg font-semibold mb-4">Step 3: Current Address</h3>
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
                                    <div className='flex justify-between'>
                                        <p className='italic'>{employeeData.currentAddress}</p>
                                        <p className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                                            Verified
                                        </p>
                                    </div>
                                    <button
                                        className="bg-cyan-900 text-white px-3 py-1 rounded"
                                        onClick={handleCurrentAddressUpdate}
                                    >
                                        Update
                                    </button>
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
                                <br />
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
                                    <div className='flex items-center justify-between'>
                                        <a href={employeeData.AadhaarCard} target="_blank" rel="noopener noreferrer" className="mb-4 w-1/4 text-blue-500 underline">View Aadhaar Card</a>
                                        <p className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                                            Verified
                                        </p>
                                    </div>
                                    <button
                                        className="bg-cyan-900 text-white px-3 py-1 rounded"
                                        onClick={handleAadhaarUpdate}
                                    >
                                        Update
                                    </button>
                                </div>
                            )}
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                        <h3 className="text-lg font-semibold mb-4">Step 5: Upload Police Verfication</h3>
                        {employeeData.ispoliceVerification === false ? (
                            <div>
                                <input
                                    type="file"
                                    ref={policeVerificationRef}
                                    className="mb-4"
                                />
                                <br />
                                <button
                                    className="bg-cyan-900 text-white px-4 py-2 rounded"
                                    onClick={handlePoliceSubmit}
                                >
                                    Upload Police Verification Form
                                </button>
                            </div>
                        ) :
                            (
                                <div>
                                    <div className='flex items-center justify-between'>
                                        <a href={employeeData.policeVerification} target="_blank" rel="noopener noreferrer" className="mb-4 w-1/4 text-blue-500 underline">View Submitted Form</a>
                                        <p className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                                            Verified
                                        </p>
                                    </div>
                                    <button
                                        className="bg-cyan-900 text-white px-3 py-1 rounded"
                                        onClick={handlePoliceUpdate}
                                    >
                                        Update
                                    </button>
                                </div>
                            )}
                    </div>
                    
                </div>
            </div>
        </div >
    );
};

export default EmployeeVerification;
