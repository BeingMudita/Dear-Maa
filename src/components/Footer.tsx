
import { Heart } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="py-10 px-4 border-t">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Heart className="h-5 w-5 mr-2 text-accent fill-accent" />
          <span className="font-playfair text-lg">Mother's Day Poem</span>
        </div>
        
        <div className="flex flex-col md:flex-row items-center text-sm text-muted-foreground">
          <p>Made with love for Mother's Day {year}</p>
          <span className="hidden md:inline mx-2">•</span>
          <p>Share your heartfelt poem with mom</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
