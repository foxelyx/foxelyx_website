"use client";

import { FormEvent, useEffect, useState } from "react";
import { PRODUCTS } from "@/data/products";
import { SERVICES, type ServiceId } from "@/data/services";
import { SITE_EMAIL } from "@/data/site";

const COUNTRIES = [
  { value: "IN", label: "India" },
  { value: "AE", label: "Dubai" },
  { value: "OM", label: "Muscat" },
  { value: "QA", label: "Doha" },
  { value: "GB", label: "United Kingdom" },
  { value: "IE", label: "Ireland" },
  { value: "OTHER", label: "Somewhere else" },
] as const;

export type ContactCountry = (typeof COUNTRIES)[number]["value"];

const SERVICE_IDS = new Set(SERVICES.map((service) => service.id));
const PRODUCT_NAMES = new Set(PRODUCTS.map((product) => product.name));

type ContactFormProps = {
  defaultCountry?: ContactCountry;
};

export function ContactForm({ defaultCountry = "IN" }: ContactFormProps) {
  const [service, setService] = useState<ServiceId | "">("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("service");
    if (requested && SERVICE_IDS.has(requested as ServiceId)) {
      setService(requested as ServiceId);
    }
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (String(form.get("company_url_confirm") ?? "").length > 0) {
      setSent(true);
      return;
    }

    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const company = String(form.get("company") ?? "").trim();
    const chosenService = String(form.get("service") ?? "");
    const product = String(form.get("product") ?? "");
    const country = String(form.get("country") ?? "");
    const message = String(form.get("message") ?? "").trim();

    if (name.length < 2) return setError("Add your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Add a valid email.");
    if (!SERVICE_IDS.has(chosenService as ServiceId)) return setError("Choose a service.");
    if (!country) return setError("Choose a country.");
    if (message.length < 10) return setError("Add a short note about the project.");
    if (form.get("consent") !== "on") return setError("Consent is required before we can reply.");

    const serviceTitle =
      SERVICES.find((item) => item.id === chosenService)?.title ?? chosenService;
    const countryLabel = COUNTRIES.find((item) => item.value === country)?.label ?? country;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : "",
      company ? `Company: ${company}` : "",
      `Service: ${serviceTitle}`,
      product && PRODUCT_NAMES.has(product) ? `Product: ${product}` : "",
      `Country: ${countryLabel}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(
      `Project enquiry: ${serviceTitle}`,
    )}&body=${encodeURIComponent(body)}`;
    setError("");
    setSent(true);
  }

  if (sent) {
    return (
      <p role="status">
        Your email app should open with this message addressed to {SITE_EMAIL}. If it does not, email
        us directly and include the service you need.
      </p>
    );
  }

  return (
    <form className="form-grid" onSubmit={onSubmit} noValidate>
      <label>
        Name
        <input name="name" autoComplete="name" required />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Phone <span style={{ fontWeight: 500, color: "var(--ink-3)" }}>(optional)</span>
        <input name="phone" type="tel" autoComplete="tel" />
      </label>
      <label>
        Company <span style={{ fontWeight: 500, color: "var(--ink-3)" }}>(optional)</span>
        <input name="company" autoComplete="organization" />
      </label>
      <label>
        Service
        <select
          name="service"
          value={service}
          onChange={(event) => setService(event.target.value as ServiceId | "")}
          required
        >
          <option value="">Select a service</option>
          {SERVICES.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </label>
      <label>
        Country
        <select name="country" defaultValue={defaultCountry} required>
          {COUNTRIES.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Product <span style={{ fontWeight: 500, color: "var(--ink-3)" }}>(optional)</span>
        <select name="product" defaultValue="">
          <option value="">No product</option>
          {PRODUCTS.map((product) => (
            <option key={product.name} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Message
        <textarea name="message" rows={5} required />
      </label>
      <label className="check">
        <input name="consent" type="checkbox" value="on" required />
        <span>I agree that FOXELYX can email me about this enquiry.</span>
      </label>
      <div className="hp" aria-hidden="true">
        <label>
          Company URL
          <input name="company_url_confirm" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {error ? (
        <p className="error" role="alert">
          {error}
        </p>
      ) : null}
      <button className="btn-primary full" type="submit">
        Send message
      </button>
    </form>
  );
}
