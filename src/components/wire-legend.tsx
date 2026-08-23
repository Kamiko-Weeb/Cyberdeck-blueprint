import { WIRE_LEGEND, type WireKind } from "@/lib/deck";
import { cn } from "@/lib/utils";

const DOT: Record<WireKind, string> = {
  pos11: "bg-wire-pos",
  gnd: "bg-wire-gnd",
  v5: "bg-wire-5v",
  usb: "bg-wire-usb",
  hdmi: "bg-wire-hdmi",
  fan: "bg-wire-fan",
  optional: "bg-wire-opt",
};

export function WireLegend() {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-2">
      {WIRE_LEGEND.map((item) => (
        <li key={item.kind} className="flex items-center gap-2 text-xs text-muted">
          <span className={cn("size-2 rounded-full", DOT[item.kind])} />
          <span className="font-display uppercase tracking-[0.12em] text-fg">{item.label}</span>
          <span className="hidden sm:inline">{item.hint}</span>
        </li>
      ))}
    </ul>
  );
}
