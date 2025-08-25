import express from 'express';
import bcrypt from 'bcryptjs';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await req.prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        avatar: true,
        level: true,
        experience: true,
        coins: true,
        createdAt: true,
        gardens: {
          select: {
            id: true,
            name: true,
            plantsCount: true,
            createdAt: true
          }
        },
        achievements: {
          include: {
            achievement: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate additional stats
    const totalPlants = user.gardens.reduce((sum, garden) => sum + garden.plantsCount, 0);
    const totalGardens = user.gardens.length;
    
    const plantsWithHealth = await req.prisma.plantInstance.findMany({
      where: {
        garden: {
          userId: req.user.id
        }
      },
      select: {
        health: true,
        growthStage: true
      }
    });

    const healthyPlants = plantsWithHealth.filter(plant => plant.health >= 80).length;
    const maturePlants = plantsWithHealth.filter(plant => plant.growthStage >= 80).length;
    const successRate = totalPlants > 0 ? Math.round((healthyPlants / totalPlants) * 100) : 100;

    res.json({
      ...user,
      stats: {
        totalGardens,
        totalPlants,
        healthyPlants,
        maturePlants,
        successRate
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      avatar,
      email
    } = req.body;

    // Check if username is taken (if being changed)
    if (username && username !== req.user.username) {
      const existingUser = await req.prisma.user.findUnique({
        where: { username }
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Username already taken' });
      }
    }

    // Check if email is taken (if being changed)
    if (email && email !== req.user.email) {
      const existingUser = await req.prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }
    }

    const updatedUser = await req.prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(username && { username }),
        ...(avatar && { avatar }),
        ...(email && { email })
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        avatar: true,
        level: true,
        experience: true,
        coins: true
      }
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Change password
router.put('/password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        error: 'Current password and new password are required' 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        error: 'New password must be at least 6 characters long' 
      });
    }

    const user = await req.prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user.password) {
      return res.status(400).json({ 
        error: 'Account was created with social login. Cannot change password.' 
      });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await req.prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedPassword }
    });

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// Get user achievements
router.get('/achievements', authenticateToken, async (req, res) => {
  try {
    const userAchievements = await req.prisma.userAchievement.findMany({
      where: { userId: req.user.id },
      include: {
        achievement: true
      },
      orderBy: { unlockedAt: 'desc' }
    });

    // Get all available achievements
    const allAchievements = await req.prisma.achievement.findMany({
      orderBy: { id: 'asc' }
    });

    // Combine with user progress
    const achievementsWithProgress = allAchievements.map(achievement => {
      const userProgress = userAchievements.find(
        ua => ua.achievementId === achievement.id
      );

      return {
        ...achievement,
        isUnlocked: !!userProgress?.isCompleted,
        progress: userProgress?.progress || 0,
        unlockedAt: userProgress?.unlockedAt || null
      };
    });

    res.json(achievementsWithProgress);
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});

// Get user statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const user = await req.prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        gardens: {
          include: {
            plants: {
              include: {
                species: true
              }
            }
          }
        },
        purchases: {
          include: {
            item: true
          }
        },
        achievements: {
          where: { isCompleted: true }
        }
      }
    });

    const stats = {
      // Garden Stats
      totalGardens: user.gardens.length,
      totalPlants: user.gardens.reduce((sum, garden) => sum + garden.plantsCount, 0),
      
      // Plant Health Stats
      healthyPlants: 0,
      maturePlants: 0,
      wateringNeeded: 0,
      
      // Economic Stats
      totalCoinsSpent: user.purchases.reduce((sum, purchase) => sum + purchase.totalPrice, 0),
      totalPurchases: user.purchases.length,
      
      // Achievement Stats
      achievementsUnlocked: user.achievements.length,
      
      // Activity Stats
      averageGardenLevel: user.gardens.length > 0 
        ? user.gardens.reduce((sum, garden) => sum + garden.level, 0) / user.gardens.length 
        : 0,
      
      // Time-based stats
      accountAge: Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24)),
      
      // Level progress
      currentLevel: Math.floor(user.experience / 1000) + 1,
      nextLevelProgress: user.experience % 1000,
      nextLevelTarget: 1000
    };

    // Calculate plant health stats
    const allPlants = user.gardens.flatMap(garden => garden.plants);
    stats.healthyPlants = allPlants.filter(plant => plant.health >= 80).length;
    stats.maturePlants = allPlants.filter(plant => plant.growthStage >= 80).length;
    stats.wateringNeeded = allPlants.filter(plant => plant.waterLevel < 30).length;
    
    // Success rate
    stats.successRate = stats.totalPlants > 0 
      ? Math.round((stats.healthyPlants / stats.totalPlants) * 100) 
      : 100;

    res.json(stats);
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ error: 'Failed to fetch user statistics' });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const { type = 'experience', limit = 10 } = req.query;

    let orderBy = {};
    switch (type) {
      case 'coins':
        orderBy = { coins: 'desc' };
        break;
      case 'gardens':
        // This would need a computed field or subquery
        orderBy = { experience: 'desc' }; // Fallback
        break;
      case 'level':
        orderBy = { experience: 'desc' };
        break;
      default:
        orderBy = { experience: 'desc' };
    }

    const users = await req.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        avatar: true,
        level: true,
        experience: true,
        coins: true,
        gardens: {
          select: {
            id: true,
            plantsCount: true
          }
        }
      },
      orderBy,
      take: parseInt(limit)
    });

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      level: Math.floor(user.experience / 1000) + 1,
      experience: user.experience,
      coins: user.coins,
      totalGardens: user.gardens.length,
      totalPlants: user.gardens.reduce((sum, garden) => sum + garden.plantsCount, 0)
    }));

    res.json(leaderboard);
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Award coins/experience (for achievements, daily rewards, etc.)
router.post('/reward', authenticateToken, async (req, res) => {
  try {
    const { type, amount, reason } = req.body;

    if (!type || !amount || amount <= 0) {
      return res.status(400).json({ 
        error: 'Type and positive amount are required' 
      });
    }

    if (!['coins', 'experience'].includes(type)) {
      return res.status(400).json({ 
        error: 'Type must be coins or experience' 
      });
    }

    const updateData = {};
    updateData[type] = { increment: amount };

    const updatedUser = await req.prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      select: {
        level: true,
        experience: true,
        coins: true
      }
    });

    // Check for level up
    const newLevel = Math.floor(updatedUser.experience / 1000) + 1;
    const leveledUp = newLevel > req.user.level;

    if (leveledUp) {
      // Award bonus coins for level up
      await req.prisma.user.update({
        where: { id: req.user.id },
        data: {
          coins: { increment: newLevel * 50 }
        }
      });
    }

    res.json({
      message: `Awarded ${amount} ${type}`,
      newBalance: updatedUser[type],
      leveledUp,
      newLevel: leveledUp ? newLevel : undefined,
      levelUpBonus: leveledUp ? newLevel * 50 : undefined,
      reason
    });
  } catch (error) {
    console.error('Award reward error:', error);
    res.status(500).json({ error: 'Failed to award reward' });
  }
});

// Friends system
router.get('/friends', authenticateToken, async (req, res) => {
  try {
    const user = await req.prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        friends: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true,
            level: true,
            experience: true
          }
        }
      }
    });

    res.json(user.friends);
  } catch (error) {
    console.error('Get friends error:', error);
    res.status(500).json({ error: 'Failed to fetch friends' });
  }
});

router.post('/friends/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user.id) {
      return res.status(400).json({ error: 'Cannot add yourself as friend' });
    }

    // Check if user exists
    const targetUser = await req.prisma.user.findUnique({
      where: { id: userId }
    });

    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add friendship (bidirectional)
    await req.prisma.user.update({
      where: { id: req.user.id },
      data: {
        friends: {
          connect: { id: userId }
        }
      }
    });

    res.json({ message: 'Friend added successfully' });
  } catch (error) {
    console.error('Add friend error:', error);
    res.status(500).json({ error: 'Failed to add friend' });
  }
});

export default router;
