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
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-orange-500">Top 100 Hacker News Stories</h1>
        <div className="mb-6 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search stories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 text-gray-100 border-gray-700 focus:border-orange-500"
          />
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, index) => (
              <Card key={index} className="w-full h-40 animate-pulse bg-gray-800 border-gray-700">
                <CardContent className="h-full bg-gray-700"></CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <Card key={story.objectID} className="bg-gray-800 border-gray-700 hover:border-orange-500 transition-colors duration-300">
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
                    className="w-full bg-gray-700 text-orange-400 hover:bg-orange-500 hover:text-gray-900 transition-colors duration-300"
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
