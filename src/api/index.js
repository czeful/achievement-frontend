import axios from 'axios';

// Базовый URL для API
const API_URL = 'http://localhost:3000/api';

// Создаем экземпляр axios с базовым URL
const api = axios.create({
  baseURL: API_URL,
});

// Добавляем перехватчик для добавления токена
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Моковые данные
const mockData = {
  goals: [
    {
      id: "1",
      user_id: "1",
      name: "Изучить React",
      description: "Изучить основы React и Redux",
      category: "Education",
      steps: ["Изучить компоненты", "Изучить хуки", "Изучить Redux"],
      progress: {
        "Изучить компоненты": true,
        "Изучить хуки": false,
        "Изучить Redux": false
      },
      status: "in_progress",
      due_date: "2024-12-31T00:00:00.000Z",
      collaborators: ["2", "3"],
      created_at: "2024-03-15T00:00:00.000Z",
      updated_at: "2024-03-15T00:00:00.000Z"
    }
  ],
  user: {
    id: "1",
    email: "user@example.com",
    name: "John Doe",
    created_at: "2024-03-15T00:00:00.000Z"
  },
  friends: [
    {
      id: "1",
      user_id: "1",
      friend_id: "2",
      status: "accepted",
      created_at: "2024-03-15T00:00:00.000Z"
    }
  ],
  templates: [
    {
      id: "1",
      name: "Изучение нового языка программирования",
      description: "Шаблон для изучения нового языка программирования",
      category: "Education",
      steps: ["Установка окружения", "Изучение синтаксиса", "Практические задания"],
      created_at: "2024-03-15T00:00:00.000Z"
    }
  ]
};

// API запросы
export const apiService = {
  // Аутентификация
  register: async (data) => {
    // return api.post('/users/register', data);
    return { data: { token: 'mock_token', user: mockData.user } };
  },

  login: async (data) => {
    // return api.post('/users/login', data);
    return { data: { token: 'mock_token', user: mockData.user } };
  },

  // Цели
  getGoals: async () => {
    // return api.get('/goals');
    return { data: { goals: mockData.goals } };
  },

  getGoal: async (id) => {
    // return api.get(`/goals/${id}`);
    return { data: mockData.goals[0] };
  },

  updateGoal: async (id, data) => {
    // return api.put(`/goals/${id}`, data);
    return { data: { ...mockData.goals[0], ...data } };
  },

  deleteGoal: async (id) => {
    // return api.delete(`/goals/${id}`);
    return { status: 204 };
  },

  updateGoalProgress: async (id, data) => {
    // return api.post(`/goals/${id}/progress`, data);
    return { data: mockData.goals[0] };
  },

  addGoalCollaborator: async (id, data) => {
    // return api.post(`/goals/${id}/collaborators`, data);
    return { data: mockData.goals[0] };
  },

  // Пользователи
  getProfile: async () => {
    // return api.get('/users/profile');
    return { data: mockData.user };
  },

  updateProfile: async (data) => {
    // return api.put('/users/profile', data);
    return { data: { ...mockData.user, ...data } };
  },

  // Друзья
  addFriend: async (data) => {
    // return api.post('/friends', data);
    return { data: mockData.friends[0] };
  },

  getFriends: async () => {
    // return api.get('/friends');
    return { data: { friends: mockData.friends } };
  },

  deleteFriend: async (id) => {
    // return api.delete(`/friends/${id}`);
    return { status: 204 };
  },

  // Шаблоны
  createTemplate: async (data) => {
    // return api.post('/templates', data);
    return { data: mockData.templates[0] };
  },

  getTemplates: async () => {
    // return api.get('/templates');
    return { data: { templates: mockData.templates } };
  },

  getTemplate: async (id) => {
    // return api.get(`/templates/${id}`);
    return { data: mockData.templates[0] };
  }
};

// Константы
export const GOAL_CATEGORIES = [
  'Health',
  'Career',
  'Education',
  'Personal',
  'Finance',
  'Hobby',
  'Relationships'
];

export default apiService; 