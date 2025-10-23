import { cwd } from "node:process";
import { loadEnvConfig } from "@next/env";

// Load environment variables FIRST
loadEnvConfig(cwd());

// Now import database modules after env is loaded
import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { eq } from "drizzle-orm";
import * as schema from "../db/schema";
import { user, account } from "../db/schema";
import bcrypt from "bcryptjs";

// Create database connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL!,
});
const db = drizzle(pool, { schema });

async function createAdmin() {
  console.log("🔐 Creating admin user...");

  try {
    const adminEmail = "admin@kcic.com";
    const adminPassword = "admin123";

    // Check if user already exists
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, adminEmail),
    });

    if (existingUser) {
      console.log("⚠️  Admin user already exists. Updating password...");

      // Delete old account
      await db.delete(account).where(eq(account.userId, existingUser.id));

      // Create new account with proper password hash (bcrypt with 10 rounds)
      const passwordHash = await bcrypt.hash(adminPassword, 10);

      await db.insert(account).values({
        id: crypto.randomUUID(),
        accountId: existingUser.id,
        providerId: "credential",
        userId: existingUser.id,
        password: passwordHash,
        accessToken: null,
        refreshToken: null,
        idToken: null,
        accessTokenExpiresAt: null,
        refreshTokenExpiresAt: null,
        scope: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log("✅ Admin password updated successfully!");
    } else {
      // Create new user
      const userId = crypto.randomUUID();
      const passwordHash = await bcrypt.hash(adminPassword, 10);

      await db.insert(user).values({
        id: userId,
        email: adminEmail,
        emailVerified: true,
        name: "Admin User",
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await db.insert(account).values({
        id: crypto.randomUUID(),
        accountId: userId,
        providerId: "credential",
        userId: userId,
        password: passwordHash,
        accessToken: null,
        refreshToken: null,
        idToken: null,
        accessTokenExpiresAt: null,
        refreshTokenExpiresAt: null,
        scope: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log("✅ Admin user created successfully!");
    }

    console.log("\n📧 Email: admin@kcic.com");
    console.log("🔑 Password: admin123");
    console.log("\n⚠️  Please change this password after first login!\n");
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    throw error;
  }
}

// Run the function
createAdmin()
  .then(async () => {
    console.log("Done. Closing connection...");
    await pool.end();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error("Failed:", error);
    await pool.end();
    process.exit(1);
  });
