import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CheckCircle, Users, Zap, Shield, ArrowRight, PlayCircle, Menu, X } from 'lucide-react';
import * as classes from '../styles/tailwindLandingPage';

const LandingPage = ({ onNavigateToLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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
    <div className={classes.container}>
      {/* Navigation */}
      <nav className={classes.navContainer}>
        <div className={classes.navWrapper}>
          <div className={classes.navInner}>
            <div className={classes.logoWrapper}>
              <div className={classes.logoEmoji}>🚀</div>
              <span className={classes.logoText}>MY2DOLIST</span>
            </div>

            {/* Menu Desktop */}
            <div className={classes.menuDesktop}>
              <a href="#features" onClick={() => setIsMenuOpen(false)} className={classes.menuLink}>Fonctionnalités</a>
              <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className={classes.menuLink}>Témoignages</a>
              <a href="#pricing" onClick={() => setIsMenuOpen(false)} className={classes.menuLink}>Tarifs</a>
              <button onClick={() => navigate("/login")} className={classes.buttonLoginDesktop}>Se connecter</button>
            </div>

            {/* Toggle Mobile */}
            <div className={classes.toggleMobile}>
              <button aria-expanded={isMenuOpen} aria-label="Ouvrir le menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={classes.mobileMenu}>
              <a href="#features" onClick={() => setIsMenuOpen(false)} className={classes.mobileLink}>Fonctionnalités</a>
              <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className={classes.mobileLink}>Témoignages</a>
              <a href="#pricing" onClick={() => setIsMenuOpen(false)} className={classes.mobileLink}>Tarifs</a>
              <button onClick={() => { setIsMenuOpen(false); onNavigateToLogin?.(); }} className={classes.mobileButton}>Se connecter</button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className={classes.heroSection}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className={classes.heroTitle}>
              Gérez vos tâches
              <span className={classes.heroTitleGradient}>comme jamais</span>
            </h1>
            <p className={classes.heroSubtitle}>
              YallaBakhna révolutionne votre productivité avec une interface moderne, 
              des fonctionnalités intelligentes et une expérience utilisateur exceptionnelle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={() => navigate("/login")} className={classes.heroButtonPrimary}>
                <span>Commencer gratuitement</span>
                <ArrowRight className={classes.heroArrowIcon} />
              </button>
              <button className={classes.heroButtonSecondary}>
                <PlayCircle className={classes.heroPlayIcon}/>
                <span>Voir la démo</span>
              </button>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className={classes.heroImageWrapper}>
            <div className={classes.heroImageContainer}>
              <div className={classes.heroImageInner}>
                <div className={classes.heroTrafficLights}>
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className={classes.heroBar}>
                    <span className={classes.heroBarText}>app.yallabakhna.com</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className={classes.heroPlaceholderLine1}></div>
                  <div className={classes.heroPlaceholderLine2}></div>
                  <div className={classes.heroPlaceholderBoxes}>
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
      <section className={classes.statsSection}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={classes.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={classes.statsNumber}>{stat.number}</div>
                <div className={classes.statsLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={classes.featuresSection}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Fonctionnalités puissantes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez tous les outils dont vous avez besoin pour optimiser votre productivité
            </p>
          </div>

          <div className={classes.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={classes.featureCard}>
                <div className={classes.featureIconWrapper}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={classes.featureTitle}>{feature.title}</h3>
                <p className={classes.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={classes.ctaSection}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={classes.ctaTitle}>Prêt à transformer votre productivité ?</h2>
          <p className={classes.ctaSubtitle}>
            Rejoignez des milliers d'utilisateurs qui ont déjà adopté YallaBakhna 
            pour optimiser leur gestion de tâches.
          </p>
          <button onClick={onNavigateToLogin} className={classes.ctaButton}>Commencer maintenant</button>
        </div>
      </section>

      {/* Footer */}
      <footer className={classes.footerSection}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={classes.footerGrid}>
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <span className={classes.footerLogo}>YallaBakhna</span>
              </div>
              <p className={classes.footerText}>
                La solution ultime pour optimiser votre productivité et celle de votre équipe.
              </p>
            </div>
            <div>
              <h3 className={classes.footerTitle}>Produit</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className={classes.footerLink}>Fonctionnalités</a></li>
                <li><a href="#" className={classes.footerLink}>Tarifs</a></li>
                <li><a href="#" className={classes.footerLink}>API</a></li>
              </ul>
            </div>
            <div>
              <h3 className={classes.footerTitle}>Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className={classes.footerLink}>Documentation</a></li>
                <li><a href="#" className={classes.footerLink}>Contact</a></li>
                <li><a href="#" className={classes.footerLink}>Status</a></li>
              </ul>
            </div>
          </div>
          <div className={classes.footerBottom}>
            <p>&copy; 2024 YallaBakhna. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
