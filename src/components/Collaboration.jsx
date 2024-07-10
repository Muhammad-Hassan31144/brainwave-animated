import { brainwaveSymbol, check } from "../assets";
import { collabApps, collabContent, collabText } from "../constants";
import Button from "./Button";
import Section from "./Section";
import { LeftCurve, RightCurve, Slider } from "./design/Collaboration";
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import {motion} from "framer-motion";
const Collaboration = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  useEffect(() => {
    // Set active index to the first item on component mount

    // Automatically switch between items every 3 seconds
    const timer = setTimeout(() => {
      setActiveIndex((prevIndex) => {
        if (prevIndex === null || prevIndex === collabContent.length - 1) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    }, 3000);

    // Clear the timer on component unmount
    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <Section crosses className={"scroll-mt-9"}>
      <div className="container lg:flex">
        <div className="max-w-[25rem]">
          <h2 className="h2 mb-4 md:mb-8">
            AI Chat App for seamless collaboration
          </h2>

          {/* <ul className="max-w-[22rem] mb-10 md:mb-14">
            {collabContent.map((item) => (
              <li className="mb-3 py-3" key={item.id}>
                <div className="flex items-center">
                  <img src={check} width={24} height={24} alt="check" />
                  <h6 className="body-2 ml-5">{item.title}</h6>
                </div>
                {item.text && (
                  <p className="body-2 mt-3 text-n-4">{item.text}</p>
                )}
              </li>
            ))}
          </ul> */}
          {/* <article className="body-2">
      {collabContent.map((item, index) => (
        <details
          key={index}
          open={index === activeIndex}
          className="py-4 border-t border-n-6"
          onClick={() => setActiveIndex(index)}
        >
          <summary className="flex items-start cursor-pointer">
            <img width={24} height={24} src={check} alt="Check" />
            <p className="ml-4">{item.summary}</p>
          </summary>

          <div
            className={`transition-opacity duration-500 ease-in-out ${
              index !== activeIndex ? "opacity-0 h-0" : "opacity-100 h-auto"
            }`}
          >
            <p className="body-2 mt-3 text-n-4">{item.details}</p>
          </div>
          <div className="relative h-2 mt-2 bg-gray-200 rounded overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full bg-blue-500 rounded ${
                index === activeIndex ? "animate-fillEffect" : ""
              }`}
            ></div>
          </div>
        </details>
      ))}
    </article> */}
          <Slider collabContent={collabContent}/>  
          <Button>Try it now</Button>
        </div>

        <div className="lg:ml-auto xl:w-[38rem] mt-4">
          <p className="body-2 mb-8 text-n-4 md:mb-16 lg:mb-32 lg:w-[22rem] lg:mx-auto">
            {collabText}
          </p>

          <div className="relative left-1/2 flex w-[22rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale:75 md:scale-100">
            <div className="flex w-60 aspect-square m-auto border border-n-6 rounded-full">
              <div className="w-[6rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full">
                <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                  <img
                    src={brainwaveSymbol}
                    width={48}
                    height={48}
                    alt="brainwave"
                  />
                </div>
              </div>
            </div>


            <ul>
              {collabApps.map((app, index) => (
                <motion.li
                  key={app.id}
                  className={`absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom`}
                  initial={{ rotate: index * 45 }}
                  animate={{ rotate: [index * 45, index * 45 + 360] }}
                  transition={{
                    duration: 10, // Adjust the duration for slower or faster speed
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div
                    className={`relative -top-[1.6rem] flex w-[3.2rem] h-[3.2rem] bg-n-7 border border-n-1/15 rounded-xl -rotate-${
                      index * 90
                    }`}
                  >
                    <img
                      className="m-auto"
                      width={app.width}
                      height={app.height}
                      alt={app.title}
                      src={app.icon}
                    />
                  </div>
                </motion.li>
              ))}
            </ul>
            <LeftCurve />
            <RightCurve />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Collaboration;
