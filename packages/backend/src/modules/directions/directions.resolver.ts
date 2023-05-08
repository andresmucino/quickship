import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DirectionsService } from './directions.service';
import { DirectionsDto } from './dto/directions.dto';
import { CreateDirectionInput } from './dto/create-direction.input';
import { UpdateDirectionInput } from './dto/update-direction.input';

@Resolver(() => DirectionsDto)
export class DirectionsResolver {
  constructor(private readonly directionsService: DirectionsService) {}

  @Query(() => [DirectionsDto], { name: 'directions' })
  findAlDirectionsl() {
    return this.directionsService.findAllDirections();
  }

  @Query(() => DirectionsDto, { name: 'direction' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.directionsService.findOneDirection(id);
  }

  @Mutation(() => DirectionsDto)
  createDirection(
    @Args('createDirectionInput') createDirectionInput: CreateDirectionInput,
  ) {
    return this.directionsService.createDirection(createDirectionInput);
  }

  @Mutation(() => DirectionsDto)
  updateDirection(
    @Args('updateDirectionInput') updateDirectionInput: UpdateDirectionInput,
    id: number,
  ) {
    return this.directionsService.updateDirection(id, updateDirectionInput);
  }

  // @Mutation(() => Directions)
  // removeDirection(@Args('id', { type: () => Int }) id: number) {
  //   return this.directionsService.remove(id);
  // }
}
