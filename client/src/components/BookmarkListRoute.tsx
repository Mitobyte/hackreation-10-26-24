import { routes } from "@client/constants";
import { trpc } from "@client/utils/trpc";
import { Container, Space, Title } from "@mantine/core";
import { Bookmark } from "@shared/types";
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
      sorting: [{ id: "name", desc: true }],
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
