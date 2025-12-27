'use client';

import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'about' | 'experience' | 'skills' | 'contact'>('about');
  const [isFollowing, setIsFollowing] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleSendMessage = () => {
    alert('Message feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black py-8 px-4 sm:px-6 lg:px-8">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          {isFollowing ? '✓ Following' : 'Unfollowed'}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden mb-6">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          {/* Profile Info */}
          <div className="px-6 sm:px-8 pb-8">
            {/* Avatar */}
            <div className="relative -mt-16 mb-4">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-zinc-900 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                JD
              </div>
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900"></div>
            </div>

            {/* Name and Title */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                Jane Doe
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-2">
                Senior Software Engineer
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-500 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                San Francisco, CA
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6 py-6 border-y border-zinc-200 dark:border-zinc-800">
              <div className="text-center">
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">254</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">1.2K</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">892</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Following</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleFollow}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  isFollowing
                    ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-300 dark:hover:bg-zinc-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              <button
                onClick={handleSendMessage}
                className="flex-1 py-3 px-6 rounded-lg font-semibold bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all duration-200"
              >
                Message
              </button>
              <button className="py-3 px-6 rounded-lg font-semibold bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl mb-6 overflow-hidden">
          <div className="flex border-b border-zinc-200 dark:border-zinc-800">
            {(['about', 'experience', 'skills', 'contact'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 font-semibold capitalize transition-all duration-200 ${
                  activeTab === tab
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                    About Me
                  </h3>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    Passionate software engineer with over 8 years of experience building scalable web applications. 
                    I specialize in React, Next.js, and modern web technologies. I love creating beautiful, 
                    performant user experiences and mentoring junior developers.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                    Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Web Development', 'Open Source', 'UI/UX Design', 'Machine Learning', 'Cloud Computing'].map((interest) => (
                      <span
                        key={interest}
                        className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-6">
                {[
                  {
                    title: 'Senior Software Engineer',
                    company: 'Tech Corp',
                    period: '2020 - Present',
                    description: 'Leading frontend development team, architecting scalable React applications.',
                  },
                  {
                    title: 'Software Engineer',
                    company: 'StartupXYZ',
                    period: '2018 - 2020',
                    description: 'Built and maintained core product features using React and Node.js.',
                  },
                  {
                    title: 'Junior Developer',
                    company: 'Digital Agency',
                    period: '2016 - 2018',
                    description: 'Developed responsive websites and web applications for various clients.',
                  },
                ].map((job, index) => (
                  <div key={index} className="border-l-2 border-blue-500 pl-4">
                    <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      {job.title}
                    </h4>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                      {job.company} • {job.period}
                    </div>
                    <p className="text-zinc-700 dark:text-zinc-300">{job.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-6">
                {[
                  { name: 'React/Next.js', level: 95 },
                  { name: 'TypeScript', level: 90 },
                  { name: 'Node.js', level: 85 },
                  { name: 'CSS/Tailwind', level: 92 },
                  { name: 'GraphQL', level: 80 },
                  { name: 'AWS', level: 75 },
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                        {skill.name}
                      </span>
                      <span className="text-zinc-600 dark:text-zinc-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: '📧', label: 'Email', value: 'jane.doe@example.com' },
                    { icon: '📱', label: 'Phone', value: '+1 (555) 123-4567' },
                    { icon: '🌐', label: 'Website', value: 'janedoe.dev' },
                    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/janedoe' },
                  ].map((contact) => (
                    <div
                      key={contact.label}
                      className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      <div className="text-2xl mb-2">{contact.icon}</div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                        {contact.label}
                      </div>
                      <div className="text-zinc-900 dark:text-zinc-50 font-medium">
                        {contact.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                    💡 Available for Freelance Work
                  </h4>
                  <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                    I&apos;m currently available for freelance projects and consulting opportunities. 
                    Feel free to reach out!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
