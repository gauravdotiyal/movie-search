'use client';

import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from '@/lib/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { setMovieRating } from '@/lib/store/movieSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MovieDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const dispatch = useDispatch();
  const rating = useSelector((state: RootState) => state.movies.ratings[params.id] || 0);

  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movie', params.id],
    queryFn: () => getMovieDetails(params.id),
  });

  const handleRating = (newRating: number) => {
    dispatch(setMovieRating({ movieId: params.id, rating: newRating }));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-2/3" />
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-8">
            <Skeleton className="h-[450px] w-[300px]" />
            <div className="flex-1">
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <Skeleton className="h-4 w-1/2 mb-4" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
        <Link href="/movies">
          <Button>Back to Search</Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{movie.Title}</CardTitle>
          <div className="flex items-center gap-4 text-gray-500">
            <span>{movie.Year}</span>
            <span>•</span>
            <span>{movie.Runtime}</span>
            <span>•</span>
            <span>{movie.Released}</span>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-8">
          <div className="relative h-[450px] w-[300px] shrink-0">
            <Image
              src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
              alt={movie.Title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Plot</h2>
              <p className="text-gray-700 dark:text-gray-300">{movie.Plot}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Details</h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">Director</dt>
                  <dd>{movie.Director}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">Actors</dt>
                  <dd>{movie.Actors}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">Genre</dt>
                  <dd>{movie.Genre}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">IMDb Rating</dt>
                  <dd>{movie.imdbRating}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Your Rating</h2>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant={star <= rating ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => handleRating(star)}
                  >
                    ★
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8">
        <Link href="/movies">
          <Button>Back to Search</Button>
        </Link>
      </div>
    </motion.div>
  );
} 