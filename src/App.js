import React, { useEffect, useState } from "react";
import "./App.css";
import { useSpeechSynthesis } from "react-speech-kit";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const App = () => {
  const { speak } = useSpeechSynthesis();
  const [message, setMessage] = useState("");
  const commands = [
    {
      command: "I would like to order *",
      callback: (food) => {
        setMessage(`Your order is for: ${food}`);
        speak({ text: message });
      },
    },
    {
      command: "The weather is :condition today",
      callback: (condition) => {
        setMessage(`Today, the weather is ${condition}`);
        speak({ text: message });
      },
    },
    {
      command: "My top sports are * and *",
      callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`),
    },
    {
      command: "Pass the salt (please)",
      callback: () => {
        setMessage("My pleasure");
        speak({ text: message });
      },
    },
    {
      command: ["Hello", "Hi"],
      callback: ({ command }) => {
        setMessage(`Hi there! You said: "${command}"`);
        speak({ text: message });
      },
      matchInterim: true,
    },
    {
      command: "vishal",
      callback: (command, spokenPhrase, similarityRatio) =>
        setMessage(
          `${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`
        ),
      // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: ["eat", "sleep", "leave"],
      callback: (command) => setMessage(`Best matching command: ${command}`),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true,
    },
    {
      command: "clear",
      callback: ({ resetTranscript }) => resetTranscript(),
    },
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  useEffect(() => {
    SpeechRecognition.startListening();
    // speak({ text: "hello" });
  }, [message]);

  return (
    <div>
      hello
      <p>{message}</p>
      <p>{transcript}</p>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};
export default App;
