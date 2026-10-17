import { PROCESS_STEPS } from "@/data/process";
import { ProcessPin } from "@/components/motion/ProcessPin";

export function Process() {
  return (
    <section className="band" aria-labelledby="process-heading" id="process">
      <div className="container-page">
        <ProcessPin>
          <div className="section-heading process-heading">
            <h2 id="process-heading">How We Work</h2>
            <p className="section-label">Working process</p>
          </div>
          <ol className="process-grid">
            {PROCESS_STEPS.map((step, index) => (
              <li key={step.index} className="process-col" data-process-col={index}>
                {index % 2 === 0 ? (
                  <>
                    <StepCard step={step} />
                    <StepRender index={index} />
                  </>
                ) : (
                  <>
                    <StepRender index={index} />
                    <StepCard step={step} />
                  </>
                )}
              </li>
            ))}
          </ol>
        </ProcessPin>
      </div>
    </section>
  );
}

function StepCard({ step }: { step: (typeof PROCESS_STEPS)[number] }) {
  return (
    <article className="process-cell process-card" data-cell>
      <p className="process-step">(STEP - {step.index})</p>
      <div>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
      </div>
    </article>
  );
}

function StepRender({ index }: { index: number }) {
  return (
    <figure className={`process-cell process-img process-img--${index + 1}`} data-cell>
      <span aria-hidden="true" />
    </figure>
  );
}
