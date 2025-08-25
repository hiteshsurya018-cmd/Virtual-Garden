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

  // Create plant species
  console.log('🌸 Creating plant species...');
  const roseSpecies = await prisma.plantSpecies.upsert({
    where: { name: 'Rose' },
    update: {},
    create: {
      name: 'Rose',
      scientificName: 'Rosa damascena',
      category: 'flower',
      description: 'Beautiful flowering plant with fragrant blooms.',
      careLevel: 'medium',
      sunlight: 'full',
      watering: 'medium',
      soilType: 'well-draining',
      growthTime: 60,
      harvestYield: 25,
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
      description: 'Tall, bright yellow flowers that follow the sun.',
      careLevel: 'easy',
      sunlight: 'full',
      watering: 'medium',
      soilType: 'fertile',
      growthTime: 45,
      harvestYield: 30,
      color: 'yellow',
      size: 'large',
      seedPrice: 20,
      rarity: 'common'
    }
  });

  // Create store items
  console.log('🏪 Creating store items...');
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
      properties: '{"growthBoost": 10, "type": "flower"}'
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
      properties: '{"growthBoost": 15, "type": "flower"}'
    }
  });

  await prisma.storeItem.upsert({
    where: { name: 'Watering Can' },
    update: {},
    create: {
      name: 'Watering Can',
      description: 'Essential for keeping your plants hydrated',
      price: 15,
      itemType: 'tool',
      categoryId: toolsCategory.id,
      properties: '{"wateringBoost": 5, "durability": 100}'
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
      reward: '{"coins": 100, "experience": 50}'
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
      reward: '{"coins": 200, "experience": 100}'
    }
  });

  console.log('✅ Database seeded successfully!');
  console.log('📊 Summary:');
  console.log('   - Store Categories: 3');
  console.log('   - Plant Species: 2');
  console.log('   - Store Items: 3');
  console.log('   - Achievements: 2');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
