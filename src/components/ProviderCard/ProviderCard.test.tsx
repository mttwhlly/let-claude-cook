import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';
import { ProviderCard } from './ProviderCard';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe('ProviderCard', () => {
  const defaultProps = {
    name: 'Dr. Jane Smith',
    npi: '1234567890',
    specialty: 'Internal Medicine',
  };

  it('renders without crashing', () => {
    renderWithTheme(<ProviderCard {...defaultProps} />);
  });

  it('displays the provider name', () => {
    renderWithTheme(<ProviderCard {...defaultProps} />);
    expect(screen.getByText('Dr. Jane Smith')).toBeInTheDocument();
  });

  it('displays the NPI', () => {
    renderWithTheme(<ProviderCard {...defaultProps} />);
    expect(screen.getByText('NPI: 1234567890')).toBeInTheDocument();
  });

  it('displays the specialty as a chip', () => {
    renderWithTheme(<ProviderCard {...defaultProps} />);
    expect(screen.getByText('Internal Medicine')).toBeInTheDocument();
  });
});
