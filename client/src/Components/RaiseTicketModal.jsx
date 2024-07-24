import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import './modal.css';
import axios from 'axios';

Modal.setAppElement('#root');

const RaiseTicketModal = ({ onClose }) => {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [userType, setUserType] = useState('');
    const [complaint, setComplaint] = useState('');
    const [complaintsList, setComplaintsList] = useState([]);
    const [otherComplaint, setOtherComplaint] = useState('');

    const clientComplaints = ['Billing Issue', 'Service Outage', 'Technical Support', 'Others'];
    const employeeComplaints = ['HR Issue', 'Payroll Problem', 'Workplace Safety', 'Others'];

    useEffect(() => {
        if (userType === 'Client') {
            setComplaintsList(clientComplaints);
        } else if (userType === 'Employee') {
            setComplaintsList(employeeComplaints);
        }
    }, [userType]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const complaintToSubmit = complaint === 'Others' ? otherComplaint : complaint;

        try {
            const res = await axios.post(
                'http://localhost:5000/api/admin/tickets',
                { name, company, email, mobile, userType, complaint: complaintToSubmit },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            if (res.status === 200) {
                toast.success("Ticket raised successfully!");
                onClose();
            }
        } catch (err) {
            toast.error("Failed to raise ticket. Please try again later.");
            console.error('Error:', err.message);
        }
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={onClose}
            contentLabel="Raise a Ticket"
            className="modal"
            overlayClassName="overlay"
        >
            <div className='flex flex-col md:px-12 px-12 py-8 font-primary'>
                <h2 className='title text-primary font-primary font-bold text-4xl'>Raise a Ticket</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-4'>
                    <label className='w-full'>
                        <p className='block mb-2 text-md font-medium text-gray-900'>Full Name <br /></p>
                        <input
                            id='name'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder='Full Name'
                            className='input w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </label>
                   
                    <label className='w-full'>
                        <p className='block mb-2 text-md font-medium text-gray-900'>Email <br /></p>
                        <input
                            id='company'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Email'
                            className='input w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </label>
                    <label className='w-full'>
                        <p className='block mb-2 text-md font-medium text-gray-900'>Contact Number <br /></p>
                        <input
                            id='company'
                            type="tel"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            required
                            placeholder='Contact Number'
                            className='input w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </label>
                    <label className='w-full'>
                        <p className='block mb-2 text-md font-medium text-gray-900'>Company <br /></p>
                        <input
                            id='company'
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                            placeholder='Company'
                            className='input w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </label>
                    <label className='w-full'>
                        <p className='block mb-2 text-md font-medium text-gray-900'>User Type <br /></p>
                        <select
                            id='userType'
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            required
                            className='input w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        >
                            <option value="" disabled>Select User Type</option>
                            <option value="Client">Client</option>
                            <option value="Employee">Employee</option>
                        </select>
                    </label>
                    <label className='w-full'>
                        <p className='block mb-2 text-md font-medium text-gray-900'>Complaint <br /></p>
                        <select
                            id='complaint'
                            value={complaint}
                            onChange={(e) => setComplaint(e.target.value)}
                            required
                            className='input w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        >
                            <option value="" disabled>Select Complaint</option>
                            {complaintsList.map((comp, index) => (
                                <option key={index} value={comp}>{comp}</option>
                            ))}
                        </select>
                    </label>
                    {complaint === 'Others' && (
                        <label className='w-full'>
                            <p className='block mb-2 text-md font-medium text-gray-900'>Please specify your complaint <br /></p>
                            <input
                                id='otherComplaint'
                                type="text"
                                value={otherComplaint}
                                onChange={(e) => setOtherComplaint(e.target.value)}
                                required
                                placeholder='Specify your complaint'
                                className='input w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            />
                        </label>
                    )}
                    <button type='submit' className='btn bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/80 transition cursor-pointer mt-2'>Raise Ticket</button>
                    <button type='button' onClick={onClose} className='btn bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/80 transition cursor-pointer mt-2'>Cancel</button>
                </form>
            </div>
        </Modal>
    );
};

export default RaiseTicketModal;
