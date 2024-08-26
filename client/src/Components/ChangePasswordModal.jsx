import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import './modal.css';
import axios from 'axios';

Modal.setAppElement('#root');

const ChangePasswordModal = ({ onClose }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const res = await axios.post(
                'https://website-server-six.vercel.app/api/employee/change-password',
                { newPassword, confirmPassword },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    }
                }
            );

            if (res.status === 200) {
                toast.success("Password changed successfully!");
                onClose();
            }
        } catch (err) {
            toast.error("Failed to change password. Please try again later.");
            console.error('Error:', err.message);
        }
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={onClose}
            contentLabel="Change Password"
            className="modal"
            overlayClassName="overlay"
        >
            <div className='flex flex-col md:px-24 px-12 py-12 font-primary'>
                <h2 className='title text-primary font-primary font-bold text-4xl'>Change Password</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
                    <label className='w-full'>
                        <p className='block mb-2 text-md font-medium text-gray-900'>New Password <br /> </p>
                        <input
                            id='newPassword'
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            placeholder='New Password'
                            className='input w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </label>
                    <label className='w-full'>
                        <p className='block mb-2 text-md font-medium text-gray-900'>Confirm Password <br /> </p>
                        <input
                            id='confirmPassword'
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder='Confirm Password'
                            className='input w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </label>
                    <button type='submit' className='btn bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/80 transition cursor-pointer'>Change Password</button>
                    <button type='button' onClick={onClose} className='btn bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/80 transition cursor-pointer mt-4'>Cancel</button>
                </form>
            </div>
        </Modal>
    );
};

export default ChangePasswordModal;
