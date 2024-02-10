"use client";

import React, { useEffect, useState } from "react";

const Frontpage = () => {
  const [aiModel, setAiModel] = useState("g4f");
  const [voice, setVoice] = useState("");
  const [zipUrl, setZipUrl] = useState("");
  const [paragraphNumber, setParagraphNumber] = useState(1);
  const [automateYoutubeUpload, setAutomateYoutubeUpload] = useState(false);
  const [useMusicToggle, setUseMusicToggle] = useState(false);
  const [videoSubject, setVideoSubject] = useState("");
  const [generateButtonDisabled, setGenerateButtonDisabled] = useState(false);
  const [generateButtonHidden, setGenerateButtonHidden] = useState(false);
  const [cancelButtonHidden, setCancelButtonHidden] = useState(true);

  const cancelGeneration = () => {
    console.log("Canceling generation...");
    // Send request to /cancel
    fetch("http://localhost:8080/api/cancel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        console.log(data);
      })
      .catch((error) => {
        alert("An error occurred. Please try again later.");
        console.log(error);
      });

    // Hide cancel button
    setCancelButtonHidden(true);

    // Enable generate button
    setGenerateButtonDisabled(false);
    setGenerateButtonHidden(false);
  };

  const generateVideo = () => {
    console.log("Generating video...");
    // Disable button and change text
    setGenerateButtonDisabled(true);
    setGenerateButtonHidden(true);

    // Show cancel button
    setCancelButtonHidden(false);

    const url = "http://localhost:8080/api/generate";

    // Construct data to be sent to the server
    const data = {
      videoSubject: videoSubject,
      aiModel: aiModel,
      voice: voice,
      paragraphNumber: paragraphNumber,
      automateYoutubeUpload: automateYoutubeUpload,
      useMusic: useMusicToggle,
      zipUrl: zipUrl,
    };

    // Send the actual request to the server
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert(data.message);
        // Hide cancel button after generation is complete
        setGenerateButtonDisabled(false);
        setGenerateButtonHidden(false);
        setCancelButtonHidden(true);
      })
      .catch((error) => {
        alert("An error occurred. Please try again later.");
        console.log(error);
      });
  };

  useEffect(() => {
    const storedVoiceValue = localStorage.getItem("voiceValue");
    if (storedVoiceValue) {
      setVoice(storedVoiceValue);
    }
  }, []);

  const handleVoiceChange = (event: any) => {
    setVoice(event.target.value);
    localStorage.setItem("voiceValue", event.target.value);
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="max-w-xl flex flex-col space-y-4 w-full">
        <label htmlFor="aiModel" className="text-white">
          AI Model
        </label>
        <select
          name="aiModel"
          id="aiModel"
          className="w-full border-2 border-blue-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          value={aiModel}
          onChange={(e) => setAiModel(e.target.value)}
        >
          <option value="g4f">g4f (Free)</option>
          <option value="gpt3.5-turbo">OpenAI GPT-3.5</option>
          <option value="gpt4">OpenAI GPT-4</option>
        </select>
        <label htmlFor="voice">Voice</label>
        <select
          name="voice"
          id="voice"
          className="w-min border-2 border-white p-2 rounded-md focus:outline-none focus:border-blue-500"
          value={voice}
          onChange={handleVoiceChange}
        >
          <option value="en_us_ghostface">Ghost Face</option>
          <option value="en_us_ghostface">Ghost Face</option>
          <option value="en_us_chewbacca">Chewbacca</option>
          <option value="en_us_c3po">C3PO</option>
          <option value="en_us_stitch">Stitch</option>
          <option value="en_us_stormtrooper">Stormtrooper</option>
          <option value="en_us_rocket">Rocket</option>
          <option value="en_au_001">English AU - Female</option>
          <option value="en_au_002">English AU - Male</option>
          <option value="en_uk_001">English UK - Male 1</option>
          <option value="en_uk_003">English UK - Male 2</option>
          <option value="en_us_001">English US - Female (Int. 1)</option>
          <option value="en_us_002">English US - Female (Int. 2)</option>
          <option value="en_us_006">English US - Male 1</option>
          <option value="en_us_007">English US - Male 2</option>
          <option value="en_us_009">English US - Male 3</option>
          <option value="en_us_010">English US - Male 4</option>
          <option value="fr_001">French - Male 1</option>
          <option value="fr_002">French - Male 2</option>
          <option value="de_001">German - Female</option>
          <option value="de_002">German - Male</option>
          <option value="es_002">Spanish - Male</option>
          <option value="es_mx_002">Spanish MX - Male</option>
          <option value="br_001">Portuguese BR - Female 1</option>
          <option value="br_003">Portuguese BR - Female 2</option>
          <option value="br_004">Portuguese BR - Female 3</option>
          <option value="br_005">Portuguese BR - Male</option>
          <option value="id_001">Indonesian - Female</option>
          <option value="jp_001">Japanese - Female 1</option>
          <option value="jp_003">Japanese - Female 2</option>
          <option value="jp_005">Japanese - Female 3</option>
          <option value="jp_006">Japanese - Male</option>
          <option value="kr_002">Korean - Male 1</option>
          <option value="kr_003">Korean - Female</option>
          <option value="kr_004">Korean - Male 2</option>
          <option value="en_female_f08_salut_damour">Alto</option>
          <option value="en_male_m03_lobby">Tenor</option>
          <option value="en_female_f08_warmy_breeze">Warmy Breeze</option>
          <option value="en_male_m03_sunshine_soon">Sunshine Soon</option>
          <option value="en_male_narration">narrator</option>
          <option value="en_male_funny">wacky</option>
          <option value="en_female_emotional">peaceful</option>
        </select>
        <label htmlFor="zipUrl">Zip URL (Leave empty for default)</label>
        <input
          type="text"
          name="zipUrl"
          id="zipUrl"
          className="border-2 border-blue-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          value={zipUrl}
          onChange={(e) => setZipUrl(e.target.value)}
        />
        <label htmlFor="videoSubject">Subject</label>
        <textarea
          name="videoSubject"
          id="videoSubject"
          className="border-2 border-blue-300 p-2 text-black rounded-md focus:outline-none focus:border-blue-500"
          value={videoSubject}
          onChange={(e) => setVideoSubject(e.target.value)}
        ></textarea>
        <label htmlFor="paragraphNumber">Paragraph Number</label>
        <input
          type="number"
          name="paragraphNumber"
          id="paragraphNumber"
          className="border-2 border-blue-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          value={paragraphNumber}
          onChange={(e) => setParagraphNumber(parseInt(e.target.value))}
          min="1"
          max="100"
        />
        <label
          htmlFor="youtubeUploadToggle"
          className="flex items-center text-blue-600"
        >
          <input
            type="checkbox"
            name="youtubeUploadToggle"
            id="youtubeUploadToggle"
            className="mr-2"
            checked={automateYoutubeUpload}
            onChange={(e) => setAutomateYoutubeUpload(e.target.checked)}
          />
          Automate YouTube Uploads
        </label>
        <label
          htmlFor="useMusicToggle"
          className="flex items-center text-blue-600"
        >
          <input
            type="checkbox"
            name="useMusicToggle"
            id="useMusicToggle"
            className="mr-2"
            checked={useMusicToggle}
            onChange={(e) => setUseMusicToggle(e.target.checked)}
          />
          Use Music
        </label>
        <button
          id="generateButton"
          className={`bg-blue-500 hover:bg-blue-700 duration-100 linear text-white px-4 py-2 rounded-md ${
            generateButtonHidden ? "hidden" : ""
          }`}
          onClick={generateVideo}
          disabled={generateButtonDisabled}
        >
          Generate
        </button>
        <button
          id="cancelButton"
          className={`bg-red-500 hover:bg-red-700 duration-100 linear text-white px-4 py-2 rounded-md ${
            cancelButtonHidden ? "hidden" : ""
          }`}
          onClick={cancelGeneration}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Frontpage;
