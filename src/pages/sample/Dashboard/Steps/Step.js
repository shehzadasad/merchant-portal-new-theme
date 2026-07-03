import { Typography } from '@mui/material'
import greenTick from 'assets/icon/greenTick.svg'
import './Style.css'

const Step = (props) => {
  const { title } = props
  return (
    <div className='steps current'>
      <div className='main-body'>
        <div>
          <img src={greenTick} />
        </div>
        <Typography
          variant='p'
          component='p'
          style={{
            fontWeight: 'bold',
            marginTop: 10,
            marginBottom: 20,
            fontSize: 16,
          }}
        >
          {title}
        </Typography>
      </div>
      <Typography
        variant='p'
        component='p'
        style={{
          position: 'absolute',
          bottom: 10,
          fontWeight: 'normal',
          color: '#797979',
          fontSize: 15,
        }}
      >
        Completed
      </Typography>
    </div>
  )
}

export default Step
