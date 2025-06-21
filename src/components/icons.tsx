import type { SVGProps } from "react";

export function WheelieLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a10 10 0 1 0 10 10" />
      <path d="M12 12l6 6" />
      <path d="M12 20a8 8 0 0 0 8-8" />
      <circle cx="12" cy="12" r="2" />
      <path d="m18 12-4-4" />
    </svg>
  );
}
