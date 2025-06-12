import { useTheme } from "../contexts/theme";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  const getThemeIcon = () => {
    if (theme === "light") {
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 2V4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 20V22"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M4 12H2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M22 12H20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M19.07 4.93L17.66 6.34"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M6.34 17.66L4.93 19.07"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M19.07 19.07L17.66 17.66"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M6.34 6.34L4.93 4.93"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    } else if (theme === "dark") {
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.58284 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.671 2.4956 11.7553 2.29085L12.531 3.57467C12.7825 3.41245 13.1201 3.36359 13.4449 3.44721C13.7608 3.52818 14.0585 3.73434 14.2487 4.02124C14.4389 4.30814 14.5 4.64307 14.5 5V1.25C14.5 0.532312 14.2017 -0.0322738 13.7626 -0.343972C13.3326 -0.649476 12.6676 -0.660024 12 2.75ZM21.7092 12.2447C21.8714 12.0932 21.9203 11.7556 21.8366 11.4308C21.7556 11.1149 21.5494 10.8172 21.2625 10.627C20.9756 10.4368 20.6407 10.3757 20.297 10.3757H22.75C22.75 9.64269 22.1855 9.04646 21.6080 8.73476C21.0214 8.41672 20.3398 8.42727 19.8675 8.75C19.3951 9.07273 19.25 9.60731 19.25 10.3757H22.75Z"
            fill="currentColor"
          />
        </svg>
      );
    } else {
      // System theme icon
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2"
            y="4"
            width="20"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M8 20H16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 18V20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Light mode";
      case "dark":
        return "Dark mode";
      case "system":
        return "System preference";
      default:
        return "Toggle theme";
    }
  };

  const getNextTheme = () => {
    if (theme === "light") return "dark";
    if (theme === "dark") return "system";
    return "light";
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-3 backdrop-blur-lg rounded-full transition-all duration-200 shadow-lg bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 hover:scale-105"
      title={`${getThemeLabel()} - Click to switch to ${getNextTheme()}`}
    >
      {getThemeIcon()}
    </button>
  );
}
