import { VenetianMask } from "lucide-react";
import type { CastMember } from "../types/tvmaze";
import { Link } from "react-router-dom";

interface Props {
  member: CastMember;
  showBirthday: boolean;
  setShowBirthday: (v: boolean) => void;
}

export function CastCard({ member, showBirthday, setShowBirthday }: Props) {
  return (
    <Link to={`/person/${member.person.id}`}>
      <div
        key={member.person.id}
        className="
        rounded-lg bg-gray-600/40 
        backdrop-blur-sm"
      >
        <div id="imageContainer" className="relative">
          {member.person.image && (
            <img
              src={member.person.image.medium}
              alt={member.person.name}
              className="
                mb-2 h-50 w-full 
                rounded-t-lg object-cover"
            />
          )}
          {member.person.image === null && (
            <div
              className="
                h-50 w-full rounded-t-lg bg-none 
                flex flex-col items-center justify-center 
                text-gray-500/60"
            >
              <VenetianMask size={64} />
              <p>* no image available *</p>
            </div>
          )}
          {member.person.birthday && (
            <div
              className={`
                absolute bottom-0 right-0 
                py-0.5 pl-2 pr-1.5 rounded-tl
                bg-gray-950/60 backdrop-blur-sm
                transition-all duration-300 
                ${showBirthday ? "opacity-100" : "opacity-0"} 
                    text-xs text-gray-50`}
              onClick={() => setShowBirthday(!showBirthday)}
            >
              {member.person.birthday}
            </div>
          )}
        </div>
        <div className="font-semibold text-gray-50 px-3">
          {member.person.name}
        </div>

        <div className="text-sm text-gray-300 px-3 pb-3">
          as {member.character.name}
        </div>
      </div>
    </Link>
  );
}
