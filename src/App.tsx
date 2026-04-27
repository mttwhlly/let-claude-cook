import { Box, Button, Container, Typography } from '@mui/material';
import { ProviderCard } from './components/ProviderCard';

export function App() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        let-claude-cook sandbox
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Claude Code configuration patterns for CAQH Nexus pod repos.
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Button variant="contained" color="primary" sx={{ mr: 2 }}>
          Primary Action
        </Button>
        <Button variant="outlined" color="primary">
          Secondary Action
        </Button>
      </Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Demo Component
      </Typography>
      <ProviderCard
        name="Dr. Jane Smith"
        npi="1234567890"
        specialty="Internal Medicine"
      />
    </Container>
  );
}
