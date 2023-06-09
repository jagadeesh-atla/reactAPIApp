import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

import "./styles.css";

export default function FaceDetect() {
  const [inputImage, setInputImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    setInputImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("image", inputImage);

    const response = await axios.post(
      "https://api.api-ninjas.com/v1/facedetect",
      formData,
      {
        headers: {
          "X-Api-Key": process.env.APIKEY,
          "Content-Type": "multipart/form-data"
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
    <div className="FaceDetect">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleInputChange} />
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
