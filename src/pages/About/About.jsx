function About() {
  return (
    <>
      <div className="px-6 lg:px-12 pt-4 sm:pt-12">
        <div className="flex flex-col md:flex-row justify-between gap-2">
          <div className="text-6xl w-full sm:w-2/3 md:w-1/2 xl:w-1/3">
            the story of <span className="text-8xl">hatch</span>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 mt-4 md:mt-8">
            <h4 className="text-xl mb-2">
              it started with a walk through a local market.
            </h4>
            <p className="text-sm text-blackmuted">
              discover the latest additions to our collection.Fresh styles,
              trending designs, and must-have pieces - just in!
            </p>
          </div>
        </div>
        <h2 className="text-xl sm:text-3xl mt-8">
          We saw incredible products — handmade crafts, natural skincare,
          original fashion pieces all created by passionate local startups. But
          most of these brands? You’d never find them online. No big platforms
          were built for them. No spotlight to help them shine. They were
          building in silence.
        </h2>
        <div className="flex flex-col md:flex-row justify-between gap-2 mt-8">
          <div className="text-4xl sm:text-6xl w-full sm:w-2/3 md:w-1/2 xl:w-2/5">
            that's when the idea for hatch was born.
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4">
            <h4 className="text-xl mb-2">
              we asked ourselves: what if there was a digital home made just for
              startups?
            </h4>
            <p className="text-sm text-blackmuted">
              a space where they could show the world what they’re creating,
              connect with suppliers who believe in their vision, and find
              customers who love discovering something different.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-2 my-8">
          <div className="text-4xl sm:text-6xl w-full sm:w-2/3 md:w-1/2 xl:w-2/5">
            hatch is not just a marketplace, it's a launchpad.
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4">
            <h4 className="text-xl mb-2">
              we asked ourselves: what if there was a digital home made just for
              startups?
            </h4>
            <p className="text-sm text-blackmuted">
              it’s where startups come to be seen. where customers come to
              discover hidden gems. <br /> where suppliers meet rising brands
              and grow with them.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
