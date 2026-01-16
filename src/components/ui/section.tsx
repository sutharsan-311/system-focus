import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  noBorder?: boolean;
}

export function Section({ id, children, className, noBorder = false }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-24",
        !noBorder && "border-t border-border",
        className
      )}
    >
      <div className="container">{children}</div>
    </section>
  );
}
