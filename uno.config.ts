import {
  defineConfig,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  content: {
    filesystem: ["src/**/*.{ts,tsx}"],
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
