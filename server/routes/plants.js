import express from "express";
import { authenticateToken, optionalAuth } from "../middleware/auth.js";

const router = express.Router();

// Get all plant species
router.get("/species", optionalAuth, async (req, res) => {
  try {
    const {
      category,
      careLevel,
      sunlight,
      search,
      limit = 20,
      offset = 0,
    } = req.query;

    const where = {
      isAvailable: true,
      ...(category && { category }),
      ...(careLevel && { careLevel }),
      ...(sunlight && { sunlight }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { scientificName: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const species = await req.prisma.plantSpecies.findMany({
      where,
      take: parseInt(limit),
      skip: parseInt(offset),
      orderBy: { name: "asc" },
    });

    const total = await req.prisma.plantSpecies.count({ where });

    res.json({
      species,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Get plant species error:", error);
    res.status(500).json({ error: "Failed to fetch plant species" });
  }
});

// Get specific plant species
router.get("/species/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const species = await req.prisma.plantSpecies.findUnique({
      where: { id },
      include: {
        plantInstances: {
          include: {
            garden: {
              select: {
                id: true,
                name: true,
                user: {
                  select: {
                    username: true,
                  },
                },
              },
            },
          },
          take: 5, // Show recent examples
        },
      },
    });

    if (!species || !species.isAvailable) {
      return res.status(404).json({ error: "Plant species not found" });
    }

    res.json(species);
  } catch (error) {
    console.error("Get plant species error:", error);
    res.status(500).json({ error: "Failed to fetch plant species" });
  }
});

// Get plant care information
router.get("/species/:id/care", async (req, res) => {
  try {
    const { id } = req.params;

    const species = await req.prisma.plantSpecies.findUnique({
      where: { id },
      select: {
        name: true,
        scientificName: true,
        careLevel: true,
        sunlight: true,
        watering: true,
        soilType: true,
        growthTime: true,
        description: true,
      },
    });

    if (!species) {
      return res.status(404).json({ error: "Plant species not found" });
    }

    // Generate care instructions based on species data
    const careInstructions = {
      watering: {
        frequency:
          species.watering === "high"
            ? "Daily"
            : species.watering === "medium"
              ? "Every 2-3 days"
              : "Weekly",
        amount:
          species.watering === "high"
            ? "Generous watering"
            : species.watering === "medium"
              ? "Moderate watering"
              : "Light watering",
        tips: [
          "Water in the morning for best absorption",
          "Check soil moisture before watering",
          "Ensure good drainage to prevent root rot",
        ],
      },
      sunlight: {
        requirement: species.sunlight,
        hours:
          species.sunlight === "full"
            ? "6+ hours direct sunlight"
            : species.sunlight === "partial"
              ? "3-6 hours sunlight"
              : "Indirect light",
        placement:
          species.sunlight === "full"
            ? "South-facing location"
            : species.sunlight === "partial"
              ? "East or west-facing location"
              : "North-facing or shaded area",
      },
      soil: {
        type: species.soilType || "well-draining",
        ph: species.category === "herb" ? "6.0-7.0" : "6.5-7.5",
        preparation: [
          "Ensure good drainage",
          "Add compost for nutrients",
          "Test soil pH if needed",
        ],
      },
      growth: {
        timeToMaturity: `${species.growthTime || 30} days`,
        difficulty: species.careLevel,
        tips: [
          "Monitor growth progress regularly",
          "Provide support if needed",
          "Prune dead or damaged parts",
        ],
      },
      commonIssues: {
        overwatering: "Yellow leaves, soft stems",
        underwatering: "Wilted, brown leaves",
        pests: "Check for aphids, spider mites",
        diseases: "Watch for fungal infections",
      },
    };

    res.json({
      species,
      careInstructions,
    });
  } catch (error) {
    console.error("Get care instructions error:", error);
    res.status(500).json({ error: "Failed to fetch care instructions" });
  }
});

// Get plant categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await req.prisma.plantSpecies.groupBy({
      by: ["category"],
      where: { isAvailable: true },
      _count: {
        category: true,
      },
      orderBy: {
        category: "asc",
      },
    });

    const formattedCategories = categories.map((cat) => ({
      name: cat.category,
      count: cat._count.category,
      displayName:
        cat.category.charAt(0).toUpperCase() + cat.category.slice(1) + "s",
    }));

    res.json(formattedCategories);
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ error: "Failed to fetch plant categories" });
  }
});

// Get user's plant instances
router.get("/my-plants", authenticateToken, async (req, res) => {
  try {
    const plants = await req.prisma.plantInstance.findMany({
      where: {
        garden: {
          userId: req.user.id,
        },
      },
      include: {
        species: true,
        garden: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { plantedAt: "desc" },
    });

    // Group by garden
    const plantsByGarden = plants.reduce((acc, plant) => {
      const gardenId = plant.garden.id;
      if (!acc[gardenId]) {
        acc[gardenId] = {
          garden: plant.garden,
          plants: [],
        };
      }
      acc[gardenId].plants.push(plant);
      return acc;
    }, {});

    res.json({
      totalPlants: plants.length,
      gardens: Object.values(plantsByGarden),
    });
  } catch (error) {
    console.error("Get user plants error:", error);
    res.status(500).json({ error: "Failed to fetch user plants" });
  }
});

// Get plant health statistics
router.get("/health-stats", authenticateToken, async (req, res) => {
  try {
    const plants = await req.prisma.plantInstance.findMany({
      where: {
        garden: {
          userId: req.user.id,
        },
      },
      select: {
        health: true,
        waterLevel: true,
        growthStage: true,
        lastWatered: true,
        lastHarvested: true,
      },
    });

    const stats = {
      total: plants.length,
      healthy: plants.filter((p) => p.health >= 80).length,
      needsWater: plants.filter((p) => p.waterLevel < 30).length,
      mature: plants.filter((p) => p.growthStage >= 80).length,
      readyToHarvest: plants.filter(
        (p) =>
          p.growthStage >= 80 &&
          (!p.lastHarvested ||
            new Date() - new Date(p.lastHarvested) > 7 * 24 * 60 * 60 * 1000),
      ).length,
      averageHealth:
        plants.length > 0
          ? Math.round(
              plants.reduce((sum, p) => sum + p.health, 0) / plants.length,
            )
          : 0,
      averageWaterLevel:
        plants.length > 0
          ? Math.round(
              plants.reduce((sum, p) => sum + p.waterLevel, 0) / plants.length,
            )
          : 0,
      averageGrowthStage:
        plants.length > 0
          ? Math.round(
              plants.reduce((sum, p) => sum + p.growthStage, 0) / plants.length,
            )
          : 0,
    };

    res.json(stats);
  } catch (error) {
    console.error("Get health stats error:", error);
    res.status(500).json({ error: "Failed to fetch plant health statistics" });
  }
});

// Update plant status (for admin/testing purposes)
router.patch("/:plantId/status", authenticateToken, async (req, res) => {
  try {
    const { plantId } = req.params;
    const { health, waterLevel, growthStage } = req.body;

    const plant = await req.prisma.plantInstance.findFirst({
      where: {
        id: plantId,
        garden: {
          userId: req.user.id,
        },
      },
    });

    if (!plant) {
      return res.status(404).json({ error: "Plant not found" });
    }

    const updateData = {};
    if (health !== undefined)
      updateData.health = Math.max(0, Math.min(100, health));
    if (waterLevel !== undefined)
      updateData.waterLevel = Math.max(0, Math.min(100, waterLevel));
    if (growthStage !== undefined)
      updateData.growthStage = Math.max(0, Math.min(100, growthStage));

    const updatedPlant = await req.prisma.plantInstance.update({
      where: { id: plantId },
      data: updateData,
      include: {
        species: true,
      },
    });

    res.json(updatedPlant);
  } catch (error) {
    console.error("Update plant status error:", error);
    res.status(500).json({ error: "Failed to update plant status" });
  }
});

// Plant growth simulation (for testing/demo)
router.post(
  "/:plantId/simulate-growth",
  authenticateToken,
  async (req, res) => {
    try {
      const { plantId } = req.params;
      const { days = 1 } = req.body;

      const plant = await req.prisma.plantInstance.findFirst({
        where: {
          id: plantId,
          garden: {
            userId: req.user.id,
          },
        },
        include: {
          species: true,
        },
      });

      if (!plant) {
        return res.status(404).json({ error: "Plant not found" });
      }

      // Simulate growth over specified days
      const growthRate = 100 / (plant.species.growthTime || 30); // Daily growth rate
      const waterDecayRate = 15; // Daily water level decrease
      const healthChangeRate = plant.waterLevel > 20 ? 2 : -5; // Health change based on water

      const newGrowthStage = Math.min(
        100,
        plant.growthStage + growthRate * days,
      );
      const newWaterLevel = Math.max(
        0,
        plant.waterLevel - waterDecayRate * days,
      );
      const newHealth = Math.max(
        0,
        Math.min(100, plant.health + healthChangeRate * days),
      );

      const updatedPlant = await req.prisma.plantInstance.update({
        where: { id: plantId },
        data: {
          growthStage: newGrowthStage,
          waterLevel: newWaterLevel,
          health: newHealth,
        },
        include: {
          species: true,
        },
      });

      res.json({
        ...updatedPlant,
        simulation: {
          daysSimulated: days,
          changes: {
            growth: newGrowthStage - plant.growthStage,
            water: newWaterLevel - plant.waterLevel,
            health: newHealth - plant.health,
          },
        },
      });
    } catch (error) {
      console.error("Simulate growth error:", error);
      res.status(500).json({ error: "Failed to simulate plant growth" });
    }
  },
);

export default router;
