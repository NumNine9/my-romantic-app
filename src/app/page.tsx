"use client"; // Next.js directive: This component runs on the client-side only

import type React from "react"; // Import React types for TypeScript
import { useState, useEffect, useRef } from "react"; // React hooks for state and side effects
import { Card } from "@/components/ui/card"; // Shadcn/ui card component for styling
import { Button } from "@/components/ui/button"; // Shadcn/ui button component
import { Heart, Star, Gift, Calendar } from "lucide-react"; // Icon library for visual elements
// import latti from "./latti.jpg";
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
    title: "A Refuge and Strength",
    content:
      '"God is our refuge and strength, an ever-present help in trouble." - Psalm 46:1',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 2,
    type: "love",
    title: "The Way You Encourage Me",
    content:
      "I love how you believe in me even when I doubt myself. Your encouragement is the wind beneath my wings, giving me the courage to try harder and reach further.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 3,
    type: "memory",
    title: "Getting Lost Together",
    content:
      "Remember that road trip where we took the 'scenic route' and ended up completely lost? Instead of frustration, we found laughter and a hidden little diner with the best pie. It taught me that with you, the detours are just as wonderful as the destination.",
    icon: <Gift className="w-5 h-5" />,
  },
  {
    day: 4,
    type: "promise",
    title: "I Will Choose Gratitude",
    content:
      "I promise to never take you for granted. I will wake up every day grateful for your presence in my life and find new ways to show you my appreciation.",
    icon: <Calendar className="w-5 h-5" />,
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
    type: "love",
    title: "Your Hand in Mine",
    content:
      "I love the simple, steady comfort of holding your hand. It feels like a silent promise that no matter what we face, we'll face it together.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 7,
    type: "memory",
    title: "Building a Fort",
    content:
      "That lazy Sunday we built a blanket fort in the living room like kids, complete with fairy lights and snacks. Inside our little castle, the outside world disappeared, and it was just us, full of silly, uncomplicated joy.",
    icon: <Gift className="w-5 h-5" />,
  },
  {
    day: 8,
    type: "promise",
    title: "To Keep Dating You",
    content:
      "I promise to never stop dating you. I will always make an effort to court you, to surprise you, and to make you feel pursued and desired, just as you are.",
    icon: <Calendar className="w-5 h-5" />,
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
    type: "love",
    title: "Your Quiet Confidence",
    content:
      "I love the quiet confidence you carry. You don't need to be the loudest in the room; your strength and character speak for themselves in the most powerful way.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 11,
    type: "memory",
    title: "Our First Challenge Overcome",
    content:
      "Looking back on that first big challenge we faced as a couple. We were scared, but we held on tight to each other. Coming out on the other side stronger showed me that our love is resilient and built to last.",
    icon: <Gift className="w-5 h-5" />,
  },
  {
    day: 12,
    type: "promise",
    title: "To Forgive Freely",
    content:
      "I promise to offer forgiveness freely and quickly, just as I hope to receive it. I will not let pride or petty grievances build walls between us.",
    icon: <Calendar className="w-5 h-5" />,
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
    type: "love",
    title: "The Way You Say My Name",
    content:
      "I love the way you say my name. It sounds different coming from you—like a secret, a prayer, and a homecoming, all at once.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 15,
    type: "memory",
    title: "Stargazing",
    content:
      "Laying on a blanket in the cool grass, pointing out constellations we didn't know the names of, and making up our own. Under that vast, infinite sky, I felt incredibly small and yet entirely significant because I was there with you.",
    icon: <Gift className="w-5 h-5" />,
  },
  {
    day: 16,
    type: "promise",
    title: "To Protect Your Peace",
    content:
      "I promise to be a source of peace in your life. I will strive to create a home and a relationship that is your sanctuary from the chaos of the world.",
    icon: <Calendar className="w-5 h-5" />,
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
    type: "love",
    title: "Your Passionate Spirit",
    content:
      "I love the fire in your spirit when you talk about something you're passionate about. Your eyes light up, and your energy is contagious. It's absolutely captivating.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 19,
    type: "memory",
    title: "Learning Something New",
    content:
      "That time we tried to learn how to cook a complicated dish together. The kitchen was a disaster, and we got most of the steps wrong, but we had so much fun failing together. It ended up being our favorite meal.",
    icon: <Gift className="w-5 h-5" />,
  },
  {
    day: 20,
    type: "promise",
    title: "To Be Fully Present",
    content:
      "I promise to put down my phone, turn off the screen, and be fully present with you. The time we have together is too precious to be diluted by distractions.",
    icon: <Calendar className="w-5 h-5" />,
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
    type: "love",
    title: "Your Thoughtfulness",
    content:
      "I love how you remember the little things—my favorite snack, that story I told once, the song I said I liked. It makes me feel truly known and deeply cared for.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 23,
    type: "memory",
    title: "The Comfort of Silence",
    content:
      "Sitting together in complete silence, both lost in our own books or thoughts, and feeling perfectly connected and content. We don't always need words to speak the language of our hearts.",
    icon: <Gift className="w-5 h-5" />,
  },
  {
    day: 24,
    type: "promise",
    title: "To Laugh With You Every Day",
    content:
      "I promise to find a reason to laugh with you every single day. Your joy is my joy, and I want to fill our lives with lightness and humor.",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    day: 25,
    type: "verse",
    title: "Be Strong and Courageous",
    content:
      '"Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go." - Joshua 1:9',
    icon: <Star className="w-5 h-5" />,
  },
  {
    day: 26,
    type: "love",
    title: "The Sound of Your Voice",
    content:
      "I love the sound of your voice, whether you're telling me about your day, whispering a secret, or just calling my name from another room. It's my favorite melody.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    day: 27,
    type: "memory",
    title: "Our Song",
    content:
      "The first time we heard 'our song' on the radio and you immediately turned it up, grabbed my hand, and started singing to me. In that moment, everything felt perfect and aligned.",
    icon: <Gift className="w-5 h-5" />,
  },
  {
    day: 28,
    type: "promise",
    title: "To Pray For and With You",
    content:
      "I promise to pray for you always, and to pray with you often. I will lift up our hopes, our fears, and our gratitude together, seeking guidance for our journey.",
    icon: <Calendar className="w-5 h-5" />,
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
    type: "love",
    title: "Your Entire Being",
    content:
      "I love you—not just for what you are, but for who I am when I'm with you. You make me a better, happier, more complete person. I love every version of us.",
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

    // September is month 8 (0-indexed: January=0, September=8)
    const doorDate = new Date(currentYear, 8, day);

    // Allow if current date is on/after the door date AND we're in September
    return today >= doorDate && today.getMonth() === 8;
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
