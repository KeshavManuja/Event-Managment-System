import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { UserModule } from './Users/user.module';
import { EventModule } from './Events/event.module';
config();
console.log(process.env.mongoURL)
@Module({
  imports: [MongooseModule.forRoot(process.env.mongoURL),EventModule,UserModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
