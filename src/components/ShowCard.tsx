import { Link } from "react-router-dom";
import { ImageOff } from "lucide-react";
import type { ShowCardData } from "../types/tvmaze";

interface Props {
  show: ShowCardData;
}

export function ShowCard({ show }: Props) {
  return (
    <Link key={show.id} to={`/show/${show.id}`}>
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
        {show.image && (
          <img
            src={show.image}
            alt={show.name}
            className="
              h-72 w-full
              object-cover"
          />
        )}
        {!show.image && (
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
          <h2 className="font-bold">{show.name}</h2>
        </div>
      </div>
    </Link>
  );
}
