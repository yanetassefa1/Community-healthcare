import { useQuery, useMutation, useQueryClient } from "react-query";
import api from "../utils/api";
import { Appointment } from "../utils/types";

export function useMyAppointments() {
  return useQuery<Appointment[]>("my-appointments", async () => {
    const { data } = await api.get("/api/appointments/me/");
    return data;
  });
}

export function useCreateAppointment() {
  const qc = useQueryClient();
  return useMutation(
    (payload: Partial<Appointment>) => api.post("/api/appointments/", payload),
    { onSuccess: () => qc.invalidateQueries("my-appointments") }
  );
}

export function useUpdateAppointment() {
  const qc = useQueryClient();
  return useMutation(
    ({ id, ...payload }: Partial<Appointment> & { id: number }) =>
      api.patch(`/api/appointments/${id}/`, payload),
    { onSuccess: () => qc.invalidateQueries("my-appointments") }
  );
}

export function useCancelAppointment() {
  const qc = useQueryClient();
  return useMutation(
    (id: number) => api.patch(`/api/appointments/${id}/`, { status: "cancelled" }),
    { onSuccess: () => qc.invalidateQueries("my-appointments") }
  );
}
