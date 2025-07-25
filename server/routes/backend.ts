/**
 * Backend Management API Routes
 * Provides endpoints to manage the Python backend
 */

import { Router } from 'express';
import { startBackendIfNeeded, isBackendRunning, checkBackendHealth, stopBackend } from '../backend-proxy.js';

const router = Router();

// Start backend endpoint
router.post('/start', async (req, res) => {
  try {
    console.log('🚀 Backend start requested via API...');
    const success = await startBackendIfNeeded();
    
    if (success) {
      res.json({
        success: true,
        message: 'Backend started successfully',
        status: 'running',
        endpoints: {
          health: 'http://localhost:8000/health',
          docs: 'http://localhost:8000/docs',
          detection: 'http://localhost:8000/api/detect-plants'
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to start backend',
        status: 'failed'
      });
    }
  } catch (error) {
    console.error('Backend start error:', error);
    res.status(500).json({
      success: false,
      message: 'Backend startup error',
      error: error.message
    });
  }
});

// Backend status endpoint
router.get('/status', async (req, res) => {
  try {
    const running = isBackendRunning();
    const healthy = running ? await checkBackendHealth() : false;
    
    res.json({
      running,
      healthy,
      status: healthy ? 'healthy' : running ? 'starting' : 'stopped',
      endpoints: {
        health: 'http://localhost:8000/health',
        docs: 'http://localhost:8000/docs',
        detection: 'http://localhost:8000/api/detect-plants'
      }
    });
  } catch (error) {
    res.json({
      running: false,
      healthy: false,
      status: 'error',
      error: error.message
    });
  }
});

// Stop backend endpoint
router.post('/stop', (req, res) => {
  try {
    stopBackend();
    res.json({
      success: true,
      message: 'Backend stop signal sent',
      status: 'stopping'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to stop backend',
      error: error.message
    });
  }
});

// Health check proxy
router.get('/health', async (req, res) => {
  try {
    const response = await fetch('http://localhost:8000/health');
    if (response.ok) {
      const data = await response.json();
      res.json({
        proxy: 'success',
        backend: data
      });
    } else {
      res.status(503).json({
        proxy: 'failed',
        message: 'Backend not responding'
      });
    }
  } catch (error) {
    res.status(503).json({
      proxy: 'error',
      message: 'Backend not accessible',
      error: error.message
    });
  }
});

export default router;
