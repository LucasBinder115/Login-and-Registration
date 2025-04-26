export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-purple-800 mb-8">
          Bem-vindo ao RYTHMO
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Sua plataforma musical
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cards de features */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:transform hover:scale-105 transition-all">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">Catálogo</h3>
            <p className="text-gray-600">Organize suas músicas e álbuns</p>
          </div>
          {/* Repetir para outros cards */}
        </div>
      </div>
    </div>
  );
}