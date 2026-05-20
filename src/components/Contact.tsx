import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Mic, Send, Users, Building2, MessageSquare } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    farmSize: "",
    crops: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const contactInfo = [
    {
      icon: Building2,
      title: "Development Partner",
      info: "Kerala Agriculture Department",
      detail: "In collaboration with KVKs & ICAR"
    },
    {
      icon: Users,
      title: "Farmer Support",
      info: "Kudumbashree Network",
      detail: "400,000+ women farmers"
    },
    {
      icon: Phone,
      title: "Helpline",
      info: "+91-XXX-XXX-XXXX",
      detail: "Available 9 AM - 6 PM"
    },
    {
      icon: Mail,
      title: "Email Support",
      info: "support@karshakansethu.gov.in",
      detail: "Response within 24 hours"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Get in
              <span className="block text-primary">Touch</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions about Karshakan Setu? Want to join our pilot program? 
              We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="feature-card">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your mobile number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="District, Kerala"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Farm Size</label>
                    <Input
                      name="farmSize"
                      value={formData.farmSize}
                      onChange={handleInputChange}
                      placeholder="In acres or hectares"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Crops Grown</label>
                  <Input
                    name="crops"
                    value={formData.crops}
                    onChange={handleInputChange}
                    placeholder="e.g., Cardamom, Rubber, Coconut"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your farming challenges or questions..."
                    rows={4}
                    required
                  />
                </div>

                <div className="flex space-x-3">
                  <Button type="submit" className="btn-hero flex-1">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  <Button type="button" variant="outline" size="icon">
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </form>

              {/* Funding Disclaimer */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Karshakan Setu is a research initiative. Implementation 
                  and funding are subject to government sanction and policy approvals.
                </p>
              </div>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <Card key={index} className="feature-card">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                          <p className="text-primary font-medium">{item.info}</p>
                          <p className="text-sm text-muted-foreground">{item.detail}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Office Location */}
              <Card className="feature-card">
                <h4 className="font-semibold text-foreground mb-4 flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  Project Office
                </h4>
                <p className="text-muted-foreground mb-2">
                  Kerala Agricultural University<br />
                  Vellanikkara, Thrissur - 680656<br />
                  Kerala, India
                </p>
                <div className="mt-4 h-32 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Interactive Map Coming Soon</p>
                </div>
              </Card>

              {/* Support Hours */}
              <Card className="feature-card">
                <h4 className="font-semibold text-foreground mb-4 flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                  Support Hours
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="text-foreground">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="text-foreground">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="text-foreground">Closed</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;