import { useState } from "react";
import AddLocation from "../AddLocation/AddLocation";

function CheckoutAdress({ onClose }) {
  const [showAddLocation, setshowAddLocation] = useState(false);
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-blackmuted bg-opacity-70">
        <div className="w-11/12 xs:w-96 md:w-1/2 lg:w-1/3 bg-white shadow-lg">
          <div className="flex items-center justify-between py-4 px-4 xs:px-6">
            <h4 className="text-base xs:text-xl">your location</h4>
            <button onClick={onClose}>
              <i className="fa-solid fa-xmark text-lightblack"></i>
            </button>
          </div>
          <hr />
          <div className="py-4 md:py-6 px-4 xs:px-6">
            <div className="py-4 flex justify-between items-center">
              <div>
                <p className="text-zinc-400 text-xs">home</p>
                <p>ziad amr</p>
                <p className="text-zinc-400 text-xs">
                  15 a - had2ek el ahram - giza
                </p>
              </div>
              <p className="py-1 px-3 border border-stone-100 bg-stone-100 text-sm rounded-full cursor-pointer">
                choosed
              </p>
            </div>
            <hr />
            <div className="py-4 flex justify-between items-center">
              <div>
                <p className="text-zinc-400 text-xs">office</p>
                <p>el-zamalek studio</p>
                <p className="text-zinc-400 text-xs">
                  25 abo el feda - zamalek - giza
                </p>
              </div>
              <p className="py-1 px-4 border border-black text-sm rounded-full cursor-pointer">
                choose
              </p>
            </div>
            <div className="mt-4">
              <button className="w-full my-2 bg-black border border-black rounded-full font-extralight text-sm text-white p-2 hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150">
                confirm
              </button>
              <button
                onClick={() => setshowAddLocation(true)}
                className="w-full border border-black rounded-full font-extralight text-sm p-2 hover:bg-black hover:text-white transition duration-300 ease-in-out delay-150"
              >
                add new adress
              </button>
            </div>
          </div>
        </div>
      </div>
      {showAddLocation && (
        <AddLocation onClose={() => setshowAddLocation(false)} />
      )}
    </>
  );
}

export default CheckoutAdress;
