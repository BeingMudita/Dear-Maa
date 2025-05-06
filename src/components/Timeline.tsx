import { useState } from "react";
import MemoryCard, { Memory } from "@/components/MemoryCard";
import { useInView } from "@/hooks/use-in-view";
import { Button } from "@/components/ui/button";

// Sample memories data
const memoriesData: Memory[] = [
  {
    id: "1",
    date: "May 10, 1995",
    title: "First Day of School",
    description: "Mom braided my hair and packed my favorite lunch. She whispered 'You'll do great' as she waved goodbye.",
    location: "Elementary School",
    imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    date: "December 24, 2001",
    title: "Christmas Eve Baking",
    description: "We stayed up all night baking cookies for Santa. Mom let me lick the spoon and taught me her secret recipe.",
    location: "Home Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    date: "July 15, 2010",
    title: "Road Trip Adventure",
    description: "Mom surprised me with tickets to the concert I'd been dreaming of. We sang at the top of our lungs the whole drive there.",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    date: "September 3, 2018",
    title: "Hospital Vigil",
    description: "When I was sick, mom didn't leave my side for three days straight. She read me my favorite childhood books until I fell asleep.",
    location: "City Hospital",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  }
];

const Timeline = () => {
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
  
  return (
    <section id="timeline" className="py-20 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey Together</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every moment with you has been a blessing. Here are just a few of the memories
            that have shaped our beautiful relationship.
          </p>
        </div>
        
        {/* Timeline container with center line */}
        <div className="relative">
          {/* Center timeline line */}
          <div className="timeline-line"></div>
          
          {/* Memory cards */}
          {memoriesData.map((memory, index) => (
            <MemoryCard 
              key={memory.id} 
              memory={memory} 
              index={index}
              isSelected={selectedMemory === memory.id}
              onSelect={() => setSelectedMemory(memory.id)}
            />
          ))}
        </div>
        
        <div className="text-center mt-20">
          <p className="text-muted-foreground mb-4 italic">
            These are just a few of our many treasured memories...
          </p>
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary/5"
          >
            Add New Memory
          </Button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-10 right-0 w-40 h-40 bg-secondary/40 rounded-full blur-3xl opacity-50" />
      <div className="absolute top-20 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl opacity-50" />
    </section>
  );
};

export default Timeline;
