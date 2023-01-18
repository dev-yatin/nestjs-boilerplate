import { resolve } from 'path';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { users } from '../src/modules/auth/mock.users';

describe('Parking (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  const licensePlateNumbers = ['1230', '1231', '1232', '1233', '1234'];
  let firstRecordId;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Login user
    const loginPath = '/auth/login';
    const loginUser = users[0];
    const loginBody = {
      username: loginUser.email,
      password: loginUser.password,
    };

    const loggedInUser = await request(app.getHttpServer())
      .post(loginPath)
      .send(loginBody);
    accessToken = `Bearer ${loggedInUser.body.access_token}`;
  });

  const addCarInParking = () => {
    const addParkingPath = '/park';
    const addedParking = request(app.getHttpServer())
      .post(addParkingPath)
      .set('Authorization', accessToken)
      .send({ licensePlateNumber: licensePlateNumbers[0] });
    return addedParking;
  };

  it('Add car in parking (POST)', async () => {
    return addCarInParking()
      .expect(201)
      .then((res) => {
        const data = res.body;
        expect(data._id).toBeDefined();
        firstRecordId = data._id;
        expect(data.licensePlateNumber).toEqual(licensePlateNumbers[0]);
        expect(data.slotNumber).toEqual(0);
      });
  });

  it('Get car in parking by slot (GET)', async () => {
    const getParkingPath = '/slot/0';
    const addedParking = await addCarInParking();

    return request(app.getHttpServer())
      .get(getParkingPath)
      .set('Authorization', accessToken)
      .expect(200)
      .then((res) => {
        const data = res.body;
        expect(data._id).toEqual(addedParking.body._id);
        expect(data.licensePlateNumber).toEqual(licensePlateNumbers[0]);
        expect(data.slotNumber).toEqual(0);
      });
  });

  it('Unpark car in parking (DELETE)', async () => {
    const addedParking = await addCarInParking();

    const unparkParkingPath = `/unpark/${licensePlateNumbers[0]}`;
    return request(app.getHttpServer())
      .delete(unparkParkingPath)
      .set('Authorization', accessToken)
      .expect(200)
      .then((res) => {
        const data = res.body;
        expect(data._id).toEqual(addedParking.body._id);
        expect(data.licensePlateNumber).toEqual(licensePlateNumbers[0]);
        expect(data.slotNumber).toEqual(0);
      });
  });

  it('Get car in parking by slot that not exist (GET)', async () => {
    const getParkingPath = '/slot/0';

    return request(app.getHttpServer())
      .get(getParkingPath)
      .set('Authorization', accessToken)
      .expect(404);
  });
});
