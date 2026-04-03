import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";

export default defineConfig({
  preflight: true,

  presets: [
    "@pandacss/preset-base",
    createPreset({ accentColor: "amber", grayColor: "neutral", borderRadius: "sm" }),
  ],

  include: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],

  exclude: [],

  theme: {
    extend: {
      tokens: {
        fonts: {
          sans: { value: "var(--font-sans), 'Noto Sans KR', sans-serif" },
        },
      },
      semanticTokens: {
        colors: {
          bg: {
            canvas: {
              value: { base: "#FAFAF7", _dark: "#1B1916" },
            },
            subtle: {
              value: { base: "#F2EFE9", _dark: "#242119" },
            },
          },
          border: {
            subtle: {
              value: { base: "#E4DED4", _dark: "#2E2C27" },
            },
          },
          text: {
            default: {
              value: { base: "#272420", _dark: "#EDE9E2" },
            },
            muted: {
              value: { base: "#7A7670", _dark: "#6E6B65" },
            },
          },
        },
      },
    },
  },

  jsxFramework: "react",

  outdir: "styled-system",
});
