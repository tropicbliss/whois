import { GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import { GlobeAsiaAustraliaIcon } from "@heroicons/react/24/solid";
import "@fontsource/inter";
import { InferGetServerSidePropsType } from "next";

import { trpc } from "../utils/trpc";
import { useState } from "react";

function Home({ ip }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const whois = trpc.main.whois.useMutation();
  const [searchBox, setSearchBox] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>Whois</title>
        <meta name="description" content="Yet another domain/IP lookup tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex select-none items-center space-x-3 bg-indigo-600 px-4 py-6 text-xl text-white sm:px-6 sm:text-2xl lg:px-8">
        <GlobeAsiaAustraliaIcon className="h-10 w-auto" />
        <span className="font-bold">Whois</span>
      </header>
      <div className="bg-white py-16 sm:py-24">
        <div className="relative">
          <div aria-hidden="true" className="hidden sm:block">
            <div className="absolute inset-y-0 left-0 w-1/2 rounded-r-3xl bg-gray-50" />
            <svg
              className="absolute top-8 left-1/2 -ml-3"
              width={404}
              height={392}
              fill="none"
              viewBox="0 0 404 392"
            >
              <defs>
                <pattern
                  id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={392}
                fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"
              />
            </svg>
          </div>
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative overflow-hidden rounded-2xl bg-indigo-600 px-6 py-10 shadow-xl sm:px-12 sm:py-20">
              <div
                aria-hidden="true"
                className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
              >
                <svg
                  className="absolute inset-0 h-full w-full"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 1463 360"
                >
                  <path
                    className="text-indigo-500 text-opacity-40"
                    fill="currentColor"
                    d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                  />
                  <path
                    className="text-indigo-700 text-opacity-40"
                    fill="currentColor"
                    d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                  />
                </svg>
              </div>
              <div className="relative">
                <div className="sm:text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Lookup domain name and IP address info
                  </h2>
                  {ip && (
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-200">
                      Your IP address is{" "}
                      <span
                        onClick={() => {
                          setSearchBox(ip);
                        }}
                        className="cursor-pointer underline hover:text-white"
                      >
                        {ip}
                      </span>
                    </p>
                  )}
                </div>
                <form
                  className="mt-12 sm:mx-auto sm:flex sm:max-w-lg"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    let url = searchBox;
                    if (!url.includes(".")) {
                      url += ".com";
                    }
                    const res = await whois.mutateAsync(url);
                    setResult(res);
                    setSearchBox("");
                  }}
                >
                  <div className="min-w-0 flex-1">
                    <label htmlFor="search-box" className="sr-only">
                      Domain name or IP address
                    </label>
                    <input
                      id="search-box"
                      type="text"
                      className="block w-full rounded-md border border-transparent px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                      placeholder="Domain name or IP address..."
                      onChange={(e) => setSearchBox(e.target.value)}
                      value={searchBox}
                    />
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-3">
                    <button
                      type="submit"
                      className="block w-full rounded-md border border-transparent bg-indigo-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-3"></div>
      {result && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border-2 border-indigo-500 py-3 px-3">
            <code className="whitespace-pre-line">{result}</code>
          </div>
        </div>
      )}
      <div className="my-3"></div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  ip: string | undefined;
}> = async ({ req }) => {
  const forwarded = req.headers["x-forwarded-for"];
  const ip =
    typeof forwarded === "string"
      ? forwarded.split(/, /)[0]
      : req.socket.remoteAddress;

  return {
    props: { ip },
  };
};

export default Home;
