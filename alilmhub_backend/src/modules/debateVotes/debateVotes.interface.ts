import { Types } from "mongoose";

export type TDebateVotes = {
  debateId: Types.ObjectId;
  userId: Types.ObjectId;
  vote: "supporting" | "opposing";
  createdAt: Date;
  updatedAt: Date;
};
