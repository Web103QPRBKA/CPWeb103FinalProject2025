const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const fetchWithErrorHandling = async (url, options = {}) => {
  try {
const response = await fetch(url, options);

if (!response.ok) {
  const errorData = await response.json().catch(() => ({}));
  throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
}

return await response.json();
  } catch (error) {
console.error(`Error fetching ${url}:`, error);
throw error;
  }
};

export const getAllPuzzles = async () => {
  return fetchWithErrorHandling(`${API_BASE_URL}/games`);
};

export const getPuzzleById = async (id) => {
  return fetchWithErrorHandling(`${API_BASE_URL}/games/${id}`);
};

export const getCluesByGameId = async (gameId) => {
  return fetchWithErrorHandling(`${API_BASE_URL}/clues/${gameId}`);
};

export const getHintsByGameId = async (gameId) => {
  return fetchWithErrorHandling(`${API_BASE_URL}/hints/${gameId}`);
};

export const getSolutionByGameId = async (gameId) => {
  return fetchWithErrorHandling(`${API_BASE_URL}/solutions/${gameId}`);
};

export const getPlayerProgress = async (playerId, gameId) => {
  return fetchWithErrorHandling(`${API_BASE_URL}/players/${playerId}/games/${gameId}`);
};

export const savePlayerProgress = async (playerId, gameId, progressData) => {
  return fetchWithErrorHandling(`${API_BASE_URL}/players/${playerId}/games/${gameId}`, {
method: 'PATCH',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(progressData),
  });
};

export const getAllPlayers = async () => {
  return fetchWithErrorHandling(`${API_BASE_URL}/players`);
};

export const getPlayerById = async (playerId) => {
  return fetchWithErrorHandling(`${API_BASE_URL}/players/${playerId}`);
};

export const createPlayer = async (playerData) => {
  return fetchWithErrorHandling(`${API_BASE_URL}/players`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(playerData),
  });
};

export const getAllThemes = async () => {
  return fetchWithErrorHandling(`${API_BASE_URL}/theme`);
};

export const getLeaderboard = async (gameId = null) => {
  const endpoint = gameId 
? `${API_BASE_URL}/leaderboard/${gameId}`
: `${API_BASE_URL}/leaderboard`;
  return fetchWithErrorHandling(endpoint);
};
