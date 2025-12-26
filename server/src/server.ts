import app from "./app";

const PORT = process.env.PORT
    ? Number(process.env.PORT)
    : 7860;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Network: http://localhost:${PORT}`);
});
