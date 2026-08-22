import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { completeTutorial, hasCompletedTutorial } from "../../utils/tutorial";
import type { TutorialStep } from "./homeTutorialSteps";

interface TutorialProps {
  steps: TutorialStep[];
  storageKey: string;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function Tutorial({ steps, storageKey }: TutorialProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(() => !hasCompletedTutorial(storageKey));
  const [step, setStep] = useState(0);
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const [cardStyle, setCardStyle] = useState<React.CSSProperties>({});
  const currentStep = steps[step];

  useLayoutEffect(() => {
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

      const cardHeight = cardRef.current?.getBoundingClientRect().height ?? 220;
      const gap = 20;
      const margin = 16;

      const spaceAbove = rect.top - margin;
      const spaceBelow = window.innerHeight - rect.bottom - margin;

      let top: number;

      // Prefer below
      if (spaceBelow >= cardHeight + gap) {
        top = rect.bottom + gap;
      }
      // Otherwise use above
      else if (spaceAbove >= cardHeight + gap) {
        top = rect.top - cardHeight - gap;
      }
      // Neither side is large enough
      else if (spaceBelow >= spaceAbove) {
        top = rect.bottom + gap;
      }
      // More space above
      else {
        top = margin;
      }

      // Keep the card inside the viewport
      top = Math.max(
        margin,
        Math.min(top, window.innerHeight - cardHeight - margin),
      );

      setCardStyle({
        top,
      });
    };

    updateRect();

    const observer = new ResizeObserver(() => {
      updateRect();
    });

    observer.observe(element);

    window.addEventListener("scroll", updateRect, true);

    const interval = window.setInterval(updateRect, 1000);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateRect, true);

      clearInterval(interval);
    };
  }, [open, step, currentStep.target]);

  useEffect(() => {
    if (!open) return;

    const frame = requestAnimationFrame(() => {
      setCardStyle((style) => ({ ...style }));
    });

    return () => cancelAnimationFrame(frame);
  }, [step, open]);

  useEffect(() => {
    if (!currentStep.waitFor) {
      return;
    }

    const handler = () => {
      if (step === steps.length - 1) {
        completeTutorial(storageKey);
        setOpen(false);
        return;
      }
      setStep((value) => value + 1);
    };

    window.addEventListener(currentStep.waitFor, handler);

    return () => {
      window.removeEventListener(currentStep.waitFor!, handler);
    };
  }, [currentStep]);

  if (!open || !currentStep) {
    return null;
  }

  const isFirst = step === 0;
  const isLast = step === steps.length - 1;

  function next() {
    if (isLast) {
      completeTutorial(storageKey);
      setOpen(false);
      return;
    }

    setStep((value) => value + 1);
  }

  function skip() {
    completeTutorial(storageKey);
    setOpen(false);
  }

  return createPortal(
    <div
      data-tutorial
      className={`
        fixed inset-0
        z-99999
        ${
          currentStep.clickThrough
            ? "pointer-events-none"
            : "pointer-events-auto"
        }
        `}
      // onPointerDown={(e) => e.stopPropagation()}
    >
      {!targetRect && <div className="absolute inset-0 bg-black/70" />}

      {/* Spotlight */}
      {targetRect && (
        <div
          className="
                absolute
                pointer-events-none
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
        ref={cardRef}
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
            overflow-y-auto
            "
        style={{ ...cardStyle, maxHeight: "calc(100vh - 2rem)" }}
        // onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-1 text-sm text-gray-400">
          Step {step + 1} of {steps.length}
        </div>

        <h2 className="mb-2 text-xl font-bold text-gray-50">
          {currentStep.title}
        </h2>

        <p className="mb-5 text-gray-200">{currentStep.text}</p>

        <div className="flex items-center gap-2">
          {!isFirst && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setStep((value) => value - 1);
              }}
              className="
                rounded-lg
                px-4 py-2
                text-gray-300
                hover:bg-gray-800
                pointer-events-auto
                "
            >
              Back
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              skip();
            }}
            className="
                ml-auto
                rounded-lg
                px-4 py-2
                text-gray-400
                hover:bg-gray-800
                pointer-events-auto
                "
          >
            Skip
          </button>

          {currentStep.waitFor ? (
            <span className="text-gray-400">Tap the highlighted element</span>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
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
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
