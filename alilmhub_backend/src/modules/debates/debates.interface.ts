import { Types } from "mongoose";

export type TDebates = {
  slug: string;
  title: string;
  titleDescription?: string;
  topicId?: Types.ObjectId;
  author: Types.ObjectId;
  supportingMembers: Types.ObjectId[];
  opposingMembers: Types.ObjectId[];
  description: string;
  references: Types.ObjectId[];
  status: "open" | "closed" | "archived";
  stance: "supporting" | "opposing";
  viewsCount?: number;
  supportingVotesCount: number;
  opposingVotesCount: number;
  isDeleted?: boolean;

  createdAt: Date;
  updatedAt: Date;
};
