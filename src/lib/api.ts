import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

// Create axios instance with the correct base URL
const api = axios.create({
  baseURL: 'http://www.omdbapi.com',
});

if (!API_KEY) {
  console.error('OMDB API key is missing. Please add it to your .env.local file');
}

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
  Plot?: string;
  Genre?: string;
  Director?: string;
  Actors?: string;
  imdbRating?: string;
  Runtime?: string;
  Released?: string;
  Response?: string;
  Error?: string;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export const searchMovies = async (query: string, page: number = 1): Promise<SearchResponse> => {
  if (!query || query.length < 3) {
    return { Search: [], totalResults: '0', Response: 'False', Error: 'Please enter at least 3 characters' };
  }

  try {
    const response = await api.get<SearchResponse>('/', {
      params: {
        apikey: API_KEY,
        s: query,
        page,
        type: 'movie',
      },
    });

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error || 'No movies found');
    }

    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    if (axios.isAxiosError(error) && error.response?.data?.Error) {
      throw new Error(error.response.data.Error);
    }
    throw new Error('Failed to search movies');
  }
};

export const getMovieDetails = async (imdbId: string): Promise<Movie> => {
  if (!imdbId) {
    throw new Error('Movie ID is required');
  }

  try {
    const response = await api.get<Movie>('/', {
      params: {
        apikey: API_KEY,
        i: imdbId,
        plot: 'full',
      },
    });

    if (response.data.Response === 'False') {
      throw new Error('Movie not found');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    if (axios.isAxiosError(error) && error.response?.data?.Error) {
      throw new Error(error.response.data.Error);
    }
    throw new Error('Failed to fetch movie details');
  }
}; 