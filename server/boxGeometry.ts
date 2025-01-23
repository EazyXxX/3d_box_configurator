import { BoxDimensions, Vertex, Triangle, BoxData } from "../shared/types";

export function calculateBoxTriangulation(dimensions: BoxDimensions): BoxData {
  const { length: l, width: w, height: h } = dimensions;

  // Defining 8 vertices of the box
  const vertices: Vertex[] = [
    { x: 0, y: 0, z: 0 }, // 0: front bottom left
    { x: l, y: 0, z: 0 }, // 1: front bottom right
    { x: l, y: h, z: 0 }, // 2: front top right
    { x: 0, y: h, z: 0 }, // 3: front top left
    { x: 0, y: 0, z: w }, // 4: back bottom left
    { x: l, y: 0, z: w }, // 5: back bottom right
    { x: l, y: h, z: w }, // 6: back top right
    { x: 0, y: h, z: w }, // 7: back top left
  ];

  // Defining 12 triangles (2 per face)
  const triangles: Triangle[] = [
    // Front face
    { v1: vertices[0], v2: vertices[1], v3: vertices[2] },
    { v1: vertices[0], v2: vertices[2], v3: vertices[3] },

    // Back face
    { v1: vertices[5], v2: vertices[4], v3: vertices[7] },
    { v1: vertices[5], v2: vertices[7], v3: vertices[6] },

    // Top face
    { v1: vertices[3], v2: vertices[2], v3: vertices[6] },
    { v1: vertices[3], v2: vertices[6], v3: vertices[7] },

    // Bottom face
    { v1: vertices[4], v2: vertices[5], v3: vertices[1] },
    { v1: vertices[4], v2: vertices[1], v3: vertices[0] },

    // Right face
    { v1: vertices[1], v2: vertices[5], v3: vertices[6] },
    { v1: vertices[1], v2: vertices[6], v3: vertices[2] },

    // Left face
    { v1: vertices[4], v2: vertices[0], v3: vertices[3] },
    { v1: vertices[4], v2: vertices[3], v3: vertices[7] },
  ];

  return {
    triangles,
  };
}
