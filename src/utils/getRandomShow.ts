export async function getRandomShow() {
  const MAX_PAGE = 250;

  const randomPage = Math.floor(Math.random() * MAX_PAGE);

  const response = await fetch(
    `https://api.tvmaze.com/shows?page=${randomPage}`,
  );

  const shows = await response.json();

  return shows[Math.floor(Math.random() * shows.length)];
}
