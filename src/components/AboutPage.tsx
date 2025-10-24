import { Card } from './ui/card';
import { Award, Target, Users, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutPage() {
  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="space-y-4">
        <h1 className="text-gray-900">Über NotenManager</h1>
        <p className="text-gray-600 max-w-3xl">
          NotenManager ist die moderne Lösung für Studierende und Lernende, um ihre Noten 
          übersichtlich zu verwalten und den Überblick über ihre akademische Leistung zu behalten.
        </p>
      </div>

      {/* Hero Image */}
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1560719887-fe3105fa1e55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBib29rc3xlbnwxfHx8fDE3NjA4ODM1NjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Studierende beim Lernen"
          className="w-full h-64 sm:h-96 object-cover"
        />
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-6 rounded-2xl hover:shadow-lg transition-shadow">
          <div className="p-3 bg-blue-50 rounded-2xl w-fit mb-4">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-gray-900 mb-2">Übersichtlich</h3>
          <p className="text-gray-600">
            Alle deine Noten auf einen Blick organisiert
          </p>
        </Card>

        <Card className="p-6 rounded-2xl hover:shadow-lg transition-shadow">
          <div className="p-3 bg-emerald-50 rounded-2xl w-fit mb-4">
            <Zap className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-gray-900 mb-2">Schnell</h3>
          <p className="text-gray-600">
            Noten in Sekunden erfassen und aktualisieren
          </p>
        </Card>

        <Card className="p-6 rounded-2xl hover:shadow-lg transition-shadow">
          <div className="p-3 bg-purple-50 rounded-2xl w-fit mb-4">
            <Award className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-gray-900 mb-2">Automatisch</h3>
          <p className="text-gray-600">
            Durchschnitte werden automatisch berechnet
          </p>
        </Card>

        <Card className="p-6 rounded-2xl hover:shadow-lg transition-shadow">
          <div className="p-3 bg-amber-50 rounded-2xl w-fit mb-4">
            <Users className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-gray-900 mb-2">Individuell</h3>
          <p className="text-gray-600">
            Anpassbar für Module und Schulfächer
          </p>
        </Card>
      </div>

      {/* Mission Section with Images */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 sm:p-8 rounded-2xl">
          <h2 className="text-gray-900 mb-4">Unsere Mission</h2>
          <p className="text-gray-600 mb-4">
            Wir möchten Studierenden und Lernenden helfen, den Überblick über ihre 
            Leistungen zu behalten und ihre Ziele zu erreichen. Mit NotenManager wird 
            die Notenverwaltung zum Kinderspiel.
          </p>
          <p className="text-gray-600">
            Unser Tool ist speziell für Schweizer Berufsschulen und Gymnasien entwickelt 
            worden und berücksichtigt das lokale Notensystem.
          </p>
        </Card>

        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden shadow-md">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1655800466797-8ab2598b4274?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBjbGFzc3Jvb218ZW58MXx8fHwxNzYwODk5ODk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Klassenzimmer"
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1558478551-1a378f63328e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYwODYyMDA3fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Workspace"
              className="w-full h-48 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <Card className="p-6 sm:p-8 rounded-2xl">
        <h2 className="text-gray-900 mb-6">Unser Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white">
              <span className="text-2xl">MK</span>
            </div>
            <h3 className="text-gray-900">Max Keller</h3>
            <p className="text-gray-600">Gründer & Entwickler</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white">
              <span className="text-2xl">SM</span>
            </div>
            <h3 className="text-gray-900">Sarah Müller</h3>
            <p className="text-gray-600">UI/UX Design</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white">
              <span className="text-2xl">LB</span>
            </div>
            <h3 className="text-gray-900">Lukas Brunner</h3>
            <p className="text-gray-600">Backend Entwicklung</p>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 rounded-2xl text-center">
          <p className="text-blue-600">1.200+</p>
          <p className="text-gray-600 mt-1">Aktive Nutzer</p>
        </Card>
        <Card className="p-6 rounded-2xl text-center">
          <p className="text-emerald-600">15.000+</p>
          <p className="text-gray-600 mt-1">Noten erfasst</p>
        </Card>
        <Card className="p-6 rounded-2xl text-center">
          <p className="text-purple-600">98%</p>
          <p className="text-gray-600 mt-1">Zufriedenheit</p>
        </Card>
        <Card className="p-6 rounded-2xl text-center">
          <p className="text-amber-600">24/7</p>
          <p className="text-gray-600 mt-1">Verfügbar</p>
        </Card>
      </div>
    </div>
  );
}
