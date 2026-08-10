"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, ZoomIn } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { projects } from "@/lib/data";
import { portfolioContent } from "@/lib/site";
import { Project } from "@/types";
import { GithubIcon } from "@/components/brand-icons";

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export function PortfolioSection() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="py-24 relative overflow-hidden bg-background"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          id="portfolio-heading"
          title={portfolioContent.title}
          body={portfolioContent.body}
          className="mb-12"
        />

        {/* Filter Categories */}
        <ScrollReveal className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setFilter(cat)}
              variant={filter === cat ? "default" : "outline"}
              aria-pressed={filter === cat}
              className={`rounded-xl px-5 py-2 text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                filter === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "border-border hover:bg-accent/80 hover:text-accent-foreground"
              }`}
            >
              {cat}
            </Button>
          ))}
        </ScrollReveal>

        {/* Announce filter results to screen readers without a visual change */}
        <p aria-live="polite" className="sr-only">
          Showing {filteredProjects.length}{" "}
          {filteredProjects.length === 1 ? "project" : "projects"}
          {filter !== "All" && ` in ${filter}`}.
        </p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <ScrollReveal
              key={project.id}
              direction="up"
              delay={idx * 0.05}
              className="h-full"
            >
              <Card className="glass-panel border-border/80 h-full overflow-hidden flex flex-col justify-between group relative shadow-md transition-all duration-500 hover:shadow-xl hover:shadow-accent/10 has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50">
                <div className="space-y-4">
                  {/* Project Image Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center pointer-events-none"
                    >
                      <span className="w-10 h-10 rounded-full bg-background/95 backdrop-blur-sm flex items-center justify-center text-primary transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-md">
                        <ZoomIn className="h-5 w-5" />
                      </span>
                    </div>
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Text details */}
                  <div className="p-5 space-y-3">
                    <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md">
                      {project.category}
                    </span>
                    <h3 className="font-display text-lg tracking-tight text-foreground">
                      {/* The button is the only interactive element; `after` stretches
                          its hit area over the whole card so the card still feels
                          clickable without nesting controls. */}
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="text-left outline-none group-hover:text-primary transition-colors duration-200 after:absolute after:inset-0 after:content-[''] cursor-pointer"
                      >
                        {project.title}
                        <span className="sr-only"> — view project details</span>
                      </button>
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Tech Badges footer */}
                <ul className="px-5 pb-5 pt-3 border-t border-border/60 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <li
                      key={tech}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border"
                    >
                      {tech}
                    </li>
                  ))}
                  {project.techStack.length > 3 && (
                    <li className="text-[10px] font-semibold text-muted-foreground px-1 py-0.5">
                      +{project.techStack.length - 3} more
                    </li>
                  )}
                </ul>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* One dialog for the whole grid, driven by which card was clicked. */}
      <Dialog
        open={selectedProject !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
      >
        <DialogContent className="max-w-2xl border border-border bg-background/95 backdrop-blur-md rounded-2xl p-6 overflow-y-auto max-h-[90vh]">
          {selectedProject && (
            <>
              <DialogHeader className="mb-4">
                <DialogTitle className="font-display text-2xl tracking-tight text-foreground">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-primary text-xs font-semibold tracking-wider uppercase">
                  {selectedProject.category}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Enlarged image preview */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border shadow-md">
                  <Image
                    src={selectedProject.image}
                    alt={`${selectedProject.title} screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 672px"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-foreground">Overview</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-foreground">Tech Stack &amp; Tools</h4>
                  <ul className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <li
                        key={tech}
                        className="text-xs font-semibold px-3 py-1 rounded-xl bg-secondary text-secondary-foreground border border-border"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action links. The CV lists no public URLs for most of these,
                    so a link only renders when there is somewhere to go — an
                    <a href=""> would just reload the portfolio. */}
                {(selectedProject.liveUrl || selectedProject.githubUrl) && (
                  <div className="flex gap-4 pt-4 border-t border-border/80">
                    {/* nativeButton={false} because `render` swaps the <button>
                        for an <a> — Base UI needs to know to drop button-only
                        behaviour like the disabled attribute. */}
                    {selectedProject.liveUrl && (
                      <Button
                        nativeButton={false}
                        render={
                          <a
                            href={selectedProject.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                          />
                        }
                        className="flex-1 rounded-xl py-5 bg-primary text-primary-foreground hover:bg-accent/80"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                        <span className="sr-only"> (opens in a new tab)</span>
                      </Button>
                    )}
                    {selectedProject.githubUrl && (
                      <Button
                        variant="outline"
                        nativeButton={false}
                        render={
                          <a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                          />
                        }
                        className="flex-1 rounded-xl py-5 border-border hover:bg-accent/80 hover:text-accent-foreground backdrop-blur-sm"
                      >
                        <GithubIcon className="mr-2 h-4 w-4" />
                        Source Code
                        <span className="sr-only"> (opens in a new tab)</span>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
