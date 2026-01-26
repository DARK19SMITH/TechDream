import type { Metadata } from "next";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";

export const metadata: Metadata = {
  title: "Tech Dream | Vente & Conseils Informatiques",
  description: "Tech Dream - Votre partenaire technologique pour des solutions informatiques innovantes. PC, laptops, gaming, conseils et services professionnels.",
  icons: {
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/36d710f0-fe77-426c-9d73-34029f901c05/td-2x-resized-1769430212111.webp?width=8000&height=8000&resize=contain",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
