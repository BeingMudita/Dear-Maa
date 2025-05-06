
import { Heart } from "lucide-react";
import AddPoemForm from "@/components/AddPoemForm";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <div className="flex justify-center">
              <Heart className="h-12 w-12 text-accent fill-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-playfair text-primary">
              Mother's Day Poem Generator
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Create a heartfelt, personalized poem for your mom this Mother's Day
            </p>
          </div>

          <div className="bg-card rounded-lg shadow-lg border border-accent/10 p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center font-playfair">
              Create Your Poem
            </h2>
            <AddPoemForm />
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-medium mb-4 font-playfair">
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 rounded-lg bg-secondary/30">
                <div className="font-medium text-lg mb-2">1. Add Details</div>
                <p className="text-muted-foreground">
                  Enter your mom's name and her special traits
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30">
                <div className="font-medium text-lg mb-2">2. Generate</div>
                <p className="text-muted-foreground">
                  Our system creates a unique poem just for her
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30">
                <div className="font-medium text-lg mb-2">3. Share</div>
                <p className="text-muted-foreground">
                  Copy and share the poem or its unique link
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
