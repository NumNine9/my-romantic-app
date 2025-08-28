"use client"; // Next.js directive: This component runs on the client-side only

import type React from "react"; // Import React types for TypeScript
import { useState, useEffect, useRef } from "react"; // React hooks for state and side effects
import { Card } from "@/components/ui/card"; // Shadcn/ui card component for styling
import { Button } from "@/components/ui/button"; // Shadcn/ui button component
import { Heart, Star, Gift, Calendar } from "lucide-react"; // Icon library for visual elements

// Interface defining the structure of each advent calendar item
interface AdventContent {
  day: number; // Day of the month (1-24)
  type: "verse" | "love" | "memory" | "promise"; // Category of content
  title: string; // Short title for the content
  content: string; // The actual message/content
  icon: React.ReactNode; // React icon component
}

// Array containing all 31 days of advent content with different types
const adventContent: AdventContent[] = [
  {
    day: 1,
    type: "verse",
    title: "God's Love for You",
    content:
      '"For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord." - Romans 8:38-39',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 2,
    type: "love",
    title: "Your Beautiful Smile",
    content:
      "I love how your smile has the power to light up my entire world. It's my favorite sight, no matter what kind of day I'm having.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 3,
    type: "memory",
    title: "Our First Laugh Together",
    content:
      "Remember our first coffee date when you laughed so hard at my terrible joke that you nearly spilled your latte? That was the moment I knew your joy was something special I wanted in my life every day.",
    icon: <Gift className="w-5 h-5" />,
  },
  {
    day: 4,
    type: "promise",
    title: "Adventures Together",
    content:
      "I promise to always seek new adventures with you, whether it's traveling to new places or finding magic in our ordinary days. Every moment with you is an adventure I cherish.",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    day: 5,
    type: "verse",
    title: "Perfect Love Casts Out Fear",
    content:
      '"There is no fear in love. But perfect love drives out fear, because fear has to do with punishment. The one who fears is not made perfect in love." - 1 John 4:18',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 6,
    type: "love",
    title: "Your Generous Heart",
    content:
      "I love how you always see the best in people and give so generously of your time and heart. Your kindness makes everyone around you feel valued and seen.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 7,
    type: "memory",
    title: "Dancing in the Kitchen",
    content:
      "That spontaneous morning when we danced while making breakfast - flour everywhere, off-key singing, and completely perfect happiness. I want a lifetime of those messy, beautiful moments with you.",
    icon: <Gift className="w-5 h-5" />,
  },
  {
    day: 8,
    type: "promise",
    title: "Growing Together",
    content:
      "I promise to keep growing with you - to learn from you, to support your dreams, and to never stop becoming a better partner for you. Our growth together is my greatest aspiration.",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    day: 9,
    type: "verse",
    title: "Guard Your Heart",
    content:
      '"Above all else, guard your heart, for everything you do flows from it." - Proverbs 4:23',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 10,
    type: "love",
    title: "Your Inner Strength",
    content:
      "I love how you face challenges with grace and strength. Your resilience inspires me to be braver and reminds me that we can handle anything together.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 11,
    type: "memory",
    title: "Rainy Day Comfort",
    content:
      "That stormy afternoon we spent reading together, sharing our favorite passages between comfortable silences. I've never felt more peaceful than in that moment with you.",
    icon: <Gift className="w-5 h-5" />,
  },
  {
    day: 12,
    type: "promise",
    title: "I Will Always Listen",
    content:
      "I promise to always create space for your voice - to listen not just to your words, but to your heart. Your thoughts and feelings will always matter deeply to me.",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    day: 13,
    type: "verse",
    title: "The Nature of Love",
    content:
      '"Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs." - 1 Corinthians 13:4-5',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 14,
    type: "love",
    title: "Your Contagious Laughter",
    content:
      "I love how your laughter fills a room and makes everyone around you smile. It's the most beautiful sound, and I never tire of hearing it.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 15,
    type: "memory",
    title: "Sunset Walks",
    content:
      "Walking hand in hand as the sun dipped below the horizon, talking about our dreams and fears. Those quiet moments with you feel like coming home.",
    icon: <Gift className="w-5 h-5" />,
  },
  {
    day: 16,
    type: "promise",
    title: "You Are My Home",
    content:
      "I promise that wherever life takes us, I will always work to make you feel safe, loved, and cherished. With you, anywhere feels like home.",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    day: 17,
    type: "verse",
    title: "Unquenchable Love",
    content:
      '"Many waters cannot quench love; rivers cannot sweep it away. If one were to give all the wealth of one\'s house for love, it would be utterly scorned." - Song of Songs 8:7',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 18,
    type: "love",
    title: "Your Beautiful Mind",
    content:
      "I love how you see the world - your unique perspective, your thoughtful insights, and the way you constantly teach me to see things differently. Your mind is beautiful.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 19,
    type: "memory",
    title: "Midnight Truths",
    content:
      "Those late-night conversations where we shared our deepest hopes and fears. Thank you for trusting me with your heart. Those moments are sacred to me.",
    icon: <Gift className="w-5 h-5" />,
  },
  {
    day: 20,
    type: "promise",
    title: "I Will Celebrate You",
    content:
      "I promise to celebrate every part of you - your victories, your strengths, and even your imperfections. You deserve to be celebrated every single day.",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    day: 21,
    type: "verse",
    title: "Chosen and Loved",
    content:
      '"But you are a chosen people, a royal priesthood, a holy nation, God\'s special possession, that you may declare the praises of him who called you out of darkness into his wonderful light." - 1 Peter 2:9',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 22,
    type: "love",
    title: "Your Compassionate Soul",
    content:
      "I love how deeply you care for others. Your compassion makes the world a better place, and it inspires me to be more generous with my love too.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 23,
    type: "memory",
    title: "The Little Moments",
    content:
      "It's not just the big moments I cherish, but the small ones too: your morning smile, the way you hum when you're focused, how you make ordinary days feel extraordinary.",
    icon: <Gift className="w-5 h-5" />,
  },
  {
    day: 24,
    type: "promise",
    title: "Through Every Season",
    content:
      "I promise to love you through all of life's seasons - in joy and challenge, in laughter and tears, in sunshine and storm. My love for you is constant and true.",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    day: 25,
    type: "verse",
    title: "Strength and Peace",
    content:
      '"The Lord gives strength to his people; the Lord blesses his people with peace." - Psalm 29:11',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 26,
    type: "love",
    title: "Your Growing Light",
    content:
      "I love watching you grow and evolve. The woman you're becoming is even more amazing than I could have imagined, and I'm grateful to witness your journey.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 27,
    type: "memory",
    title: "Our First 'I Love You'",
    content:
      "I'll never forget the moment we first said 'I love you.' My heart knew it was true long before my words caught up, but saying it aloud made everything feel complete.",
    icon: <Gift className="w-5 h-5" />,
  },
  {
    day: 28,
    type: "promise",
    title: "Your Biggest supporter",
    content:
      "I promise to always be your biggest supporter and safest place to land. Dream big, my love - I'll be here cheering you on every step of the way.",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    day: 29,
    type: "verse",
    title: "New Beginnings",
    content:
      '"Because of the Lord\'s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness." - Lamentations 3:22-23',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 30,
    type: "love",
    title: "My Greatest Gift",
    content:
      "You are the greatest gift I never knew I needed. Every day with you reminds me how blessed I am to have your love in my life.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 31,
    type: "promise",
    title: "Forever Yours",
    content:
      "I promise to choose you every day - to nurture our love, to prioritize our connection, and to never take for granted the incredible woman you are. I'm forever yours.",
    icon: <Calendar className="w-5 h-5" />,
  },
];

export default function AdventCalendar() {
  // State to track which doors/days have been opened
  const [openedDoors, setOpenedDoors] = useState<Set<number>>(new Set());

  // State to track currently selected day for displaying content
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // State to track current date for door availability logic
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Create a ref for the modal container
  const modalRef = useRef<HTMLDivElement>(null);

  // Effect to load saved state from localStorage when component mounts
  useEffect(() => {
    const saved = localStorage.getItem("advent-opened-doors");
    if (saved) {
      // Parse saved data and convert array back to Set
      setOpenedDoors(new Set(JSON.parse(saved)));
    }
  }, []); // Empty dependency array means this runs only once on mount

  // Function to check if a specific door can be opened based on current date
  const canOpenDoor = (day: number) => {
    const today = new Date();
    const december = new Date(today.getFullYear(), 7, day); // December is month 11 (0-indexed)
    return today >= december || today.getMonth() === 11; // Allow if current date is on/after door date OR it's December
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
      "advent-opened-doors",
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
      case "love":
        return "bg-red-500 text-white"; // Red for love
      case "memory":
        return "bg-secondary text-secondary-foreground"; // Secondary theme colors
      case "promise":
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2 text-balance">
            31 Days of Sunshine for Lathitha
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
