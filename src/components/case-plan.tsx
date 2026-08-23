import { CASE_ZONES, type NodeId } from "@/lib/deck";
import { cn } from "@/lib/utils";

const HOTSPOTS: { id: NodeId; x: number; y: number; w: number; h: number; label: string }[] = [
  { id: "bag", x: 28, y: 118, w: 150, h: 210, label: "LIPO + BAG" },
  { id: "pi", x: 198, y: 128, w: 210, h: 168, label: "PI 5 + COOLER" },
  { id: "buck", x: 428, y: 118, w: 120, h: 90, label: "BUCK" },
  { id: "fuse", x: 560, y: 118, w: 70, h: 70, label: "FUSE" },
  { id: "hub", x: 428, y: 220, w: 202, h: 108, label: "HUB + SSD" },
  { id: "keyboard", x: 80, y: 348, w: 520, h: 70, label: "K400 PARK" },
  { id: "display", x: 120, y: 28, w: 460, h: 64, label: "LID · 10.1\" PANEL" },
  { id: "switch", x: 640, y: 200, w: 36, h: 70, label: "SW" },
];

export function CasePlan({
  selected,
  onSelect,
}: {
  selected: NodeId | null;
  onSelect: (id: NodeId | null) => void;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]">
      <div className="overflow-x-auto rounded-lg bg-surface p-3 shadow-[var(--shadow-border)] sm:p-5">
        <svg
          viewBox="0 0 700 460"
          className="h-auto w-full min-w-[28rem]"
          role="img"
          aria-label="Pelican 1500 interior layout. Click a zone."
          onClick={() => onSelect(null)}
        >
          <rect width="700" height="460" className="fill-surface" />
          <rect x="16" y="16" width="668" height="428" rx="28" className="fill-elevated stroke-border" strokeWidth={2} />
          <rect x="28" y="28" width="644" height="404" rx="18" className="fill-bg stroke-border" strokeWidth={1} />

          <text
            x={44}
            y={52}
            className="fill-subtle"
            style={{ fontFamily: "var(--font-display)", fontSize: 12, letterSpacing: "0.2em" }}
          >
            PELICAN 1500  ·  16.75" × 11.18" × 6.12"
          </text>

          {HOTSPOTS.map((h) => {
            const on = selected === h.id;
            return (
              <g
                key={h.id}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(h.id);
                }}
              >
                <rect
                  x={h.x}
                  y={h.y}
                  width={h.w}
                  height={h.h}
                  rx={10}
                  className={cn(
                    "stroke-border fill-elevated/80 transition-[stroke,fill] duration-150",
                    on && "fill-accent/15 stroke-accent",
                  )}
                  strokeWidth={on ? 2 : 1}
                />
                <text
                  x={h.x + 12}
                  y={h.y + 22}
                  className={on ? "fill-accent" : "fill-muted"}
                  style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.12em" }}
                >
                  {h.label}
                </text>
              </g>
            );
          })}

          <text
            x={44}
            y={108}
            className="fill-subtle"
            style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.18em" }}
          >
            LEFT
          </text>
          <text
            x={250}
            y={118}
            className="fill-subtle"
            style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.18em" }}
          >
            CENTER · AIRFLOW
          </text>
          <text
            x={448}
            y={108}
            className="fill-subtle"
            style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.18em" }}
          >
            RIGHT
          </text>

          <path d="M198 200 H198" />
          <text
            x={210}
            y={320}
            className="fill-ok"
            style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.14em" }}
          >
            INTAKE →
          </text>
          <text
            x={330}
            y={320}
            className="fill-ok"
            style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.14em" }}
          >
            ← EXHAUST
          </text>
          <text
            x={210}
            y={336}
            className="fill-subtle"
            style={{ fontFamily: "var(--font-sans)", fontSize: 10 }}
          >
            Exact vent holes land in Fusion 360. Do not skip them.
          </text>
        </svg>
      </div>

      <div className="space-y-3">
        {CASE_ZONES.map((z) => (
          <article key={z.id} className="rounded-md bg-surface p-4 shadow-[var(--shadow-border)]">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-fg">{z.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{z.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
