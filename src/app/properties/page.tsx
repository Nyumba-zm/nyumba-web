"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { PropertyFilters } from "@/components/property/PropertyFilters";
import {
  PropertySort,
  sortProperties,
  type SortOption,
} from "@/components/property/PropertySort";
import { ErrorState } from "@/components/shared/ErrorState";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/Button";
import { useProperties } from "@/lib/hooks";
import { getErrorMessage } from "@/lib/errors/apiError";
import {
  buildPropertySearchUrl,
  parsePropertySearchUrl,
  SEARCH_PAGE_SIZE,
} from "@/lib/search/propertySearchUrl";
import type { PropertySearchParams } from "@/types/property";

function PropertiesSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = useMemo(() => parsePropertySearchUrl(searchParams), [searchParams]);
  const [sort, setSort] = useState<SortOption>("newest");

  const { data, isLoading, error, refetch } = useProperties({
    ...filters,
    pageSize: SEARCH_PAGE_SIZE,
  });

  const properties = useMemo(() => sortProperties(data?.items ?? [], sort), [data, sort]);
  const page = data?.page ?? 1;

  const navigate = (next: PropertySearchParams) => {
    router.push(buildPropertySearchUrl(next), { scroll: false });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1">
        <PropertyFilters
          key={searchParams.toString()}
          value={filters}
          onApply={(next) => navigate({ ...next, page: 1 })}
        />
      </aside>

      <section className="lg:col-span-3">
        {error ? (
          <ErrorState
            title="Couldn't load properties"
            message={getErrorMessage(error)}
            onRetry={() => refetch()}
          />
        ) : (
          <>
            <PropertySort value={sort} onChange={setSort} totalResults={data?.total ?? 0} />
            {!isLoading && properties.length === 0 ? (
              <EmptyState
                title="No properties match these filters"
                description="Try a nearby area, a wider price range or fewer filters."
                actionLabel="Clear filters"
                onAction={() => navigate({})}
              />
            ) : (
              <PropertyGrid properties={properties} isLoading={isLoading} />
            )}

            {data && data.totalPages > 1 && (
              <nav
                className="mt-10 flex items-center justify-center gap-4"
                aria-label="Pagination"
              >
                <Button
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => navigate({ ...filters, page: page - 1 })}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {page} of {data.totalPages}
                </span>
                <Button
                  variant="outline"
                  disabled={!data.hasMore}
                  onClick={() => navigate({ ...filters, page: page + 1 })}
                >
                  Next
                </Button>
              </nav>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Browse Properties
          </h1>
          <p className="text-lg text-gray-600">
            Homes across Zambia, every one with the price shown upfront
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <Suspense fallback={<PropertyGrid properties={[]} isLoading />}>
          <PropertiesSearch />
        </Suspense>
      </div>
    </div>
  );
}
