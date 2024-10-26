import { routes } from "@client/constants";
import { trpc } from "@client/utils/trpc";
import { Button, Container, Group, Loader, Space, Text, Title } from "@mantine/core";
import { Link, useParams } from "wouter";

export function BookmarkDetailsRoute() {
  const params = useParams<{ id: number }>();

  console.log("details", params.id);

  const { data: bookmark } = trpc.getBookmark.useQuery(params.id);

  if (!bookmark) {
    return (
      <Container>
        <Title order={2}>Bookmark Details</Title>
        <Space h="md" />
        <Loader />
      </Container>
    );
  }

  return (
    <Container>
      <Group justify="space-between">
        <Title order={2}>Bookmark Details</Title>
        <Group justify="flex-end">
        <Button
          component={Link}
          href={routes.bookmarkList}
          variant="outline"
          size="compact-md"
        >
          Back
        </Button>
        <Button
          component={Link}
          href={routes.toBookmarkEdit(bookmark.id)}
          size="compact-md"
        >
          Edit
        </Button>
      </Group>
      </Group>
      <Space h="md" />
      <Text size="sm" fw="500">
        Url
      </Text>
      <Text>{bookmark.url}</Text>
      <Space h="md" />
      <Text size="sm" fw="500">
        Title
      </Text>
      <Text>{bookmark.title}</Text>
      <Space h="md" />
      <Text size="sm" fw="500">
        Notes
      </Text>
      <Text>{bookmark.notes || ""}</Text>
    </Container>
  );
}
