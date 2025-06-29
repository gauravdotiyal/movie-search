'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { toggleTheme } from '@/lib/store/themeSlice';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export function Navbar() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  useEffect(() => {
    // Update the document class when theme changes
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' && !isDarkMode) {
      dispatch(toggleTheme());
    }
  }, []);

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Movie Search</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(toggleTheme())}
          className="w-10 h-10"
        >
          {isDarkMode ? '🌞' : '🌙'}
        </Button>
      </div>
    </nav>
  );
} 