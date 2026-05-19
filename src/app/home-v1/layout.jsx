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
        }
        .kannada { font-family: 'Noto Sans Kannada', sans-serif; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #ffffff; }
        ::-webkit-scrollbar-thumb { background: #16a34a55; border-radius: 4px; }
      ` }} />
      {children}
    </>
  );
}
