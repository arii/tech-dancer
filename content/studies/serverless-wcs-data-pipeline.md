---
title: "Automate WCS Event Data Scraping and Frontend Sync"
date: "2026-05-15"
author: "Ariel Anders"
category: "Data Engineering"
tags: ["Data", "Python", "React", "ETL"]
excerpt: "Build a serverless ETL pipeline using GitHub Actions to scrape WSDC data and sync it directly to your React frontend."
readTime: 10
status: "published"
---

Stop copying WSDC Database details by hand. You will build a serverless ETL pipeline using GitHub Actions to scrape event data and sync it directly to your React frontend.

## 1. Build the Scraper

Write a Python script that pulls the required WCS Events directly into a Parquet or JSON format.

```python
# etl/scraper.py
import json
import requests
from bs4 import BeautifulSoup

def scrape_wcs_events():
    url = "https://example-wsdc-data-source.com/events"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    events = []
    for row in soup.find_all('tr', class_='event-row'):
        events.append({
            "name": row.find('td', class_='name').text.strip(),
            "location": row.find('td', class_='location').text.strip(),
            "date": row.find('td', class_='date').text.strip()
        })

    with open('etl/data/event_queue.json', 'w') as f:
        json.dump(events, f)

if __name__ == "__main__":
    scrape_wcs_events()
```

## 2. Schedule with GitHub Actions

Run this scraper on a cron schedule to keep your data fresh without server costs.

```yaml
# .github/workflows/wcs_etl.yml
name: WCS Data ETL

on:
  schedule:
    - cron: '0 0 * * 1' # Run every Monday
  workflow_dispatch:

jobs:
  run-etl:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: pip install -r etl/requirements.txt

      - name: Run Scraper
        run: python etl/scraper.py

      - name: Commit and Push Data
        run: |
          git config --global user.name "Data-Bot"
          git config --global user.email "bot@boomtick.blog"
          git add etl/data/
          git commit -m "chore: Update WCS Event Data"
          git push
```

## 3. Sync Data to React

Consume the generated JSON file directly in your Vite application.

```typescript
// src/features/research/useWCSData.ts
import { useState, useEffect } from 'react';
import eventData from '../../../etl/data/event_queue.json';

export function useWCSData() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // In a production setup, fetch this from your public directory or CDN
    // Here we import directly from the ETL output
    setEvents(eventData);
  }, []);

  return { events };
}
```
