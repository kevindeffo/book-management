const mongoose = require('mongoose');

// Mock user and book data for demonstration purposes
const users = [
    { id: 1, name: 'Alice', books: ['book1', 'book2'] },
    { id: 2, name: 'Bob', books: ['book2', 'book3'] },
    { id: 3, name: 'Charlie', books: ['book1', 'book3'] }
];

const books = [
    { id: 'book1', title: 'Book One' },
    { id: 'book2', title: 'Book Two' },
    { id: 'book3', title: 'Book Three' }
];

/**
 * Finds common books between two users.
 * @param {Object} user1 - The first user object.
 * @param {Object} user2 - The second user object.
 * @returns {Array} - An array of common book IDs.
 */
function findCommonBooks(user1, user2) {
    return user1.books.filter(book => user2.books.includes(book));
}

/**
 * Recommends books for a given user based on collaborative filtering.
 * @param {number} userId - The ID of the user to recommend books for.
 * @returns {Array} - An array of recommended book objects with reasons.
 */
function recommendBooksForUser(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) {
        console.error('User not found');
        return [];
    }

    const recommendations = new Set();
    const recommendationReasons = {};

    users.forEach(otherUser => {
        if (otherUser.id !== userId) {
            const commonBooks = findCommonBooks(user, otherUser);
            if (commonBooks.length > 0) {
                otherUser.books.forEach(book => {
                    if (!user.books.includes(book)) {
                        recommendations.add(book);
                        if (!recommendationReasons[book]) {
                            recommendationReasons[book] = [];
                        }
                        recommendationReasons[book].push(`Based on common books with ${otherUser.name}`);
                    }
                });
            }
        }
    });

    return Array.from(recommendations).map(bookId => {
        const book = books.find(book => book.id === bookId);
        return {
            ...book,
            reasons: recommendationReasons[bookId]
        };
    });
}

module.exports = {
    recommendBooksForUser
};
