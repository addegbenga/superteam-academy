export const queryKeys = {
  // Courses
  courses: {
    all: ['courses'] as const,
    list: (filters?: object) => [...queryKeys.courses.all, 'list', filters] as const,
    detail: (slug: string) => [...queryKeys.courses.all, 'detail', slug] as const,
    stats: (courseId: string) => [...queryKeys.courses.all, 'stats', courseId] as const,
  },

  // Lessons
  lessons: {
    all: ['lessons'] as const,
    detail: (slug: string) => [...queryKeys.lessons.all, 'detail', slug] as const,
  },

  // User Progress
  progress: {
    all: (userId: string) => ['progress', userId] as const,
    course: (userId: string, courseId: string) =>
      [...queryKeys.progress.all(userId), 'course', courseId] as const,
  },

  // User Profile
  user: {
    all: (userId: string) => ['user', userId] as const,
    xp: (userId: string) => [...queryKeys.user.all(userId), 'xp'] as const,
    level: (userId: string) => [...queryKeys.user.all(userId), 'level'] as const,
    streak: (userId: string) => [...queryKeys.user.all(userId), 'streak'] as const,
    achievements: (userId: string) => [...queryKeys.user.all(userId), 'achievements'] as const,
    credentials: (userId: string) => [...queryKeys.user.all(userId), 'credentials'] as const,
  },

  // Leaderboard
  leaderboard: {
    all: ['leaderboard'] as const,
    byTimeframe: (timeframe: string) => [...queryKeys.leaderboard.all, timeframe] as const,
  },

  // Reviews
  reviews: {
    all: ['reviews'] as const,
    byCourse: (courseId: string) => [...queryKeys.reviews.all, 'course', courseId] as const,
    byUser: (userId: string, courseId: string) =>
      [...queryKeys.reviews.all, 'user', userId, courseId] as const,
  },
}