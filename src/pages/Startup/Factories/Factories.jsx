import { Link } from "react-router-dom";

function Factories() {
  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="flex justify-between gap-2 flex-wrap">
          <div>
            <h2 className="text-3xl mb-0.5">factories</h2>
            <p className="text-lightblack text-sm">
              this page shows all the factory requests you've sent and responses
              received
            </p>
          </div>
          <Link
            to={"/Startup/Request"}
            className="border border-black p-2 px-4 flex items-center gap-2 h-fit hover:bg-black hover:text-white transition duration-300 ease-in-out delay-150"
          >
            <i className="fa-solid fa-arrows-turn-right"></i>
            <span>send new requests</span>
          </Link>
        </div>
        <div className="mb-4 mt-8 xs:mb-0">
          <h2 className="text-3xl mb-0.5">requests</h2>
          <p className="text-lightblack">
            here are all the supply or manufacturing requests you've submitted
            to factories.
          </p>
        </div>
        <div className="overflow-x-auto mt-4">
          <div>
            <div className="min-w-[600px] flex justify-between items-center gap-4 mb-4">
              <span className="text-sm whitespace-nowrap text-lightblack">
                request id
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                product
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                quantity
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                deadline
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                status
              </span>
            </div>
            <div className="min-w-[600px] flex justify-between items-center gap-4 mb-4">
              <Link to={"/Startup/RequestDetails"} className="text-sm">
                request #12
              </Link>
              <p className="text-sm">hoodie</p>
              <p className="text-sm">500 pcs</p>
              <p className="text-sm">25 june</p>
              <button className="text-sm bg-secondary text-white py-1  px-1.5">
                Rejected
              </button>
            </div>
          </div>
        </div>
        <div className="mb-4 mt-8 xs:mb-0">
          <h2 className="text-3xl mb-0.5">responses</h2>
          <p className="text-lightblack">
            check incoming factory responses on the right
          </p>
        </div>
        <div className="overflow-x-auto mt-4">
          <div>
            <div className="min-w-[600px] flex justify-between items-center gap-4 mb-4">
              <span className="text-sm whitespace-nowrap text-lightblack">
                request id
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                factory
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                offer price
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                delivery
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                status
              </span>
            </div>
            <div className="min-w-[600px] flex justify-between items-center gap-4 mb-4">
              <p className="text-sm">request #12</p>
              <p className="text-sm">al shark grame</p>
              <p className="text-sm">88 egp/unit</p>
              <p className="text-sm">10 days</p>
              <p className="text-sm bg-green-500 text-white py-1 px-2">
                accepted
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Factories;
