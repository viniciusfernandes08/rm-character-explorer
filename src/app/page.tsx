import { CharacterHeader } from "@/features/characters/ui";
import { Suspense } from "react";
import { CharactersList } from "@/features/characters/ui";
import { Skeleton } from "@/features/characters/ui/components/CharactersList/skeleton";

type SearchParams = {
  page?: string
  status?: string
  gender?: string
  species?: string
}

export default async function Home({ 
  searchParams 
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const page = Math.max(1, Number(params.page ?? 1))

  return (  
    <main>
      <CharacterHeader />

      <Suspense key={JSON.stringify(params)} fallback={<Skeleton length={20} />}>
        <CharactersList 
          page={page} 
          status={params.status ?? ''} 
          gender={params.gender ?? ''} 
          species={params.species ?? ''} 
        />
      </Suspense>
    </main>
  );
}
