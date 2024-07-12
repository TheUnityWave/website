// EmployeeDashboard.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import EmployeeVerification from './EmployeeVerification';
import EmployeeTraining from './EmployeeTraining';
import RaiseTicket from './RaiseTicket';

const EmployeeDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 w-full">
        <Routes>
          <Route path="verification" element={<EmployeeVerification />} />
          <Route path="training" element={<EmployeeTraining />} />
          <Route path="raise-ticket" element={<RaiseTicket />} />
        </Routes>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
