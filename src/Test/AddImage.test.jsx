import React from 'react';
import { render, fireEvent, waitFor, findByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import AddImage from '../Views/AddImage/AddImage.jsx';

global.alert = jest.fn();

describe('AddImage component', () => {
   it('submits the form correctly', async () => {

    const { getByPlaceholderText, getByText, getByTestId } = render(<AddImage />);
     
    userEvent.type(getByPlaceholderText('Enter the title.'), 'Test title');
         
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    userEvent.upload(getByTestId('file-upload'), file);
         
    fireEvent.click(getByText('Add Image'));
         
    await waitFor(() => {
     expect(getByText('Image added successfully.')).toBeInTheDocument();
    });
      
      });      
      
});
