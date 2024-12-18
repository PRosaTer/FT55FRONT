// React
import React from "react";

// Components
import HomeContainer from "@/components/container_home";
import HeroHome from "@/components/hero";
import HeroOwner from "@/components/heroOwner";

export const Home: React.FC = () => {
  return (
    <div>
        <HeroHome />
        <HomeContainer />
        <HeroOwner />
    </div>
  );
}
export default Home;