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

  return (
    <div className="tugas">
      <div class="card">
        <h1></h1>
      </div>
    </div>
  )
}

export default Tugas
