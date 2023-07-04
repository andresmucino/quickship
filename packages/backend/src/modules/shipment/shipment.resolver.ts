import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

/*Local Imports */
import { ShipmentService } from './shipment.service';
import { ShipmentDTO } from './dto/shipment.dto';
import { ValidationPipe } from '@nestjs/common';
import { InputGenerateShipmentDTO } from './dto/generate-shipment.dto';

@Resolver(() => ShipmentDTO)
export class ShipmentResolver extends CRUDResolver(ShipmentDTO) {
  constructor(readonly shipmentService: ShipmentService) {
    super(shipmentService);
  }

  @Mutation(() => ShipmentDTO)
  public async generateShipment(
    @Args('input', new ValidationPipe())
    input: InputGenerateShipmentDTO,
  ): Promise<ShipmentDTO> {
    return this.shipmentService.generateShipment(input);
  }
}
