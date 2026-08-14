"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TermsPage from "../terms/page";

export default function PrivacyPage() {
  const router = useRouter();

  useEffect(() => {
    // If client-side loaded, set hash to privacy if not present
    if (!window.location.hash) {
      window.location.hash = "privacy";
    }
  }, [router]);

  return <TermsPage />;
}
