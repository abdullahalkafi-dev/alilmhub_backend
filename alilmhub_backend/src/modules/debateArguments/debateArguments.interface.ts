import { Types } from "mongoose";

export type TDebateArguments = {
  debateId: Types.ObjectId;
  userId: Types.ObjectId;
  argumentText: string;
  references: Types.ObjectId[];
  upVotes?: number;
  downVotes?: number;
  createdAt: Date;
  updatedAt: Date;
};
