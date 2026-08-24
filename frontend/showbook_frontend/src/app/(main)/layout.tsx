import Navbar from "@/components/Navbar";
import Tags from "@/components/Tags";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Tags />
      {children}
    </>
  );
}