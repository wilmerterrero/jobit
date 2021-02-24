import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import { MoreThan } from 'typeorm';
import { SearchConnectionConfig } from '../config/connection.config';
import { UsersModel } from '../models/users.model';

const data = {
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(8)
}
const url: string = 'http://localhost:8080';


chai.use(chaiHttp);
chai.should();
describe('Authentication tests', () => {
    after(async() => {
        await SearchConnectionConfig();
        await UsersModel.delete({id: MoreThan(2)});
    });

    it('Should register an user to the database', (done) => {
        chai.request(url).post('/auth/register')
        .send({
            username: data.username,
            email: data.email,
            password: data.password
        })
        .end((err, res) => {
            chai.should().not.exist(err);
            chai.expect(res).to.have.status(201);
            chai.expect(res.body).to.have.property('msg').which.is.an('object');
            done();
        });
    });

    it('Should login an user and recieve a token', (done) => {
        chai.request(url).post('/auth/login')
        .send({
            email: "Moises@gmail.com",
            password: "Moises"
        })
        .end((err, res) => {
            chai.should().not.exist(err);
            chai.expect(res).to.have.status(201);
            done();
        });
    });
});
