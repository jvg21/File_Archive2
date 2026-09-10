import requests
import random

HOST = 'https://localhost:7167/'

def send_books():
    books = generateBody()

    response = requests.post(
        HOST + 'Book/array',
        json=books,
        verify=False
    )

    print('Status:', response.status_code)
    print('Headers:', response.headers)
    print('Response:', response.text)


def generateBody():
    body = []
    for i in range (0,30):
        body.append({
            "title": f"book {i}",
            "summary": f"{i} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur" ,
            "rating": random.randint(0,10),
            "totalChapters": random.randint(0,i*2),
            "currentChapter": random.randint(0,i),
            "words": random.randint(i*100,i*1000),
            "readingStatus": random.randint(0,7),
            "writingStatus": random.randint(0,3),
            "urls": [
            {
                "name": f"name {i}",
                "content": f"content {i}"
            }
            ],
            "authors": [
            {
                "id": 30
            }
            ]
        })
        
    return body


send_books()