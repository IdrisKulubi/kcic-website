# KCIC Color Usage Guide

## Quick Reference

### When to Use Each Color

| Color | Use For | Don't Use For | Accessibility |
|-------|---------|---------------|---------------|
| **Green (#80c738)** | Headings, CTAs, success states, highlights | Body text, small text | 18px+ or 14px+ bold only |
| **Blue (#00addd)** | Links, secondary CTAs, information | Body text, small text | 18px+ or 14px+ bold only |
| **Yellow** | Accent highlights, statistics | Any text | Never use for text |
| **Gray 700** | Body text, descriptions | - | ✅ Safe for all text |
| **Gray 900** | Primary text, important content | - | ✅ Safe for all text |

## Tailwind Class Reference

### Text Colors

```tsx
// Brand colors (headings only)
<h1 className="text-climate-green">Heading</h1>
<h2 className="text-climate-blue">Subheading</h2>

// Body text (always use gray)
<p className="text-gray-700">Body text</p>
<p className="text-gray-900">Important text</p>

// Muted text
<span className="text-muted-foreground">Secondary info</span>
```

### Background Colors

```tsx
// Solid backgrounds
<div className="bg-climate-green">
<div className="bg-climate-blue">
<div className="bg-climate-yellow">

// With opacity
<div className="bg-climate-green/10">  // 10% opacity
<div className="bg-climate-blue/20">   // 20% opacity

// Gradients
<div className="bg-hero-gradient">
<div className="bg-stats-gradient">
<div className="bg-cta-gradient">
```

### Border Colors

```tsx
<div className="border border-climate-green">
<div className="border-2 border-climate-blue">
<div className="border-t border-climate-green/20">
```

## Common Patterns

### 1. Hero Section

```tsx
<section className="relative min-h-screen">
  {/* Background gradient */}
  <div className="absolute inset-0 bg-hero-gradient opacity-10" />
  
  {/* Content */}
  <div className="relative z-10">
    <h1 className="text-display-xl text-white">
      Empowering Climate Innovation
    </h1>
    <p className="text-body-lg text-white/90">
      Supporting sustainable enterprises
    </p>
    
    {/* Primary CTA */}
    <button className="bg-climate-green hover:bg-climate-green-dark text-white">
      Get Started
    </button>
    
    {/* Secondary CTA */}
    <button className="border-2 border-white text-white hover:bg-white hover:text-black">
      Learn More
    </button>
  </div>
</section>
```

### 2. Content Section

```tsx
<section className="py-20">
  {/* Section heading */}
  <h2 className="text-h1 text-climate-green mb-4">
    Our Impact
  </h2>
  
  {/* Accent line */}
  <div className="w-24 h-1 bg-climate-green rounded-full mb-8" />
  
  {/* Body text */}
  <p className="text-body-lg text-gray-700 leading-relaxed">
    We support climate entrepreneurs across Africa...
  </p>
</section>
```

### 3. Statistics Display

```tsx
<div className="grid grid-cols-4 gap-8">
  {stats.map((stat) => (
    <div key={stat.id} className="text-center">
      {/* Large number in yellow */}
      <div className="text-stat-value text-climate-yellow font-bold">
        {stat.value}
      </div>
      
      {/* Label in gray */}
      <div className="text-stat-label text-gray-700">
        {stat.label}
      </div>
    </div>
  ))}
</div>
```

### 4. Card Component

```tsx
<div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
  {/* Card heading */}
  <h3 className="text-h4 text-climate-green mb-3">
    Renewable Energy
  </h3>
  
  {/* Card content */}
  <p className="text-body-base text-gray-700">
    Supporting solar, wind, and clean energy solutions
  </p>
  
  {/* Card action */}
  <a href="#" className="text-climate-blue hover:underline">
    Learn more →
  </a>
</div>
```

### 5. Button Variants

```tsx
// Primary button
<button className="bg-climate-green hover:bg-climate-green-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors">
  Primary Action
</button>

// Secondary button
<button className="border-2 border-climate-green text-climate-green hover:bg-climate-green hover:text-white px-6 py-3 rounded-lg font-semibold transition-all">
  Secondary Action
</button>

// Outline button
<button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg transition-colors">
  Tertiary Action
</button>

// Link button
<button className="text-climate-blue hover:underline font-medium">
  Text Link
</button>
```

### 6. Glass Morphism Effect

```tsx
<div className="glass rounded-2xl p-8">
  {/* Content with glass effect */}
  <h3 className="text-h3 text-climate-green">
    Innovation Hub
  </h3>
  <p className="text-body-base text-gray-700">
    Fostering climate solutions
  </p>
</div>

// Or use stronger glass effect
<div className="glass-strong rounded-2xl p-8">
  {/* More prominent glass effect */}
</div>
```

### 7. Gradient Text

```tsx
// Climate gradient text
<h1 className="text-gradient-climate text-display-xl font-bold">
  Sustainable Future
</h1>

// Warm gradient text
<h2 className="text-gradient-warm text-h1">
  Growing Together
</h2>
```

## Dark Mode Support

All color classes automatically adapt to dark mode:

```tsx
// This works in both light and dark mode
<div className="bg-white dark:bg-gray-900">
  <h2 className="text-climate-green">
    {/* Green is #80c738 in light mode, #9ddf4b in dark mode */}
    Heading
  </h2>
  <p className="text-gray-700 dark:text-gray-300">
    {/* Automatically adjusts for dark mode */}
    Body text
  </p>
</div>
```

## Accessibility Guidelines

### ✅ DO

```tsx
// Use gray for body text
<p className="text-gray-700">Body text with good contrast</p>

// Use brand colors for large text
<h1 className="text-climate-green text-4xl">Large Heading</h1>

// Use white text on brand color backgrounds
<button className="bg-climate-green text-white">Button</button>

// Provide focus indicators
<button className="focus:ring-2 focus:ring-climate-green">
  Accessible Button
</button>
```

### ❌ DON'T

```tsx
// Don't use brand colors for body text
<p className="text-climate-green">Body text</p> // ❌ Poor contrast

// Don't use yellow for text
<span className="text-climate-yellow">Text</span> // ❌ Very poor contrast

// Don't use brand colors for small text
<small className="text-climate-blue">Small text</small> // ❌ Fails WCAG

// Don't forget focus indicators
<button className="bg-climate-green">Button</button> // ❌ No focus state
```

## Testing Your Colors

### 1. Contrast Checker

Use WebAIM's contrast checker: https://webaim.org/resources/contrastchecker/

**Minimum ratios**:
- Normal text (16px): 4.5:1
- Large text (18px+ or 14px+ bold): 3:1
- UI components: 3:1

### 2. Browser DevTools

```javascript
// Check computed color in console
getComputedStyle(element).color
getComputedStyle(element).backgroundColor
```

### 3. Visual Testing

- Test in light mode
- Test in dark mode
- Test with high contrast mode
- Test at different zoom levels (200%)

## Migration Guide

### From Style Objects to Tailwind

```tsx
// ❌ Before (style objects)
<div style={{ 
  color: colors.primary.green.DEFAULT,
  backgroundColor: colors.primary.blue[50]
}}>
  Content
</div>

// ✅ After (Tailwind classes)
<div className="text-climate-green bg-climate-blue/10">
  Content
</div>
```

### From Old Color Names

```tsx
// ❌ Before (old naming)
colors.primary.cyan.DEFAULT

// ✅ After (new naming)
colors.primary.blue.DEFAULT
// Or better yet, use Tailwind:
className="text-climate-blue"
```

## Color Psychology

### Green (#80c738)
- **Meaning**: Growth, sustainability, nature, success
- **Use for**: Environmental content, success states, positive actions
- **Emotion**: Hope, freshness, progress

### Blue (#00addd)
- **Meaning**: Trust, innovation, technology, stability
- **Use for**: Information, links, secondary actions
- **Emotion**: Calm, confidence, reliability

### Yellow
- **Meaning**: Energy, optimism, attention
- **Use for**: Highlights, statistics, accents (not text)
- **Emotion**: Warmth, enthusiasm, caution

## Common Mistakes to Avoid

1. **Using brand colors for body text**
   - Brand colors don't meet contrast requirements for normal text
   - Always use gray for body text

2. **Forgetting dark mode**
   - Test all color combinations in dark mode
   - Use Tailwind's dark: prefix when needed

3. **Inconsistent color usage**
   - Use the same color for the same purpose throughout
   - Follow the established patterns

4. **Poor contrast**
   - Always check contrast ratios
   - Test with actual users if possible

5. **Overusing colors**
   - Less is more
   - Use colors purposefully, not decoratively

## Quick Checklist

Before committing code with colors:

- [ ] Used gray (700/900) for body text
- [ ] Used brand colors only for headings/large text
- [ ] Tested in light and dark mode
- [ ] Checked contrast ratios
- [ ] Used Tailwind classes (not style objects)
- [ ] Added focus indicators
- [ ] Tested with keyboard navigation
- [ ] Verified responsive behavior

## Resources

- [BRAND-COLORS.md](./BRAND-COLORS.md) - Official brand colors
- [COLOR-AUDIT-REPORT.md](./COLOR-AUDIT-REPORT.md) - Detailed audit
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors)

## Support

If you have questions about color usage:
1. Check this guide first
2. Review the audit report
3. Test with contrast checker
4. Ask the design team

---

**Last Updated**: November 14, 2025  
**Version**: 1.0
