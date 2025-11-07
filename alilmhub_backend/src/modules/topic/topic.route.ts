import express, { Router } from "express";
import { TopicController } from "./topic.controller";
import { TopicValidation } from "./topic.dto";
import auth from "../../shared/middlewares/auth";
import validateRequest from "../../shared/middlewares/validateRequest";

const router = express.Router();

router.post(
  "/",
  auth(),
  validateRequest(TopicValidation.createTopic),
  TopicController.createTopic
);

router.get("/", TopicController.getAllTopics);

router.get("/:slug", TopicController.getTopicBySlug);

router.get("/:slug/sub-topics", TopicController.getSubTopics);

router.patch(
  "/:slug",
  auth(),
  validateRequest(TopicValidation.updateTopic),
  TopicController.updateTopic
);

router.delete("/:slug", auth(), TopicController.deleteTopic);

router.patch(
  "/:slug/add-references",
  auth(),
  validateRequest(TopicValidation.addReferences),
  TopicController.addReferences
);

router.patch(
  "/:slug/remove-references",
  auth(),
  validateRequest(TopicValidation.removeReferences),
  TopicController.removeReferences
);

export const TopicRoutes: Router = router;
