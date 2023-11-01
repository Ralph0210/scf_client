import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import { Link, Route, Routes } from "react-router-dom";
import Analytics_page from "./components/Analytics_page/Analytics_page";
import { useState, useEffect } from "react";
import Map from "./components/Map/Map";




function App() {
  const [topics, setTopics] = useState(new Set());

  const [isDataLoaded, setDataLoaded] = useState(false);
  const [distinctVariables, setDistinctVariables] = useState(new Set());
  const shouldRenderMap = false;

  // Function to calculate distinct variables from all topics
  const calculateDistinctVariables = () => {
    const allVariables = new Set();

    for (const topic of topics) {
      // Add variables to the set, which will ensure they are distinct
      for (const variable of topic.variables) {
        allVariables.add(variable);
      }
    }
    console.log(allVariables)
    setDistinctVariables(allVariables);
  };

  useEffect(() => {
    const storedTopics = localStorage.getItem("topics");
    if (storedTopics) {
      setTopics(new Set(JSON.parse(storedTopics)));
    } else {
      setTopics(new Set()); // Set to an empty set if there's no data
    }
    setDataLoaded(true); // Mark the data as loaded
  }, []);

  useEffect(() => {
    // Save 'topics' to local storage whenever it changes
    localStorage.setItem("topics", JSON.stringify(Array.from(topics)));
    calculateDistinctVariables();
  }, [topics]);

  // console.log(topics, "global");
  console.log(isDataLoaded, 'isDataLoaded', topics)

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              topics={topics}
              setTopics={setTopics}
              isDataLoaded={isDataLoaded}
            />
          }
        />
        <Route
          path="/analyticsPage"
          element={<Analytics_page distinctVariables={distinctVariables} />}
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/exploreData"
          element={<Map distinctVariables={distinctVariables} />}
        />
      </Routes>
    </div>
  );
}

export default App;
