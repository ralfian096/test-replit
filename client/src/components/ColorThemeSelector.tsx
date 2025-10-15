import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export type ColorTheme = "default" | "red" | "green" | "orange";

const themes = {
  default: {
    name: "Default (Biru)",
    colors: {
      light: {
        primary: "210 100% 50%",
        ring: "210 100% 50%",
        sidebarPrimary: "210 100% 50%",
        sidebarRing: "210 100% 50%",
      },
      dark: {
        primary: "210 100% 60%",
        ring: "210 100% 60%",
        sidebarPrimary: "210 100% 60%",
        sidebarRing: "210 100% 60%",
      }
    }
  },
  red: {
    name: "Merah",
    colors: {
      light: {
        primary: "0 72% 48%",
        ring: "0 72% 48%",
        sidebarPrimary: "0 72% 48%",
        sidebarRing: "0 72% 48%",
      },
      dark: {
        primary: "0 72% 55%",
        ring: "0 72% 55%",
        sidebarPrimary: "0 72% 55%",
        sidebarRing: "0 72% 55%",
      }
    }
  },
  green: {
    name: "Hijau",
    colors: {
      light: {
        primary: "142 70% 38%",
        ring: "142 70% 38%",
        sidebarPrimary: "142 70% 38%",
        sidebarRing: "142 70% 38%",
      },
      dark: {
        primary: "142 70% 45%",
        ring: "142 70% 45%",
        sidebarPrimary: "142 70% 45%",
        sidebarRing: "142 70% 45%",
      }
    }
  },
  orange: {
    name: "Jingga",
    colors: {
      light: {
        primary: "38 92% 50%",
        ring: "38 92% 50%",
        sidebarPrimary: "38 92% 50%",
        sidebarRing: "38 92% 50%",
      },
      dark: {
        primary: "38 92% 50%",
        ring: "38 92% 50%",
        sidebarPrimary: "38 92% 50%",
        sidebarRing: "38 92% 50%",
      }
    }
  }
};

export function ColorThemeSelector() {
  const [colorTheme, setColorTheme] = useState<ColorTheme>("default");

  useEffect(() => {
    const savedColorTheme = localStorage.getItem("colorTheme") as ColorTheme | null;
    const initialColorTheme = savedColorTheme || "default";
    setColorTheme(initialColorTheme);
    applyColorTheme(initialColorTheme);
  }, []);

  const applyColorTheme = (theme: ColorTheme) => {
    const isDark = document.documentElement.classList.contains("dark");
    const mode = isDark ? "dark" : "light";
    const colors = themes[theme].colors[mode];

    const root = document.documentElement;
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--ring", colors.ring);
    root.style.setProperty("--sidebar-primary", colors.sidebarPrimary);
    root.style.setProperty("--sidebar-ring", colors.sidebarRing);
  };

  const changeColorTheme = (theme: ColorTheme) => {
    setColorTheme(theme);
    localStorage.setItem("colorTheme", theme);
    applyColorTheme(theme);
  };

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          applyColorTheme(colorTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    return () => observer.disconnect();
  }, [colorTheme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          data-testid="button-color-theme-toggle"
        >
          <Palette className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.entries(themes) as [ColorTheme, typeof themes[ColorTheme]][]).map(([key, theme]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => changeColorTheme(key)}
            className={colorTheme === key ? "bg-accent" : ""}
          >
            {theme.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
