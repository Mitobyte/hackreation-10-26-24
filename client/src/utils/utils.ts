import { IsoDateTime } from "@shared/types";
import dayjs from "dayjs";

export function formatIsoDateTime(dateString: IsoDateTime) {
  return dayjs(dateString).format("MM/DD/YY h:mm a");
}
