import * as joi from 'joi';

export const JoiEventSchema = joi.object({
  title: joi.string().min(3).max(30).required(),
  category: joi.string().min(3).required(),
  tags: joi.array().items(joi.string()),
  description: joi.string().min(5).required(),
  address: joi.string().required(),
  startDate: joi.date().required(),
  endDate: joi.date().greater(joi.ref("startDate")).required(),
  virtual: joi.boolean().required(),
  createdBy: joi.string().required(),
}).options({
  abortEarly: false,
});


export const JoiEventFilterSchema = joi.object({
  title: joi.string(),
  category: joi.string(),
  address: joi.string(),
  virtual: joi.boolean(),
  startDate: joi.date(),
  endDate: joi.date(),
  page: joi.string().default(1).min(1),
  createdBy: joi.string(),
})