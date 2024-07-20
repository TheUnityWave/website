import React, { useEffect, useState } from 'react';

const Employees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/employees');
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
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
                console.error('Failed to update employee');
            }
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <div className="p-4 md:p-8 bg-gray-100 flex-1">
            <h2 className="text-2xl bg-cyan-900 text-white font-semibold py-4 px-6 min-h-16">
                Employees
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {employees.map(employee => (
                    <div key={employee._id} className="bg-white p-4 rounded-lg shadow-md">
                        <img src={employee.EmployeePhoto} alt="Employee" className="w-32 h-32 object-cover rounded-full mx-auto" />
                        <h3 className="text-xl font-semibold text-center mt-4">{employee.email}</h3>
                        <p><strong>Hometown Address:</strong> {employee.hometownAddress}</p>
                        <p><strong>Current Address:</strong> {employee.currentAddress}</p>
                        <p><strong>Adhaar Card:</strong> {employee.AdhaarCard}</p>
                        <div>
                            <h4 className="text-lg font-semibold mt-2">Police Verification Details:</h4>
                            <p><strong>Question 1:</strong> {employee.policeVerificationDetails.question1}</p>
                            <p><strong>Question 2:</strong> {employee.policeVerificationDetails.question2}</p>
                            <p><strong>Question 3:</strong> {employee.policeVerificationDetails.question3}</p>
                        </div>
                        <button
                            onClick={() => makeAdmin(employee._id)}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                            disabled={employee.isAdmin}
                        >
                            {employee.isAdmin ? 'Admin' : 'Make Admin'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Employees;
