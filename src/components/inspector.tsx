import { AlertTriangle, Cable, PlugZap, Shield } from "lucide-react";
import { NODES, WIRES, type NodeId } from "@/lib/deck";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cad } from "@/lib/utils";

const KIND_BADGE = {
  pos11: "pos",
  gnd: "gnd",
  v5: "v5",
  usb: "default",
  hdmi: "default",
  fan: "ok",
  optional: "warn",
} as const;

const STATUS_BADGE = {
  required: "ok",
  optional: "warn",
  deferred: "default",
} as const;

export function Inspector({ selected }: { selected: NodeId | null }) {
  if (!selected) {
    return (
      <div className="space-y-5 p-5">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-subtle">
          Inspector
        </p>
        <h2 className="font-display text-3xl font-semibold tracking-wide text-fg">Select a block</h2>
        <p className="text-sm leading-relaxed text-muted">
          Click any device on the schematic to see how it is wired, which gauge to use, and the
          mistakes that kill a Pi 5 or a 3S pack. The 11.1 V path reads left to right. USB hangs
          under the hub.
        </p>
        <Separator />
        <ul className="space-y-3 text-sm text-muted">
          <li>Red 18 AWG is switched, fused pack-positive.</li>
          <li>Black 18 AWG is unswitched ground.</li>
          <li>Sage is the 5.1 V rail after the buck.</li>
          <li>Dashed blocks are optional or deferred.</li>
        </ul>
      </div>
    );
  }

  const node = NODES[selected];
  const wires = WIRES.filter((w) => w.from === selected || w.to === selected);

  return (
    <div className="space-y-5 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={STATUS_BADGE[node.status]}>{node.status}</Badge>
        <Badge>{node.zone}</Badge>
        {node.price !== undefined ? <Badge variant="accent">{cad(node.price)}</Badge> : null}
      </div>
      <div>
        <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-subtle">
          {node.kicker}
        </p>
        <h2 className="mt-1 font-display text-3xl font-semibold tracking-wide text-fg">{node.name}</h2>
      </div>
      <p className="text-sm leading-relaxed text-muted">{node.summary}</p>

      {(node.voltage || node.current || node.connector) && (
        <dl className="grid grid-cols-1 gap-3 rounded-md bg-elevated p-4 text-sm shadow-[var(--shadow-border)]">
          {node.voltage ? (
            <div>
              <dt className="font-display text-[11px] uppercase tracking-[0.16em] text-subtle">Voltage</dt>
              <dd className="mt-1 text-fg">{node.voltage}</dd>
            </div>
          ) : null}
          {node.current ? (
            <div>
              <dt className="font-display text-[11px] uppercase tracking-[0.16em] text-subtle">Current</dt>
              <dd className="mt-1 text-fg">{node.current}</dd>
            </div>
          ) : null}
          {node.connector ? (
            <div>
              <dt className="font-display text-[11px] uppercase tracking-[0.16em] text-subtle">Connector</dt>
              <dd className="mt-1 text-fg">{node.connector}</dd>
            </div>
          ) : null}
        </dl>
      )}

      <section>
        <h3 className="mb-2 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.16em] text-fg">
          <Cable className="size-4 text-muted" />
          Harness
        </h3>
        <ul className="space-y-2">
          {node.wiring.map((line) => (
            <li key={line} className="text-sm leading-relaxed text-muted">
              {line}
            </li>
          ))}
        </ul>
      </section>

      {wires.length > 0 ? (
        <section>
          <h3 className="mb-2 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.16em] text-fg">
            <PlugZap className="size-4 text-muted" />
            Nets
          </h3>
          <ul className="space-y-2">
            {wires.map((w) => (
              <li key={w.id} className="flex flex-wrap items-baseline gap-2 text-sm">
                <Badge variant={KIND_BADGE[w.kind]}>{w.gauge}</Badge>
                <span className="text-fg">{w.label}</span>
                <span className="text-muted">{w.detail}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {node.warnings.length > 0 ? (
        <section className="rounded-md bg-danger/10 p-4">
          <h3 className="mb-2 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.16em] text-danger">
            <AlertTriangle className="size-4" />
            Watch
          </h3>
          <ul className="space-y-2">
            {node.warnings.map((line) => (
              <li key={line} className="text-sm leading-relaxed text-fg/90">
                {line}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {node.notes.length > 0 ? (
        <section>
          <h3 className="mb-2 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.16em] text-fg">
            <Shield className="size-4 text-muted" />
            Notes
          </h3>
          <ul className="space-y-2">
            {node.notes.map((line) => (
              <li key={line} className="text-sm leading-relaxed text-muted">
                {line}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
