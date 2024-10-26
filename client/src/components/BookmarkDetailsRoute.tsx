import { trpc } from "@client/utils/trpc";
import { Container, Loader, Space, Text, Title } from "@mantine/core";
import { useParams } from "wouter";

export function BookmarkDetailsRoute() {
  const params = useParams<{ id: number }>();

  console.log('details', params.id);

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
      <Title order={2}>Bookmark Details</Title>
      <Space h="md" />
      <Text size="sm" fw="700">
        Url
      </Text>
      <Text>{bookmark.url}</Text>
      <Space h="md" />
      <Text size="sm" fw="700">
        Title
      </Text>
      <Text>{bookmark.title}</Text>
      <Space h="md" />
    </Container>
  );
}
