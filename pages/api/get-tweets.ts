import type { NextApiRequest, NextApiResponse } from "next";
import { TweetV2, TwitterApi } from "twitter-api-v2";
import { prisma } from "../../lib/prisma";

if (!process.env.BEARER_TOKEN)
  throw new Error(`Please add BEARER_TOKEN to .env`);

const client = new TwitterApi(process.env.BEARER_TOKEN).readOnly.v2;

async function fetchTweets(username: string, start_time?: string) {
  // Fetch id from username
  const {
    data: { id },
  } = await client.userByUsername(username);

  // Fetch the user's timeline
  let userTimeline = await client.userTimeline(id, {
    exclude: ["replies", "retweets"],
    max_results: 100,
    "tweet.fields": [
      "attachments",
      "conversation_id",
      "created_at",
      "public_metrics",
      "referenced_tweets",
    ],
    start_time,
  });

  // Pagination
  while (!userTimeline.done) {
    await userTimeline.fetchNext();
  }

  // Return the tweets
  return userTimeline.tweets;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ tweetsJSON: string } | unknown>
) {
  const { method, body } = req;

  try {
    switch (method) {
      case "POST":
        const { username } = JSON.parse(body) as { username: string };

        const author = await prisma.author.findUnique({ where: { username } });

        // On first request for the author, save the data in DB
        if (!author) {
          const tweets = await fetchTweets(username);
          const tweetsJSON = JSON.stringify(tweets);

          await prisma.author.create({
            data: { username, tweets: tweetsJSON },
          });

          return res.status(200).json({ tweetsJSON });
        }

        // On subsequent requests, update the DB with latest tweets
        const savedTweetsJSON = author.tweets as string;
        const savedTweets: TweetV2[] = JSON.parse(savedTweetsJSON);

        const fetchedTweets = await fetchTweets(
          username,
          author.updatedAt.toISOString()
        );

        const tweets = fetchedTweets.concat(savedTweets);
        const tweetsJSON = JSON.stringify(tweets);

        return res.status(200).json({ tweetsJSON });
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
