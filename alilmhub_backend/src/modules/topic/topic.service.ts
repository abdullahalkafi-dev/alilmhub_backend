import { StatusCodes } from "http-status-codes";
import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import { Topic } from "./topic.model";
import { TTopic } from "./topic.interface";
import { QueryBuilder } from "../../shared/builder/QueryBuilder";

const createTopic = async (payload: Partial<TTopic>, userId: string) => {
  const topicData = {
    ...payload,
    createdBy: new Types.ObjectId(userId),
  };
  const topic = await Topic.create(topicData);
  return topic;
};

const getAllTopics = async (query: Record<string, unknown>) => {
  const topicQuery = new QueryBuilder(
    Topic.find({ isDeleted: { $ne: true } }),
    query
  )
    .search(["title", "titleDescription"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await topicQuery.modelQuery
    .populate("createdBy", "name email")
    .populate("parentTopic", "slug title")
    .populate("references", "slug title type");

  const meta = await topicQuery.countTotal();

  return { result, meta };
};

const getTopicBySlug = async (slug: string) => {
  const topic = await Topic.findOne({ slug, isDeleted: { $ne: true } })
    .populate("createdBy", "name email profileImage")
    .populate("parentTopic", "slug title")
    .populate("references", "slug title type author verified");

  if (!topic) {
    throw new AppError(StatusCodes.NOT_FOUND, "Topic not found");
  }

  await Topic.findOneAndUpdate({ slug }, { $inc: { viewsCount: 1 } });

  const breadcrumb = await topic.getBreadcrumb();
  const breadcrumbPath = breadcrumb.map((b) => b.title).join(" -> ");

  return {
    ...topic.toObject(),
    breadcrumb,
    breadcrumbPath,
  };
};

const updateTopic = async (
  slug: string,
  updateData: Partial<TTopic>,
  userId: string
) => {
  const topic = await Topic.findOne({ slug, isDeleted: { $ne: true } });
  if (!topic) {
    throw new AppError(StatusCodes.NOT_FOUND, "Topic not found");
  }

  const updatedTopic = await Topic.findOneAndUpdate(
    { slug },
    { ...updateData, $inc: { editsCount: 1 } },
    { new: true, runValidators: true }
  )
    .populate("createdBy", "name email")
    .populate("parentTopic", "slug title")
    .populate("references", "slug title type");

  return updatedTopic;
};

const deleteTopic = async (slug: string, userId: string) => {
  const topic = await Topic.findOne({ slug, isDeleted: { $ne: true } });
  if (!topic) {
    throw new AppError(StatusCodes.NOT_FOUND, "Topic not found");
  }

  const deletedTopic = await Topic.findOneAndUpdate(
    { slug },
    { isDeleted: true },
    { new: true }
  );

  return deletedTopic;
};

const addReferences = async (slug: string, referenceIds: string[]) => {
  const topic = await Topic.findOne({ slug, isDeleted: { $ne: true } });
  if (!topic) {
    throw new AppError(StatusCodes.NOT_FOUND, "Topic not found");
  }

  const objectIds = referenceIds.map((id) => new Types.ObjectId(id));

  const updatedTopic = await Topic.findOneAndUpdate(
    { slug },
    { $addToSet: { references: { $each: objectIds } } },
    { new: true }
  ).populate("references", "slug title type");

  return updatedTopic;
};

const removeReferences = async (slug: string, referenceIds: string[]) => {
  const topic = await Topic.findOne({ slug, isDeleted: { $ne: true } });
  if (!topic) {
    throw new AppError(StatusCodes.NOT_FOUND, "Topic not found");
  }

  const objectIds = referenceIds.map((id) => new Types.ObjectId(id));

  const updatedTopic = await Topic.findOneAndUpdate(
    { slug },
    { $pull: { references: { $in: objectIds } } },
    { new: true }
  ).populate("references", "slug title type");

  return updatedTopic;
};

const getSubTopics = async (parentSlug: string) => {
  const parentTopic = await Topic.findOne({
    slug: parentSlug,
    isDeleted: { $ne: true },
  });
  if (!parentTopic) {
    throw new AppError(StatusCodes.NOT_FOUND, "Parent topic not found");
  }

  const subTopics = await Topic.find({
    parentTopic: parentTopic._id,
    isDeleted: { $ne: true },
  })
    .populate("createdBy", "name email")
    .populate("references", "slug title type")
    .sort({ createdAt: -1 });

  return subTopics;
};

export const TopicServices = {
  createTopic,
  getAllTopics,
  getTopicBySlug,
  updateTopic,
  deleteTopic,
  addReferences,
  removeReferences,
  getSubTopics,
};
