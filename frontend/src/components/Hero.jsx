import HeroImage from "../assets/hero.jpg";
const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row gap-10 md:items-center max-w-6xl px-3  mx-auto">
      <div className="w-full md:w-1/2 flex flex-col gap-5">
        <h1 className="text-2xl md:text-3xl font-bold uppercase">
          Streamline Your Support with Our Ticketing System.
        </h1>
        <p className="text-lg">
          Elevate your support with our easy-to-use ticketing system. Users can
          create tickets, while admins manage and track them, ensuring smooth
          workflows and faster resolutions.
        </p>
      </div>
      <div className="w-full md:w-1/2">
        <img className="w-[30rem] animate-pulse" src={HeroImage} alt="hero image" />
      </div>
    </div>
  );
};

export default Hero;
