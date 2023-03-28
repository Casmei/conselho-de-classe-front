import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardActionArea, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import Link from 'next/link';

export const ClassCard = (props) => {
  const { classe } = props;

  return (
    <Link href='/instituicoes/40/minhas-turmas/40'>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography
              align="center"
              gutterBottom
              variant="h5"
            >
              {classe.name}
            </Typography>
          </CardContent>
          <Box sx={{ flexGrow: 1 }} />
          <Divider />
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{ p: 2 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={1}
            >
              <SvgIcon
                color="action"
                fontSize="small"
              >
                <ClockIcon />
              </SvgIcon>
              <Typography
                color="text.secondary"
                display="inline"
                variant="body2"
              >
                Atualizado em {classe.updatedAt}
              </Typography>
            </Stack>
            <Stack
              alignItems="center"
              direction="row"
              spacing={1}
            >
            </Stack>
          </Stack>
        </CardActionArea>
      </Card>
    </Link>
  );
};

ClassCard.propTypes = {
  classe: PropTypes.object.isRequired
};
