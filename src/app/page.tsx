import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-svh flex flex-col justify-between">
      <Navbar />

      <Footer />
    </div>
  );
}
