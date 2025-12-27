'use client';

import { useState } from 'react';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  category: string;
  enrolled: number;
  rating: number;
  image: string;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: 'React & Next.js Masterclass',
      description: 'Learn modern React development with Next.js, including App Router, Server Components, and advanced patterns.',
      instructor: 'Sarah Johnson',
      duration: '12 weeks',
      level: 'Advanced',
      price: 99.99,
      category: 'Web Development',
      enrolled: 1234,
      rating: 4.8,
      image: '🚀',
    },
    {
      id: 2,
      title: 'TypeScript Fundamentals',
      description: 'Master TypeScript from basics to advanced concepts. Build type-safe applications with confidence.',
      instructor: 'Michael Chen',
      duration: '8 weeks',
      level: 'Intermediate',
      price: 79.99,
      category: 'Programming',
      enrolled: 892,
      rating: 4.6,
      image: '📘',
    },
    {
      id: 3,
      title: 'UI/UX Design Essentials',
      description: 'Create beautiful, user-friendly interfaces. Learn design principles, Figma, and prototyping.',
      instructor: 'Emma Davis',
      duration: '6 weeks',
      level: 'Beginner',
      price: 59.99,
      category: 'Design',
      enrolled: 567,
      rating: 4.9,
      image: '🎨',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterLevel, setFilterLevel] = useState<string>('all');

  const [formData, setFormData] = useState<Omit<Course, 'id'>>({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    level: 'Beginner',
    price: 0,
    category: '',
    enrolled: 0,
    rating: 0,
    image: '📚',
  });

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenModal = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title,
        description: course.description,
        instructor: course.instructor,
        duration: course.duration,
        level: course.level,
        price: course.price,
        category: course.category,
        enrolled: course.enrolled,
        rating: course.rating,
        image: course.image,
      });
    } else {
      setEditingCourse(null);
      setFormData({
        title: '',
        description: '',
        instructor: '',
        duration: '',
        level: 'Beginner',
        price: 0,
        category: '',
        enrolled: 0,
        rating: 0,
        image: '📚',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.instructor || !formData.category) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    if (editingCourse) {
      setCourses(courses.map(course => 
        course.id === editingCourse.id 
          ? { ...formData, id: editingCourse.id }
          : course
      ));
      showNotification('Course updated successfully!', 'success');
    } else {
      const newCourse: Course = {
        ...formData,
        id: Math.max(...courses.map(c => c.id), 0) + 1,
      };
      setCourses([...courses, newCourse]);
      showNotification('Course added successfully!', 'success');
    }

    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== id));
      showNotification('Course deleted successfully!', 'success');
    }
  };

  const filteredCourses = filterLevel === 'all' 
    ? courses 
    : courses.filter(course => course.level === filterLevel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black py-8 px-4 sm:px-6 lg:px-8">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                Course Management
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Manage and organize your courses with ease
              </p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Course
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 shadow">
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{courses.length}</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Total Courses</div>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 shadow">
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {courses.reduce((sum, c) => sum + c.enrolled, 0).toLocaleString()}
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Total Students</div>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 shadow">
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {(courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(1)}
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Avg Rating</div>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 shadow">
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                ${courses.reduce((sum, c) => sum + c.price, 0).toFixed(0)}
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Total Value</div>
            </div>
          </div>
        </div>

        {/* Filters and View Toggle */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 mb-6 shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Filter by Level:
            </label>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Courses Grid/List */}
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'flex flex-col gap-4'
        }>
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`bg-white dark:bg-zinc-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                viewMode === 'list' ? 'flex flex-row' : 'flex flex-col'
              }`}
            >
              {/* Course Image/Icon */}
              <div className={`bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ${
                viewMode === 'list' ? 'w-32 h-32' : 'h-48'
              }`}>
                <span className="text-6xl">{course.image}</span>
              </div>

              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
                      {course.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      by {course.instructor}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-700 dark:text-zinc-300 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.level === 'Beginner' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                    'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  }`}>
                    {course.level}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                    {course.category}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                  <div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400">Duration</div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{course.duration}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400">Students</div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{course.enrolled}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400">Rating</div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">⭐ {course.rating}</div>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${course.price}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(course)}
                      className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                      title="Edit"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                      title="Delete"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              No courses found
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Try adjusting your filters or add a new course
            </p>
            <button
              onClick={() => handleOpenModal()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Add Your First Course
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {editingCourse ? 'Edit Course' : 'Add New Course'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter course title"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-500 h-24"
                    placeholder="Enter course description"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Instructor *
                  </label>
                  <input
                    type="text"
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-500"
                    placeholder="Instructor name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Web Development"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 8 weeks"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Level
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value as Course['level'] })}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Icon/Emoji
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-500"
                    placeholder="📚"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Enrolled Students
                  </label>
                  <input
                    type="number"
                    value={formData.enrolled}
                    onChange={(e) => setFormData({ ...formData, enrolled: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-500"
                    placeholder="0.0"
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  {editingCourse ? 'Update Course' : 'Add Course'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
