// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Typography } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components

import AccountPopover from './AccountPopover';

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export default function Header() {
  return (
    <StyledRoot>
      <StyledToolbar>
        <Typography variant="h4" sx={{ color: 'black' }} ml={2}>
          Clinast | Dashboard
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
