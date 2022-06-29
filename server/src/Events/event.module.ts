import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsController } from './event.controller';
import { EventService } from './event.service';
import { Event, EventSchema } from './event.schema';
import { Auth } from 'utils/Auth.Decorator';
import { UserService } from 'src/Users/user.service';
import { UserModule } from 'src/Users/user.module';
import { User, UserSchema } from 'src/Users/user.schema';

@Module({
  imports: [ MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [EventsController],
  providers: [EventService,UserService],
})
export class EventModule {}