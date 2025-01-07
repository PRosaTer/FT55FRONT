import HeroHome from "@/components/home/hero/hero";
import HeroOwner from "@/components/home/heroOwner/heroOwner";
import HomeContainer from "@/components/home/home_container";
import Support from "@/components/home/support/support";

export default function Home() {
  return (
    <div>
      <main>
        <HeroHome />
        <HomeContainer />
        <HeroOwner />
        <Support />
      </main>
    </div>
  );
}
