export type Job = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Internship";
  description: string;
};

/** Open roles published on foxelyx.com/careers. */
export const JOBS: Job[] = [
  {
    slug: "graphic-design-intern",
    title: "Graphic Design Intern",
    department: "Creative",
    location: "Kerala (hybrid)",
    type: "Internship",
    description:
      "Support brand identities, campaign creatives, and product UI for software and marketing clients. Ideal if you are fluent in Figma or Adobe CC and want portfolio-ready work with feedback from senior designers.",
  },
  {
    slug: "digital-marketing-intern",
    title: "Digital Marketing Intern",
    department: "Growth",
    location: "Kerala (hybrid)",
    type: "Internship",
    description:
      "Assist with Meta and Google campaigns, SEO support, and reporting. Great if you care about analytics, ad copy, and how local brands show up on search and social.",
  },
  {
    slug: "content-writer-intern",
    title: "Content Writer Intern",
    department: "Content",
    location: "Kerala (hybrid)",
    type: "Internship",
    description:
      "Draft web copy, social captions, and long-form pieces for FOXELYX and client brands. We want clear English (and comfort with Malayalam context a plus) and a willingness to revise to brand voice.",
  },
];

export function getJob(slug: string) {
  return JOBS.find((job) => job.slug === slug);
}
