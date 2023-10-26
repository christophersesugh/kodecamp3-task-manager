/* eslint-disable no-unused-vars */
import request from 'supertest';
const baseUrl = 'http://localhost:3000';
// beforeEach(funtion(){

// })

// before(function (){})

describe('GET /tasks', () => {
  it('should return a status code of 401', (done) => {
    request(baseUrl).get('/tasks').expect(401, done);
  });

  it('should have a content type of application/json', (done) => {
    request(baseUrl)
      .get('/tasks')
      .expect('Content-Type', 'application/json; charset=utf-8', done);
  });

  it('should contain a message value of Unauthorized', (done) => {
    request(baseUrl)
      .get('/tasks')
      .expect(/{"message":"Unauthorized."}/, done);
  });
});

const user = {
  username: 'sesugh185',
  password: 'sesugh185',
};

describe('POST /session-auth', () => {
  it('should return a status code of 200', function (done) {
    this.timeout(5000);
    request(baseUrl)
      .post('/session-auth/login')
      .send(user)
      .expect(200)

      .end((err, res) => {
        if (err) {
          done(err);
          throw err;
        }
        // console.log(res);
        done();
      });
  });
  it('should resturn a response message of login success', (done) => {
    request(baseUrl)
      .post('/session-auth/login')
      .send(user)
      .expect('{"message":"Login success.","errors":null}')
      .end((err, res) => {
        if (err) {
          done(err);
          throw err;
        }
        // console.log(res);
        done();
      });
  });
});
