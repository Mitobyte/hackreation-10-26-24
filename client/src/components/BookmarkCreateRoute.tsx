import { routes } from "@client/constants";
import { trpc } from "@client/utils/trpc";
import { ActionIcon, Container, Space, TextInput, Title, useMantineTheme } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { CreateBookmark, createBookmarkSchema } from "@shared/types";
import { IconArrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export function BookmarkCreateRoute() {
  const [_, setLocation] = useLocation();
  const theme = useMantineTheme();

  const createBookmark = trpc.createBookmark.useMutation({
    onSuccess(id) {
      console.log("success", id);
      setLocation(routes.toBookmarkDetails(id));
    },
  });

  const queryParams = new URLSearchParams(window.document.location.search);
  const url = queryParams.get("url");

  const form = useForm<CreateBookmark>({
    initialValues: url ? { url: url } : undefined,
    validate: zodResolver(createBookmarkSchema),
  });

  const onSubmit = form.onSubmit((values) => {
    createBookmark.mutate(values);
  });

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Title order={2}>Create Bookmark</Title>
        <Space h="md" />
        <TextInput
          label={"Url"}
          placeholder={"Type url here"}
          {...form.getInputProps("url")}
          rightSection={
            <ActionIcon type="submit" radius="xl" color={theme.primaryColor} variant="filled" size="xs">
              <IconArrowRight />
            </ActionIcon>
          }
        />
      </form>
      <Space h="md" />
    </Container>
  );
}
