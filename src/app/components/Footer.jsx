export default function Footer() {
  return (
    <footer className="border-t border-pearl/10 py-12 px-6 lg:px-12 bg-slate-deep">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-pearl/40 text-[10px] tracking-[0.3em] uppercase">
        <div>© 2026 BMI Housing Co-Op Society Ltd.</div>
        <div className="flex items-center gap-3">
          <span className="w-1 h-1 rounded-full bg-gold" />
          <span>Bengaluru Metro City Infrastructure Housing</span>
          <span className="w-1 h-1 rounded-full bg-gold" />
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gold transition-colors">Privacy</a>
          <span className="w-3 h-px bg-pearl/20" />
          <a href="#" className="hover:text-gold transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
