import app from "./app.js";
import { startDatabase } from "./database/index.js";

export default app.listen(3000, () => {
  startDatabase();
  console.log("Server running");
});
