import requests, json
from bs4 import BeautifulSoup
import sys
import asyncio

headers = {'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'}

s = requests.Session()
# res = await s.get(sys.argv[1], headers=headers, verify=False)
res = s.get('https://www.myntra.com/jeans/levis/levis-men-blue-slim-fit-mid-rise-light-fade-stretchable-jeans/16747920/buy', headers=headers, verify=False)

soup = BeautifulSoup(res.text,"lxml")

script = None
for s in soup.find_all("script"):
    if 'pdpData' in s.text:
        script = s.get_text(strip=True)
        break

data = json.loads(script[script.index('{'):])

if data :
    print( { 'price' : data["pdpData"]["price"]["discounted"] ,  'mrp' : data["pdpData"]["price"]["mrp"]  })








