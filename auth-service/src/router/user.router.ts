import { Router } from "express";
import { prisma } from "main-db";
import { OAuth2Client } from "google-auth-library";
import { createClient } from "redis";
const redis = createClient();
redis.on("error", (err) => console.log("Redis Client Error", err));

await redis.connect();

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!
);
const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    res.status(409).json({
      message: "User already exists with this email",
    });
    return;
  }

  const user = await prisma.user.create({
    data: {
      email,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.status(201).json({
    message: "User created successfully",
    user,
  });
});

userRouter.post("/signin", async (req, res) => {
  const { email, otp } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  // otp from redis cache
  const otpFromRedis = await redis.get(email);

  if (otpFromRedis !== otp) {
    res.status(401).json({ message: "Invalid OTP" });
    return;
  }

  res.status(200).json({
    message: "User signed in successfully",

    user: {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
});
userRouter.post("/google-signin", async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      res.status(400).json({
        message: "idToken is required",
      });
      return;
    }
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID!,
    });
    const payload = ticket.getPayload();
    if (!payload?.email) {
      res.status(400).json({
        message: "Invalid idToken",
      });
      return;
    }
    const email = payload.email as string;

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          email,
        },
        select: {
          id: true,
          email: true,
        },
      });
      res.status(201).json({
        message: "User createdsuccessfully",
        user: newUser,
      });
    } else {
      res.status(200).json({
        message: "User signed in successfully",
        user: {
          id: user.id,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
