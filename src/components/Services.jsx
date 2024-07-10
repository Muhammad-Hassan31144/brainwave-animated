import Section from "./Section";
import Heading from "./Heading";
import { service1, service2, service3, check } from "../assets";
import {
  brainwaveServices,
  brainwaveServicesIcons,
  hightlightsSlides,
} from "../constants";
import {
  PhotoChatMessage,
  Gradient,
  VideoBar,
  VideoChatMessage,
} from "./design/Services";
import Generating from "./Generating";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { useEffect, useRef, useState } from "react";

import { pauseImg, playImg, replayImg } from "../utils";

const Services = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  // video and indicator
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(() => {
    // slider animation to move the video out of the screen and bring the next video in
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut", // show visualizer https://gsap.com/docs/v3/Eases
    });

    // video animation to play the video when it is in the view
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // animation to move the indicator
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          // get the progress of the video
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            // set the width of the progress bar
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw" // mobile
                  : window.innerWidth < 1200
                  ? "10vw" // tablet
                  : "4vw", // laptop
            });

            // set the background color of the progress bar
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        // when the video is ended, replace the progress bar with the indicator and change the background color
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId == 0) {
        anim.restart();
      }

      // update the progress bar
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        // ticker to update the progress bar
        gsap.ticker.add(animUpdate);
      } else {
        // remove the ticker when the video is paused (progress bar is stopped)
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // vd id is the id for every video until id becomes number 3
  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;

      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };

  const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

  const [activeIndex, setActiveIndex] = useState(null);
  useEffect(() => {
    // Set active index to the first item on component mount

    // Automatically switch between items every 3 seconds
    const timer = setTimeout(() => {
      setActiveIndex((prevIndex) => {
        if (prevIndex === null || prevIndex === brainwaveServices.length - 1) {
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
    <Section id="how-to-use" className={"scroll-mt-9"}>
      <div className="container">
        <Heading
          title="Generative AI made for creators."
          text="Brainwave unlocks the potential of AI-powered applications"
        />

        <div className="relative">
          <div className="relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none md:w-3/5 xl:w-auto">
              <img
                className="w-full h-full object-cover md:object-right"
                width={800}
                alt="Smartest AI"
                height={730}
                src={service1}
              />
            </div>

            <div className="relative z-1 max-w-[17rem] ml-auto">
              <h4 className="h4 mb-4">Smartest AI</h4>
              <p className="body-2 mb-[3rem] text-n-3">
                Brainwave unlocks the potential of AI-powered applications
              </p>
              <article className="body-2">
                {brainwaveServices.map((item, index) => (
                  <details
                    key={index}
                    open={index === activeIndex}
                    className="py-4 border-t border-n-6"
                    onClick={() => setActiveIndex(index)}
                  >
                    <summary className="flex items-start">
                      <img width={24} height={24} src={check} alt="Check" />
                      <p className="ml-4">{item.summary}</p>
                    </summary>

                    <div
                      className={`transition-opacity ${
                        index !== activeIndex ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <p className="body-2 mt-3 text-n-4">{item.details}</p>
                    </div>

                    <div className="relative h-2 mt-2 bg-gray-200 rounded overflow-hidden">
                      <div
                        className={`absolute top-0 left-0 h-full bg-blue-500 rounded`}
                        style={{
                          width: index === activeIndex ? "100%" : "0%",
                          transition: "width 1s ease-in-out",
                          animation:
                            index === activeIndex
                              ? "fillEffect 3s linear forwards"
                              : "none",
                        }}
                      ></div>
                    </div>
                  </details>
                ))}
              </article>
            </div>

            <Generating className="absolute left-4 right-4 bottom-4 border-n-1/10 border lg:left-1/2 lg-right-auto lg:bottom-8 lg:-translate-x-1/2" />
          </div>

          <div className="relative z-1 grid gap-5 lg:grid-cols-2">
            <div className="relative min-h-[39rem] border border-n-1/10 rounded-3xl overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src={service2}
                  className="h-full w-full object-cover"
                  width={630}
                  height={750}
                  alt="robot"
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-n-8/0 to-n-8/90 lg:p-15">
                <h4 className="h4 mb-4">Photo editing</h4>
                <p className="body-2 mb-[3rem] text-n-3">
                  Automatically enhance your photos using our AI app&apos;s
                  photo editing feature. Try it now!
                </p>
              </div>

              <PhotoChatMessage />
            </div>

            <div className="p-4 bg-n-7 rounded-3xl overflow-hidden lg:min-h-[46rem]">
              <div className="py-12 px-4 xl:px-8">
                <h4 className="h4 mb-4">Video generation</h4>
                <p className="body-2 mb-[2rem] text-n-3">
                  The world’s most powerful AI photo and video art generation
                  engine. What will you create?
                </p>

                {/* <ul className="flex items-center justify-between">
                  {brainwaveServicesIcons.map((item, index) => (
                    <li
                      key={index}
                      className={`rounded-2xl flex items-center justify-center w-[3rem] h-[3rem] p-0.25 bg-conic-gradient md:w-[4.5rem] md:h-[4.5rem]`}
                    >
                      {videoRef.current.map((_, i) => (
                        <span
                          key={i}
                          className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                          ref={(el) => (videoDivRef.current[i] = el)}
                        >
                          <span
                            className="absolute h-full w-full rounded-full"
                            ref={(el) => (videoSpanRef.current[i] = el)}
                          >
                            <img
                              src={item}
                              width={24}
                              height={24}
                              alt={item}
                              className="w-full h-full object-contain"
                            />
                          </span>
                        </span>
                      ))}
                    </li>
                  ))}
                </ul> */}

                <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                  {videoRef.current.map((_, i) => (
                    <span
                      key={i}
                      className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                      ref={(el) => (videoDivRef.current[i] = el)}
                    >
                      <span
                        className="absolute h-full w-full rounded-full"
                        ref={(el) => (videoSpanRef.current[i] = el)}
                      />
                    </span>
                  ))}
                </div>
              </div>

              {/* <VideoCarousel/> */}
              <div className="relative h-[20rem] bg-n-8 rounded-xl overflow-hidden md:h-[25rem]">
                <div className="flex items-center">
                  {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                      <div className="video-carousel_container">
                        <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                          <video
                            id="video"
                            playsInline={true}
                            className={`${
                              list.id === 2 && "translate-x-44"
                            } pointer-events-none`}
                            preload="auto"
                            muted
                            ref={(el) => (videoRef.current[i] = el)}
                            onEnded={() =>
                              i !== 3
                                ? handleProcess("video-end", i)
                                : handleProcess("video-last")
                            }
                            onPlay={() =>
                              setVideo((pre) => ({ ...pre, isPlaying: true }))
                            }
                            onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                          >
                            <source src={list.video} type="video/mp4" />
                          </video>
                        </div>

                        <div className="absolute top-12 left-[5%] z-10">
                          {list.textLists.map((text, i) => (
                            <p
                              key={i}
                              className="md:text-2xl text-xl font-medium"
                            >
                              {text}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute left-0 bottom-0 w-full flex items-center p-6 z-19">
                  <button className="control-btn">
                    <img
                      src={
                        isLastVideo
                          ? replayImg
                          : !isPlaying
                          ? playImg
                          : pauseImg
                      }
                      alt={
                        isLastVideo ? "replay" : !isPlaying ? "play" : "pause"
                      }
                      onClick={
                        isLastVideo
                          ? () => handleProcess("video-reset")
                          : !isPlaying
                          ? () => handleProcess("play")
                          : () => handleProcess("pause")
                      }
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Gradient />
        </div>
      </div>
    </Section>
  );
};

export default Services;
