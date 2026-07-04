from selenium import webdriver
from selenium.webdriver.common.by import By
import pandas as pd
import time

driver = webdriver.Chrome()

products = [
    (
        "iPhone 15",
        "https://www.flipkart.com/apple-iphone-15-black-128-gb/product-reviews/itm6ac6485515ae4?pid=MOBGTAGPTB3VS24W"
    ),

    (
        "Samsung S24",
        "https://www.flipkart.com/samsung-galaxy-s24-5g-snapdragon-amber-yellow-128-gb/product-reviews/itmd4baa945a78ef?pid=MOBHDVFKSZNEZGXW&lid=LSTMOBHDVFKSZNEZGXWGMBFTR&marketplace=FLIPKART"
    ),
    ("OnePlus 13", "https://www.flipkart.com/oneplus-13-black-eclipse-256-gb/product-reviews/itmb4659fd2a037f?pid=MOBH8CHRK3WUWSDX&lid=LSTMOBH8CHRK3WUWSDXVILALU&marketplace=FLIPKART"
     ),
    
    ("Nothing Phone 4a", "https://www.flipkart.com/nothing-phone-4a-white-128-gb/product-reviews/itm47712249513d4?pid=MOBHM2ZU4VKVQ4JV&lid=LSTMOBHM2ZU4VKVQ4JV7DKPR8&marketplace=FLIPKART"
     )
]

all_reviews = []

for product_name, url in products:

    print(f"\nScraping {product_name}...")

    driver.get(url)

    time.sleep(5)

    # Scroll multiple times
    for _ in range(8):
        driver.execute_script(
            "window.scrollTo(0, document.body.scrollHeight);"
        )
        time.sleep(2)

    reviews = driver.find_elements(
        By.XPATH,
        "//*[contains(text(),'phone') or contains(text(),'camera') or contains(text(),'battery')]"
    )

    print("Reviews Found:", len(reviews))

    for r in reviews:

        text = r.text.strip()

        if len(text) > 10:

            all_reviews.append([
                product_name,
                5,
                text
            ])

# Create DataFrame
df = pd.DataFrame(
    all_reviews,
    columns=[
        "Product",
        "Rating",
        "Review"
    ]
)

# Remove duplicates
df.drop_duplicates(inplace=True)

# Save CSV
df.to_csv(
    "reviews.csv",
    index=False
)

print("\nTotal Reviews Saved:", len(df))

driver.quit()