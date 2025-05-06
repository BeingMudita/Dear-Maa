
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const Hero = () => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  
  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      <div 
        ref={ref}
        className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-primary">
          Mom & Me Memories
        </h1>
        
        <p className="text-lg md:text-xl mb-6 text-muted-foreground font-light">
          A beautiful timeline of precious moments shared with the woman who means everything.
        </p>
        
        <div className="inline-flex items-center justify-center gap-2 mb-8 text-accent">
          <Heart className="h-5 w-5 fill-accent stroke-accent animate-pulse" />
          <span className="font-playfair italic">Every memory tells our story</span>
          <Heart className="h-5 w-5 fill-accent stroke-accent animate-pulse" />
        </div>
        
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-white font-medium"
          onClick={() => {
            const timelineElement = document.getElementById('timeline');
            if (timelineElement) {
              timelineElement.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          View Our Journey
        </Button>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-10" />
      
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/40 rounded-full blur-3xl" />
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
    </div>
  );
};

export default Hero;
