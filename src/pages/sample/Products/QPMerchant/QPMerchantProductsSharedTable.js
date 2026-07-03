import React from 'react'
import { LinkOutlined } from '@mui/icons-material'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { Box, Checkbox, Grid, Typography } from '@mui/material'
import { pink } from '@mui/material/colors'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import EditIcon from 'assets/icon/EditIcon.svg'
import TrashIcon from 'assets/icon/TrashIcon.svg'
import ViewDetailsEyeIcon from 'assets/icon/ViewDetailsIcon.svg'
import clipBoardIcon from 'assets/product/clipboardIcon.svg'
import syncIcon from 'assets/product/sync.svg'
import infoIcon from 'assets/icon/info.svg'
import PropTypes from 'prop-types'
import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { syncProducts } from 'redux/actions/ProductAction'
import DeleteProductModal from '../DeleteProductModal'
import EditProductModal from '../EditProductModal'
import Popover from '@mui/material/Popover'
import { styled } from '@mui/material/styles'
import step1 from 'assets/img/step1.svg'
import step2 from 'assets/img/step2.svg'
import step3 from 'assets/img/step3.svg'
import step4 from 'assets/img/step4.svg'
import Tooltip from '@mui/material/Tooltip'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))
export default function QPMerchantProductsSharedTable(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const { rows, columns } = props
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [rotateChevron, setRotateChevron] = useState(false)
  const dispatch = useDispatch()
  const userDetail = useSelector((state) => state.users.userDetail)

  const handleRotate = () => {
    dispatch(syncProducts(userDetail.id))
    setRotateChevron(!rotateChevron)
    setTimeout(function () {
      window.location.reload()
    }, 500)
  }

  const rotate = rotateChevron ? 'rotate(-180deg)' : 'rotate(180deg)'

  const activePageStyle = {
    color: 'white',
    padding: 3,
    borderRadius: 50,
    minWidth: 40,
    maxWidth: 40,
    minHeight: 40,
    maxHeight: 40,
    backgroundColor: '#ED2079',
    marginRight: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  }

  const inActivePageStyle = {
    color: 'black',
    padding: 3,
    borderRadius: 50,
    minWidth: 40,
    maxWidth: 40,
    minHeight: 40,
    maxHeight: 40,
    backgroundColor: '#ECECEC',
    marginRight: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  }

  const DeleteProduct = (id) => {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    }

    fetch(
      `https://apis.qisstpay.com/merchant/products/delete/${userDetail.id}/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          toast.success('Deleted Successfully!')
          props.setReloadProductData(!props.reloadProductData)
        }
      })
      .catch((error) => console.log('error', error))
  }

  return (
    <>
      <Paper sx={{ width: '100%', marginTop: '35px', borderRadius: '10px' }}>
        <Grid
          container
          style={{
            padding: 12,
            paddingLeft: 15,
            paddingRight: 0,
            paddingTop: 25,
          }}
          alignItems='center'
        >
          <Grid item>
            <Typography
              variant='p'
              component='p'
              fontWeight={500}
              fontSize={18}
              marginRight={4}
            >
              {props.title ? props.title : 'Products'}
            </Typography>
          </Grid>
          {/* {props.isInProgress.toString()} */}
          {props.isOms === true ? (
            <>
              {props.isInProgress === true ? (
                <Tooltip
                  title={'Sync is in progress, please check after 1 hour.'}
                  placement='top'
                >
                  <Box
                    style={{
                      display: 'flex',
                      cursor: 'not-allowed',
                      opacity: '0.6',
                    }}
                  >
                    <img
                      src={syncIcon}
                      alt='sync icon'
                      style={{
                        marginRight: 5,
                        transform: rotate,
                        transition: 'all 0.2s linear',
                      }}
                    />

                    <Typography
                      variant='p'
                      component='p'
                      fontWeight={500}
                      fontSize={14}
                      color='#E71583'
                    >
                      SYNC
                    </Typography>
                  </Box>
                </Tooltip>
              ) : (
                <Box
                  style={{
                    display: 'flex',
                    cursor: 'pointer',
                    opacity: '1',
                  }}
                  onClick={handleRotate}
                >
                  <img
                    src={syncIcon}
                    alt='sync icon'
                    style={{
                      marginRight: 5,
                      transform: rotate,
                      transition: 'all 0.2s linear',
                    }}
                  />

                  <Typography
                    variant='p'
                    component='p'
                    fontWeight={500}
                    fontSize={14}
                    color='#E71583'
                  >
                    SYNC
                  </Typography>
                </Box>
              )}

              <Typography
                variant='p'
                component='p'
                fontWeight={500}
                fontSize={14}
                color={props.isInProgress === true ? '#78909c' : '#E71583'}
                marginLeft={'20px'}
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup='true'
                // onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                onClick={open ? handlePopoverClose : handlePopoverOpen}
                style={{
                  cursor: `${
                    props.isInProgress === true ? 'progress' : 'pointer'
                  }`,
                }}
              >
                {props.isInProgress === true ? (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    Syncing
                    <div className='bouncing-loader'>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                ) : (
                  'View Information'
                )}
              </Typography>
            </>
          ) : (
            ''
          )}

          <Popover
            id='mouse-over-popover'
            sx={{
              pointerEvents: 'none',
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Box
              sx={{
                width: '100%',
                paddingBottom: '25px',
                paddingTop: '25px',
                paddingLeft: '35px',
                paddingRight: '35px',
              }}
            >
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={3}>
                  <img src={step1} />
                </Grid>
                <Grid item xs={3}>
                  <img src={step2} />
                </Grid>
                <Grid item xs={3}>
                  <img src={step3} />
                </Grid>
                <Grid item xs={3}>
                  <img src={step4} />
                </Grid>
              </Grid>
            </Box>
          </Popover>
        </Grid>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <>
                    {column.label !== 'Product URL' ? (
                      <TableCell
                        key={index}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          textDecoration: 'none',
                          color: 'inherit',
                        }}
                      >
                        {column.id === 'id' ? (
                          <Box
                            sx={
                              {
                                // display: 'flex',
                                // alignItems: 'center',
                              }
                            }
                          >
                            {/* <Checkbox
                              color='primary'
                              sx={{
                                '&.Mui-checked': {
                                  color: pink[600],
                                },
                                paddingLeft: 0,
                              }}
                            /> */}
                            <Typography variant={'p'} component={'p'}>
                              {column.label}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography
                            variant={'p'}
                            component={'p'}
                            fontWeight={500}
                          >
                            {column.label}
                          </Typography>
                        )}
                      </TableCell>
                    ) : (
                      <>
                        {props.isOms === false ? (
                          ''
                        ) : (
                          <TableCell
                            key={index}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              textDecoration: 'none',
                              color: 'inherit',
                            }}
                          >
                            {column.id === 'id' ? (
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                {/* <Checkbox
                                  color='primary'
                                  sx={{
                                    '&.Mui-checked': {
                                      color: pink[600],
                                    },
                                    paddingLeft: 0,
                                  }}
                                /> */}
                                <Typography variant={'p'} component={'p'}>
                                  {column.label}
                                </Typography>
                              </Box>
                            ) : (
                              <Typography
                                variant={'p'}
                                component={'p'}
                                fontWeight={500}
                              >
                                {column.label}
                              </Typography>
                            )}
                          </TableCell>
                        )}
                      </>
                    )}
                  </>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.length > 0
                ? rows?.map((row, index) => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          const value = row[column.id]
                          return (
                            <>
                              {column.id !== 'url' ? (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{
                                    color: 'inherit',
                                  }}
                                >
                                  {column.id === 'id' ? (
                                    <Box
                                      sx={
                                        {
                                          // display: 'flex',
                                          // alignItems: 'center',
                                        }
                                      }
                                    >
                                      <Link
                                        to={`/product-details/${row['id']}`}
                                        style={{
                                          color: 'inherit',
                                        }}
                                      >
                                        <Typography
                                          variant={'p'}
                                          component={'p'}
                                          // marginLeft={5}
                                        >
                                          {value}
                                        </Typography>
                                      </Link>
                                    </Box>
                                  ) : column.id === 'title' ? (
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                      }}
                                    >
                                      {row['image'].length > 0 ? (
                                        <img
                                          src={row['image']}
                                          style={{
                                            width: 40,
                                            height: 40,
                                            marginRight: 10,
                                          }}
                                        />
                                      ) : (
                                        ''
                                      )}
                                      <Typography variant={'p'} component={'p'}>
                                        {value}
                                      </Typography>
                                    </Box>
                                  ) : column.id === 'status' ? (
                                    <Box
                                      sx={{
                                        color: '#379200',
                                        backgroundColor: '#EBF4E6',
                                        padding: '3px 10px',
                                        borderRadius: '15px',
                                        display: 'inline-block',
                                        whiteSpace: 'nowrap',
                                        width: 91,
                                        height: 24,
                                        textAlign: 'center',
                                      }}
                                    >
                                      {(
                                        <Typography
                                          variant={'p'}
                                          component={'p'}
                                        >
                                          {value}
                                        </Typography>
                                      ) ?? 'COMPLETED'}
                                    </Box>
                                  ) : column.id === 'stock_info' ? (
                                    <Typography variant={'p'} component={'p'}>
                                      {value.available_stock} in stock for{' '}
                                      {value.variants_count} variants
                                    </Typography>
                                  ) : column.id === 'category' ? (
                                    <Typography variant={'p'} component={'p'}>
                                      {value}
                                    </Typography>
                                  ) : column.id === 'is_active' ? (
                                    <Typography variant={'p'} component={'p'}>
                                      {value === 'YES' ? 'Published' : 'Draft'}
                                    </Typography>
                                  ) : column.id === 'url' ? (
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        opacity: `${
                                          row['is_active'] === 'YES'
                                            ? '1'
                                            : '0.6'
                                        }`,
                                      }}
                                    >
                                      <a
                                        href={
                                          row['is_active'] === 'YES'
                                            ? value
                                            : null
                                        }
                                        target='_blank'
                                        rel='noopener noreferrer'
                                      >
                                        <Box
                                          style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                          }}
                                        >
                                          <LinkOutlined
                                            style={{
                                              marginRight: 10,
                                              color: '#ea3b7d',
                                            }}
                                          />
                                          <Typography
                                            style={{
                                              color: '#ea3b7d',
                                            }}
                                          >
                                            Open Link
                                          </Typography>
                                        </Box>
                                      </a>
                                      <CopyToClipboard
                                        text={
                                          row['is_active'] === 'YES'
                                            ? value
                                            : ''
                                        }
                                        onCopy={() =>
                                          row['is_active'] === 'YES'
                                            ? toast.success('Link Copied')
                                            : null
                                        }
                                      >
                                        <img
                                          src={clipBoardIcon}
                                          style={{
                                            cursor: 'pointer',
                                            marginLeft: 10,
                                          }}
                                          alt='img'
                                        />
                                      </CopyToClipboard>
                                    </Box>
                                  ) : column.id === 'headless' ? (
                                    <>
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'space-between',
                                          opacity: `${
                                            row['is_active'] === 'YES'
                                              ? '1'
                                              : '0.6'
                                          }`,
                                        }}
                                      >
                                        <a
                                          href={
                                            row['is_active'] === 'YES'
                                              ? props.headlessURL +
                                                `${row['id']}`
                                              : null
                                          }
                                          target='_blank'
                                          rel='noopener noreferrer'
                                        >
                                          <Box
                                            style={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                            }}
                                          >
                                            <LinkOutlined
                                              style={{
                                                marginRight: 10,
                                                color: '#ea3b7d',
                                              }}
                                            />
                                            <Typography
                                              style={{
                                                color: '#ea3b7d',
                                              }}
                                            >
                                              Open Link
                                            </Typography>
                                          </Box>
                                        </a>
                                        <CopyToClipboard
                                          text={
                                            row['is_active'] === 'YES'
                                              ? props.headlessURL +
                                                `${row['id']}`
                                              : ''
                                          }
                                          onCopy={() =>
                                            row['is_active'] === 'YES'
                                              ? toast.success('Link Copied')
                                              : null
                                          }
                                        >
                                          <img
                                            src={clipBoardIcon}
                                            style={{
                                              cursor: 'pointer',
                                              marginLeft: 10,
                                            }}
                                            alt='img'
                                          />
                                        </CopyToClipboard>
                                      </Box>
                                    </>
                                  ) : column.id === 'viewEditDeleteIcons' ? (
                                    <Grid
                                      container
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Grid item>
                                        <Link
                                          to={`/product-details/${row['id']}`}
                                        >
                                          <img
                                            src={ViewDetailsEyeIcon}
                                            alt='details Icon'
                                            style={{
                                              cursor: 'pointer',
                                              paddingTop: '5px',
                                            }}
                                          />
                                        </Link>
                                      </Grid>

                                      {props.isOms === true ? (
                                        ''
                                      ) : (
                                        <Grid item>
                                          <Link
                                            to={`/product-edit/${row['id']}`}
                                          >
                                            <img
                                              src={EditIcon}
                                              alt='Edit Pencil Icon'
                                              style={{
                                                cursor: 'pointer',
                                                marginLeft: 15,
                                                paddingTop: '1px',
                                              }}
                                            />
                                          </Link>
                                        </Grid>
                                      )}

                                      {props.isOms === true ? (
                                        ''
                                      ) : (
                                        <Grid item>
                                          <img
                                            onClick={() =>
                                              DeleteProduct(row['id'])
                                            }
                                            src={TrashIcon}
                                            alt='Delete Icon'
                                            style={{
                                              cursor: 'pointer',
                                              marginLeft: 15,
                                              paddingTop: '1px',
                                            }}
                                          />
                                        </Grid>
                                      )}
                                    </Grid>
                                  ) : (
                                    ''
                                  )}
                                </TableCell>
                              ) : (
                                <>
                                  {props.isOms === false ? (
                                    ''
                                  ) : (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                      style={{
                                        color: 'inherit',
                                      }}
                                    >
                                      {column.id === 'id' ? (
                                        <Box
                                          sx={
                                            {
                                              // display: 'flex',
                                              // alignItems: 'center',
                                            }
                                          }
                                        >
                                          <Link
                                            to={`/product-details/${row['id']}`}
                                            style={{
                                              color: 'inherit',
                                            }}
                                          >
                                            <Typography
                                              variant={'p'}
                                              component={'p'}
                                              // marginLeft={5}
                                            >
                                              {value}
                                            </Typography>
                                          </Link>
                                        </Box>
                                      ) : column.id === 'title' ? (
                                        <Box
                                          sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                          }}
                                        >
                                          {row['image'].length > 0 ? (
                                            <>
                                            <img
                                              src={row['image']}
                                              style={{
                                                width: 40,
                                                height: 40,
                                                marginRight: 10,
                                              }}
                                            />
                                            </>
                                          ) : (
                                            ''
                                          )}
                                          <Typography
                                            variant={'p'}
                                            component={'p'}
                                          >
                                            {value}
                                          </Typography>
                                        </Box>
                                      ) : column.id === 'status' ? (
                                        <Box
                                          sx={{
                                            color: '#379200',
                                            backgroundColor: '#EBF4E6',
                                            padding: '3px 10px',
                                            borderRadius: '15px',
                                            display: 'inline-block',
                                            whiteSpace: 'nowrap',
                                            width: 91,
                                            height: 24,
                                            textAlign: 'center',
                                          }}
                                        >
                                          {(
                                            <Typography
                                              variant={'p'}
                                              component={'p'}
                                            >
                                              {value}
                                            </Typography>
                                          ) ?? 'COMPLETED'}
                                        </Box>
                                      ) : column.id === 'stock_info' ? (
                                        <Typography
                                          variant={'p'}
                                          component={'p'}
                                        >
                                          {value.available_stock} in stock for{' '}
                                          {value.variants_count} variants
                                        </Typography>
                                      ) : column.id === 'category' ? (
                                        <Typography
                                          variant={'p'}
                                          component={'p'}
                                        >
                                          {value}
                                        </Typography>
                                      ) : column.id === 'is_active' ? (
                                        <Typography
                                          variant={'p'}
                                          component={'p'}
                                        >
                                          {value === 'YES'
                                            ? 'Published'
                                            : 'Draft'}
                                        </Typography>
                                      ) : column.id === 'url' ? (
                                        <Box
                                          sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            opacity: `${
                                              row['is_active'] === 'YES'
                                                ? '1'
                                                : '0.6'
                                            }`,
                                          }}
                                        >
                                          <a
                                            href={
                                              row['is_active'] === 'YES'
                                                ? value
                                                : null
                                            }
                                            target='_blank'
                                            rel='noopener noreferrer'
                                          >
                                            <Box
                                              style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                              }}
                                            >
                                              <LinkOutlined
                                                style={{
                                                  marginRight: 10,
                                                  color: '#ea3b7d',
                                                }}
                                              />
                                              <Typography
                                                style={{
                                                  color: '#ea3b7d',
                                                }}
                                              >
                                                Open Link
                                              </Typography>
                                            </Box>
                                          </a>
                                          <CopyToClipboard
                                            text={
                                              row['is_active'] === 'YES'
                                                ? value
                                                : ''
                                            }
                                            onCopy={() =>
                                              row['is_active'] === 'YES'
                                                ? toast.success('Link Copied')
                                                : null
                                            }
                                          >
                                            <img
                                              src={clipBoardIcon}
                                              style={{
                                                cursor: 'pointer',
                                                marginLeft: 10,
                                              }}
                                              alt='img'
                                            />
                                          </CopyToClipboard>
                                        </Box>
                                      ) : column.id === 'headless' ? (
                                        <>
                                          <Box
                                            sx={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'space-between',
                                              opacity: `${
                                                row['is_active'] === 'YES'
                                                  ? '1'
                                                  : '0.6'
                                              }`,
                                            }}
                                          >
                                            <a
                                              href={
                                                row['is_active'] === 'YES'
                                                  ? props.headlessURL +
                                                    `${row['id']}`
                                                  : null
                                              }
                                              target='_blank'
                                              rel='noopener noreferrer'
                                            >
                                              <Box
                                                style={{
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  justifyContent: 'center',
                                                }}
                                              >
                                                <LinkOutlined
                                                  style={{
                                                    marginRight: 10,
                                                    color: '#ea3b7d',
                                                  }}
                                                />
                                                <Typography
                                                  style={{
                                                    color: '#ea3b7d',
                                                  }}
                                                >
                                                  Open Link
                                                </Typography>
                                              </Box>
                                            </a>
                                            <CopyToClipboard
                                              text={
                                                row['is_active'] === 'YES'
                                                  ? props.headlessURL +
                                                    `${row['id']}`
                                                  : ''
                                              }
                                              onCopy={() =>
                                                row['is_active'] === 'YES'
                                                  ? toast.success('Link Copied')
                                                  : null
                                              }
                                            >
                                              <img
                                                src={clipBoardIcon}
                                                style={{
                                                  cursor: 'pointer',
                                                  marginLeft: 10,
                                                }}
                                                alt='img'
                                              />
                                            </CopyToClipboard>
                                          </Box>
                                        </>
                                      ) : column.id ===
                                        'viewEditDeleteIcons' ? (
                                        <Grid
                                          container
                                          style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                          }}
                                        >
                                          <Grid item>
                                            <Link
                                              to={`/product-details/${row['id']}`}
                                            >
                                              <img
                                                src={ViewDetailsEyeIcon}
                                                alt='Edit Pencil Icon'
                                                style={{
                                                  cursor: 'pointer',
                                                }}
                                              />
                                            </Link>
                                          </Grid>
                                        </Grid>
                                      ) : (
                                        ''
                                      )}
                                    </TableCell>
                                  )}
                                </>
                              )}
                            </>
                          )
                        })}
                      </TableRow>
                    )
                  })
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper> 
      <EditProductModal open={isEditModalOpen} setOpen={setIsEditModalOpen} />
      <DeleteProductModal
        open={isDeleteModalOpen} 
        setOpen={setIsDeleteModalOpen}
      />
      {rows?.length > 0 ? (
        <Grid
          container
          style={{ paddingTop: 20, paddingBottom: 10 }}
          alignItems={'center'}
        >
          <Grid item marginRight={7}>
            <ArrowBackIos
              fontSize='small'
              style={{
                color: props.currentPage == 1 ? '#6B7280' : '#111827',
                cursor: props.currentPage == 1 ? 'not-allowed' : 'pointer',
              }}
              onClick={() => {
                if (props.currentPage == 1) {
                  return
                }
                if (props.currentPage > 1) {
                  props.setCurrentPage(props.currentPage - 1)
                }
              }}
            />
          </Grid>
          <Grid
            item
            style={{ maxWidth: 300, overflow: 'scroll', borderRadius: 20 }}
            className='page-container'
          >
            <Grid container maxHeight={45} style={{ flexWrap: 'nowrap' }}>
              {[...Array(props.totalPages)].map((value, i) => (
                <Box
                  key={i}
                  style={
                    props.currentPage === i + 1
                      ? activePageStyle
                      : inActivePageStyle
                  }
                  onClick={() => props.setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Box>
              ))}
            </Grid>
          </Grid>
          <Grid item marginLeft={9}>
            <ArrowForwardIos
              fontSize='small'
              style={{
                color:
                  props.currentPage === props.totalPages
                    ? '#6B7280'
                    : '#111827',
                cursor:
                  props.currentPage === props.totalPages
                    ? 'not-allowed'
                    : 'pointer',
              }}
              onClick={() => {
                if (props.currentPage === props.totalPages) {
                  return
                }

                if (props.currentPage < props.totalPages) {
                  props.setCurrentPage(props.currentPage + 1)
                }
              }}
            />
          </Grid>
        </Grid>
      ) : (
        ''
      )}
    </>
  )
}

QPMerchantProductsSharedTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  onSelectedRoleChange: PropTypes.func,
  onSelectedTimeRangeChange: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
}
