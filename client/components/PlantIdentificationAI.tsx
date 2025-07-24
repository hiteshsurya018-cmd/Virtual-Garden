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

// Comprehensive Plant Database with Real Visual Characteristics
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
      }
    };
  }
  
  static identifyPlant(imageFeatures: any): { plant: PlantData; confidence: number }[] {
    const matches: { plant: PlantData; confidence: number }[] = [];
    
    for (const plant of plantVisualDatabase) {
      let score = 0;
      let maxScore = 0;
      
      // Color matching (40% weight)
      const colorWeight = 4;
      maxScore += colorWeight;
      const commonColors = imageFeatures.dominantColors.filter((color: string) => 
        plant.visualFeatures.leafColor.includes(color)
      ).length;
      score += (commonColors / Math.max(plant.visualFeatures.leafColor.length, 1)) * colorWeight;
      
      // Flower matching (30% weight)
      const flowerWeight = 3;
      maxScore += flowerWeight;
      if (imageFeatures.hasFlowers === plant.visualFeatures.flowerPresent) {
        score += flowerWeight * 0.5;
        if (imageFeatures.hasFlowers && plant.visualFeatures.flowerColor) {
          const flowerMatch = imageFeatures.flowerColors.some((color: string) => 
            plant.visualFeatures.flowerColor?.includes(color)
          );
          if (flowerMatch) score += flowerWeight * 0.5;
        }
      }
      
      // Leaf characteristics (20% weight)
      const leafWeight = 2;
      maxScore += leafWeight;
      if (imageFeatures.leafCharacteristics.shape === plant.visualFeatures.leafShape) score += leafWeight * 0.3;
      if (imageFeatures.leafCharacteristics.texture === plant.visualFeatures.leafTexture) score += leafWeight * 0.3;
      if (imageFeatures.leafCharacteristics.margin === plant.visualFeatures.leafMargin) score += leafWeight * 0.2;
      if (imageFeatures.leafCharacteristics.size === plant.visualFeatures.leafSize) score += leafWeight * 0.2;
      
      // Structure matching (10% weight)
      const structureWeight = 1;
      maxScore += structureWeight;
      if (imageFeatures.plantStructure.height === plant.visualFeatures.plantHeight) score += structureWeight * 0.4;
      if (imageFeatures.plantStructure.pattern === plant.visualFeatures.growthPattern) score += structureWeight * 0.3;
      if (imageFeatures.plantStructure.stemType === plant.visualFeatures.stemType) score += structureWeight * 0.3;
      
      const confidence = Math.min(0.95, Math.max(0.1, score / maxScore));
      
      if (confidence > 0.3) { // Only include reasonable matches
        matches.push({ plant, confidence });
      }
    }
    
    return matches.sort((a, b) => b.confidence - a.confidence).slice(0, 3);
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
    if (edgeRatio > 0.4) return 'compound';
    if (variance < 20) return 'linear';
    if (edgeRatio > 0.25) return 'lance';
    if (variance > 40) return 'heart';
    return 'oval';
  }
  
  private static determineTexture(variance: number, brightness: number): string {
    if (brightness > 180 && variance < 25) return 'waxy';
    if (variance > 50) return 'rough';
    if (variance < 15) return 'glossy';
    if (variance < 30) return 'matte';
    return 'fuzzy';
  }
  
  private static determineSize(width: number, height: number): string {
    const area = width * height;
    if (area < 100000) return 'small';
    if (area > 500000) return 'large';
    return 'medium';
  }
  
  private static determineMargin(edgeRatio: number): string {
    if (edgeRatio > 0.35) return 'serrated';
    if (edgeRatio > 0.25) return 'toothed';
    if (edgeRatio > 0.15) return 'lobed';
    return 'smooth';
  }
  
  private static determinePlantHeight(imageHeight: number, brightness: number): string {
    if (imageHeight < 300) return 'low';
    if (imageHeight > 800) return 'tall';
    return 'medium';
  }
  
  private static determineGrowthPattern(colors: string[], edgeRatio: number): string {
    if (edgeRatio < 0.1) return 'rosette';
    if (colors.includes('brown')) return 'upright';
    if (edgeRatio > 0.4) return 'spreading';
    return 'bushy';
  }
  
  private static determineStemType(colors: string[], variance: number): string {
    if (colors.includes('brown') || colors.includes('gray')) return 'woody';
    if (colors.includes('blue-green') || variance < 20) return 'succulent';
    return 'herbaceous';
  }
}
