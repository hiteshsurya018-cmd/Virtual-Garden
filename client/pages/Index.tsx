import React, { useState, useRef, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Upload, 
  ZoomIn, 
  ZoomOut, 
  Camera, 
  Sun, 
  Moon, 
  Save, 
  RotateCcw, 
  Download, 
  Grid3X3, 
  Leaf,
  Heart,
  Shield,
  Sparkles,
  Eye,
  Brain
} from 'lucide-react';

interface DetectedPlant {
  id: string;
  name: string;
  confidence: number;
  category: 'immunity' | 'skincare' | 'digestive' | 'mental' | 'respiratory';
  description: string;
  image: string;
  benefits: string[];
}

interface PlantPosition {
  id: string;
  x: number;
  y: number;
  z: number;
  rotation: number;
}

// Sample detected plants data
const mockDetectedPlants: DetectedPlant[] = [
  {
    id: '1',
    name: 'Aloe Vera',
    confidence: 0.95,
    category: 'skincare',
    description: 'Known for its healing and moisturizing properties',
    image: '/placeholder.svg',
    benefits: ['Heals burns', 'Moisturizes skin', 'Anti-inflammatory']
  },
  {
    id: '2',
    name: 'Echinacea',
    confidence: 0.89,
    category: 'immunity',
    description: 'Powerful immune system booster',
    image: '/placeholder.svg',
    benefits: ['Boosts immunity', 'Fights infections', 'Reduces inflammation']
  },
  {
    id: '3',
    name: 'Lavender',
    confidence: 0.92,
    category: 'mental',
    description: 'Calming herb for relaxation and sleep',
    image: '/placeholder.svg',
    benefits: ['Reduces anxiety', 'Improves sleep', 'Natural antiseptic']
  },
  {
    id: '4',
    name: 'Peppermint',
    confidence: 0.87,
    category: 'digestive',
    description: 'Excellent for digestive health and freshness',
    image: '/placeholder.svg',
    benefits: ['Aids digestion', 'Relieves nausea', 'Antimicrobial']
  },
  {
    id: '5',
    name: 'Eucalyptus',
    confidence: 0.91,
    category: 'respiratory',
    description: 'Great for respiratory health and clarity',
    image: '/placeholder.svg',
    benefits: ['Clears congestion', 'Antibacterial', 'Decongestant']
  }
];

const categoryIcons = {
  immunity: Shield,
  skincare: Sparkles,
  digestive: Heart,
  mental: Brain,
  respiratory: Eye
};

const categoryColors = {
  immunity: 'bg-blue-100 text-blue-800',
  skincare: 'bg-pink-100 text-pink-800',
  digestive: 'bg-orange-100 text-orange-800',
  mental: 'bg-purple-100 text-purple-800',
  respiratory: 'bg-green-100 text-green-800'
};

// 3D Plant Component
function Plant3D({ position, color = '#22c55e', onClick }: { position: [number, number, number], color?: string, onClick?: () => void }) {
  const meshRef = useRef<any>();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group position={position} onClick={onClick}>
      <Box ref={meshRef} args={[0.5, 1, 0.5]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color={color} />
      </Box>
      <Sphere args={[0.3]} position={[0, 1.2, 0]}>
        <meshStandardMaterial color="#16a34a" />
      </Sphere>
    </group>
  );
}

export default function Index() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [detectedPlants, setDetectedPlants] = useState<DetectedPlant[]>([]);
  const [placedPlants, setPlacedPlants] = useState<PlantPosition[]>([]);
  const [showGrid, setShowGrid] = useState(true);
  const [cameraMode, setCameraMode] = useState<'orbit' | 'top'>('orbit');
  const [lightMode, setLightMode] = useState<'day' | 'night'>('day');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setIsAnalyzing(true);
      
      // Simulate AI analysis
      setTimeout(() => {
        setDetectedPlants(mockDetectedPlants);
        setIsAnalyzing(false);
      }, 2000);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const addPlantToGarden = (plant: DetectedPlant) => {
    const newPosition: PlantPosition = {
      id: `${plant.id}-${Date.now()}`,
      x: Math.random() * 4 - 2,
      y: 0,
      z: Math.random() * 4 - 2,
      rotation: Math.random() * Math.PI * 2
    };
    setPlacedPlants(prev => [...prev, newPosition]);
  };

  const resetGarden = () => {
    setPlacedPlants([]);
  };

  const saveLayout = () => {
    localStorage.setItem('virtualGarden', JSON.stringify(placedPlants));
    alert('Garden layout saved!');
  };

  const loadLayout = () => {
    const saved = localStorage.getItem('virtualGarden');
    if (saved) {
      setPlacedPlants(JSON.parse(saved));
      alert('Garden layout loaded!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-garden-50 to-nature-50">
      {/* Hero Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-garden-200/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-garden-900 mb-4">
              Create Your Own Virtual 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-garden-600 to-nature-600"> Medicinal Garden</span>
            </h1>
            <p className="text-xl text-garden-700 mb-8 max-w-2xl mx-auto">
              Upload your garden, detect plants with AI, and design a 3D healing space.
            </p>
          </div>

          {/* Upload Section */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload Panel */}
            <div className="lg:col-span-1">
              <Card className="h-full shadow-2xl border-garden-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-garden-900">
                    <Upload className="w-5 h-5" />
                    Upload Garden Image
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                      isDragging 
                        ? 'border-garden-500 bg-garden-50' 
                        : 'border-garden-300 hover:border-garden-400'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    {uploadedImage ? (
                      <div className="space-y-4">
                        <img 
                          src={uploadedImage} 
                          alt="Uploaded garden" 
                          className="w-full h-40 object-cover rounded-xl"
                        />
                        {isAnalyzing && (
                          <div className="flex items-center justify-center gap-2 text-garden-600">
                            <div className="animate-spin w-4 h-4 border-2 border-garden-300 border-t-garden-600 rounded-full"></div>
                            Analyzing plants...
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-12 h-12 mx-auto text-garden-400 mb-4" />
                        <p className="text-garden-600">Drop your garden image here</p>
                        <p className="text-sm text-garden-500 mt-2">or click to browse</p>
                      </div>
                    )}
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />
                  
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-garden-600 hover:bg-garden-700 text-white"
                  >
                    Choose File
                  </Button>
                </CardContent>
              </Card>

              {/* Detected Plants Sidebar */}
              {detectedPlants.length > 0 && (
                <Card className="mt-6 shadow-2xl border-garden-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-garden-900">
                      <Leaf className="w-5 h-5" />
                      Detected Plants ({detectedPlants.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {detectedPlants.map((plant) => {
                        const CategoryIcon = categoryIcons[plant.category];
                        return (
                          <TooltipProvider key={plant.id}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div 
                                  className="p-3 border border-garden-200 rounded-xl hover:bg-garden-50 cursor-pointer transition-all"
                                  onClick={() => addPlantToGarden(plant)}
                                >
                                  <div className="flex items-center gap-3">
                                    <img 
                                      src={plant.image} 
                                      alt={plant.name}
                                      className="w-12 h-12 rounded-lg object-cover bg-garden-100"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-medium text-garden-900 truncate">{plant.name}</h4>
                                        <Badge variant="secondary" className={`text-xs ${categoryColors[plant.category]}`}>
                                          <CategoryIcon className="w-3 h-3 mr-1" />
                                          {plant.category}
                                        </Badge>
                                      </div>
                                      <p className="text-xs text-garden-600 line-clamp-2">{plant.description}</p>
                                      <div className="mt-1">
                                        <div className="flex items-center gap-1">
                                          <div className="h-1 bg-garden-200 rounded-full flex-1">
                                            <div 
                                              className="h-1 bg-garden-600 rounded-full transition-all"
                                              style={{ width: `${plant.confidence * 100}%` }}
                                            />
                                          </div>
                                          <span className="text-xs text-garden-600">{Math.round(plant.confidence * 100)}%</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="right" className="max-w-xs">
                                <div className="space-y-2">
                                  <p className="font-medium">{plant.name}</p>
                                  <p className="text-sm">{plant.description}</p>
                                  <div className="space-y-1">
                                    <p className="text-xs font-medium">Benefits:</p>
                                    <ul className="text-xs space-y-1">
                                      {plant.benefits.map((benefit, i) => (
                                        <li key={i}>• {benefit}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* 3D Garden Editor */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] shadow-2xl border-garden-200 overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-garden-900">3D Garden Editor</CardTitle>
                    
                    {/* Floating Toolbar */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={saveLayout}
                        className="border-garden-300 hover:bg-garden-50"
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={loadLayout}
                        className="border-garden-300 hover:bg-garden-50"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Load
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetGarden}
                        className="border-garden-300 hover:bg-garden-50"
                      >
                        <RotateCcw className="w-4 h-4 mr-1" />
                        Reset
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowGrid(!showGrid)}
                        className={`border-garden-300 ${showGrid ? 'bg-garden-100' : 'hover:bg-garden-50'}`}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0 h-[500px] relative">
                  <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                    <ambientLight intensity={lightMode === 'day' ? 0.6 : 0.3} />
                    <pointLight position={[10, 10, 10]} intensity={lightMode === 'day' ? 1 : 0.5} />
                    <pointLight position={[-10, -10, -10]} intensity={0.3} />
                    
                    {/* Grid */}
                    {showGrid && (
                      <gridHelper args={[10, 10, '#22c55e', '#86d5a4']} />
                    )}
                    
                    {/* Ground */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                      <planeGeometry args={[10, 10]} />
                      <meshStandardMaterial color={lightMode === 'day' ? '#86d5a4' : '#16a34a'} />
                    </mesh>
                    
                    {/* Placed Plants */}
                    {placedPlants.map((plant) => (
                      <Plant3D 
                        key={plant.id}
                        position={[plant.x, plant.y, plant.z]}
                        onClick={() => {
                          setPlacedPlants(prev => prev.filter(p => p.id !== plant.id));
                        }}
                      />
                    ))}
                    
                    <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                  </Canvas>
                  
                  {/* Bottom Toolbar */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-garden-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full w-8 h-8 p-0"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full w-8 h-8 p-0"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-4 bg-garden-300" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCameraMode(cameraMode === 'orbit' ? 'top' : 'orbit')}
                      className="rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setLightMode(lightMode === 'day' ? 'night' : 'day')}
                      className="rounded-full w-8 h-8 p-0"
                    >
                      {lightMode === 'day' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 text-center">
            <p className="text-garden-600">
              Click on detected plants to add them to your 3D garden. Click on placed plants to remove them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
