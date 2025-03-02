import Features from "../components/Features";
import Hero from "../components/Hero";
import RootLayout from "../layout/RootLayout";

function Home() {
  return (
    <RootLayout>
      <div id="hero" className="w-full flex justify-center h-screen pt-36 md:pt-10">
       <Hero/>
      </div>
      <div id="features" className="w-full h-screen pt-7 md:pt-24 bg-sky-100">
        <Features/>
      </div>
    </RootLayout>
  );
}

export default Home;
