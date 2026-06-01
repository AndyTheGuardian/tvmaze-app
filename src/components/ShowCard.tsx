import { Link } from "react-router-dom";
import type { Show } from "../types/tvmaze";

interface Props {
  show: Show;
}

export function ShowCard({ show }: Props) {
  return (
    <Link to={`/show/${show.id}`}>
      <div
        className="overflow-hidden rounded-lg 
        border-0 border-gray-200/80
       bg-gray-200/80 text-gray-950
      shadow-sm 
      hover:shadow-lg hover:scale-105 active:scale-95
      transition-transform duration-300"
      >
        {show.image && (
          <img
            src={show.image.medium}
            alt={show.name}
            className="h-72 w-full object-cover"
          />
        )}

        <div className="p-4">
          <h2 className="font-bold">{show.name}</h2>
        </div>
      </div>
    </Link>
  );
}
