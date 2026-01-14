import mongoose from "mongoose";
import Note from "../src/models/note.js";
import connectDB from "../src/config/db.js";
import dotenv from "dotenv";

dotenv.config();

const projects = [
  {
    title: "Enterprise Network Segmentation with VLANs & ACLs",
    content:
      "Designed and implemented a segmented enterprise network using Cisco Packet Tracer. Configured VLANs, inter-VLAN routing, and ACLs to restrict traffic between departments.",
    techStack: [
      "Cisco Packet Tracer",
      "VLAN",
      "ACL",
      "Routing",
      "Networking Security",
    ],
    featured: true,
  },
  {
    title: "API Rate Limiting & Abuse Prevention",
    content:
      "Implemented rate limiting using Redis (Upstash) to protect APIs from brute-force and abuse attempts.",
    techStack: ["Node.js", "Express", "Redis", "API Security"],
    featured: true,
  },
  {
    title: "Cisco Cybersecurity Certifications",
    content:
      "Completed Cisco networking and cybersecurity certifications covering ethical hacking and network defense.",
    techStack: ["Cisco", "Networking", "Cybersecurity"],
    featured: false,
  },
  {
    title: "Codewars Algorithm Practice",
    content:
      "Solved 100+ algorithm challenges focusing on clean code and problem-solving.",
    techStack: ["JavaScript", "Python", "Algorithms"],
    featured: false,
  },
];

const seed = async () => {
  try {
    await connectDB();
    await Note.deleteMany();
    await Note.insertMany(projects);

    console.log("✅ Projects seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seed();