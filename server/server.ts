import express from "express";
import cors from "cors";
import { z } from "zod";
import { calculateBoxTriangulation } from "./boxGeometry.js";

const app = express();
const port = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

const BoxDimensionsSchema = z.object({
  length: z.number().positive(),
  width: z.number().positive(),
  height: z.number().positive(),
});

app.post("/api/box-geometry", (req, res) => {
  try {
    const dimensions = BoxDimensionsSchema.parse(req.body);

    const geometry = calculateBoxTriangulation(dimensions);

    res.json(geometry);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Invalid dimensions provided",
        details: error.errors,
      });
    } else {
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
