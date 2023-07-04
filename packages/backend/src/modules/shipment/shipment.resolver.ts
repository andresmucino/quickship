import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';

/*Local Imports */
import { ShipmentService } from './shipment.service';
import { ShipmentDTO } from './dto/shipment.dto';

@Resolver(() => ShipmentDTO)
export class ShipmentResolver extends CRUDResolver(ShipmentDTO) {
  constructor(readonly shipmentService: ShipmentService) {
    super(shipmentService);
  }
}
