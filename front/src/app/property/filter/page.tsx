//"use client";
//import { SearchParams } from "@/api/propertyFilter";
import { IFilters } from "@/api/FilterAPI";
import Loading from "@/components/loading/loading";
import { getProperties } from "@/services/propertiesService";
import PropertyContainer from "@/views/propertyContainer";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
//import Loading from '@/components/Loading';
import { z } from "zod";
//import { useInfiniteQuery } from "@tanstack/react-query";
//import MenuProperties from "@/components/menuProperties";

// const params = z.object({
//   type: z.enum(["casa", "departamento"]).optional(),
// });

export default async function FilteredPropertiesPage({
  searchParams,
}: {
  searchParams: IFilters;
}) {
  const resolvedSearchparams = await searchParams;
  console.log("searchparams esperados:", resolvedSearchparams);
  // const searchParams = useSearchParams();
  // const typeParam = searchParams.get("type") ?? undefined;
  // const { type } = params.parse({ type: typeParam });

  // const { data, status } = useInfiniteQuery({
  //   queryKey: ["properties", type],
  //   queryFn: () => getProperties(),
  //   initialPageParam: "",
  //   getNextPageParam: (lastPage) => lastPage.nextCursor,
  // });
  // getProperties();

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <PropertyContainer searchParams={resolvedSearchparams} />
      </Suspense>
    </div>
  );
}
