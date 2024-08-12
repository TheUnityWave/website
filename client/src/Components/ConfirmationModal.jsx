import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">{message}</h3>
                <div className="flex justify-end gap-2">
                    <button
                        className="bg-gray-400 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
