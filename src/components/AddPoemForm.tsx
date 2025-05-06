
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Flower, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

// This is just for frontend demo purposes
// Will be replaced with actual backend integration
const generatePoemFromInputs = (name: string, traits: string[]): string => {
  const templates = [
    `Dear ${name}, with heart so {trait1},\nYour love shines bright like the morning sun.\nWith {trait2} spirit and {trait3} ways,\nYou guide me through my darkest days.\nHappy Mother's Day to you,\nMy gratitude is forever true.`,
    
    `In your eyes, ${name}, I see {trait1} light,\nYour {trait2} love makes everything right.\n{trait3} in spirit, gentle in soul,\nYou make our family complete and whole.\nOn this special Mother's Day,\nThank you for being you in every way.`,
    
    `${name}, a mother {trait1} and wise,\nYour {trait2} heart is my greatest prize.\nWith {trait3} hands, you shaped my days,\nGuiding me along life's many ways.\nOn Mother's Day and every day after,\nYou fill my world with love and laughter.`
  ];

  const template = templates[Math.floor(Math.random() * templates.length)];
  let poem = template;

  // Replace trait placeholders with actual traits
  traits.forEach((trait, index) => {
    poem = poem.replace(`{trait${index + 1}}`, trait);
  });

  // Fill any remaining trait placeholders with the last trait
  for (let i = traits.length + 1; i <= 5; i++) {
    poem = poem.replace(`{trait${i}}`, traits[traits.length - 1] || "loving");
  }

  return poem;
};

const AddPoemForm = () => {
  const [name, setName] = useState("");
  const [traits, setTraits] = useState<string[]>(["", "", ""]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleTraitChange = (index: number, value: string) => {
    const newTraits = [...traits];
    newTraits[index] = value;
    setTraits(newTraits);
  };

  const handleAddTrait = () => {
    if (traits.length < 5) {
      setTraits([...traits, ""]);
    } else {
      toast({
        title: "Maximum traits reached",
        description: "You can only add up to 5 traits",
      });
    }
  };

  const handleRemoveTrait = (index: number) => {
    if (traits.length > 3) {
      const newTraits = traits.filter((_, i) => i !== index);
      setTraits(newTraits);
    } else {
      toast({
        title: "Minimum traits required",
        description: "Please provide at least 3 traits",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Name is required",
        description: "Please enter your mother's name",
        variant: "destructive",
      });
      return;
    }
    
    const filledTraits = traits.filter(trait => trait.trim() !== "");
    if (filledTraits.length < 3) {
      toast({
        title: "More traits needed",
        description: "Please enter at least 3 traits",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Generate poem locally
      const poem = generatePoemFromInputs(name, filledTraits);
      
      // Create poem data object
      const poemData = {
        name,
        traits: filledTraits,
        poem,
        createdAt: new Date().toISOString()
      };
      
      // Save to Firebase
      let poemId: string;
      
      // Create a unique ID
      const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
      
      // Try to save to Firebase first
      try {
        // Using the uniqueId as the document ID
        await setDoc(doc(db, "poems", uniqueId), poemData);
        poemId = uniqueId;
      } catch (firebaseError) {
        console.error("Firebase error:", firebaseError);
        
        // Fallback to localStorage if Firebase fails
        localStorage.setItem(uniqueId, JSON.stringify(poemData));
        poemId = uniqueId;
      }
      
      // Navigate to the poem display page
      navigate(`/poem/${poemId}`);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Unable to generate poem. Please try again.",
        variant: "destructive",
      });
      console.error("Error generating poem:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-lg">
          Mother's Name
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your mother's name"
          className="border-accent/50 focus:border-accent"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-lg">Mother's Traits (3-5)</Label>
        <p className="text-sm text-muted-foreground">
          Describe your mother with loving words (e.g., caring, wise, strong)
        </p>

        {traits.map((trait, index) => (
          <div key={index} className="flex gap-2 items-center">
            <Input
              value={trait}
              onChange={(e) => handleTraitChange(index, e.target.value)}
              placeholder={`Trait ${index + 1}`}
              className="border-accent/50 focus:border-accent"
            />
            {traits.length > 3 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleRemoveTrait(index)}
                className="flex-shrink-0"
              >
                &times;
              </Button>
            )}
          </div>
        ))}

        {traits.length < 5 && (
          <Button
            type="button"
            variant="outline"
            onClick={handleAddTrait}
            className="w-full border-dashed border-accent/50 hover:border-accent"
          >
            Add another trait
          </Button>
        )}
      </div>

      <Button
        type="submit"
        className="w-full py-6 text-lg group transition-all"
        disabled={isGenerating}
      >
        {isGenerating ? (
          <span className="flex items-center gap-2">
            <Sparkles className="animate-pulse" /> Creating poem...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Flower className="group-hover:rotate-12 transition-transform" /> Generate Poem
          </span>
        )}
      </Button>
    </form>
  );
};

export default AddPoemForm;