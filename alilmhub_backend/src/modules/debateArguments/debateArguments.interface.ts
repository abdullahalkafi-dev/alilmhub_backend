import { Types } from "mongoose";

export type TDebateArguments = {
  debateId: Types.ObjectId;
  userId: Types.ObjectId;
  argumentText: string;
  references: Types.ObjectId[];
  upvotes?: number;
  downvotes?: number;

  createdAt: Date;
  updatedAt: Date;
};
