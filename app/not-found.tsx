import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <article className="page">
      <div className="container-page">
        <p className="wordmark" aria-hidden="true">
          404
        </p>
        <h1>This Page Is Not On The Site.</h1>
        <p className="lede">The link may be old, or the page has not been published yet.</p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 28 }}>
          <Button href="/">Home</Button>
          <Link href="/services" className="text-link">
            Services
          </Link>
          <Link href="/work" className="text-link">
            Work
          </Link>
        </div>
      </div>
    </article>
  );
}
