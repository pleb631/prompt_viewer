import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
// https://vite.dev/config/
export default () => {
    return {
        base: "/prompt_viewer/",
        plugins: [
            vue(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
            createSvgIconsPlugin({
                // Specify the icon folder to be cached
                iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
                // Specify symbolId format
                symbolId: "icon-[dir]-[name]",
            }),
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                "~": path.resolve(__dirname, "src/assets"),
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    javascriptEnabled: true,
                    additionalData: `@import "@/styles/variable.scss";`,
                },
            },
        },
    };
};
