import { trpc } from "@client/utils/trpc";
import { Button, Container, Group, Loader, Space, Text, Textarea, TextInput, Title } from "@mantine/core";
import { Link, useLocation, useParams } from "wouter";
import { useForm, zodResolver } from "@mantine/form";
import { Bookmark, UpdateBookmark, updateBookmarkSchema } from "@shared/types";
import { routes } from "@client/constants";

export function BookmarkEditRoute() {
  const params = useParams<{ id: number }>();

  const { data: bookmark } = trpc.getBookmark.useQuery(params.id);

  console.log("edit", params.id);

  if (!bookmark) {
    return (
      <Container>
        <Title order={2}>Bookmark Edit</Title>
        <Space h="md" />
        <Loader />
      </Container>
    );
  }

  return <BookmarkEditForm bookmark={bookmark} />;
}

type Props = {
  bookmark: Bookmark;
};

function BookmarkEditForm(props: Props) {
  const [_, setLocation] = useLocation();

  const updateBookmark = trpc.updateBookmark.useMutation({
    onSuccess(id) {
      console.log("success", id);
      setLocation(routes.toBookmarkDetails(id));
    },
  });

  const form = useForm<UpdateBookmark>({
    initialValues: {
      id: props.bookmark.id,
      title: props.bookmark.title,
      notes: props.bookmark.notes,
    },
    validate: zodResolver(updateBookmarkSchema),
  });

  const onSubmit = form.onSubmit((values) => {
    updateBookmark.mutate(values);
  });

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Title order={2}>Bookmark Edit</Title>
        <Space h="md" />
        <Text size="sm" fw="500">
          Url
        </Text>
        <Text>{props.bookmark.url}</Text>
        <Space h="md" />
        <TextInput label={"Title"} placeholder={"Type title here"} {...form.getInputProps("title")} />
        <Space h="md" />
        <Textarea label={"Notes"} placeholder={"Type notes here"} {...form.getInputProps("notes")} />
        <Space h="md" />

        <Group justify="flex-end">
          <Button component={Link} variant="outline" href={routes.toBookmarkDetails(props.bookmark.id)}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Container>
  );
}
