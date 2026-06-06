import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../state/theme.slice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  const options = [
    {
      value: "light",
      label: "Light",
      icon: "ri-sun-fill",
    },
    {
      value: "dark",
      label: "Dark",
      icon: "ri-moon-clear-fill",
    },
    {
      value: "system",
      label: "System",
      icon: "ri-computer-fill",
    },
  ];

  const getCurrentIcon = () => {
    if (theme === "light") return "ri-sun-fill";
    if (theme === "dark") return "ri-moon-clear-fill";
    return "ri-computer-fill";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Change Theme"
          className="
          cursor-pointer
            relative
            flex
            items-center
            justify-center
            w-10
            h-10
            rounded-full
            border
            border-zinc-300 dark:border-white/10
            bg-white/90 dark:bg-white/5
            backdrop-blur-xl
            text-zinc-700 dark:text-white
            transition-all
            duration-300
            hover:border-[#e63b1f]/50
            hover:bg-[#e63b1f]/10
            hover:text-[#e63b1f]
            hover:shadow-[0_0_20px_rgba(230,59,31,0.25)]
            focus:outline-none
            focus:ring-2
            focus:ring-[#e63b1f]/40
            focus:ring-offset-2
            focus:ring-offset-white
            dark:focus:ring-offset-zinc-950
            active:scale-95
          "
        >
          <i
            className={`${getCurrentIcon()} text-lg transition-transform duration-300`}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="
          w-40
          rounded-xl
          border
          border-zinc-200 dark:border-white/10
          bg-white/95 dark:bg-[#141414]/95
          backdrop-blur-xl
          shadow-xl
          p-1
        "
      >
        <div className="px-3 py-2 text-[11px] font-semibold tracking-widest uppercase text-zinc-500">
          Appearance
        </div>

        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => dispatch(setTheme(option.value))}
            className={`
              flex
              items-center
              gap-2
              rounded-lg
              px-3
              py-2
              text-sm
              cursor-pointer
              transition-all
              duration-200
              focus:outline-none
              ${
                theme === option.value
                  ? "bg-[#e63b1f]/10 text-[#e63b1f]"
                  : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5"
              }
            `}
          >
            <i className={`${option.icon} text-base`} />

            <span className="flex-1 font-medium">{option.label}</span>

            {theme === option.value && (
              <div className="w-2 h-2 rounded-full bg-[#e63b1f]" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
