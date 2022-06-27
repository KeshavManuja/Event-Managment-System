import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './event.schema';
import { eventDto } from './events.dto';

export interface responseEvents{
  res:Event[]
  pages:number
}

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private event: Model<EventDocument>) {}

  async createEvent(body: eventDto): Promise<Event> {
    const newEvent = new this.event(body);
    return newEvent.save();
  }

  async getEvents(p): Promise<responseEvents> {
    // console.log(p)
    for (let key in p) {
      if (key !== 'virtual' && key !== 'startDate' && key !== 'endDate' && key !== 'page')
        p[key] = new RegExp(p[key], 'i');
    }

    const { startDate, endDate,page, ...query } = p;
    console.log(page)
    let temp = [{}];
    const limit =2;
    if (startDate && endDate && startDate !== 'null' && endDate !== 'null') {
      temp = [
        {
          startDate: { $gte: startDate, $lte: endDate },
          endDate: { $gte: startDate, $lte: endDate },
        },
      ];
    } else if (startDate && startDate !== 'null') {
      temp = [
        { startDate: { $gte: startDate } },
        { endDate: { $gte: startDate } },
      ];
    } else if (endDate && endDate !== 'null') {
      temp = [{ startDate: { $lte: endDate } }, { endDate: { $lte: endDate } }];
    }

    let skip = (page-1)*limit;

    let res = await this.event
      .find({ $or: temp, ...query })
      .skip(skip)
      .limit(2)
      .lean()
      .exec();
    let count = await this.event.countDocuments({ $or: temp, ...query });
    return {res, pages:Math.ceil(count/2)};
  }

  async setCategories(): Promise<Event[]> {
    let categories = await this.event.distinct('category');
    return categories;
  }

  async deleteEvents(id: string): Promise<Event> {
    return this.event.findByIdAndDelete(id);
  }
}
