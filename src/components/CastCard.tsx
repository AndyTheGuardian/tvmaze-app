import { VenetianMask } from "lucide-react";
import type { CastMember } from "../types/tvmaze";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Props {
  member: CastMember;
  showBirthday: boolean;
}

export function CastCard({ member, showBirthday }: Props) {
  return (
    <Link key={member.person.id} to={`/person/${member.person.id}`}>
      <div
        key={member.person.id}
        className="
        rounded-lg bg-gray-600/40 
        backdrop-blur-sm"
      >
        <div id="imageContainer" className="relative">
          {member.person.image && (
            <motion.img
              layoutId={`person-${member.person.id}`}
              src={member.person.image.medium}
              alt={member.person.name}
              className="
                mb-2 h-60 w-full 
                rounded-t-lg
                object-cover
                z-999"
            />
          )}
          {!member.person.image && (
            <div
              className="
                h-60 w-full rounded-t-lg bg-none 
                flex flex-col items-center justify-center 
                text-gray-500/60 font-medium"
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
