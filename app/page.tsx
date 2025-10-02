import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import Cta from "@/components/Cta";
import { recentSessions } from "@/constants";

const Page = () => {
  return (
    <main>
      <h1 className="text-2xl underline">Dashboard</h1>
      <section className="home-section">
        <CompanionCard
          id = "123"
          name = "Neura the Brainy Explorer"
          topic = "Neural Network of the Brain"
          subject = "Science"
          duration = {45}
          color = "#ffda6e"
          bookmarked = {true}
        />
        <CompanionCard
          id = "456"
          name = "Countsy the Number Wizard"
          topic = "Derivatives and Integrals"
          subject = "Maths"
          duration = {30}
          color = "#e5d0ff"
          bookmarked = {false}
        />
        <CompanionCard
          id = "789"
          name = "Verba the Vocabulary Builder"
          topic = "English literature"
          subject = "Language"
          duration = {30}
          color = "#bde7ff"
          bookmarked = {true}
        />
      </section>
      <section className="home-section">
        <CompanionsList
          title = "Recently completed sessions"
          companions = {recentSessions}
          classNames = "w-2/3 max-lg:w-full"
        />
        <Cta/>
      </section>
    </main>
  );
};

export default Page;
