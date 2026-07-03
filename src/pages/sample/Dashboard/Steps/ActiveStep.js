import { Avatar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import greenTick from 'assets/icon/greenTick.svg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Style.css'

const ActiveStep = (props) => {
  const merchantStates = useSelector((state) => state.users.merchantStates)
  const { title, checked, number, link, linkText } = props
  return (
    <div className='steps active-text'>
      <div className='main-body'>
        <div>
          {checked === true ? (
            <img src={greenTick} alt='green tick' />
          ) : (
            <Box
              style={{
                borderRadius: 50,
                width: 40,
                height: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                // backgroundColor: '#ebeef0',
                // color: '#898a91',
                padding: 5,
              }}
              bgcolor={
                (merchantStates?.onboardingApplicationInReview &&
                  number === 3) ||
                (merchantStates?.onboardingApplicationApproved && number === 4)
                  ? '#ED2079'
                  : '#ebeef0'
              }
            >
              <Typography
                color={
                  (merchantStates?.onboardingApplicationInReview &&
                    number === 3) ||
                  (merchantStates?.onboardingApplicationApproved &&
                    number === 4)
                    ? '#fff'
                    : '#898a91'
                }
              >
                {number}
              </Typography>
            </Box>
          )}
        </div>
        <Typography
          variant='p'
          component='p'
          style={{
            fontWeight: 'bold',
            marginTop: 10,
            marginBottom: 20,
            fontSize: 16,
            width: '80%',
            textAlign: 'center',
          }}
        >
          {title}
        </Typography>
        {checked === true ? (
          <Typography
            variant='p'
            component='p'
            style={{
              bottom: 10,
              fontWeight: 'normal',
              color: '#797979',
              fontSize: 15,
            }}
          >
            Completed
          </Typography>
        ) : (
          <Link
            to={link}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Typography
              variant='p'
              component='p'
              style={{
                fontWeight: 'normal',
                color: '#ec4796',
                fontSize: 15,
                // paddingLeft: number === 2 ? '10%' : number === 5 ? '5%' : 0,
                // paddingRight: number === 2 ? '10%' : number === 5 ? '5%' : 0,

                // display: 'flex',
                // justifyContent: 'center',
                // alignItems: 'center',
                // textAlign: 'center',
                position: 'absolute',
                bottom: 10,
              }}
            >
              {linkText}
            </Typography>
          </Link>
        )}
      </div>
    </div>
  )
}

export default ActiveStep
