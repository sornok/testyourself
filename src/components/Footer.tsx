const Footer = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mb-2">
      <div className="max-w-6xl mx-auto">
        <footer className="w-full rounded-2xl shadow-lg bg-purple-100" style={{height: '72px', padding: '6px 3px'}}>
          {/* 2-Column Layout */}
          <div className="flex items-center h-full gap-3">
            {/* Left Column: Ad Banner - Takes remaining space */}
            <div className="flex-1 flex justify-start items-center px-3 min-w-0">
              {/* Responsive Ad Banners - Exact Google AdSense dimensions (max 60px height) */}
              <div className="flex justify-start">
                {/* XL: 728x60 Banner */}
                <div className="hidden xl:block">
                  <div 
                    className="bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-600 text-sm"
                    style={{width: '728px', height: '60px'}}
                  >
                    [728×60 Banner]
                  </div>
                </div>
                
                {/* LG: 468x60 Banner */}
                <div className="hidden lg:block xl:hidden">
                  <div 
                    className="bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-600 text-sm"
                    style={{width: '468px', height: '60px'}}
                  >
                    [468×60 Banner]
                  </div>
                </div>
                
                {/* MD: 320x50 Mobile Banner */}
                <div className="hidden md:block lg:hidden">
                  <div 
                    className="bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-600 text-sm"
                    style={{width: '320px', height: '50px'}}
                  >
                    [320×50 Mobile Banner]
                  </div>
                </div>
                
                {/* SM: 250x50 Mobile Banner */}
                <div className="hidden sm:block md:hidden">
                  <div 
                    className="bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-600 text-sm"
                    style={{width: '250px', height: '50px'}}
                  >
                    [250×50 Mobile Banner]
                  </div>
                </div>
                
                {/* Mobile: 250x50 Mobile Banner */}
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
            
            {/* Right Column: Copyright with Gradient - Responsive Font Size */}
            <div className="flex-shrink-0 pr-3">
              <div 
                className="font-bold text-lg md:text-lg sm:text-base text-sm whitespace-nowrap"
                style={{
                  background: 'linear-gradient(90deg, #059669 0%, #9333ea 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  display: 'inline-block'
                }}
              >
                TestYourself © 2025
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Footer
