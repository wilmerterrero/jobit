import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import { JobsModel } from '../models/jobs.model';

const data = {
    location: faker.address.city(),
    position: faker.commerce.department(),
    company: faker.company.companyName(),
    type: faker.company.bsNoun(),
    description: faker.hacker.phrase(),
    category: "programming"
}
const url: string = 'http://localhost:8080';

chai.use(chaiHttp);
chai.should();
describe('Jobs tests', () => {
    describe('GET Requests', () => {
        it('Should retrieve all jobs from database', (done) => {
            chai.request(url).get('/jobs')
            .end(async(err, res) => {
                chai.should().not.exist(err);
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('msg').which.is.an('array').and.equals(await JobsModel.find());
            });
            done();
        });

        it('Should retrieve one job from database', (done) => {
            chai.request(url).get(`/jobs/one/${1}`)
            .end(async(err, res) => {
                chai.should().not.exist(err);
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('msg').which.is.an('object').and.equals(await JobsModel.findOne({id: 1}));
            });    
            done();
        });

        it('Should retrieve paginated jobs from database', (done) => {
            chai.request(url).get(`/jobs/pages/${0}/${10}`)
            .end(async(err, res) => {
                chai.should().not.exist(err);
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('msg').which.is.an('array').and.equals(await JobsModel.find({skip: 0, take: 10}));
            });
            done();
        });
    });

    describe('Authenticated Requests', () => {
        it('Should login and user and perform POST, PUT, DELETE requests', (done) => {
            chai.request(url).post('/auth/login')
            .send({
                email: "Moises@gmail.com",
                password: "Moises"
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(201);
                const token = res.body;

                chai.request(url).post('/jobs/publish')
                .auth(token, {type: 'bearer'})
                .send({
                    location: data.location,
                    position: data.position,
                    company: data.company,
                    type: data.type,
                    description: data.description,
                    category: data.category
                })
                .end((err, res) => {
                    chai.should().not.exist(err);
                    chai.expect(res).to.have.status(201);
                    chai.expect(res.body).to.have.property('msg').which.is.an('object');
                });
            });    
            done();
        });

    });
});

