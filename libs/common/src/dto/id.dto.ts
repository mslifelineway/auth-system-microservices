import { z } from 'zod';
import { ObjectId } from 'mongodb';

const GetIDSchema = z.object({
  id: z.string().refine((val) => ObjectId.isValid(val), {
    message: 'Invalid MongoDB ObjectId',
  }),
});

export type GetIDDto = z.infer<typeof GetIDSchema>;
