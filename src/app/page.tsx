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
    title: "A Refuge and Strength",
    content:
      '"God is our refuge and strength, an ever-present help in trouble." - Psalm 46:1',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 2,
    type: "affirmation",
    title: "You Are Capable",
    content:
      "Today, you are capable of handling whatever comes your way. Trust in your strength and wisdom.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 3,
    type: "dad-joke",
    title: "Why did the scarecrow win an award?",
    content: "Because he was outstanding in his field! 🌾",
    icon: <Laugh className="w-5 h-5" />,
  },
  {
    day: 4,
    type: "emoji-of-the-day",
    title: "Sparkles for Your Spirit",
    content:
      "✨ - May your day be filled with magical moments and sparkling joy!",
    icon: <Smile className="w-5 h-5" />,
  },
  {
    day: 5,
    type: "verse",
    title: "The Peace of God",
    content:
      '"And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus." - Philippians 4:7',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 6,
    type: "affirmation",
    title: "You Are Growing",
    content:
      "Every challenge you face is helping you grow stronger and more resilient. You're doing better than you think.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 7,
    type: "dad-joke",
    title: "What do you call a fake noodle?",
    content: "An impasta! 🍝",
    icon: <Laugh className="w-5 h-5" />,
  },
  {
    day: 8,
    type: "emoji-of-the-day",
    title: "Coffee Power",
    content: "☕ - Fuel for amazing people having amazing days. That's you!",
    icon: <Smile className="w-5 h-5" />,
  },
  {
    day: 9,
    type: "verse",
    title: "Trust in the Lord",
    content:
      '"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." - Proverbs 3:5-6',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 10,
    type: "affirmation",
    title: "You Are Loved",
    content:
      "You are deeply loved and valued exactly as you are today. Your presence makes a difference in this world.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 11,
    type: "dad-joke",
    title: "Why don't scientists trust atoms?",
    content: "Because they make up everything! 🔬",
    icon: <Laugh className="w-5 h-5" />,
  },
  {
    day: 12,
    type: "emoji-of-the-day",
    title: "Rainbow Reminder",
    content:
      "🌈 - Remember: after every storm comes beauty and color. You've got this!",
    icon: <Smile className="w-5 h-5" />,
  },
  {
    day: 13,
    type: "verse",
    title: "A Crown of Beauty",
    content:
      '"...to bestow on them a crown of beauty instead of ashes, the oil of joy instead of mourning, and a garment of praise instead of a spirit of despair." - Isaiah 61:3',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 14,
    type: "affirmation",
    title: "You Are Enough",
    content:
      "You don't need to be perfect to be worthy of love and respect. You are enough exactly as you are.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 15,
    type: "dad-joke",
    title: "What do you call a bear with no teeth?",
    content: "A gummy bear! 🧸",
    icon: <Laugh className="w-5 h-5" />,
  },
  {
    day: 16,
    type: "emoji-of-the-day",
    title: "Bookworm Energy",
    content:
      "📚 - Whether learning or escaping, may you find wisdom and adventure in today's pages!",
    icon: <Smile className="w-5 h-5" />,
  },
  {
    day: 17,
    type: "verse",
    title: "Plans to Prosper You",
    content:
      '"For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future." - Jeremiah 29:11',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 18,
    type: "affirmation",
    title: "You Are Brave",
    content:
      "Courage isn't the absence of fear - it's moving forward despite it. And you, my friend, are incredibly brave.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 19,
    type: "dad-joke",
    title: "Why did the math book look so sad?",
    content: "Because it had too many problems! 📚",
    icon: <Laugh className="w-5 h-5" />,
  },
  {
    day: 20,
    type: "emoji-of-the-day",
    title: "Adventure Awaits",
    content:
      "🗺️ - May your day be filled with exciting discoveries and happy adventures!",
    icon: <Smile className="w-5 h-5" />,
  },
  {
    day: 21,
    type: "verse",
    title: "The Lord is My Shepherd",
    content:
      '"The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters..." - Psalm 23:1-2',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 22,
    type: "affirmation",
    title: "You Are Resilient",
    content:
      "You have survived 100% of your bad days so far. That's a perfect track record! Keep going.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 23,
    type: "dad-joke",
    title: "What do you call a sleeping bull?",
    content: "A bulldozer! 🐄",
    icon: <Laugh className="w-5 h-5" />,
  },
  {
    day: 24,
    type: "emoji-of-the-day",
    title: "Holiday Cheer",
    content: "🎄 - Wishing you warmth, wonder, and magical moments today!",
    icon: <Smile className="w-5 h-5" />,
  },
  {
    day: 25,
    type: "verse",
    title: "The Greatest Gift",
    content:
      '"For to us a child is born, to us a son is given, and the government will be on his shoulders. And he will be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace." - Isaiah 9:6',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 26,
    type: "affirmation",
    title: "You Are Appreciated",
    content:
      "Your presence in this world matters. The unique light you bring is noticed and appreciated.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 27,
    type: "dad-joke",
    title: "Why don't eggs tell jokes?",
    content: "They'd crack each other up! 🥚",
    icon: <Laugh className="w-5 h-5" />,
  },
  {
    day: 28,
    type: "emoji-of-the-day",
    title: "Cozy Vibes",
    content:
      "🛋️ - Perfect day for comfort, warmth, and taking it easy. You've earned it!",
    icon: <Smile className="w-5 h-5" />,
  },
  {
    day: 29,
    type: "verse",
    title: "Faith, Hope, and Love",
    content:
      '"And now these three remain: faith, hope and love. But the greatest of these is love." - 1 Corinthians 13:13',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 30,
    type: "affirmation",
    title: "You Are Making Progress",
    content:
      "Even when it feels like you're standing still, you're growing and moving forward. Trust the process.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 31,
    type: "dad-joke",
    title: "What's a snowman's favorite breakfast?",
    content: "Frosted flakes! ❄️",
    icon: <Laugh className="w-5 h-5" />,
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
            31 Days of Sunshine for Latti 🌞
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
