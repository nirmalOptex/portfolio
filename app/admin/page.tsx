"use client";

import { useCallback, useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import {
  Database,
  ExternalLink,
  KeyRound,
  LayoutDashboard,
  Loader2,
  RefreshCw,
  Save,
  ShieldCheck,
} from "lucide-react";

type AdminItem = {
  id?: string;
  [key: string]: unknown;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const adminUrl = `${API_BASE}/admin`;

const getText = (value: unknown) => (typeof value === "string" ? value : "");
const getStringArray = (value: unknown) =>
  Array.isArray(value) && value.every((item) => typeof item === "string")
    ? value
    : [];

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const [siteContent, setSiteContent] = useState<AdminItem[]>([]);
  const [navLinks, setNavLinks] = useState<AdminItem[]>([]);
  const [projects, setProjects] = useState<AdminItem[]>([]);
  const [services, setServices] = useState<AdminItem[]>([]);
  const [skills, setSkills] = useState<AdminItem[]>([]);
  const [socialLinks, setSocialLinks] = useState<AdminItem[]>([]);
  const [testimonials, setTestimonials] = useState<AdminItem[]>([]);

  const apiHeaders = useMemo(
    () => ({
      "Content-Type": "application/json",
      "x-admin-secret": secret,
    }),
    [secret]
  );

  const fetchWithSecret = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...apiHeaders,
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Request failed");
    }

    return response.json();
  };

  const loadData = useCallback(async () => {
    if (!secret) return;

    setLoading(true);
    setMessage("");

    try {
      const [siteContentData, navLinkData, projectData, serviceData, skillData, socialData, testimonialData] =
        await Promise.all([
          fetchWithSecret(`${API_BASE}/admin-dashboard/site-content`),
          fetchWithSecret(`${API_BASE}/admin-dashboard/navigation`),
          fetchWithSecret(`${API_BASE}/admin-dashboard/projects`),
          fetchWithSecret(`${API_BASE}/admin-dashboard/services`),
          fetchWithSecret(`${API_BASE}/admin-dashboard/skills`),
          fetchWithSecret(`${API_BASE}/admin-dashboard/social-links`),
          fetchWithSecret(`${API_BASE}/admin-dashboard/testimonials`),
        ]);

      setSiteContent(Array.isArray(siteContentData) ? siteContentData : []);
      setNavLinks(Array.isArray(navLinkData) ? navLinkData : []);
      setProjects(Array.isArray(projectData) ? projectData : []);
      setServices(Array.isArray(serviceData) ? serviceData : []);
      setSkills(Array.isArray(skillData) ? skillData : []);
      setSocialLinks(Array.isArray(socialData) ? socialData : []);
      setTestimonials(Array.isArray(testimonialData) ? testimonialData : []);
      setIsAuthorized(true);
      setMessage("Dashboard loaded successfully.");
    } catch (error) {
      setIsAuthorized(false);
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  }, [secret]);

  const updateField = (
    stateSetter: Dispatch<SetStateAction<AdminItem[]>>,
    id: string,
    key: string,
    value: unknown
  ) => {
    stateSetter((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };

  const saveItem = async (
    endpoint: string,
    id: string,
    payload: Record<string, unknown>
  ) => {
    setSavingId(id);
    try {
      await fetchWithSecret(`${API_BASE}/admin-dashboard/${endpoint}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      setMessage("Changes saved successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not save changes."
      );
    } finally {
      setSavingId(null);
    }
  };

  const renderTextField = (
    label: string,
    value: string,
    onChange: (value: string) => void,
    multiline = false
  ) => (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-muted-foreground">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none ring-0 focus:border-primary"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none ring-0 focus:border-primary"
        />
      )}
    </label>
  );

  return (
    <main className="min-h-screen bg-background px-4 py-24 md:px-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-3xl border border-border bg-card p-8 shadow-lg md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Admin Dashboard
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Edit your portfolio content
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={adminUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:bg-accent"
              >
                Open Admin Panel
                <ExternalLink className="h-4 w-4" />
              </Link>
              <button
                onClick={loadData}
                className="inline-flex items-center justify-center rounded-xl border border-border p-3 transition hover:bg-accent/10"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background p-5">
              <LayoutDashboard className="h-5 w-5 text-primary" />
              <h2 className="mt-3 font-semibold">Homepage sections</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Update hero, about, CTA, and contact content.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-5">
              <Database className="h-5 w-5 text-primary" />
              <h2 className="mt-3 font-semibold">Projects & services</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage portfolio items, skills, and testimonials.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-5">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h2 className="mt-3 font-semibold">Secure editing</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Only authorized people can edit these records.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-background p-4">
            <label className="flex flex-col gap-2 text-sm">
              <span className="flex items-center gap-2 font-medium text-muted-foreground">
                <KeyRound className="h-4 w-4" />
                Admin Secret
              </span>
              <input
                type="password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Enter your dashboard secret"
                className="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-primary"
              />
            </label>
          </div>
        </section>

        {message ? (
          <div className="rounded-2xl border border-border bg-background p-4 text-sm text-muted-foreground">
            {message}
          </div>
        ) : null}

        {loading ? (
          <div className="flex items-center justify-center rounded-2xl border border-border bg-background p-12">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Loading content...
          </div>
        ) : null}

        {isAuthorized ? (
          <div className="space-y-8">
            <section className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold">Homepage sections</h2>
              <div className="mt-4 grid gap-4">
                {siteContent.map((item) => {
                  const itemId = item.id ?? "";
                  return (
                    <div key={itemId} className="rounded-2xl border border-border bg-background p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold">{getText(item.key)}</h3>
                        <button
                          onClick={() => saveItem("site-content", itemId, item)}
                          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                        >
                          {savingId === itemId ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                          Save
                        </button>
                      </div>
                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {renderTextField(
                          "Title",
                          getText(item.title),
                          (value) => updateField(setSiteContent, itemId, "title", value)
                        )}
                        {renderTextField(
                          "Eyebrow",
                          getText(item.eyebrow),
                          (value) => updateField(setSiteContent, itemId, "eyebrow", value)
                        )}
                        {renderTextField(
                          "Subtitle",
                          getText(item.subtitle),
                          (value) => updateField(setSiteContent, itemId, "subtitle", value),
                          true
                        )}
                        {renderTextField(
                          "Body",
                          getText(item.body),
                          (value) => updateField(setSiteContent, itemId, "body", value),
                          true
                        )}
                        {renderTextField(
                          "Image URL",
                          getText(item.imageUrl),
                          (value) => updateField(setSiteContent, itemId, "imageUrl", value)
                        )}
                        {renderTextField(
                          "CTA Label",
                          getText(item.ctaLabel),
                          (value) => updateField(setSiteContent, itemId, "ctaLabel", value)
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold">Navigation links</h2>
              <div className="mt-4 grid gap-4">
                {navLinks.map((item) => {
                  const itemId = item.id ?? "";
                  return (
                    <div key={itemId} className="rounded-2xl border border-border bg-background p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold">{getText(item.label)}</h3>
                        <button
                          onClick={() => saveItem("navigation", itemId, item)}
                          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                        >
                          {savingId === itemId ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                          Save
                        </button>
                      </div>
                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {renderTextField(
                          "Label",
                          getText(item.label),
                          (value) => updateField(setNavLinks, itemId, "label", value)
                        )}
                        {renderTextField(
                          "Href",
                          getText(item.href),
                          (value) => updateField(setNavLinks, itemId, "href", value)
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold">Projects</h2>
              <div className="mt-4 grid gap-4">
                {projects.map((item) => {
                  const itemId = item.id ?? "";
                  return (
                    <div key={itemId} className="rounded-2xl border border-border bg-background p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold">{getText(item.title)}</h3>
                        <button
                          onClick={() => saveItem("projects", itemId, item)}
                          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                        >
                          {savingId === itemId ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                          Save
                        </button>
                      </div>
                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {renderTextField(
                          "Title",
                          getText(item.title),
                          (value) => updateField(setProjects, itemId, "title", value)
                        )}
                        {renderTextField(
                          "Slug",
                          getText(item.slug),
                          (value) => updateField(setProjects, itemId, "slug", value)
                        )}
                        {renderTextField(
                          "Description",
                          getText(item.description),
                          (value) => updateField(setProjects, itemId, "description", value),
                          true
                        )}
                        {renderTextField(
                          "Long Description",
                          getText(item.longDescription),
                          (value) => updateField(setProjects, itemId, "longDescription", value),
                          true
                        )}
                        {renderTextField(
                          "Tags",
                          getStringArray(item.tags).join(", "),
                          (value) => updateField(setProjects, itemId, "tags", value.split(",").map((v) => v.trim()).filter(Boolean))
                        )}
                        {renderTextField(
                          "Image URL",
                          getText(item.imageUrl),
                          (value) => updateField(setProjects, itemId, "imageUrl", value)
                        )}
                        {renderTextField(
                          "Live URL",
                          getText(item.liveUrl),
                          (value) => updateField(setProjects, itemId, "liveUrl", value)
                        )}
                        {renderTextField(
                          "Repo URL",
                          getText(item.repoUrl),
                          (value) => updateField(setProjects, itemId, "repoUrl", value)
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold">Services</h2>
              <div className="mt-4 grid gap-4">
                {services.map((item) => {
                  const itemId = item.id ?? "";
                  return (
                    <div key={itemId} className="rounded-2xl border border-border bg-background p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold">{getText(item.title)}</h3>
                        <button
                          onClick={() => saveItem("services", itemId, item)}
                          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                        >
                          {savingId === itemId ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                          Save
                        </button>
                      </div>
                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {renderTextField(
                          "Title",
                          getText(item.title),
                          (value) => updateField(setServices, itemId, "title", value)
                        )}
                        {renderTextField(
                          "Slug",
                          getText(item.slug),
                          (value) => updateField(setServices, itemId, "slug", value)
                        )}
                        {renderTextField(
                          "Description",
                          getText(item.description),
                          (value) => updateField(setServices, itemId, "description", value),
                          true
                        )}
                        {renderTextField(
                          "Details",
                          getText(item.details),
                          (value) => updateField(setServices, itemId, "details", value),
                          true
                        )}
                        {renderTextField(
                          "Features",
                          getStringArray(item.features).join(", "),
                          (value) => updateField(setServices, itemId, "features", value.split(",").map((v) => v.trim()).filter(Boolean))
                        )}
                        {renderTextField(
                          "Icon Name",
                          getText(item.iconName),
                          (value) => updateField(setServices, itemId, "iconName", value)
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold">Skills</h2>
              <div className="mt-4 grid gap-4">
                {skills.map((item) => {
                  const itemId = item.id ?? "";
                  return (
                    <div key={itemId} className="rounded-2xl border border-border bg-background p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold">{getText(item.name)}</h3>
                        <button
                          onClick={() => saveItem("skills", itemId, item)}
                          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                        >
                          {savingId === itemId ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                          Save
                        </button>
                      </div>
                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {renderTextField(
                          "Name",
                          getText(item.name),
                          (value) => updateField(setSkills, itemId, "name", value)
                        )}
                        {renderTextField(
                          "Category",
                          getText(item.category),
                          (value) => updateField(setSkills, itemId, "category", value)
                        )}
                        {renderTextField(
                          "Description",
                          getText(item.description),
                          (value) => updateField(setSkills, itemId, "description", value),
                          true
                        )}
                        {renderTextField(
                          "Proficiency",
                          String(item.proficiency ?? ""),
                          (value) => updateField(setSkills, itemId, "proficiency", Number(value) || 0)
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold">Social links</h2>
              <div className="mt-4 grid gap-4">
                {socialLinks.map((item) => {
                  const itemId = item.id ?? "";
                  return (
                    <div key={itemId} className="rounded-2xl border border-border bg-background p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold">{getText(item.label)}</h3>
                        <button
                          onClick={() => saveItem("social-links", itemId, item)}
                          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                        >
                          {savingId === itemId ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                          Save
                        </button>
                      </div>
                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {renderTextField(
                          "Label",
                          getText(item.label),
                          (value) => updateField(setSocialLinks, itemId, "label", value)
                        )}
                        {renderTextField(
                          "URL",
                          getText(item.url),
                          (value) => updateField(setSocialLinks, itemId, "url", value)
                        )}
                        {renderTextField(
                          "Icon Name",
                          getText(item.iconName),
                          (value) => updateField(setSocialLinks, itemId, "iconName", value)
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold">Testimonials</h2>
              <div className="mt-4 grid gap-4">
                {testimonials.map((item) => {
                  const itemId = item.id ?? "";
                  return (
                    <div key={itemId} className="rounded-2xl border border-border bg-background p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold">{getText(item.name)}</h3>
                        <button
                          onClick={() => saveItem("testimonials", itemId, item)}
                          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                        >
                          {savingId === itemId ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                          Save
                        </button>
                      </div>
                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {renderTextField(
                          "Name",
                          getText(item.name),
                          (value) => updateField(setTestimonials, itemId, "name", value)
                        )}
                        {renderTextField(
                          "Role",
                          getText(item.role),
                          (value) => updateField(setTestimonials, itemId, "role", value)
                        )}
                        {renderTextField(
                          "Company",
                          getText(item.company),
                          (value) => updateField(setTestimonials, itemId, "company", value)
                        )}
                        {renderTextField(
                          "Quote",
                          getText(item.quote),
                          (value) => updateField(setTestimonials, itemId, "quote", value),
                          true
                        )}
                        {renderTextField(
                          "Avatar URL",
                          getText(item.avatarUrl),
                          (value) => updateField(setTestimonials, itemId, "avatarUrl", value)
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </main>
  );
}
