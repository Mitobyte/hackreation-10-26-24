import { AppBody } from "@client/components/AppBody";
import { routes } from "@client/constants";
import { AppShell, Button, Group, Text } from "@mantine/core";
import { Link, useLocation } from "wouter";

export function Shell() {
  const [location] = useLocation();

  return (
    <AppShell padding="md" header={{ height: 50 }}>
      <AppShell.Header>
        <Group h="100%" p="xs" justify="space-between" style={{ flex: 1 }}>
          <Text>ReactNodeBoilerplate</Text>
          <Group>
            <Button
              size="compact-sm"
              variant={location === routes.root ? "outline" : "subtle"}
              href={routes.root}
              component={Link}
            >
              Home
            </Button>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <AppBody />
      </AppShell.Main>
    </AppShell>
  );
}
