'use client';
import { useEffect, useState } from "react";

const LightDarkMode = () => {
    const [darkMode, setDarkMode] = useState(false);

    // Load dark mode state from localStorage on mount
    useEffect(() => {
        const root = document.documentElement;
        // root.classList.add("transition-colors", "duration-500", "ease-in-out");

        // Check localStorage for dark mode preference on mount
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("darkMode");
            if (storedTheme) {
                const theme = JSON.parse(storedTheme);
                setDarkMode(theme);
                root.classList.toggle("dark", theme);
                return;
            }
        }

        // Check System preference for dark mode
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setDarkMode(true);
            root.classList.toggle("dark", true);
        }

        // 3. Watch for system preference changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem("darkMode")) { // only auto-change if no saved choice
            setDarkMode(e.matches);
            root.classList.toggle("dark", e.matches);
        }
        };
        mediaQuery.addEventListener("change", handleChange);

        return () =>{ mediaQuery.removeEventListener("change", handleChange)};

    }, []);

    const toggleTheme = () => {
        const theme = !darkMode;
        setDarkMode(theme);
        localStorage.setItem("darkMode", JSON.stringify(theme));
        document.documentElement.classList.toggle("dark", theme);
    };

    return (
        // absolute top-[3%] left-[20%] 
        <div className=" cursor-pointer duration-400" onClick={toggleTheme}>
            {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF" className="duration-400">
                    <path className="duration-400" d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/>
                </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF" className="duration-400">
                        <path className="duration-400" d="M380-160q133 0 226.5-93.5T700-480q0-133-93.5-226.5T380-800h-21q-10 0-19 2 57 66 88.5 147.5T460-480q0 89-31.5 170.5T340-162q9 2 19 2h21Zm0 80q-35 0-70-7t-67-21q-11-5-18-15t-7-22q0-9 4-17t12-14q70-55 108-135t38-169q0-89-38.5-168.5T233-784q-7-6-11-14t-4-17q0-12 6.5-22t17.5-15q33-14 68-21t70-7q83 0 156 31.5T663-763q54 54 85.5 127T780-480q0 83-31.5 156T663-197q-54 54-127 85.5T380-80Zm80-400Z"/>
                    </svg>
                )}
        </div>
    )
}
export default LightDarkMode