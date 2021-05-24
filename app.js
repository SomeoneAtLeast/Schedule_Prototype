const express = require("express");
const config = require("config");
const path = require("path")
const mongoose = require("mongoose");

const app = express();

app.use(express.json({limit: '50mb', extended: true}));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/seats", require("./routes/seats.routes"));
app.use("/api/shifts", require("./routes/shifts.routes"));
app.use("/api/workers", require("./routes/workers.routes"));
app.use("/api/dates", require("./routes/dates.routes"));

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client", "build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = config.get("port") || 5000;

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    }
    catch (e) {
        console.log("Server Error", e.message);
        process.exit(1);
    }
}

start();