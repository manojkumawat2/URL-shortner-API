import { Request } from "express";
import HttpError from "../../helpers/HttpError";
import prismaClient from "../../helpers/PrismaClient";
import ShortIDFactory from "../../helpers/ShortIDFactory";
import ShortIDAlgorithms from "../../helpers/ShortIDFactory/constants";
import ShortUrl from "../../helpers/ShortUrl";

export const shortUrlGenerate = async (req: Request) => {
  const { url } = req.body;
  if (!url) {
    throw new HttpError("Invalid URL!", 400);
  }

  const alreadyExistShortUrl = await prismaClient.url.findFirst({
    select: { id: true, shortId: true },
    where: {
      longUrl: { equals: url },
    },
  });

  if (alreadyExistShortUrl) {
    return {
      shortUrl: new ShortUrl(alreadyExistShortUrl.shortId).getShortUrl(),
    };
  }

  const shortId = new ShortIDFactory().getShortId(
    ShortIDAlgorithms.SnowflakeShortID
  );

  if (!shortId) {
    throw new HttpError("Something went wrong! Please try again.", 500);
  }

  await prismaClient.url.create({
    data: {
      longUrl: url,
      shortId: shortId,
    },
  });

  return {
    shortUrl: new ShortUrl(shortId).getShortUrl(),
  };
};

export const getRedirectionUrl = async (req: Request) => {
  const { shortId } = req.params;

  if (!shortId) {
    throw new HttpError("Not found.", 404);
  }

  const url = await prismaClient.url.findFirst({
    select: {
      longUrl: true,
    },
    where: {
      shortId: { equals: shortId },
    },
  });

  if (!url) {
    throw new HttpError("Not found.", 404);
  }

  return {
    longUrl: url.longUrl,
  };
};
