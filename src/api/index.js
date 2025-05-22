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
    username: "johndoe",
    city: "New York",
    region: "NY",
    avatarUrl: null,
    achievementsCount: 3,
    completedGoals: 5,
    friendsCount: 2,
    achievements: [
      {
        id: "1",
        title: "First Goal Completed",
        imageUrl: null,
        description: "Completed your first goal",
        createdAt: "2024-03-15T00:00:00.000Z"
      },
      {
        id: "2",
        title: "Social Butterfly",
        imageUrl: null,
        description: "Added 5 friends",
        createdAt: "2024-03-16T00:00:00.000Z"
      },
      {
        id: "3",
        title: "Goal Master",
        imageUrl: null,
        description: "Completed 5 goals",
        createdAt: "2024-03-17T00:00:00.000Z"
      }
    ],
    friends: [
      {
        id: "2",
        name: "Jane Smith",
        username: "janesmith",
        avatarUrl: null
      },
      {
        id: "3",
        name: "Bob Johnson",
        username: "bobjohnson",
        avatarUrl: null
      }
    ],
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

const mockAchievements = [
  {
    id: '1',
    user: { id: '1', username: 'johndoe' },
    name: 'Изучить React',
    title: 'Изучить React',
    description: 'Основы React и Redux',
    category: 'Education',
    steps: ['Компоненты', 'Хуки', 'Redux'],
    progress: { 'Компоненты': true, 'Хуки': false, 'Redux': false },
    status: 'in_progress',
    due_date: '2024-12-31',
    collaborators: ['2', '3'],
    created_at: '2024-03-15T00:00:00Z',
    updated_at: '2024-04-01T12:00:00Z',
    imageUrl: null,
  },
  {
    id: '2',
    user: { id: '2', username: 'janesmith' },
    name: 'Social Butterfly',
    title: 'Social Butterfly',
    description: 'Добавьте 5 друзей',
    category: 'Relationships',
    steps: ['Добавить первого друга', 'Добавить второго друга', 'Добавить третьего друга'],
    progress: { 'Добавить первого друга': true, 'Добавить второго друга': true, 'Добавить третьего друга': false },
    status: 'in_progress',
    due_date: '2024-06-30',
    collaborators: ['1'],
    created_at: '2024-03-16T00:00:00Z',
    updated_at: '2024-04-01T12:00:00Z',
    imageUrl: null,
  },
  {
    id: '3',
    user: { id: '3', username: 'alexmorning' },
    name: 'Early Bird',
    title: 'Early Bird',
    description: 'Выполните задачу до 9 утра',
    category: 'Personal',
    steps: ['Установить раннюю цель', 'Выполнить до 9 утра'],
    progress: { 'Установить раннюю цель': true, 'Выполнить до 9 утра': false },
    status: 'in_progress',
    due_date: '2024-05-01',
    collaborators: [],
    created_at: '2024-03-17T00:00:00Z',
    updated_at: '2024-04-01T12:00:00Z',
    imageUrl: null,
  }
];

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

  getUserProfile: async (username) => {
    // return api.get(`/users/${username}`);
    console.log('Mock user data:', mockData.user);
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

  checkFriendship: async (userId) => {
    // return api.get(`/friends/check/${userId}`);
    return { data: { isFriend: false } };
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
  },

  // GET /achievements
  getAchievements: async () => {
    await new Promise(r => setTimeout(r, 200));
    return { data: { achievements: mockAchievements } };
  },

  // GET /achievements/:id
  getAchievement: async id => {
    await new Promise(r => setTimeout(r, 200));
    const a = mockAchievements.find(x => x.id === id);
    if (!a) throw new Error('Not found');
    return { data: a };
  },

  // POST /achievements
  createAchievement: async data => {
    const newAch = {
      id: String(mockAchievements.length + 1),
      user: { username: localStorage.getItem('username') || 'you' },
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      imageUrl: null
    };
    mockAchievements.push(newAch);
    return { data: newAch };
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