import { Link } from "react-router-dom";
import { ImageOff } from "lucide-react";
import type { CardData } from "../types/tvmaze";
import { motion } from "framer-motion";

interface MediaCardProps {
  item: CardData;
  to: string;
  type?: "show" | "person";
  animate?: boolean;
}

export function MediaCard({
  item,
  to,
  type = "show",
  animate = false,
}: MediaCardProps) {
  return (
    <Link key={item.id} to={to}>
      <div
        className="overflow-hidden rounded-lg 
        text-gray-950
        shadow-sm backdrop-blur-sm
        hover:shadow-lg 
        block
        hover:scale-[1.02] 
        active:scale-[0.98]
        transform-gpu
        transition-transform 
        duration-300"
      >
        {item.image && animate ? (
          <motion.img
            layoutId={`${type}-${item.id}`}
            src={item.image}
            alt={item.name}
            style={{ zIndex: 9999 }}
            className="
              h-72 w-full
              object-cover"
          />
        ) : (
          <img
            src={item.image}
            alt={item.name}
            className="
              h-72 w-full
              object-cover"
          />
        )}
        {!item.image && (
          <div
            className="h-72 w-full flex flex-col 
            items-center justify-center 
            bg-gray-600/40 text-gray-500 font-medium"
          >
            <ImageOff size={64} />
            <p className="font-">* no image available *</p>
          </div>
        )}

        <div className="p-4 bg-gray-200/60">
          <h2 className="font-bold">{item.name}</h2>
        </div>
      </div>
    </Link>
  );
}
