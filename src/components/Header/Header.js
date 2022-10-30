import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Style from "./Header.module.scss";
// import { useNavigate } from "react-router-dom"
import { Store } from "../../store/index";

const Header = ({ children }) => {
  const [term, setTerm] = useState('')

  const navigate = useNavigate()
  const { globalState, setGlobalState } = useContext(Store)

  const handleSubmit = (e) => {
    e.preventDefault()
    setGlobalState({ type: 'SET_TERM', payload: { term } })
    navigate(`/search?query=${term}`)
  }

  useEffect(() => {
    setTerm(globalState.term)
  }, [])

  return (
    <div className={Style.header}>
      <div className={Style.item}>
        <Link to="/">VideoTube</Link>
      </div>
      <div className={Style.item}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="検索"
            onChange={e => setTerm(e.target.value)}
            value={term}
          />
          <button type="submit"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
        </form>
      </div>
    </div>
  );
}

export default Header;