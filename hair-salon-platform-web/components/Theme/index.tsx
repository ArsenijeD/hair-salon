import { FC } from "react";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";

// When using TypeScript 4.x and above
import type {} from "@mui/x-data-grid/themeAugmentation";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "none",
        },
      },
    },
  },
});

const Theme: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
    </ThemeProvider>
  );
};

export const DarkTheme: FC = ({ children }) => {
  return (
    <ThemeProvider
      theme={(outerTheme) => {
        return createTheme({
          ...outerTheme,
          palette: {
            mode: "dark",
          },
        });
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
