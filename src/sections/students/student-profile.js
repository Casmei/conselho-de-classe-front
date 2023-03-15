import {
  Alert,
  Avatar,
  Box,
  Chip,
  Typography
} from '@mui/material';

const user = {
  avatar: '/assets/avatars/avatar-marcus-finn.png',
  city: 'Los Angeles',
  jobTitle: 'Senior Developer',
  name: 'Patrick Barbacena Lopes',
};

import { getInitials } from 'src/utils/get-initials';

export const StudentProfile = ({data}) => (
  <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Avatar
          sx={{
            height: 80,
            mr: 2,
            width: 80
          }}
        >
          {getInitials(data.name)}
        </Avatar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            gutterBottom
            variant="h4"
          >
            {data.name}
          </Typography>
          <Box>
          <Typography
            style={{fontSize: 14, fontWeight: 500}}
          >
            user_id: <Chip label={data.id}
size='small' />
          </Typography>
          </Box>
        </Box>
      </Box>
      <Alert
        color="primary"
        severity="info"
        sx={{ mt: 3 }}
      >
        <div>
          Foto de aluno em <b>futuras</b> atualizações!
        </div>
      </Alert>
  </>


);
