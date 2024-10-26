import { trpc } from "@client/utils/trpc";
import { ActionIcon, Container, Space, TextInput, Title, useMantineTheme } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";

export function CreateBookmarkRoute() {
  const [url, setUrl] = useState<string>("");
  const theme = useMantineTheme();

  const createBookmark = trpc.createBookmark.useMutation({
    onSuccess() {
      console.log("success");
    },
  });

  return (
    <Container>
      <Title order={2}>Create Bookmark</Title>
      <Space h="md" />
      <TextInput
        label={"Url"}
        value={url}
        placeholder={"Type url here"}
        onChange={(event) => setUrl(event.currentTarget.value)}
        rightSection={
          <ActionIcon
            onClick={() => createBookmark.mutate({ url: url })}
            radius="xl"
            color={theme.primaryColor}
            variant="filled"
            size="xs"
          >
            <IconArrowRight />
          </ActionIcon>
        }
      />
      <Space h="md" />
    </Container>
  );
}
