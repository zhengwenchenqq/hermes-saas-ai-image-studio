import type { ReactNode } from "react";
export const metadata = {
  title: "AI Image Studio - Create Stunning Images with AI",
  description: "Generate beautiful artwork, illustrations and images using AI. Multiple styles, high resolution, instant results.",
  keywords: "AI image generator, AI art, image creation, digital art, AI illustration",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1" /></head><body style={{margin:0}}>{children}</body></html>);
}
