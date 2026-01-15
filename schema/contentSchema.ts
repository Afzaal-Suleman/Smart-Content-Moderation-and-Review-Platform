import { z } from "zod";

export const contentSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  contentUrl: z.string().url(),
  contentType: z.enum(["image", "video", "text", "audio", "document"]),
  priority: z.enum(["low", "medium", "high"]),
});

export type ContentFormData = z.infer<typeof contentSchema>;
