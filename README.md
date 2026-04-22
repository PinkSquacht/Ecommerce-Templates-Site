# SquachtTechSolutions

## Overview
This repository is a template-driven ecommerce web app built to support freelancer and agency workflows. Instead of building each client storefront from scratch, the project provides one reusable codebase that can be adapted through template configuration, service tiers, and layout presets.

## Purpose
The purpose of this project is to accelerate client delivery while still showing strong full-stack engineering practices. It is designed to:

- Reuse a shared commerce foundation across multiple storefront styles.
- Support different service offerings (basic, admin-enabled, and custom tiers).
- Separate design and layout decisions from core business logic.
- Allow visual handoff workflows through Bootstrap Studio while keeping React as the production app.

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- React Bootstrap + Bootstrap 5

UI note: The project uses a Bootstrap-first UI stack (Material UI has been removed).

### Data and Services
- Firebase Authentication
- Firestore
- Fake Store API (catalog data source)

### Tooling
- ESLint
- TypeScript compiler
- Vite build pipeline

## Repository Focus
This codebase focuses on scalable storefront architecture: configurable templates, tier-aware features, and design-system flexibility for rapid client customization.
