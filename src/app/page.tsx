import Footer from "@/components/footer";
import Carousel from "@/components/home/carousel";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-svh flex flex-col justify-between">
      <Navbar />
      
      <Carousel />

      <Footer />
    </div>
  );
}
