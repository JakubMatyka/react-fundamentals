import { useTheme } from "../contexts/theme";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleTheme}
        className="relative w-25 h-10 rounded-full transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50"
        style={{
          background: isDark ? "hsl(229, 25%, 16%)" : "hsl(204, 53%, 47%)",
          // Multiple shadow layers for depth illusion
          boxShadow: `
            0 2px 1px -0.5px ${
              isDark ? "rgb(255 255 255 / 0.95)" : "rgb(255 255 255 / 0.95)"
            },
            0 -2px 1px -0.5px ${
              isDark ? "rgb(15 23 42 / 0.4)" : "rgb(15 23 42 / 0.2)"
            },
            0 2px 10px 0 ${
              isDark ? "rgb(255 255 255 / 0.15)" : "rgb(255 255 255 / 0.15)"
            },
            0 4px 20px 0 ${
              isDark ? "rgb(139 92 246 / 0.3)" : "rgb(56 189 248 / 0.3)"
            }
          `,
        }}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        {/* Inner shadow layer for recessed effect */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: `
              inset 0 -2.5px 2.5px 0 rgb(15 23 42 / 0.15),
              inset 0 2.5px 2.5px 0 rgb(15 23 42 / 0.65)
            `,
          }}
        />

        {/* Content container with proper clipping */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {/* Stars for dark mode */}
          {isDark && (
            <>
              <div
                className="absolute w-1 h-1 bg-white rounded-full transition-all duration-500"
                style={{
                  top: "20%",
                  left: "15%",
                  opacity: "0.8",
                  transform: `scale(${isDark ? 1 : 0.25})`,
                  transitionDelay: isDark ? "0.2s" : "0s",
                }}
              />
              <div
                className="absolute w-0.5 h-0.5 bg-white rounded-full transition-all duration-500"
                style={{
                  top: "30%",
                  right: "20%",
                  opacity: "0.6",
                  transform: `scale(${isDark ? 1 : 0.25})`,
                  transitionDelay: isDark ? "0.3s" : "0s",
                }}
              />
              <div
                className="absolute w-0.5 h-0.5 bg-white rounded-full transition-all duration-500"
                style={{
                  bottom: "20%",
                  left: "25%",
                  opacity: "0.7",
                  transform: `scale(${isDark ? 1 : 0.25})`,
                  transitionDelay: isDark ? "0.4s" : "0s",
                }}
              />
              <div
                className="absolute w-0.5 h-0.5 bg-white rounded-full transition-all duration-500"
                style={{
                  top: "50%",
                  left: "30%",
                  opacity: "0.5",
                  transform: `scale(${isDark ? 1 : 0.25})`,
                  transitionDelay: isDark ? "0.1s" : "0s",
                }}
              />
              <div
                className="absolute w-0.5 h-0.5 bg-white rounded-full transition-all duration-500"
                style={{
                  bottom: "30%",
                  right: "30%",
                  opacity: "0.6",
                  transform: `scale(${isDark ? 1 : 0.25})`,
                  transitionDelay: isDark ? "0.25s" : "0s",
                }}
              />
            </>
          )}

          {/* Cloud star element using pseudo-element technique */}
          <div
            className="cloud-star absolute inset-0 transition-all duration-500"
            style={
              {
                opacity: isDark ? 0 : 1,
                "--cloud-shift": isDark ? 1 : 0,
              } as React.CSSProperties
            }
          />
        </div>

        {/* Toggle circle with enhanced shadows */}
        <div
          className={`absolute top-1 w-8 h-8 bg-white rounded-full transform transition-all duration-500 ease-out flex items-center justify-center ${
            isDark ? "translate-x-16" : "translate-x-1"
          }`}
          style={{
            // Enhanced shadow for the toggle indicator
            boxShadow: `
              0 1px 2px 0 rgb(15 23 42 / 0.95),
              0 -1px 2px 0 rgb(255 255 255 / 0.95),
              0 2px 8px 0 rgb(15 23 42 / 0.5),
              0 4px 16px 0 rgb(15 23 42 / 0.2)
            `,
          }}
        >
          {/* Sun/Moon using CodePen approach with enhanced shadows */}
          <div className="relative w-full h-full p-0.5">
            <span
              className="sun absolute inset-0 rounded-full overflow-hidden transition-all duration-500"
              style={{
                background: "hsl(47, 91%, 58%)",
                boxShadow: `
                  inset 1px 1px 2px 0 rgb(255 255 255 / 0.95),
                  inset -1px -1px 2px 0 rgb(146 64 14 / 0.5),
                  0 0 4px 0 rgb(251 191 36 / 0.6)
                `,
              }}
            >
              <span
                className="moon absolute rounded-full transition-all duration-500 ease-in-out"
                style={{
                  inset: "-1%",
                  background: "#cbd5e1",
                  transform: `translateX(${isDark ? "0%" : "100%"})`,
                  boxShadow: `
                    inset 1px 1px 2px 0 rgb(255 255 255 / 0.95),
                    inset -1px -1px 2px 0 rgb(15 23 42 / 0.95),
                    0 0 4px 0 rgb(203 213 225 / 0.8)
                  `,
                }}
              >
                {/* Moon craters with enhanced shadows */}
                <span
                  className="absolute rounded-full"
                  style={{
                    background: "#64748b",
                    width: "18%",
                    aspectRatio: "1",
                    left: "40%",
                    top: "15%",
                    boxShadow: `
                      inset 1px 1px 1px 0 rgb(15 23 42 / 0.25),
                      0 0.5px 1px 0 rgb(255 255 255 / 0.25)
                    `,
                  }}
                />
                <span
                  className="absolute rounded-full"
                  style={{
                    background: "#64748b",
                    width: "20%",
                    aspectRatio: "1",
                    left: "65%",
                    top: "58%",
                    boxShadow: `
                      inset 1px 1px 1px 0 rgb(15 23 42 / 0.25),
                      0 0.5px 1px 0 rgb(255 255 255 / 0.25)
                    `,
                  }}
                />
                <span
                  className="absolute rounded-full"
                  style={{
                    background: "#64748b",
                    width: "34%",
                    aspectRatio: "1",
                    left: "18%",
                    top: "40%",
                    boxShadow: `
                      inset 1px 1px 1px 0 rgb(15 23 42 / 0.25),
                      0 0.5px 1px 0 rgb(255 255 255 / 0.25)
                    `,
                  }}
                />
              </span>
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}
