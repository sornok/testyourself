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

  const handleLogoReset = () => {
    setActiveFilter('all')
    setSortBy('category')
    setViewMode('cards')
  }

  const categories = [
    {
      id: 'personality',
      title: 'Character Assessment',
      description: 'Take our MBTI-style personality test to learn more about yourself',
      icon: '🧠',
      path: '/personality',
      color: 'from-green-400 to-green-600',
      category: 'Personality & Self-Discovery'
    },
    {
      id: 'optical',
      title: 'Optical Illusions',
      description: 'Explore optical illusions and discover how your mind interprets visual information',
      icon: '👁️',
      path: '/optical-illusion',
      color: 'from-purple-400 to-purple-600',
      category: 'Visual & Perception'
    },
    {
      id: 'trivia',
      title: 'Trivia Quiz',
      description: 'Test your general knowledge with our fun trivia quiz',
      icon: '📚',
      path: '/trivia',
      color: 'from-blue-400 to-blue-600',
      category: 'Knowledge & Trivia'
    },
    {
      id: 'typing',
      title: 'Typing',
      description: 'Test your typing speed and accuracy with our typing challenge',
      icon: '⌨️',
      path: '/typing',
      color: 'from-green-500 to-green-700',
      category: 'Skills & Productivity'
    },
    {
      id: 'memory',
      title: 'Memory Challenge',
      description: 'Challenge your memory and reaction time with our cognitive tests',
      icon: '🧩',
      path: '/memory',
      color: 'from-purple-500 to-purple-700',
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

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>TestYourself - Free Online Tests & Assessments | Personality, Trivia, Memory & More</title>
        <meta name="description" content="Discover yourself with our free online tests! Take personality assessments, trivia quizzes, memory challenges, optical illusion tests, and typing speed tests. Start your journey of self-discovery today!" />
        <meta name="keywords" content="online tests, personality test, trivia quiz, memory test, optical illusions, typing test, self-discovery, free assessments, psychological tests" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://testyourself.com/" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="TestYourself - Free Online Tests & Assessments" />
        <meta property="og:description" content="Discover yourself with our free online tests! Take personality assessments, trivia quizzes, memory challenges, optical illusion tests, and typing speed tests." />
        <meta property="og:image" content="https://testyourself.com/og-image.jpg" />
        <meta property="og:url" content="https://testyourself.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TestYourself" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TestYourself - Free Online Tests & Assessments" />
        <meta name="twitter:description" content="Discover yourself with our free online tests! Take personality assessments, trivia quizzes, memory challenges, optical illusion tests, and typing speed tests." />
        <meta name="twitter:image" content="https://testyourself.com/og-image.jpg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "TestYourself",
              "description": "Free online tests and assessments including personality tests, trivia quizzes, memory challenges, optical illusion tests, and typing speed tests.",
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
                    "name": "Optical Illusions",
                    "description": "Explore optical illusions and discover how your mind interprets visual information",
                    "url": "https://testyourself.com/optical-illusion"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Trivia Quiz",
                    "description": "Test your general knowledge with our fun trivia quiz",
                    "url": "https://testyourself.com/trivia"
                  },
                  {
                    "@type": "ListItem",
                    "position": 4,
                    "name": "Typing Test",
                    "description": "Test your typing speed and accuracy with our typing challenge",
                    "url": "https://testyourself.com/typing"
                  },
                  {
                    "@type": "ListItem",
                    "position": 5,
                    "name": "Memory Challenge",
                    "description": "Challenge your memory and reaction time with our cognitive tests",
                    "url": "https://testyourself.com/memory"
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
        <div className="mt-2 mb-4 sm:mb-8">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
            {filteredCategories.map((category) => (
              <Link
                key={category.id}
                href={category.path}
                className="group block"
              >
                <div className="bg-purple-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 pt-2.5 px-3 pb-3 h-full flex flex-col cursor-pointer group relative">
                  <div className="flex items-center mb-2 -ml-2">
                    <div className={`w-8 h-8 rounded-full ${category.color} flex items-center justify-center text-sm mr-1 group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-sage-800 group-hover:text-sage-600 transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                      {category.title}
                    </h3>
                  </div>
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-sage-100 text-sage-700 rounded-full whitespace-nowrap">
                      {category.category}
                    </span>
                  </div>
                  <p className="text-sage-600 mb-0 leading-relaxed text-xs line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredCategories.map((category) => (
              <Link
                key={category.id}
                href={category.path}
                className="group block"
              >
                <div className="bg-purple-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 py-2 px-3 cursor-pointer group relative">
                  {/* Mobile: Stacked layout */}
                  <div className="sm:hidden">
                    <div className="flex items-center mb-2">
                      <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full ${category.color} flex items-center justify-center text-sm sm:text-lg mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300`}>
                        {category.icon}
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-sage-800 group-hover:text-sage-600 transition-colors mb-1 whitespace-nowrap overflow-hidden text-ellipsis ml-1">
                          {category.title}
                        </h3>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-sage-100 text-sage-700 rounded-full whitespace-nowrap">
                          {category.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-sage-600 leading-relaxed text-xs">
                      {category.description}
                    </p>
                  </div>
                  
                  {/* Desktop: Side-by-side layout */}
                  <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-5 flex items-center">
                      <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full ${category.color} flex items-center justify-center text-sm sm:text-lg mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300`}>
                        {category.icon}
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-sage-800 group-hover:text-sage-600 transition-colors mb-1 whitespace-nowrap overflow-hidden text-ellipsis ml-1">
                          {category.title}
                        </h3>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-sage-100 text-sage-700 rounded-full whitespace-nowrap">
                          {category.category}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-7 text-right">
                      <p className="text-sage-600 leading-relaxed text-xs">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

          {/* Footer */}
          <div className="text-center mt-2">
            <p className="text-sage-500 text-xs sm:text-sm">
              Choose a test above to begin your journey of self-discovery
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer Component */}
      <div className="mt-2">
        <Footer />
      </div>
    </div>
    </>
  )
}