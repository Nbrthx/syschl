import React from "react"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const Index = () => {
  const user = cookies.get("user")

  const [userData, setUserData] = React.useState({
    name: "null",
    absen: 0,
    skor: 0,
    kelas: "null"
  })
  const [tugas, setTugas] = React.useState({})

  const getData = () => {
    fetch("/api?for=data&&user="+user)
    .then(res => res.json())
    .then(data => { if(data.uname) setUserData(data) })
  }

  React.useEffect(
    fetch("/api?for=tugas&&kelas="+userData.kelas)
    .then(res => res.json())
    .then(data => { if(data.idname) setTugas(data) })
  , [userData])

  window.onload = () => getData()


  if(user != null){
    return (
      <div className="dashboard">
        <div className="card">
          <h1>Hello {userData.name}</h1>
          Welcome to React Test App<br />
          <div class="data-diri">
            Nama: {userData.name}<br />
            Absen: {userData.absen}<br />
            Skor: {userData.skor}<br />
            Kelas: {userData.kelas}
          </div>
        </div>
      </div>
    )
  }
  else
    return(
      <div className="dashboard">
        <div className="card">
          <h1>Syscuhl App</h1>
          <b>Wellcome to E-Syschool</b><br />
          You have to login before use our service.<br />
          Login on <a href="login">here</a>
          <br />{process.env}
        </div>
      </div>
    )
}

export default Index
