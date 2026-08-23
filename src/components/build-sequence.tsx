import { BUILD_STEPS, type NodeId } from "@/lib/deck";
import { cn } from "@/lib/utils";

export function BuildSequence({
  selected,
  onSelect,
}: {
  selected: NodeId | null;
  onSelect: (id: NodeId | null) => void;
}) {
  return (
    <ol className="space-y-3">
      {BUILD_STEPS.map((step, i) => {
        const active = step.node !== null && step.node === selected;
        return (
          <li key={step.id}>
            <button
              type="button"
              onClick={() => onSelect(step.node)}
              className={cn(
                "flex w-full gap-4 rounded-md bg-surface p-4 text-left shadow-[var(--shadow-border)] transition-[box-shadow,background-color] duration-150",
                "hover:shadow-[var(--shadow-border-hover)]",
                active && "bg-elevated shadow-[var(--shadow-border-hover)]",
              )}
            >
              <span className="font-display text-2xl font-semibold tabular-nums text-subtle">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block font-display text-lg font-semibold tracking-wide text-fg">
                  {step.title}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">{step.body}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
