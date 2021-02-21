import React, { useContext } from 'react';
import authContext from '../../../context/auth/authContext';
import Alert from '../Alert';

const JobAlert = () => {

    const AuthContext = useContext(authContext);

    const { message } = AuthContext;

    return ( 
        <Alert message={message} />
     );
}
 
export default JobAlert;