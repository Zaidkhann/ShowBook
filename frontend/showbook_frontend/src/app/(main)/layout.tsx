import Navbar from "@/components/Navbar";
import Tags from "@/components/Tags";
import SearchNav from "@/components/SearchNav"
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}