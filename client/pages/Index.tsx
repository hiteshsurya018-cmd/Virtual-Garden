import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Text, Environment, ContactShadows, Html } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
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
  Brain,
  Search,
  Filter,
  Star,
  Calendar,
  MapPin,
  Droplets,
  Thermometer,
  Clock,
  Award,
  TrendingUp,
  Users,
  BookOpen,
  Palette,
  Settings,
  Play,
  Pause,
  RotateCw,
  Move3D,
  Layers,
  Image as ImageIcon,
  X,
  Plus,
  Minus,
  Info,
  AlertTriangle,
  CheckCircle,
  Archive,
  Share2,
  Copy
} from 'lucide-react';
import * as THREE from 'three';

interface DetectedPlant {
  id: string;
  name: string;
  scientificName: string;
  confidence: number;
  category: 'immunity' | 'skincare' | 'digestive' | 'mental' | 'respiratory' | 'anti-inflammatory';
  description: string;
  image: string;
  benefits: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  harvestTime: string;
  growingConditions: {
    sunlight: 'full' | 'partial' | 'shade';
    water: 'low' | 'medium' | 'high';
    soil: string;
    temperature: string;
  };
  medicinalUses: string[];
  preparations: string[];
  warnings: string[];
  rating: number;
  reviews: number;
  detectionMetadata?: {
    boundingBox: { x: number; y: number; width: number; height: number };
    imageQuality: number;
    lightingCondition: 'excellent' | 'good' | 'poor';
    plantHealth: 'healthy' | 'stressed' | 'diseased';
    growthStage: 'seedling' | 'juvenile' | 'mature' | 'flowering';
    certaintyFactors: {
      leafShape: number;
      flowerStructure: number;
      stemCharacteristics: number;
      overallMorphology: number;
    };
  };
}

interface AIAnalysisResult {
  detectedPlants: DetectedPlant[];
  imageQuality: number;
  processingTime: number;
  totalConfidence: number;
  errors: string[];
  suggestions: string[];
}

interface PlantPosition {
  id: string;
  plantId: string;
  x: number;
  y: number;
  z: number;
  rotation: number;
  scale: number;
  growthStage: number;
}

interface GardenStats {
  totalPlants: number;
  categories: Record<string, number>;
  gardenValue: number;
  lastUpdated: string;
}

interface UploadedImage {
  id: string;
  file: File;
  url: string;
  name: string;
  size: number;
  uploadProgress: number;
  analysisStatus: 'pending' | 'preprocessing' | 'analyzing' | 'postprocessing' | 'completed' | 'error';
  analysisProgress: number;
  imageMetadata?: {
    width: number;
    height: number;
    format: string;
    quality: number;
    hasPlants: boolean;
    lightingScore: number;
    clarityScore: number;
  };
  errorMessage?: string;
}

// Extended mock data with more detailed plant information
const mockDetectedPlants: DetectedPlant[] = [
  {
    id: '1',
    name: 'Aloe Vera',
    scientificName: 'Aloe barbadensis',
    confidence: 0.95,
    category: 'skincare',
    description: 'A succulent plant known for its exceptional healing and moisturizing properties, widely used in traditional medicine.',
    image: '/placeholder.svg',
    benefits: ['Heals burns and cuts', 'Moisturizes dry skin', 'Reduces inflammation', 'Soothes sunburn'],
    difficulty: 'easy',
    harvestTime: '6-8 months',
    growingConditions: {
      sunlight: 'full',
      water: 'low',
      soil: 'Well-draining, sandy',
      temperature: '55-80°F (13-27°C)'
    },
    medicinalUses: ['Topical burns treatment', 'Skin moisturizer', 'Wound healing', 'Digestive aid'],
    preparations: ['Fresh gel application', 'Aloe juice', 'Topical creams', 'Face masks'],
    warnings: ['May cause allergic reactions in some people', 'Avoid ingesting whole leaf'],
    rating: 4.8,
    reviews: 1247
  },
  {
    id: '2',
    name: 'Echinacea',
    scientificName: 'Echinacea purpurea',
    confidence: 0.89,
    category: 'immunity',
    description: 'A powerful immune system booster with beautiful purple flowers, native to North America.',
    image: '/placeholder.svg',
    benefits: ['Strengthens immune system', 'Fights cold and flu', 'Reduces inflammation', 'Antimicrobial properties'],
    difficulty: 'medium',
    harvestTime: '3-4 months',
    growingConditions: {
      sunlight: 'full',
      water: 'medium',
      soil: 'Well-draining, loamy',
      temperature: '60-70°F (15-21°C)'
    },
    medicinalUses: ['Cold and flu prevention', 'Immune support', 'Wound healing', 'Upper respiratory infections'],
    preparations: ['Tinctures', 'Teas', 'Capsules', 'Dried root powder'],
    warnings: ['May interact with immunosuppressant drugs', 'Not recommended for autoimmune conditions'],
    rating: 4.6,
    reviews: 892
  },
  {
    id: '3',
    name: 'Lavender',
    scientificName: 'Lavandula angustifolia',
    confidence: 0.92,
    category: 'mental',
    description: 'A fragrant herb renowned for its calming and relaxing properties, perfect for stress relief.',
    image: '/placeholder.svg',
    benefits: ['Reduces anxiety and stress', 'Improves sleep quality', 'Natural antiseptic', 'Headache relief'],
    difficulty: 'easy',
    harvestTime: '2-3 months',
    growingConditions: {
      sunlight: 'full',
      water: 'low',
      soil: 'Well-draining, alkaline',
      temperature: '65-75°F (18-24°C)'
    },
    medicinalUses: ['Anxiety and stress relief', 'Sleep disorders', 'Minor wounds', 'Headaches'],
    preparations: ['Essential oil', 'Dried flowers', 'Teas', 'Sachets', 'Bath products'],
    warnings: ['May cause drowsiness', 'Possible skin irritation in sensitive individuals'],
    rating: 4.9,
    reviews: 2156
  },
  {
    id: '4',
    name: 'Peppermint',
    scientificName: 'Mentha piperita',
    confidence: 0.87,
    category: 'digestive',
    description: 'A refreshing herb excellent for digestive health and providing natural cooling properties.',
    image: '/placeholder.svg',
    benefits: ['Aids digestion', 'Relieves nausea', 'Natural decongestant', 'Antimicrobial properties'],
    difficulty: 'easy',
    harvestTime: '1-2 months',
    growingConditions: {
      sunlight: 'partial',
      water: 'high',
      soil: 'Moist, rich',
      temperature: '65-70°F (18-21°C)'
    },
    medicinalUses: ['Digestive disorders', 'Nausea and vomiting', 'Respiratory congestion', 'Muscle pain'],
    preparations: ['Fresh leaves', 'Teas', 'Essential oil', 'Tinctures', 'Topical balms'],
    warnings: ['May worsen acid reflux', 'Can be too stimulating for some'],
    rating: 4.7,
    reviews: 1683
  },
  {
    id: '5',
    name: 'Eucalyptus',
    scientificName: 'Eucalyptus globulus',
    confidence: 0.91,
    category: 'respiratory',
    description: 'An aromatic tree known for its powerful respiratory benefits and natural decongestant properties.',
    image: '/placeholder.svg',
    benefits: ['Clears respiratory congestion', 'Antibacterial properties', 'Natural decongestant', 'Wound healing'],
    difficulty: 'medium',
    harvestTime: '4-6 months',
    growingConditions: {
      sunlight: 'full',
      water: 'medium',
      soil: 'Well-draining, acidic',
      temperature: '65-75°F (18-24°C)'
    },
    medicinalUses: ['Respiratory infections', 'Congestion relief', 'Wound care', 'Muscle pain'],
    preparations: ['Essential oil', 'Steam inhalation', 'Topical rubs', 'Teas'],
    warnings: ['Essential oil is toxic if ingested', 'May cause skin irritation'],
    rating: 4.5,
    reviews: 734
  },
  {
    id: '6',
    name: 'Turmeric',
    scientificName: 'Curcuma longa',
    confidence: 0.94,
    category: 'anti-inflammatory',
    description: 'A golden-colored root with powerful anti-inflammatory and antioxidant properties.',
    image: '/placeholder.svg',
    benefits: ['Reduces inflammation', 'Antioxidant properties', 'Joint health support', 'Digestive aid'],
    difficulty: 'hard',
    harvestTime: '8-10 months',
    growingConditions: {
      sunlight: 'partial',
      water: 'high',
      soil: 'Rich, well-draining',
      temperature: '70-85°F (21-29°C)'
    },
    medicinalUses: ['Arthritis and joint pain', 'Digestive issues', 'Skin conditions', 'General inflammation'],
    preparations: ['Fresh root', 'Powder', 'Golden milk', 'Tinctures', 'Capsules'],
    warnings: ['May increase bleeding risk', 'Can interact with blood thinners'],
    rating: 4.8,
    reviews: 1892
  },
  {
    id: '7',
    name: 'Chamomile',
    scientificName: 'Matricaria chamomilla',
    confidence: 0.88,
    category: 'mental',
    description: 'A gentle, daisy-like flower known for its calming and soothing properties.',
    image: '/placeholder.svg',
    benefits: ['Promotes relaxation', 'Improves sleep', 'Digestive aid', 'Anti-inflammatory'],
    difficulty: 'easy',
    harvestTime: '2-3 months',
    growingConditions: {
      sunlight: 'full',
      water: 'medium',
      soil: 'Well-draining, fertile',
      temperature: '60-68°F (15-20°C)'
    },
    medicinalUses: ['Insomnia', 'Anxiety', 'Digestive upset', 'Skin irritation'],
    preparations: ['Teas', 'Tinctures', 'Essential oil', 'Topical creams', 'Bath products'],
    warnings: ['May cause allergic reactions in people allergic to ragweed', 'Possible interaction with blood thinners'],
    rating: 4.7,
    reviews: 1456
  },
  {
    id: '8',
    name: 'Ginger',
    scientificName: 'Zingiber officinale',
    confidence: 0.93,
    category: 'digestive',
    description: 'A warming root known for its digestive benefits and anti-nausea properties.',
    image: '/placeholder.svg',
    benefits: ['Reduces nausea', 'Aids digestion', 'Anti-inflammatory', 'Circulation support'],
    difficulty: 'medium',
    harvestTime: '6-8 months',
    growingConditions: {
      sunlight: 'partial',
      water: 'high',
      soil: 'Rich, well-draining',
      temperature: '75-85°F (24-29°C)'
    },
    medicinalUses: ['Motion sickness', 'Morning sickness', 'Digestive issues', 'Muscle pain'],
    preparations: ['Fresh root', 'Teas', 'Tinctures', 'Capsules', 'Crystallized ginger'],
    warnings: ['May increase bleeding risk', 'Can interact with blood thinners'],
    rating: 4.6,
    reviews: 1123
  }
];

const categoryIcons = {
  immunity: Shield,
  skincare: Sparkles,
  digestive: Heart,
  mental: Brain,
  respiratory: Eye,
  'anti-inflammatory': Award
};

const categoryColors = {
  immunity: 'bg-blue-100 text-blue-800 border-blue-200',
  skincare: 'bg-pink-100 text-pink-800 border-pink-200',
  digestive: 'bg-orange-100 text-orange-800 border-orange-200',
  mental: 'bg-purple-100 text-purple-800 border-purple-200',
  respiratory: 'bg-green-100 text-green-800 border-green-200',
  'anti-inflammatory': 'bg-yellow-100 text-yellow-800 border-yellow-200'
};

const difficultyColors = {
  easy: 'text-green-600',
  medium: 'text-yellow-600',
  hard: 'text-red-600'
};

// Enhanced 3D Plant Component with growth animation
function Plant3D({ 
  position, 
  plant, 
  growthStage = 1,
  isSelected = false,
  onClick 
}: { 
  position: [number, number, number];
  plant: DetectedPlant;
  growthStage?: number;
  isSelected?: boolean;
  onClick?: () => void;
}) {
  const meshRef = useRef<any>();
  const groupRef = useRef<any>();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (groupRef.current && isSelected) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  const plantColor = categoryColors[plant.category].includes('blue') ? '#3b82f6' :
                    categoryColors[plant.category].includes('pink') ? '#ec4899' :
                    categoryColors[plant.category].includes('orange') ? '#f97316' :
                    categoryColors[plant.category].includes('purple') ? '#8b5cf6' :
                    categoryColors[plant.category].includes('yellow') ? '#eab308' : '#22c55e';

  return (
    <group ref={groupRef} position={position} onClick={onClick}>
      {/* Plant stem */}
      <Box 
        ref={meshRef} 
        args={[0.3 * growthStage, 0.8 * growthStage, 0.3 * growthStage]} 
        position={[0, (0.4 * growthStage), 0]}
      >
        <meshStandardMaterial color="#16a34a" />
      </Box>
      
      {/* Plant foliage */}
      <Sphere args={[0.4 * growthStage]} position={[0, (0.9 * growthStage), 0]}>
        <meshStandardMaterial color={plantColor} />
      </Sphere>
      
      {/* Selection indicator */}
      {isSelected && (
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.05, 16]} />
          <meshStandardMaterial color="#fbbf24" transparent opacity={0.6} />
        </mesh>
      )}
      
      {/* Plant label */}
      <Html distanceFactor={10} position={[0, 1.5 * growthStage, 0]}>
        <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-lg text-xs font-medium text-gray-800 pointer-events-none">
          {plant.name}
        </div>
      </Html>
    </group>
  );
}

// Animated background component
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-garden-50 via-nature-50 to-garden-100"></div>
      {/* Floating leaf animations */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          <Leaf className="w-8 h-8 text-garden-400 transform rotate-12" />
        </div>
      ))}
    </div>
  );
}

export default function Index() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [detectedPlants, setDetectedPlants] = useState<DetectedPlant[]>([]);
  const [placedPlants, setPlacedPlants] = useState<PlantPosition[]>([]);
  const [selectedPlantPosition, setSelectedPlantPosition] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [cameraMode, setCameraMode] = useState<'orbit' | 'top' | 'side'>('orbit');
  const [lightMode, setLightMode] = useState<'day' | 'night' | 'sunset'>('day');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'confidence' | 'rating'>('confidence');
  const [showOnlyDetected, setShowOnlyDetected] = useState(false);
  const [gardenName, setGardenName] = useState('My Medicinal Garden');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [isGrowthAnimationPlaying, setIsGrowthAnimationPlaying] = useState(false);
  const [selectedPlantInfo, setSelectedPlantInfo] = useState<DetectedPlant | null>(null);
  const [gardenTemplateMode, setGardenTemplateMode] = useState(false);
  const [zoom, setZoom] = useState(1);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate garden statistics
  const gardenStats: GardenStats = {
    totalPlants: placedPlants.length,
    categories: placedPlants.reduce((acc, plant) => {
      const plantData = detectedPlants.find(p => p.id === plant.plantId);
      if (plantData) {
        acc[plantData.category] = (acc[plantData.category] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>),
    gardenValue: placedPlants.length * 15.99, // Mock calculation
    lastUpdated: new Date().toLocaleDateString()
  };

  // Enhanced file upload with progress tracking
  const handleFileUpload = useCallback((files: FileList) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const imageId = Math.random().toString(36).substr(2, 9);
        const newImage: UploadedImage = {
          id: imageId,
          file,
          url: URL.createObjectURL(file),
          name: file.name,
          size: file.size,
          uploadProgress: 0,
          analysisStatus: 'pending'
        };

        setUploadedImages(prev => [...prev, newImage]);

        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadedImages(prev => prev.map(img => 
            img.id === imageId && img.uploadProgress < 100
              ? { ...img, uploadProgress: img.uploadProgress + 10 }
              : img
          ));
        }, 200);

        // Simulate analysis after upload
        setTimeout(() => {
          clearInterval(progressInterval);
          setUploadedImages(prev => prev.map(img => 
            img.id === imageId 
              ? { ...img, uploadProgress: 100, analysisStatus: 'analyzing' }
              : img
          ));

          setIsAnalyzing(true);

          // Simulate AI analysis
          setTimeout(() => {
            setDetectedPlants(mockDetectedPlants);
            setIsAnalyzing(false);
            setUploadedImages(prev => prev.map(img => 
              img.id === imageId 
                ? { ...img, analysisStatus: 'completed' }
                : img
            ));
          }, 3000);
        }, 2000);
      }
    });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  // Enhanced plant filtering and searching
  const filteredPlants = detectedPlants
    .filter(plant => 
      (selectedCategory === 'all' || plant.category === selectedCategory) &&
      (plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!showOnlyDetected || detectedPlants.some(dp => dp.id === plant.id))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'confidence': return b.confidence - a.confidence;
        case 'rating': return b.rating - a.rating;
        default: return 0;
      }
    });

  const addPlantToGarden = (plant: DetectedPlant) => {
    const newPosition: PlantPosition = {
      id: `${plant.id}-${Date.now()}`,
      plantId: plant.id,
      x: (Math.random() - 0.5) * 6,
      y: 0,
      z: (Math.random() - 0.5) * 6,
      rotation: Math.random() * Math.PI * 2,
      scale: 0.8 + Math.random() * 0.4,
      growthStage: 0.5 + Math.random() * 0.5
    };
    setPlacedPlants(prev => [...prev, newPosition]);
  };

  const removePlantFromGarden = (positionId: string) => {
    setPlacedPlants(prev => prev.filter(p => p.id !== positionId));
    setSelectedPlantPosition(null);
  };

  const resetGarden = () => {
    setPlacedPlants([]);
    setSelectedPlantPosition(null);
  };

  const saveLayout = () => {
    const gardenData = {
      name: gardenName,
      plants: placedPlants,
      settings: { lightMode, showGrid, cameraMode },
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('virtualGarden', JSON.stringify(gardenData));
    alert('Garden layout saved successfully!');
  };

  const loadLayout = () => {
    const saved = localStorage.getItem('virtualGarden');
    if (saved) {
      const gardenData = JSON.parse(saved);
      setPlacedPlants(gardenData.plants || []);
      setGardenName(gardenData.name || 'My Medicinal Garden');
      if (gardenData.settings) {
        setLightMode(gardenData.settings.lightMode || 'day');
        setShowGrid(gardenData.settings.showGrid ?? true);
        setCameraMode(gardenData.settings.cameraMode || 'orbit');
      }
      alert('Garden layout loaded successfully!');
    }
  };

  const exportGarden = () => {
    const gardenData = {
      name: gardenName,
      plants: placedPlants.map(p => ({
        ...p,
        plantInfo: detectedPlants.find(dp => dp.id === p.plantId)
      })),
      stats: gardenStats,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(gardenData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${gardenName.replace(/\s+/g, '_')}_garden.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadGardenTemplate = (templateName: string) => {
    const templates = {
      'healing_circle': [
        { plantId: '1', x: 0, y: 0, z: 0, rotation: 0, scale: 1, growthStage: 1 },
        { plantId: '2', x: 2, y: 0, z: 0, rotation: 0, scale: 1, growthStage: 0.8 },
        { plantId: '3', x: -2, y: 0, z: 0, rotation: 0, scale: 1, growthStage: 0.9 },
        { plantId: '4', x: 0, y: 0, z: 2, rotation: 0, scale: 1, growthStage: 0.7 },
        { plantId: '5', x: 0, y: 0, z: -2, rotation: 0, scale: 1, growthStage: 0.85 },
      ],
      'herb_spiral': [
        { plantId: '1', x: 0, y: 0, z: 0, rotation: 0, scale: 1.2, growthStage: 1 },
        { plantId: '2', x: 1, y: 0, z: 1, rotation: 0, scale: 1, growthStage: 0.9 },
        { plantId: '3', x: -1, y: 0, z: 1, rotation: 0, scale: 0.9, growthStage: 0.8 },
        { plantId: '4', x: -1, y: 0, z: -1, rotation: 0, scale: 1.1, growthStage: 0.85 },
        { plantId: '5', x: 1, y: 0, z: -1, rotation: 0, scale: 0.8, growthStage: 0.75 },
        { plantId: '6', x: 2, y: 0, z: 0, rotation: 0, scale: 1, growthStage: 0.9 },
      ]
    };

    const template = templates[templateName as keyof typeof templates];
    if (template) {
      const newPlants = template.map((plant, index) => ({
        id: `template-${templateName}-${index}`,
        ...plant
      }));
      setPlacedPlants(newPlants);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-garden-50 to-nature-50'}`}>
      <AnimatedBackground />
      
      {/* Enhanced Header */}
      <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-garden-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-garden-500 to-nature-500 rounded-2xl shadow-lg">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-garden-900 dark:text-white">Virtual Garden Studio</h1>
                <p className="text-garden-600 dark:text-gray-300">Professional Plant Design Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="rounded-full"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowStats(!showStats)}
                className="rounded-full"
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                Stats
              </Button>
            </div>
          </div>

          {/* Hero Section with Enhanced Typography */}
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-garden-900 dark:text-white">Create Your Own </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-garden-600 via-nature-600 to-garden-500 animate-pulse">
                Virtual Medicinal Garden
              </span>
            </h2>
            <p className="text-xl text-garden-700 dark:text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
              Upload your garden images, detect plants with advanced AI, and design immersive 3D healing spaces with professional-grade tools.
            </p>
            
            {/* Quick Stats */}
            {showStats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-3 border border-garden-200/50">
                  <div className="text-2xl font-bold text-garden-600">{gardenStats.totalPlants}</div>
                  <div className="text-sm text-garden-500">Plants Placed</div>
                </div>
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-3 border border-garden-200/50">
                  <div className="text-2xl font-bold text-garden-600">{detectedPlants.length}</div>
                  <div className="text-sm text-garden-500">Detected Species</div>
                </div>
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-3 border border-garden-200/50">
                  <div className="text-2xl font-bold text-garden-600">{Object.keys(gardenStats.categories).length}</div>
                  <div className="text-sm text-garden-500">Categories</div>
                </div>
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-3 border border-garden-200/50">
                  <div className="text-2xl font-bold text-garden-600">${gardenStats.gardenValue.toFixed(0)}</div>
                  <div className="text-sm text-garden-500">Garden Value</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Enhanced Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Advanced Upload Section */}
            <Card className="shadow-2xl border-garden-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-garden-900 dark:text-white">
                  <Upload className="w-5 h-5" />
                  Upload Garden Images
                  <Badge variant="secondary" className="ml-auto">
                    {uploadedImages.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Image Carousel */}
                {uploadedImages.length > 0 && (
                  <div className="space-y-3">
                    <div className="relative">
                      <img 
                        src={uploadedImages[currentImageIndex]?.url} 
                        alt="Garden" 
                        className="w-full h-40 object-cover rounded-xl"
                      />
                      {uploadedImages.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                          {uploadedImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Upload Progress */}
                    {uploadedImages.some(img => img.uploadProgress < 100 || img.analysisStatus === 'analyzing') && (
                      <div className="space-y-2">
                        {uploadedImages.map(img => (
                          <div key={img.id} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="truncate">{img.name}</span>
                              <span>
                                {img.analysisStatus === 'analyzing' ? 'Analyzing...' : `${img.uploadProgress}%`}
                              </span>
                            </div>
                            <Progress value={img.uploadProgress} className="h-1" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Drop Zone */}
                <div
                  className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                    isDragging 
                      ? 'border-garden-500 bg-garden-50 dark:bg-garden-900/20' 
                      : 'border-garden-300 dark:border-gray-600 hover:border-garden-400 dark:hover:border-gray-500'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-8 h-8 mx-auto text-garden-400 mb-2" />
                  <p className="text-garden-600 dark:text-gray-300 font-medium">
                    {isDragging ? 'Drop images here' : 'Click or drag images'}
                  </p>
                  <p className="text-xs text-garden-500 dark:text-gray-400 mt-1">
                    Supports JPG, PNG, WebP (Max 10MB each)
                  </p>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) handleFileUpload(e.target.files);
                  }}
                />
              </CardContent>
            </Card>

            {/* Plant Search and Filters */}
            <Card className="shadow-2xl border-garden-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-garden-900 dark:text-white">
                  <Search className="w-5 h-5" />
                  Plant Library
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-garden-400" />
                  <Input
                    placeholder="Search plants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="immunity">Immunity</SelectItem>
                      <SelectItem value="skincare">Skincare</SelectItem>
                      <SelectItem value="digestive">Digestive</SelectItem>
                      <SelectItem value="mental">Mental Health</SelectItem>
                      <SelectItem value="respiratory">Respiratory</SelectItem>
                      <SelectItem value="anti-inflammatory">Anti-inflammatory</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confidence">Confidence</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-garden-700 dark:text-gray-300">
                    Detected Only
                  </label>
                  <Switch
                    checked={showOnlyDetected}
                    onCheckedChange={setShowOnlyDetected}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Plant Cards */}
            {filteredPlants.length > 0 && (
              <Card className="shadow-2xl border-garden-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-garden-900 dark:text-white">
                    <Leaf className="w-5 h-5" />
                    Available Plants ({filteredPlants.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                    {filteredPlants.map((plant) => {
                      const CategoryIcon = categoryIcons[plant.category];
                      return (
                        <TooltipProvider key={plant.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="group p-4 border border-garden-200 dark:border-gray-600 rounded-xl hover:bg-garden-50 dark:hover:bg-gray-700/50 cursor-pointer transition-all transform hover:scale-[1.02] hover:shadow-lg">
                                <div className="flex items-start gap-3">
                                  <div className="relative">
                                    <img 
                                      src={plant.image} 
                                      alt={plant.name}
                                      className="w-16 h-16 rounded-xl object-cover bg-garden-100 ring-2 ring-garden-200 dark:ring-gray-600"
                                    />
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-white dark:bg-gray-800 rounded-full border-2 border-garden-200 dark:border-gray-600 flex items-center justify-center">
                                      <CategoryIcon className="w-3 h-3 text-garden-600" />
                                    </div>
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-2">
                                      <div>
                                        <h4 className="font-semibold text-garden-900 dark:text-white text-sm leading-tight">
                                          {plant.name}
                                        </h4>
                                        <p className="text-xs text-garden-600 dark:text-gray-400 italic">
                                          {plant.scientificName}
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-1 text-xs">
                                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                        <span className="text-garden-600 dark:text-gray-400">{plant.rating}</span>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 mb-2">
                                      <Badge variant="secondary" className={`text-xs ${categoryColors[plant.category]}`}>
                                        {plant.category}
                                      </Badge>
                                      <Badge variant="outline" className={`text-xs ${difficultyColors[plant.difficulty]}`}>
                                        {plant.difficulty}
                                      </Badge>
                                    </div>
                                    
                                    <p className="text-xs text-garden-600 dark:text-gray-400 mb-3 line-clamp-2">
                                      {plant.description}
                                    </p>
                                    
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <div className="h-1.5 bg-garden-200 dark:bg-gray-600 rounded-full flex-1 min-w-[40px]">
                                          <div 
                                            className="h-1.5 bg-gradient-to-r from-garden-500 to-garden-600 rounded-full transition-all"
                                            style={{ width: `${plant.confidence * 100}%` }}
                                          />
                                        </div>
                                        <span className="text-xs font-medium text-garden-700 dark:text-gray-300">
                                          {Math.round(plant.confidence * 100)}%
                                        </span>
                                      </div>
                                      
                                      <div className="flex gap-1">
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedPlantInfo(plant);
                                          }}
                                          className="h-6 w-6 p-0 hover:bg-garden-100 dark:hover:bg-gray-600"
                                        >
                                          <Info className="w-3 h-3" />
                                        </Button>
                                        <Button
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            addPlantToGarden(plant);
                                          }}
                                          className="h-6 px-2 text-xs bg-garden-600 hover:bg-garden-700 text-white"
                                        >
                                          <Plus className="w-3 h-3 mr-1" />
                                          Add
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="max-w-xs p-4">
                              <div className="space-y-3">
                                <div>
                                  <p className="font-semibold text-sm">{plant.name}</p>
                                  <p className="text-xs text-gray-500 italic">{plant.scientificName}</p>
                                </div>
                                
                                <div>
                                  <p className="text-xs font-medium mb-1">Key Benefits:</p>
                                  <ul className="text-xs space-y-1">
                                    {plant.benefits.slice(0, 3).map((benefit, i) => (
                                      <li key={i} className="flex items-start gap-1">
                                        <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                        {benefit}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div>
                                    <p className="font-medium">Harvest:</p>
                                    <p className="text-gray-600">{plant.harvestTime}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">Difficulty:</p>
                                    <p className={difficultyColors[plant.difficulty]}>
                                      {plant.difficulty}
                                    </p>
                                  </div>
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

          {/* Enhanced 3D Garden Editor */}
          <div className="lg:col-span-3">
            <Card className="h-[700px] shadow-2xl border-garden-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-garden-900 dark:text-white">3D Garden Studio</CardTitle>
                    <Input
                      value={gardenName}
                      onChange={(e) => setGardenName(e.target.value)}
                      className="w-48 text-sm"
                      placeholder="Garden name..."
                    />
                  </div>
                  
                  {/* Enhanced Toolbar */}
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={saveLayout}
                            className="border-garden-300 hover:bg-garden-50 dark:border-gray-600 dark:hover:bg-gray-700"
                          >
                            <Save className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Save Garden Layout</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={loadLayout}
                            className="border-garden-300 hover:bg-garden-50 dark:border-gray-600 dark:hover:bg-gray-700"
                          >
                            <Archive className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Load Garden Layout</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={exportGarden}
                            className="border-garden-300 hover:bg-garden-50 dark:border-gray-600 dark:hover:bg-gray-700"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Export Garden Data</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <div className="w-px h-6 bg-garden-300 dark:bg-gray-600" />

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-garden-300 hover:bg-garden-50 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          <Palette className="w-4 h-4 mr-1" />
                          Templates
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Garden Templates</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            variant="outline"
                            onClick={() => loadGardenTemplate('healing_circle')}
                            className="h-20 flex-col"
                          >
                            <div className="w-8 h-8 rounded-full bg-garden-100 dark:bg-garden-800 mb-2"></div>
                            Healing Circle
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => loadGardenTemplate('herb_spiral')}
                            className="h-20 flex-col"
                          >
                            <div className="w-8 h-8 rounded-lg bg-nature-100 dark:bg-nature-800 mb-2"></div>
                            Herb Spiral
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={resetGarden}
                            className="border-red-300 hover:bg-red-50 dark:border-red-600 dark:hover:bg-red-900/20"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Clear Garden</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowGrid(!showGrid)}
                            className={`border-garden-300 dark:border-gray-600 ${showGrid ? 'bg-garden-100 dark:bg-garden-800' : 'hover:bg-garden-50 dark:hover:bg-gray-700'}`}
                          >
                            <Grid3X3 className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Toggle Grid</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-0 h-[600px] relative">
                <Canvas 
                  camera={{ position: [8, 8, 8], fov: 50 }}
                  shadows
                  className="rounded-b-lg"
                >
                  {/* Enhanced Lighting */}
                  <ambientLight 
                    intensity={lightMode === 'day' ? 0.6 : lightMode === 'night' ? 0.2 : 0.4} 
                  />
                  <directionalLight 
                    position={[10, 10, 5]} 
                    intensity={lightMode === 'day' ? 1 : lightMode === 'night' ? 0.3 : 0.7}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                  />
                  <pointLight 
                    position={[-10, 5, -10]} 
                    intensity={lightMode === 'sunset' ? 0.8 : 0.3}
                    color={lightMode === 'sunset' ? '#ff6b35' : '#ffffff'}
                  />

                  {/* Environment */}
                  <Environment preset={lightMode === 'day' ? 'park' : lightMode === 'night' ? 'night' : 'sunset'} />
                  
                  {/* Enhanced Ground */}
                  <mesh 
                    rotation={[-Math.PI / 2, 0, 0]} 
                    position={[0, -0.1, 0]} 
                    receiveShadow
                  >
                    <planeGeometry args={[20, 20]} />
                    <meshStandardMaterial 
                      color={lightMode === 'day' ? '#86d5a4' : lightMode === 'night' ? '#2d4a3e' : '#4a6741'} 
                      roughness={0.8}
                      metalness={0.1}
                    />
                  </mesh>
                  
                  {/* Grid Helper */}
                  {showGrid && (
                    <gridHelper 
                      args={[20, 20, '#22c55e', '#86d5a4']} 
                      position={[0, 0, 0]}
                    />
                  )}
                  
                  {/* Contact Shadows */}
                  <ContactShadows 
                    opacity={0.4} 
                    scale={20} 
                    blur={1} 
                    far={20} 
                    resolution={256} 
                    color="#000000" 
                  />
                  
                  {/* Placed Plants with Enhanced Models */}
                  {placedPlants.map((plantPosition) => {
                    const plantData = detectedPlants.find(p => p.id === plantPosition.plantId);
                    return plantData ? (
                      <Plant3D 
                        key={plantPosition.id}
                        position={[plantPosition.x, plantPosition.y, plantPosition.z]}
                        plant={plantData}
                        growthStage={plantPosition.growthStage}
                        isSelected={selectedPlantPosition === plantPosition.id}
                        onClick={() => {
                          if (selectedPlantPosition === plantPosition.id) {
                            removePlantFromGarden(plantPosition.id);
                          } else {
                            setSelectedPlantPosition(plantPosition.id);
                          }
                        }}
                      />
                    ) : null;
                  })}
                  
                  <OrbitControls 
                    enablePan={true} 
                    enableZoom={true} 
                    enableRotate={true}
                    minDistance={3}
                    maxDistance={50}
                    maxPolarAngle={Math.PI / 2}
                  />
                </Canvas>
                
                {/* Enhanced Bottom Toolbar */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl px-6 py-3 shadow-xl border border-garden-200/50 dark:border-gray-600/50">
                  
                  {/* Zoom Controls */}
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full w-8 h-8 p-0 hover:bg-garden-100 dark:hover:bg-gray-700"
                      onClick={() => setZoom(Math.min(zoom + 0.1, 2))}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Slider
                      value={[zoom]}
                      onValueChange={(value) => setZoom(value[0])}
                      max={2}
                      min={0.5}
                      step={0.1}
                      className="w-16"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full w-8 h-8 p-0 hover:bg-garden-100 dark:hover:bg-gray-700"
                      onClick={() => setZoom(Math.max(zoom - 0.1, 0.5))}
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="w-px h-6 bg-garden-300 dark:bg-gray-600" />
                  
                  {/* Camera Controls */}
                  <Select value={cameraMode} onValueChange={(value: any) => setCameraMode(value)}>
                    <SelectTrigger className="w-24 h-8">
                      <Camera className="w-4 h-4" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="orbit">Orbit</SelectItem>
                      <SelectItem value="top">Top View</SelectItem>
                      <SelectItem value="side">Side View</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="w-px h-6 bg-garden-300 dark:bg-gray-600" />
                  
                  {/* Lighting Controls */}
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setLightMode(lightMode === 'day' ? 'sunset' : lightMode === 'sunset' ? 'night' : 'day')}
                      className="rounded-full w-8 h-8 p-0 hover:bg-garden-100 dark:hover:bg-gray-700"
                    >
                      {lightMode === 'day' ? <Sun className="w-4 h-4 text-yellow-500" /> : 
                       lightMode === 'sunset' ? <Sun className="w-4 h-4 text-orange-500" /> :
                       <Moon className="w-4 h-4 text-blue-500" />}
                    </Button>
                    <span className="text-xs text-garden-600 dark:text-gray-400 capitalize min-w-[40px]">
                      {lightMode}
                    </span>
                  </div>
                  
                  <div className="w-px h-6 bg-garden-300 dark:bg-gray-600" />
                  
                  {/* Growth Animation */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsGrowthAnimationPlaying(!isGrowthAnimationPlaying)}
                    className="rounded-full w-8 h-8 p-0 hover:bg-garden-100 dark:hover:bg-gray-700"
                  >
                    {isGrowthAnimationPlaying ? 
                      <Pause className="w-4 h-4" /> : 
                      <Play className="w-4 h-4" />
                    }
                  </Button>
                </div>

                {/* Selection Info Panel */}
                {selectedPlantPosition && (
                  <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-garden-200/50 dark:border-gray-600/50 max-w-xs">
                    {(() => {
                      const position = placedPlants.find(p => p.id === selectedPlantPosition);
                      const plantData = position ? detectedPlants.find(p => p.id === position.plantId) : null;
                      return plantData ? (
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-garden-900 dark:text-white">{plantData.name}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedPlantPosition(null)}
                              className="w-6 h-6 p-0"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-garden-600 dark:text-gray-400">Position:</span>
                              <span className="text-garden-900 dark:text-white">
                                ({position?.x.toFixed(1)}, {position?.z.toFixed(1)})
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-garden-600 dark:text-gray-400">Growth:</span>
                              <span className="text-garden-900 dark:text-white">
                                {Math.round((position?.growthStage || 0) * 100)}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-garden-600 dark:text-gray-400">Category:</span>
                              <Badge variant="secondary" className={`text-xs ${categoryColors[plantData.category]}`}>
                                {plantData.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedPlantInfo(plantData)}
                              className="flex-1"
                            >
                              <Info className="w-3 h-3 mr-1" />
                              Details
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removePlantFromGarden(selectedPlantPosition)}
                              className="flex-1"
                            >
                              <X className="w-3 h-3 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Instructions Panel */}
            <Card className="mt-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-garden-200/50 dark:border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-center gap-8 text-sm text-garden-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-garden-500 rounded-full"></div>
                    Click plants in sidebar to add to garden
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Click placed plants to select/remove
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Use mouse to orbit, zoom, and pan
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Enhanced Plant Information Modal */}
      <Dialog open={!!selectedPlantInfo} onOpenChange={() => setSelectedPlantInfo(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedPlantInfo && (
            <div>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-2xl">
                  <img 
                    src={selectedPlantInfo.image} 
                    alt={selectedPlantInfo.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      {selectedPlantInfo.name}
                      <Badge className={categoryColors[selectedPlantInfo.category]}>
                        {selectedPlantInfo.category}
                      </Badge>
                    </div>
                    <p className="text-sm font-normal text-gray-500 italic">
                      {selectedPlantInfo.scientificName}
                    </p>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              <Tabs defaultValue="overview" className="mt-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="medicinal">Medicinal Uses</TabsTrigger>
                  <TabsTrigger value="growing">Growing Guide</TabsTrigger>
                  <TabsTrigger value="preparation">Preparation</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Plant Information</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Difficulty:</span>
                          <Badge variant="outline" className={difficultyColors[selectedPlantInfo.difficulty]}>
                            {selectedPlantInfo.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Harvest Time:</span>
                          <span>{selectedPlantInfo.harvestTime}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Rating:</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{selectedPlantInfo.rating}</span>
                            <span className="text-gray-500">({selectedPlantInfo.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Key Benefits</h4>
                      <ul className="space-y-2">
                        {selectedPlantInfo.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Description</h4>
                    <p className="text-gray-700 leading-relaxed">{selectedPlantInfo.description}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="medicinal" className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3">Medicinal Applications</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedPlantInfo.medicinalUses.map((use, index) => (
                        <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-start gap-2">
                            <Heart className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{use}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedPlantInfo.warnings.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 text-red-700">Important Warnings</h4>
                      <div className="space-y-2">
                        {selectedPlantInfo.warnings.map((warning, index) => (
                          <div key={index} className="p-3 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-red-700">{warning}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="growing" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3">Growing Conditions</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Sun className="w-5 h-5 text-yellow-500" />
                            <div>
                              <span className="font-medium">Sunlight:</span>
                              <span className="ml-2 capitalize">{selectedPlantInfo.growingConditions.sunlight}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Droplets className="w-5 h-5 text-blue-500" />
                            <div>
                              <span className="font-medium">Water:</span>
                              <span className="ml-2 capitalize">{selectedPlantInfo.growingConditions.water}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Thermometer className="w-5 h-5 text-orange-500" />
                            <div>
                              <span className="font-medium">Temperature:</span>
                              <span className="ml-2">{selectedPlantInfo.growingConditions.temperature}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Soil Requirements</h4>
                      <p className="text-gray-700 p-3 bg-gray-50 rounded-lg">
                        {selectedPlantInfo.growingConditions.soil}
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="preparation" className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3">Preparation Methods</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedPlantInfo.preparations.map((prep, index) => (
                        <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-start gap-2">
                            <BookOpen className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{prep}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex gap-3 mt-6 pt-6 border-t">
                <Button
                  onClick={() => {
                    addPlantToGarden(selectedPlantInfo);
                    setSelectedPlantInfo(null);
                  }}
                  className="flex-1 bg-garden-600 hover:bg-garden-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Garden
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Plant Info
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
