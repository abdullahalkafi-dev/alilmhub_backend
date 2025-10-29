import { Types } from "mongoose";

export type TTopic= {
    slug: string;
    title: string;
    titleDescription?: string;
    parentTopic?: Types.ObjectId;
    editsCount: number;
    viewsCount: number;
    createdBy: Types.ObjectId;
    isDeleted?: boolean;
    createdAt: Date;
    updatedAt: Date;
}