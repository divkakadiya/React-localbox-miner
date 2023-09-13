import React from 'react'
import '../App.css'
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
        let n = document.getElementById('userName').value
        let o = document.getElementById('userOpinion').value

        if (!n || !o) {
            alert('You must write your opinion')
        }
        else {
            setSdata([...sdata, { bg: "#f45d5d", id: sdata.length + 1, ...data }])

            setData({
                userName: "",
                userOpinion: ""
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
                <div className='form'>
                    <h1>LocalBox Miner</h1>
                    <form onSubmit={formSubmit}>
                        <input type='text' id='userName' name='userName' value={data.userName} placeholder='Your Name' onChange={fetchInput} /><br />
                        <textarea type='text' id='userOpinion' name='userOpinion' value={data.userOpinion} placeholder='Your Opinion' onChange={fetchInput}></textarea><br />
                        <button>Post</button>
                    </form>
                </div>
            </center>

            {
                sdata.map((v, i) =>
                    <div key={i} className='card' style={{ background: v.bg }}>
                        <center>
                            <p>Name : {v.userName}</p>
                            <p>Opinion : {v.userOpinion}</p>
                            <button onClick={() => controll(i)}>controll</button>
                        </center>
                    </div>
                )
            }
        </React.Fragment>
    )
}

export default Ls