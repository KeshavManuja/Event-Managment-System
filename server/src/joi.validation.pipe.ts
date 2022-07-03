import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) { }

  transform(value: any, metadata: ArgumentMetadata) {
    if (value?.user) {
      return value;
    }
    const { error } = this.schema.validate(value);
    if (error) {
      throw new HttpException(
        { message: error.details[0].message },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}