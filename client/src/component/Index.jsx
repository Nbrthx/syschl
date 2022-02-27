import React from "react"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const Index = () => {
  const user = cookies.get("user")
  if(user == null){
    window.location.href = "/login"
    return null
  }

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
    if(userData.kelas) fetch("/api?for=tugas&&kelas="+userData.kelas)
      .then(res => res.json())
      .then(data => { if(data.id) setTugas(data) })
  , [userData])

  window.onload = () => getData()


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

export default Index
