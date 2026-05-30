export const metadata = {
  title: "Home V1 — Futuristic | BMI Housing",
  description:
    "Bengaluru Metro City Infrastructure Housing Co-Operative Society — premium interactive experience.",
};

export default function HomeV1Layout({ children }) {
  return (
    <>
      {/* Override the global overflow:hidden so this page can scroll */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;600;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        html, body {
          overflow: auto !important;
          height: auto !important;
          background: #ffffff !important;
          width: 100% !important;
          max-width: 100vw !important;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }
        .kannada { font-family: 'Noto Sans Kannada', sans-serif; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #ffffff; }
        ::-webkit-scrollbar-thumb { background: #16a34a55; border-radius: 4px; }

        /* Android: prevent input zoom */
        @media screen and (max-width: 768px) {
          input, select, textarea { font-size: 16px !important; }
        }
        /* Android: remove tap flash */
        * { -webkit-tap-highlight-color: transparent; }
        /* Ensure images don't overflow */
        img { max-width: 100%; height: auto; }
        /* Fix fixed elements on Android when keyboard is open */
        .fixed-bottom-safe { padding-bottom: env(safe-area-inset-bottom, 0px); }
      ` }} />
      {children}
    </>
  );
}
