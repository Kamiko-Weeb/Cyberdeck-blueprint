import { SAFETY_RULES } from "@/lib/deck";
import { AlertTriangle } from "lucide-react";

export function SafetyPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {SAFETY_RULES.map((rule) => (
        <article key={rule.title} className="rounded-lg bg-surface p-5 shadow-[var(--shadow-border)]">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold tracking-wide text-fg">
            <AlertTriangle className="size-4 text-danger" />
            {rule.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{rule.body}</p>
        </article>
      ))}
      <article className="rounded-lg bg-danger/10 p-5 md:col-span-2">
        <h3 className="font-display text-lg font-semibold tracking-wide text-danger">
          First power-on is a procedure, not a moment
        </h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-fg/90">
          <li>Switch off. Pi USB-C unplugged. Meter on buck VOUT.</li>
          <li>Mate EC5. Switch on. Confirm 5.10–5.15 V. Switch off.</li>
          <li>Land USB-C. Case open. Pack in the bag. Switch on.</li>
          <li>Confirm the hub enumerates, the panel lights, the cooler spins.</li>
          <li>If anything smells, sags below 5.0 V, or the SoC races past 85 °C — switch off.</li>
        </ol>
      </article>
    </div>
  );
}
