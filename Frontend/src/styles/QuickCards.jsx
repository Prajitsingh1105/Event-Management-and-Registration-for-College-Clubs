import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, MessageCircle, HelpCircle } from "lucide-react";

const cards = [
  {
    title: "Events",
    icon: <Calendar className="w-6 h-6" />,
    link: "/user/events",
    color: "bg-purple-600",
  },
  {
    title: "Clubs",
    icon: <Users className="w-6 h-6" />,
    link: "/user/clubs",
    color: "bg-blue-600",
  },
  {
    title: "Community",
    icon: <MessageCircle className="w-6 h-6" />,
    link: "/user/community",
    color: "bg-green-600",
  },
  {
    title: "Help / Contact",
    icon: <HelpCircle className="w-6 h-6" />,
    link: "/user/help",
    color: "bg-orange-500",
  },
];

const QuickAccessCards = () => {
  return (
    <div className="relative z-10 px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Link
          to={card.link}
          key={card.title}
          className="flex flex-col items-center justify-center p-6 rounded-xl  hover:scale-105 transform transition-all bg-gray-200 backdrop-blur-md w-44"
        >
          <div
            className={`p-4 rounded-full mb-4 ${card.color} text-white flex items-center justify-center`}
          >
            {card.icon}
          </div>
          <span className="text-black text-lg font-bold">{card.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default QuickAccessCards;
