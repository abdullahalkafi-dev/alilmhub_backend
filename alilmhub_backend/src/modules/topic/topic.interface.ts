import { Model, Types, Document } from "mongoose";

export type TBreadcrumb = {
  slug: string;
  title: string;
};

export type TTopic = {
  slug: string;
  title: string;
  titleDescription?: string;
  parentTopic?: Types.ObjectId;
  editsCount: number;
  viewsCount: number;
  createdBy: Types.ObjectId;
  references: Types.ObjectId[];
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface ITopicDocument extends TTopic, Document {
  getBreadcrumb(): Promise<TBreadcrumb[]>;
}

export type TopicModel = {
  isExistBySlug(slug: string): Promise<TTopic | null>;
  getBreadcrumbPath(topicId: Types.ObjectId): Promise<TBreadcrumb[]>;
} & Model<ITopicDocument>;
