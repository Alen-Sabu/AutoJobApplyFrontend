"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHeading from "../Common/PageHeading";
import PageSubheading from "../Common/PageSubheading";
import { Compass, Loader2, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import Button from "@/components/Common/Button";
import { fetchPlaybooks, usePlaybook, type Playbook } from "@/lib/playbooksApi";
import { fetchSetupStatus } from "@/lib/setupApi";

const JobPlaybooks = () => {
  const router = useRouter();
  const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingId, setUsingId] = useState<string | null>(null);
  const [setupComplete, setSetupComplete] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const list = await fetchPlaybooks();
        setPlaybooks(list);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load playbooks");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    fetchSetupStatus().then((s) => setSetupComplete(s.complete));
  }, []);

  const handleUsePlaybook = async (playbook: Playbook) => {
    if (usingId) return;
    if (setupComplete === false) {
      router.push("/setup");
      return;
    }
    setUsingId(playbook.id);
    try {
      const result = await usePlaybook(playbook.id);
      if (result.redirectTo) {
        router.push(result.redirectTo);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setUsingId(null);
    }
  };

  if (error && playbooks.length === 0) {
    return (
      <div className="bg-darkmode min-h-[40vh] flex items-center justify-center">
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 flex flex-col items-center gap-4">
          <AlertCircle className="h-10 w-10 text-red-400" />
          <p className="text-white">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-darkmode">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md p-6 lg:pt-40 pt-20">
        <PageSubheading
          icon={Compass}
          text="Start from battle‑tested"
          highlight="automation playbooks"
        />
        <PageHeading
          topHeading="Explore ready‑made"
          bottomHeading="job search flows"
        />

        {setupComplete === false && (
          <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-amber-200">
              <ShieldCheck className="h-5 w-5 shrink-0" />
              <p className="text-sm">
                Complete your profile setup (resume + details) to use playbooks and create automations.
              </p>
            </div>
            <Link href="/setup">
              <Button variant="primary">Complete setup</Button>
            </Link>
          </div>
        )}

        {loading && playbooks.length === 0 ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
            {playbooks.map((playbook) => (
              <div
                key={playbook.id}
                className="bg-slateGray shadow-md rounded-xl p-5 flex flex-col justify-between border border-dark_border hover:border-primary/40 transition-colors"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {playbook.title}
                  </h3>
                  <p className="text-sm text-gray-400">{playbook.description}</p>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <p className="text-xs text-muted">
                    Use as a template when configuring your own automations.
                  </p>
                  <Button
                    variant="secondary"
                    className="w-full text-sm justify-center gap-2"
                    onClick={() => handleUsePlaybook(playbook)}
                    disabled={usingId !== null}
                  >
                    {usingId === playbook.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Use this playbook
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPlaybooks;
