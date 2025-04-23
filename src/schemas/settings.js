import z from "zod";

const configSchema = z.object({
  PORT: z.string().default("8000"),
  TOKEN_SECRET_KEY: z.string(),
  TOKEN_ACCESS_TIME: z.string().default("900"),
  TOKEN_REFRESH_TIME: z.string().default("28800"),
});

export const evaluarSettings = (data) => {
  return configSchema.safeParse(data);
}