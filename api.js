module.exports = {
    "GET /api" :{
        "description": "serves up a json representation of all the available endpoints of the api"
    },
    "GET /api/questions": {
        "description": "serves an array of questions",
        "queries": [],
        "exampleResponse": [{
            category: "Geography",
            id: "625e9dd927d267462ff91750",
            correctAnswer: "Bangladesh" ,
            incorrectAnswers: ["Nigeria", "Ukraine", "Australia"],
            question: "Which of these countries has red on its flag?",
            dateAsked: "12-22-2022",
            }, 
            {
            category: "Society & Culture",
            id: "6357fd4f68bd5000211e7192",
            correctAnswer: "India" ,
            incorrectAnswers: ["Niger", "Rwanda", "Taiwan"],
            question: "Gujarati is a language spoken in which of these countries?",
            dateAsked: "12-22-2022",
            }
        ]
    },
    "GET /api/questions/today": {
        "description": "serves up an array of 5 question from today",
        "queries": [],
        "exampleResponse": [{
            category: "Geography",
            id: "625e9dd927d267462ff91750",
            correctAnswer: "Bangladesh" ,
            incorrectAnswers: ["Nigeria", "Ukraine", "Australia"],
            question: "Which of these countries has red on its flag?",
            dateAsked: "12-22-2022",
            }, 
            {
            category: "Society & Culture",
            id: "6357fd4f68bd5000211e7192",
            correctAnswer: "India" ,
            incorrectAnswers: ["Niger", "Rwanda", "Taiwan"],
            question: "Gujarati is a language spoken in which of these countries?",
            dateAsked: "12-22-2022",
            }, 
            {
            category: "Science",
            id: "622a1c377cc59eab6f950491",
            correctAnswer: "Semitic cultures" ,
            incorrectAnswers: ["plant diseases","hearing; a branch of medicine","life"],
            question: "What is Semitology the study of?",
            dateAsked: "12-22-2022",
            },
            {
            category: "Film & TV",
            id: "625fd752dc0dd3b72da64d33",
            correctAnswer: "1992" ,
            incorrectAnswers: ["1988", "1996", "2000"],
            question: "Aladdin was released in which year?",
            dateAsked: "12-22-2022",
            },
            {
            category: "Film & TV",
            id: "625fd752dc0dd3b72da64d33",
            correctAnswer: "1992" ,
            incorrectAnswers: ["1988", "1996", "2000"],
            question: "Aladdin was released in which year?",
            dateAsked: "12-22-2022",
            },
            
        ]
    },
    "GET /api/users/:userId": {
        "description": "servers a user object",
        "queries": [],
        "exampleResponse": {
            "userId": "1",
            "username": "zakaria",
            "currentStreak": 2,
            "highestScore": 0,
            "dateLastPlayed": "2022-12-19",
            "todayStats": {
            "date": "2022-12-22",
            "score": 3,
            "timeTaken": "200",
            "correctAns": 2,
            },
            "historyStats": [],
            "achievements": [],
            "friends": ["2"],
            "leaderBoards": ["global", "quizNight"],
        }
    },
    "DELETE /api/users/:userId": {
        "description": "deletes an existing user",
        "queries": [],
    },
    "PATCH /api/users/:userId": {
        "description": "patches an existing user and responses with updated user", 
        "queries": [],
        "requestBody": {
            "username": "jack",
            "currentStreak": 1,
            "highestScore": 0,
            "dateLastPlayed": "12-24-2022",
            "todayStats": {
                "date": "12-24-2022",
                "score": 1,
                "timeTaken": "120",
                "correctAns": 4,
            },
            "historyStats": {
                "date": "12-24-2022",
                "score": 1,
                "timeTaken": "120",
                "correctAns": 4,
            },
            "achievements": "7 day streak",
            "friends": {"friend":"j32", "addTo": true},
            "leaderBoards": {"leaderBoard":"global", "addTo": false},
        }, 
        "exampleResponse": {
            "userId": "1",
            "username": "jack",
            "currentStreak": 1,
            "highestScore": 0,
            "dateLastPlayed": "12-24-2022",
            "todayStats": {
                "date": "12-24-2022",
                "score": 1,
                "timeTaken": "120",
                "correctAns": 4,
            },
            "historyStats": {
                "date": "12-24-2022",
                "score": 1,
                "timeTaken": "120",
                "correctAns": 4,
            },
            "achievements": "7 day streak",
            "friends":["2", "j32"],
            "leaderBoards": ["quizNight"]
        }
    }
}