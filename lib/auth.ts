import jwt from "jsonwebtoken";

export function authMiddleware(req: Request) {
  const auth = req.headers.get("authorization");

  if (!auth) {
    return { error: "Unauthorized" };
  }

  const token = auth.replace("Bearer ", "");

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);

    return { user };
  } catch {
    return { error: "Invalid token" };
  }
}
