import { useEffect, useMemo, useState } from "react";
import { Activity, Box, List, Shield, Workflow, X } from "lucide-react";
import { NODES, type NodeId } from "@/lib/deck";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SchematicSvg } from "@/components/schematic-svg";
import { Inspector } from "@/components/inspector";
import { CasePlan } from "@/components/case-plan";
import { BuildSequence } from "@/components/build-sequence";
import { PartsList } from "@/components/parts-list";
import { SafetyPanel } from "@/components/safety-panel";
import { WireLegend } from "@/components/wire-legend";
import { cn } from "@/lib/utils";

type Tab = "wiring" | "case" | "build" | "parts" | "safety";

const TABS: { id: Tab; label: string; icon: typeof Activity }[] = [
  { id: "wiring", label: "Wiring", icon: Activity },
  { id: "case", label: "Case", icon: Box },
  { id: "build", label: "Build", icon: Workflow },
  { id: "parts", label: "Parts", icon: List },
  { id: "safety", label: "Safety", icon: Shield },
];

function useMobile() {
  const [mobile, setMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return mobile;
}

export function DeckApp() {
  const [tab, setTab] = useState<Tab>("wiring");
  const [selected, setSelected] = useState<NodeId | null>(null);
  const [flow, setFlow] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const mobile = useMobile();

  const select = (id: NodeId | null) => {
    setSelected(id);
    if (id && mobile === true) setSheetOpen(true);
  };

  const title = useMemo(() => (selected ? NODES[selected].short : "Overview"), [selected]);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="no-print border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8 2xl:max-w-[96rem]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-subtle">
                Pelican 1500  ·  Grade 12 capstone  ·  20 Apr 2027
              </p>
              <h1 className="mt-1 font-display text-4xl font-semibold tracking-[0.12em] text-fg">
                FIELD DECK
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-muted">
                Pack → switch → fuse → buck → Pi. HDMI to the lid. USB through a self-powered hub.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-sm bg-elevated px-3 py-2 font-display text-xs uppercase tracking-[0.16em] text-muted shadow-[var(--shadow-border)]">
                15 W  ·  6–7 h  ·  18 AWG
              </span>
              <Button
                variant="secondary"
                size="sm"
                className="hidden sm:inline-flex"
                onClick={() => window.print()}
              >
                Print
              </Button>
            </div>
          </div>

          <nav className="flex flex-wrap gap-1" aria-label="Views">
            {TABS.map((item) => {
              const Icon = item.icon;
              const on = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={cn(
                    "inline-flex h-11 items-center gap-2 rounded-sm px-3.5 font-display text-sm font-semibold uppercase tracking-[0.14em] transition-[background-color,color] duration-150",
                    on ? "bg-accent text-accent-fg" : "text-muted hover:bg-elevated hover:text-fg",
                  )}
                  aria-current={on ? "page" : undefined}
                >
                  <Icon className="size-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl 2xl:max-w-[96rem]">
        <main className="min-w-0 px-4 py-5 sm:px-6 lg:px-8">
          {tab === "wiring" ? (
            <div className="space-y-4">
              <div className="no-print flex flex-wrap items-center justify-between gap-3">
                <WireLegend />
                <Button variant="ghost" size="sm" onClick={() => setFlow((v) => !v)}>
                  {flow ? "Pause flow" : "Trace flow"}
                </Button>
              </div>
              <div className="relative overflow-x-auto rounded-lg shadow-[var(--shadow-border)] md:overflow-x-visible">
                <SchematicSvg selected={selected} onSelect={select} flow={flow} />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-surface to-transparent md:hidden" />
              </div>
              <p className="no-print text-xs text-subtle">
                Scroll sideways on a phone. Tap a block for the harness notes.
              </p>
            </div>
          ) : null}

          {tab === "case" ? <CasePlan selected={selected} onSelect={select} /> : null}
          {tab === "build" ? <BuildSequence selected={selected} onSelect={select} /> : null}
          {tab === "parts" ? <PartsList selected={selected} onSelect={select} /> : null}
          {tab === "safety" ? <SafetyPanel /> : null}
        </main>
      </div>

      {selected && mobile === false ? (
        <aside className="no-print fixed inset-y-4 right-4 z-40 hidden w-80 overflow-hidden rounded-lg bg-surface shadow-[var(--shadow-border)] md:flex md:flex-col">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
              Inspector
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="size-10"
              onClick={() => setSelected(null)}
              aria-label="Close inspector"
            >
              <X className="size-4" />
            </Button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <Inspector selected={selected} />
          </div>
        </aside>
      ) : null}

      <Sheet open={mobile === true && sheetOpen && Boolean(selected)} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" title={title}>
          <Inspector selected={selected} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
