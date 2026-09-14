import { CASE_ZONES, type NodeId } from "@/lib/deck";
import { cn } from "@/lib/utils";

// Plan geometry comes from the same millimetre layout as the 3D view at
// /3d.html, so the two cannot drift. Interior 435 x 292.6 mm and depths of
// 109.2 / 45.5 are from Pelican drawings 1500-CASE-TOP and 1500-CASE-BOT.
// Scale is 1 px per mm.
const W = 435;
const H = 292.6;
const X0 = 130;
const LID_Y = 96;
const BASE_Y = 476;
const SHELL = 18; // outer shell drawn as an offset, not to scale
const DRAFT = 4; // 2 degrees over 109 mm of depth

type Spot = {
  id: NodeId;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  labelAbove?: boolean;
};

// px = X0 + (x_mm + 217.5)   |   py = BASE_Y + (z_mm + 146.3)
const BASE_SPOTS: Spot[] = [
  { id: "bag", x: 140, y: 488.8, w: 165, h: 47, label: "LIPO + BAG" },
  { id: "pi", x: 315, y: 494.3, w: 85, h: 56, label: "PI 5", sub: "+ cooler + NVMe HAT" },
  { id: "buck", x: 435, y: 479.8, w: 65, h: 45, label: "BUCK" },
  { id: "switch", x: 517.5, y: 476.3, w: 40, h: 22, label: "SW + FUSE", labelAbove: true },
  { id: "hub", x: 417.5, y: 539.8, w: 120, h: 45, label: "USB HUB" },
  { id: "keyboard", x: 170.5, y: 627.6, w: 354, h: 141, label: "K400 PARK" },
];

const LID_SPOTS: Spot[] = [
  { id: "display", x: 167.5, y: 127.3, w: 360, h: 230, label: "CROWVI 15.6 IN PANEL" },
];

// Five moulded bosses dimensioned on the Pelican lid drawing, offset from the
// interior corner. Verify against the physical case before drilling anything.
const BOSSES: [number, number][] = [
  [51.6, 27.4],
  [331.5, 27.4],
  [165.9, 118.9],
  [51.6, 237.5],
  [331.5, 237.5],
];

const dsp = (size: number, track = "0.12em") => ({
  fontFamily: "var(--font-display)",
  fontSize: size,
  letterSpacing: track,
});

const small = { fontFamily: "var(--font-sans)", fontSize: 10 } as const;

function Plan({
  y,
  title,
  depth,
  spots,
  selected,
  onSelect,
  showFloor,
  showBosses,
}: {
  y: number;
  title: string;
  depth: string;
  spots: Spot[];
  selected: NodeId | null;
  onSelect: (id: NodeId | null) => void;
  showFloor?: boolean;
  showBosses?: boolean;
}) {
  return (
    <g>
      <text
        x={X0 + W / 2}
        y={y - SHELL - 14}
        textAnchor="middle"
        className="fill-fg"
        style={dsp(13, "0.18em")}
      >
        {title} · {depth}
      </text>

      <rect
        x={X0 - SHELL}
        y={y - SHELL}
        width={W + SHELL * 2}
        height={H + SHELL * 2}
        rx={22}
        className="fill-elevated stroke-border"
        strokeWidth={2}
      />
      <rect x={X0} y={y} width={W} height={H} rx={10} className="fill-bg stroke-subtle" strokeWidth={1.4} />

      {showFloor && (
        <rect
          x={X0 + DRAFT}
          y={y + DRAFT}
          width={W - DRAFT * 2}
          height={H - DRAFT * 2}
          rx={8}
          fill="none"
          strokeDasharray="5 5"
          className="stroke-border"
          strokeWidth={1}
        />
      )}

      {showBosses &&
        BOSSES.map(([bx, bz], i) => (
          <g key={i}>
            <circle cx={X0 + bx} cy={y + bz} r={4} fill="none" className="stroke-ok" strokeWidth={1.2} />
            <circle cx={X0 + bx} cy={y + bz} r={1.4} className="fill-ok" />
          </g>
        ))}

      {spots.map((s) => {
        const on = selected === s.id;
        return (
          <g
            key={s.id}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(s.id);
            }}
          >
            <rect
              x={s.x}
              y={s.y}
              width={s.w}
              height={s.h}
              rx={7}
              className={cn(
                "fill-elevated stroke-border transition-[stroke,fill] duration-150",
                on && "fill-accent/15 stroke-accent",
              )}
              strokeWidth={on ? 2 : 1}
            />
            <text
              x={s.labelAbove ? s.x + s.w / 2 : s.x + 9}
              y={s.labelAbove ? s.y - 7 : s.y + 17}
              textAnchor={s.labelAbove ? "middle" : "start"}
              className={on ? "fill-accent" : "fill-muted"}
              style={dsp(11, "0.1em")}
            >
              {s.label}
            </text>
            {s.sub && (
              <text x={s.x} y={s.y + s.h + 13} className="fill-subtle" style={small}>
                {s.sub}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

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
          viewBox="0 0 700 830"
          className="h-auto w-full min-w-[26rem]"
          role="img"
          aria-label="Pelican 1500 lid and base plans, to scale. Click a zone."
          onClick={() => onSelect(null)}
        >
          <rect width="700" height="830" className="fill-surface" />

          <text x={22} y={26} className="fill-fg" style={dsp(13, "0.2em")}>
            PELICAN 1500 · INTERIOR PLANS · 1 px = 1 mm
          </text>
          <text x={22} y={42} className="fill-subtle" style={small}>
            Opening 435 × 292.6 mm. Wall thickness indicative, not to scale.
          </text>

          <Plan
            y={LID_Y}
            title="LID"
            depth="45.5 mm DEEP"
            spots={LID_SPOTS}
            selected={selected}
            onSelect={onSelect}
            showBosses
          />

          <Plan
            y={BASE_Y}
            title="BASE"
            depth="109.2 mm DEEP"
            spots={BASE_SPOTS}
            selected={selected}
            onSelect={onSelect}
            showFloor
          />

          <line x1={78} y1={LID_Y - 6} x2={X0 - SHELL} y2={LID_Y - 6} className="stroke-border" strokeWidth={1} />
          <text x={20} y={LID_Y - 9} className="fill-subtle" style={small}>
            OUTER SHELL
          </text>

          <line x1={92} y1={LID_Y + 46} x2={X0} y2={LID_Y + 46} className="stroke-border" strokeWidth={1} />
          <text x={20} y={LID_Y + 43} className="fill-subtle" style={small}>
            INNER WALL
          </text>

          <line x1={578} y1={LID_Y + 119} x2={604} y2={LID_Y + 119} className="stroke-ok" strokeWidth={1} />
          <text x={608} y={LID_Y + 116} className="fill-ok" style={small}>
            5× LID BOSS
          </text>
          <text x={608} y={LID_Y + 129} className="fill-subtle" style={small}>
            verify on case
          </text>

          <line x1={92} y1={BASE_Y + 70} x2={X0 + DRAFT} y2={BASE_Y + 70} className="stroke-border" strokeWidth={1} />
          <text x={20} y={BASE_Y + 60} className="fill-subtle" style={small}>
            FLOOR
          </text>
          <text x={20} y={BASE_Y + 73} className="fill-subtle" style={small}>
            2° draft
          </text>
          <text x={20} y={BASE_Y + 86} className="fill-subtle" style={small}>
            ≈427 × 285
          </text>

          <text x={X0 + W / 2} y={BASE_Y - SHELL - 6} textAnchor="middle" className="fill-subtle" style={dsp(10, "0.16em")}>
            HINGE EDGE
          </text>
          <text
            x={X0 + W / 2}
            y={BASE_Y + H + SHELL + 16}
            textAnchor="middle"
            className="fill-subtle"
            style={dsp(10, "0.16em")}
          >
            FRONT · LATCHES · HANDLE
          </text>

          <text x={315} y={571} className="fill-ok" style={dsp(10, "0.14em")}>
            ↑ FAN EXHAUST
          </text>
          <text x={315} y={585} className="fill-subtle" style={small}>
            Keep clear above the cooler.
          </text>
          <text x={315} y={599} className="fill-subtle" style={small}>
            Vent holes land in Fusion 360.
          </text>

          <text x={X0 + W / 2} y={806} textAnchor="middle" className="fill-subtle" style={small}>
            Keyboard takes the front 141 mm, leaving ~150 mm at the back for everything else.
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
