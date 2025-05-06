
import { Heart } from "lucide-react";
import PoemDisplay from "@/components/PoemDisplay";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Poem = () => {
  const { id } = useParams<{ id: string }>();

  // Set document title for better sharing
  useEffect(() => {
    document.title = "Mother's Day Poem | Made with Love";
    
    // You could also dynamically update meta tags here if you want
    // by getting the poem data and updating them
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border/40 py-4">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-primary font-playfair text-xl">
            <Heart className="h-5 w-5 text-accent fill-accent" />
            <span>Mother's Day Poem</span>
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link to="/">Create New Poem</Link>
          </Button>
        </div>
      </header>
      
      <main className="flex-grow px-4 py-12">
        <PoemDisplay />
      </main>
      
      <Footer />
    </div>
  );
};

export default Poem;