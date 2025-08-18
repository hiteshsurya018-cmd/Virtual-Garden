import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchUserGardens, createGarden } from '../../store/slices/gardenSlice';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  Plus,
  Leaf,
  Sparkles,
  TrendingUp,
  Calendar,
  Users,
  Trophy,
  MapPin,
  Settings,
  Camera,
  TreePine,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { gardens, isLoading } = useAppSelector((state) => state.garden);
  const [showCreateGarden, setShowCreateGarden] = useState(false);

  useEffect(() => {
    dispatch(fetchUserGardens());
  }, [dispatch]);

  const handleCreateGarden = async () => {
    await dispatch(createGarden({
      name: `Garden ${gardens.length + 1}`,
      description: 'My beautiful virtual garden'
    }));
    setShowCreateGarden(false);
  };

  const getUserLevel = () => {
    if (!user) return 1;
    return Math.floor(user.experience / 1000) + 1;
  };

  const getExperienceProgress = () => {
    if (!user) return 0;
    return (user.experience % 1000) / 10; // Convert to percentage
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.firstName || user?.username}! 🌱
            </h1>
            <p className="text-gray-600 mt-1">
              Ready to tend your virtual gardens?
            </p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </motion.div>

        {/* User Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Level</p>
                    <p className="text-2xl font-bold">{getUserLevel()}</p>
                  </div>
                  <Trophy className="w-8 h-8 text-green-100" />
                </div>
                <div className="mt-3">
                  <Progress value={getExperienceProgress()} className="bg-green-400" />
                  <p className="text-xs text-green-100 mt-1">
                    {user?.experience % 1000}/1000 XP
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100">Coins</p>
                    <p className="text-2xl font-bold">{user?.coins || 0}</p>
                  </div>
                  <Sparkles className="w-8 h-8 text-yellow-100" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Gardens</p>
                    <p className="text-2xl font-bold">{gardens.length}</p>
                  </div>
                  <Leaf className="w-8 h-8 text-blue-100" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Total Plants</p>
                    <p className="text-2xl font-bold">
                      {gardens.reduce((total, garden) => total + garden.plantsCount, 0)}
                    </p>
                  </div>
                  <TreePine className="w-8 h-8 text-purple-100" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  onClick={() => setShowCreateGarden(true)}
                >
                  <Plus className="w-6 h-6" />
                  New Garden
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Camera className="w-6 h-6" />
                  Analyze Photo
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <MapPin className="w-6 h-6" />
                  Store
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Users className="w-6 h-6" />
                  Community
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Gardens Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Your Gardens</h2>
            <Button onClick={() => setShowCreateGarden(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Garden
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gardens.map((garden, index) => (
              <motion.div
                key={garden.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to={`/garden/${garden.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-0">
                      <div className="h-40 bg-gradient-to-br from-green-200 to-green-300 rounded-t-lg relative overflow-hidden">
                        {garden.imageUrl ? (
                          <img
                            src={garden.imageUrl}
                            alt={garden.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Leaf className="w-16 h-16 text-green-500 opacity-50" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-white/90 text-green-700">
                            Level {garden.level}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{garden.name}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {garden.description || 'No description'}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Leaf className="w-3 h-3" />
                            {garden.plantsCount} plants
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(garden.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {garden.width && garden.height && (
                          <div className="mt-2">
                            <Progress value={(garden.experience / (garden.level * 100)) * 100} className="h-2" />
                            <p className="text-xs text-gray-500 mt-1">
                              {garden.width.toFixed(1)}m × {garden.height.toFixed(1)}m
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}

            {/* Create Garden Card */}
            <motion.div variants={itemVariants}>
              <Card
                className="h-full border-2 border-dashed border-gray-300 hover:border-green-400 transition-colors cursor-pointer"
                onClick={() => setShowCreateGarden(true)}
              >
                <CardContent className="flex flex-col items-center justify-center h-64 text-gray-500 hover:text-green-600 transition-colors">
                  <Plus className="w-12 h-12 mb-4" />
                  <h3 className="font-medium">Create New Garden</h3>
                  <p className="text-sm text-center mt-2">
                    Start your virtual gardening journey
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Planted new roses in Garden 1</p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Reached Level 5!</p>
                    <p className="text-sm text-gray-600">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Earned 100 coins from harvest</p>
                    <p className="text-sm text-gray-600">2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Create Garden Modal would go here */}
      {showCreateGarden && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-lg max-w-md w-full mx-4"
          >
            <h2 className="text-xl font-bold mb-4">Create New Garden</h2>
            <p className="text-gray-600 mb-4">
              Start by uploading a photo of your garden space, or create a blank garden to design from scratch.
            </p>
            <div className="flex gap-3">
              <Button onClick={handleCreateGarden} className="flex-1">
                Create Blank Garden
              </Button>
              <Button variant="outline" onClick={() => setShowCreateGarden(false)}>
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
