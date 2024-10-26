import { routes } from "@client/constants";
import { trpc } from "@client/utils/trpc";
import { formatIsoDateTime } from "@client/utils/utils";
import { Container, Space, Title } from "@mantine/core";
import { Bookmark } from "@shared/types";
import dayjs from "dayjs";
import { MRT_ColumnDef, MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useMemo } from "react";
import { useLocation } from "wouter";

export function BookmarkListRoute() {
  const [_, setLocation] = useLocation();
  console.log("list");
  const { data: bookmarks } = trpc.getBookmarks.useQuery();

  const columns = useMemo<MRT_ColumnDef<Bookmark>[]>(
    () => [
      {
        id: "createdAt",
        header: "Bookmarked At",
        accessorKey: "createdAt",
        accessorFn: (row) => formatIsoDateTime(row.createdAt),
        sortingFn: (a, b) => {
          const dateA = dayjs(a.original.createdAt);
          const dateB = dayjs(b.original.createdAt);
          if (dateA > dateB) {
            return 1;
          }
          if (dateA < dateB) {
            return -1;
          }
          return 0;
        },
      },
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Url",
        accessorKey: "url",
      },
      {
        header: "Notes",
        accessorFn: (row) => row.notes || "",
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data: bookmarks || [],
    initialState: {
      density: "xs",
      pagination: { pageSize: 100, pageIndex: 0 },
      sorting: [{ id: "createdAt", desc: true }],
    },
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        setLocation(routes.toBookmarkDetails(row.original.id));
      },
    }),
  });

  return (
    <Container>
      <Title order={2}>Bookmarks</Title>
      <Space h="md" />
      <MantineReactTable table={table} />
    </Container>
  );
}
