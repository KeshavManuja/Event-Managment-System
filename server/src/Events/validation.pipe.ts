import { PipeTransform, BadRequestException } from '@nestjs/common';
import { eventDto } from './events.dto';
import { JoiEventSchema } from './joi.event.schema';

export class CreateUserValidatorPipe implements PipeTransform<eventDto> {
  public transform(value: eventDto): eventDto {
    const result = JoiEventSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}