
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";
import { Calendar, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface Memory {
  id: string;
  date: string;
  title: string;
  description: string;
  location?: string;
  imageUrl: string;
}

interface MemoryCardProps {
  memory: Memory;
  index: number;
  isSelected?: boolean;
  onSelect?: () => void;
}

const MemoryCard = ({ memory, index, isSelected, onSelect }: MemoryCardProps) => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
  const isEven = index % 2 === 0;
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      ref={ref}
      className={cn(
        "relative flex my-16 w-full",
        isEven ? "justify-start md:justify-end" : "justify-end md:justify-start",
        inView ? (isEven ? "slide-in-left" : "slide-in-right") : "opacity-0",
      )}
    >
      {/* Timeline dot */}
      <div className="timeline-dot" />
      
      <div 
        className={cn(
          "w-full md:w-5/12 rounded-xl overflow-hidden shadow-lg transition-all",
          isSelected 
            ? "ring-4 ring-primary scale-[1.02]" 
            : "hover:shadow-xl hover:-translate-y-1",
          "cursor-pointer"
        )}
        onClick={onSelect}
      >
        {/* Memory Card Content */}
        <div className="relative h-56 overflow-hidden bg-muted">
          {!imageError ? (
            <img 
              src={memory.imageUrl} 
              alt={memory.title} 
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
              <Image className="h-12 w-12 mb-2 opacity-40" />
              <p>Image not available</p>
            </div>
          )}
        </div>
        
        <div className="p-6 memory-gradient">
          <div className="flex items-center mb-3 text-sm text-primary">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{memory.date}</span>
            {memory.location && (
              <span className="ml-2 text-muted-foreground">· {memory.location}</span>
            )}
          </div>
          
          <h3 className="text-xl font-bold mb-2">{memory.title}</h3>
          <p className="text-gray-600 mb-4">{memory.description}</p>
          
          <Button 
            variant="outline" 
            size="sm"
            className="text-primary border-primary/30 hover:bg-primary/5" 
            onClick={(e) => {
              e.stopPropagation();
              // You can add functionality here to show a detailed view
            }}
          >
            Remember This
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
