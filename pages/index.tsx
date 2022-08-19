import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

const Home: NextPage = () => {
  const [emailId, setEmailId] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");

  return (
    <>
      <Head>
        <title>TweetBooks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col items-center justify-center bg-blue p-4 sm:p-6">
        <main className="relative mx-auto w-full flex-1 rounded-xl bg-gray-lighter p-6 text-gray-darker sm:rounded-[1.25rem] sm:bg-[url('/assets/illustration-desktop.svg')] sm:bg-contain sm:bg-center sm:bg-no-repeat sm:bg-origin-content ">
          {/* Logo */}
          <Image
            src="/assets/logo.svg"
            alt="TweetBooks"
            height={50}
            width={36}
          />

          {/* Illustration */}
          <img
            src="/assets/illustration-mobile.svg"
            alt=""
            className="mx-auto -mt-6 block h-28 w-full sm:hidden"
          />

          <section className="mt-6 text-center sm:mt-20">
            <h1 className="text-xl sm:text-5xl sm:leading-[4rem]">
              Tweets of your favourite writers{" "}
              <span className="block font-semibold">Now as an eBook</span>
            </h1>

            <p className="mt-5 text-sm font-medium text-gray sm:mt-3 sm:text-2xl">
              Get the best of Twitter straight to your Inbox!
            </p>

            {/* Form */}
            <form
              className="mx-auto mt-12 max-w-[22.5rem] px-2 sm:mt-8"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div>
                <label htmlFor="twitterHandle" className="sr-only">
                  Twitter Handle
                </label>
                <input
                  type="text"
                  name="twitterHandle"
                  id="twitterHandle"
                  className="w-full rounded-md border-gray-light bg-white pl-4 font-medium text-gray-dark placeholder:text-gray-light focus:border-gray-dark focus:ring-gray-dark sm:text-xl"
                  placeholder="Your favourite Twitter Handle"
                  value={twitterHandle}
                  onChange={(event) => setTwitterHandle(event.target.value)}
                />
              </div>

              <div className="mt-5">
                <label htmlFor="emailId" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="emailId"
                  id="emailId"
                  className="w-full rounded-md border-gray-light bg-white pl-4 font-medium text-gray-dark placeholder:text-gray-light focus:border-gray-dark focus:ring-gray-dark sm:text-xl"
                  placeholder="Your Email ID"
                  value={emailId}
                  onChange={(event) => setEmailId(event.target.value)}
                />
              </div>

              <div className="mt-6">
                <button className="inline-flex w-full items-center justify-center rounded-md border border-pink-neutral bg-pink py-2.5 font-semibold text-gray-darker hover:bg-pink-neutral focus:outline-none focus:ring-2 focus:ring-pink-neutral focus:ring-offset-2 sm:text-xl">
                  Mail me the eBook :D
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
