'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@/hooks/useDebounce';
import { searchMovies } from '@/lib/api';
import { useDispatch } from 'react-redux';
import { addRecentSearch } from '@/lib/store/movieSlice';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function MoviesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const dispatch = useDispatch();

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['movies', debouncedSearch],
    queryFn: () => searchMovies(debouncedSearch),
    enabled: debouncedSearch.length > 2,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 1,
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.length > 2) {
      dispatch(addRecentSearch(value));
    }
  };

  const showLoadingState = isLoading || isFetching;
  const showError = error && !showLoadingState;
  const showNoResults = !showLoadingState && !showError && (!data?.Search || data.Search.length === 0);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Search Movies</h1>
        <Input
          type="search"
          placeholder="Enter a movie title..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full"
        />
      </div>

      {showError && (
        <div className="text-center text-red-500 mb-6">
          Error: {error instanceof Error ? error.message : 'Something went wrong'}
        </div>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {showLoadingState ? (
          Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="relative h-[400px]">
                <Skeleton className="absolute inset-0" />
              </div>
              <CardHeader>
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3 mt-2" />
              </CardHeader>
            </Card>
          ))
        ) : data?.Search ? (
          data.Search.map((movie) => (
            <motion.div key={movie.imdbID} variants={item}>
              <Link href={`/movies/${movie.imdbID}`}>
                <Card className="overflow-hidden h-full transition-transform hover:scale-105 hover:shadow-lg">
                  <div className="relative h-[400px]">
                    <Image
                      src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
                      alt={movie.Title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      priority={false}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{movie.Title}</CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{movie.Year}</p>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))
        ) : showNoResults ? (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
            {searchTerm.length > 2 
              ? 'No movies found. Try a different search term.'
              : searchTerm.length > 0 
                ? 'Type at least 3 characters to search'
                : 'Start typing to search for movies'}
          </div>
        ) : null}
      </motion.div>
    </main>
  );
} 