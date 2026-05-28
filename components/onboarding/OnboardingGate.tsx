"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Modal from "@/components/ui/Modal";

interface OnboardingGateProps {
  title: string;
  paragraphs: string[];
}

const ONBOARDING_COOKIE = "cafa_onboarding_seen";
const COOKIE_AGE_SECONDS = 60 * 60 * 24 * 365;

const OnboardingGate = ({ title, paragraphs }: OnboardingGateProps) => {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof document === "undefined") {
      return false;
    }

    const hasSeen = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .some((cookie) => cookie.startsWith(`${ONBOARDING_COOKIE}=true`));

    return !hasSeen;
  });

  const closeOnboarding = useMemo(
    () => () => {
      document.cookie = `${ONBOARDING_COOKIE}=true; path=/; max-age=${COOKIE_AGE_SECONDS}; samesite=lax`;
      setIsOpen(false);
    },
    []
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeOnboarding}
      title={title}
      size="xl"
      closeOnBackdropClick={false}
      footer={
        <button
          type="button"
          onClick={closeOnboarding}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Continue to Cafa Tickets
        </button>
      }
    >
      <div className="max-h-[60vh] overflow-y-auto pr-2">
        <div className="space-y-4 text-sm leading-6 text-slate-100">
          {paragraphs.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 20)}`}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-300">
          You can also read this at{" "}
          <Link href="/onboarding" className="underline hover:text-white">
            /onboarding
          </Link>
          .
        </p>
      </div>
    </Modal>
  );
};

export default OnboardingGate;
