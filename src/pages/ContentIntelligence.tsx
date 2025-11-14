import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Instagram, Linkedin, Facebook, Twitter, FileText, ArrowLeft, Copy, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { RichTextEditor } from "@/components/RichTextEditor";

type Platform = {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  color: string;
  fields: {
    topic: string;
    outline: string;
  };
};

const platforms: Platform[] = [
  {
    id: "linkedin",
    name: "LinkedIn Post Generator",
    icon: Linkedin,
    description: "An AI tool that serves as your personal LinkedIn post writer, generating catchy and viral-worthy post chosen language.",
    color: "text-blue-600",
    fields: {
      topic: "Enter LinkedIn post topic",
      outline: "Enter LinkedIn post outline here",
    },
  },
  {
    id: "instagram",
    name: "Instagram Post Generator",
    icon: Instagram,
    description: "An AI tool that serves as your personal Instagram post writer, generating catchy and viral-worthy post chosen language.",
    color: "text-pink-600",
    fields: {
      topic: "Enter Instagram post topic",
      outline: "Enter Instagram post outline here",
    },
  },
  {
    id: "facebook",
    name: "Facebook Post Generator",
    icon: Facebook,
    description: "An AI tool that serves as your personal Facebook post writer, generating catchy and viral-worthy post chosen language.",
    color: "text-blue-500",
    fields: {
      topic: "Enter Facebook post topic",
      outline: "Enter Facebook post outline here",
    },
  },
  {
    id: "twitter",
    name: "Twitter Post Generator",
    icon: Twitter,
    description: "An AI tool that serves as your personal Twitter post writer, generating catchy and viral-worthy post chosen language.",
    color: "text-sky-500",
    fields: {
      topic: "Enter Twitter post topic",
      outline: "Enter Twitter post outline here",
    },
  },
  {
    id: "blog",
    name: "Blog Post Generator",
    icon: FileText,
    description: "An AI tool that serves as your personal blog post writer, generating catchy and viral-worthy post chosen language.",
    color: "text-purple-600",
    fields: {
      topic: "Enter blog post topic",
      outline: "Enter blog post outline here",
    },
  },
];

const ContentIntelligence = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [topic, setTopic] = useState("");
  const [outline, setOutline] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const { toast } = useToast();

  const handleCardClick = (platform: Platform) => {
    setSelectedPlatform(platform);
    setTopic("");
    setOutline("");
    setGeneratedContent("");
  };

  const handleBack = () => {
    setSelectedPlatform(null);
    setTopic("");
    setOutline("");
    setGeneratedContent("");
  };

  const handleGenerate = async () => {
    if (!topic || !outline) {
      toast({
        title: "Missing Information",
        description: "Please fill in both topic and outline fields",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("https://n8n.welz.in/webhook/social", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform: selectedPlatform?.id,
          topic: topic,
          outline: outline,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      const data = await response.json();
      setGeneratedContent(data.content || "Content generated successfully!");
      
      toast({
        title: "Content Generated!",
        description: "Your AI-powered content is ready",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
      console.error("Error generating content:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    });
  };

  if (selectedPlatform) {
    const Icon = selectedPlatform.icon;
    
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />
        
        <div className="pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-7xl">
            <Button
              onClick={handleBack}
              variant="default"
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Panel - Input Form */}
              <Card className="shadow-medium">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className={`w-16 h-16 rounded-xl bg-background flex items-center justify-center ${selectedPlatform.color}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <CardTitle className={selectedPlatform.color}>
                        {selectedPlatform.name}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {selectedPlatform.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="topic">{selectedPlatform.fields.topic}</Label>
                    <Input
                      id="topic"
                      placeholder={selectedPlatform.fields.topic}
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="outline">{selectedPlatform.fields.outline}</Label>
                    <Textarea
                      id="outline"
                      placeholder={selectedPlatform.fields.outline}
                      value={outline}
                      onChange={(e) => setOutline(e.target.value)}
                      rows={6}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground">Note: Max 2000 Words</p>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full"
                    variant="hero"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generate Content"
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Right Panel - Result */}
              <Card className="shadow-medium">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Your Result</CardTitle>
                    {generatedContent && (
                      <Button
                        onClick={copyToClipboard}
                        variant="default"
                        size="sm"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {isGenerating ? (
                    <div className="flex items-center justify-center py-20">
                      <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    </div>
                  ) : (
                    <RichTextEditor 
                      content={generatedContent || "<p>Start generating content to see it here...</p>"}
                      onChange={setGeneratedContent}
                      editable={true}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                AI-Powered
              </span>{" "}
              Social Media Content Generator
            </h1>
            <p className="text-xl text-muted-foreground">
              Generate engaging content for any platform with AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <Card
                  key={platform.id}
                  className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 hover:border-primary/50"
                  onClick={() => handleCardClick(platform)}
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-background flex items-center justify-center mb-3 ${platform.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{platform.name}</CardTitle>
                    <CardDescription className="text-sm line-clamp-3">
                      {platform.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentIntelligence;
