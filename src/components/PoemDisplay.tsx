
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PoemData {
  name: string;
  traits: string[];
  poem: string;
  createdAt: string;
}

const PoemDisplay = () => {
  const { id } = useParams<{ id: string }>();
  const [poemData, setPoemData] = useState<PoemData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const storedData = localStorage.getItem(id);
      
      if (storedData) {
        try {
          const parsedData: PoemData = JSON.parse(storedData);
          setPoemData(parsedData);
        } catch (error) {
          console.error("Error parsing poem data:", error);
        }
      }
      
      setLoading(false);
    }
  }, [id]);

  const copyPoemToClipboard = () => {
    if (poemData) {
      navigator.clipboard.writeText(poemData.poem);
      toast({
        title: "Copied to clipboard",
        description: "You can now paste the poem anywhere",
      });
    }
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Share this link with others to view this poem",
    });
  };

  if (loading) {
    return (
      <div className="max-w-lg mx-auto p-6">
        <Skeleton className="h-8 w-2/3 mb-4" />
        <Skeleton className="h-32 w-full mb-4" />
        <Skeleton className="h-8 w-1/2" />
      </div>
    );
  }

  if (!poemData) {
    return (
      <div className="max-w-lg mx-auto p-6 text-center space-y-4">
        <h2 className="text-2xl font-semibold text-primary">Poem Not Found</h2>
        <p className="text-muted-foreground">
          This poem may have been removed or the link is incorrect.
        </p>
        <Button onClick={() => window.location.href = "/"}>
          Create a New Poem
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <Card className="relative overflow-hidden bg-gradient-to-br from-secondary/30 to-background border-accent/20">
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <Heart className="h-32 w-32 fill-accent text-accent" />
        </div>
        
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center font-playfair text-primary">
              A Poem for {poemData.name}
            </h2>
            
            <div className="whitespace-pre-wrap font-playfair text-lg leading-relaxed py-4 px-2 text-center">
              {poemData.poem}
            </div>
            
            <div className="pt-2 text-sm text-center text-muted-foreground">
              Created with love for Mother's Day
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                variant="secondary" 
                className="flex-1"
                onClick={copyPoemToClipboard}
              >
                Copy Poem
              </Button>
              <Button 
                className="flex-1"
                onClick={copyLinkToClipboard}
              >
                Share Link
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PoemDisplay;
