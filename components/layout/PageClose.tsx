import { MeshBackdrop } from "@/components/motion/MeshBackdrop";
import { Button } from "@/components/ui/Button";

export function PageClose({
  title = "Let's Talk",
  lede = "Tell us what you need to ship. The form opens your email app and sends nothing to a FOXELYX server.",
  href = "/contact",
  action = "Start a project",
}: {
  title?: string;
  lede?: string;
  href?: string;
  action?: string;
}) {
  return (
    <section className="page-close" aria-labelledby="page-close-heading">
      <div className="container-page">
        <div className="page-close-card">
          <MeshBackdrop />
          <div className="page-close-copy">
            <p className="section-label">Next</p>
            <h2 id="page-close-heading">{title}</h2>
            <p>{lede}</p>
            <Button href={href} icon="play">
              {action}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
