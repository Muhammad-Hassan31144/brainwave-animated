import { check, curve1, curve2 } from "../../assets";
import { useState, useEffect } from 'react';
import { useInVieww } from "../../hooks/useInView";

export const Slider = ({ collabContent }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(new Array(collabContent.length).fill(false));
  const [lastIndexCompleted, setLastIndexCompleted] = useState(false);

  const handleAnimationEnd = (index) => {
    if (index < collabContent.length - 1) {
      setActiveIndex(index + 1); // Move to the next index
    } else {
      setLastIndexCompleted(true); // Last index completed
    }
  };
    
        return (
          <article className="body-2">
          {collabContent.map((item, index) => {
            const [ref, inView] = useInVieww({ threshold: 0.5 });
    
            useEffect(() => {
              if (inView && !hasAnimated[index] && index === activeIndex) {
                setHasAnimated((prev) => {
                  const newHasAnimated = [...prev];
                  newHasAnimated[index] = true;
                  return newHasAnimated;
                });
              }
            }, [inView, index, hasAnimated, activeIndex]);
    
            return (
              <details
                key={index}
                ref={ref}
                open={index === activeIndex}
                className="py-4 border-t border-n-6"
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
                    style={{
                      animation: index === activeIndex ? "fillEffect 3s linear forwards" : "none",
                    }}
                    onAnimationEnd={() => handleAnimationEnd(index)}
                  ></div>
                </div>
              </details>
            );
          })}
          
        </article>
      );
    };
    

export const RightCurve = () => {
  return (
    <div className="hidden absolute top-1/2 left-full w-[10.125rem] -mt-1 ml-10 pointer-events-none xl:block">
      <img src={curve2} width={162} height={76} alt="Curve 2" />
    </div>
  );
};

export const LeftCurve = () => {
  return (
    <div className="hidden absolute top-1/2 right-full w-[32.625rem] -mt-1 mr-10 pointer-events-none xl:block">
      <img src={curve1} width={522} height={182} alt="Curve 1" />
    </div>
  );
};

