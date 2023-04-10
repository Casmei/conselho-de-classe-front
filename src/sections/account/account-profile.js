import {
  Avatar,
  Box,
  Chip,
  Typography
} from '@mui/material';
import { useAuthContext } from '../../contexts/auth-context';

const user = {
  avatar: '/assets/avatars/avatar-marcus-finn.png',
  city: 'Los Angeles',
  jobTitle: 'Senior Developer',
  name: 'Patrick Barbacena Lopes',
};

export const AccountProfile = () => {
  // const [user] = useAuthContext();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <Avatar
        src={user.avatar}
        sx={{
          height: 80,
          mr: 2,
          width: 80
        }}
      />
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
          {user.name}
        </Typography>
        <Box>
        <Typography
          style={{fontSize: 14, fontWeight: 500}}
        >
          user_id: <Chip label="5e86805e2bafd54f66cc95c3"
  size='small' />
        </Typography>
        </Box>
      </Box>
    </Box>
  )
};
