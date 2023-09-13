import React from 'react'
import '../App.css'
import { CDBInput, CDBCard, CDBCardBody, CDBIcon, CDBBtn, CDBContainer } from 'cdbreact';
import { useEffect } from 'react'
import { useState } from 'react'

const Ls = () => {
    const [data, setData] = useState({
        userName: '',
        userOpinion: ''
    })

    const fetchInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const getdata = () => {
        let val = localStorage.getItem('employee')

        if (val) {
            return JSON.parse(val)
        } else {
            return []
        }
    }

    const [sdata, setSdata] = useState(getdata())

    const formSubmit = () => {
        let n = document.getElementById('name').value
        let o = document.getElementById('opinion').value

        if (!n || !o) {
            alert('You must write your opinion')
        }
        else {
            setSdata([...sdata, { bg: "#f45d5d", id: sdata.length + 1, ...data }])

            setData({
                userName: '',
                userOpinion: ''
            })
        }
    }

    useEffect(() => {
        localStorage.setItem('employee', JSON.stringify(sdata))
    }, [sdata])

    const controll = (index) => {
        let data = [...sdata]
        data[index].bg = "#6fdd6f"
        setSdata(data)
        localStorage.setItem('employee', JSON.stringify(data))
    }

    return (
        <React.Fragment>
            <center>
                <CDBContainer>
                    <CDBCard className='py-4 mt-4 mb-4' style={{ width: '30rem' }}>
                        <CDBCardBody className="mx-4">
                            <div className="text-center mt-4 mb-2">
                                <p className="h4 font-weight-bold"> LocalBox Miner </p>
                            </div>
                            <CDBInput name='userName' id='name' className='my-3 mt-4' onChange={fetchInput} placeholder="Your name" type="text" icon="user" iconClass="text-muted" />
                            <CDBInput name='userOpinion' id='opinion' className='my-3 mt-4' onChange={fetchInput} placeholder="Your opinion" icon='envelope' type="text" />
                            <CDBBtn
                                onClick={formSubmit}
                                color="primary"
                                style={{ width: '40%' }}
                                className="btn-block mt-4 mx-auto"          >
                                Post
                                <CDBIcon far icon="paper-plane" />
                            </CDBBtn>
                        </CDBCardBody>
                    </CDBCard>
                </CDBContainer>
            </center>

            {
                sdata.map((v, i) =>
                    <div key={i} className='card' style={{ background: v.bg }}>
                        <center>
                            <h6>Name : {v.userName}</h6>
                            <h6>Opinion : {v.userOpinion}</h6>
                            <button id='done' onClick={() => controll(i)}>controll</button>
                        </center>
                    </div>
                )
            }
        </React.Fragment>
    )
}

export default Ls