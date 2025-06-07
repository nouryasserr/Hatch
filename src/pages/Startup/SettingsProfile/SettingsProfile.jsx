function SettingsProfile() {
  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="mb-6">
          <h2 className="text-3xl mb-0.5">settings</h2>
          <p className="text-lightblack text-sm">
            manage your startup public and private information
          </p>
        </div>
        <form>
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="w-full lg:w-1/2">
              <div className="mb-4">
                <h5 className="text-2xl mb-0.5">startup info</h5>
                <p className="text-lightblack text-sm">
                  this info appears publicy in your brand profile.
                </p>
              </div>
              <div>
                <div className="mb-4">
                  <label htmlFor="name" className="flex items-start gap-2 mb-2">
                    <span className="text-lg">startup name</span>
                  </label>
                  <input
                    type="text"
                    autoComplete="on"
                    placeholder="startup name"
                    name="name"
                    id="name"
                    className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="flex items-start gap-2 mb-2"
                  >
                    <span className="text-lg">startup description</span>
                  </label>
                  <input
                    type="text"
                    autoComplete="on"
                    placeholder="startup description"
                    id="description"
                    name="description"
                    className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="category"
                    className="flex items-start gap-2 mb-2"
                  >
                    <span className="text-lg">category</span>
                  </label>
                  <input
                    type="text"
                    autoComplete="on"
                    placeholder="clothes"
                    id="category"
                    name="category"
                    className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                  />
                </div>
              </div>
              <div className="mb-4">
                <h5 className="text-2xl mb-0.5">logo upload</h5>
              </div>
              <div className="mb-4 xs:mb-0">
                <h2 className="text-3xl mb-0.5">subscription plan</h2>
                <p className="text-lightblack text-sm">
                  your current active plan and its status
                </p>
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <h5 className="mb-2 text-lg">current plan</h5>
                  <p className="text-sm">pro + add-ons</p>
                </div>
                <div>
                  <h5 className="mb-2 text-lg">next renewal</h5>
                  <p className="text-sm">6 july 2025</p>
                </div>
                <button className="text-underline text-sm">change plan</button>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="mb-4">
                <h5 className="text-2xl mb-0.5">contact info</h5>
                <p className="text-lightblack text-sm">
                  used to communicate with you for orders and system
                  notifications
                </p>
              </div>
              <div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="flex items-start gap-2 mb-2"
                  >
                    <span className="text-lg">email address</span>
                  </label>
                  <input
                    type="email"
                    autoComplete="on"
                    placeholder="contact@hanona.com"
                    id="email"
                    name="email"
                    className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="phone"
                    className="flex items-start gap-2 mb-2"
                  >
                    <span className="text-lg">phone number</span>
                  </label>
                  <input
                    type="tel"
                    autoComplete="on"
                    placeholder="01019590580"
                    id="phone"
                    name="phone"
                    className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                  />
                </div>
              </div>
              <div className="mb-4">
                <h5 className="text-2xl mb-0.5">social media</h5>
                <p className="text-lightblack text-sm">
                  shown on your profile to help customers find you
                </p>
              </div>
              <div>
                <div className="mb-4">
                  <label
                    htmlFor="facebook"
                    className="flex items-start gap-2 mb-2"
                  >
                    <span className="text-lg">facebook link</span>
                  </label>
                  <input
                    type="text"
                    autoComplete="on"
                    placeholder="facebook.com"
                    id="facebook"
                    name="facebook"
                    className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="instagram"
                    className="flex items-start gap-2 mb-2"
                  >
                    <span className="text-lg">instagram link</span>
                  </label>
                  <input
                    type="text"
                    autoComplete="on"
                    placeholder="instagram.com"
                    id="instagram"
                    name="instagram"
                    className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            className={
              "w-full lg:w-1/2 mt-4 bg-primary rounded-full py-1.5 px-6 text-white border border-primary hover:border-black hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150"
            }
          >
            save changes
          </button>
          <button className="w-full lg:w-1/2 block text-center mt-4 underline hover:no-underline transition duration-300 ease-in-out delay-150">
            cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default SettingsProfile;
