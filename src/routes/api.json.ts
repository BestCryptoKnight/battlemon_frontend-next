export async function get(params: { url: { searchParams: URLSearchParams }}) {
  const url = params.url.searchParams.get('url')
  const res = await fetch(`https://api.battlemon.com` + url);
  const data = await res.json();

  return { body: data };    
}