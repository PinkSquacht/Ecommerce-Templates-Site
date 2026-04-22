# Service Tiers Plan

## Goal
Package storefront templates by complexity level so delivery scope, pricing, and client expectations stay clear.

## Tier Structure

### 1) Basic
- Storefront pages
- Product listing and product detail
- Cart and checkout flow
- Contact page
- Basic analytics hooks

### 2) Basic + Admin Dashboard
- Everything in Basic
- Admin login
- Product CRUD
- Order list and status updates
- Customer summary view

### 3) Custom Basic
- Everything in Basic
- Custom homepage sections
- Custom brand system
- Custom content model
- 1-2 custom workflows

### 4) Custom Basic + Admin Dashboard
- Everything in Custom Basic
- Full admin scope
- Role-based access (owner/staff)
- Advanced reporting widgets
- Integration-ready settings panel

## Recommended Client-Facing Names
- Basic
- Basic + Admin
- Custom Storefront
- Custom Storefront + Admin

## Architecture Direction
- Keep one core engine
- Add plan tier as config: basic, basic_admin, custom_basic, custom_basic_admin
- Use feature flags to gate behavior:
  - hasAdmin
  - hasCustomSections
  - hasRoles
  - hasAdvancedReporting
- Keep theme separate from tier:
  - Theme examples: Tech, Decor, Fitness
  - Tier controls feature complexity

## Freelancer Positioning
- Sell outcomes and delivery speed
- Price by complexity, not by page count
- Keep add-ons explicit:
  - SEO pack
  - Email automation
  - Inventory integrations
  - Performance tuning

## Build Order
1. Implement tier config model
2. Gate admin routes/components with flags
3. Gate custom sections with flags
4. Add pricing and scope matrix to portfolio/gigs
5. Prepare proposal templates per tier

## Notes
This file is the source of truth for scope and packaging decisions during refactor and client onboarding.
