
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow">
        <Hero />
        <Timeline />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
