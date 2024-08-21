import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import './modal.css';
import axios from 'axios';

Modal.setAppElement('#root');

const clientComplaints = ['Unqualified Personnel', 'Unprofessional Behavior', 'Punctuality Issues', 'Poor Communication Skills', 'Inadequate Training','Uniform Issues','Health and Safety Concerns','Lack of Tools/Equipment', 'Unsatisfactory Performance', 'Replacement Request','Others'];
const employeeComplaints = ['Salary Discrepancy', 'Unsafe Working Conditions', 'Harassment','Training Issues', 'Unclear Instructions', 'Overtime Concerns','Accommodation Issues','Health and Safety', 'Workplace Conflict','Lack of Equipment', 'Others'];

const RaiseTicketModal = ({ onClose }) => {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [userType, setUserType] = useState('');
    const [complaint, setComplaint] = useState('');
    const [complaintsList, setComplaintsList] = useState([]);
    const [otherComplaint, setOtherComplaint] = useState('');
   
    
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
                'https://website-server-p59e.onrender.com/api/admin/tickets',
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
            <div className='flex flex-col md:px-12 px-12  font-primary  '>
                <h2 className='title text-primary font-primary font-bold text-3xl'>Raise a Ticket</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-2 text-sm'>
                    <label className='w-full'>
                        <p className='block mb-1 text-sm font-medium text-gray-900'>Full Name <br /></p>
                        <input
                            id='name'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder='Full Name'
                            className=' w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </label>
                   
                    <label className='w-full'>
                        <p className='block mb-1 text-sm font-medium text-gray-900'>Email <br /></p>
                        <input
                            id='company'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Email'
                            className=' w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </label>
                    <label className='w-full'>
                        <p className='block mb-1 text-sm font-medium text-gray-900'>Contact Number <br /></p>
                        <input
                            id='company'
                            type="tel"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            required
                            placeholder='Contact Number'
                            className=' w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </label>
                    <label className='w-full'>
                        <p className='block mb-1 text-sm font-medium text-gray-900'>Company <br /></p>
                        <input
                            id='company'
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                            placeholder='Company'
                            className=' w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </label>
                    <label className='w-full'>
                        <p className='block mb-1 text-sm font-medium text-gray-900'>User Type <br /></p>
                        <select
                            id='userType'
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            required
                            className=' w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        >
                            <option value="" disabled>Select User Type</option>
                            <option value="Client">Client</option>
                            <option value="Employee">Employee</option>
                        </select>
                    </label>
                    <label className='w-full'>
                        <p className='block mb-1 text-sm font-medium text-gray-900'>Complaint <br /></p>
                        <select
                            id='complaint'
                            value={complaint}
                            onChange={(e) => setComplaint(e.target.value)}
                            required
                            className=' w-full p-1 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        >
                            <option value="" disabled>Select Complaint</option>
                            {complaintsList.map((comp, index) => (
                                <option key={index} value={comp}>{comp}</option>
                            ))}
                        </select>
                    </label>
                    {complaint === 'Others' && (
                        <label className='w-full'>
                            <p className='block mb-1 text-sm font-medium text-gray-900'>Please specify your complaint <br /></p>
                            <input
                                id='otherComplaint'
                                type="text"
                                value={otherComplaint}
                                onChange={(e) => setOtherComplaint(e.target.value)}
                                required
                                placeholder='Specify your complaint'
                                className=' w-full p-1 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            />
                        </label>
                    )}
                    <div className="flex flex-row-reverse items-center justify-between w-full mt-1">
                    <button type='submit' className='btn bg-primary text-sm text-white px-6 py-1/2 rounded-lg hover:bg-primary/80 transition cursor-pointer '>Raise Ticket</button>
                    <button type='button' onClick={onClose} className='btn text-sm bg-secondary text-white px-6 py-1/2 rounded-lg hover:bg-secondary/80 transition cursor-pointer'>Cancel</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default RaiseTicketModal;
