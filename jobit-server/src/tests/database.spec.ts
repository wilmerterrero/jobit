import { SearchConnectionConfig } from '../config/connection.config';

describe('Database connection test', () => {
    it('Should connect to the database correctly', (done) => {
        SearchConnectionConfig();
        done();
    })
})