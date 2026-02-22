"use client";

import React, { useEffect, useState } from "react";
import {
  Save,
  Loader2,
  AlertCircle,
  Globe,
  Shield,
  Sliders,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import Button from "@/components/Common/Button";
import {
  fetchAdminSettings,
  saveAdminSettings,
  type AdminSiteSettings,
} from "@/lib/adminApi";

const inputClass =
  "w-full rounded-lg border border-dark_border bg-black/30 px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-primary";

export default function AdminSettings() {
  const [settings, setSettings] = useState<AdminSiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchAdminSettings();
        setSettings(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load settings");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleToggle = (key: keyof AdminSiteSettings, value: boolean) => {
    if (!settings || typeof settings[key] !== "boolean") return;
    setSettings((s) => (s ? { ...s, [key]: value } : s));
    setMessage(null);
  };

  const handleSave = async () => {
    if (!settings || saving) return;
    setSaving(true);
    setMessage(null);
    try {
      const updated = await saveAdminSettings(settings);
      setSettings(updated);
      setMessage("Settings saved.");
      setTimeout(() => setMessage(null), 3000);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading && !settings) {
    return (
      <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode min-h-[40vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </section>
    );
  }

  if (error && !settings) {
    return (
      <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 flex flex-col items-center gap-4">
            <AlertCircle className="h-10 w-10 text-red-400" />
            <p className="text-white">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!settings) return null;

  return (
    <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        {message && (
          <div className="mb-6 rounded-lg border border-primary/50 bg-primary/10 px-4 py-2 text-sm text-primary">
            {message}
          </div>
        )}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-2">
              Admin
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
              Settings
            </h1>
            <p className="mt-2 max-w-xl text-sm md:text-base text-muted">
              Site-wide configuration: maintenance mode, registration, and limits.
            </p>
          </div>
          <Button
            className="flex items-center gap-2 shrink-0"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </div>

        <div className="space-y-6">
          {/* General */}
          <div className="rounded-2xl border border-dark_border bg-dark_grey/70 p-5 md:p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <Globe className="h-5 w-5 text-primary" />
              General
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted">
                  Site name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) =>
                    setSettings((s) => (s ? { ...s, siteName: e.target.value } : s))
                  }
                  placeholder="CrypGo"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted">
                  Support email
                </label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) =>
                    setSettings((s) => (s ? { ...s, supportEmail: e.target.value } : s))
                  }
                  placeholder="support@example.com"
                  className={inputClass}
                />
              </div>
            </div>
            <p className="mt-2 text-xs text-muted">
              Shown to users for contact and support links.
            </p>
          </div>

          {/* Features */}
          <div className="rounded-2xl border border-dark_border bg-dark_grey/70 p-5 md:p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <Shield className="h-5 w-5 text-primary" />
              Features
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-dark_border bg-black/20 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">
                      Maintenance mode
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      Disable public access to the site
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleToggle("maintenanceMode", !settings.maintenanceMode)
                    }
                    className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity shrink-0"
                    aria-label={settings.maintenanceMode ? "Disable" : "Enable"}
                  >
                    {settings.maintenanceMode ? (
                      <ToggleRight className="h-10 w-10" />
                    ) : (
                      <ToggleLeft className="h-10 w-10 text-muted" />
                    )}
                  </button>
                </div>
              </div>
              <div className="rounded-xl border border-dark_border bg-black/20 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">
                      New user registration
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      Allow new sign-ups
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleToggle(
                        "newUserRegistration",
                        !settings.newUserRegistration
                      )
                    }
                    className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity shrink-0"
                    aria-label={
                      settings.newUserRegistration ? "Disable" : "Enable"
                    }
                  >
                    {settings.newUserRegistration ? (
                      <ToggleRight className="h-10 w-10" />
                    ) : (
                      <ToggleLeft className="h-10 w-10 text-muted" />
                    )}
                  </button>
                </div>
              </div>
              <div className="rounded-xl border border-dark_border bg-black/20 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">
                      Require email verification
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      Users must verify email before full access
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleToggle(
                        "requireEmailVerification",
                        !settings.requireEmailVerification
                      )
                    }
                    className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity shrink-0"
                    aria-label={
                      settings.requireEmailVerification ? "Disable" : "Enable"
                    }
                  >
                    {settings.requireEmailVerification ? (
                      <ToggleRight className="h-10 w-10" />
                    ) : (
                      <ToggleLeft className="h-10 w-10 text-muted" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Limits */}
          <div className="rounded-2xl border border-dark_border bg-dark_grey/70 p-5 md:p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <Sliders className="h-5 w-5 text-primary" />
              Limits
            </h2>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Max automations per user
              </label>
              <input
                type="number"
                min={1}
                max={50}
                value={settings.maxAutomationsPerUser}
                onChange={(e) =>
                  setSettings((s) =>
                    s
                      ? {
                          ...s,
                          maxAutomationsPerUser: Math.min(
                            50,
                            Math.max(1, Number(e.target.value) || 1)
                          ),
                        }
                      : s
                  )
                }
                className={inputClass + " max-w-[120px]"}
              />
              <p className="mt-2 text-xs text-muted">
                Each user can create up to this many automations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
