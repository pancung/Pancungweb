import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export async function createLead(payload) {
  const { data } = await api.post("/leads", payload);
  return data;
}

export async function listLeads(params = {}) {
  const { data } = await api.get("/leads", { params });
  return data;
}

export async function getLeadStats() {
  const { data } = await api.get("/leads/stats");
  return data;
}

export async function updateLead(id, payload) {
  const { data } = await api.patch(`/leads/${id}`, payload);
  return data;
}
