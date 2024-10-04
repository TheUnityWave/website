import React from 'react';
import Course from '../Pages/Course';
import Industry from '../Pages/Industry';
import CourseInfo from '../Pages/CourseInfo';
import CourseService from '../Pages/CourseService';
import Faq from '../Pages/Faq';
import Feedback from '../Pages/Feedback';

const TrainingProgram = () => {
    return (
        <div>
            <Industry />
           <Course />
          <CourseInfo />
            <CourseService />
            <Faq />
            <Feedback /> 
        </div>
    );
};
export default TrainingProgram;
