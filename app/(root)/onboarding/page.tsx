import { Metadata } from "next";
import { getOnboardingContent } from "@/app/lib/onboarding";

export const metadata: Metadata = {
  title: "What is Cafa Tickets",
  description:
    "Learn what Cafa Tickets is, how it helps attendees discover events, and how organizers manage ticket sales.",
  alternates: {
    canonical: "https://www.cafaticket.com/onboarding",
  },
};

const OnboardingPage = async () => {
  const onboarding = await getOnboardingContent();

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12 text-white">
      <article className="space-y-6">
        <h1 className="big-text-2 font-bold">{onboarding.title}</h1>
        {onboarding.paragraphs.map((paragraph, index) => (
          <p key={`${index}-${paragraph.slice(0, 20)}`} className="normal-text leading-7">
            {paragraph}
          </p>
        ))}
      </article>
    </main>
  );
};

export default OnboardingPage;
