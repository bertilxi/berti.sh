import { start } from "carbon/bootstrap.tsx";
import { setTransport } from "carbon/logger.ts";
import pino from "pino";

if (process.env.AXIOM_TOKEN) {
  setTransport(
    pino.transport({
      target: "@axiomhq/pino",
      options: {
        dataset: process.env.AXIOM_DATASET,
        token: process.env.AXIOM_TOKEN,
      },
    }),
  );
}

await start();
