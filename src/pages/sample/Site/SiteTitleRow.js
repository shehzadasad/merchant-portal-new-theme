import { Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SharedButton from 'shared/components/SharedButton'

const SiteTitleRow = () => {
  const navigate = useNavigate()

  return (
    <Grid
      container
      alignItems='center'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Grid item>
        <Typography variant='h1' component='h2'>
          Site
        </Typography>
      </Grid>
      <Grid item>
        <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
          <Grid item>
            <SharedButton
              text='Create Site'
              style={{
                background: '#e93a7d',
                borderRadius: 50,
                color: '#fff',
                fontSize: '15px',
                fontWeight: '800',
                textAlign: 'center',
                width: 150,
                border: 'none',
                height: 40,
                cursor: 'pointer',
                marginRight: 10,
              }}
              onClick={() => navigate('/site/new')}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default SiteTitleRow
