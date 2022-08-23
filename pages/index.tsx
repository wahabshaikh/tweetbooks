import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { TweetV2 } from "twitter-api-v2";

const Home: NextPage = () => {
  const [emailId, setEmailId] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  async function getTweets() {
    setIsFetching(true);
    try {
      const { tweetsJSON } = (await fetch("/api/get-tweets", {
        method: "POST",
        body: JSON.stringify({ username: twitterHandle }),
      }).then((response) => response.json())) as { tweetsJSON: string };

      setIsFetched(true);

      const tweets: TweetV2[] = JSON.parse(tweetsJSON);
      console.log(tweets);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <>
      <Head>
        <title>TweetBooks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col items-center justify-center bg-blue p-4 sm:p-6">
        <main className="relative mx-auto w-full flex-1 rounded-xl bg-gray-lighter p-6 text-gray-darker sm:rounded-[1.25rem] sm:bg-[url('/assets/illustration-desktop.svg')] sm:bg-contain sm:bg-top sm:bg-no-repeat sm:bg-origin-content xl:bg-top xl:px-28 xl:pt-8 xl:pb-24">
          {/* Logo */}
          <img
            src="/assets/logo.svg"
            alt="TweetBooks"
            className="h-8 sm:h-12 sm:w-9 xl:absolute xl:left-6 xl:top-6"
          />

          {/* Illustration */}
          <img
            src="/assets/illustration-mobile.svg"
            alt=""
            className="mx-auto block h-32 w-full sm:hidden"
          />

          <section className="mt-6 text-center sm:mt-20 xl:mt-40">
            <h1 className="text-xl sm:text-3xl xl:text-[44px] xl:leading-[3.5rem]">
              Tweets of your favourite writers{" "}
              <span className="block font-semibold">Now as a Book</span>
            </h1>

            <p className="mt-5 text-sm font-medium text-gray sm:mt-3 sm:text-xl xl:text-2xl">
              Get the best of Twitter straight to your Inbox!
            </p>

            {/* Form */}
            <form
              className="mx-auto mt-12 max-w-[22.5rem] px-2 sm:mt-8"
              onSubmit={async (event) => {
                event.preventDefault();
                getTweets();
              }}
            >
              <div>
                <label htmlFor="twitterHandle" className="sr-only">
                  Twitter Handle
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="twitterHandle"
                    id="twitterHandle"
                    className="w-full rounded-md border-gray-light bg-white pl-4 font-medium text-gray-dark placeholder:text-gray-light focus:border-gray-dark focus:placeholder-white focus:ring-gray-dark sm:text-xl"
                    placeholder="Your favourite Twitter Handle"
                    value={twitterHandle}
                    onChange={(event) => setTwitterHandle(event.target.value)}
                    required
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <img
                      src="/assets/heart-symbol.svg"
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="emailId" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="emailId"
                  id="emailId"
                  className="w-full rounded-md border-gray-light bg-white pl-4 font-medium text-gray-dark placeholder:text-gray-light focus:border-gray-dark focus:placeholder-white focus:ring-gray-dark sm:text-xl"
                  placeholder="Your Email ID"
                  value={emailId}
                  onChange={(event) => setEmailId(event.target.value)}
                  required
                />
              </div>

              <div className="mt-6">
                <button
                  className="inline-flex w-full items-center justify-center rounded-md border border-pink-neutral bg-pink py-2.5 font-semibold text-gray-darker hover:bg-pink-neutral focus:outline-none focus:ring-2 focus:ring-pink-neutral focus:ring-offset-2 sm:text-xl"
                  disabled={isFetching}
                >
                  Mail me the Book :D
                </button>
              </div>
            </form>

            {isFetched && (
              <p className="mt-8 text-xl font-medium text-gray-darker xl:text-2xl">
                <span className="font-semibold xl:font-medium">
                  Wooohooooooo!!!
                </span>{" "}
                <span className="mt-3 block xl:mt-0 xl:inline-block">
                  Time to check your Inbox
                  <img
                    src="/assets/party-symbol.svg"
                    alt=""
                    className="ml-2 inline h-6 w-6 xl:h-8 xl:w-8"
                  />
                </span>
              </p>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
