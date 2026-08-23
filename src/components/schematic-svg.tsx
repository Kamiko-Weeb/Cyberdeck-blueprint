import type { NodeId, WireKind } from "@/lib/deck";
import { relatedNodes } from "@/lib/deck";
import { cn } from "@/lib/utils";

type Props = {
  selected: NodeId | null;
  onSelect: (id: NodeId | null) => void;
  flow: boolean;
};

const KIND_CLASS: Record<WireKind, string> = {
  pos11: "stroke-wire-pos",
  gnd: "stroke-wire-gnd",
  v5: "stroke-wire-5v",
  usb: "stroke-wire-usb",
  hdmi: "stroke-wire-hdmi",
  fan: "stroke-wire-fan",
  optional: "stroke-wire-opt",
};

type WireDraw = {
  id: string;
  d: string;
  kind: WireKind;
  nodes: NodeId[];
  label?: { x: number; y: number; text: string };
  optional?: boolean;
};

const WIRES: WireDraw[] = [
  {
    id: "w-ec5",
    d: "M222 148 H248",
    kind: "pos11",
    nodes: ["lipo", "adapter"],
    label: { x: 235, y: 140, text: "EC5" },
  },
  {
    id: "w-xt60",
    d: "M342 148 H366",
    kind: "pos11",
    nodes: ["adapter", "switch"],
    label: { x: 354, y: 140, text: "XT60" },
  },
  {
    id: "w-sw-fuse",
    d: "M476 148 H500",
    kind: "pos11",
    nodes: ["switch", "fuse"],
  },
  {
    id: "w-fuse-buck",
    d: "M596 148 H620",
    kind: "pos11",
    nodes: ["fuse", "buck"],
    label: { x: 608, y: 140, text: "VIN+" },
  },
  {
    id: "w-gnd-pack",
    d: "M222 262 H620",
    kind: "gnd",
    nodes: ["lipo", "adapter", "buck"],
    label: { x: 420, y: 278, text: "18 AWG BLACK · UNSWITCHED" },
  },
  {
    id: "w-5v-pi",
    d: "M820 148 H858",
    kind: "v5",
    nodes: ["buck", "pi"],
    label: { x: 839, y: 140, text: "5.1 V" },
  },
  {
    id: "w-gnd-pi",
    d: "M820 262 H858",
    kind: "gnd",
    nodes: ["buck", "pi"],
  },
  {
    id: "w-5v-hub",
    d: "M820 200 H840 V422 H858",
    kind: "v5",
    nodes: ["buck", "hub"],
    label: { x: 792, y: 360, text: "HUB PWR" },
  },
  {
    id: "w-usb-up",
    d: "M978 300 V360",
    kind: "usb",
    nodes: ["pi", "hub"],
    label: { x: 1020, y: 332, text: "USB 3" },
  },
  {
    id: "w-hdmi",
    d: "M1098 118 H1138",
    kind: "hdmi",
    nodes: ["pi", "display"],
    label: { x: 1118, y: 110, text: "HDMI" },
  },
  {
    id: "w-usb-disp",
    d: "M1098 400 H1118 V228 H1270",
    kind: "usb",
    nodes: ["hub", "display"],
    label: { x: 1124, y: 250, text: "TOUCH" },
  },
  {
    id: "w-usb-ssd",
    d: "M1098 394 H1138",
    kind: "usb",
    nodes: ["hub", "ssd"],
  },
  {
    id: "w-usb-kbd",
    d: "M1098 478 H1138",
    kind: "usb",
    nodes: ["hub", "keyboard"],
  },
  {
    id: "w-usb-esp",
    d: "M1098 558 H1138",
    kind: "usb",
    nodes: ["hub", "esp32"],
    optional: true,
  },
  {
    id: "w-fan",
    d: "M978 64 V72",
    kind: "fan",
    nodes: ["cooler", "pi"],
  },
  {
    id: "w-xt60-future",
    d: "M421 104 V64",
    kind: "optional",
    nodes: ["adapter", "xt60panel", "switch"],
    optional: true,
    label: { x: 433, y: 86, text: "V1 OFF" },
  },
];

function Wire({
  wire,
  active,
  dim,
  flow,
}: {
  wire: WireDraw;
  active: boolean;
  dim: boolean;
  flow: boolean;
}) {
  return (
    <g className={cn("transition-opacity duration-150", dim && "opacity-20")}>
      <path d={wire.d} className="fill-none stroke-bg" strokeWidth={7} strokeLinejoin="round" strokeLinecap="round" />
      <path
        d={wire.d}
        className={cn(
          "fill-none",
          KIND_CLASS[wire.kind],
          wire.optional && "schematic-optional",
          flow && active && "wire-flow",
        )}
        strokeWidth={active ? 3.2 : 2.2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {wire.label ? (
        <text
          x={wire.label.x}
          y={wire.label.y}
          textAnchor="middle"
          className="fill-subtle"
          style={{ fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "0.12em" }}
        >
          {wire.label.text}
        </text>
      ) : null}
    </g>
  );
}

function Junction({ x, y, dim }: { x: number; y: number; dim: boolean }) {
  return (
    <circle
      cx={x}
      cy={y}
      r={3.4}
      className={cn("fill-fg stroke-bg transition-opacity duration-150", dim && "opacity-20")}
      strokeWidth={1.5}
    />
  );
}

function Device({
  id,
  x,
  y,
  w,
  h,
  kicker,
  title,
  lines,
  selected,
  related,
  optional,
  onSelect,
}: {
  id: NodeId;
  x: number;
  y: number;
  w: number;
  h: number;
  kicker: string;
  title: string;
  lines?: string[];
  selected: NodeId | null;
  related: Set<NodeId>;
  optional?: boolean;
  onSelect: (id: NodeId) => void;
}) {
  const isSel = selected === id;
  const dim = Boolean(selected && !related.has(id));
  return (
    <g
      transform={`translate(${x} ${y})`}
      className={cn("cursor-pointer transition-opacity duration-150", dim && "opacity-25")}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onMouseDown={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(id);
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={isSel}
      aria-label={title}
    >
      <rect
        width={w}
        height={h}
        rx={10}
        className={cn(
          "fill-elevated stroke-fg/20 transition-[stroke,fill] duration-150",
          isSel && "fill-surface stroke-accent",
          optional && "schematic-optional",
        )}
        strokeWidth={isSel ? 2 : 1}
      />
      <text
        x={14}
        y={22}
        className="fill-subtle"
        style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.16em" }}
      >
        {kicker}
      </text>
      <text
        x={14}
        y={44}
        className="fill-fg"
        style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, letterSpacing: "0.04em" }}
      >
        {title}
      </text>
      {lines?.map((line, i) => (
        <text
          key={line}
          x={14}
          y={66 + i * 16}
          className="fill-muted"
          style={{ fontFamily: "var(--font-sans)", fontSize: 11 }}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export function SchematicSvg({ selected, onSelect, flow }: Props) {
  const related = relatedNodes(selected);

  return (
    <svg
      viewBox="0 0 1440 780"
      className="block h-auto w-full min-w-[56rem] select-none md:min-w-0"
      preserveAspectRatio="xMidYMin meet"
      role="img"
      aria-label="FIELD DECK wiring schematic. Click a block for details."
      onClick={() => onSelect(null)}
    >
      <rect width="1440" height="780" className="fill-surface" />
      <defs>
        <pattern id="sch-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" className="fill-fg/10" />
        </pattern>
      </defs>
      <rect width="1440" height="780" fill="url(#sch-grid)" />

      <text
        x={36}
        y={48}
        className="fill-subtle"
        style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.22em" }}
      >
        11.1 V PACK  ·  SWITCHED POSITIVE  ·  18 AWG
      </text>
      <text
        x={860}
        y={18}
        className="fill-subtle"
        style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.22em" }}
      >
        5.1 V RAIL  ·  COMPUTE  ·  LID I/O
      </text>
      <text
        x={860}
        y={348}
        className="fill-subtle"
        style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.22em" }}
      >
        USB MAP  ·  HUB IS SELF-POWERED
      </text>

      {WIRES.map((wire) => {
        const lit = !selected || wire.nodes.includes(selected);
        return <Wire key={wire.id} wire={wire} active={lit} dim={Boolean(selected) && !lit} flow={flow} />;
      })}

      <Junction x={222} y={148} dim={Boolean(selected && !related.has("lipo"))} />
      <Junction x={222} y={262} dim={Boolean(selected && !related.has("lipo"))} />
      <Junction x={620} y={148} dim={Boolean(selected && !related.has("buck"))} />
      <Junction x={620} y={262} dim={Boolean(selected && !related.has("buck"))} />
      <Junction x={820} y={148} dim={Boolean(selected && !related.has("buck"))} />
      <Junction x={820} y={200} dim={Boolean(selected && !related.has("buck"))} />
      <Junction x={820} y={262} dim={Boolean(selected && !related.has("buck"))} />
      <Junction x={1098} y={400} dim={Boolean(selected && !related.has("hub"))} />

      <Device
        id="xt60panel"
        x={366}
        y={22}
        w={110}
        h={42}
        kicker="Deferred"
        title="XT60 PORT"
        selected={selected}
        related={related}
        optional
        onSelect={onSelect}
      />
      <Device
        id="cooler"
        x={910}
        y={22}
        w={136}
        h={42}
        kicker="Required"
        title="ACTIVE COOLER"
        selected={selected}
        related={related}
        onSelect={onSelect}
      />

      <Device
        id="lipo"
        x={36}
        y={90}
        w={186}
        h={200}
        kicker="Energy · left zone"
        title="VENOM 3S"
        lines={["11.1 V  ·  10 500 mAh", "50C  ·  ~116 Wh", "EC5 on pack", "Bag in left bay"]}
        selected={selected}
        related={related}
        onSelect={onSelect}
      />
      <Device
        id="adapter"
        x={248}
        y={118}
        w={94}
        h={60}
        kicker="Adapt"
        title="EC5→XT60"
        selected={selected}
        related={related}
        onSelect={onSelect}
      />
      <Device
        id="switch"
        x={366}
        y={104}
        w={110}
        h={88}
        kicker="Panel SPST"
        title="MASTER"
        lines={["Positive only"]}
        selected={selected}
        related={related}
        onSelect={onSelect}
      />
      <Device
        id="fuse"
        x={500}
        y={118}
        w={96}
        h={60}
        kicker="ATC"
        title="7.5 A"
        selected={selected}
        related={related}
        onSelect={onSelect}
      />
      <Device
        id="buck"
        x={620}
        y={90}
        w={200}
        h={200}
        kicker="DROK buck"
        title="5.1 V  5 A"
        lines={["IN  9–36 V", "OUT  set 5.10 V", "Screw terminals", "Not the QC USB jack"]}
        selected={selected}
        related={related}
        onSelect={onSelect}
      />
      <Device
        id="pi"
        x={858}
        y={72}
        w={240}
        h={228}
        kicker="Compute · center"
        title="PI 5  8 GB"
        lines={["USB-C power  5.1 V", "micro-HDMI 0  → lid", "USB 3  → hub", "M2.5 mounts  ·  J16 fan"]}
        selected={selected}
        related={related}
        onSelect={onSelect}
      />
      <Device
        id="display"
        x={1138}
        y={72}
        w={266}
        h={148}
        kicker="Lid mount"
        title="ELECROW 10.1"
        lines={["1280 × 800 IPS", "HDMI in  ·  USB touch"]}
        selected={selected}
        related={related}
        onSelect={onSelect}
      />
      <Device
        id="sd"
        x={858}
        y={308}
        w={110}
        h={40}
        kicker="OS card"
        title="microSD"
        selected={selected}
        related={related}
        onSelect={onSelect}
      />

      <Device
        id="bag"
        x={36}
        y={308}
        w={186}
        h={44}
        kicker="Fire"
        title="LIPO SAFE BAG"
        selected={selected}
        related={related}
        onSelect={onSelect}
      />
      <Device
        id="charger"
        x={36}
        y={368}
        w={186}
        h={88}
        kicker="Charge path"
        title="iMAX B6"
        lines={["Unplug EC5 first", "Never in a closed case"]}
        selected={selected}
        related={related}
        onSelect={onSelect}
      />

      <Device
        id="hub"
        x={858}
        y={360}
        w={240}
        h={120}
        kicker="Right zone"
        title="UGREEN HUB"
        lines={["5× A  +  2× C", "Powered from buck 5.1 V"]}
        selected={selected}
        related={related}
        onSelect={onSelect}
      />
      <Device
        id="ssd"
        x={1138}
        y={360}
        w={266}
        h={68}
        kicker="Data store"
        title="CRUCIAL X9  1 TB"
        lines={["USB 3.2  ·  not the microSD"]}
        selected={selected}
        related={related}
        onSelect={onSelect}
      />
      <Device
        id="keyboard"
        x={1138}
        y={444}
        w={266}
        h={68}
        kicker="Input"
        title="K400 PLUS"
        lines={["Dongle in hub  ·  body parks in base"]}
        selected={selected}
        related={related}
        onSelect={onSelect}
      />
      <Device
        id="esp32"
        x={1138}
        y={528}
        w={266}
        h={60}
        kicker="Optional v1"
        title="ESP32 MARAUDER"
        lines={["USB only  ·  not integrated"]}
        selected={selected}
        related={related}
        optional
        onSelect={onSelect}
      />

      <g transform="translate(36 640)">
        <rect width="420" height="112" rx="10" className="fill-elevated stroke-border" strokeWidth={1} />
        <text
          x={16}
          y={28}
          className="fill-subtle"
          style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.2em" }}
        >
          TITLE BLOCK
        </text>
        <text
          x={16}
          y={56}
          className="fill-fg"
          style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 600, letterSpacing: "0.08em" }}
        >
          FIELD DECK
        </text>
        <text x={16} y={78} className="fill-muted" style={{ fontFamily: "var(--font-sans)", fontSize: 12 }}>
          DWG 1500-PWR-001  ·  REV A  ·  PELICAN 1500
        </text>
        <text x={16} y={96} className="fill-subtle" style={{ fontFamily: "var(--font-sans)", fontSize: 11 }}>
          Grade 12 capstone  ·  live demo 20 Apr 2027  ·  ~$1,242 CAD
        </text>
      </g>

      <g transform="translate(480 640)">
        <rect width="340" height="112" rx="10" className="fill-elevated stroke-border" strokeWidth={1} />
        <text
          x={16}
          y={28}
          className="fill-subtle"
          style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.2em" }}
        >
          CIRCUIT ORDER
        </text>
        <text x={16} y={54} className="fill-fg" style={{ fontFamily: "var(--font-sans)", fontSize: 13 }}>
          Pack → toggle → 7.5 A ATC → buck → Pi
        </text>
        <text x={16} y={76} className="fill-muted" style={{ fontFamily: "var(--font-sans)", fontSize: 12 }}>
          Ground is continuous. Heat-shrink every joint.
        </text>
        <text x={16} y={96} className="fill-muted" style={{ fontFamily: "var(--font-sans)", fontSize: 12 }}>
          Set 5.10 V with a meter before the Pi lands.
        </text>
      </g>
    </svg>
  );
}
