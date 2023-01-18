import { Test, TestingModule } from '@nestjs/testing';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { ParkingRepository } from './parking.repository';
import { ResponseParkingDto } from './dto/response-parking.dto';
import { NotFoundException } from '@nestjs/common';

describe('ParkingController', () => {
  let controller: ParkingController;

  let parkingRepo: ParkingRepository;
  let parkingService: ParkingService;

  const licensePlateNumbers = ['1230', '1231', '1232', '1233', '1234'];
  let firstRecordId;

  beforeAll(async () => {
    parkingRepo = new ParkingRepository();
    parkingService = new ParkingService(parkingRepo);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingController],
      providers: [
        {
          provide: ParkingService,
          useValue: parkingService,
        },
      ],
    }).compile();

    controller = module.get<ParkingController>(ParkingController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Add car in parking', async () => {
    const newParking: ResponseParkingDto = await controller.createParking({
      licensePlateNumber: licensePlateNumbers[0],
    });
    expect(newParking._id).toBeDefined();
    firstRecordId = newParking._id;
    expect(newParking.licensePlateNumber).toEqual(licensePlateNumbers[0]);
    expect(newParking.slotNumber).toEqual(0);
  });

  it('Get car in parking', async () => {
    const parkedCar: ResponseParkingDto = await controller.findBySlot(0);
    expect(parkedCar._id).toEqual(firstRecordId);
    expect(parkedCar.licensePlateNumber).toEqual(licensePlateNumbers[0]);
    expect(parkedCar.slotNumber).toEqual(0);
  });

  it('Unpark car in parking', async () => {
    const removedCar: ResponseParkingDto = await controller.removeParking(
      licensePlateNumbers[0],
    );
    expect(removedCar._id).toEqual(firstRecordId);
    expect(removedCar.licensePlateNumber).toEqual(licensePlateNumbers[0]);
    expect(removedCar.slotNumber).toEqual(0);
  });

  it('Get car in parking that not exist', async () => {
    expect(controller.findBySlot(0)).rejects.toThrow(NotFoundException);
  });
});
