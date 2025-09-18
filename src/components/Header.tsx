'use client'

import { useRouter } from 'next/navigation'

interface HeaderProps {
  onLogoClick?: () => void
}

const Header = ({ onLogoClick }: HeaderProps) => {
  const router = useRouter()

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick()
    }
    router.push('/')
  }

  return (
    <div className="mb-4">
      <div className="w-full">
        {/* Header with Ads Left and Right */}
        <div className="w-full rounded-2xl shadow-lg bg-purple-100 px-6 py-1">
          {/* Logo Row with Ads */}
          <div className="flex items-center justify-between">
            {/* Left: Text Logo */}
            <div className="flex-shrink-0">
              <div 
                onClick={handleLogoClick}
                className="cursor-pointer pr-2 sm:pr-4">
                <h1 
                  className="font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl cursor-pointer transition-all duration-300"
                  style={{
                    background: 'linear-gradient(90deg, #059669 0%, #9333ea 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent',
                    display: 'inline-block'
                  }}
                >
                  TestYourself
                </h1>
                <div className="w-8 sm:w-10 md:w-12 lg:w-16 h-1 bg-gradient-to-r from-green-400 to-purple-400 rounded-full mt-1"></div>
              </div>
            </div>

            {/* Right: Ad Banner */}
            <div className="flex-shrink-0 max-w-full">
              {/* XL: 728x90 Leaderboard */}
              <div className="hidden xl:block">
                <div 
                  className="bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-600 text-sm"
                  style={{width: '728px', height: '90px'}}
                >
                  [728×90 Header Ad]
                </div>
              </div>
              
              {/* LG: 468x90 Banner */}
              <div className="hidden lg:block xl:hidden">
                <div 
                  className="bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-600 text-sm"
                  style={{width: '468px', height: '90px'}}
                >
                  [468×90 Header Ad]
                </div>
              </div>
              
              {/* MD: 320x90 Banner */}
              <div className="hidden md:block lg:hidden">
                <div 
                  className="bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-600 text-sm"
                  style={{width: '320px', height: '90px'}}
                >
                  [320×90 Header Ad]
                </div>
              </div>
              
              {/* SM: 300x90 Banner */}
              <div className="hidden sm:block md:hidden">
                <div 
                  className="bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-600 text-sm"
                  style={{width: '300px', height: '90px'}}
                >
                  [300×90 Header Ad]
                </div>
              </div>
              
              {/* Mobile: 250x90 Banner */}
              <div className="block sm:hidden">
                <div 
                  className="bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-600 text-sm"
                  style={{width: '250px', height: '90px'}}
                >
                  [250×90 Header Ad]
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
