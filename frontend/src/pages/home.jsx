import Hero from "../components/Hero";
import RootLayout from "../layout/RootLayout";

function Home() {
  return (
    <RootLayout>
      <div className="w-full flex justify-center h-screen pt-36 md:pt-10">
       <Hero/>
      </div>
    </RootLayout>
  );
}

export default Home;
