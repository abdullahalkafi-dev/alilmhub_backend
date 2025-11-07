import { z } from "zod";

const createTopic = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(500, "Title cannot exceed 500 characters")
      .trim(),
    titleDescription: z
      .string()
      .max(2000, "Description cannot exceed 2000 characters")
      .trim()
      .optional(),
    parentTopic: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid parent topic ID format")
      .optional(),
    references: z
      .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid reference ID format"))
      .optional(),
  }),
});

const updateTopic = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(500, "Title cannot exceed 500 characters")
      .trim()
      .optional(),
    titleDescription: z
      .string()
      .max(2000, "Description cannot exceed 2000 characters")
      .trim()
      .optional(),
    parentTopic: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid parent topic ID format")
      .optional(),
    references: z
      .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid reference ID format"))
      .optional(),
  }),
});

const addReferences = z.object({
  body: z.object({
    referenceIds: z
      .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid reference ID format"))
      .min(1, "At least one reference ID is required"),
  }),
});

const removeReferences = z.object({
  body: z.object({
    referenceIds: z
      .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid reference ID format"))
      .min(1, "At least one reference ID is required"),
  }),
});

export const TopicValidation = {
  createTopic,
  updateTopic,
  addReferences,
  removeReferences,
};
