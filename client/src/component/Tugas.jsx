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
  
  const [tugs, setTugs] = React.useState({})
  const [pilgan, setPilgan] = React.useState([])
  
  const soal = () => {
    if(tugs.soal)
      for(var i = 0; i < tugs.soal.length; i++){
        setPilgan(pilgan.concat("a"))

        const handleSoal = (e) => {
          var newpilgan = pilgan
          newpilgan[i] = e.target.value
          setPilgan(newpilgan)
        }

        return (
          <>
            <label className="soal">{tugs.soal[i][0]}</label><br />
            <input type="radio" value="a" checked={pilgan[i] === "a"} onChange={handleSoal} /><br />
            <input type="radio" value="b" checked={pilgan[i] === "b"} onChange={handleSoal} /><br />
            <input type="radio" value="c" checked={pilgan[i] === "c"} onChange={handleSoal} /><br />
            <input type="radio" value="d" checked={pilgan[i] === "d"} onChange={handleSoal} /><br />
            <br />
          </>
        )
      }
  }
  
  const getTugas = () => {
    fetch("/api?for=tugas&&id="+tid)
    .then(res => res.json())
    .then(data => { if(data) setTugs(data) })
  }
  
  window.onload = () => { getTugas() }

  return (
    <div className="tugas">
      <div class="card">
        <h1>{tugs.name}</h1>
        {() => soal()}
      </div>
    </div>
  )
}

export default Tugas
