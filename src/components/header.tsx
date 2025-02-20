import logoLight from "../assets/logo-cubos-light.svg";
import logoDark from "../assets/logo-cubos-dark.svg";
import { useTheme } from "./hooks/theme-provider";
import { ModeToggle } from "./hooks/mode-toggle";
import { Separator } from "@/components/ui/separator";

export function Header() {
  const { theme } = useTheme();
  return (
    <>
      <header className="flex justify-between items-center p-6">
        <img
          src={theme === "dark" ? logoDark : logoLight}
          alt="Logo Cubos"
          className="h-8"
        />
        <h1 className="text-start flex-1 ml-3 text-black dark:text-white text-bold text-2xl">
          Movies
        </h1>
        <ModeToggle />
      </header>
      <Separator />
    </>
  );
}
