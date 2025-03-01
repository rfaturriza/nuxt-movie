import type { UseFetchOptions } from "nuxt/app";

export const useAuthApi: typeof useFetch = (
  url: string | (() => string),
  options: UseFetchOptions<null> = {}
) => {
  const config = useRuntimeConfig();

  const customFetch = $fetch.create({
    baseURL: config.public.MOVIE_API_URL as string,
    onRequest({ options }) {
      if (config.public.TMDB_TOKEN) {
        console.log("[fetch request] Authorization header created");
        const currentHeaders =
          options.headers instanceof Headers
            ? Object.fromEntries(options.headers.entries())
            : options.headers;
        options.headers = new Headers({
          ...(currentHeaders as Record<string, string>),
          Authorization: `Bearer ${config.public.TMDB_TOKEN}`,
        });
      } else {
        console.info("No TMDB_TOKEN found in runtime config");
      }
    },
    onResponse({ response }) {
      console.info("onResponse ", {
        endpoint: response.url,
        status: response?.status,
      });
      if (response?.status === 401) {
        console.error("Unauthorized");
      }
    },
    onResponseError({ response }) {
      const statusMessage =
        response?.status === 401 ? "Unauthorized" : "Response failed";
      console.error("onResponseError ", {
        endpoint: response.url,
        status: response?.status,
        statusMessage,
      });
    },
  });

  return useFetch(url, {
    ...options,
    $fetch: customFetch,
  });
};
