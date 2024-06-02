"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination";
import { formUrlQuery } from "@/lib";
import { Button } from "./ui/button";

interface Props {
    pageNumber: number;
    isNext: boolean;
    pageCount: number;
}

export default function PageNavigation({
    pageNumber,
    isNext,
    pageCount,
}: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const pages = Array.from({ length: pageCount }, (_, idx) => idx + 1);

    const handlePageNavigation = (direction: string, page?: number) => {
        const nextPageNumber =
            direction === "previous"
                ? pageNumber - 1
                : direction === "page"
                ? page
                : pageNumber + 1;

        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: "page",
            value: nextPageNumber!.toString(),
        });

        router.push(newUrl);
    };

    if (!isNext && pageNumber === 1) return null;

    return (
        <Pagination>
            <PaginationContent className="flex items-center justify-center flex-wrap">
                <PaginationItem>
                    <Button
                        variant="ghost"
                        onClick={() => handlePageNavigation("previous")}
                        disabled={pageNumber === 1}
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                    </Button>
                </PaginationItem>
                {pages.map((page) => (
                    <PaginationItem key={page}>
                        <Button
                            variant={
                                page === pageNumber ? "secondary" : "ghost"
                            }
                            onClick={() => handlePageNavigation("page", page)}
                        >
                            {page === pageNumber ? (
                                <strong>{page}</strong>
                            ) : (
                                <span>{page}</span>
                            )}
                        </Button>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <Button
                        variant="ghost"
                        onClick={() => handlePageNavigation("next")}
                        disabled={!isNext}
                    >
                        Next <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
