import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from 'src/Authguard/AuthGuard';
import { RoleGuard } from 'src/Authguard/RoleGuard';
import { JoiValidationPipe } from 'src/joi.validation.pipe';
import { userRoles } from 'src/userRole';
import { EventService } from './event.service';
import { eventDto } from './events.dto';
import { JoiEventFilterSchema, JoiEventSchema } from './joi.event.schema';

interface getEventsQueries {
  title?: String,
  tag?: String,
  address?: String,
  categories?: String,
  startDate?: String,
  endDate?: String,
  virtual?: Boolean,
  page: Number
}


@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventService) { }

  @RoleGuard(userRoles.Manager)
  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(new JoiValidationPipe(JoiEventSchema))
  createEvent(@Body() body: eventDto) {

    return this.eventService.createEvent(body);
  }

  @UsePipes(new JoiValidationPipe(JoiEventFilterSchema))
  @Get()
  getEvents(@Query() p: getEventsQueries, @Body() body: eventDto) {

    return this.eventService.getEvents(p)
  }

  @RoleGuard(userRoles.Manager)
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteEvents(@Param('id') id: string) {
    return this.eventService.deleteEvents(id)
  }

  @Get('/category')
  setCategories() {
    return this.eventService.setCategories()
  }

  @Get('/tags')
  setTags() {
    return this.eventService.setTags();
  }

  @Get('/myevents/:id/:page')
  getMyEvents(@Param('id') id, @Param('page') page) {
    return this.eventService.getMyEvents(id, page);
  }
}

