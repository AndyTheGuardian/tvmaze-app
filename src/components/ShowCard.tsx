import { Link } from "react-router-dom";
import type { Show } from "../types/tvmaze";
import { ImageOff } from "lucide-react";

interface Props {
  show: Show;
}

export function ShowCard({ show }: Props) {
  return (
    <Link to={`/show/${show.id}`}>
      <div
        className="overflow-hidden rounded-lg 
       bg-white/60 text-gray-950
      shadow-sm backdrop-blur-sm
      hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]
      transition-transform duration-300"
      >
        {show.image && (
          <img
            src={show.image.medium}
            alt={show.name}
            className="h-72 w-full object-cover"
          />
        )}
        {show.image === null && (
          <div
            className="h-72 w-full flex flex-col items-center justify-center 
            bg-none text-gray-800"
          >
            <ImageOff size={64} />
            <p className="">* no image available *</p>
          </div>
        )}

        <div className="p-4">
          <h2 className="font-bold">{show.name}</h2>
        </div>
      </div>
    </Link>
  );
}
