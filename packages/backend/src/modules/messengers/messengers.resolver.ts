import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MessengersService } from './messengers.service';
import { MessengerDto } from './dto/messenger.dto';
import { CreateMessengerInput } from './dto/create-messenger.input';
import { UpdateMessengerInput } from './dto/update-messenger.input';

@Resolver('Messenger')
export class MessengersResolver {
  constructor(private readonly messengersService: MessengersService) {}

  @Query(() => [MessengerDto], { name: 'messengers' })
  findAllMesssenger() {
    return this.messengersService.findAllMessengers();
  }

  @Query(() => MessengerDto, { name: 'messenger' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.messengersService.findOneMessenger(id);
  }

  @Mutation(() => MessengerDto)
  createMessenger(
    @Args('createMessengerInput') createMessengerInput: CreateMessengerInput,
  ) {
    return this.messengersService.createMessenger(createMessengerInput);
  }

  @Mutation(() => MessengerDto)
  updateMessenger(
    @Args('updateMessengerInput') updateMessengerInput: UpdateMessengerInput,
    id: number,
  ) {
    return this.messengersService.updateMessenger(id, updateMessengerInput);
  }

  // @Mutation(() => MessengerEntity)
  // removeMessenger(@Args('id', { type: () => Int }) id: number) {
  //   return this.messengersService.remove(id);
  // }
}
