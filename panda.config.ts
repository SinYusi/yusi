import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";

export default defineConfig({
  preflight: true,

  presets: [
    "@pandacss/preset-base",
    createPreset({ accentColor: "indigo", grayColor: "slate", borderRadius: "sm" }),
  ],

  include: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],

  exclude: [],

  globalCss: {
    "html, body": {
      fontFamily: "sans",
    },
  },

  theme: {
    extend: {
      tokens: {
        fonts: {
          sans: {
            value: "var(--font-geist-sans), var(--font-noto-sans-kr), sans-serif",
          },
        },
      },
      semanticTokens: {
        colors: {
          bg: {
            canvas: {
              value: { base: "#FAFBFC", _dark: "#111113" },
            },
            subtle: {
              value: { base: "#F0F1F4", _dark: "#1A1B1E" },
            },
          },
          border: {
            subtle: {
              value: { base: "#E2E4E9", _dark: "#2A2E35" },
            },
          },
          text: {
            default: {
              value: { base: "#1C2024", _dark: "#EDEEF0" },
            },
            muted: {
              value: { base: "#60646C", _dark: "#787E86" },
            },
          },
        },
      },
    },
  },

  jsxFramework: "react",

  outdir: "styled-system",
});
