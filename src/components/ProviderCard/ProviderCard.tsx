import { Card, CardContent, Chip, Typography } from '@mui/material';

export interface ProviderCardProps {
  name: string;
  npi: string;
  specialty: string;
}

export function ProviderCard({ name, npi, specialty }: ProviderCardProps) {
  return (
    <Card elevation={1}>
      <CardContent>
        <Typography variant="h6" component="h3" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          NPI: {npi}
        </Typography>
        <Chip label={specialty} color="primary" size="small" variant="outlined" />
      </CardContent>
    </Card>
  );
}
