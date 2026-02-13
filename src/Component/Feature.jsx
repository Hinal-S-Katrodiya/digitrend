// FeatureCards.jsx
import fastDeliveryImg from "../assets/fast-delivery.png";
import transparentPricingImg from "../assets/transparent-pricing.png";
import everythingOneRoofImg from "../assets/everything-one-roof.png";

const features = [
  {
    image: fastDeliveryImg,
    title: "Fast & Reliable Delivery",
    description:
      "Creativity moves fast here—your deadline doesn't stand a chance. We deliver at turbo speed, powered by fresh ideas",
  },
  {
    image: transparentPricingImg,
    title: "Clear, No-Surprise Pricing",
    description:
      "One plan, one price, no sneaky fees. Pay by milestone, get unlimited changes in design. What you see is what you pay.",
  },
  {
    image: everythingOneRoofImg,
    title: "Everything Under One Roof",
    description:
      "Branding, design, websites, research—we've got it all covered. From first wireframe to launch, you only need us.",
  },
];

const FeatureCards = () => {
  return (
    <section className="w-full py-24 px-6 mt- -1.5" >
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-10">
        {features.map((feature) => (
          <div key={feature.title} className="flex flex-col items-center text-center">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-60 h-60 object-contain mb-8 transition-transform duration-500 ease-in-out hover:scale-110 "
            />
            <h3
              className="text-2xl md:text-[1.7rem] font-extrabold text-gray-900 mb-3 leading-snug"
              style={{ fontFamily: "'serif', 'Times New Roman', ", fontStyle: "italic" }}
            >
              {feature.title}
            </h3>
            <p className="text-gray-500 text-[0.95rem] leading-relaxed max-w-[280px]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
