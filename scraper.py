import json
import requests
from bs4 import BeautifulSoup
import pandas as pd

def scrape_competitor_data():
    url = "https://books.toscrape.com/catalogue/category/books_1/index.html"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    
    print(f"[*] Fetching data from target URL...")
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print(f"[!] Error: Failed to retrieve page (Status code: {response.status_code})")
        return
    
    soup = BeautifulSoup(response.text, 'html.parser')
    products = []
    
    # Find all product pods on the page
    items = soup.find_all('article', class_='product_pod')
    
    for item in items:
        # Extract Title
        title = item.find('h3').find('a')['title']
        
        # Extract Price (and clean the currency symbol)
        price_raw = item.find('p', class_='price_color').text
        price_numeric = float(price_raw.replace('£', '').replace('Â', '').strip())
        
        # Extract Availability
        availability = item.find('p', class_='instock availability').text.strip()
        
        # Extract Rating
        rating_class = item.find('p', class_='star-rating')['class'][1]
        
        products.append({
            "title": title,
            "price_gbp": price_numeric,
            "stock_status": availability,
            "rating": rating_class
        })
    
    # Save to JSON for the React dashboard
    output_file = "competitor_data.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=4)
        
    print(f"[+] Successfully scraped {len(products)} products and saved to {output_file}!")

if __name__ == "__main__":
    scrape_competitor_data()