import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { eventDto } from './events.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  createEvent(@Body() body:eventDto) {
    return this.eventService.createEvent(body);
  }

  @Get()
  getEvents(@Query() p:any, @Body() body:eventDto) {
    return this.eventService.getEvents(p)
  }

  @Delete(':id')
  deleteEvents(@Param('id') id:string) {
    return this.eventService.deleteEvents(id)
  }
  
  @Get('/category')
  setCategories() {
    return this.eventService.setCategories()
  }

  
}

