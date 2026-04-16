import { useQuery } from "react-query";
import api from "../utils/api";
import { HealthResource } from "../utils/types";

export function useResources(search = "") {
  return useQuery<HealthResource[]>(
    ["resources", search],
    async () => {
      const params = search ? { search } : {};
      const { data } = await api.get("/api/resources/", { params });
      return data;
    },
    { keepPreviousData: true }
  );
}

export function useResource(id: number) {
  return useQuery<HealthResource>(["resource", id], async () => {
    const { data } = await api.get(`/api/resources/${id}/`);
    return data;
  });
}
