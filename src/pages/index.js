import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Home() {
  const [convertResult, setConvertResult] = useState("");
  const [userInput, setUserInput] = useState("");
  const [generating, setGenerating] = useState(false);

  const [error, setError] = useState("");

  const generateSenteces = async (e) => {
    e.preventDefault();

    setGenerating(true);
    // console.log(userInput)

    try {
      const response = await fetch(`/api/generate`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userInput }),
      });
      const json = await response.json();
      const result = json.result.content;
      console.log(result);
      setConvertResult(result);
    } catch (e) {
    } finally {
      setGenerating(false);
      setError("");
    }
  };

  const handleClear = function (e) {
    e.preventDefault();
    setGenerating(false);
    setUserInput("");
    setConvertResult("");
  };

  return (
    <>
      <Head>
        <title>KeigoBot.com</title>
      </Head>

      <Header />

      <div className="flex max-w-5xl mx-auto flex-col items-center justify-start py-2 min-h-screen">
        <div className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
          <div className="bg-white py-8">
            <h1 className="text-6xl font-bold text-center text-gray-900">
              日本語、敬語に
            </h1>
          </div>

          <div className="max-w-xl w-full">
            <div className="bg-white rounded px-8 mb-4">
              <form onSubmit={generateSenteces}>
                <textarea
                  rows="4"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="inputText"
                  name="inputText"
                  placeholder="変換する文(sentences to be converted)"
                  maxLength={160}
                ></textarea>

                {generating && <h1>Loading...</h1>}

                {!generating && (
                  <div className="flex gap-5 my-3">
                    <button
                      className="border-2 border-black text-white bg-red-500 py-2 px-4 rounded-md hover:bg-red-700 w-full"
                      disabled={!userInput.trim()}
                    >
                      Generate
                    </button>
                    <button
                      className="border-2 border-black text-white bg-yellow-500 py-2 px-4 rounded-md hover:bg-yellow-600 w-full"
                      onClick={handleClear}
                    >
                      Clear
                    </button>
                  </div>
                )}
              </form>

              {!generating && convertResult && (
                <div className="rounded shadow-lg">
                  <div className="px-6 py-4 mt-8 text-left w-full">
                    <div className="font-bold text-md flex gap-3">
                      <p>Result:</p>

                      {error ? `${error}` : ""}

                      <style jsx>
                        {`
                          .spinner {
                            animation: spin 1s infinite linear;
                            border: 4px solid rgba(0, 0, 0, 0.1);
                            border-top-color: rgba(0, 0, 0, 0.8);
                            border-radius: 50%;
                            height: 16px;
                            width: 16px;
                          }

                          @keyframes spin {
                            to {
                              transform: rotate(360deg);
                            }
                          }
                        `}
                      </style>
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: convertResult }}
                      className="text-gray-700 text-base"
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
