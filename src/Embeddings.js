import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

import "./styles.css";

export default function Embeddings() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await axios.post(
      "https://api.api-ninjas.com/v1/embeddings",
      { text: inputText },
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
    <div className="Embeddings">
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputText}
          onChange={handleInputChange}
          maxLength={5000}
          rows={10}
          cols={120}
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
