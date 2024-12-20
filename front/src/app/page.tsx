// React
import HomeContainer from "@/components/container_home";
import HeroHome from "@/components/hero";
import HeroOwner from "@/components/heroOwner";
import React from "react";

// components


export const Home: React.FC = () => {
  return (
    <div>
        <HeroHome />
        <HomeContainer/>
        <HeroOwner />
    </div>
  );
}
export default Home;