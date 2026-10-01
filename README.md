# 📈 Market Intelligence Dashboard

A full-stack automated pricing and competitor intelligence tool. This project demonstrates an end-to-end data pipeline: extracting raw e-commerce data, processing it into a structured format, and visualizing the insights on a modern, responsive React dashboard. 

It was built to showcase the integration of backend data extraction with professional frontend analytics and UI/UX design.

## 🚀 Features
* **Automated Data Extraction:** A Python-based scraper that traverses target e-commerce catalogs to extract product titles, pricing, and stock status.
* **Interactive Analytics:** A dynamic React frontend that consumes the scraped JSON feed to render live charts and data tables.
* **KPI Tracking:** Automatically calculates and displays real-time metrics, including Average Market Price, Inventory Health percentages, and Peak Pricing.
* **Dark-Mode UI:** Polished, professional interface built with Tailwind CSS v4 and Framer Motion for smooth, executive-level data presentation.

## 🛠️ Architecture & Tech Stack

**Backend (Data Pipeline)**
* **Python 3:** Core logic and execution.
* **Requests & BeautifulSoup4:** For HTTP requests and HTML DOM parsing.
* **JSON:** Lightweight document structuring for data handoff.

**Frontend (Visualization)**
* **React & Vite:** Fast, modern component-based UI and build tooling.
* **Tailwind CSS v4:** Utility-first styling for the dark-mode aesthetic.
* **Recharts:** Industry-standard data visualization for the pricing bar charts.
* **Framer Motion & Lucide React:** Micro-interactions, animations, and iconography.

## ⚙️ Quick Start Guide

### 1. Run the Data Scraper
Navigate to the root directory and install the Python dependencies:
```bash
pip install requests beautifulsoup4 pandas