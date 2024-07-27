import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpCircle, ExternalLink } from 'lucide-react';

const Index = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=100');
      const data = await response.json();
      setStories(data.hits);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
    setLoading(false);
  };

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-gray-100">
      <div className="container mx-auto p-4 pt-8">
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-orange-400 to-pink-500 text-transparent bg-clip-text">Top 100 Hacker News Stories</h1>
        <div className="mb-8 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search stories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 text-gray-100 border-gray-700 focus:border-orange-500 placeholder-gray-400"
          />
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, index) => (
              <Card key={index} className="w-full h-40 animate-pulse bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
                <CardContent className="h-full bg-gradient-to-br from-gray-700 to-gray-800"></CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <Card key={story.objectID} className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-orange-500 transition-all duration-300 shadow-lg hover:shadow-orange-500/20">
                <CardHeader>
                  <CardTitle className="text-lg text-orange-400">{story.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <ArrowUpCircle className="w-4 h-4 mr-2 text-orange-500" />
                    <span>{story.points} points</span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => window.open(story.url, '_blank')}
                    className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-gray-100 hover:from-orange-500 hover:to-pink-600 transition-all duration-300 border-none"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
