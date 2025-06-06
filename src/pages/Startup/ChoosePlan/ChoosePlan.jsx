import { useState } from "react";

function ChoosePlan() {
  const [billingCycle, setBillingCycle] = useState("quarterly");
  const [selectedPackage, setSelectedPackage] = useState("pro_supply");

  const PACKAGE_PRICES = {
    starter: 600,
    pro_marketing: 1200,
    pro_supply: 1200,
    premium: 2500,
  };

  const calculatePrice = () => {
    const basePrice = PACKAGE_PRICES[selectedPackage];
    if (billingCycle === "yearly") {
      const yearlyPrice = basePrice * 4;
      const discount = yearlyPrice * 0.2;
      return yearlyPrice - discount;
    }
    return basePrice;
  };

  const packages = [
    {
      id: "starter",
      name: "starter package",
      description: "for small startups",
    },
    {
      id: "pro_marketing",
      name: "pro package",
      description: "for growing businesses",
      subtitle: "marketing add-on",
    },
    {
      id: "pro_supply",
      name: "pro package",
      description: "for growing businesses",
      subtitle: "supply/chain add-on",
    },
    {
      id: "premium",
      name: "premium package",
      description: "for scaling professionals",
    },
  ];

  const packageFeatures = {
    starter: {
      title: "brand profile",
      features: [
        "brand profile",
        "product management",
        "up to xx products",
        "dashboard tracking",
        "order alerts",
        "own analytics platform",
        "reports",
      ],
    },
    pro_marketing: {
      title: "includes everything in starter +",
      features: [
        "includes everything in starter +",
        "up to xxx products",
        "up to xx employees",
        "homepage feature",
        "social media shoutouts",
        "email campaigns",
        "seo boost",
      ],
    },
    pro_supply: {
      title: "includes everything in starter +",
      features: [
        "includes everything in starter +",
        "up to xxx products",
        "up to xx employees",
        "homepage feature",
        "social media shoutouts",
        "email campaigns",
        "seo boost",
      ],
    },
    premium: {
      title: "includes all add-ons +",
      features: [
        "includes all add-ons +",
        "unlimited products",
        "unlimited employees",
        "1 custom campaign/month",
        "early access to features",
        "hatch middleman support",
        "seasonal campaign",
      ],
    },
  };

  const getCurrentFeatures = () => {
    return packageFeatures[selectedPackage].features;
  };

  return (
    <div className="px-6 lg:px-12 py-8 sm:py-12 flex flex-col items-center justify-center">
      <h1 className="text-3xl xs:text-4xl font-medium mb-2">
        choose your plan
      </h1>
      <p className="text-lightblack mb-4 xs:mb-8 text-sm">flexible billing</p>
      <div className="flex flex-wrap justify-center items-center gap-4 mb-6 sm:mb-12">
        <span
          className={`${
            billingCycle === "quarterly" ? "text-black" : "text-lightblack"
          }`}
        >
          quarterly
        </span>
        <button
          className="relative w-14 h-7 border border-lightblack rounded-full py-0.5 px-1 transition-colors duration-300"
          onClick={() =>
            setBillingCycle((prev) =>
              prev === "quarterly" ? "yearly" : "quarterly"
            )
          }
        >
          <div
            className={`w-5 h-5 bg-primary rounded-full transition-transform duration-300 transform ${
              billingCycle === "yearly" ? "translate-x-7" : ""
            }`}
          />
        </button>
        <span
          className={`${
            billingCycle === "yearly" ? "text-black" : "text-lightblack"
          }`}
        >
          yearly
        </span>
        <span className="text-sm px-2 py-1 rounded-full border border-blackmuted">
          20% off
        </span>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 w-full xl:max-w-6xl">
        <div className="flex-1 space-y-4">
          {packages.map((pkg) => (
            <button
              key={pkg.id}
              className={`w-full text-left p-6 rounded-xl border transition-all ${
                selectedPackage === pkg.id
                  ? "border-lightblack bg-black opacity-95 text-white"
                  : "border-lightblack hover:border-black"
              }`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex flex-col xs:flex-row gap-1.5 xs:items-end mb-1">
                    <h6 className="font-medium">{pkg.name}</h6>
                    {pkg.subtitle && (
                      <span className="text-xs opacity-80">{pkg.subtitle}</span>
                    )}
                  </div>
                  <p className="text-sm opacity-50">{pkg.description}</p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedPackage === pkg.id
                      ? "bg-white"
                      : "border-lightblack"
                  }`}
                >
                  {selectedPackage === pkg.id && (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-black"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="flex-1 rounded-xl border border-lightblack p-4 xs:py-6 xs:px-8">
          <h3 className="text-2xl mb-6 text-center">what you get?</h3>
          <div className="space-y-4 mb-8">
            {getCurrentFeatures().map((feature, index) => (
              <div
                key={index}
                className="flex flex-row-reverse justify-between items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col xs:flex-row gap-4 items-center">
            <div className="flex items-end">
              <span className="text-2xl">{calculatePrice()} EGP</span>
              <span className="text-lightblack text-sm">/{billingCycle}</span>
            </div>
            <button className="w-full xs:w-auto grow bg-black border border-black text-white py-3 rounded-lg hover:bg-transparent hover:text-black transition ease-in-out duration-300 dealy-150">
              Choose plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChoosePlan;
