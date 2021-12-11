import { render, screen, fireEvent } from '@testing-library/react';
import PurchaseForm from './PurchaseForm';

describe('<PurchaseForm />', () => {
  it('should render with initial content', () => {
    render(<PurchaseForm />);

    expect(screen.queryByText('Buy Teddy Bear')).toBeInTheDocument();
    expect(screen.queryByText('Email')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.queryByText('Card information')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('0000 0000 0000 0000')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('MM/YY')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('CVC')).toBeInTheDocument();
    expect(screen.queryByText('Name on card')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.queryByText('Country or region')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('Country')).toBeInTheDocument();
    expect(screen.queryByText('Pay € 55.00')).toBeInTheDocument();
  });

  it('should throw error if any of inputs are blank', () => {
    render(<PurchaseForm />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: '' } });
    fireEvent.click(screen.getByText('Pay € 55.00'));

    expect(screen.queryByText('edgars.trubacs@gmail.com')).not.toBeInTheDocument();
    expect(screen.queryByText('Success! Thank you for your purchase!')).not.toBeInTheDocument();
  });

  it('should not throw an error if field is correctly filled', () => {
    render(<PurchaseForm />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'email@test.com' } });
    fireEvent.click(screen.getByText('Pay € 55.00'));

    expect(screen.queryByText('email@test.com')).toBeDefined();
    expect(screen.queryByText('Success! Thank you for your purchase!')).toBeDefined();
  });

  it('should not throw an error if all fields are correctly entered, and form is submitted', () => {
    render(<PurchaseForm />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'email@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('0000 0000 0000 0000'), { target: { value: '1111111111111111' } });
    fireEvent.change(screen.getByPlaceholderText('MM/YY'), { target: { value: '05/94' } });
    fireEvent.change(screen.getByPlaceholderText('CVC'), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Edgars' } });
    fireEvent.change(screen.getByTestId('Country or region'), { target: { value: 'Latvia' } });
    fireEvent.click(screen.getByText('Pay € 55.00'));

    expect(screen.queryByText('email@test.com')).toBeDefined();
    expect(screen.queryByText('1111111111111111')).toBeDefined();
    expect(screen.queryByText('05/94')).toBeDefined();
    expect(screen.queryByText('123')).toBeDefined();
    expect(screen.queryByText('Edgars')).toBeDefined();
    expect(screen.queryByText('Latvia')).toBeDefined();
    expect(screen.queryByText('Success! Thank you for your purchase!')).toBeDefined();
  });
});
