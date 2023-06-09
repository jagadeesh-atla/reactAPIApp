import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import Embeddings from "./Embeddings";
import FaceDetect from "./FaceDetect";
import ImagetoText from "./ImagetoText";
import ObjectDetect from "./ObjectDetect";
import Sentiment from "./Sentiment";
import TextSimilarity from "./TextSimilarity";

import "./styles.css";

export default function App() {
  return (
    <>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/embedings">Embeddings</Link>
            </li>
            <li>
              <Link to="/facedetect">FaceDetect</Link>
            </li>
            <li>
              <Link to="/imagetotext">ImagetoText</Link>
            </li>
            <li>
              <Link to="/objectdetect">ObjectDetect</Link>
            </li>
            <li>
              <Link to="/sentiment">Sentiment</Link>
            </li>
            <li>
              <Link to="/textsimilarity">TextSimilarity</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/"></Route>
        <Route path="/embedings" element={<Embeddings />} />
        <Route path="/facedetect" element={<FaceDetect />} />
        <Route path="/imagetotext" element={<ImagetoText />} />
        <Route path="/objectdetect" element={<ObjectDetect />} />
        <Route path="/sentiment" element={<Sentiment />} />
        <Route path="/textsimilarity" element={<TextSimilarity />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
