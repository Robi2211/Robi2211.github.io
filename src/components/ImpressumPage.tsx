import { Card } from './ui/card';
import { Building2, Mail, Phone, FileText } from 'lucide-react';

export function ImpressumPage() {
  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-gray-900">Impressum</h1>
        <p className="text-gray-600">
          Angaben gemäss Art. 8 UWG (Schweiz)
        </p>
      </div>

      {/* Company Info */}
      <Card className="p-6 sm:p-8 rounded-2xl">
        <div className="flex items-start gap-3 mb-6">
          <div className="p-2 bg-blue-50 rounded-xl">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-gray-900 mb-1">Betreiber der Website</h2>
            <p className="text-gray-600">Informationen zum Webseitenbetreiber</p>
          </div>
        </div>

        <div className="space-y-3 text-gray-700">
          <p>NotenManager GmbH</p>
          <p>Musterstrasse 123</p>
          <p>8000 Zürich</p>
          <p>Schweiz</p>
        </div>
      </Card>

      {/* Contact */}
      <Card className="p-6 sm:p-8 rounded-2xl">
        <h2 className="text-gray-900 mb-6">Kontakt</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-xl">
              <Mail className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-gray-600">E-Mail</p>
              <p className="text-gray-900">info@notenmanager.ch</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-xl">
              <Phone className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600">Telefon</p>
              <p className="text-gray-900">+41 44 123 45 67</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Legal Info */}
      <Card className="p-6 sm:p-8 rounded-2xl">
        <div className="flex items-start gap-3 mb-6">
          <div className="p-2 bg-amber-50 rounded-xl">
            <FileText className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 className="text-gray-900 mb-1">Handelsregister</h2>
          </div>
        </div>

        <div className="space-y-3 text-gray-700">
          <div>
            <p className="text-gray-600">UID-Nummer</p>
            <p className="text-gray-900">CHE-123.456.789 MWST</p>
          </div>
          <div>
            <p className="text-gray-600">Handelsregisternummer</p>
            <p className="text-gray-900">CH-020.3.123.456-7</p>
          </div>
          <div>
            <p className="text-gray-600">Registergericht</p>
            <p className="text-gray-900">Handelsregisteramt Zürich</p>
          </div>
        </div>
      </Card>

      {/* Disclaimer */}
      <Card className="p-6 sm:p-8 rounded-2xl">
        <h2 className="text-gray-900 mb-4">Haftungsausschluss</h2>
        <div className="space-y-4 text-gray-600">
          <div>
            <h3 className="text-gray-900 mb-2">Inhalt der Website</h3>
            <p>
              Die Inhalte dieser Website wurden mit grösstmöglicher Sorgfalt erstellt. 
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir 
              jedoch keine Gewähr übernehmen.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 mb-2">Links</h3>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte 
              wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch 
              keine Gewähr übernehmen.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 mb-2">Urheberrecht</h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten 
              unterliegen dem schweizerischen Urheberrecht. Die Vervielfältigung, Bearbeitung, 
              Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des Urheberrechtes 
              bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>
        </div>
      </Card>

      {/* Privacy */}
      <Card className="p-6 sm:p-8 rounded-2xl">
        <h2 className="text-gray-900 mb-4">Datenschutz</h2>
        <p className="text-gray-600 mb-3">
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. 
          Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der 
          gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
        </p>
        <p className="text-gray-600">
          Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten 
          möglich. Soweit auf unseren Seiten personenbezogene Daten erhoben werden, erfolgt 
          dies stets auf freiwilliger Basis.
        </p>
      </Card>

      {/* Last Updated */}
      <div className="text-center text-gray-500">
        <p>Stand: 19. Oktober 2025</p>
      </div>
    </div>
  );
}
