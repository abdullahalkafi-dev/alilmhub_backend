import express, { Router } from "express";
import { ReferenceController } from "./references.controller";
import { ReferenceValidation } from "./references.dto";
import auth from "../../shared/middlewares/auth";
import validateRequest from "../../shared/middlewares/validateRequest";

const router = express.Router();

router.post(
  "/",
  auth(),
  validateRequest(ReferenceValidation.createReference),
  ReferenceController.createReference
);

router.post(
  "/bulk",
  validateRequest(ReferenceValidation.getBulkReferences),
  ReferenceController.getBulkReferences
);

router.get("/", ReferenceController.getAllReferences);

router.get("/:slug", ReferenceController.getReferenceBySlug);

router.patch(
  "/:slug",
  auth(),
  validateRequest(ReferenceValidation.updateReference),
  ReferenceController.updateReference
);

router.delete("/:slug", auth(), ReferenceController.deleteReference);

router.patch("/:slug/verify", auth(), ReferenceController.verifyReference);

export const ReferenceRoutes: Router = router;
