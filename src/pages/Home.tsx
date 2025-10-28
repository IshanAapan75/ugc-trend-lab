import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      content: "This platform transformed our content creation process. We're generating viral content 10x faster!",
      avatar: "SJ",
    },
    {
      name: "Mike Chen",
      role: "Social Media Manager",
      content: "The UGC video generator is a game-changer. Our engagement rates have doubled in just one month.",
      avatar: "MC",
    },
    {
      name: "Emma Williams",
      role: "Content Creator",
      content: "Finally, an AI tool that actually understands what makes content go viral. Absolutely love it!",
      avatar: "EW",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Supercharge Your Marketing with{" "}
                <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  AI
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Create UGC-style videos and AI-powered social content in seconds. 
                Transform your marketing workflow with cutting-edge AI technology.
              </p>
              <Link to="/ugc-generator">
                <Button variant="hero" size="lg" className="group">
                  Try It Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="animate-scale-in">
              <img 
                src={heroImage} 
                alt="AI Marketing Platform" 
                className="rounded-2xl shadow-glow w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful AI Tools for Modern Marketers</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to create viral content
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-soft hover:shadow-medium transition-all border-2 hover:border-primary/20 group cursor-pointer animate-fade-in">
              <Link to="/ugc-generator">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Video className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl">UGC Video Generator</CardTitle>
                  <CardDescription className="text-base">
                    Turn your product image into engaging influencer-style videos instantly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full group-hover:bg-accent">
                    Try It
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Link>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-all border-2 hover:border-primary/20 group cursor-pointer animate-fade-in">
              <Link to="/content-intelligence">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl">AI Content Intelligence</CardTitle>
                  <CardDescription className="text-base">
                    Discover trending topics and auto-generate viral posts for any platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full group-hover:bg-accent">
                    Explore It
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by Marketers Worldwide</h2>
            <p className="text-xl text-muted-foreground">
              See what our users have to say
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-all animate-fade-in">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">AI Marketing Pro</span>
            </div>
            
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">About</a>
              <a href="#" className="hover:text-primary transition-colors">Pricing</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2025 AI Marketing Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
