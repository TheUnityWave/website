import React, { useEffect, useState } from 'react';

const Employees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/employees');
                if (!response.ok) {
                    throw new Error('Failed to fetch employees');
                }
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
                alert('Error fetching employees: ' + error.message);
            }
        };

        fetchEmployees();
    }, []);

    const makeAdmin = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/employees/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const updatedEmployee = await response.json();
                setEmployees(employees.map(emp => emp._id === id ? updatedEmployee : emp));
            } else {
                const errorData = await response.json();
                console.error('Failed to update employee:', errorData.message);
                alert('Failed to update employee: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error updating employee:', error);
            alert('Error updating employee: ' + error.message);
        }
    };

    return (
        <div className="flex">
            <div className="p-4 md:p-8 bg-gray-200 flex-1">
                <h2 className="text-2xl bg-cyan-900 from-blue-600 to-blue-400 text-white font-bold py-4 px-6 rounded-lg shadow-md mb-6">
                    Employees
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto h-[calc(80vh-72px-2rem)]">
                    {employees.map(employee => {
                        // Parse policeVerificationDetails if it's a string
                        const policeVerificationDetails = typeof employee.policeVerificationDetails === 'string'
                            ? JSON.parse(employee.policeVerificationDetails)
                            : employee.policeVerificationDetails;

                        return (
                            <div key={employee._id} className="relative p-6 rounded-lg shadow-lg bg-white border-2 border-gray-300">
                                {employee.isAdmin && (
                                    <div className="absolute top-2 right-2 bg-red-500 text-white text-sm font-semibold py-1 px-3 rounded-lg shadow-md">
                                        Admin
                                    </div>
                                )}
                                <img src={employee.EmployeePhoto} alt="Employee" className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-gray-200 mb-4" />
                                <h3 className="text-2xl font-semibold text-center mb-2">{employee.firstName} {employee.lastName}</h3>
                                <p><strong>Email:</strong> {employee.email}</p>
                                <p><strong>Mobile:</strong> {employee.mobile}</p>
                                <p><strong>Job:</strong> {employee.job}</p>
                                <p><strong>Experience:</strong> {employee.experience}</p>
                                <p><strong>Hometown Address:</strong> {employee.hometownAddress}</p>
                                <p><strong>Current Address:</strong> {employee.currentAddress}</p>
                                <p><strong>Adhaar Card:</strong>
                                    <a href={employee.AdhaarCard} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        View
                                    </a>
                                </p>

                                <div className="mt-4">
                                    <h4 className="text-lg font-semibold mb-2">Police Verification Details:</h4>
                                    <p><strong>Question 1:</strong> {policeVerificationDetails.question1}</p>
                                    <p><strong>Question 2:</strong> {policeVerificationDetails.question2}</p>
                                    <p><strong>Question 3:</strong> {policeVerificationDetails.question3}</p>
                                </div>
                                {!employee.isAdmin &&
                                    <button
                                        onClick={() => makeAdmin(employee._id)}
                                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                        disabled={employee.isAdmin}
                                    >
                                        Make Admin
                                    </button>
                                }
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Employees;
