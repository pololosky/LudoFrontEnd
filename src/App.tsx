import { useEffect, useRef } from "react";
import { useGameStore } from "./store/useGameStore";
import { MainMenu } from "./components/Menu/MainMenu";
import { Settings } from "./components/Menu/Settings";
import { NewGame } from "./components/Menu/NewGame";
import { LudoScene } from "./components/Menu/LudoScene";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap');

  @keyframes subtleFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50%      { transform: translateY(-10px) scale(1.03); }
  }

  @keyframes softPulse {
    0%, 100% { opacity: 0.12; }
    50%      { opacity: 0.28; }
  }

  .ludo-pawn {
    animation: subtleFloat 7s ease-in-out infinite;
    filter: drop-shadow(0 8px 20px var(--pawn-shadow));
  }

  .ludo-glow {
    animation: softPulse 12s ease-in-out infinite;
  }
`;

const PawnSVG = ({
  color,
  light,
  dark,
  size = 44,
}: {
  color: string;
  light: string;
  dark: string;
  size?: number;
}) => (
  <svg width={size} height={size * 1.18} viewBox="0 0 40 48" fill="none">
    <ellipse cx="20" cy="42" rx="13" ry="5" fill={dark} opacity="0.65" />
    <circle cx="20" cy="14" r="11" fill={color} />
    <rect x="12" y="23" width="16" height="14" rx="8" fill={color} />
    <circle cx="20" cy="14" r="8" fill={light} opacity="0.5" />
  </svg>
);

const PAWNS = [
  {
    color: "#c62828",
    light: "#ef5350",
    dark: "#8e0000",
    top: "8%",
    left: "6%",
    size: 46,
    delay: "0.4s",
    shadow: "#c6282866",
  },
  {
    color: "#1565c0",
    light: "#42a5f5",
    dark: "#003c8f",
    top: "12%",
    right: "6%",
    size: 42,
    delay: "1.8s",
    shadow: "#1565c066",
  },
  {
    color: "#2e7d32",
    light: "#66bb6a",
    dark: "#1b5e20",
    bottom: "12%",
    left: "7%",
    size: 44,
    delay: "3.2s",
    shadow: "#2e7d3266",
  },
  {
    color: "#f9a825",
    light: "#ffca28",
    dark: "#c67c00",
    bottom: "9%",
    right: "8%",
    size: 40,
    delay: "2.6s",
    shadow: "#f9a82566",
  },
];

const BoardGrid = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      display: "grid",
      gridTemplateColumns: "repeat(15, 1fr)",
      gridTemplateRows: "repeat(15, 1fr)",
      opacity: 0.04,
      pointerEvents: "none",
    }}
  >
    {Array.from({ length: 225 }).map((_, i) => (
      <div key={i} style={{ border: "0.5px solid rgba(180,180,220,0.18)" }} />
    ))}
  </div>
);

const App = () => {
  const { currentScreen, isMusicEnabled } = useGameStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  const startAudio = () => {
    if (audioRef.current && isMusicEnabled) {
      audioRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      isMusicEnabled
        ? audioRef.current.play().catch(() => {})
        : audioRef.current.pause();
    }
  }, [isMusicEnabled]);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #0f001a 0%, #000000 70%)",
        fontFamily: "'Nunito', sans-serif",
        color: "#e0e0ff",
      }}
      onClick={startAudio}
    >
      <style>{styles}</style>
      <audio ref={audioRef} src="/assets/sounds/back01.mpp3" loop />

      {/* Fond subtil */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <BoardGrid />

        {/* Glows d'angles très discrets */}
        <div
          className="ludo-glow absolute"
          style={{
            top: "-10%",
            left: "-10%",
            width: "50%",
            height: "50%",
            background:
              "radial-gradient(circle at 20% 20%, rgba(200,40,40,0.14) 0%, transparent 65%)",
            animationDelay: "0s",
          }}
        />
        <div
          className="ludo-glow absolute"
          style={{
            top: "-10%",
            right: "-10%",
            width: "50%",
            height: "50%",
            background:
              "radial-gradient(circle at 80% 20%, rgba(30,90,200,0.14) 0%, transparent 65%)",
            animationDelay: "3s",
          }}
        />
        <div
          className="ludo-glow absolute"
          style={{
            bottom: "-10%",
            left: "-10%",
            width: "50%",
            height: "50%",
            background:
              "radial-gradient(circle at 20% 80%, rgba(40,140,60,0.14) 0%, transparent 65%)",
            animationDelay: "6s",
          }}
        />
        <div
          className="ludo-glow absolute"
          style={{
            bottom: "-10%",
            right: "-10%",
            width: "50%",
            height: "50%",
            background:
              "radial-gradient(circle at 80% 80%, rgba(220,160,40,0.14) 0%, transparent 65%)",
            animationDelay: "9s",
          }}
        />
      </div>

      {/* Pions décoratifs flottants (ambiance Ludo) */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        {PAWNS.map((p, i) => (
          <div
            key={i}
            className="ludo-pawn absolute"
            style={
              {
                top: p.top,
                left: (p as any).left,
                right: (p as any).right,
                bottom: (p as any).bottom,
                animationDelay: p.delay,
                "--pawn-shadow": p.shadow,
              } as React.CSSProperties
            }
          >
            <PawnSVG
              color={p.color}
              light={p.light}
              dark={p.dark}
              size={p.size}
            />
          </div>
        ))}
      </div>

      {/* Interface principale */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        {currentScreen === "menu" && (
          <div className="pointer-events-auto">
            <MainMenu />
          </div>
        )}
        {currentScreen === "settings" && (
          <div className="pointer-events-auto">
            <Settings />
          </div>
        )}
        {currentScreen === "new-game" && (
          <div className="pointer-events-auto">
            <NewGame />
          </div>
        )}
      </div>

      {/* Scène 3D : On l'affiche uniquement en mode jeu */}
      {currentScreen === "game" && (
        <div className="absolute inset-0 z-10">
          <LudoScene />
        </div>
      )}
    </div>
  );
};

export default App;
