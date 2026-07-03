import React from 'react'
import './paginationButton.css'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'

const SharedPagination = (props) => {
  var numbers = 0
  var page = -props.NumberOfRecordsPerPage

  return (
    <>
      <div className='main-pagination'>
        <button
          disabled={props.record === 1}
          onClick={() => {
            props.setRecord(props.record - props.NumberOfRecordsPerPage)
            props.setCurrentPage(props.currentPage - 1)
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: props.currentPage === 1 ? '#6B7280' : '#111827',
            cursor: props.currentPage === 1 ? 'not-allowed' : 'pointer',
            backgroundColor: 'transparent',
            border: 'none',
            marginRight: '15pt',
          }}
        >
          <ArrowBackIos style={{ fontSize: '15pt' }} />
        </button>

        {[...Array(props.totalPages)].map(
          (i) => (
            (page = page + props.NumberOfRecordsPerPage),
            (numbers = numbers + 1),
            numbers === props.currentPage ? (
              <>
                {props.currentPage > 3 ? (
                  <>
                    <button
                      className='noBtn'
                      value={props.totalPages}
                      onClick={(e) => {
                        props.setRecord(parseInt(e.target.value))
                        props.setCurrentPage(1)
                      }}
                    >
                      1
                    </button>
                    <button
                      className='noBtn'
                      value={page + props.NumberOfRecordsPerPage * 3}
                      onClick={(e) => {
                        props.setRecord(parseInt(e.target.value))
                        props.setCurrentPage(props.currentPage - 2)
                      }}
                    >
                      ...
                    </button>
                  </>
                ) : null}

                {props.currentPage === 3 ? (
                  <>
                    <button
                      className='noBtn'
                      value={props.totalPages}
                      onClick={(e) => {
                        props.setRecord(parseInt(e.target.value))
                        props.setCurrentPage(1)
                      }}
                    >
                      1
                    </button>
                  </>
                ) : null}

                {props.currentPage !== 3 &&
                numbers === props.totalPages &&
                props.totalPages > 2 ? (
                  <button
                    className='noBtn'
                    value={page - props.NumberOfRecordsPerPage * 2}
                    onClick={(e) => {
                      props.setRecord(parseInt(e.target.value))
                      props.setCurrentPage(parseInt(e.target.innerText))
                    }}
                  >
                    {numbers - 2}
                  </button>
                ) : null}

                {numbers !== 1 ? (
                  <button
                    className='noBtn'
                    value={page - props.NumberOfRecordsPerPage}
                    onClick={(e) => {
                      props.setRecord(parseInt(e.target.value))
                      props.setCurrentPage(parseInt(e.target.innerText))
                    }}
                  >
                    {numbers - 1}
                  </button>
                ) : null}

                <button
                  className='noBtn'
                  disabled={props.currentPage === numbers ? true : false}
                  value={page}
                  onClick={(e) => {
                    props.setRecord(parseInt(e.target.value))
                    props.setCurrentPage(parseInt(e.target.innerText))
                  }}
                  style={{ backgroundColor: '#ED2079', color: 'white' }}
                >
                  {numbers}
                </button>

                {numbers < props.totalPages ? (
                  <button
                    className='noBtn'
                    disabled={
                      props.record + props.NumberOfRecordsPerPage >
                      props.totalRecords
                    }
                    value={page + props.NumberOfRecordsPerPage}
                    onClick={(e) => {
                      props.setRecord(parseInt(e.target.value))
                      props.setCurrentPage(parseInt(e.target.innerText))
                    }}
                  >
                    {numbers + 1}
                  </button>
                ) : null}

                {numbers === 1 && props.totalPages > 2 ? (
                  <button
                    className='noBtn'
                    value={page + props.NumberOfRecordsPerPage * 2}
                    onClick={(e) => {
                      props.setRecord(parseInt(e.target.value))
                      props.setCurrentPage(parseInt(e.target.innerText))
                    }}
                  >
                    {numbers + 2}
                  </button>
                ) : null}

                {numbers !== 1 &&
                parseInt(props.totalPages) - parseInt(props.currentPage) ===
                  2 ? (
                  <button
                    className='noBtn'
                    value={props.totalPages}
                    onClick={(e) => {
                      props.setRecord(parseInt(e.target.value))
                      props.setCurrentPage(props.totalPages)
                    }}
                  >
                    {props.totalPages}
                  </button>
                ) : null}

                {props.totalPages > 2 &&
                props.currentPage + 2 < props.totalPages ? (
                  <>
                    <button
                      className='noBtn'
                      value={page + props.NumberOfRecordsPerPage * 3}
                      onClick={(e) => {
                        props.setRecord(parseInt(e.target.value))
                        props.setCurrentPage(props.currentPage + 3)
                      }}
                    >
                      ...
                    </button>

                    <button
                      className='noBtn'
                      value={props.totalPages}
                      onClick={(e) => {
                        props.setRecord(parseInt(e.target.value))
                        props.setCurrentPage(props.totalPages)
                      }}
                    >
                      {props.totalPages}
                    </button>
                  </>
                ) : null}
              </>
            ) : null
          )
        )}

        <button
          disabled={props.record === props.totalPages}
          onClick={() => {
            props.setRecord(props.record + props.NumberOfRecordsPerPage)
            props.setCurrentPage(props.currentPage + 1)
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color:
              props.currentPage === props.totalPages ? '#6B7280' : '#111827',
            cursor:
              props.currentPage === props.totalPages
                ? 'not-allowed'
                : 'pointer',
            backgroundColor: 'transparent',
            border: 'none',
            marginLeft: '15pt',
          }}
        >
          <ArrowForwardIos style={{ fontSize: '15pt' }} />
        </button>
      </div>
    </>
  )
}
export default SharedPagination
