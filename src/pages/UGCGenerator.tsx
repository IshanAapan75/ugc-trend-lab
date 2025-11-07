import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Video, Upload, Download, Share2, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const UGCGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    if (!file || !productName || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and upload a file",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('productName', productName);
      formData.append('description', description);
      
      const response = await fetch('https://n8n.welz.in/webhook-test/ugc-upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setVideoGenerated(true);
        toast({
          title: "Video Generated!",
          description: "Your UGC video is ready to download",
        });
      } else {
        toast({
          title: "Generation Failed",
          description: "There was an error generating your video. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to the server. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">
              Generate UGC Marketing Videos with{" "}
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                One Click
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Transform your product images into engaging influencer-style videos
            </p>
          </div>

          <Card className="shadow-medium border-2 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-6 h-6 text-primary" />
                Video Details
              </CardTitle>
              <CardDescription>
                Upload your product image and provide details to generate a professional UGC video
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="file-upload">Product Image or Video</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Input
                    id="file-upload"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">
                      {file ? file.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, MP4 (max. 50MB)
                    </p>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  placeholder="Enter your product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your product in a few sentences..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !file || !productName || !description}
                className="w-full"
                variant="hero"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Video...
                  </>
                ) : (
                  <>
                    <Video className="w-5 h-5" />
                    Generate Video
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {isGenerating && (
            <Card className="mt-8 shadow-soft animate-fade-in">
              <CardContent className="py-12">
                <div className="text-center space-y-4">
                  <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin" />
                  <div>
                    <p className="text-lg font-semibold mb-2">Creating Your Video...</p>
                    <p className="text-sm text-muted-foreground">
                      Our AI is generating an engaging UGC-style video for your product
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {videoGenerated && !isGenerating && (
            <Card className="mt-8 shadow-medium border-2 border-primary/20 animate-scale-in">
              <CardHeader>
                <CardTitle>Your Video is Ready!</CardTitle>
                <CardDescription>Preview and download your generated UGC video</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                  <Video className="w-16 h-16 text-muted-foreground" />
                  {/* Video player would go here */}
                </div>

                <div className="flex gap-4">
                  <Button variant="hero" className="flex-1">
                    <Download className="w-5 h-5" />
                    Download Video
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="w-5 h-5" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default UGCGenerator;
