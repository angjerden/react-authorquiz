import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import {shuffle, sample} from 'underscore';
import * as serviceWorker from './serviceWorker';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'img/Mark_Twain.jpg', 
        imageSource: 'Wikimedia Commons',
        books: [
            'Huckleberry',
            'Mississippi',
            'Roughing'
        ]
    },
    {
        name: 'JK Rowling',
        imageUrl: 'img/JKRowling.jpg', 
        imageSource: 'Wikimedia Commons',
        books: [
            'Harry Potter',
            'Harry Pothead',
            'Happy Rotter'
        ]
    },
    {
        name: 'J R R Tolkien',
        imageUrl: 'img/Tolkien.jpg', 
        imageSource: 'Wikimedia Commons',
        books: [
            'Flu of a salesman',
            'Lordy of thhe ringos',
            'Tween of the stars of the temple maggots'
        ]
    },
    {
        name: 'Neil Gaiman',
        imageUrl: 'img/NeilGaiman.jpg', 
        imageSource: 'Wikimedia Commons',
        books: [
            'Discoworld',
            'For whom the bell rings',
            'It\'s turtles all the way down, Mr. Fry'
        ]
    },
];

function getTurnData(authors) {
    const allBooks = authors.reduce((p, c, i) => {
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => {
            return author.books.some((title) => {
                return title === answer;
            })
        })
    };
}

const state = {
    turnData: getTurnData(authors),
    highlight: ''
};

function onAnswerSelected(answer) {
    const isCorrect = state.turnData.author.books.some((book) => { return book === answer} );
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}

function App() {
    return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected}/>; 
}

function AuthorWrapper() {
    return <AddAuthorForm onAddAuthor={console.log} />;
}

function render() {
    ReactDOM.render(
        <BrowserRouter>
            <React.Fragment>
                <Route exact path="/" component={App} />
                <Route path="/add" component={AuthorWrapper}/>
            </React.Fragment>
        </BrowserRouter>
    , document.getElementById('root'));
}
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
