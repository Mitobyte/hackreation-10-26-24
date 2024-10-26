import { routes } from "@client/constants";
import { trpc } from "@client/utils/trpc";
import { ActionIcon, Container, Space, TextInput, Title, useMantineTheme } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export function BookmarkCreateRoute() {
  const [_, setLocation] = useLocation();
  const [url, setUrl] = useState<string>("");
  const theme = useMantineTheme();

  const createBookmark = trpc.createBookmark.useMutation({
    onSuccess(id) {
      console.log("success", id);
      setLocation(routes.toBookmarkDetails(id));
    },
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.document.location.search);
    const url = queryParams.get("url");
    if (url) {
      setUrl(url);
    }
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
