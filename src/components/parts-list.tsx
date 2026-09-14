import { BOM, BOM_TOTAL, POWER_BUDGET, type NodeId } from "@/lib/deck";
import { Badge } from "@/components/ui/badge";
import { cad, cn } from "@/lib/utils";

const CATEGORY: Record<string, string> = {
  enclosure: "Enclosure",
  compute: "Compute",
  power: "Power",
  io: "I/O",
  wiring: "Wiring",
  hardware: "Hardware",
  optional: "Optional",
};

export function PartsList({
  selected,
  onSelect,
}: {
  selected: NodeId | null;
  onSelect: (id: NodeId | null) => void;
}) {
  return (
    <div className="space-y-8">
      <section className="rounded-lg bg-surface p-5 shadow-[var(--shadow-border)]">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-subtle">
          Power budget · 15 W design load
        </p>
        <div className="mt-4 space-y-3">
          {POWER_BUDGET.map((row) => (
            <div key={row.id}>
              <div className="mb-1 flex items-baseline justify-between text-sm">
                <span className="text-fg">{row.name}</span>
                <span className="tabular-nums text-muted">{row.watts} W</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-elevated">
                <div
                  className="h-full rounded-full bg-ok"
                  style={{ width: `${Math.round(row.share * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">
          Pack energy 116.5 Wh. At 15 W and ~90% buck efficiency that is about 7 hours; 80% usable
          LiPo capacity lands on roughly 4–5 hours with the 15.6-inch panel.
        </p>
      </section>

      <div className="overflow-x-auto rounded-lg bg-surface shadow-[var(--shadow-border)]">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 font-display text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                Part
              </th>
              <th className="px-4 py-3 font-display text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                Group
              </th>
              <th className="px-4 py-3 font-display text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                Spec
              </th>
              <th className="px-4 py-3 text-right font-display text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                CAD
              </th>
            </tr>
          </thead>
          <tbody>
            {BOM.map((item) => {
              const active = item.node && item.node === selected;
              const clickable = Boolean(item.node);
              return (
                <tr
                  key={item.id}
                  className={cn(
                    "border-b border-border/80 last:border-0",
                    clickable && "cursor-pointer hover:bg-elevated",
                    active && "bg-elevated",
                  )}
                  onClick={() => onSelect(item.node ?? null)}
                >
                  <td className="px-4 py-3 align-top">
                    <div className="text-fg">{item.name}</div>
                    <div className="mt-1 text-xs leading-relaxed text-muted">{item.note}</div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <Badge>{CATEGORY[item.category]}</Badge>
                  </td>
                  <td className="px-4 py-3 align-top text-muted">{item.spec}</td>
                  <td className="px-4 py-3 align-top text-right tabular-nums text-fg">{cad(item.price)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className="px-4 py-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-fg" colSpan={3}>
                Sheet total
              </td>
              <td className="px-4 py-4 text-right font-display text-lg font-semibold tabular-nums text-fg">
                {cad(BOM_TOTAL)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
