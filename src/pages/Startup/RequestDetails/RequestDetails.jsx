import { Link } from "react-router-dom";

function RequestDetails() {
  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="flex justify-between gap-2 flex-wrap">
          <div>
            <h2 className="text-3xl mb-0.5">reques #7 - details page</h2>
            <p className="text-lightblack text-sm">
              here you can review your request and track responses from
              factories
            </p>
          </div>
          <Link className="border border-primary bg-primary text-white p-2 px-4 flex items-center gap-2 h-fit hover:bg-transparent hover:border-black hover:text-black transition duration-300 ease-in-out delay-150">
            <i className="fa-solid fa-download"></i>
            <span>Export</span>
          </Link>
        </div>
        <div className="mt-8 lg:w-1/2">
          <div className="mb-4 xs:mb-0">
            <h2 className="text-3xl mb-0.5">request info</h2>
            <p className="text-lightblack text-sm">
              basic information about your order
            </p>
          </div>
          <div className="flex gap-2 mt-4">
            <div className="w-1/2 space-y-2">
              <p className="text-sm xs:text-base">startup name</p>
              <p className="text-sm xs:text-base">delivery date</p>
              <p className="text-sm xs:text-base">description</p>
            </div>
            <div className="w-1/2 space-y-2">
              <p className="text-sm xs:text-base">Hatch</p>
              <p className="text-sm xs:text-base">2025-07-09</p>
              <p className="text-sm xs:text-base">ana 3ayz 5 farkhat</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="lg:w-1/2">
            <div className="mb-4 mt-8 xs:mb-0">
              <h2 className="text-3xl mb-0.5">request status</h2>
              <p className="text-lightblack text-sm">
                track the current status of this request
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-2">
                <p className="text-sm xs:text-base">status</p>
                <p className="text-sm xs:text-base">sent at</p>
                <p className="text-sm xs:text-base">additional info</p>
              </div>
              <div className="w-1/2 space-y-2">
                <p className="text-sm xs:text-base">PENDING</p>
                <p className="text-sm xs:text-base">2025-06-07 19:41:59</p>
                <p className="text-sm xs:text-base">-</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="mb-4 mt-8 xs:mb-0">
              <h2 className="text-3xl mb-0.5">responses from factories</h2>
              <p className="text-lightblack text-sm">
                all offers received in response to your request
              </p>
            </div>
            <div className="mt-4">
              <p className="text-secondary text-center text-sm border border-secondary rounded-md py-1.5 px-2 bg-red-200">
                no factories have responsed to this request yet
              </p>
            </div>
            <div className="mb-4 mt-4 xs:mb-0">
              <h3 className="text-2xl mb-0.5">factory: al shark</h3>
              <p className="text-lightblack text-sm">
                offer received - waiting for your action
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-2">
                <p className="text-sm xs:text-base">price offer</p>
                <p className="text-sm xs:text-base">estimated delivery</p>
                <p className="text-sm xs:text-base">message</p>
                <p className="text-sm xs:text-base">sent at</p>
              </div>
              <div className="w-1/2 space-y-2">
                <p className="text-sm xs:text-base">88 egp/unit</p>
                <p className="text-sm xs:text-base">10 days</p>
                <p className="text-sm xs:text-base">-</p>
                <p className="text-sm xs:text-base">27 may 2025 - 11:42 am</p>
              </div>
            </div>
            <div className="flex gap-6 mt-4">
              <button className="bg-green-500 text-white text-sm py-2 px-4 rounded">
                Accept
              </button>
              <button className="bg-secondary text-white text-sm py-2 px-4 rounded">
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RequestDetails;
