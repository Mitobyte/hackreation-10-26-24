import * as cheerio from "cheerio";
import { logger } from "@server/utils/logger";

export async function parseUrlContent(url: string): Promise<string> {
  try {
    logger.info("fetching");
    const response = await fetch(url, {
      method: "GET",
      mode: "no-cors",
    });

    logger.info("respose", response);

    const text = await response.text();

    logger.info(text);

    const doc = cheerio.load(text);

    const title = doc("title").text();

    logger.info(`title: ${title}`);

    return title;
  } catch (e) {
    logger.error("Url parsing error", e);
    throw e;
  }
}
