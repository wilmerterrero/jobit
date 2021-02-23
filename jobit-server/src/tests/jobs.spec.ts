import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import jwt from 'jsonwebtoken';
import { MoreThan } from 'typeorm';
import { SecretKey } from '../config/jwt.config'
import { JobsModel } from '../models/jobs.model';

const data = {
    location: faker.address.city(),
    position: faker.commerce.department(),
    company: faker.company.companyName(),
    type: faker.company.bsNoun(),
    description: faker.hacker.phrase()
}
const url: string = 'http://localhost:8080';
let token: string = 'a';

chai.use(chaiHttp);
chai.should();
describe('Jobs tests', () => {
    beforeEach((done) => {
        chai.request(url).post('/auth/login')
        .send({
            email: "Moises@gmail.com",
            password: "Moises"
        })
        .end((err, res) => {
            chai.should().not.exist(err);
            chai.expect(res).to.have.status(201);
            chai.expect(res.body).to.have.property('msg')
            done();
        });
    });

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
            chai.request(url).get('/jobs/one')
            .send({
                id: 1
            })
            .end(async(err, res) => {
                chai.should().not.exist(err);
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('msg').which.is.an('object').and.equals(await JobsModel.findOne({id: 1}));
            });
            done();
        });

        it('Should retrieve paginated jobs from database', (done) => {
            chai.request(url).get('/jobs/pages')
            .send({
                skip: 1,
                take: 3
            })
            .end(async(err, res) => {
                chai.should().not.exist(err);
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('msg').which.is.an('array').and.equals(await JobsModel.find({skip: 1, take: 3}));
            });
            done();
        });
    }); 

    describe('POST requests', () => {
        it('Should publish a job to the database', (done) => {
            chai.request(url).post('/jobs/publish')
            .auth(token, { type: 'bearer'})
            .set('Authorization', `Bearer ${token}`)
            .send({
                location: data.location,
                position: data.position,
                company: data.company,
                type: data.type,
                description: data.description
            })
            .end((err, res) => {
                chai.should().not.exist(err);
                chai.expect(res).to.have.status(201);
                chai.expect(res.body).to.have.property('msg').which.is.an('object');
            });
            done();
        });
    });

    describe('PUT requests', () => {
        it('Should update a job of the database', (done) => {
            chai.request(url).put('/jobs/update')
            .auth(token, { type: 'bearer'})
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: 1,
                location: data.location,
                position: data.position,
                company: data.company,
                type: data.type,
            })
            .end((err, res) => {
                chai.should().not.exist(err);
                chai.expect(res).to.have.status(201);
                chai.expect(res.body).to.have.property('msg').which.is.an('string');
            });
            done();
        });
    });

    describe('DELETE requests', () => {
        it('Should delete all jobs of the database', (done) => {
            chai.request(url).delete('/jobs/delete')
            .auth(token, { type: 'bearer'})
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                chai.should().not.exist(err);
                chai.expect(res).to.have.status(201);
                chai.expect(res.body).to.have.property('msg').which.is.an('string');
            });
            done();
        });

        it('Should delete one job of the database', (done) => {
            chai.request(url).delete('/jobs/delete/one')
            .auth(token, { type: 'bearer'})
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: 1
            })
            .end((err, res) => {
                chai.should().not.exist(err);
                chai.expect(res).to.have.status(201);
                chai.expect(res.body).to.have.property('msg').which.is.an('string');
            });
            done();
        });
    });
});

console.log(token);