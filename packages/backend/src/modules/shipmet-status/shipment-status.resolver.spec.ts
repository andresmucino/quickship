import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentStatusResolver } from './shipment-status.resolver';
import { ShipmentStatusService } from './shipment-status.service';

describe('OrderStatusResolver', () => {
  let resolver: ShipmentStatusResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShipmentStatusResolver, ShipmentStatusService],
    }).compile();

    resolver = module.get<ShipmentStatusResolver>(ShipmentStatusResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
