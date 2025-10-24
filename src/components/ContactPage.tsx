import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ContactPage() {
  // Lade den initialen Zustand aus dem localStorage oder nutze leere Werte
  const [formData, setFormData] = useState(() => {
    try {
      const savedData = localStorage.getItem('contactFormData');
      return savedData
        ? JSON.parse(savedData)
        : { name: '', email: '', subject: '', message: '' };
    } catch (error) {
      console.error('Fehler beim Lesen aus dem localStorage:', error);
      return { name: '', email: '', subject: '', message: '' };
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Speichere Änderungen im Formular automatisch im localStorage
  useEffect(() => {
    try {
      localStorage.setItem('contactFormData', JSON.stringify(formData));
    } catch (error) {
      console.error('Fehler beim Schreiben in den localStorage:', error);
    }
  }, [formData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Betreff ist erforderlich';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Nachricht ist erforderlich';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Nachricht muss mindestens 10 Zeichen lang sein';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      toast.success('Nachricht erfolgreich gesendet!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      localStorage.removeItem('contactFormData'); // Leere den Speicher nach dem Senden
    } else {
      toast.error('Bitte überprüfen Sie Ihre Eingaben');
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-gray-900">Kontakt</h1>
        <p className="text-gray-600 max-w-3xl">
          Haben Sie Fragen oder Anregungen? Wir freuen uns auf Ihre Nachricht!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card className="p-6 sm:p-8 rounded-2xl">
          <h2 className="text-gray-900 mb-6">Schreiben Sie uns</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="Ihr Name"
                className="rounded-xl"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              {errors.name && (
                <p className="text-red-600">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-Mail *</Label>
              <Input
                id="email"
                type="email"
                placeholder="ihre.email@beispiel.ch"
                className="rounded-xl"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Betreff *</Label>
              <Input
                id="subject"
                placeholder="Worum geht es?"
                className="rounded-xl"
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
              />
              {errors.subject && (
                <p className="text-red-600">{errors.subject}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Nachricht *</Label>
              <Textarea
                id="message"
                placeholder="Ihre Nachricht..."
                className="rounded-xl min-h-32"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
              />
              {errors.message && (
                <p className="text-red-600">{errors.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full rounded-2xl gap-2">
              <Send className="w-4 h-4" />
              Nachricht senden
            </Button>
          </form>
        </Card>

        {/* Contact Info & Image */}
        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NjA4NjAwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Team Collaboration"
              className="w-full h-48 sm:h-64 object-cover"
            />
          </div>

          <Card className="p-6 rounded-2xl">
            <h2 className="text-gray-900 mb-4">Kontaktinformationen</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-900">E-Mail</p>
                  <p className="text-gray-600">info@notenmanager.ch</p>
                  <p className="text-gray-600">support@notenmanager.ch</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-50 rounded-xl">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-gray-900">Telefon</p>
                  <p className="text-gray-600">+41 44 123 45 67</p>
                  <p className="text-gray-500">Mo-Fr: 08:00 - 17:00</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-900">Adresse</p>
                  <p className="text-gray-600">Musterstrasse 123</p>
                  <p className="text-gray-600">8000 Zürich</p>
                  <p className="text-gray-600">Schweiz</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-blue-100">
            <h3 className="text-gray-900 mb-2">Öffnungszeiten Support</h3>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Montag - Freitag</span>
                <span>08:00 - 17:00</span>
              </div>
              <div className="flex justify-between">
                <span>Samstag</span>
                <span>09:00 - 13:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sonntag</span>
                <span>Geschlossen</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
