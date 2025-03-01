interface GenreResponse {
  genres: KeyWord[];
}

export const useGenres = () => {
  const config = useRuntimeConfig();
  const token = config.public.TMDB_TOKEN;
  const { data, error } = useFetch<GenreResponse>(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      pick: ["genres"],
    }
  );

  return { data, error };
};
