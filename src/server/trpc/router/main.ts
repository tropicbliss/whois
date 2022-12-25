import { z } from "zod";
import { router, publicProcedure } from "../trpc";
const whois = require("whois"); // eslint-disable-line

export const mainRouter = router({
  whois: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await lookup(input);
  }),
});

const lookup = (domain: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    whois.lookup(domain, (err: unknown, response: string) => {
      if (err) return reject(err);
      resolve(response);
    });
  });
};
