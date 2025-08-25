import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create store categories
  console.log('📦 Creating store categories...');
  const seedsCategory = await prisma.storeCategory.upsert({
    where: { name: 'Seeds' },
    update: {},
    create: {
      name: 'Seeds',
      description: 'Plant seeds for growing your garden',
      iconUrl: '🌱',
      sortOrder: 1
    }
  });

  const plantsCategory = await prisma.storeCategory.upsert({
    where: { name: 'Live Plants' },
    update: {},
    create: {
      name: 'Live Plants',
      description: 'Ready-to-plant live plants',
      iconUrl: '🌿',
      sortOrder: 2
    }
  });

  const toolsCategory = await prisma.storeCategory.upsert({
    where: { name: 'Tools' },
    update: {},
    create: {
      name: 'Tools',
      description: 'Gardening tools and equipment',
      iconUrl: '🛠️',
      sortOrder: 3
    }
  });

  const decorationsCategory = await prisma.storeCategory.upsert({
    where: { name: 'Decorations' },
    update: {},
    create: {
      name: 'Decorations',
      description: 'Garden decorations and ornaments',
      iconUrl: '🎨',
      sortOrder: 4
    }
  });

  // Create plant species
  console.log('🌸 Creating plant species...');
  const roseSpecies = await prisma.plantSpecies.upsert({
    where: { name: 'Rose' },
    update: {},
    create: {
      name: 'Rose',
      scientificName: 'Rosa damascena',
      category: 'flower',
      description: 'Beautiful flowering plant with fragrant blooms. Perfect for romantic gardens.',
      careLevel: 'medium',
      sunlight: 'full',
      watering: 'medium',
      soilType: 'well-draining',
      growthTime: 60,
      harvestYield: 25,
      imageUrl: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=300&h=300&fit=crop',
      color: 'red',
      size: 'medium',
      seedPrice: 25,
      rarity: 'common'
    }
  });

  const sunflowerSpecies = await prisma.plantSpecies.upsert({
    where: { name: 'Sunflower' },
    update: {},
    create: {
      name: 'Sunflower',
      scientificName: 'Helianthus annuus',
      category: 'flower',
      description: 'Tall, bright yellow flowers that follow the sun. Brings joy to any garden.',
      careLevel: 'easy',
      sunlight: 'full',
      watering: 'medium',
      soilType: 'fertile',
      growthTime: 45,
      harvestYield: 30,
      imageUrl: 'https://images.unsplash.com/photo-1597848212624-e593c83d0e0e?w=300&h=300&fit=crop',
      color: 'yellow',
      size: 'large',
      seedPrice: 20,
      rarity: 'common'
    }
  });

  const tulipSpecies = await prisma.plantSpecies.upsert({
    where: { name: 'Tulip' },
    update: {},
    create: {
      name: 'Tulip',
      scientificName: 'Tulipa gesneriana',
      category: 'flower',
      description: 'Elegant spring flowers available in many colors. Symbol of perfect love.',
      careLevel: 'easy',
      sunlight: 'partial',
      watering: 'low',
      soilType: 'well-draining',
      growthTime: 30,
      harvestYield: 20,
      imageUrl: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=300&h=300&fit=crop',
      color: 'purple',
      size: 'small',
      seedPrice: 30,
      rarity: 'common'
    }
  });

  const lavenderSpecies = await prisma.plantSpecies.upsert({
    where: { name: 'Lavender' },
    update: {},
    create: {
      name: 'Lavender',
      scientificName: 'Lavandula angustifolia',
      category: 'herb',
      description: 'Aromatic herb with purple flowers. Known for its calming properties.',
      careLevel: 'easy',
      sunlight: 'full',
      watering: 'low',
      soilType: 'sandy',
      growthTime: 50,
      harvestYield: 35,
      imageUrl: 'https://images.unsplash.com/photo-1561563966-8c74a6e8a6d1?w=300&h=300&fit=crop',
      color: 'purple',
      size: 'medium',
      seedPrice: 35,
      rarity: 'uncommon'
    }
  });

  const basilSpecies = await prisma.plantSpecies.upsert({
    where: { name: 'Basil' },
    update: {},
    create: {
      name: 'Basil',
      scientificName: 'Ocimum basilicum',
      category: 'herb',
      description: 'Popular culinary herb with aromatic leaves. Essential for Italian cooking.',
      careLevel: 'easy',
      sunlight: 'partial',
      watering: 'medium',
      soilType: 'fertile',
      growthTime: 25,
      harvestYield: 15,
      imageUrl: 'https://images.unsplash.com/photo-1618375569909-3c8616cf79d9?w=300&h=300&fit=crop',
      color: 'green',
      size: 'small',
      seedPrice: 15,
      rarity: 'common'
    }
  });

  const cactusSpecies = await prisma.plantSpecies.upsert({
    where: { name: 'Barrel Cactus' },
    update: {},
    create: {
      name: 'Barrel Cactus',
      scientificName: 'Ferocactus wislizeni',
      category: 'succulent',
      description: 'Low-maintenance desert plant. Perfect for beginners and dry climates.',
      careLevel: 'easy',
      sunlight: 'full',
      watering: 'low',
      soilType: 'sandy',
      growthTime: 90,
      harvestYield: 40,
      imageUrl: 'https://images.unsplash.com/photo-1535648744444-5e35d261d1de?w=300&h=300&fit=crop',
      color: 'green',
      size: 'medium',
      seedPrice: 50,
      rarity: 'uncommon'
    }
  });

  // Create store items
  console.log('🏪 Creating store items...');
  
  // Seeds
  await prisma.storeItem.upsert({
    where: { name: 'Rose Seeds' },
    update: {},
    create: {
      name: 'Rose Seeds',
      description: 'Beautiful red rose seeds perfect for outdoor gardens',
      price: 25,
      itemType: 'seed',
      categoryId: seedsCategory.id,
      speciesId: roseSpecies.id,
      properties: {
        growthBoost: 10,
        type: 'flower'
      }
    }
  });

  await prisma.storeItem.upsert({
    where: { name: 'Sunflower Seeds' },
    update: {},
    create: {
      name: 'Sunflower Seeds',
      description: 'Bright yellow sunflower seeds that grow tall and strong',
      price: 20,
      itemType: 'seed',
      categoryId: seedsCategory.id,
      speciesId: sunflowerSpecies.id,
      properties: {
        growthBoost: 15,
        type: 'flower'
      }
    }
  });

  await prisma.storeItem.upsert({
    where: { name: 'Tulip Bulbs' },
    update: {},
    create: {
      name: 'Tulip Bulbs',
      description: 'Colorful tulip bulbs for spring gardens',
      price: 30,
      itemType: 'seed',
      categoryId: seedsCategory.id,
      speciesId: tulipSpecies.id,
      properties: {
        growthBoost: 20,
        type: 'flower'
      }
    }
  });

  await prisma.storeItem.upsert({
    where: { name: 'Lavender Seeds' },
    update: {},
    create: {
      name: 'Lavender Seeds',
      description: 'Aromatic lavender seeds for herb gardens',
      price: 35,
      itemType: 'seed',
      categoryId: seedsCategory.id,
      speciesId: lavenderSpecies.id,
      properties: {
        growthBoost: 15,
        type: 'herb'
      }
    }
  });

  // Live Plants
  await prisma.storeItem.upsert({
    where: { name: 'Baby Cactus' },
    update: {},
    create: {
      name: 'Baby Cactus',
      description: 'Low maintenance succulent perfect for beginners',
      price: 50,
      itemType: 'plant',
      categoryId: plantsCategory.id,
      speciesId: cactusSpecies.id,
      properties: {
        healthBoost: 25,
        type: 'succulent'
      }
    }
  });

  await prisma.storeItem.upsert({
    where: { name: 'Basil Plant' },
    update: {},
    create: {
      name: 'Basil Plant',
      description: 'Fresh basil plant ready for cooking',
      price: 25,
      itemType: 'plant',
      categoryId: plantsCategory.id,
      speciesId: basilSpecies.id,
      properties: {
        healthBoost: 20,
        type: 'herb'
      }
    }
  });

  // Tools
  await prisma.storeItem.upsert({
    where: { name: 'Watering Can' },
    update: {},
    create: {
      name: 'Watering Can',
      description: 'Essential for keeping your plants hydrated',
      price: 15,
      itemType: 'tool',
      categoryId: toolsCategory.id,
      properties: {
        wateringBoost: 5,
        durability: 100
      }
    }
  });

  await prisma.storeItem.upsert({
    where: { name: 'Super Fertilizer' },
    update: {},
    create: {
      name: 'Super Fertilizer',
      description: 'Advanced nutrient boost for faster plant growth',
      price: 60,
      itemType: 'tool',
      categoryId: toolsCategory.id,
      properties: {
        growthBoost: 15,
        uses: 10
      }
    }
  });

  await prisma.storeItem.upsert({
    where: { name: 'Lucky Bamboo' },
    update: {},
    create: {
      name: 'Lucky Bamboo',
      description: 'Bring good luck and positive energy to your garden',
      price: 40,
      itemType: 'decoration',
      categoryId: decorationsCategory.id,
      properties: {
        luckBoost: 40,
        type: 'spiritual'
      }
    }
  });

  // Decorations
  await prisma.storeItem.upsert({
    where: { name: 'Garden Gnome' },
    update: {},
    create: {
      name: 'Garden Gnome',
      description: 'Adorable garden gnome to watch over your plants',
      price: 35,
      itemType: 'decoration',
      categoryId: decorationsCategory.id,
      properties: {
        decorationBoost: 5,
        type: 'ornament'
      }
    }
  });

  // Create achievements
  console.log('🏆 Creating achievements...');
  await prisma.achievement.upsert({
    where: { name: 'First Garden' },
    update: {},
    create: {
      name: 'First Garden',
      description: 'Created your first virtual garden',
      type: 'garden_count',
      target: 1,
      reward: {
        coins: 100,
        experience: 50
      }
    }
  });

  await prisma.achievement.upsert({
    where: { name: 'Green Thumb' },
    update: {},
    create: {
      name: 'Green Thumb',
      description: 'Maintained 5 healthy plants',
      type: 'healthy_plants',
      target: 5,
      reward: {
        coins: 200,
        experience: 100
      }
    }
  });

  await prisma.achievement.upsert({
    where: { name: 'Master Gardener' },
    update: {},
    create: {
      name: 'Master Gardener',
      description: 'Successfully grew 10 plants to maturity',
      type: 'mature_plants',
      target: 10,
      reward: {
        coins: 500,
        experience: 250
      }
    }
  });

  await prisma.achievement.upsert({
    where: { name: 'Plant Whisperer' },
    update: {},
    create: {
      name: 'Plant Whisperer',
      description: 'Grow 25 plants to maturity',
      type: 'total_plants',
      target: 25,
      reward: {
        coins: 1000,
        experience: 500
      }
    }
  });

  await prisma.achievement.upsert({
    where: { name: 'Garden Collector' },
    update: {},
    create: {
      name: 'Garden Collector',
      description: 'Create 5 different gardens',
      type: 'garden_count',
      target: 5,
      reward: {
        coins: 300,
        experience: 150
      }
    }
  });

  await prisma.achievement.upsert({
    where: { name: 'Botanist' },
    update: {},
    create: {
      name: 'Botanist',
      description: 'Grow 10 different plant species',
      type: 'species_diversity',
      target: 10,
      reward: {
        coins: 400,
        experience: 200
      }
    }
  });

  await prisma.achievement.upsert({
    where: { name: 'Spender' },
    update: {},
    create: {
      name: 'Spender',
      description: 'Spend 1000 coins in the store',
      type: 'coins_spent',
      target: 1000,
      reward: {
        coins: 150,
        experience: 75
      }
    }
  });

  await prisma.achievement.upsert({
    where: { name: 'Level Up' },
    update: {},
    create: {
      name: 'Level Up',
      description: 'Reach level 5',
      type: 'user_level',
      target: 5,
      reward: {
        coins: 250,
        experience: 0
      }
    }
  });

  console.log('✅ Database seeded successfully!');
  console.log('📊 Summary:');
  console.log('   - Store Categories: 4');
  console.log('   - Plant Species: 6');
  console.log('   - Store Items: 10');
  console.log('   - Achievements: 8');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
