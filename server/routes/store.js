import express from "express";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Get all store categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await req.prisma.storeCategory.findMany({
      include: {
        items: {
          where: { isAvailable: true },
          include: {
            species: true,
          },
        },
      },
      orderBy: { sortOrder: "asc" },
    });

    res.json(categories);
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ error: "Failed to fetch store categories" });
  }
});

// Get all store items
router.get("/items", async (req, res) => {
  try {
    const { category, type, search, limit = 20, offset = 0 } = req.query;

    const where = {
      isAvailable: true,
      ...(category && { categoryId: category }),
      ...(type && { itemType: type }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const items = await req.prisma.storeItem.findMany({
      where,
      include: {
        category: true,
        species: true,
      },
      take: parseInt(limit),
      skip: parseInt(offset),
      orderBy: { createdAt: "desc" },
    });

    const total = await req.prisma.storeItem.count({ where });

    res.json({
      items,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Get store items error:", error);
    res.status(500).json({ error: "Failed to fetch store items" });
  }
});

// Get specific store item
router.get("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const item = await req.prisma.storeItem.findUnique({
      where: { id },
      include: {
        category: true,
        species: true,
      },
    });

    if (!item || !item.isAvailable) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    console.error("Get store item error:", error);
    res.status(500).json({ error: "Failed to fetch store item" });
  }
});

// Purchase item
router.post("/purchase", authenticateToken, async (req, res) => {
  try {
    const { itemId, quantity = 1 } = req.body;

    if (!itemId) {
      return res.status(400).json({ error: "Item ID is required" });
    }

    const item = await req.prisma.storeItem.findUnique({
      where: { id: itemId },
      include: { species: true },
    });

    if (!item || !item.isAvailable) {
      return res.status(404).json({ error: "Item not found or unavailable" });
    }

    // Check stock
    if (item.stock !== null && item.stock < quantity) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    const totalPrice = item.price * quantity;

    // Check if user has enough coins
    const user = await req.prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (user.coins < totalPrice) {
      return res.status(400).json({
        error: "Insufficient coins",
        required: totalPrice,
        available: user.coins,
      });
    }

    // Create purchase transaction
    const purchase = await req.prisma.$transaction(async (prisma) => {
      // Deduct coins from user
      await prisma.user.update({
        where: { id: req.user.id },
        data: {
          coins: { decrement: totalPrice },
        },
      });

      // Update stock if limited
      if (item.stock !== null) {
        await prisma.storeItem.update({
          where: { id: itemId },
          data: {
            stock: { decrement: quantity },
          },
        });
      }

      // Create purchase record
      const newPurchase = await prisma.purchase.create({
        data: {
          userId: req.user.id,
          itemId,
          quantity,
          totalPrice,
          paymentMethod: "coins",
        },
        include: {
          item: {
            include: {
              species: true,
            },
          },
        },
      });

      return newPurchase;
    });

    // Add experience for purchase
    await req.prisma.user.update({
      where: { id: req.user.id },
      data: {
        experience: { increment: quantity * 5 },
      },
    });

    res.json({
      message: "Purchase successful",
      purchase,
      coinsSpent: totalPrice,
      experienceGained: quantity * 5,
    });
  } catch (error) {
    console.error("Purchase error:", error);
    res.status(500).json({ error: "Failed to complete purchase" });
  }
});

// Get user's purchase history
router.get("/purchases", authenticateToken, async (req, res) => {
  try {
    const { limit = 20, offset = 0 } = req.query;

    const purchases = await req.prisma.purchase.findMany({
      where: { userId: req.user.id },
      include: {
        item: {
          include: {
            species: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: parseInt(limit),
      skip: parseInt(offset),
    });

    const total = await req.prisma.purchase.count({
      where: { userId: req.user.id },
    });

    res.json({
      purchases,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Get purchases error:", error);
    res.status(500).json({ error: "Failed to fetch purchase history" });
  }
});

// Get featured/recommended items
router.get("/featured", async (req, res) => {
  try {
    const featuredItems = await req.prisma.storeItem.findMany({
      where: {
        isAvailable: true,
        // Add logic for featured items (e.g., by properties or manual flag)
      },
      include: {
        category: true,
        species: true,
      },
      take: 8,
      orderBy: [{ createdAt: "desc" }],
    });

    res.json(featuredItems);
  } catch (error) {
    console.error("Get featured items error:", error);
    res.status(500).json({ error: "Failed to fetch featured items" });
  }
});

// Admin endpoints (for seeding/managing store)
router.post("/admin/categories", authenticateToken, async (req, res) => {
  try {
    // Simple admin check (in production, use proper role-based auth)
    if (req.user.email !== "admin@virtualgarden.com") {
      return res.status(403).json({ error: "Admin access required" });
    }

    const { name, description, iconUrl, sortOrder = 0 } = req.body;

    const category = await req.prisma.storeCategory.create({
      data: {
        name,
        description,
        iconUrl,
        sortOrder,
      },
    });

    res.json(category);
  } catch (error) {
    console.error("Create category error:", error);
    res.status(500).json({ error: "Failed to create category" });
  }
});

router.post("/admin/items", authenticateToken, async (req, res) => {
  try {
    // Simple admin check
    if (req.user.email !== "admin@virtualgarden.com") {
      return res.status(403).json({ error: "Admin access required" });
    }

    const {
      name,
      description,
      price,
      imageUrl,
      itemType,
      categoryId,
      speciesId,
      properties,
      stock,
      isLimited = false,
    } = req.body;

    const item = await req.prisma.storeItem.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        itemType,
        categoryId,
        speciesId,
        properties,
        stock,
        isLimited,
      },
      include: {
        category: true,
        species: true,
      },
    });

    res.json(item);
  } catch (error) {
    console.error("Create store item error:", error);
    res.status(500).json({ error: "Failed to create store item" });
  }
});

export default router;
