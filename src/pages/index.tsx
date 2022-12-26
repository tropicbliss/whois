import type { GetServerSideProps } from "next";
import {
  GlobeAsiaAustraliaIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import "@fontsource/inter";
import type { InferGetServerSidePropsType } from "next";
import { trpc } from "../utils/trpc";
import { Fragment, useState } from "react";
import Link from "next/link";
import { Transition } from "@headlessui/react";

function Home({ ip }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const whois = trpc.main.whois.useMutation({
    cacheTime: 5000,
    onError: (e) => {
      if (e.data) {
        setToastData(e.data.code as string);
      } else {
        setToastData("An unknown error occurred.");
      }
      setResult(null);
    },
  });
  const [searchBox, setSearchBox] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [toastData, setToastData] = useState<string | null>(null);

  return (
    <>
      <header className="flex select-none items-center space-x-3 bg-indigo-600 px-4 py-3 text-xl text-white sm:px-6 sm:text-2xl lg:px-8">
        <GlobeAsiaAustraliaIcon className="h-10 w-auto" />
        <span className="font-bold">Whois</span>
      </header>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={Boolean(toastData)}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <XCircleIcon
                      className="h-6 w-6 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      Unable to fetch Whois data!
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{toastData}</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setToastData(null);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
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
                    setSearchBox("");
                    setResult("Loading...");
                    if (!url.includes(".")) {
                      url += ".com";
                    }
                    const res = await whois.mutateAsync(url);
                    setResult(res);
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
                      disabled={result === "Loading..."}
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
      <div className="my-6"></div>
      {result && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border-2 border-indigo-500 py-3 px-3">
            <code className="whitespace-pre-line">{result}</code>
          </div>
        </div>
      )}
      <div className="my-6"></div>
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center sm:justify-end">
            <Link
              href="https://github.com/tropicbliss/whois"
              className="text-gray-400 hover:text-gray-500"
              target="_blank"
              rel="noreferrer"
            >
              <span className="sr-only">GitHub</span>
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </footer>
      <div className="py-3"></div>
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
