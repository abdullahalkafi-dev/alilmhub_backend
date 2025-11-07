import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TopicServices } from "./topic.service";
import catchAsync from "../../shared/util/catchAsync";
import sendResponse from "../../shared/util/sendResponse";

const createTopic = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const topic = await TopicServices.createTopic(req.body, userId);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Topic created successfully",
    data: topic,
  });
});

const getAllTopics = catchAsync(async (req: Request, res: Response) => {
  const topicsRes = await TopicServices.getAllTopics(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Topics retrieved successfully",
    data: topicsRes.result,
    meta: topicsRes.meta,
  });
});

const getTopicBySlug = catchAsync(async (req: Request, res: Response) => {
  const topic = await TopicServices.getTopicBySlug(req.params.slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Topic retrieved successfully",
    data: topic,
  });
});

const updateTopic = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const topic = await TopicServices.updateTopic(
    req.params.slug,
    req.body,
    userId
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Topic updated successfully",
    data: topic,
  });
});

const deleteTopic = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  await TopicServices.deleteTopic(req.params.slug, userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Topic deleted successfully",
    data: null,
  });
});

const addReferences = catchAsync(async (req: Request, res: Response) => {
  const { referenceIds } = req.body;
  const topic = await TopicServices.addReferences(req.params.slug, referenceIds);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "References added successfully",
    data: topic,
  });
});

const removeReferences = catchAsync(async (req: Request, res: Response) => {
  const { referenceIds } = req.body;
  const topic = await TopicServices.removeReferences(
    req.params.slug,
    referenceIds
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "References removed successfully",
    data: topic,
  });
});

const getSubTopics = catchAsync(async (req: Request, res: Response) => {
  const subTopics = await TopicServices.getSubTopics(req.params.slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Sub-topics retrieved successfully",
    data: subTopics,
  });
});

const getKnowledgeTree = catchAsync(async (req: Request, res: Response) => {
  const tree = await TopicServices.getKnowledgeTree();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Knowledge tree retrieved successfully",
    data: tree,
  });
});

export const TopicController = {
  createTopic,
  getAllTopics,
  getTopicBySlug,
  updateTopic,
  deleteTopic,
  addReferences,
  removeReferences,
  getSubTopics,
  getKnowledgeTree,
};
