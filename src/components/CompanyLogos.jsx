import React from "react";
import { motion } from "framer-motion";
import { companyLogos } from "../constants";
import Marquee from "react-fast-marquee";

const CompanyLogos = ({ className }) => {
  return (
    <div className={`relative ${className}`}>
      <h5 className="tagline mb-6 text-center text-n-1/50">
        Helping people create beautiful content at
      </h5>
      <Marquee pauseOnHover speed={40}>
        <div className="relative w-full">
          <motion.ul className="flex">
            {companyLogos.map((logo, index) => (
              <li
                className="flex items-center justify-center flex-1 h-[8.5rem] mx-4 h-65"
                key={index}
              >
                <img src={logo} width={200} height={70} alt={`Logo ${index}`} />
              </li>
            ))}
          </motion.ul>
        </div>
      </Marquee>
      <div className="absolute top-0 left-0 -ml-16 w-48 h-full bg-black opacity-50 blur-lg pointer-events-none rounded-l-full"></div>
        <div className="absolute top-0 right-0 -mr-16 w-48 h-full bg-black opacity-50 blur-lg pointer-events-none rounded-r-full"></div>
 
    </div>
  );
};

export default CompanyLogos;
