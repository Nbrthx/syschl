import React from "react"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const Tugas = () => {
  const user = cookies.get("user")
  if(user == null){
    window.location.href = "/login"
    return null
  }

  const urls = new URLSearchParams(window.location.search)
  const tid = urls.get("id")
  
  const [tugas, setTugas] = React.useState({})
  const [pilgan, setPilgan] = React.useState([])
  
  const getTugas = () => {
    fetch("/api?for=tugas&&id="+tid)
    .then(res => res.json())
    .then(data => setTugas(data))
  }
  
  const soal = () => {
    if(tugas.soal)
      for(var i = 0; i < tugas.soal.length; i++){
        setPilgan(pilgan.concat("a"))
        var handleSoal = (e) => {
          var newpilgan = pilgan
          newpilgan[i] = e
          setPilgan(newpilgan)
        }

        return (
          <>
            <label className="soal">{tugas.soal[i][0]}</label><br />
            <input type="radio" value="a" checked={pilgan[i] === "a"} onChange={handleSoal("a")} /><br />
            <input type="radio" value="b" checked={pilgan[i] === "b"} onChange={handleSoal("b")} /><br />
            <input type="radio" value="c" checked={pilgan[i] === "c"} onChange={handleSoal("c")} /><br />
            <input type="radio" value="d" checked={pilgan[i] === "d"} onChange={handleSoal("d")} /><br />
            <br />
          </>
        )
      }
  }
  
  window.onload = () => getTugas()

  return (
    <div className="tugas">
      <div class="card">
        <h1>{tugas.name}</h1>
        {soal()}
      </div>
    </div>
  )
}

export default Tugas
