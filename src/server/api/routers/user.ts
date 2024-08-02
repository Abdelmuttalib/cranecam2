import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { hashPassword } from "@/lib/bcrypt";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().min(1).max(50),
        password: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // search for existing user
      const existingUser = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      // if user already exists, return error
      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = hashPassword(input.password);

      // create new user
      const user = await ctx.db.user.create({
        data: {
          email: input.email,
          name: input.name,
          password: hashedPassword,
        },
      });

      return { email: user.email, name: user.name };
    }),
});
