import React from 'react';

// Advanced Plant Visual Features Database
interface PlantVisualFeatures {
  leafShape: 'oval' | 'heart' | 'lance' | 'round' | 'needle' | 'palmate' | 'compound' | 'linear';
  leafMargin: 'smooth' | 'serrated' | 'lobed' | 'toothed';
  leafTexture: 'glossy' | 'matte' | 'fuzzy' | 'waxy' | 'rough';
  leafSize: 'tiny' | 'small' | 'medium' | 'large';
  leafColor: string[];
  stemType: 'woody' | 'herbaceous' | 'succulent';
  stemColor: string[];
  flowerPresent: boolean;
  flowerShape?: 'round' | 'tubular' | 'star' | 'irregular' | 'composite';
  flowerColor?: string[];
  flowerSize?: 'tiny' | 'small' | 'medium' | 'large';
  plantHeight: 'ground' | 'low' | 'medium' | 'tall';
  growthPattern: 'rosette' | 'upright' | 'spreading' | 'climbing' | 'bushy';
  seasonalFeatures: {
    hasFlowers: boolean;
    hasFruits: boolean;
    hasSeeds: boolean;
  };
}

interface PlantData {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  description: string;
  visualFeatures: PlantVisualFeatures;
}

// Enhanced Plant Database with Detailed Visual Signatures
export const plantVisualDatabase: PlantData[] = [
  {
    id: '1',
    name: 'Aloe Vera',
    scientificName: 'Aloe barbadensis',
    category: 'skincare',
    description: 'Succulent with thick, fleshy leaves containing healing gel',
    visualFeatures: {
      leafShape: 'lance',
      leafMargin: 'serrated',
      leafTexture: 'waxy',
      leafSize: 'large',
      leafColor: ['light-green', 'blue-green', 'gray-green'],
      stemType: 'succulent',
      stemColor: ['green'],
      flowerPresent: false,
      plantHeight: 'medium',
      growthPattern: 'rosette',
      seasonalFeatures: {
        hasFlowers: false,
        hasFruits: false,
        hasSeeds: false
      }
    }
  },
  {
    id: '2',
    name: 'Rose',
    scientificName: 'Rosa species',
    category: 'skincare',
    description: 'Woody shrub with compound leaves and fragrant flowers',
    visualFeatures: {
      leafShape: 'compound',
      leafMargin: 'serrated',
      leafTexture: 'matte',
      leafSize: 'medium',
      leafColor: ['dark-green', 'medium-green'],
      stemType: 'woody',
      stemColor: ['brown', 'green'],
      flowerPresent: true,
      flowerShape: 'round',
      flowerColor: ['red', 'pink', 'white', 'yellow'],
      flowerSize: 'large',
      plantHeight: 'tall',
      growthPattern: 'upright',
      seasonalFeatures: {
        hasFlowers: true,
        hasFruits: true,
        hasSeeds: true
      }
    }
  },
  {
    id: '3',
    name: 'Lavender',
    scientificName: 'Lavandula angustifolia',
    category: 'mental',
    description: 'Woody herb with narrow, silver-green leaves and purple flower spikes',
    visualFeatures: {
      leafShape: 'linear',
      leafMargin: 'smooth',
      leafTexture: 'fuzzy',
      leafSize: 'small',
      leafColor: ['gray-green', 'silver-green'],
      stemType: 'woody',
      stemColor: ['brown', 'gray'],
      flowerPresent: true,
      flowerShape: 'tubular',
      flowerColor: ['purple', 'violet'],
      flowerSize: 'small',
      plantHeight: 'medium',
      growthPattern: 'bushy',
      seasonalFeatures: {
        hasFlowers: true,
        hasFruits: false,
        hasSeeds: true
      }
    }
  },
  {
    id: '4',
    name: 'Basil',
    scientificName: 'Ocimum basilicum',
    category: 'digestive',
    description: 'Aromatic herb with oval, bright green leaves',
    visualFeatures: {
      leafShape: 'oval',
      leafMargin: 'smooth',
      leafTexture: 'glossy',
      leafSize: 'medium',
      leafColor: ['bright-green', 'dark-green'],
      stemType: 'herbaceous',
      stemColor: ['green', 'purple'],
      flowerPresent: true,
      flowerShape: 'tubular',
      flowerColor: ['white', 'purple'],
      flowerSize: 'tiny',
      plantHeight: 'medium',
      growthPattern: 'upright',
      seasonalFeatures: {
        hasFlowers: true,
        hasFruits: false,
        hasSeeds: true
      }
    }
  },
  {
    id: '5',
    name: 'Mint',
    scientificName: 'Mentha species',
    category: 'digestive',
    description: 'Fast-growing herb with serrated leaves and strong aroma',
    visualFeatures: {
      leafShape: 'oval',
      leafMargin: 'serrated',
      leafTexture: 'matte',
      leafSize: 'medium',
      leafColor: ['bright-green', 'medium-green'],
      stemType: 'herbaceous',
      stemColor: ['green', 'purple'],
      flowerPresent: true,
      flowerShape: 'tubular',
      flowerColor: ['white', 'purple'],
      flowerSize: 'tiny',
      plantHeight: 'medium',
      growthPattern: 'spreading',
      seasonalFeatures: {
        hasFlowers: true,
        hasFruits: false,
        hasSeeds: true
      }
    }
  },
  {
    id: '6',
    name: 'Dandelion',
    scientificName: 'Taraxacum officinale',
    category: 'digestive',
    description: 'Low-growing plant with deeply lobed leaves and bright yellow composite flowers',
    visualFeatures: {
      leafShape: 'lance',
      leafMargin: 'lobed',
      leafTexture: 'matte',
      leafSize: 'medium',
      leafColor: ['dark-green', 'medium-green'],
      stemType: 'herbaceous',
      stemColor: ['green'],
      flowerPresent: true,
      flowerShape: 'composite',
      flowerColor: ['bright-yellow'],
      flowerSize: 'medium',
      plantHeight: 'low',
      growthPattern: 'rosette',
      seasonalFeatures: {
        hasFlowers: true,
        hasFruits: false,
        hasSeeds: true
      }
    }
  },
  {
    id: '7',
    name: 'Sage',
    scientificName: 'Salvia officinalis',
    category: 'respiratory',
    description: 'Gray-green herb with fuzzy, oval leaves',
    visualFeatures: {
      leafShape: 'oval',
      leafMargin: 'smooth',
      leafTexture: 'fuzzy',
      leafSize: 'medium',
      leafColor: ['gray-green', 'silver-green'],
      stemType: 'woody',
      stemColor: ['gray', 'brown'],
      flowerPresent: true,
      flowerShape: 'tubular',
      flowerColor: ['purple', 'blue'],
      flowerSize: 'small',
      plantHeight: 'medium',
      growthPattern: 'bushy',
      seasonalFeatures: {
        hasFlowers: true,
        hasFruits: false,
        hasSeeds: true
      }
    }
  },
  {
    id: '8',
    name: 'Marigold',
    scientificName: 'Calendula officinalis',
    category: 'skincare',
    description: 'Bright flowering plant with oval leaves and orange/yellow composite flowers',
    visualFeatures: {
      leafShape: 'oval',
      leafMargin: 'smooth',
      leafTexture: 'matte',
      leafSize: 'medium',
      leafColor: ['medium-green', 'light-green'],
      stemType: 'herbaceous',
      stemColor: ['green'],
      flowerPresent: true,
      flowerShape: 'composite',
      flowerColor: ['orange', 'yellow'],
      flowerSize: 'large',
      plantHeight: 'medium',
      growthPattern: 'upright',
      seasonalFeatures: {
        hasFlowers: true,
        hasFruits: false,
        hasSeeds: true
      }
    }
  },
  {
    id: '9',
    name: 'Chamomile',
    scientificName: 'Matricaria chamomilla',
    category: 'mental',
    description: 'Delicate herb with feathery leaves and small white daisy-like flowers',
    visualFeatures: {
      leafShape: 'compound',
      leafMargin: 'smooth',
      leafTexture: 'matte',
      leafSize: 'small',
      leafColor: ['light-green', 'medium-green'],
      stemType: 'herbaceous',
      stemColor: ['green'],
      flowerPresent: true,
      flowerShape: 'composite',
      flowerColor: ['white'],
      flowerSize: 'small',
      plantHeight: 'low',
      growthPattern: 'upright',
      seasonalFeatures: {
        hasFlowers: true,
        hasFruits: false,
        hasSeeds: true
      }
    }
  },
  {
    id: '10',
    name: 'Sunflower',
    scientificName: 'Helianthus annuus',
    category: 'immunity',
    description: 'Tall plant with large heart-shaped leaves and massive yellow composite flowers',
    visualFeatures: {
      leafShape: 'heart',
      leafMargin: 'serrated',
      leafTexture: 'rough',
      leafSize: 'large',
      leafColor: ['dark-green', 'medium-green'],
      stemType: 'herbaceous',
      stemColor: ['green', 'brown'],
      flowerPresent: true,
      flowerShape: 'composite',
      flowerColor: ['yellow'],
      flowerSize: 'large',
      plantHeight: 'tall',
      growthPattern: 'upright',
      seasonalFeatures: {
        hasFlowers: true,
        hasFruits: true,
        hasSeeds: true
      }
    }
  },
  // Additional Common Plants for Better Recognition
  {
    id: '11',
    name: 'Rosemary',
    scientificName: 'Rosmarinus officinalis',
    category: 'culinary',
    description: 'Woody herb with needle-like leaves and small blue flowers',
    visualFeatures: {
      leafShape: 'linear',
      leafMargin: 'smooth',
      leafTexture: 'rough',
      leafSize: 'tiny',
      leafColor: ['dark-green', 'gray-green'],
      stemType: 'woody',
      stemColor: ['brown', 'gray'],
      flowerPresent: true,
      flowerShape: 'tubular',
      flowerColor: ['blue', 'purple'],
      flowerSize: 'tiny',
      plantHeight: 'medium',
      growthPattern: 'upright',
      seasonalFeatures: {
        hasFlowers: true,
        hasFruits: false,
        hasSeeds: true
      }
    }
  },
  {
    id: '12',
    name: 'Oregano',
    scientificName: 'Origanum vulgare',
    category: 'culinary',
    description: 'Small-leaved herb with tiny white or pink flowers',
    visualFeatures: {
      leafShape: 'oval',
      leafMargin: 'smooth',
      leafTexture: 'matte',
      leafSize: 'small',
      leafColor: ['medium-green', 'dark-green'],
      stemType: 'herbaceous',
      stemColor: ['green', 'red'],
      flowerPresent: true,
      flowerShape: 'tubular',
      flowerColor: ['white', 'pink'],
      flowerSize: 'tiny',
      plantHeight: 'low',
      growthPattern: 'spreading',
      seasonalFeatures: {
        hasFlowers: true,
        hasFruits: false,
        hasSeeds: true
      }
    }
  },
  {
    id: '13',
    name: 'Thyme',
    scientificName: 'Thymus vulgaris',
    category: 'culinary',
    description: 'Small creeping herb with tiny oval leaves',
    visualFeatures: {
      leafShape: 'oval',
      leafMargin: 'smooth',
      leafTexture: 'matte',
      leafSize: 'tiny',
      leafColor: ['gray-green', 'medium-green'],
      stemType: 'woody',
      stemColor: ['brown'],
      flowerPresent: true,
      flowerShape: 'tubular',
      flowerColor: ['purple', 'white'],
      flowerSize: 'tiny',
      plantHeight: 'low',
      growthPattern: 'spreading',
      seasonalFeatures: {
        hasFlowers: true,
        hasFruits: false,
        hasSeeds: true
      }
    }
  },
  {
    id: '14',
    name: 'Parsley',
    scientificName: 'Petroselinum crispum',
    category: 'culinary',
    description: 'Herb with flat or curly compound leaves',
    visualFeatures: {
      leafShape: 'compound',
      leafMargin: 'serrated',
      leafTexture: 'glossy',
      leafSize: 'medium',
      leafColor: ['bright-green', 'dark-green'],
      stemType: 'herbaceous',
      stemColor: ['green'],
      flowerPresent: false,
      plantHeight: 'medium',
      growthPattern: 'rosette',
      seasonalFeatures: {
        hasFlowers: false,
        hasFruits: false,
        hasSeeds: false
      }
    }
  },
  {
    id: '15',
    name: 'Spinach',
    scientificName: 'Spinacia oleracea',
    category: 'leafy',
    description: 'Leafy green with oval to arrow-shaped leaves',
    visualFeatures: {
      leafShape: 'oval',
      leafMargin: 'smooth',
      leafTexture: 'matte',
      leafSize: 'medium',
      leafColor: ['dark-green', 'medium-green'],
      stemType: 'herbaceous',
      stemColor: ['green', 'red'],
      flowerPresent: false,
      plantHeight: 'low',
      growthPattern: 'rosette',
      seasonalFeatures: {
        hasFlowers: false,
        hasFruits: false,
        hasSeeds: false
      }
    }
  }
];

// Advanced AI Plant Recognition Algorithm
export class AdvancedPlantAI {
  static analyzeImageFeatures(imageData: ImageData): {
    dominantColors: string[];
    hasFlowers: boolean;
    flowerColors: string[];
    leafCharacteristics: {
      shape: string;
      texture: string;
      size: string;
      margin: string;
    };
    plantStructure: {
      height: string;
      pattern: string;
      stemType: string;
    };
    confidence: number;
    analysisQuality: number;
  } {
    const data = imageData.data;
    const pixels = data.length / 4;
    
    // Advanced color analysis
    const colorCounts = {
      'bright-green': 0,
      'medium-green': 0,
      'dark-green': 0,
      'light-green': 0,
      'gray-green': 0,
      'silver-green': 0,
      'blue-green': 0,
      'yellow': 0,
      'bright-yellow': 0,
      'orange': 0,
      'red': 0,
      'pink': 0,
      'purple': 0,
      'violet': 0,
      'white': 0,
      'brown': 0,
      'gray': 0
    };
    
    let totalBrightness = 0;
    let edgePixels = 0;
    let textureVariance = 0;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const brightness = (r + g + b) / 3;
      totalBrightness += brightness;
      
      // Advanced color classification
      const hue = this.rgbToHue(r, g, b);
      const saturation = this.rgbToSaturation(r, g, b);
      const lightness = brightness / 255;
      
      // Green analysis
      if (g > r && g > b && g > 60) {
        if (lightness > 0.7 && saturation < 0.5) colorCounts['light-green']++;
        else if (lightness > 0.6) colorCounts['bright-green']++;
        else if (lightness > 0.4) colorCounts['medium-green']++;
        else colorCounts['dark-green']++;
        
        if (saturation < 0.3) {
          if (lightness > 0.6) colorCounts['silver-green']++;
          else colorCounts['gray-green']++;
        }
        
        if (b > 0.6 * g) colorCounts['blue-green']++;
      }
      
      // Flower colors
      if (hue >= 45 && hue <= 75 && saturation > 0.5) {
        if (lightness > 0.7) colorCounts['bright-yellow']++;
        else colorCounts['yellow']++;
      }
      
      if (hue >= 15 && hue <= 45 && saturation > 0.4) colorCounts['orange']++;
      
      if (hue <= 15 || hue >= 345) {
        if (saturation > 0.5) colorCounts['red']++;
        else if (lightness > 0.7) colorCounts['pink']++;
      }
      
      if (hue >= 270 && hue <= 330 && saturation > 0.3) {
        if (hue <= 300) colorCounts['purple']++;
        else colorCounts['violet']++;
      }
      
      if (lightness > 0.8 && saturation < 0.2) colorCounts['white']++;
      
      // Texture analysis
      if (i > 0) {
        const prevBrightness = (data[i-4] + data[i-3] + data[i-2]) / 3;
        const diff = Math.abs(brightness - prevBrightness);
        if (diff > 30) edgePixels++;
        textureVariance += diff;
      }
    }
    
    const avgBrightness = totalBrightness / pixels;
    const avgTextureVariance = textureVariance / pixels;
    
    // Determine dominant colors
    const dominantColors: string[] = [];
    Object.entries(colorCounts).forEach(([color, count]) => {
      if (count / pixels > 0.05) { // 5% threshold
        dominantColors.push(color);
      }
    });
    
    // Flower detection
    const flowerColors = ['yellow', 'bright-yellow', 'orange', 'red', 'pink', 'purple', 'violet', 'white'];
    const detectedFlowerColors = flowerColors.filter(color => 
      colorCounts[color as keyof typeof colorCounts] / pixels > 0.02
    );
    const hasFlowers = detectedFlowerColors.length > 0;
    
    // Leaf characteristics
    const leafShape = this.determineLeafShape(edgePixels / pixels, avgTextureVariance);
    const leafTexture = this.determineTexture(avgTextureVariance, avgBrightness);
    const leafSize = this.determineSize(imageData.width, imageData.height);
    const leafMargin = this.determineMargin(edgePixels / pixels);
    
    // Plant structure
    const plantHeight = this.determinePlantHeight(imageData.height, avgBrightness);
    const growthPattern = this.determineGrowthPattern(dominantColors, edgePixels / pixels);
    const stemType = this.determineStemType(dominantColors, avgTextureVariance);
    
    // Calculate analysis quality and confidence
    const totalPlantPixels = Object.values(colorCounts).reduce((sum, count) =>
      sum + (typeof count === 'number' ? count : 0), 0
    );
    const plantCoverage = totalPlantPixels / pixels;
    const analysisQuality = Math.min(1, plantCoverage * 2); // How much of image is plant

    // Overall confidence in the analysis
    const featureConfidence = (
      (dominantColors.length > 0 ? 0.3 : 0) +
      (avgTextureVariance > 20 ? 0.2 : 0) +
      (plantCoverage > 0.2 ? 0.3 : 0) +
      (hasFlowers ? 0.2 : 0.1)
    );

    return {
      dominantColors,
      hasFlowers,
      flowerColors: detectedFlowerColors,
      leafCharacteristics: {
        shape: leafShape,
        texture: leafTexture,
        size: leafSize,
        margin: leafMargin
      },
      plantStructure: {
        height: plantHeight,
        pattern: growthPattern,
        stemType: stemType
      },
      confidence: featureConfidence,
      analysisQuality: analysisQuality
    };
  }
  
  static identifyPlant(imageFeatures: any): { plant: PlantData; confidence: number }[] {
    const matches: { plant: PlantData; confidence: number }[] = [];

    for (const plant of plantVisualDatabase) {
      let score = 0;
      let maxScore = 0;

      // Enhanced Color matching (35% weight) - More precise
      const colorWeight = 3.5;
      maxScore += colorWeight;

      // Exact color matches get higher scores
      let colorScore = 0;
      const plantColors = plant.visualFeatures.leafColor;
      const imageColors = imageFeatures.dominantColors;

      for (const imageColor of imageColors) {
        if (plantColors.includes(imageColor)) {
          colorScore += 1; // Exact match bonus
        } else {
          // Check for similar colors
          if ((imageColor.includes('green') && plantColors.some(c => c.includes('green'))) ||
              (imageColor.includes('yellow') && plantColors.some(c => c.includes('yellow'))) ||
              (imageColor.includes('red') && plantColors.some(c => c.includes('red')))) {
            colorScore += 0.5; // Similar color bonus
          }
        }
      }
      score += Math.min(colorWeight, colorScore);

      // Enhanced Flower matching (25% weight)
      const flowerWeight = 2.5;
      maxScore += flowerWeight;
      if (imageFeatures.hasFlowers === plant.visualFeatures.flowerPresent) {
        score += flowerWeight * 0.6; // Higher weight for flower presence match

        if (imageFeatures.hasFlowers && plant.visualFeatures.flowerColor) {
          // Exact flower color match
          const exactFlowerMatch = imageFeatures.flowerColors.some((color: string) =>
            plant.visualFeatures.flowerColor?.includes(color)
          );
          if (exactFlowerMatch) {
            score += flowerWeight * 0.4; // High bonus for exact flower color
          }
        } else if (!imageFeatures.hasFlowers && !plant.visualFeatures.flowerPresent) {
          score += flowerWeight * 0.4; // Bonus for both having no flowers
        }
      }

      // Enhanced Leaf characteristics (25% weight) - More detailed
      const leafWeight = 2.5;
      maxScore += leafWeight;

      // Shape matching with fuzzy logic
      if (imageFeatures.leafCharacteristics.shape === plant.visualFeatures.leafShape) {
        score += leafWeight * 0.4; // Exact shape match
      } else {
        // Similar shapes
        const shapeCompatibility = this.getShapeCompatibility(
          imageFeatures.leafCharacteristics.shape,
          plant.visualFeatures.leafShape
        );
        score += leafWeight * 0.4 * shapeCompatibility;
      }

      // Texture matching
      if (imageFeatures.leafCharacteristics.texture === plant.visualFeatures.leafTexture) {
        score += leafWeight * 0.3;
      }

      // Margin matching
      if (imageFeatures.leafCharacteristics.margin === plant.visualFeatures.leafMargin) {
        score += leafWeight * 0.2;
      }

      // Size matching
      if (imageFeatures.leafCharacteristics.size === plant.visualFeatures.leafSize) {
        score += leafWeight * 0.1;
      }

      // Enhanced Structure matching (15% weight)
      const structureWeight = 1.5;
      maxScore += structureWeight;

      if (imageFeatures.plantStructure.height === plant.visualFeatures.plantHeight) {
        score += structureWeight * 0.4;
      }

      if (imageFeatures.plantStructure.pattern === plant.visualFeatures.growthPattern) {
        score += structureWeight * 0.3;
      }

      if (imageFeatures.plantStructure.stemType === plant.visualFeatures.stemType) {
        score += structureWeight * 0.3;
      }

      // Calculate final confidence with better scaling
      let confidence = score / maxScore;

      // Apply confidence boosting for strong matches
      if (confidence > 0.7) {
        confidence = Math.min(0.95, confidence * 1.1); // Boost high confidence
      } else if (confidence < 0.4) {
        confidence = confidence * 0.8; // Reduce low confidence
      }

      // Only include plants with meaningful confidence
      if (confidence > 0.25) {
        matches.push({ plant, confidence });
      }
    }

    // Enhanced sorting - prioritize high confidence matches
    const sortedMatches = matches.sort((a, b) => {
      // If confidence difference is significant, sort by confidence
      if (Math.abs(a.confidence - b.confidence) > 0.1) {
        return b.confidence - a.confidence;
      }
      // If confidence is similar, prefer common plants
      const commonPlants = ['Basil', 'Mint', 'Parsley', 'Rosemary', 'Sage', 'Thyme'];
      const aIsCommon = commonPlants.includes(a.plant.name);
      const bIsCommon = commonPlants.includes(b.plant.name);

      if (aIsCommon && !bIsCommon) return -1;
      if (!aIsCommon && bIsCommon) return 1;

      return b.confidence - a.confidence;
    });

    return sortedMatches.slice(0, 2); // Return top 2 matches
  }

  // Helper method for shape compatibility
  private static getShapeCompatibility(shape1: string, shape2: string): number {
    const shapeGroups = {
      'round_family': ['oval', 'round', 'heart'],
      'long_family': ['lance', 'linear', 'needle'],
      'complex_family': ['compound', 'palmate']
    };

    for (const family of Object.values(shapeGroups)) {
      if (family.includes(shape1) && family.includes(shape2)) {
        return 0.7; // 70% compatibility for same family
      }
    }

    return 0.2; // 20% compatibility for different families
  }
  
  // Helper methods
  private static rgbToHue(r: number, g: number, b: number): number {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    
    if (diff === 0) return 0;
    
    let hue = 0;
    if (max === r) hue = ((g - b) / diff) % 6;
    else if (max === g) hue = (b - r) / diff + 2;
    else hue = (r - g) / diff + 4;
    
    return hue * 60;
  }
  
  private static rgbToSaturation(r: number, g: number, b: number): number {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return max === 0 ? 0 : (max - min) / max;
  }
  
  private static determineLeafShape(edgeRatio: number, variance: number): string {
    // More precise shape determination
    if (edgeRatio > 0.45) return 'compound'; // Very complex edges
    if (variance < 15 && edgeRatio < 0.1) return 'linear'; // Smooth, low variance
    if (edgeRatio > 0.3 && variance > 25) return 'lance'; // Medium edges, some variance
    if (variance > 50 && edgeRatio > 0.2) return 'heart'; // High variance, medium edges
    if (edgeRatio < 0.15 && variance < 30) return 'round'; // Very smooth
    return 'oval'; // Default
  }
  
  private static determineTexture(variance: number, brightness: number): string {
    // Enhanced texture analysis
    if (brightness > 190 && variance < 20) return 'waxy'; // Very bright and smooth
    if (brightness > 160 && variance < 25) return 'glossy'; // Bright and fairly smooth
    if (variance > 60) return 'rough'; // High texture variance
    if (variance < 20) return 'matte'; // Low variance, not bright
    return 'fuzzy'; // Medium variance
  }
  
  private static determineSize(width: number, height: number): string {
    const area = width * height;
    if (area < 100000) return 'small';
    if (area > 500000) return 'large';
    return 'medium';
  }
  
  private static determineMargin(edgeRatio: number): string {
    // More precise edge detection
    if (edgeRatio > 0.4) return 'serrated'; // Very jagged edges
    if (edgeRatio > 0.28) return 'toothed'; // Medium jagged
    if (edgeRatio > 0.18) return 'lobed'; // Some irregularity
    return 'smooth'; // Very few edges
  }
  
  private static determinePlantHeight(imageHeight: number, brightness: number): string {
    if (imageHeight < 300) return 'low';
    if (imageHeight > 800) return 'tall';
    return 'medium';
  }
  
  private static determineGrowthPattern(colors: string[], edgeRatio: number): string {
    // Enhanced growth pattern detection
    const hasBrown = colors.includes('brown') || colors.includes('gray');
    const hasMultipleGreens = colors.filter(c => c.includes('green')).length > 2;

    if (edgeRatio < 0.12 && !hasBrown) return 'rosette'; // Low-growing, circular pattern
    if (hasBrown && edgeRatio < 0.3) return 'upright'; // Woody, structured growth
    if (edgeRatio > 0.35 && hasMultipleGreens) return 'spreading'; // Complex, spreading growth
    return 'bushy'; // Dense, multi-branched
  }
  
  private static determineStemType(colors: string[], variance: number): string {
    // More accurate stem type detection
    const hasBrown = colors.includes('brown');
    const hasGray = colors.includes('gray');
    const hasBlueGreen = colors.includes('blue-green');
    const hasLightGreen = colors.includes('light-green');

    if ((hasBrown || hasGray) && variance > 30) return 'woody'; // Brown/gray with texture
    if ((hasBlueGreen || hasLightGreen) && variance < 25) return 'succulent'; // Waxy, smooth appearance
    return 'herbaceous'; // Green, soft stems
  }
}
