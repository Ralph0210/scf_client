import React, { useEffect, useRef, useState } from "react";
import "./Interest.css";
// import '../Parallax/Parallax.css'
import {
  motion,
  stagger,
  useInView,
  animate,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import data from "../../interest.json";

const Interest = ({ topics, setTopics, isDataLoaded }) => {
  const handleButtonClick = (interest) => {
    // Clone the current set to avoid mutating the state directly
    const updatedSelectedInterest = new Set(Array.from(topics));

    // Convert interest and the items in the set to JSON for comparison
    const interestJSON = JSON.stringify(interest);

    // Check if the interest is already in the set
    const isInterestSelected = Array.from(updatedSelectedInterest).some(
      (item) => JSON.stringify(item) === interestJSON
    );

    if (isInterestSelected) {
      // If it's already selected, remove it
      updatedSelectedInterest.forEach((item) => {
        if (JSON.stringify(item) === interestJSON) {
          updatedSelectedInterest.delete(item);
        }
      });
    } else {
      // If it's not selected, add it
      updatedSelectedInterest.add(interest);
      console.log(updatedSelectedInterest, 'update interest')
    }

    // Update the state with the modified set
    setTopics(updatedSelectedInterest);
  };

  const [buttonMode, setButtonMode] = useState("add");
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const f1Ref = useRef(null);
  const f1IsInView = useInView(f1Ref);
  const [f1animated, setf1animated] = useState(false);

  const f2Ref = useRef(null);
  const f2IsInView = useInView(f2Ref);
  const [f2animated, setf2animated] = useState(false);

  const f3Ref = useRef(null);
  const f3IsInView = useInView(f3Ref);
  const [f3animated, setf3animated] = useState(false);

  const staggerItems = stagger(0.1, { from: "first" });

  useEffect(() => {
    if (!f1animated) {
      animate(
        ".financial_health li",
        f1IsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 },
        {
          duration: 0.5,
          delay: f1IsInView ? staggerItems : 0,
        }
      );
    }
  }, [f1IsInView]);

  useEffect(() => {
    if (!f2animated) {
      animate(
        ".financial_disparities li",
        f2IsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 },
        {
          duration: 0.5,
          delay: f2IsInView ? staggerItems : 0,
        }
      );
    }
  }, [f2IsInView]);

  useEffect(() => {
    if (!f3animated) {
      animate(
        ".financial_planning li",
        f3IsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 },
        {
          duration: 0.5,
          delay: f3IsInView ? staggerItems : 0,
        }
      );
    }
  }, [f3IsInView]);

  const interestToCheck = {
    name: "Household Income & Wealth",
    variables: ["INCOME", "WAGEINC", "NETWORTH"],
    interested: false
  };

  const isInterestInSet = topics.has(interestToCheck)
  console.log('isInterestInSet', isInterestInSet, topics)

  return (
    <div className="interest_container">
      {isDataLoaded ? 
        <>
        <h2>Financial Health & Well-being</h2>
      <div className="financial_health">
        <div className="interest_left_container">
          <motion.ul ref={f1Ref}>
            {data["financial_health_and_well-being"].map((interest) => (
              <motion.li
                onViewportLeave={() => setf1animated(true)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={() => handleButtonClick(interest)}
                // style={{
                //   backgroundColor: topics.has(interest) ? "#D81E5B" : "#ebf4f8",
                //   color: topics.has(interest) ? "#fff" : "#7c9cbf",
                // }}
                style={{
                  backgroundColor: Array.from(topics).some(i => i.name === interest.name) ? "#D81E5B" : "#ebf4f8",
                  color: Array.from(topics).some(i => i.name === interest.name) ? "#fff" : "#7c9cbf",
                }}
                
              >
                {interest.name}
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <div className="interest_right_container">
          <img src="/asset.png" />
        </div>
      </div>
      <h2>Financial Disparities & Diversity</h2>
      <div className="financial_disparities">
        <div className="interest_left_container">
          <img src="/diversity.png" />
        </div>
        <div className="interest_right_container">
          {topics === null ? ( // Render a loading indicator while topics is null
            <p>Loading...</p>
          ) : (
            <motion.ul ref={f2Ref}>
              {data["financial_disparities_and_diversity"].map((interest) => (
                <motion.li
                  onViewportLeave={() => setf2animated(true)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={() => handleButtonClick(interest)}
                  style={{
                    backgroundColor: Array.from(topics).some(i => i.name === interest.name) ? "#D81E5B" : "#ebf4f8",
                    color: Array.from(topics).some(i => i.name === interest.name) ? "#fff" : "#7c9cbf",
                  }}
                >
                  {interest.name}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>

      <h2>Financial Planning & Investment</h2>
      <div className="financial_planning">
        <div className="interest_left_container">
          {topics === null ? ( // Render a loading indicator while topics is null
            <p>Loading...</p>
          ) : (
            <motion.ul ref={f3Ref}>
              {data["financial_planning_and_investment"].map((interest) => (
                <motion.li
                  onViewportLeave={() => setf3animated(true)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={() => handleButtonClick(interest)}
                  style={{
                    backgroundColor: Array.from(topics).some(i => i.name === interest.name) ? "#D81E5B" : "#ebf4f8",
                    color: Array.from(topics).some(i => i.name === interest.name) ? "#fff" : "#7c9cbf",
                  }}
                >
                  {interest.name}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
        <div className="interest_right_container">
          <img src="/credit.png" />
        </div>
      </div>
      </>
      : <>
      <h2>Financial Health & Well-being</h2>
    <div className="financial_health">
      <div className="interest_left_container">
        <motion.ul ref={f1Ref}>
          {data["financial_health_and_well-being"].map((interest) => (
            <motion.li
              onViewportLeave={() => setf1animated(true)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => handleButtonClick(interest)}
              style={{
                backgroundColor: topics.has(interest) ? "#D81E5B" : "#ebf4f8",
                color: topics.has(interest) ? "#fff" : "#7c9cbf",
              }}
            >
              {interest.name}
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <div className="interest_right_container">
        <img src="/asset.png" />
      </div>
    </div>
    <h2>Financial Disparities & Diversity</h2>
      <div className="financial_disparities">
        <div className="interest_left_container">
          <img src="/diversity.png" />
        </div>
        <div className="interest_right_container">
          {topics === null ? ( // Render a loading indicator while topics is null
            <p>Loading...</p>
          ) : (
            <motion.ul ref={f2Ref}>
              {data["financial_disparities_and_diversity"].map((interest) => (
                <motion.li
                  onViewportLeave={() => setf2animated(true)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={() => handleButtonClick(interest)}
                  style={{
                    backgroundColor: topics.has(interest)
                      ? "#D81E5B"
                      : "#ebf4f8",
                    color: topics.has(interest) ? "#fff" : "#7c9cbf",
                  }}
                >
                  {interest.name}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>

      <h2>Financial Planning & Investment</h2>
      <div className="financial_planning">
        <div className="interest_left_container">
          {topics === null ? ( // Render a loading indicator while topics is null
            <p>Loading...</p>
          ) : (
            <motion.ul ref={f3Ref}>
              {data["financial_planning_and_investment"].map((interest) => (
                <motion.li
                  onViewportLeave={() => setf3animated(true)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={() => handleButtonClick(interest)}
                  style={{
                    backgroundColor: topics.has(interest)
                      ? "#D81E5B"
                      : "#ebf4f8",
                    color: topics.has(interest) ? "#fff" : "#7c9cbf",
                  }}
                >
                  {interest.name}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
        <div className="interest_right_container">
          <img src="/credit.png" />
        </div>
      </div>
    </>}
    </div>
  );
};

export default Interest;
