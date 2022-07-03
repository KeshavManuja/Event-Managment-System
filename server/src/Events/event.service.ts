import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './event.schema';
import { eventDto } from './events.dto';

export interface responseEvents {
  res: Event[];
  pages: number;
}

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private event: Model<EventDocument>) { }

  async createEvent(body: eventDto): Promise<Event> {
    try {

      const newEvent = await new this.event(body);
      return newEvent.save();
    }
    catch (err) {
      throw new HttpException(
        err.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getEvents(p): Promise<responseEvents> {
    let key = Object.keys(p)
    if (key.length == 0) {
      let pages = 1;
      let res = await this.event.find({});
      return { res, pages }
    }
    for (let key in p) {
      if (
        key !== 'virtual' &&
        key !== 'startDate' &&
        key !== 'endDate' &&
        key !== 'page'
      )
        p[key] = new RegExp(p[key], 'i');
    }

    const { startDate, endDate, page, ...query } = p;
    let temp = [{}];
    let limit = 4;
    if (startDate && endDate && endDate >= startDate) {
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

    let skip = (page - 1) * limit;

    let res = await this.event
      .find({ $or: temp, ...query })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
    let count = await this.event.countDocuments({ $or: temp, ...query });
    return { res, pages: Math.ceil(count / limit) };
  }

  async setCategories(): Promise<Event[]> {
    let categories = await this.event.distinct('category');
    return categories;
  }

  async deleteEvents(id: string): Promise<Event> {
    let response = await this.event.findByIdAndDelete(id);
    return response;
  }

  async getMyEvents(userID: string, page: string) {
    const limit = 2;
    let skip = (Number(page) - 1) * limit;
    let events = await this.event.find({ createdBy: { $in: [userID] } }).skip(skip).limit(limit).lean().exec();

    let count = await this.event.countDocuments({ createdBy: { $in: [userID] } });
    return { events, pages: Math.ceil(count / limit) };

  }
}
