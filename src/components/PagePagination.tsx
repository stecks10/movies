import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

export function PagePagination() {
  return (
    <Pagination>
      <PaginationPrevious />
      <PaginationContent>
        <PaginationItem>
          <PaginationLink isActive={true}>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="bg-purple-600">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="bg-purple-600">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="bg-purple-600">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="bg-purple-600">5</PaginationLink>
        </PaginationItem>
        <PaginationItem></PaginationItem>
      </PaginationContent>
      <PaginationNext className="bg-purple-600" />
    </Pagination>
  );
}
