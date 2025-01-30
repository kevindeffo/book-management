exports.books = [
    {
        id: 1,
        title: 'Clean architecture',
        author: 'Martin',
        publishedDate: '12/03/2023'
    },
    {
        id: 2,
        title: 'Clean code',
        author: 'Robert',
        publishedDate: '12/03/2023'
    },
    {
        id: 3,
        title: 'Design Patterns',
        author: 'Erich',
        publishedDate: '12/03/2023'
    },
    {
        id: 4,
        title: 'Extreme Programming',
        author: 'kevin',
        publishedDate: '12/03/2023'
    }
];

exports.users = [
    {
        id: 1,
        username: 'kevindeffo',
        password: '12345',
        readingHistory: [
            { bookId: 1, dateRead: '01/01/2023' },
            { bookId: 2, dateRead: '02/01/2023' }
        ],
        preferences: {
            favoriteGenres: ['Software Engineering', 'Programming'],
            authors: ['Martin', 'Robert']
        }
    }
];

// Function to analyze user data for recommendations
function analyzeUserData(users) {
    users.forEach(user => {
        // Analyze reading history
        const readingHistory = user.readingHistory;
        // Example: Count books read by each author
        const authorReadCount = {};
        readingHistory.forEach(entry => {
            const book = exports.books.find(b => b.id === entry.bookId);
            if (book) {
                authorReadCount[book.author] = (authorReadCount[book.author] || 0) + 1;
            }
        });

        // Analyze preferences
        const preferences = user.preferences;
        // Example: Check favorite genres and authors
        const favoriteGenres = preferences.favoriteGenres;
        const favoriteAuthors = preferences.authors;

        // Pseudo-code for recommendation logic
        // 1. Recommend books by favorite authors
        // 2. Recommend books in favorite genres
        // 3. Consider books by authors frequently read

        console.log(`User ${user.username} analysis:`);
        console.log('Author Read Count:', authorReadCount);
        console.log('Favorite Genres:', favoriteGenres);
        console.log('Favorite Authors:', favoriteAuthors);
    });
}

// Example usage
analyzeUserData(exports.users);