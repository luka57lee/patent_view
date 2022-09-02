import { styled } from '@mui/material/styles'
import { Container } from '@mui/material'
import Box from '@mui/material/Box'

const HeaderTitle = styled('span')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '21px',
  },
  [theme.breakpoints.down(320)]: {
    fontSize: '14px',
  },
}))

const Header = () => {
  return (
    <Box
      sx={{
        height: '72px',
        width: '100%',
        padding: `8px 16px`,
        borderBottom: '1px solid black',
        fontSize: '20px',
        fontWeight: 500,
        alignItems: 'center',
        display: 'flex',
      }}
    >
      <Container maxWidth="xl" sx={{ padding: { xs: '4px' } }}>
        <HeaderTitle>Airport distance calculator</HeaderTitle>
      </Container>
    </Box>
  )
}

export default Header
