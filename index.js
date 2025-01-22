import { app } from "./app.js";
import dbconect from "./db/db.js";

dbconect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`⚙️ Server is running at port : ${PORT}`);
});
