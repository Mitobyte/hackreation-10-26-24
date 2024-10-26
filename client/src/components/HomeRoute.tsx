import { trpc } from "@client/utils/trpc";
import { Text, Title } from "@mantine/core";

export function HomeRoute() {
  const { data: helloWorldText } = trpc.getHelloWorld.useQuery();

  return (
    <div>
      <Title order={2}>Home Route</Title>
      {helloWorldText ? <Text>{helloWorldText}</Text> : null}
    </div>
  );
}
