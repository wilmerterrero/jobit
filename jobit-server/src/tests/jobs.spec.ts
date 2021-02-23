import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import { MoreThan } from 'typeorm';
import { SearchConnectionConfig } from '../config/connection.config';
import { UsersModel } from '../models/users.model';
import { JobsModel } from '../models/jobs.model';

const data = {
    location: faker.address.city(),
    position: faker.commerce.department(),
    company: faker.company.companyName(),
    type: faker.company.bsNoun(),
    description: faker.hacker.phrase()
}
const url: string = 'http://localhost:8080';
let token: any;

chai.use(chaiHttp);
chai.should();
describe('Jobs tests', () => {
    beforeEach((done) => {
        chai.request(url).post('/auth/login').send({
            email: "Moises@gmail.com",
            password: "Moises"
        })
        .end((err, res) => {
            chai.should().not.exist(err);
            chai.expect(res).to.have.status(201);
            chai.expect(res.body).to.have.property('msg');

            token = res.body.token;

            done();
        });
    });

    describe('GET Requests', () => {
        it('Should retrieve all jobs from database', (done) => {
            chai.request(url).get('/jobs').set({
                'Authorization': `Bearer ${token}`
            })
            .then((res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('msg').which.equals(JobsModel.find());
            });
            done();
        });
    });

});