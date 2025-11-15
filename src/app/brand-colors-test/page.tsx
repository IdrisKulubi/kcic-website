/**
 * Brand Colors Visual Test Page
 * 
 * Visual verification of official KCIC brand colors
 * Access at: /brand-colors-test
 */

export default function BrandColorsTestPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-display-xl font-bold mb-4 text-gray-900">
            KCIC Official Brand Colors
          </h1>
          <p className="text-body-lg text-gray-600">
            Visual reference for the official KCIC brand color palette
          </p>
        </div>

        {/* Primary Colors */}
        <section className="mb-16">
          <h2 className="text-h2 font-bold mb-8 text-gray-900">Primary Brand Colors</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Green */}
            <div className="space-y-4">
              <div className="h-48 rounded-lg shadow-lg" style={{ backgroundColor: '#80c738' }}>
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-h3 font-bold mb-2">Brand Green</div>
                    <div className="text-body-base font-mono">#80c738</div>
                    <div className="text-body-sm">RGB(128, 199, 56)</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#f3fbe9' }}>
                  <span className="text-body-sm font-mono">50</span>
                  <span className="text-body-sm">#f3fbe9</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#e6f7d2' }}>
                  <span className="text-body-sm font-mono">100</span>
                  <span className="text-body-sm">#e6f7d2</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#ceefa5' }}>
                  <span className="text-body-sm font-mono">200</span>
                  <span className="text-body-sm">#ceefa5</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#b5e778' }}>
                  <span className="text-body-sm font-mono">300</span>
                  <span className="text-body-sm">#b5e778</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#9ddf4b' }}>
                  <span className="text-body-sm font-mono">400</span>
                  <span className="text-body-sm">#9ddf4b</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded text-white" style={{ backgroundColor: '#80c738' }}>
                  <span className="text-body-sm font-mono font-bold">500</span>
                  <span className="text-body-sm font-bold">#80c738</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded text-white" style={{ backgroundColor: '#66a02d' }}>
                  <span className="text-body-sm font-mono">600</span>
                  <span className="text-body-sm">#66a02d</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded text-white" style={{ backgroundColor: '#4d7822' }}>
                  <span className="text-body-sm font-mono">700</span>
                  <span className="text-body-sm">#4d7822</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded text-white" style={{ backgroundColor: '#335016' }}>
                  <span className="text-body-sm font-mono">800</span>
                  <span className="text-body-sm">#335016</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded text-white" style={{ backgroundColor: '#1a280b' }}>
                  <span className="text-body-sm font-mono">900</span>
                  <span className="text-body-sm">#1a280b</span>
                </div>
              </div>
            </div>

            {/* Brand Blue */}
            <div className="space-y-4">
              <div className="h-48 rounded-lg shadow-lg" style={{ backgroundColor: '#00addd' }}>
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-h3 font-bold mb-2">Brand Blue</div>
                    <div className="text-body-base font-mono">#00addd</div>
                    <div className="text-body-sm">RGB(0, 173, 221)</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#e6f8fd' }}>
                  <span className="text-body-sm font-mono">50</span>
                  <span className="text-body-sm">#e6f8fd</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#ccf1fb' }}>
                  <span className="text-body-sm font-mono">100</span>
                  <span className="text-body-sm">#ccf1fb</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#99e3f7' }}>
                  <span className="text-body-sm font-mono">200</span>
                  <span className="text-body-sm">#99e3f7</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#66d5f3' }}>
                  <span className="text-body-sm font-mono">300</span>
                  <span className="text-body-sm">#66d5f3</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#33c7ef' }}>
                  <span className="text-body-sm font-mono">400</span>
                  <span className="text-body-sm">#33c7ef</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded text-white" style={{ backgroundColor: '#00addd' }}>
                  <span className="text-body-sm font-mono font-bold">500</span>
                  <span className="text-body-sm font-bold">#00addd</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded text-white" style={{ backgroundColor: '#008ab1' }}>
                  <span className="text-body-sm font-mono">600</span>
                  <span className="text-body-sm">#008ab1</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded text-white" style={{ backgroundColor: '#006885' }}>
                  <span className="text-body-sm font-mono">700</span>
                  <span className="text-body-sm">#006885</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded text-white" style={{ backgroundColor: '#004558' }}>
                  <span className="text-body-sm font-mono">800</span>
                  <span className="text-body-sm">#004558</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded text-white" style={{ backgroundColor: '#00232c' }}>
                  <span className="text-body-sm font-mono">900</span>
                  <span className="text-body-sm">#00232c</span>
                </div>
              </div>
            </div>

            {/* Brand Gray */}
            <div className="space-y-4">
              <div className="h-48 rounded-lg shadow-lg" style={{ backgroundColor: '#8b8d90' }}>
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-h3 font-bold mb-2">Brand Gray</div>
                    <div className="text-body-base font-mono">#8b8d90</div>
                    <div className="text-body-sm">RGB(139, 141, 144)</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#f7f7f8' }}>
                  <span className="text-body-sm font-mono">50</span>
                  <span className="text-body-sm">#f7f7f8</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#efefef' }}>
                  <span className="text-body-sm font-mono">100</span>
                  <span className="text-body-sm">#efefef</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#dfe0e1' }}>
                  <span className="text-body-sm font-mono">200</span>
                  <span className="text-body-sm">#dfe0e1</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#cfd0d2' }}>
                  <span className="text-body-sm font-mono">300</span>
                  <span className="text-body-sm">#cfd0d2</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#bfc1c3' }}>
                  <span className="text-body-sm font-mono">400</span>
                  <span className="text-body-sm">#bfc1c3</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded text-white" style={{ backgroundColor: '#8b8d90' }}>
                  <span className="text-body-sm font-mono font-bold">500</span>
                  <span className="text-body-sm font-bold">#8b8d90</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded text-white" style={{ backgroundColor: '#6f7173' }}>
                  <span className="text-body-sm font-mono">600</span>
                  <span className="text-body-sm">#6f7173</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded text-white" style={{ backgroundColor: '#535556' }}>
                  <span className="text-body-sm font-mono">700</span>
                  <span className="text-body-sm">#535556</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded text-white" style={{ backgroundColor: '#383839' }}>
                  <span className="text-body-sm font-mono">800</span>
                  <span className="text-body-sm">#383839</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded text-white" style={{ backgroundColor: '#1c1c1d' }}>
                  <span className="text-body-sm font-mono">900</span>
                  <span className="text-body-sm">#1c1c1d</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gradients */}
        <section className="mb-16">
          <h2 className="text-h2 font-bold mb-8 text-gray-900">Brand Gradients</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-48 rounded-lg shadow-lg flex items-center justify-center text-white" 
                 style={{ background: 'linear-gradient(135deg, #80c738 0%, #00addd 100%)' }}>
              <div className="text-center">
                <div className="text-h4 font-bold mb-2">Primary Gradient</div>
                <div className="text-body-sm font-mono">Green → Blue</div>
              </div>
            </div>
            
            <div className="h-48 rounded-lg shadow-lg flex items-center justify-center text-white" 
                 style={{ background: 'linear-gradient(135deg, #00addd 0%, #8b8d90 100%)' }}>
              <div className="text-center">
                <div className="text-h4 font-bold mb-2">Secondary Gradient</div>
                <div className="text-body-sm font-mono">Blue → Gray</div>
              </div>
            </div>
            
            <div className="h-48 rounded-lg shadow-lg flex items-center justify-center text-white" 
                 style={{ background: 'linear-gradient(135deg, #80c738 0%, #00addd 50%, #80c738 100%)' }}>
              <div className="text-center">
                <div className="text-h4 font-bold mb-2">Vibrant Gradient</div>
                <div className="text-body-sm font-mono">Green → Blue → Green</div>
              </div>
            </div>
            
            <div className="h-48 rounded-lg shadow-lg flex items-center justify-center border-2 border-gray-200" 
                 style={{ background: 'linear-gradient(135deg, rgba(128, 199, 56, 0.1) 0%, rgba(0, 173, 221, 0.1) 100%)' }}>
              <div className="text-center text-gray-900">
                <div className="text-h4 font-bold mb-2">Subtle Gradient</div>
                <div className="text-body-sm font-mono">Green 10% → Blue 10%</div>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="mb-16">
          <h2 className="text-h2 font-bold mb-8 text-gray-900">Usage Examples</h2>
          
          <div className="space-y-8">
            {/* Buttons */}
            <div>
              <h3 className="text-h4 font-semibold mb-4 text-gray-900">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90" 
                        style={{ backgroundColor: '#80c738' }}>
                  Primary Button
                </button>
                <button className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90" 
                        style={{ backgroundColor: '#00addd' }}>
                  Secondary Button
                </button>
                <button className="px-6 py-3 rounded-lg font-semibold transition-all hover:bg-gray-50" 
                        style={{ border: '2px solid #80c738', color: '#80c738' }}>
                  Outline Button
                </button>
              </div>
            </div>

            {/* Text Colors */}
            <div>
              <h3 className="text-h4 font-semibold mb-4 text-gray-900">Text Colors</h3>
              <div className="space-y-2">
                <p className="text-h3 font-bold" style={{ color: '#80c738' }}>
                  Brand Green Heading (18px+)
                </p>
                <p className="text-h3 font-bold" style={{ color: '#00addd' }}>
                  Brand Blue Heading (18px+)
                </p>
                <p className="text-body-base" style={{ color: '#535556' }}>
                  Gray 700 Body Text (All sizes) - Recommended for body text
                </p>
                <p className="text-body-base" style={{ color: '#1c1c1d' }}>
                  Gray 900 Body Text (All sizes) - Highest contrast
                </p>
              </div>
            </div>

            {/* Cards */}
            <div>
              <h3 className="text-h4 font-semibold mb-4 text-gray-900">Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#f3fbe9' }}>
                  <h4 className="text-h5 font-bold mb-2" style={{ color: '#80c738' }}>Green Card</h4>
                  <p className="text-body-sm text-gray-700">Subtle green background with brand green heading</p>
                </div>
                <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#e6f8fd' }}>
                  <h4 className="text-h5 font-bold mb-2" style={{ color: '#00addd' }}>Blue Card</h4>
                  <p className="text-body-sm text-gray-700">Subtle blue background with brand blue heading</p>
                </div>
                <div className="p-6 rounded-lg shadow-lg bg-white border-2" style={{ borderColor: '#80c738' }}>
                  <h4 className="text-h5 font-bold mb-2" style={{ color: '#80c738' }}>Bordered Card</h4>
                  <p className="text-body-sm text-gray-700">White background with brand green border</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t-2 border-gray-200 text-center">
          <p className="text-body-sm text-gray-500">
            Official KCIC Brand Colors v1.0
          </p>
        </div>
      </div>
    </div>
  );
}
