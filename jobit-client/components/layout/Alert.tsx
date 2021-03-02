import React from 'react';

const Alert = ({ message }) => {
    return ( 
        <div className="bg-blue-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto">
            <p>{ message }</p>
        </div>
     );
}
 
export default Alert;