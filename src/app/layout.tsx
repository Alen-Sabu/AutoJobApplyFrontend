import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "@/components/ScrollToTop";
import Aoscompo from "@/utils/aos";
import ConditionalSiteLayout from "@/components/Layout/ConditionalSiteLayout";
import ToasterContext from "@/app/api/contex/ToasetContex";

const font = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="system"
        >
          <Aoscompo>
            <ConditionalSiteLayout>{children}</ConditionalSiteLayout>
          </Aoscompo>
          <ScrollToTop />
          <ToasterContext />
        </ThemeProvider>
      </body>
    </html>
  );
}
