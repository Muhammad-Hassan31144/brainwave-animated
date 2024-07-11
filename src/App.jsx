import React, { Suspense, lazy } from 'react';

const Header = lazy(() => import('./components/Header'));
const Hero = lazy(() => import('./components/Hero'));
const Benefits = lazy(() => import('./components/Benefits'));
const Collaboration = lazy(() => import('./components/Collaboration'));
const Services = lazy(() => import('./components/Services'));
const Pricing = lazy(() => import('./components/Pricing'));
const Roadmap = lazy(() => import('./components/Roadmap'));
const Footer = lazy(() => import('./components/Footer'));
const ButtonGradient = lazy(() => import('./assets/svg/ButtonGradient'));

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Hero />
          <Benefits />
          <Collaboration />
          <Services />
          <Pricing />
          <Roadmap />
          <Footer />
        </Suspense>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <ButtonGradient />
      </Suspense>
    </>
  );
};

export default App;
