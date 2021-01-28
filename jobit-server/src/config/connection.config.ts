import { createConnection } from "typeorm";

export const SearchConnectionConfig = async() => { 
    const Connection = await createConnection();
    if(Connection.isConnected){
        //synchronize the connection
        Connection.synchronize();
        console.log('Database connected succesfully');
    }
    else{
        console.error('Error on connecting to the database');
    }
}; 