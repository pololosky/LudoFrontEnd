import { useGameStore } from "../../store/useGameStore";

export const MainMenu = () => {
  const setScreen = useGameStore((state) => state.setScreen);

  return (
    <div
      className="menu-overlay"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(10, 2, 20, 0.65)",
        backdropFilter: "blur(4px)",
        zIndex: 30,
        pointerEvents: "auto",
      }}
    >
      {/* Titre principal */}
      <div
        style={{
          marginBottom: "80px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <h1
          style={{
            fontSize: "5.8rem",
            fontWeight: 900,
            letterSpacing: "0.12em",
            color: "#e0e0ff",
            textShadow: `
              0 0 20px rgba(160, 140, 255, 0.5),
              0 0 40px rgba(100, 80, 220, 0.3)
            `,
            background:
              "linear-gradient(90deg, #c62828, #1565c0, #2e7d32, #f9a825, #c62828)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% 100%",
            animation: "titleGradient 12s linear infinite",
          }}
        >
          LUDO
          <br />
          BATTLE ROYAL
        </h1>

        <div
          style={{
            marginTop: "16px",
            fontSize: "1.4rem",
            color: "rgba(220,220,255,0.5)",
            letterSpacing: "0.4em",
            fontWeight: 500,
          }}
        >
          SURVIVAL • STRATEGY • CHAOS
        </div>
      </div>

      {/* Boutons */}
      <div
        className="button-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "min(420px, 80vw)",
        }}
      >
        {[
          { label: "Nouvelle Partie", screen: "new-game", color: "#ef5350" }, // CORRIGÉ : "new-game"
          { label: "Réglages", screen: "settings", color: "#42a5f5" },
          { label: "Quitter", screen: null, color: "#78909c" },
        ].map((btn) => (
          <button
            key={btn.label}
            className="button-hover-effect"
            onClick={() => btn.screen && setScreen(btn.screen as any)}
            style={{
              position: "relative",
              padding: "18px 0",
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#f0f0ff",
              background: "rgba(30, 30, 60, 0.7)",
              border: `2px solid ${btn.color}40`,
              borderRadius: "14px",
              cursor: "pointer",
              transition: "all 0.25s ease",
              boxShadow: `0 6px 20px ${btn.color}22`,
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = btn.color;
              e.currentTarget.style.boxShadow = `0 10px 30px ${btn.color}44`;
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${btn.color}40`;
              e.currentTarget.style.boxShadow = `0 6px 20px ${btn.color}22`;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              className="shine-effect"
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(90deg, transparent, ${btn.color}18, transparent)`,
                transform: "translateX(-100%)",
                transition: "transform 0.6s ease",
              }}
            />
            <span style={{ position: "relative", zIndex: 2 }}>{btn.label}</span>

            <div
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: btn.color,
                boxShadow: `0 0 12px ${btn.color}80`,
                opacity: 0.7,
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};