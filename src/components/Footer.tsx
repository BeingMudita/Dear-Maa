
import { Heart } from "lucide-react";

const Footer = () => {
  
  return (
    <footer className="py-10 px-4 border-t">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Heart className="h-5 w-5 mr-2 text-accent fill-accent" />
          <span className="font-playfair text-lg">Created with love by BeingMudita</span>
        </div>
        
        <div className="flex flex-col md:flex-row items-center text-sm text-muted-foreground">
          <p>Share your heartfelt poem with mom</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
