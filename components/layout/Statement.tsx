export function Statement({ text }: { text: string }) {
  return (
    <p className="scroll-copy" aria-label={text}>
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} data-color-word>
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
