import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    build: {
        outDir: "dist/public",
        rollupOptions: {
            input: {
                index:     resolve(__dirname, "src/pages/index.html"),
                login:     resolve(__dirname, "src/pages/login.html"),
                register:  resolve(__dirname, "src/pages/register.html"),
                converter: resolve(__dirname, "src/pages/converter.html"),
                rates:     resolve(__dirname, "src/pages/rates.html"),
            }
        }
    }
});