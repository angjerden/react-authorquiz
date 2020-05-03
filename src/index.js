import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
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

function reducer(state = { authors, turnData: getTurnData(authors), highlight: ''}, action) {
    switch (action.type) {
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.author.books.some((book) => { return book === action.answer} );
            return Object.assign(
                {},
                state, {
                    highlight: isCorrect ? 'correct' : 'wrong'
                }
            );
        case 'CONTINUE':
            return Object.assign(
                {}, 
                state, 
                {
                    highlight: '',
                    turnData: getTurnData(state.authors)
                });
        case 'ADD_AUTHOR':
            return Object.assign(
                {},
                state,
                {
                    authors: state.authors.concat([action.author])
                }
            );
        default: return state;
    }
};

let store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

ReactDOM.render(
    <BrowserRouter>
        <ReactRedux.Provider store={store}>
            <React.Fragment>
                <Route exact path="/" component={AuthorQuiz} />
                <Route path="/add" component={AddAuthorForm}/>
            </React.Fragment>
        </ReactRedux.Provider>
    </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
