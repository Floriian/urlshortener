import { z } from "zod";
export const RequestUrlObject = z.object({
  baseUrl: z.string().url(),
});
export type RequestUrlModel = z.infer<typeof RequestUrlObject>;
