import * as joi from 'joi';

export const JoiEventSchema = joi.object({
  title: joi.string().min(3).max(30).error(new Error('title must be at least 3 characters')).required(),
  description: joi.string().min(5).error(new Error('Description must be of atleast 5 characters')).required(),
  category: joi.string().min(3).error(new Error('category must be of atleast 3 characters')).required(),
  tags: [joi.string().required()],
  address: joi.string().error(new Error('Address must be of atleast 5 characters')).required(),
  virtual: joi.boolean().required(),
  startDate: joi.string().error(new Error('Start Date is required')).required(),
  endDate:joi.string().error(new Error('End Date is required')).required(),
  createdBy: joi.string().required(),
}).options({
  abortEarly: false,
});


export const JoiEventFilterSchema = joi.object({
    title: joi.string(),
    category: joi.string(),
    address: joi.string(),
    virtual: joi.boolean(),
    startDate: joi.string(),
    endDate:joi.string(),
    page:joi.string().default(1).min(1),
    createdBy: joi.string(),
})