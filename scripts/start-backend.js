#!/usr/bin/env node

import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

console.log("🌱 Virtual Garden Backend Startup");
console.log("==================================");

// Check if .env file exists
const envPath = join(rootDir, ".env");
if (!fs.existsSync(envPath)) {
  console.log("⚠️  No .env file found. Creating from template...");
  const envExamplePath = join(rootDir, ".env.example");
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log("✅ Created .env file from template");
    console.log("📝 Please update the .env file with your configuration");
  } else {
    console.log("❌ No .env.example found. Please create .env manually");
    process.exit(1);
  }
}

// Check if node_modules exists
const nodeModulesPath = join(rootDir, "node_modules");
if (!fs.existsSync(nodeModulesPath)) {
  console.log("📦 Installing dependencies...");
  const npmInstall = spawn("npm", ["install"], {
    cwd: rootDir,
    stdio: "inherit",
  });

  npmInstall.on("close", (code) => {
    if (code === 0) {
      console.log("✅ Dependencies installed");
      startDatabase();
    } else {
      console.log("❌ Failed to install dependencies");
      process.exit(1);
    }
  });
} else {
  startDatabase();
}

function startDatabase() {
  console.log("🗄️  Setting up database...");

  // Generate Prisma client
  const prismGen = spawn("npx", ["prisma", "generate"], {
    cwd: rootDir,
    stdio: "inherit",
  });

  prismGen.on("close", (code) => {
    if (code === 0) {
      console.log("✅ Prisma client generated");

      // Push database schema
      const prismaPush = spawn("npx", ["prisma", "db", "push"], {
        cwd: rootDir,
        stdio: "inherit",
      });

      prismaPush.on("close", (code) => {
        if (code === 0) {
          console.log("✅ Database schema applied");
          seedDatabase();
        } else {
          console.log(
            "⚠️  Database push failed. Continuing with server startup...",
          );
          startServer();
        }
      });
    } else {
      console.log("❌ Failed to generate Prisma client");
      process.exit(1);
    }
  });
}

function seedDatabase() {
  console.log("🌱 Seeding database...");

  const seed = spawn("npm", ["run", "db:seed"], {
    cwd: rootDir,
    stdio: "inherit",
  });

  seed.on("close", (code) => {
    if (code === 0) {
      console.log("✅ Database seeded successfully");
    } else {
      console.log("⚠️  Database seeding failed. Server will start anyway...");
    }
    startServer();
  });
}

function startServer() {
  console.log("🚀 Starting Virtual Garden API server...");
  console.log("");

  const server = spawn("npm", ["run", "server"], {
    cwd: rootDir,
    stdio: "inherit",
  });

  server.on("close", (code) => {
    console.log(`Server exited with code ${code}`);
  });

  // Handle process termination
  process.on("SIGINT", () => {
    console.log("\n🛑 Shutting down...");
    server.kill("SIGINT");
  });

  process.on("SIGTERM", () => {
    console.log("\n🛑 Shutting down...");
    server.kill("SIGTERM");
  });
}
