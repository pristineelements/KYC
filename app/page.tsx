'use client';

import { useState } from 'react';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  enrolledCourses: number[];
}

interface TextBlock {
  id: string;
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  textAlign: 'left' | 'center' | 'right';
  color: string;
}

interface SlideContent {
  textBlocks: TextBlock[];
  images: { id: string; url: string; alt: string }[];
}

interface Slide {
  id: number;
  title: string;
  content: string;
  slideNumber: number;
  richContent?: SlideContent;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  image: string;
  slides: Slide[];
  quiz: QuizQuestion[];
}

export default function Home() {
  const [currentUser] = useState<UserProfile>({
    id: 1,
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    avatar: '👤',
    bio: 'Passionate learner exploring web development and design',
    enrolledCourses: [1, 2, 3],
  });

  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: 'React & Next.js Masterclass',
      description: 'Learn modern React development with Next.js, including App Router, Server Components, and advanced patterns.',
      instructor: 'Sarah Johnson',
      level: 'Advanced',
      category: 'Web Development',
      image: '🚀',
      slides: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        slideNumber: i + 1,
        title: `React Lesson ${i + 1}`,
        content: `This is slide ${i + 1} covering important React and Next.js concepts. Learn about modern web development patterns and best practices.`,
        richContent: {
          textBlocks: [{
            id: '1',
            text: `This is slide ${i + 1} covering important React and Next.js concepts. Learn about modern web development patterns and best practices.`,
            fontFamily: 'Arial',
            fontSize: 16,
            fontWeight: 'normal',
            textAlign: 'left',
            color: '#000000',
          }],
          images: [],
        },
      })),
      quiz: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        question: `React Question ${i + 1}: What is the best practice for this scenario?`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
      })),
    },
    {
      id: 2,
      title: 'TypeScript Fundamentals',
      description: 'Master TypeScript from basics to advanced concepts. Build type-safe applications.',
      instructor: 'Michael Chen',
      level: 'Intermediate',
      category: 'Programming',
      image: '📘',
      slides: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        slideNumber: i + 1,
        title: `TypeScript Lesson ${i + 1}`,
        content: `This is slide ${i + 1} covering TypeScript fundamentals. Learn about types, interfaces, and advanced TypeScript features.`,
        richContent: {
          textBlocks: [{
            id: '1',
            text: `This is slide ${i + 1} covering TypeScript fundamentals. Learn about types, interfaces, and advanced TypeScript features.`,
            fontFamily: 'Arial',
            fontSize: 16,
            fontWeight: 'normal',
            textAlign: 'left',
            color: '#000000',
          }],
          images: [],
        },
      })),
      quiz: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        question: `TypeScript Question ${i + 1}: Which type annotation is correct?`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 1,
      })),
    },
    {
      id: 3,
      title: 'UI/UX Design Essentials',
      description: 'Create beautiful, user-friendly interfaces. Learn design principles and prototyping.',
      instructor: 'Emma Davis',
      level: 'Beginner',
      category: 'Design',
      image: '🎨',
      slides: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        slideNumber: i + 1,
        title: `Design Lesson ${i + 1}`,
        content: `This is slide ${i + 1} covering UI/UX design principles. Learn about user experience, visual hierarchy, and design systems.`,
        richContent: {
          textBlocks: [{
            id: '1',
            text: `This is slide ${i + 1} covering UI/UX design principles. Learn about user experience, visual hierarchy, and design systems.`,
            fontFamily: 'Arial',
            fontSize: 16,
            fontWeight: 'normal',
            textAlign: 'left',
            color: '#000000',
          }],
          images: [],
        },
      })),
      quiz: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        question: `Design Question ${i + 1}: What principle applies here?`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 2,
      })),
    },
  ]);

  const [view, setView] = useState<'profile' | 'courses' | 'course-detail'>('profile');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const [slideFormData, setSlideFormData] = useState<{
    title: string;
    content: string;
    textBlocks: TextBlock[];
    images: { id: string; url: string; alt: string }[];
  }>({
    title: '',
    content: '',
    textBlocks: [],
    images: [],
  });

  const [questionFormData, setQuestionFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
  });

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const enrolledCourses = courses.filter(c => currentUser.enrolledCourses.includes(c.id));

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentSlide(0);
    setShowQuiz(false);
    setShowQuizResults(false);
    setQuizAnswers({});
    setView('course-detail');
  };

  const handleNextSlide = () => {
    if (selectedCourse && currentSlide < selectedCourse.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (selectedCourse && currentSlide === selectedCourse.slides.length - 1) {
      setShowQuiz(true);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setShowQuiz(false);
    }
  };

  const handleEditSlide = (slide: Slide) => {
    setEditingSlide(slide);
    setSlideFormData({
      title: slide.title,
      content: slide.content,
      textBlocks: slide.richContent?.textBlocks || [{
        id: '1',
        text: slide.content,
        fontFamily: 'Arial',
        fontSize: 16,
        fontWeight: 'normal',
        textAlign: 'left',
        color: '#000000',
      }],
      images: slide.richContent?.images || [],
    });
  };

  const handleAddSlide = () => {
    if (!selectedCourse) return;
    const newSlide: Slide = {
      id: selectedCourse.slides.length + 1,
      slideNumber: selectedCourse.slides.length + 1,
      title: '',
      content: '',
      richContent: {
        textBlocks: [],
        images: [],
      },
    };
    setEditingSlide(newSlide);
    setSlideFormData({
      title: '',
      content: '',
      textBlocks: [],
      images: [],
    });
  };

  const handleAddTextBlock = () => {
    const newTextBlock: TextBlock = {
      id: Date.now().toString(),
      text: '',
      fontFamily: 'Arial',
      fontSize: 16,
      fontWeight: 'normal',
      textAlign: 'left',
      color: '#000000',
    };
    setSlideFormData({
      ...slideFormData,
      textBlocks: [...slideFormData.textBlocks, newTextBlock],
    });
  };

  const handleUpdateTextBlock = (id: string, updates: Partial<TextBlock>) => {
    setSlideFormData({
      ...slideFormData,
      textBlocks: slideFormData.textBlocks.map(block =>
        block.id === id ? { ...block, ...updates } : block
      ),
    });
  };

  const handleDeleteTextBlock = (id: string) => {
    setSlideFormData({
      ...slideFormData,
      textBlocks: slideFormData.textBlocks.filter(block => block.id !== id),
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = {
          id: Date.now().toString(),
          url: reader.result as string,
          alt: file.name,
        };
        setSlideFormData({
          ...slideFormData,
          images: [...slideFormData.images, newImage],
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (id: string) => {
    setSlideFormData({
      ...slideFormData,
      images: slideFormData.images.filter(img => img.id !== id),
    });
  };

  const handleSaveSlide = () => {
    if (!selectedCourse || !editingSlide) return;

    const updatedCourses = courses.map(course => {
      if (course.id === selectedCourse.id) {
        const existingSlide = course.slides.find(s => s.id === editingSlide.id);
        const updatedSlide = {
          ...editingSlide,
          title: slideFormData.title,
          content: slideFormData.textBlocks.map(b => b.text).join('\n'),
          richContent: {
            textBlocks: slideFormData.textBlocks,
            images: slideFormData.images,
          },
        };

        if (existingSlide) {
          return {
            ...course,
            slides: course.slides.map(s =>
              s.id === editingSlide.id ? updatedSlide : s
            ),
          };
        } else {
          return {
            ...course,
            slides: [...course.slides, updatedSlide],
          };
        }
      }
      return course;
    });

    setCourses(updatedCourses);
    setSelectedCourse(updatedCourses.find(c => c.id === selectedCourse.id) || null);
    setEditingSlide(null);
    showNotification('Slide saved successfully!', 'success');
  };

  const handleDeleteSlide = (slideId: number) => {
    if (!selectedCourse || !confirm('Delete this slide?')) return;

    const updatedCourses = courses.map(course => {
      if (course.id === selectedCourse.id) {
        return {
          ...course,
          slides: course.slides.filter(s => s.id !== slideId).map((s, i) => ({
            ...s,
            slideNumber: i + 1,
          })),
        };
      }
      return course;
    });

    setCourses(updatedCourses);
    setSelectedCourse(updatedCourses.find(c => c.id === selectedCourse.id) || null);
    if (currentSlide >= (selectedCourse.slides.length - 1)) {
      setCurrentSlide(Math.max(0, currentSlide - 1));
    }
    showNotification('Slide deleted successfully!', 'success');
  };

  const handleEditQuestion = (question: QuizQuestion) => {
    setEditingQuestion(question);
    setQuestionFormData({
      question: question.question,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
    });
  };

  const handleAddQuestion = () => {
    if (!selectedCourse) return;
    const newQuestion: QuizQuestion = {
      id: selectedCourse.quiz.length + 1,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    };
    setEditingQuestion(newQuestion);
    setQuestionFormData({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    });
  };

  const handleSaveQuestion = () => {
    if (!selectedCourse || !editingQuestion) return;

    const updatedCourses = courses.map(course => {
      if (course.id === selectedCourse.id) {
        const existingQuestion = course.quiz.find(q => q.id === editingQuestion.id);
        if (existingQuestion) {
          return {
            ...course,
            quiz: course.quiz.map(q =>
              q.id === editingQuestion.id ? { ...q, ...questionFormData } : q
            ),
          };
        } else {
          return {
            ...course,
            quiz: [...course.quiz, { ...editingQuestion, ...questionFormData }],
          };
        }
      }
      return course;
    });

    setCourses(updatedCourses);
    setSelectedCourse(updatedCourses.find(c => c.id === selectedCourse.id) || null);
    setEditingQuestion(null);
    showNotification('Question saved successfully!', 'success');
  };

  const handleDeleteQuestion = (questionId: number) => {
    if (!selectedCourse || !confirm('Delete this question?')) return;

    const updatedCourses = courses.map(course => {
      if (course.id === selectedCourse.id) {
        return {
          ...course,
          quiz: course.quiz.filter(q => q.id !== questionId),
        };
      }
      return course;
    });

    setCourses(updatedCourses);
    setSelectedCourse(updatedCourses.find(c => c.id === selectedCourse.id) || null);
    showNotification('Question deleted successfully!', 'success');
  };

  const handleSubmitQuiz = () => {
    setShowQuizResults(true);
  };

  const calculateScore = () => {
    if (!selectedCourse) return 0;
    let correct = 0;
    selectedCourse.quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const renderSlideContent = (slide: Slide) => {
    if (slide.richContent && (slide.richContent.textBlocks.length > 0 || slide.richContent.images.length > 0)) {
      return (
        <div className="space-y-4">
          {slide.richContent.textBlocks.map((block) => (
            <p
              key={block.id}
              style={{
                fontFamily: block.fontFamily,
                fontSize: `${block.fontSize}px`,
                fontWeight: block.fontWeight,
                textAlign: block.textAlign,
                color: block.color,
              }}
              className="whitespace-pre-wrap"
            >
              {block.text}
            </p>
          ))}
          {slide.richContent.images.map((image) => (
            <img
              key={image.id}
              src={image.url}
              alt={image.alt}
              className="max-w-full h-auto rounded-lg"
            />
          ))}
        </div>
      );
    }
    return <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">{slide.content}</p>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black flex">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Sidebar */}
      <div className="w-80 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
        {/* Profile Section */}
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl">
              {currentUser.avatar}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-50">{currentUser.name}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{currentUser.email}</p>
            </div>
          </div>
          <button
            onClick={() => setView('profile')}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              view === 'profile'
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            View Full Profile
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">My Courses</h4>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {enrolledCourses.length}
            </span>
          </div>
          <div className="space-y-2">
            {enrolledCourses.map(course => (
              <button
                key={course.id}
                onClick={() => handleViewCourse(course)}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  selectedCourse?.id === course.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
                    : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{course.image}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">
                      {course.title}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">
                  {course.slides.length} slides • {course.quiz.length} questions
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {view === 'profile' && (
          <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
              My Profile
            </h1>
            
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden mb-6">
              <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              <div className="p-8">
                <div className="flex items-start gap-6 -mt-16 mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-6xl border-4 border-white dark:border-zinc-900">
                    {currentUser.avatar}
                  </div>
                  <div className="flex-1 mt-16">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                      {currentUser.name}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4">{currentUser.email}</p>
                    <p className="text-zinc-700 dark:text-zinc-300">{currentUser.bio}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                      {enrolledCourses.length}
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">Enrolled Courses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                      {enrolledCourses.reduce((sum, c) => sum + c.slides.length, 0)}
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">Total Lessons</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                      {enrolledCourses.reduce((sum, c) => sum + c.quiz.length, 0)}
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">Quiz Questions</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                Enrolled Courses
              </h3>
              <div className="grid gap-4">
                {enrolledCourses.map(course => (
                  <div
                    key={course.id}
                    className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
                  >
                    <div className="text-4xl">{course.image}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-zinc-900 dark:text-zinc-50">{course.title}</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        by {course.instructor}
                      </p>
                    </div>
                    <button
                      onClick={() => handleViewCourse(course)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Continue Learning
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'course-detail' && selectedCourse && (
          <div className="max-w-6xl mx-auto p-8">
            {/* Course Header */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setView('profile')}
                className="p-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                  {selectedCourse.title}
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400">by {selectedCourse.instructor}</p>
              </div>
            </div>

            {!showQuiz ? (
              <>
                {/* Slide Viewer */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl font-bold">
                        Slide {currentSlide + 1} of {selectedCourse.slides.length}
                      </h2>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditSlide(selectedCourse.slides[currentSlide])}
                          className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                          title="Edit Slide"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteSlide(selectedCourse.slides[currentSlide].id)}
                          className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                          title="Delete Slide"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white rounded-full h-2 transition-all duration-300"
                        style={{ width: `${((currentSlide + 1) / selectedCourse.slides.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-12">
                    <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                      {selectedCourse.slides[currentSlide].title}
                    </h3>
                    {renderSlideContent(selectedCourse.slides[currentSlide])}
                  </div>

                  <div className="p-6 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-between">
                    <button
                      onClick={handlePrevSlide}
                      disabled={currentSlide === 0}
                      className="flex items-center gap-2 px-6 py-3 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-900 dark:text-zinc-50 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </button>

                    <button
                      onClick={handleAddSlide}
                      className="flex items-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Slide
                    </button>

                    <button
                      onClick={handleNextSlide}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      {currentSlide === selectedCourse.slides.length - 1 ? 'Take Quiz' : 'Next'}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Slide Thumbnails */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                    All Slides
                  </h3>
                  <div className="grid grid-cols-5 gap-4">
                    {selectedCourse.slides.map((slide, index) => (
                      <button
                        key={slide.id}
                        onClick={() => setCurrentSlide(index)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          currentSlide === index
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                            : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                        }`}
                      >
                        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                          Slide {slide.slideNumber}
                        </div>
                        <div className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                          {slide.title}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                      Course Quiz
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Test your knowledge with {selectedCourse.quiz.length} questions
                    </p>
                  </div>
                  <button
                    onClick={handleAddQuestion}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Question
                  </button>
                </div>

                {showQuizResults ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">
                      {calculateScore() / selectedCourse.quiz.length >= 0.7 ? '🎉' : '📝'}
                    </div>
                    <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                      Quiz Complete!
                    </h3>
                    <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                      {calculateScore()} / {selectedCourse.quiz.length}
                    </div>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
                      {calculateScore() / selectedCourse.quiz.length >= 0.7
                        ? 'Great job! You passed!'
                        : 'Keep practicing!'}
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => {
                          setShowQuizResults(false);
                          setQuizAnswers({});
                        }}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                      >
                        Retake Quiz
                      </button>
                      <button
                        onClick={() => {
                          setShowQuiz(false);
                          setCurrentSlide(0);
                          setShowQuizResults(false);
                          setQuizAnswers({});
                        }}
                        className="px-6 py-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-lg font-semibold transition-colors"
                      >
                        Back to Slides
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-6 mb-8">
                      {selectedCourse.quiz.map((question, qIndex) => (
                        <div
                          key={question.id}
                          className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                              {qIndex + 1}. {question.question}
                            </h4>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditQuestion(question)}
                                className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                                title="Edit"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteQuestion(question.id)}
                                className="p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                title="Delete"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {question.options.map((option, oIndex) => (
                              <label
                                key={oIndex}
                                className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                  quizAnswers[question.id] === oIndex
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                    : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`question-${question.id}`}
                                  checked={quizAnswers[question.id] === oIndex}
                                  onChange={() => setQuizAnswers({ ...quizAnswers, [question.id]: oIndex })}
                                  className="w-4 h-4"
                                />
                                <span className="text-zinc-900 dark:text-zinc-50">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setShowQuiz(false)}
                        className="flex-1 px-6 py-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-lg font-semibold transition-colors"
                      >
                        Back to Slides
                      </button>
                      <button
                        onClick={handleSubmitQuiz}
                        disabled={Object.keys(quizAnswers).length < selectedCourse.quiz.length}
                        className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Submit Quiz
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Slide Modal - Enhanced with Rich Text Editor */}
      {editingSlide && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-4xl w-full my-8">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {selectedCourse?.slides.find(s => s.id === editingSlide.id) ? 'Edit Slide' : 'Add New Slide'}
              </h2>
              <button
                onClick={() => setEditingSlide(null)}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Slide Title */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Slide Title *
                </label>
                <input
                  type="text"
                  value={slideFormData.title}
                  onChange={(e) => setSlideFormData({ ...slideFormData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter slide title"
                />
              </div>

              {/* Text Blocks Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Text Blocks
                  </label>
                  <button
                    onClick={handleAddTextBlock}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Text Block
                  </button>
                </div>

                <div className="space-y-4">
                  {slideFormData.textBlocks.map((block, index) => (
                    <div key={block.id} className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Text Block {index + 1}
                        </span>
                        <button
                          onClick={() => handleDeleteTextBlock(block.id)}
                          className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <textarea
                        value={block.text}
                        onChange={(e) => handleUpdateTextBlock(block.id, { text: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Enter text content"
                        rows={3}
                      />

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                            Font Family
                          </label>
                          <select
                            value={block.fontFamily}
                            onChange={(e) => handleUpdateTextBlock(block.id, { fontFamily: e.target.value })}
                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 text-sm focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Arial">Arial</option>
                            <option value="Helvetica">Helvetica</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Courier New">Courier New</option>
                            <option value="Verdana">Verdana</option>
                            <option value="Trebuchet MS">Trebuchet MS</option>
                            <option value="Comic Sans MS">Comic Sans MS</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                            Font Size
                          </label>
                          <input
                            type="number"
                            value={block.fontSize}
                            onChange={(e) => handleUpdateTextBlock(block.id, { fontSize: parseInt(e.target.value) })}
                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 text-sm focus:ring-2 focus:ring-blue-500"
                            min="8"
                            max="72"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                            Font Weight
                          </label>
                          <select
                            value={block.fontWeight}
                            onChange={(e) => handleUpdateTextBlock(block.id, { fontWeight: e.target.value })}
                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 text-sm focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="normal">Normal</option>
                            <option value="bold">Bold</option>
                            <option value="lighter">Light</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                            Text Align
                          </label>
                          <select
                            value={block.textAlign}
                            onChange={(e) => handleUpdateTextBlock(block.id, { textAlign: e.target.value as 'left' | 'center' | 'right' })}
                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 text-sm focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                          Text Color
                        </label>
                        <input
                          type="color"
                          value={block.color}
                          onChange={(e) => handleUpdateTextBlock(block.id, { color: e.target.value })}
                          className="w-20 h-10 border border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Images Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Images
                  </label>
                  <label className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {slideFormData.images.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-40 object-cover rounded-lg border border-zinc-300 dark:border-zinc-700"
                      />
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                  Preview
                </label>
                <div className="p-6 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg min-h-40">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                    {slideFormData.title || 'Untitled Slide'}
                  </h3>
                  <div className="space-y-4">
                    {slideFormData.textBlocks.map((block) => (
                      <p
                        key={block.id}
                        style={{
                          fontFamily: block.fontFamily,
                          fontSize: `${block.fontSize}px`,
                          fontWeight: block.fontWeight,
                          textAlign: block.textAlign,
                          color: block.color,
                        }}
                        className="whitespace-pre-wrap"
                      >
                        {block.text || 'Empty text block'}
                      </p>
                    ))}
                    {slideFormData.images.map((image) => (
                      <img
                        key={image.id}
                        src={image.url}
                        alt={image.alt}
                        className="max-w-full h-auto rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={handleSaveSlide}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Save Slide
                </button>
                <button
                  onClick={() => setEditingSlide(null)}
                  className="flex-1 px-6 py-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Question Modal */}
      {editingQuestion && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {selectedCourse?.quiz.find(q => q.id === editingQuestion.id) ? 'Edit Question' : 'Add New Question'}
              </h2>
              <button
                onClick={() => setEditingQuestion(null)}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Question *
                </label>
                <input
                  type="text"
                  value={questionFormData.question}
                  onChange={(e) => setQuestionFormData({ ...questionFormData, question: e.target.value })}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter question"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Options
                </label>
                <div className="space-y-2">
                  {questionFormData.options.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...questionFormData.options];
                          newOptions[index] = e.target.value;
                          setQuestionFormData({ ...questionFormData, options: newOptions });
                        }}
                        className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-500"
                        placeholder={`Option ${index + 1}`}
                      />
                      <button
                        onClick={() => setQuestionFormData({ ...questionFormData, correctAnswer: index })}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          questionFormData.correctAnswer === index
                            ? 'bg-green-600 text-white'
                            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50'
                        }`}
                      >
                        {questionFormData.correctAnswer === index ? '✓ Correct' : 'Set Correct'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveQuestion}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Save Question
                </button>
                <button
                  onClick={() => setEditingQuestion(null)}
                  className="flex-1 px-6 py-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
