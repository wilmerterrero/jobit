import React from 'react';
 
const JobsLayout: React.FC = ({ children }) => {
    return ( 
        <div className="mx-auto px-4 py-12 md:px-16 bg-gray-800">
            <h1 className="text-white text-2xl font-bold py-4 px-1 my-1 lg:my-4 lg:px-10 underline">List of jobs</h1>
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                {children}
            </div>
        </div>
    );
}
 
export default JobsLayout;