import React, { useState, useEffect } from 'react';
import {  CheckCircle,   Users,   Zap,   Shield, ArrowRight,  PlayCircle,  Menu,  X } from 'lucide-react';

const LandingPage = ({ onNavigateToLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: CheckCircle,
      title: "Gestion intelligente",
      description: "Organisez vos tâches avec une interface intuitive et moderne"
    },
    {
      icon: Users,
      title: "Délégation facile",
      description: "Déléguez vos tâches à votre équipe en un seul clic"
    },
    {
      icon: Zap,
      title: "Productivité maximale",
      description: "Boostez votre efficacité avec des outils puissants"
    },
    {
      icon: Shield,
      title: "Sécurisé",
      description: "Vos données sont protégées avec un chiffrement avancé"
    }
  ];

  const stats = [
    { number: "10K+", label: "Utilisateurs actifs" },
    { number: "98%", label: "Satisfaction client" },
    { number: "50%", label: "Gain de productivité" },
    { number: "24/7", label: "Support disponible" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
    <nav className="fixed top-0 left-0 right-0 w-full z-50">
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🚀</div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                YallaBakhna
              </span>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-red-600 transition-colors">
                Fonctionnalités
              </a>
              <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-red-600 transition-colors">
                Témoignages
              </a>
              <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-red-600 transition-colors">
                Tarifs
              </a>
              <button
                onClick={() => { setIsMenuOpen(false); onNavigateToLogin?.(); }}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-full hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105"
              >
                Se connecter
              </button>
            </div>

            {/* Toggle Mobile */}
            <div className="md:hidden">
              <button
                aria-expanded={isMenuOpen}
                aria-label="Ouvrir le menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu (full width, aligné avec le container) */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-2 border-t border-gray-100">
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-red-600 py-2">
              Fonctionnalités
            </a>
            <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-red-600 py-2">
              Témoignages
            </a>
            <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-red-600 py-2">
              Tarifs
            </a>
            <button
              onClick={() => { setIsMenuOpen(false); onNavigateToLogin?.(); }}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full mt-2"
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </nav>


      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Gérez vos tâches
              <span className="block bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                comme jamais
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
              YallaBakhna révolutionne votre productivité avec une interface moderne, 
              des fonctionnalités intelligentes et une expérience utilisateur exceptionnelle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={onNavigateToLogin} className="group bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 flex items-center space-x-2 shadow-xl"  >
                <span>Commencer gratuitement</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors px-8 py-4 rounded-2xl border border-gray-200 hover:border-red-300">
                <PlayCircle className="w-5 h-5" />
                <span>Voir la démo</span>
              </button>
            </div>
          </div>

          {/* Hero Image/Video Placeholder */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="flex-1 bg-gray-100 h-8 rounded-lg flex items-center px-4">
                    <span className="text-sm text-gray-500">app.yallabakhna.com</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-red-200 to-red-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="flex space-x-4">
                    <div className="h-16 bg-red-100 rounded-lg flex-1"></div>
                    <div className="h-16 bg-red-200 rounded-lg flex-1"></div>
                    <div className="h-16 bg-red-50 rounded-lg flex-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Fonctionnalités puissantes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez tous les outils dont vous avez besoin pour optimiser votre productivité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à transformer votre productivité ?
          </h2>
          <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">
            Rejoignez des milliers d'utilisateurs qui ont déjà adopté YallaBakhna 
            pour optimiser leur gestion de tâches.
          </p>
          <button onClick={onNavigateToLogin} className="bg-white text-red-600 px-12 py-4 rounded-2xl text-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"  >
            Commencer maintenant
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  YallaBakhna
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                La solution ultime pour optimiser votre productivité et celle de votre équipe.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Produit</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 YallaBakhna. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;