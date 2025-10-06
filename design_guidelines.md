# Design Guidelines: Aplikasi Laporan Keuangan

## Design Approach
**Selected Approach:** Design System (Material Design inspired with finance industry refinements)

**Rationale:** Financial applications require trust, clarity, and efficient data processing. The design prioritizes information hierarchy, data readability, and professional aesthetics over visual experimentation.

**Key Design Principles:**
- Data clarity above all - every design decision serves information comprehension
- Professional trustworthiness through consistent, refined visuals
- Efficient workflows with minimal cognitive load
- Clear visual hierarchy for financial data (numbers, categories, status)

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary):**
- Background: 220 15% 10% (Deep slate)
- Surface: 220 13% 15% (Elevated slate)
- Primary: 210 100% 60% (Trust blue)
- Success (Income): 142 70% 45% (Financial green)
- Danger (Expense): 0 72% 55% (Alert red)
- Warning: 38 92% 50% (Caution amber)
- Text Primary: 0 0% 98%
- Text Secondary: 0 0% 70%
- Border: 220 13% 25%

**Light Mode:**
- Background: 0 0% 100%
- Surface: 220 13% 97%
- Primary: 210 100% 50%
- Success: 142 70% 38%
- Danger: 0 72% 48%
- Text Primary: 220 15% 15%
- Text Secondary: 220 10% 40%
- Border: 220 13% 90%

### B. Typography

**Font Stack:** 'Inter' (primary), system-ui (fallback) - professional, highly legible for data

**Hierarchy:**
- Page Headers: text-3xl font-bold (financial overview titles)
- Section Headers: text-xl font-semibold (dashboard cards, report sections)
- Data Labels: text-sm font-medium uppercase tracking-wide (category labels, field names)
- Financial Numbers: text-2xl font-bold tabular-nums (amounts, totals)
- Body Text: text-base font-normal (descriptions, notes)
- Small Data: text-sm font-normal tabular-nums (table cells, secondary metrics)

Use `tabular-nums` for all numerical displays to maintain alignment.

### C. Layout System

**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16 (p-4, gap-6, mb-8, py-12, space-y-16)

**Grid Structure:**
- Dashboard: 12-column responsive grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Container: max-w-7xl mx-auto px-4
- Card padding: p-6 (mobile) to p-8 (desktop)
- Section spacing: space-y-8 to space-y-12

### D. Component Library

**Dashboard Cards:**
- Elevated surface with subtle border
- Icon + Label + Large Number layout
- Color-coded based on metric type (green income, red expense, blue balance)
- Percentage change indicators with arrows

**Data Tables:**
- Striped rows for readability (alternate row background)
- Sticky header with sort indicators
- Action column (right-aligned) with edit/delete icons
- Responsive: cards on mobile, table on desktop
- Hover state: subtle background change

**Forms:**
- Grouped input fields with clear labels above
- Input style: border-2 with focus ring (primary color)
- Radio/Select for categories with clear visual selection
- Date picker with calendar icon
- Amount input with currency symbol prefix
- Submit button: full-width on mobile, auto-width on desktop

**Charts & Visualizations:**
- Use Chart.js or Recharts library
- Bar charts: income vs expense comparison
- Line charts: trend over time
- Consistent color mapping (green=income, red=expense)
- Grid lines: subtle, dotted
- Tooltips: show exact values on hover
- Legend: positioned top-right

**Filter Controls:**
- Inline filter bar above tables
- Date range picker (from/to)
- Category dropdown with "All" option
- Clear filters button
- Filter chips showing active filters

**Navigation:**
- Side navigation (desktop) with dashboard, transactions, reports sections
- Bottom navigation (mobile) with icons + labels
- Active state: primary color with subtle background

**Summary Metrics:**
- Large number display with label below
- Trend indicator (↑↓) with percentage change
- Icon representing metric type
- Bordered card with hover elevation effect

### E. Interaction & States

**Animations:** Minimal, purposeful only
- Page transitions: none (instant load for data focus)
- Card hover: subtle elevation increase (shadow-md to shadow-lg)
- Button states: background color change only
- Chart animations: smooth data entry (0.3s ease)
- Form validation: instant inline feedback

**Loading States:**
- Skeleton screens for tables and cards
- Spinner for form submissions
- Shimmer effect for data loading

**Empty States:**
- Centered illustration + helpful message
- "Add Transaction" CTA button
- Light background with icon

## Images

**No hero images required** - This is a data-focused application where dashboard metrics and visualizations take priority.

**Icons only:**
- Category icons (food, transport, salary, etc.) - use Heroicons outlined
- Metric icons (wallet, trending-up, trending-down) - Heroicons outlined
- Action icons (pencil, trash, filter) - Heroicons outlined
- Size: w-5 h-5 for inline, w-6 h-6 for cards, w-8 h-8 for empty states

## Accessibility & Quality

- High contrast ratios (WCAG AA minimum)
- All interactive elements keyboard accessible
- ARIA labels on icon-only buttons
- Error messages with clear, actionable guidance
- Focus indicators on all interactive elements
- Consistent dark mode across inputs and text fields