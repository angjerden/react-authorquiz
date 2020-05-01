import React from 'react';
import { render } from '@testing-library/react';
import AuthorQuiz from './AuthorQuiz';
import ReactDOM from 'react-dom';

describe("Author Quiz", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AuthorQuiz />, div);
  });
});
