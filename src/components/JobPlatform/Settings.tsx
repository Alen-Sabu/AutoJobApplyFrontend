"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Common/Button";
import { User, Shield, Mail, Key, Smartphone, Loader2, AlertCircle } from "lucide-react";
import {
  fetchSettings,
  saveAccount,
  updateEmail,
  verifyEmail,
  changePassword,
  enable2FA,
  deleteAccount,
  type SettingsData,
} from "@/lib/settingsApi";

const inputClass =
  "w-full rounded-lg border border-dark_border bg-black/30 px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-primary";

const Settings: React.FC = () => {
  const [data, setData] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [savingAccount, setSavingAccount] = useState(false);
  const [savingEmail, setSavingEmail] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [enabling2FA, setEnabling2FA] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchSettings();
        setData(res);
        setDisplayName(res.displayName);
        setUsername(res.username);
        setEmail(res.email);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load settings");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const showMsg = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSaveAccount = async () => {
    setSavingAccount(true);
    setMessage(null);
    try {
      const res = await saveAccount({ displayName, username });
      setData(res);
      setDisplayName(res.displayName);
      setUsername(res.username);
      showMsg("Account updated");
    } catch (e) {
      showMsg(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSavingAccount(false);
    }
  };

  const handleUpdateEmail = async () => {
    setSavingEmail(true);
    setMessage(null);
    try {
      const res = await updateEmail(email);
      setData(res);
      setEmail(res.email);
      showMsg("Email updated");
    } catch (e) {
      showMsg(e instanceof Error ? e.message : "Failed to update email");
    } finally {
      setSavingEmail(false);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      await verifyEmail();
      showMsg("Verification email sent");
    } catch (e) {
      showMsg(e instanceof Error ? e.message : "Failed to send verification");
    }
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 8) {
      showMsg("New password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      showMsg("New passwords do not match");
      return;
    }
    setChangingPassword(true);
    setMessage(null);
    try {
      await changePassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      showMsg("Password changed");
    } catch (e) {
      showMsg(e instanceof Error ? e.message : "Failed to change password");
    } finally {
      setChangingPassword(false);
    }
  };

  const handleEnable2FA = async () => {
    setEnabling2FA(true);
    setMessage(null);
    try {
      await enable2FA();
      if (data) setData({ ...data, twoFactorEnabled: true });
      showMsg("2FA enabled");
    } catch (e) {
      showMsg(e instanceof Error ? e.message : "Failed to enable 2FA");
    } finally {
      setEnabling2FA(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "DELETE") return;
    setDeleting(true);
    setMessage(null);
    try {
      await deleteAccount(deleteConfirm);
      showMsg("Account deactivated. Redirecting…");
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("crypgo_authed");
        setTimeout(() => window.location.href = "/signin", 1500);
      }
    } catch (e) {
      showMsg(e instanceof Error ? e.message : "Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  if (loading && !data) {
    return (
      <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode min-h-[40vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </section>
    );
  }

  if (error && !data) {
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

  return (
    <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        {message && (
          <div className="mb-6 rounded-lg border border-primary/50 bg-primary/10 px-4 py-2 text-sm text-primary">
            {message}
          </div>
        )}
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-2">
            Account & security
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
            Settings
          </h1>
          <p className="mt-2 max-w-xl text-sm md:text-base text-muted">
            Manage your account details, email, and security preferences.
          </p>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-dark_border bg-dark_grey/70 p-5 md:p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <User className="h-5 w-5 text-primary" />
              Account
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted">Display name</label>
                <input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted">Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button className="text-sm px-4 py-2" onClick={handleSaveAccount} disabled={savingAccount}>
                {savingAccount ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save account"}
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-dark_border bg-dark_grey/70 p-5 md:p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <Mail className="h-5 w-5 text-primary" />
              Email
            </h2>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass + " md:max-w-md"}
              />
            </div>
            <p className="mt-2 text-xs text-muted">We use this for login and important notifications.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button className="text-sm px-4 py-2" onClick={handleUpdateEmail} disabled={savingEmail}>
                {savingEmail ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update email"}
              </Button>
              <Button variant="secondary" className="text-sm px-4 py-2 border border-dark_border" onClick={handleVerifyEmail}>
                Verify email
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-dark_border bg-dark_grey/70 p-5 md:p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <Shield className="h-5 w-5 text-primary" />
              Security
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-dark_border bg-black/20 p-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Key className="h-4 w-4 text-primary shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-white">Password</p>
                      <p className="text-xs text-muted">{data?.passwordLastChanged ?? "Never changed"}</p>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-xs text-muted">Current password</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        className={inputClass}
                        autoComplete="current-password"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-muted">New password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className={inputClass}
                        autoComplete="new-password"
                        minLength={8}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-muted">Confirm new password</label>
                      <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className={inputClass}
                        autoComplete="new-password"
                      />
                    </div>
                  </div>
                  <Button variant="secondary" className="text-sm px-4 py-2 w-full sm:w-auto" onClick={handleChangePassword} disabled={changingPassword || !currentPassword || !newPassword || !confirmNewPassword}>
                    {changingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : "Change password"}
                  </Button>
                </div>
              </div>
              <div className="rounded-xl border border-dark_border bg-black/20 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-white">Two-factor authentication</p>
                      <p className="text-xs text-muted">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Button variant="secondary" className="text-sm px-4 py-2 w-full sm:w-auto" onClick={handleEnable2FA} disabled={enabling2FA}>
                    {enabling2FA ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enable 2FA"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5 md:p-6">
            <h2 className="mb-2 text-lg font-semibold text-red-300">Danger zone</h2>
            <p className="mb-4 text-sm text-muted">
              Once you delete your account, there is no going back. Type DELETE to confirm.
            </p>
            <input
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder="Type DELETE"
              className="mb-3 w-full max-w-xs rounded-lg border border-dark_border bg-black/30 px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-red-500"
            />
            <Button
              className="border border-red-500/50 bg-transparent text-red-300 hover:bg-red-500/20"
              onClick={handleDeleteAccount}
              disabled={deleting || deleteConfirm !== "DELETE"}
            >
              {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete account"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
