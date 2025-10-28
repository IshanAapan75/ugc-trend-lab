import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { TrendingUp, Sparkles, Copy, Edit, Loader2, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const ContentIntelligence = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentGenerated, setContentGenerated] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [platform, setPlatform] = useState("");
  const [emailMe, setEmailMe] = useState(false);
  const { toast } = useToast();

  const recentTrends = [
    "AI Marketing Tools",
    "Sustainable Fashion",
    "Remote Work Tips",
    "Healthy Meal Prep",
  ];

  const generatedPosts = [
    {
      platform: "LinkedIn",
      content: "🚀 Excited to share our latest insights on AI-powered marketing strategies that are transforming the industry...",
    },
    {
      platform: "Instagram",
      content: "✨ Game-changing tools that every marketer needs in 2025! Swipe to see our top picks 👉",
    },
  ];

  const handleAutoTrend = async () => {
    setIsGenerating(true);
    
    // TODO: Replace with actual n8n API call for auto-trend
    // await fetch('YOUR_N8N_WEBHOOK_URL', {
    //   method: 'POST',
    //   body: JSON.stringify({ type: 'auto-trend' })
    // });

    setTimeout(() => {
      setIsGenerating(false);
      setContentGenerated(true);
      toast({
        title: "Trending Topics Found!",
        description: "We've identified the top 2 trending topics for you",
      });
    }, 2000);
  };

  const handleDeepResearch = async () => {
    if (!keyword || !platform) {
      toast({
        title: "Missing Information",
        description: "Please enter a keyword and select a platform",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // TODO: Replace with actual n8n API call for deep research
    // await fetch('YOUR_N8N_WEBHOOK_URL', {
    //   method: 'POST',
    //   body: JSON.stringify({ 
    //     type: 'deep-research',
    //     keyword,
    //     platform,
    //     emailMe
    //   })
    // });

    setTimeout(() => {
      setIsGenerating(false);
      setContentGenerated(true);
      toast({
        title: "Content Generated!",
        description: emailMe ? "Content generated and sent to your email" : "Your AI-powered content is ready",
      });
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    });
  };

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
              Social Media Intelligence
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover trending topics and generate viral content for any platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Auto Trend Content */}
            <Card className="shadow-soft hover:shadow-medium transition-all animate-fade-in">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <CardTitle>Auto Trend Content</CardTitle>
                <CardDescription>
                  Automatically fetch the top 2 trending topics and generate content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleAutoTrend}
                  disabled={isGenerating}
                  variant="hero"
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Fetching Trends...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Fetch Top Trending Topics
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Deep Research Content */}
            <Card className="shadow-soft hover:shadow-medium transition-all animate-fade-in">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-secondary rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <CardTitle>Deep Research Content</CardTitle>
                <CardDescription>
                  Enter a custom keyword and platform for targeted content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="keyword">Keyword or Topic</Label>
                  <Input
                    id="keyword"
                    placeholder="e.g., AI Marketing"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger id="platform">
                      <SelectValue placeholder="Choose platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="x">X (Twitter)</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="email"
                    checked={emailMe}
                    onCheckedChange={(checked) => setEmailMe(checked as boolean)}
                  />
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email me this content
                  </label>
                </div>

                <Button
                  onClick={handleDeepResearch}
                  disabled={isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-5 h-5" />
                      Generate Content
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          {contentGenerated && !isGenerating && (
            <div className="space-y-8 animate-scale-in">
              <Card className="shadow-medium border-2 border-primary/20">
                <CardHeader>
                  <CardTitle>Generated Content</CardTitle>
                  <CardDescription>
                    AI-powered posts ready to publish or customize
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {generatedPosts.map((post, index) => (
                    <Card key={index} className="shadow-soft">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-gradient-primary text-white text-xs font-semibold rounded-full">
                              {post.platform}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(post.content)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-foreground">{post.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {emailMe && (
                <Card className="shadow-soft bg-accent/50 border-primary/20 animate-fade-in">
                  <CardContent className="py-6">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <p className="text-sm font-medium">
                        Content has been sent to your email address
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Recent Trends Section */}
          <Card className="mt-12 shadow-soft animate-fade-in">
            <CardHeader>
              <CardTitle>Recent Trending Topics</CardTitle>
              <CardDescription>
                Popular topics our AI has identified recently
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {recentTrends.map((trend, index) => (
                  <button
                    key={index}
                    onClick={() => setKeyword(trend)}
                    className="px-4 py-2 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-full text-sm font-medium transition-colors"
                  >
                    {trend}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentIntelligence;
