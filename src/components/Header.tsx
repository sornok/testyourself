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
    <div className="mb-2">
      <div className="w-full">
        {/* Header with Fixed Height */}
        <div className="w-full rounded-2xl shadow-lg bg-purple-100 px-6 py-1" style={{height: '102px'}}>
            {/* Logo Row with Ads */}
            <div className="flex items-center justify-between h-full gap-3">
              {/* Left: Text Logo */}
              <div className="flex-shrink-0">
                <div 
                  onClick={handleLogoClick}
                  className="cursor-pointer">
                  <h1 
                    className="font-bold text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl cursor-pointer transition-all duration-300"
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

              {/* Right: Ad Banner - Optimized Google AdSense Sizes */}
              <div className="flex-shrink-0">
                {/* XL: 728x90 Leaderboard - Maximum Width */}
                <div className="hidden xl:block">
                  <div 
                    className="bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-600 text-sm"
                    style={{width: '728px', height: '90px'}}
                  >
                    [728×90 Leaderboard]
                  </div>
                </div>
                
                {/* LG: 468x60 Banner - Optimal for LG */}
                <div className="hidden lg:block xl:hidden">
                  <div 
                    className="bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-600 text-sm"
                    style={{width: '468px', height: '60px'}}
                  >
                    [468×60 Banner]
                  </div>
                </div>
                
                {/* MD: 468x60 Banner - Can fit larger */}
                <div className="hidden md:block lg:hidden">
                  <div 
                    className="bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-600 text-sm"
                    style={{width: '468px', height: '60px'}}
                  >
                    [468×60 Banner]
                  </div>
                </div>
                
                {/* SM: 320x50 Mobile Banner - Optimal for SM */}
                <div className="hidden sm:block md:hidden">
                  <div 
                    className="bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-600 text-sm"
                    style={{width: '320px', height: '50px'}}
                  >
                    [320×50 Mobile Banner]
                  </div>
                </div>
                
                {/* Mobile: 250x50 Mobile Banner - Maximum for mobile */}
                <div className="block sm:hidden">
                  <div 
                    className="bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-600 text-sm"
                    style={{width: '250px', height: '50px'}}
                  >
                    [250×50 Mobile Banner]
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