import { Metadata } from "next";

import Navbar from "@/components/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import SideBarMenu from "./components/SideBarMenu";

const data = {
  description:
    "Papermark is an open-source document infrastructure for sharing and collaboration. Free alternative to Docsend with custom domain. Manage secure document sharing with real-time analytics.",
  title: "Papermark | The Open Source DocSend Alternative",
  url: "/",
};

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000/"),
  title: data.title,
  description: data.description,
  openGraph: {
    title: data.title,
    description: data.description,
    url: data.url,
    siteName: "Papermark",
    images: [
      {
        url: "/_static/meta-image.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: data.title,
    description: data.description,
    creator: "@papermarkio",
    images: ["/_static/meta-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col m-0 p-0 min-h-full">
        <Navbar />
        <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="fixed top-14 z-30 h-[calc(100vh-4.5rem)] shrink-0 md:fixed">
            <ScrollArea className="h-full">
              <SideBarMenu />
            </ScrollArea>
          </aside>
          <div className="w-full ml-14">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}