import app from "./src/app.js";
import configure from "./src/config/config.js";
import connectDb from "./src/config/db.js";

const PORT = configure.PORT || 5000
connectDb();

app.listen(PORT, () => {
    console.log(`Server is ready to run on port:- ${PORT}`)
})