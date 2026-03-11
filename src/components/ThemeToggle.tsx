'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    const toggleTheme = () => {
        const nextDark = !isDark;
        setIsDark(nextDark);
        if (nextDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="font-press-start text-[12px] brutal-border bg-[var(--card-bg)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors w-9 h-9 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]"
            aria-label="Toggle Theme"
        >
            {isDark ? '☀' : '☾'}
        </button>
    );
}
