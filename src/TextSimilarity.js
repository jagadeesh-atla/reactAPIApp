import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

import "./styles.css";

export default function TextSimilarity() {
  const [inputText1, setInputText1] = useState("");
  const [inputText2, setInputText2] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleInputChange1 = (e) => {
    setInputText1(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setInputText2(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await axios.post(
      "https://api.api-ninjas.com/v1/textsimilarity",
      {
        text_1: inputText1,
        text_2: inputText2
      },
      {
        headers: {
          "X-Api-Key": process.env.APIKEY
        }
      }
    );
    // console.log(response.data);
    if (response.data.error) setResults({ error: "Can't be processed" });
    else setResults(response.data);

    setLoading(false);
  };

  const handleDownload = () => {
    const json = JSON.stringify(results, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, "results.json");
  };

  return (
    <div className="Sentiment">
      <form onSubmit={handleSubmit}>
        <label htmlFor="Text1">Text 1</label>
        <textarea
          id="Text1"
          value={inputText1}
          onChange={handleInputChange1}
          maxLength={5000}
          rows={7}
          cols={50}
        />
        <br />
        <label htmlFor="Text2">Text 2</label>
        <textarea
          id="Text2"
          value={inputText2}
          onChange={handleInputChange2}
          maxLength={5000}
          rows={7}
          cols={50}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {results && (
        <div>
          <button onClick={handleDownload}>Download JSON</button>
          <h2>results:</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
