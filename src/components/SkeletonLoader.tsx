import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_ITEMS_COUNT = 10;

export const SkeletonLoader = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
    {Array.from({ length: SKELETON_ITEMS_COUNT }).map((_, index) => (
      <div key={index} className="space-y-4">
        <Skeleton className="h-[300px] w-full rounded-lg bg-gray-700" />
        <Skeleton className="h-6 w-3/4 rounded bg-gray-700" />
        <Skeleton className="h-4 w-1/2 rounded bg-gray-700" />
      </div>
    ))}
  </div>
);
