import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { UserModule } from './Users/user.module';
import { EventModule } from './Events/event.module';
config();
@Module({
  imports: [MongooseModule.forRoot(process.env.mongoURL),UserModule,EventModule],
  controllers: [AppController],
  providers: [ AppService],
})
export class AppModule {}
