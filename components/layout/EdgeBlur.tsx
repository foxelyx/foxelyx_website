export function EdgeBlur({ side }: { side: "top" | "bottom" }) {
  return (
    <div className={`edge-blur edge-blur--${side}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <b />
    </div>
  );
}
