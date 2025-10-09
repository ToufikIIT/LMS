import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import Cta from "@/components/Cta";
import { recentSessions } from "@/constants";
import { getAllCompanions, getRecentSessions, getUserCompanions, getUserSessions } from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


const Page = async() => {
   const user = await currentUser();
   if (!user) redirect("/sign-in");
  const companions = await getUserCompanions(user.id);
  const recentSessionsCompanions = await getRecentSessions(10);
  return (
    <main>
      <h1 className="text-2xl underline">Dashboard</h1>
      <section className="home-section">
        {companions.map((companion) => (
                <CompanionCard
                    key={companion.id}
                    {...companion}
                    color={getSubjectColor(companion.subject)}
                />
            ))}
      </section>
      <section className="home-section">
        <CompanionsList
          title = "Recently completed sessions"
          companions = {await getUserSessions(user.id)}
          classNames = "w-2/3 max-lg:w-full"
        />
        <Cta/>
      </section>
    </main>
  );
};

export default Page;
