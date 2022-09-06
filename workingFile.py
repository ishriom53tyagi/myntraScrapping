import requests, json
from bs4 import BeautifulSoup
import sys

headers = {'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'}

s = requests.Session()
res = s.get(sys.argv[1], headers=headers, verify=False)

soup = BeautifulSoup(res.text,"lxml")

script = None
for s in soup.find_all("script"):
    if 'pdpData' in s.text:
        script = s.get_text(strip=True)
        break


data = json.loads(script[script.index('{'):])

print( { 'price' : data["pdpData"]["price"]["discounted"] ,  'mrp' : data["pdpData"]["price"]["mrp"]  })

#print( { "mrp" : data['pdpData']['price']['mrp'] } )



# from requests_html import HTMLSession

# from bs4 import BeautifulSoup
# from selenium import webdriver

# s = HTMLSession()

# url = 'https://shein.co.uk/'
# my_list = []
# all_list = []

# def getdata(url):
#     chromedriver = '/usr/local/bin/chromedriver'
#     driver = webdriver.Chrome(chromedriver)
#     r = driver.get(url)
#     html = driver.page_source
#     soup = BeautifulSoup(html, 'html.parser')
#     return soup

# def getnextpage(soup):
#     # this will return the next page URL
#     for element in soup.find_all('div', {'class': 'index-image-hotZone'}):
#        pageSingle = element.find('a')['href']
#        my_list.append(url + pageSingle)

# while True:
#     data = getdata(url)
#     # print(data)
#     url = getnextpage(data)
#     if not url:
#         break
#     print(url)

# # print("my total list value",my_list[5])

# data = getdata(my_list[5])
# nextElement = data.find_all('div',{ 'class' : 'S-product-item__wrapper' })

# print(nextElement)
# for element in my_list:
#     # print(element)
#     data = getdata(element)

#     nextElement = data.find_all('div',{ 'class' : 'S-product-item__wrapper' })

#     for nextEle in nextElement:
#         val = nextEle.find('a')['href']
#         all_list.append(val)
        
# print(data)
# print(all_list)






