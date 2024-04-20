import Footer from "@/components/footer";
import About from "@/components/home/about";
import Carousel from "@/components/home/carousel";
import Featured from "@/components/home/featured";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-svh flex flex-col justify-between">
      <Navbar />
      
      {/* <Carousel /> */}
      <Featured />
      {/* <About /> */}

      <Footer />
    </div>
  );
}
