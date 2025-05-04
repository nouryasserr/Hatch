import connectionLost from "../../assets/imgs/visuals/ConnectionLost.png";

function Nonetwork() {
  return (
    <>
      <div className="px-6 lg:px-12 pb-6 sm:py-6 md:py-10">
        <div className="flex justify-content-center items-center flex-col gap-2 sm:gap-6">
          <img src={connectionLost} className=" w-80 mb-4" />
          <h4 className="text-xl sm:text-2xl text-center">
            connection lost – style paused
          </h4>
          <p className="blackMuted70 text-center text-xs sm:text-base">
            you’re offline right now, but we’ll be right here when you're back
          </p>
        </div>
      </div>
    </>
  );
}

export default Nonetwork;
