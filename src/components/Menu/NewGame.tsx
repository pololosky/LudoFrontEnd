import React from "react";
import { useGameStore } from "../../store/useGameStore";

export const NewGame = () => {
  const { playerCount, setPlayerCount, setScreen } = useGameStore();

  const options = [2, 3, 4];

  return (
    <div className="w-[450px] p-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-2xl text-center">
      <h2 className="text-4xl font-black mb-2 text-white tracking-tight">
        NOUVELLE PARTIE
      </h2>
      <p className="text-blue-200/60 mb-10 font-medium">
        Choisissez le nombre de compétiteurs
      </p>

      <div className="flex justify-center gap-4 mb-12">
        {options.map((num) => (
          <button
            key={num}
            onClick={() => setPlayerCount(num)}
            className={`
              relative w-20 h-24 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-2 border-2
              ${
                playerCount === num
                  ? "bg-blue-600/20 border-blue-400 scale-110 shadow-[0_0_30px_rgba(37,99,235,0.4)]"
                  : "bg-white/5 border-transparent hover:bg-white/10"
              }
            `}
          >
            <span
              className={`text-3xl font-bold ${playerCount === num ? "text-white" : "text-white/40"}`}
            >
              {num}
            </span>
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">
              Joueurs
            </span>

            {playerCount === num && (
              <div className="absolute -bottom-1 w-8 h-1 bg-blue-400 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Aperçu des couleurs actives */}
      <div className="flex justify-center gap-3 mb-10">
        {["#c62828", "#1565c0", "#2e7d32", "#f9a825"]
          .slice(0, playerCount)
          .map((color, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full animate-pulse"
              style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}` }}
            />
          ))}
      </div>

      <div className="space-y-4">
        <button
          onClick={() => setScreen("game")} // Ici le lien vers la scène 3D
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-2xl shadow-xl transition-transform active:scale-95"
        >
          LANCER LE MATCH
        </button>

        <button
          onClick={() => setScreen("menu")}
          className="w-full py-3 text-white/50 hover:text-white font-bold transition-colors"
        >
          ANNULER
        </button>
      </div>
    </div>
  );
};
