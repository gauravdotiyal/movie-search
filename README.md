# 🎬 Movie Search App

A modern movie search application built with Next.js, TypeScript, and the OMDB API. Search for your favorite movies, view details, and enjoy a responsive, user-friendly interface.

## ✨ Features

- 🔍 Real-time movie search with debouncing
- 🎨 Beautiful UI with Tailwind CSS and shadcn/ui
- 🌓 Dark/Light mode support
- 📱 Fully responsive design
- ⚡ Fast and optimized performance
- 🖼️ Movie posters and detailed information
- 🎭 Smooth animations with Framer Motion
- 🔄 Loading states and error handling

## 🚀 Tech Stack

- [Next.js 14](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Redux Toolkit](https://redux-toolkit.js.org/) - State Management
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [OMDB API](https://www.omdbapi.com/) - Movie Database
- [Axios](https://axios-http.com/) - HTTP Client

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- OMDB API key (get it from [here](https://www.omdbapi.com/apikey.aspx))

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd movie-search
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or another port if 3000 is in use).

## 📖 Usage

1. Enter a movie title in the search bar (minimum 3 characters)
2. Results will appear automatically as you type
3. Click on any movie to view detailed information
4. Toggle between dark and light modes using the theme switch

## 🏗️ Project Structure

```
movie-search/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # Reusable components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utilities and API functions
├── public/              # Static assets
└── ...config files
```

## ⚙️ Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_OMDB_API_KEY` | Your OMDB API key |

## 🔍 API Integration

The app uses the OMDB API for fetching movie data. Key endpoints:
- Search movies: `/?apikey=[key]&s=[query]`
- Get movie details: `/?apikey=[key]&i=[imdb_id]`

## 🎨 Customization

- Modify the theme in `tailwind.config.ts`
- Add new components in the `components` directory
- Customize API integration in `lib/api.ts`

## 📱 Responsive Design

The app is fully responsive and works on:
- 📱 Mobile devices
- 💻 Tablets
- 🖥️ Desktop screens

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OMDB API](https://www.omdbapi.com/) for providing movie data
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities 