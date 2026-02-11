"use client";

import React, { useEffect, useState } from "react";
import { Save, ToggleLeft, ToggleRight, Loader2, AlertCircle } from "lucide-react";
import Button from "@/components/Common/Button";
import { fetchAdminSettings, saveAdminSettings, type AdminSiteSettings } from "@/lib/adminApi";

export default function AdminSettings() {
  const [settings, setSettings] = useState<AdminSiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
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
    if (!settings) return;
    setSettings((s) => (s ? { ...s, [key]: value } : s));
    setSaved(false);
  };

  const handleSave = async () => {
    if (!settings || saving) return;
    setSaving(true);
    try {
      await saveAdminSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading && !settings) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error && !settings) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 flex flex-col items-center gap-4">
        <AlertCircle className="h-10 w-10 text-red-400" />
        <p className="text-white">{error}</p>
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Settings</h1>
          <p className="text-sm text-muted mt-1">Site-wide configuration</p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saved ? "Saved" : "Save changes"}
        </Button>
      </div>

      <div className="space-y-6 max-w-2xl">
        <section className="rounded-xl border border-dark_border bg-dark_grey/60 p-5">
          <h2 className="text-lg font-medium text-white mb-4">General</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted mb-1">Site name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings((s) => (s ? { ...s, siteName: e.target.value } : s))}
                className="w-full rounded-lg border border-dark_border bg-black/20 px-4 py-2.5 text-sm text-white focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-1">Support email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings((s) => (s ? { ...s, supportEmail: e.target.value } : s))}
                className="w-full rounded-lg border border-dark_border bg-black/20 px-4 py-2.5 text-sm text-white focus:border-primary outline-none"
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-dark_border bg-dark_grey/60 p-5">
          <h2 className="text-lg font-medium text-white mb-4">Features</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Maintenance mode</p>
                <p className="text-xs text-muted">Disable public access to the site</p>
              </div>
              <button
                onClick={() => handleToggle("maintenanceMode", !settings.maintenanceMode)}
                className="text-primary"
              >
                {settings.maintenanceMode ? <ToggleRight className="h-10 w-10" /> : <ToggleLeft className="h-10 w-10 text-muted" />}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">New user registration</p>
                <p className="text-xs text-muted">Allow new sign-ups</p>
              </div>
              <button
                onClick={() => handleToggle("newUserRegistration", !settings.newUserRegistration)}
                className="text-primary"
              >
                {settings.newUserRegistration ? <ToggleRight className="h-10 w-10" /> : <ToggleLeft className="h-10 w-10 text-muted" />}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Require email verification</p>
                <p className="text-xs text-muted">Users must verify email before full access</p>
              </div>
              <button
                onClick={() => handleToggle("requireEmailVerification", !settings.requireEmailVerification)}
                className="text-primary"
              >
                {settings.requireEmailVerification ? <ToggleRight className="h-10 w-10" /> : <ToggleLeft className="h-10 w-10 text-muted" />}
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-dark_border bg-dark_grey/60 p-5">
          <h2 className="text-lg font-medium text-white mb-4">Limits</h2>
          <div>
            <label className="block text-sm font-medium text-muted mb-1">Max automations per user</label>
            <input
              type="number"
              min={1}
              max={50}
              value={settings.maxAutomationsPerUser}
              onChange={(e) =>
                setSettings((s) => (s ? { ...s, maxAutomationsPerUser: Number(e.target.value) || 1 } : s))
              }
              className="w-full max-w-[120px] rounded-lg border border-dark_border bg-black/20 px-4 py-2.5 text-sm text-white focus:border-primary outline-none"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
