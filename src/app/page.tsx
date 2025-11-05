"use client"; // Next.js directive: This component runs on the client-side only

import type React from "react"; // Import React types for TypeScript
import { useState, useEffect, useRef } from "react"; // React hooks for state and side effects
import { Card } from "@/components/ui/card"; // Shadcn/ui card component for styling
import { Button } from "@/components/ui/button"; // Shadcn/ui button component
import { Heart, Star, Laugh, Smile } from "lucide-react"; // Icon library for visual elements
// import latti from "./latti.jpg";
// Interface defining the structure of each advent calendar item
interface AdventContent {
  day: number; // Day of the month (1-31)
  type: "verse" | "affirmation" | "dad-joke" | "emoji-of-the-day"; // Category of content
  title: string; // Short title for the content
  content: string; // The actual message/content
  icon: React.ReactNode; // React icon component
}

// Array containing all 31 days of advent content with different types
const adventContent: AdventContent[] = [
  {
    day: 1,
    type: "verse",
    title: "A New Beginning",
    content:
      '"See, I am doing a new thing! Now it springs up; do you not perceive it? I am making a way in the wilderness and streams in the wasteland." - Isaiah 43:19',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 2,
    type: "affirmation",
    title: "Your Journey Matters",
    content:
      "Where you are right now is a necessary step. Trust the path you are on.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 3,
    type: "dad-joke",
    title: "Why did the coffee file a police report?",
    content: "It got mugged! ☕",
    icon: <Laugh className="w-5 h-5" />,
  },
  {
    day: 4,
    type: "emoji-of-the-day",
    title: "Shine Bright",
    content: "🌟 - Don't forget to let your own unique light shine today.",
    icon: <Smile className="w-5 h-5" />,
  },
  {
    day: 5,
    type: "verse",
    title: "Strength for the Weary",
    content:
      '"But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint." - Isaiah 40:31',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 6,
    type: "affirmation",
    title: "You Are a Source of Good",
    content:
      "Your simple acts of kindness create ripples of good in the world.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 7,
    type: "dad-joke",
    title: "What do you call a factory that makes okay products?",
    content: "A satisfactory! 🏭",
    icon: <Laugh className="w-5 h-5" />,
  },
  {
    day: 8,
    type: "emoji-of-the-day",
    title: "Plant a Seed",
    content:
      "🌱 - Nurture a good idea, a kind word, or a hopeful thought today.",
    icon: <Smile className="w-5 h-5" />,
  },
  {
    day: 9,
    type: "verse",
    title: "The Lord's Unfailing Love",
    content:
      '"The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing." - Zephaniah 3:17',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 10,
    type: "affirmation",
    title: "Your Feelings Are Valid",
    content:
      "You don't have to be okay all the time. It's okay to feel what you feel.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 11,
    type: "dad-joke",
    title: "Why did the bicycle fall over?",
    content: "Because it was two-tired! 🚲",
    icon: <Laugh className="w-5 h-5" />,
  },
  {
    day: 12,
    type: "emoji-of-the-day",
    title: "Find Your Anchor",
    content: "⚓ - Stay grounded in what brings you peace and stability.",
    icon: <Smile className="w-5 h-5" />,
  },
  {
    day: 13,
    type: "verse",
    title: "Cast Your Cares",
    content:
      '"Cast all your anxiety on him because he cares for you." - 1 Peter 5:7',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 14,
    type: "affirmation",
    title: "You Are Under Construction",
    content:
      "It's okay to be a work in progress. The most beautiful things are.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 15,
    type: "dad-joke",
    title: "What do you call a fish wearing a crown?",
    content: "King of the sea! 🐠",
    icon: <Laugh className="w-5 h-5" />,
  },
  {
    day: 16,
    type: "emoji-of-the-day",
    title: "Warm Your Heart",
    content:
      "🕯️ - A little warmth and light can be found in the simplest moments.",
    icon: <Smile className="w-5 h-5" />,
  },
  {
    day: 17,
    type: "verse",
    title: "The Light of the World",
    content:
      '"When Jesus spoke again to the people, he said, "I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life."" - John 8:12',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 18,
    type: "affirmation",
    title: "You Are a Good Friend",
    content: "Your compassion and listening ear are gifts to those around you.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 19,
    type: "dad-joke",
    title: "Why couldn't the leopard play hide and seek?",
    content: "Because he was always spotted! 🐆",
    icon: <Laugh className="w-5 h-5" />,
  },
  {
    day: 20,
    type: "emoji-of-the-day",
    title: "Look Up",
    content:
      "🌌 - Remember to look up and appreciate the vastness and wonder around you.",
    icon: <Smile className="w-5 h-5" />,
  },
  {
    day: 21,
    type: "verse",
    title: "The Gift of Rest",
    content:
      '"Come to me, all you who are weary and burdened, and I will give you rest." - Matthew 11:28',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 22,
    type: "affirmation",
    title: "You Are Allowed to Rest",
    content:
      "Your worth is not measured by your productivity. Taking a break is a necessary part of life.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 23,
    type: "dad-joke",
    title: "What do you call a cow with no legs?",
    content: "Ground beef! 🐄",
    icon: <Laugh className="w-5 h-5" />,
  },
  {
    day: 24,
    type: "emoji-of-the-day",
    title: "Silent Night",
    content: "🌙 - May you find a moment of quiet peace and stillness tonight.",
    icon: <Smile className="w-5 h-5" />,
  },
  {
    day: 25,
    type: "verse",
    title: "A Savior is Born",
    content:
      '"Today in the town of David a Savior has been born to you; he is the Messiah, the Lord." - Luke 2:11',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 26,
    type: "affirmation",
    title: "You Bring Joy",
    content: "Your laughter and smile are contagious gifts to the world.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 27,
    type: "dad-joke",
    title: "Why did the tomato turn red?",
    content: "Because it saw the salad dressing! 🍅",
    icon: <Laugh className="w-5 h-5" />,
  },
  {
    day: 28,
    type: "emoji-of-the-day",
    title: "Reflect and Dream",
    content:
      "💭 - A perfect day to look back with gratitude and forward with hope.",
    icon: <Smile className="w-5 h-5" />,
  },
  {
    day: 29,
    type: "verse",
    title: "Perfect Love",
    content:
      '"There is no fear in love. But perfect love drives out fear..." - 1 John 4:18',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 30,
    type: "affirmation",
    title: "You Are Heard",
    content:
      "Your voice, your story, and your perspective matter. Don't be afraid to share them.",
    icon: <Heart className="w-5 h-5" />,
  },
];

export default function AdventCalendar() {
  // State to track which doors/days have been opened
  const [openedDoors, setOpenedDoors] = useState<Set<number>>(new Set());

  // State to track currently selected day for displaying content
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // State to track current date for door availability logic
  // const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Create a ref for the modal container
  const modalRef = useRef<HTMLDivElement>(null);

  // Effect to load saved state from localStorage when component mounts
  useEffect(() => {
    const saved = localStorage.getItem("advents-opened-doors");
    if (saved) {
      // Parse saved data and convert array back to Set
      setOpenedDoors(new Set(JSON.parse(saved)));
    }
  }, []); // Empty dependency array means this runs only once on mount

  // Function to check if a specific door can be opened based on current date
  const canOpenDoor = (day: number) => {
    const today = new Date();
    const currentYear = today.getFullYear();

    // October is month 9 (0-indexed: January=0, October=9)
    const doorDate = new Date(currentYear, 9, day);

    // Allow if current date is on/after the door date AND we're in October
    return today >= doorDate && today.getMonth() === 9;
  };
  // Function to handle door opening logic
  const openDoor = (day: number) => {
    if (!canOpenDoor(day)) return; // Prevent opening if not allowed

    // Create new Set with existing opened doors plus the new one
    const newOpenedDoors = new Set(openedDoors);
    newOpenedDoors.add(day);
    setOpenedDoors(newOpenedDoors);
    setSelectedDay(day); // Show content for this day

    // Persist the opened doors to localStorage for future visits
    localStorage.setItem(
      "advents-opened-doors",
      JSON.stringify([...newOpenedDoors]) // Convert Set to array for storage
    );

    // Scroll to modal after a brief delay to allow state update and rendering
    setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center", // Centers the modal in the viewport
        });
      }
    }, 100); // Small delay to ensure the modal is rendered
  };

  // Helper function to get CSS classes based on content type
  const getTypeColor = (type: string) => {
    switch (type) {
      case "verse":
        return "bg-primary text-primary-foreground"; // Primary theme colors
      case "affirmation":
        return "bg-red-500 text-white"; // Red for love
      case "dad-joke":
        return "bg-secondary text-secondary-foreground"; // Secondary theme colors
      case "emoji-of-the-day":
        return "bg-green-600 text-white"; // Green for promises
      default:
        return "bg-muted text-muted-foreground"; // Default muted colors
    }
  };

  // Find the content for the currently selected day
  const selectedContent = selectedDay
    ? adventContent.find((c) => c.day === selectedDay)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 p-4 relative">
      {/* Background Image with Low Opacity */}
      <div className="fixed inset-0 z-0">
        <img
          src="/latti.jpg" // Update this path to your image
          alt="Romantic background"
          className="w-full h-full object-cover opacity-20" // opacity-20 = 20% opacity
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2 text-balance">
            30 Days of Sunshine for Latti 🌞
          </h1>
          <p className="text-muted-foreground text-lg">
            Open one door each day to discover something special ✨
          </p>
        </div>

        {/* Grid of advent calendar doors */}
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mb-8">
          {adventContent.map((item) => {
            const isOpened = openedDoors.has(item.day); // Check if door is opened
            const canOpen = canOpenDoor(item.day); // Check if door can be opened

            return (
              <Card
                key={item.day}
                className={`
                  aspect-square cursor-pointer transition-all duration-300 hover:scale-105
                  ${
                    isOpened
                      ? "bg-card border-primary shadow-lg" // Opened style
                      : canOpen
                      ? "bg-gradient-to-br from-primary/10 to-secondary/10 border-dashed border-2 border-primary/30 hover:border-primary/60" // Can open style
                      : "bg-muted border-muted-foreground/20 cursor-not-allowed opacity-60" // Locked style
                  }
                `}
                onClick={() => canOpen && openDoor(item.day)} // Only clickable if canOpen
              >
                <div className="h-full flex flex-col items-center justify-center p-2">
                  {isOpened ? (
                    // Display content preview if door is opened
                    <>
                      <div
                        className={`p-2 rounded-full mb-2 ${getTypeColor(
                          item.type
                        )}`}
                      >
                        {item.icon} {/* Show type icon */}
                      </div>
                      <span className="text-sm font-medium text-center text-balance">
                        {item.title} {/* Show content title */}
                      </span>
                    </>
                  ) : (
                    // Display day number if door is closed
                    <>
                      <div className="text-2xl font-bold text-primary mb-1">
                        {item.day} {/* Show day number */}
                      </div>
                      <div className="text-xs text-muted-foreground text-center">
                        {canOpen ? "Click to open!" : "Wait for this day"}{" "}
                        {/* Status message */}
                      </div>
                    </>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Modal for displaying full content when a door is opened */}
        {/* Add ref to the modal container and an ID for better scrolling */}
        <div ref={modalRef} id="modal-container">
          {selectedContent && (
            <Card className="max-w-2xl mx-auto p-6 bg-card shadow-xl">
              <div className="text-center">
                <div
                  className={`inline-flex p-3 rounded-full mb-4 ${getTypeColor(
                    selectedContent.type
                  )}`}
                >
                  {selectedContent.icon}
                </div>
                <h2 className="text-2xl font-bold mb-4 text-balance">
                  Day {selectedContent.day}: {selectedContent.title}
                </h2>
                <p className="text-lg leading-relaxed text-pretty">
                  {selectedContent.content}
                </p>
                <Button
                  onClick={() => setSelectedDay(null)}
                  className="mt-6"
                  variant="outline"
                >
                  Close
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
