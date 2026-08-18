import { useEffect, useState } from "react";
import { completeTutorial, hasCompletedTutorial } from "../../utils/tutorial";
import { tutorialSteps } from "./tutorialSteps";

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function Tutorial() {
  const [open, setOpen] = useState(() => !hasCompletedTutorial());

  const [step, setStep] = useState(0);
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const [cardStyle, setCardStyle] = useState<React.CSSProperties>({});

  const currentStep = tutorialSteps[step];

  useEffect(() => {
    if (!open || !currentStep.target) {
      setTargetRect(null);
      return;
    }

    const element = document.getElementById(currentStep.target);

    if (!element) {
      setTargetRect(null);
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    const updateRect = () => {
      const rect = element.getBoundingClientRect();

      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });

      const cardHeight = 220;
      const gap = 20;

      const spaceBelow = window.innerHeight - rect.bottom;

      const showBelow = spaceBelow > cardHeight + gap;

      setCardStyle({
        top: showBelow ? rect.bottom + gap : rect.top - cardHeight - gap,
      });
    };

    updateRect();

    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect);

    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
    };
  }, [open, step, currentStep.target]);

  if (!open) {
    return null;
  }

  const isFirst = step === 0;
  const isLast = step === tutorialSteps.length - 1;

  function next() {
    if (isLast) {
      completeTutorial();
      setOpen(false);
      return;
    }

    setStep((value) => value + 1);
  }

  function skip() {
    completeTutorial();
    setOpen(false);
  }

  return (
    <div
      className="
        fixed inset-0
        z-20000
        pointer-events-none
        "
    >
      {!targetRect && <div className="absolute inset-0 bg-black/70" />}

      {/* Spotlight */}
      {targetRect && (
        <div
          className="
                absolute
                rounded-lg
                ring-4
                ring-white/80
                shadow-[0_0_0_9999px_rgba(0,0,0,0.7)]
                transition-all
                duration-300
                "
          style={{
            top: targetRect.top - 6,
            left: targetRect.left - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12,
          }}
        />
      )}

      {/* Tutorial card */}
      <div
        className="
            pointer-events-auto
            absolute
            left-1/2
            w-[calc(100%-2rem)]
            max-w-md
            -translate-x-1/2
            rounded-xl
            bg-gray-900
            p-5
            shadow-2xl
            text-white
            "
        style={cardStyle}
      >
        <div className="mb-1 text-sm text-gray-400">
          Step {step + 1} of {tutorialSteps.length}
        </div>

        <h2 className="mb-2 text-xl font-bold text-gray-50">
          {currentStep.title}
        </h2>

        <p className="mb-5 text-gray-200">{currentStep.text}</p>

        <div className="flex items-center gap-2">
          {!isFirst && (
            <button
              onClick={() => setStep((value) => value - 1)}
              className="
                rounded-lg
                px-4 py-2
                text-gray-300
                hover:bg-gray-800
                "
            >
              Back
            </button>
          )}

          <button
            onClick={skip}
            className="
                ml-auto
                rounded-lg
                px-4 py-2
                text-gray-400
                hover:bg-gray-800
                "
          >
            Skip
          </button>

          <button
            onClick={next}
            className="
                rounded-lg
                bg-blue-600
                px-4 py-2
                font-semibold
                text-white
                hover:bg-blue-500
                "
          >
            {isLast ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
