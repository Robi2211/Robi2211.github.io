export function Topbar() {
  const today = new Date().toLocaleDateString('de-CH', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div>
        <p className="text-gray-500">{today}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="px-4 py-2 bg-blue-50 rounded-2xl">
          <p className="text-blue-700">Willkommen zurück!</p>
        </div>
      </div>
    </div>
  );
}
