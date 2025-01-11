import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const jeeApplicationNo = searchParams.get('jeeApplicationNo');
  const token =
    'eyJ0eXAiOiJKV1QiLCJub25jZSI6InZIemtPX3hDMklfMkZFV1l2WlY0M1dhdU1sVURabWlSWVNwd2JPdld1UFkiLCJhbGciOiJSUzI1NiIsIng1dCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyIsImtpZCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8wYjI0ZjY3MS1kNjE3LTQxMzgtODE5ZC0xNTcyYmIzN2ZjNGQvIiwiaWF0IjoxNzM1OTg2NjY2LCJuYmYiOjE3MzU5ODY2NjYsImV4cCI6MTczNTk5MDU2NiwiYWlvIjoiazJCZ1lEamh4TGRtZnNOQ3FYV2FUSWtKcVJjMkF3QT0iLCJhcHBfZGlzcGxheW5hbWUiOiJuZXdFZ292ZXJuYW5jZSIsImFwcGlkIjoiMzRlOTdjMWQtMmJjZi00ZTgzLWE3NWEtYzhiNDI4OGRjZTJiIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMGIyNGY2NzEtZDYxNy00MTM4LTgxOWQtMTU3MmJiMzdmYzRkLyIsImlkdHlwIjoiYXBwIiwib2lkIjoiODk5OTFiYTQtYThhNy00ODI5LWE5MWQtYzVmMjg3Njg1MDUzIiwicmgiOiIxLkFWUUFjZllrQ3hmV09FR0JuUlZ5dXpmOFRRTUFBQUFBQUFBQXdBQUFBQUFBQUFDaUFBQlVBQS4iLCJyb2xlcyI6WyJVc2VyLlJlYWRXcml0ZS5BbGwiXSwic3ViIjoiODk5OTFiYTQtYThhNy00ODI5LWE5MWQtYzVmMjg3Njg1MDUzIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkFTIiwidGlkIjoiMGIyNGY2NzEtZDYxNy00MTM4LTgxOWQtMTU3MmJiMzdmYzRkIiwidXRpIjoiRFNJX1hxR0NZMGlNeFoteFhiNElBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiMDk5N2ExZDAtMGQxZC00YWNiLWI0MDgtZDVjYTczMTIxZTkwIl0sInhtc19pZHJlbCI6IjcgMjYiLCJ4bXNfdGNkdCI6MTQ4OTczMjkzOX0.T5sbHjWMycIWVymrBQ3rz9U6ppa4MDr3xERxKMcGRfHjRviyUbLK5capPbwdCyQAKdn8xP3kT99Y5ak6K6gfDN-hyIPLbuNRQJMg0ioD7qSoHMEupqMl0jSPzrpkCInyOWBdzcUaQ5pg3lXli3ETuFUb7qrN6hd0w0uRFKX8kU63N2AlpZ4bLeXUfJC3eDz9OqbKZRrBy2xjUz6FgniP-xlpYDP5SMxcBHYtLr7zeyoyMHO0zSjq-rfcwFfA_K1qE49gptG3JLiiYdwEBm-Mk4enKhYmXzQnCGwu7zLc7_yfRj0iTuHHCOEsFtkXTcUJ5YPut8GDwQa64eeSZx0O0Q';
  const baseUrl = 'https://graph.microsoft.com/v1.0/users/?$filter=';
  const surname = `surname eq '${jeeApplicationNo}'`;
  const select = 'userPrincipalName';
  const url = `${baseUrl}${surname}&$select=${select}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const status = response.status;
  console.log('status', status);
  if (status !== 200) {
    console.error(
      '--------------------------------ERROR--------------------------------\nerror for jeeApplicationNo: ',
      jeeApplicationNo,
      '\n',
      response,
    );
  }
  const data = await response.json();
  if (!data.value || data.value.length === 0) {
    console.error(
      '--------------------------------ERROR--------------------------------\nerror for jeeApplicationNo: ',
      jeeApplicationNo,
      '\n',
      response,
    );
  }
  console.log(
    'SUCCESS\n----------------------------------DATA----------------------------------\n',
    data,
  );
  return NextResponse.json({
    jeeApplicationNo: jeeApplicationNo,
    userPrincipalName: data.value[0].userPrincipalName,
  });
}
