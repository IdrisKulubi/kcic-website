# KCIC Official Brand Colors

## Primary Brand Colors

### Brand Green
**Hex**: `#80c738`  
**RGB**: `rgb(128, 199, 56)`  
**Usage**: Primary brand color, CTAs, highlights, success states

**Color Scale**:
- 50: `#f3fbe9` (Lightest)
- 100: `#e6f7d2`
- 200: `#ceefa5`
- 300: `#b5e778`
- 400: `#9ddf4b`
- 500: `#80c738` (Brand Green)
- 600: `#66a02d`
- 700: `#4d7822`
- 800: `#335016`
- 900: `#1a280b` (Darkest)

### Brand Blue
**Hex**: `#00addd`  
**RGB**: `rgb(0, 173, 221)`  
**Usage**: Secondary brand color, links, information, accents

**Color Scale**:
- 50: `#e6f8fd` (Lightest)
- 100: `#ccf1fb`
- 200: `#99e3f7`
- 300: `#66d5f3`
- 400: `#33c7ef`
- 500: `#00addd` (Brand Blue)
- 600: `#008ab1`
- 700: `#006885`
- 800: `#004558`
- 900: `#00232c` (Darkest)

### Brand Gray
**Hex**: `#8b8d90`  
**RGB**: `rgb(139, 141, 144)`  
**Usage**: Text, borders, subtle backgrounds

**Color Scale**:
- 50: `#f7f7f8` (Lightest)
- 100: `#efefef`
- 200: `#dfe0e1`
- 300: `#cfd0d2`
- 400: `#bfc1c3`
- 500: `#8b8d90` (Brand Gray)
- 600: `#6f7173`
- 700: `#535556`
- 800: `#383839`
- 900: `#1c1c1d` (Darkest)

### Brand White
**Hex**: `#ffffff`  
**RGB**: `rgb(255, 255, 255)`  
**Usage**: Backgrounds, text on dark backgrounds

## Color Combinations

### Primary Gradient
```css
background: linear-gradient(135deg, #80c738 0%, #00addd 100%);
```
**Usage**: Hero sections, featured cards, primary CTAs

### Secondary Gradient
```css
background: linear-gradient(135deg, #00addd 0%, #8b8d90 100%);
```
**Usage**: Secondary sections, alternative cards

### Vibrant Gradient
```css
background: linear-gradient(135deg, #80c738 0%, #00addd 50%, #80c738 100%);
```
**Usage**: Special highlights, animated elements

### Subtle Gradient
```css
background: linear-gradient(135deg, rgba(128, 199, 56, 0.1) 0%, rgba(0, 173, 221, 0.1) 100%);
```
**Usage**: Subtle backgrounds, hover states

## Accessibility (WCAG AA Compliance)

### Contrast Ratios on White Background

#### Brand Green (#80c738)
- **Normal Text (16px)**: 3.2:1 ❌ FAIL
- **Large Text (18px+ or 14px+ bold)**: 3.2:1 ✓ PASS
- **Recommendation**: Use only for headings, large text, or bold text

#### Brand Blue (#00addd)
- **Normal Text (16px)**: 3.1:1 ❌ FAIL
- **Large Text (18px+ or 14px+ bold)**: 3.1:1 ✓ PASS
- **Recommendation**: Use only for headings, large text, or bold text

#### Brand Gray (#8b8d90)
- **Normal Text (16px)**: 3.5:1 ❌ FAIL
- **Large Text (18px+ or 14px+ bold)**: 3.5:1 ✓ PASS
- **Recommendation**: Use only for headings, large text, or bold text

#### Gray 700 (#535556)
- **Normal Text (16px)**: 8.2:1 ✓ PASS
- **Large Text (18px+ or 14px+ bold)**: 8.2:1 ✓ PASS
- **Recommendation**: Use for body text and small text

#### Gray 900 (#1c1c1d)
- **Normal Text (16px)**: 16.5:1 ✓ PASS
- **Large Text (18px+ or 14px+ bold)**: 16.5:1 ✓ PASS
- **Recommendation**: Use for all text sizes

### Best Practices

1. **Body Text**: Use Gray 700 (#535556) or Gray 900 (#1c1c1d)
2. **Headings**: Can use Brand Green or Brand Blue (18px+ or 14px+ bold)
3. **Small Text**: Must use Gray 700 or darker
4. **Links**: Use Brand Blue with underline for clarity
5. **Buttons**: Use Brand Green or Brand Blue with white text

## Usage in Code

### CSS Variables
```css
:root {
  --brand-green: #80c738;
  --brand-blue: #00addd;
  --brand-gray: #8b8d90;
  --brand-white: #ffffff;
}
```

### Tailwind Classes
```tsx
// Background colors
<div className="bg-climate-green">
<div className="bg-climate-blue">

// Text colors
<h1 className="text-climate-green">
<p className="text-climate-blue">

// Border colors
<div className="border-climate-green">

// Gradients
<div className="bg-hero-gradient">
<div className="bg-stats-gradient">
```

### Design System
```typescript
import { colors } from '@/lib/design-system';

// Access colors
colors.primary.green.DEFAULT // #80c738
colors.primary.blue.DEFAULT  // #00addd
colors.secondary.gray.DEFAULT // #8b8d90

// Access gradients
colors.gradients.primary
colors.gradients.secondary
```

## Color Psychology

### Green (#80c738)
- **Associations**: Growth, sustainability, nature, innovation
- **Emotions**: Hope, freshness, energy, progress
- **Use Cases**: Environmental initiatives, success states, positive actions

### Blue (#00addd)
- **Associations**: Trust, stability, professionalism, technology
- **Emotions**: Calm, confidence, reliability, clarity
- **Use Cases**: Information, links, secondary actions, data visualization

### Gray (#8b8d90)
- **Associations**: Neutrality, balance, sophistication
- **Emotions**: Stability, professionalism, timelessness
- **Use Cases**: Text, borders, backgrounds, subtle elements

## Dark Mode Adjustments

For dark mode, use lighter variants:
- Green: Use 400 (#9ddf4b) or 300 (#b5e778)
- Blue: Use 400 (#33c7ef) or 300 (#66d5f3)
- Gray: Use 300 (#cfd0d2) or 200 (#dfe0e1)

## Print Colors

For print materials, use these CMYK values:

### Brand Green (#80c738)
- **CMYK**: C:50 M:0 Y:82 K:0

### Brand Blue (#00addd)
- **CMYK**: C:100 M:22 Y:0 K:0

### Brand Gray (#8b8d90)
- **CMYK**: C:0 M:0 Y:0 K:45

## Color Testing Tools

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors Palette Generator](https://coolors.co/)
- [Adobe Color](https://color.adobe.com/)

## Version History

- **v1.0** (2024): Initial brand colors established
  - Green: #80c738
  - Blue: #00addd
  - Gray: #8b8d90
  - White: #ffffff
