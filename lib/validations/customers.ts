import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  contact: z.string().optional(),
  favorite: z.string().optional(),
  interests: z.array(z.string()).min(1, "at least one interest is required"),
});

export type CustomerInput = z.infer<typeof customerSchema>;
