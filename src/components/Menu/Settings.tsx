import { useGameStore } from "../../store/useGameStore";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes panelReveal {
    from { opacity: 0; transform: scale(0.96) translateY(20px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  .settings-panel { animation: panelReveal 0.6s cubic-bezier(0.16,1,0.3,1) both; }
  .setting-row     { animation: fadeInUp 0.55s cubic-bezier(0.16,1,0.3,1) both; }

  .ludo-toggle {
    width: 58px;
    height: 32px;
    border-radius: 16px;
    border: none;
    cursor: pointer;
    position: relative;
    background: rgba(60,60,90,0.7);
    transition: background 0.35s ease;
    flex-shrink: 0;
    outline: none;
    box-shadow: inset 0 2px 6px rgba(0,0,0,0.4);
  }

  .ludo-toggle::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(145deg, #e0e0ff, #a0a0cc);
    box-shadow: 0 3px 10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08);
    transition: transform 0.35s cubic-bezier(0.34,1.6,0.64,1);
  }

  .ludo-toggle.on {
    background: linear-gradient(90deg, #4caf50 0%, #66bb6a 100%);
  }
  .ludo-toggle.on::after {
    transform: translateX(26px);
    background: white;
    box-shadow: 0 3px 12px rgba(76,175,80,0.6);
  }

  .ludo-select {
    min-width: 140px;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    color: #e0e0ff;
    background: rgba(35,35,70,0.65);
    border: 1.5px solid rgba(100,100,180,0.35);
    border-radius: 12px;
    padding: 9px 32px 9px 14px;
    outline: none;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23a0a0cc' stroke-width='1.8' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    transition: all 0.25s ease;
  }

  .ludo-select:focus,
  .ludo-select:hover {
    border-color: rgba(100,140,255,0.6);
    background-color: rgba(50,50,90,0.8);
    box-shadow: 0 0 14px rgba(66,165,245,0.25);
  }

  .ludo-select option {
    background: #0f001a;
    color: #e0e0ff;
  }

  .back-btn {
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    font-size: 1rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(200,200,240,0.7);
    background: rgba(30,30,60,0.5);
    border: 1.5px solid rgba(100,100,180,0.3);
    border-radius: 50px;
    padding: 12px 36px;
    cursor: pointer;
    transition: all 0.25s ease;
    margin-top: 32px;
  }

  .back-btn:hover {
    color: white;
    background: rgba(50,50,90,0.7);
    border-color: rgba(100,140,255,0.5);
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(66,165,245,0.2);
  }
`;

const Row = ({
  delay,
  icon,
  iconColor,
  label,
  control,
}: {
  delay: string;
  icon: string;
  iconColor: string;
  label: string;
  control: React.ReactNode;
}) => (
  <>
    <div className="setting-row" style={{ animationDelay: delay }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "16px 0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: `rgba(${iconColor}, 0.18)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.25rem",
              color: `rgba(${iconColor}, 0.9)`,
              boxShadow: `0 0 12px rgba(${iconColor}, 0.25)`,
            }}
          >
            {icon}
          </div>
          <span
            style={{
              color: "rgba(220,220,255,0.92)",
              fontWeight: 600,
              fontSize: "1.05rem",
            }}
          >
            {label}
          </span>
        </div>

        {control}
      </div>
    </div>

    <div
      style={{
        height: "1px",
        background:
          "linear-gradient(90deg, transparent, rgba(100,100,180,0.15), transparent)",
        margin: "0 8px",
      }}
    />
  </>
);

export const Settings = () => {
  const { isMusicEnabled, toggleMusic, setScreen } = useGameStore();

  return (
    <>
      <style>{styles}</style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "420px",
          padding: "0 16px",
          userSelect: "none",
        }}
      >
        <div
          className="settings-panel"
          style={{
            width: "100%",
            background: "rgba(18, 15, 45, 0.58)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(100, 120, 220, 0.22)",
            borderRadius: "28px",
            padding: "32px 28px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          }}
        >
          {/* Titre */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <h2
              style={{
                fontSize: "2.1rem",
                fontWeight: 900,
                letterSpacing: "0.08em",
                background:
                  "linear-gradient(90deg, #c62828, #1565c0, #2e7d32, #f9a825, #c62828)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200%",
                animation: "titleGradient 14s linear infinite",
                margin: 0,
              }}
            >
              RÉGLAGES
            </h2>
          </div>

          <Row
            delay="0.15s"
            icon="♪"
            iconColor="76,175,80"
            label="Musique d’ambiance"
            control={
              <button
                className={`ludo-toggle ${isMusicEnabled ? "on" : ""}`}
                onClick={toggleMusic}
              />
            }
          />

          <Row
            delay="0.25s"
            icon="🔔"
            iconColor="66,165,245"
            label="Effets sonores"
            control={
              <button
                className="ludo-toggle on"
                // À implémenter si tu ajoutes le state plus tard
              />
            }
          />

          <Row
            delay="0.35s"
            icon="✨"
            iconColor="255,193,7"
            label="Qualité visuelle"
            control={
              <select className="ludo-select" defaultValue="high">
                <option value="ultra">Ultra</option>
                <option value="high">Élevée</option>
                <option value="medium">Moyenne</option>
                <option value="low">Basse</option>
              </select>
            }
          />
        </div>

        <button className="back-btn" onClick={() => setScreen("menu")}>
          ← Retour
        </button>
      </div>

      <style jsx global>{`
        @keyframes titleGradient {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>
    </>
  );
};
