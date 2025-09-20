'use client'

import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy] = useState('category')
  const [viewMode, setViewMode] = useState('cards')
  const [currentPage, setCurrentPage] = useState(1)
  const testsPerPageCards = 12
  const testsPerPageList = 12

  const handleLogoReset = () => {
    setActiveFilter('all')
    setSortBy('category')
    setViewMode('cards')
    setCurrentPage(1)
  }

  const categories = [
    {
      id: 'personality',
      title: 'Character Assessment',
      description: 'Take our MBTI-style personality test to learn more about yourself and discover your unique traits.',
      icon: '🧠',
      path: '/personality',
      color: 'from-green-400 to-green-600',
      category: 'Personality & Self-Discovery'
    },
    {
      id: 'emotional-intelligence',
      title: 'Emotional Intelligence',
      description: 'Discover your EQ level and emotional awareness with our comprehensive assessment.',
      icon: '💝',
      path: '/emotional-intelligence',
      color: 'from-pink-400 to-pink-600',
      category: 'Personality & Self-Discovery'
    },
    {
      id: 'optical',
      title: 'Optical Illusions',
      description: 'Explore optical illusions and discover how your mind interprets visual information with fascinating perceptual tricks.',
      icon: '👁️',
      path: '/optical-illusion',
      color: 'from-purple-400 to-purple-600',
      category: 'Visual & Perception'
    },
    {
      id: 'color-blindness',
      title: 'Color Blindness Check',
      description: 'Test your color vision with our comprehensive Ishihara test to detect color blindness.',
      icon: '🌈',
      path: '/color-blindness',
      color: 'from-indigo-400 to-indigo-600',
      category: 'Visual & Perception'
    },
    {
      id: 'trivia',
      title: 'Trivia Quiz',
      description: 'Test your general knowledge with our fun trivia quiz covering various topics and challenge your intellect.',
      icon: '📚',
      path: '/trivia',
      color: 'from-blue-400 to-blue-600',
      category: 'Knowledge & Trivia'
    },
    {
      id: 'math',
      title: 'Math Exam',
      description: 'Test your 7th-8th grade math skills with our comprehensive assessment covering arithmetic and fractions.',
      icon: '🧮',
      path: '/math',
      color: 'from-orange-400 to-orange-600',
      category: 'Knowledge & Trivia'
    },
    {
      id: 'typing',
      title: 'Typing Practice',
      description: 'Test your typing speed and accuracy with our typing challenge to improve your skills and productivity.',
      icon: '⌨️',
      path: '/typing',
      color: 'from-green-500 to-green-700',
      category: 'Skills & Productivity'
    },
              {
                id: 'memory',
                title: 'Memory Challenge',
                description: 'Challenge your memory and reaction time with our cognitive tests designed to improve mental agility.',
                icon: '🧩',
                path: '/memory',
                color: 'from-purple-500 to-purple-700',
                category: 'Cognitive & Mental Agility'
              },
              {
                id: 'reaction-time',
                title: 'Reaction Time',
                description: 'Test your speed and accuracy with our comprehensive reaction time assessment covering visual processing.',
                icon: '⚡',
                path: '/reaction-time',
                color: 'from-orange-400 to-orange-600',
                category: 'Skills & Productivity'
              },
              {
                id: 'stress-test',
                title: 'Stress Evaluation',
                description: 'Evaluate your stress levels and learn effective coping strategies with our comprehensive assessment.',
                icon: '😌',
                path: '/stress-test',
                color: 'from-green-500 to-green-700',
                category: 'Personality & Self-Discovery'
              },
              {
                id: 'leadership-test',
                title: 'Leadership Analysis',
                description: 'Evaluate your leadership potential and management skills with our detailed comprehensive test.',
                icon: '👑',
                path: '/leadership-test',
                color: 'from-yellow-500 to-yellow-700',
                category: 'Personality & Self-Discovery'
              },
              {
                id: 'iq-test',
                title: 'IQ Measurement',
                description: 'Measure your cognitive abilities with logical reasoning and problem-solving comprehensive tests.',
                icon: '🧩',
                path: '/iq-test',
                color: 'from-blue-500 to-blue-700',
                category: 'Cognitive & Mental Agility'
              },
              {
                id: 'creativity-test',
                title: 'Creativity Explorer',
                description: 'Discover your creative potential and innovative thinking abilities with our comprehensive detailed test.',
                icon: '🎨',
                path: '/creativity-test',
                color: 'from-pink-400 to-pink-600',
                category: 'Cognitive & Mental Agility'
              },
              {
                id: 'communication-test',
                title: 'Communication Mastery',
                description: 'Evaluate your verbal and written communication abilities with our comprehensive assessment.',
                icon: '💬',
                path: '/communication-test',
                color: 'from-blue-400 to-blue-600',
                category: 'Skills & Productivity'
              },
              {
                id: 'time-management-test',
                title: 'Time Management',
                description: 'Assess your time management skills and productivity habits with our comprehensive detailed test.',
                icon: '⏰',
                path: '/time-management-test',
                color: 'from-green-400 to-green-600',
                category: 'Skills & Productivity'
              },
              {
                id: 'decision-making-test',
                title: 'Decision Making',
                description: 'Test your decision-making abilities and problem-solving approach with our comprehensive assessment.',
                icon: '🎯',
                path: '/decision-making-test',
                color: 'from-purple-400 to-purple-600',
                category: 'Cognitive & Mental Agility'
              }
  ]

  const filterOptions = [
    { id: 'all', label: 'All Tests' },
    { id: 'personality', label: 'Personality' },
    { id: 'visual', label: 'Visual' },
    { id: 'knowledge', label: 'Knowledge' },
    { id: 'skills', label: 'Skills' },
    { id: 'cognitive', label: 'Cognitive' }
  ]

  // Define category order to match filter buttons
  const categoryOrder = ['Personality & Self-Discovery', 'Visual & Perception', 'Knowledge & Trivia', 'Skills & Productivity', 'Cognitive & Mental Agility']
  
  const filteredCategories = categories.filter(category => {
    if (activeFilter === 'all') return true
    return category.category.toLowerCase().includes(activeFilter)
  }).sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return a.title.localeCompare(b.title)
    } else if (sortBy === 'category') {
      return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
    }
    return 0
  })

  // Pagination logic
  const testsPerPage = viewMode === 'cards' ? testsPerPageCards : testsPerPageList
  const totalPages = Math.ceil(filteredCategories.length / testsPerPage)
  const startIndex = (currentPage - 1) * testsPerPage
  const endIndex = startIndex + testsPerPage
  const currentTests = filteredCategories.slice(startIndex, endIndex)

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>TestYourself - Free Online Tests & Assessments | Personality, Trivia, Memory & More</title>
        <meta name="description" content="Discover yourself with our free online tests! Take personality assessments, emotional intelligence tests, color blindness tests, trivia quizzes, memory challenges, optical illusion tests, and typing speed tests. Start your journey of self-discovery today!" />
        <meta name="keywords" content="online tests, personality test, trivia quiz, memory test, optical illusions, typing test, self-discovery, free assessments, psychological tests" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://testyourself.com/" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="TestYourself - Free Online Tests & Assessments" />
        <meta property="og:description" content="Discover yourself with our free online tests! Take personality assessments, emotional intelligence tests, color blindness tests, trivia quizzes, memory challenges, optical illusion tests, and typing speed tests." />
        <meta property="og:image" content="https://testyourself.com/og-image.jpg" />
        <meta property="og:url" content="https://testyourself.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TestYourself" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TestYourself - Free Online Tests & Assessments" />
        <meta name="twitter:description" content="Discover yourself with our free online tests! Take personality assessments, emotional intelligence tests, color blindness tests, trivia quizzes, memory challenges, optical illusion tests, and typing speed tests." />
        <meta name="twitter:image" content="https://testyourself.com/og-image.jpg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "TestYourself",
              "description": "Free online tests and assessments including personality tests, emotional intelligence tests, color blindness tests, trivia quizzes, memory challenges, optical illusion tests, and typing speed tests.",
              "url": "https://testyourself.com/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://testyourself.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "mainEntity": {
                "@type": "ItemList",
                "name": "Online Tests Collection",
                "description": "A collection of free online tests and assessments",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Character Assessment",
                    "description": "Take our MBTI-style personality test to learn more about yourself",
                    "url": "https://testyourself.com/personality"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Emotional Intelligence",
                    "description": "Discover your EQ level and emotional awareness with our comprehensive assessment",
                    "url": "https://testyourself.com/emotional-intelligence"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Optical Illusions",
                    "description": "Explore optical illusions and discover how your mind interprets visual information",
                    "url": "https://testyourself.com/optical-illusion"
                  },
                  {
                    "@type": "ListItem",
                    "position": 4,
                    "name": "Color Blindness Test",
                    "description": "Test your color vision with our comprehensive Ishihara test to detect color blindness",
                    "url": "https://testyourself.com/color-blindness"
                  },
                  {
                    "@type": "ListItem",
                    "position": 5,
                    "name": "Trivia Quiz",
                    "description": "Test your general knowledge with our fun trivia quiz",
                    "url": "https://testyourself.com/trivia"
                  },
                  {
                    "@type": "ListItem",
                    "position": 6,
                    "name": "Math",
                    "description": "Test your 7th-8th grade math skills with our comprehensive assessment",
                    "url": "https://testyourself.com/math"
                  },
                  {
                    "@type": "ListItem",
                    "position": 7,
                    "name": "Typing Test",
                    "description": "Test your typing speed and accuracy with our typing challenge",
                    "url": "https://testyourself.com/typing"
                  },
                  {
                    "@type": "ListItem",
                    "position": 8,
                    "name": "Memory Challenge",
                    "description": "Challenge your memory and reaction time with our cognitive tests",
                    "url": "https://testyourself.com/memory"
                  },
                  {
                    "@type": "ListItem",
                    "position": 9,
                    "name": "Reaction Time",
                    "description": "Test your speed and accuracy with our comprehensive reaction time assessment",
                    "url": "https://testyourself.com/reaction-time"
                  }
                ]
              }
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen flex flex-col">
      <div className="pt-2 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Header onLogoClick={handleLogoReset} />

        {/* Filter Buttons - Responsive Layout */}
        <div className="mt-2 mb-2">
          {/* Desktop: Single line layout */}
          <div className="hidden lg:flex justify-between items-center gap-2">
            {/* Left: Sort Buttons */}
            <div className="flex gap-1">
              <button
                onClick={() => setSortBy('category')}
                className={`px-2 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                  sortBy === 'category'
                    ? 'text-sage-600 hover:text-sage-900 border border-sage-200 bg-purple-50 hover:bg-sage-100'
                    : 'text-gray-300 hover:text-gray-600 border border-gray-200 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Category
              </button>
              <button
                onClick={() => setSortBy('alphabetical')}
                className={`px-2 py-2 rounded-full font-medium transition-all duration-300 text-sm whitespace-nowrap ${
                  sortBy === 'alphabetical'
                    ? 'text-sage-600 hover:text-sage-900 border border-sage-200 bg-purple-50 hover:bg-sage-100'
                    : 'text-gray-300 hover:text-gray-600 border border-gray-200 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                A-Z
              </button>
            </div>
            
            {/* Center: Filter Buttons */}
            <div className="flex gap-2 flex-shrink-0">
              {filterOptions.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3 py-2 rounded-full font-medium transition-all duration-300 text-sm whitespace-nowrap ${
                    activeFilter === filter.id
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-sage-600 hover:text-sage-900 border border-sage-200 hover:bg-sage-100'
                  } ${activeFilter !== filter.id ? 'bg-purple-50' : ''}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            
            {/* Right: View Buttons */}
            <div className="flex gap-1">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-2 py-2 rounded-full font-medium transition-all duration-300 text-sm whitespace-nowrap ${
                  viewMode === 'cards'
                    ? 'text-sage-600 hover:text-sage-900 border border-sage-200 bg-purple-50 hover:bg-sage-100'
                    : 'text-gray-300 hover:text-gray-600 border border-gray-200 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                🔲 Cards
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-2 py-2 rounded-full font-medium transition-all duration-300 text-sm whitespace-nowrap ${
                  viewMode === 'list'
                    ? 'text-sage-600 hover:text-sage-900 border border-sage-200 bg-purple-50 hover:bg-sage-100'
                    : 'text-gray-300 hover:text-gray-600 border border-gray-200 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                📋 List
              </button>
            </div>
          </div>

          {/* Mobile/Tablet: Two line layout */}
          <div className="flex lg:hidden flex-col gap-3">
            {/* Top line: Sort and View */}
            <div className="flex justify-between items-center gap-2">
              {/* Sort Buttons */}
              <div className="flex gap-1">
                <button
                  onClick={() => setSortBy('category')}
                  className={`px-1 py-1 sm:px-2 sm:py-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm ${
                    sortBy === 'category'
                      ? 'text-sage-600 hover:text-sage-800 border border-sage-200 bg-purple-50 hover:bg-sage-50'
                      : 'text-gray-300 hover:text-gray-400 border border-gray-200 bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Category
                </button>
                <button
                  onClick={() => setSortBy('alphabetical')}
                  className={`px-1 py-1 sm:px-2 sm:py-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap ${
                    sortBy === 'alphabetical'
                      ? 'text-sage-600 hover:text-sage-800 border border-sage-200 bg-purple-50 hover:bg-sage-50'
                      : 'text-gray-300 hover:text-gray-400 border border-gray-200 bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  A-Z
                </button>
              </div>
              
              {/* View Buttons */}
              <div className="flex gap-1">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-1 py-1 sm:px-2 sm:py-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap ${
                    viewMode === 'cards'
                      ? 'text-sage-600 hover:text-sage-800 border border-sage-200 bg-purple-50 hover:bg-sage-50'
                      : 'text-gray-300 hover:text-gray-400 border border-gray-200 bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  🔲 Cards
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-1 py-1 sm:px-2 sm:py-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap ${
                    viewMode === 'list'
                      ? 'text-sage-600 hover:text-sage-800 border border-sage-200 bg-purple-50 hover:bg-sage-50'
                      : 'text-gray-300 hover:text-gray-400 border border-gray-200 bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  📋 List
                </button>
              </div>
        </div>
            
            {/* Bottom line: Filter Buttons */}
            <div className="flex justify-center gap-1 sm:gap-2 flex-wrap pb-1 sm:pb-2 max-w-full">
              {filterOptions.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-2 py-1 sm:px-3 sm:py-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap ${
                    activeFilter === filter.id
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-sage-600 hover:text-sage-900 border border-sage-200 hover:bg-sage-100'
                  } ${activeFilter !== filter.id ? 'bg-purple-50' : ''}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Cards or List */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {currentTests.map((category) => (
              <Link
                key={category.id}
                href={category.path}
                className="group block"
              >
                <div className="bg-purple-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-102 pt-2.5 px-3 pb-3 h-full flex flex-col cursor-pointer group relative">
                  <div className="flex items-center mb-2 -ml-2">
                    <div className={`w-8 h-8 rounded-full ${category.color} flex items-center justify-center text-sm mr-1 group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    <h3 className={`text-sm font-semibold transition-colors whitespace-nowrap overflow-hidden text-ellipsis ${
                      ['leadership-test', 'iq-test', 'creativity-test', 'communication-test', 'time-management-test', 'decision-making-test'].includes(category.id)
                        ? 'text-red-600 group-hover:text-red-600'
                        : 'text-sage-800 group-hover:text-sage-600'
                    }`}>
                      {category.title}
                    </h3>
                  </div>
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-sage-100 text-sage-700 rounded-full whitespace-nowrap">
                      {category.category}
                    </span>
                  </div>
                  <p className="text-sage-600 mb-0 leading-relaxed text-xs line-clamp-3">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {currentTests.map((category) => (
              <Link
                key={category.id}
                href={category.path}
                className="group block"
              >
                <div className="bg-purple-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-102 py-1.5 px-3 cursor-pointer group relative">
                  {/* Mobile/Tablet: Without description */}
                  <div className="lg:hidden">
                    <div className="flex items-center gap-2 min-w-0">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className={`w-5 h-5 rounded-full ${category.color} flex items-center justify-center text-xs group-hover:scale-110 transition-transform duration-300`}>
                          {category.icon}
                        </div>
                      </div>
                      
                      {/* Title - Flexible */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-sm font-semibold transition-colors whitespace-nowrap overflow-hidden text-ellipsis ${
                          ['leadership-test', 'iq-test', 'creativity-test', 'communication-test', 'time-management-test', 'decision-making-test'].includes(category.id)
                            ? 'text-red-600 group-hover:text-red-600'
                            : 'text-sage-800 group-hover:text-sage-600'
                        }`}>
                          {category.title}
                        </h3>
                      </div>
                      
                      {/* Category - Right aligned, shrinkable */}
                      <div className="flex-shrink-0">
                        <span className="inline-block px-1.5 py-0.5 text-xs font-medium bg-sage-100 text-sage-700 rounded-full whitespace-nowrap">
                          {category.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Desktop: Full layout with description */}
                  <div className="hidden lg:grid grid-cols-12 gap-2 items-center">
                    {/* Icon */}
                    <div className="col-span-1 flex justify-center">
                      <div className={`w-6 h-6 rounded-full ${category.color} flex items-center justify-center text-xs group-hover:scale-110 transition-transform duration-300`}>
                        {category.icon}
                      </div>
                    </div>
                    
                    {/* Title - Left aligned */}
                    <div className="col-span-4 text-left">
                      <h3 className={`text-sm font-semibold transition-colors whitespace-nowrap overflow-hidden text-ellipsis ${
                        ['leadership-test', 'iq-test', 'creativity-test', 'communication-test', 'time-management-test', 'decision-making-test'].includes(category.id)
                          ? 'text-red-600 group-hover:text-red-600'
                          : 'text-sage-800 group-hover:text-sage-600'
                      }`}>
                        {category.title}
                      </h3>
                    </div>
                    
                    {/* Description - Center aligned */}
                    <div className="col-span-4 text-center">
                      <p className="text-sage-600 text-xs leading-tight">
                        {category.description}
                      </p>
                    </div>
                    
                    {/* Category - Right aligned */}
                    <div className="col-span-3 text-right">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-sage-100 text-sage-700 rounded-full whitespace-nowrap">
                        {category.category}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-2 mb-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                currentPage === 1
                  ? 'text-gray-300 hover:text-gray-600 border border-gray-200 bg-gray-100 hover:bg-gray-200 cursor-not-allowed'
                  : 'text-sage-600 hover:text-sage-900 border border-sage-200 bg-purple-50 hover:bg-sage-100'
              }`}
            >
              ← Previous
            </button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                    currentPage === page
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-sage-600 hover:text-sage-900 border border-sage-200 bg-purple-50 hover:bg-sage-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                currentPage === totalPages
                  ? 'text-gray-300 hover:text-gray-600 border border-gray-200 bg-gray-100 hover:bg-gray-200 cursor-not-allowed'
                  : 'text-sage-600 hover:text-sage-900 border border-sage-200 bg-purple-50 hover:bg-sage-100'
              }`}
            >
              Next →
            </button>
          </div>
        )}

        </div>
      </div>
      
      {/* Footer Component */}
      <Footer />
    </div>
    </>
  )
}