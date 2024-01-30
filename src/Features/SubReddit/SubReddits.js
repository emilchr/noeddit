import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchLinks, loadLinks } from "./subRedditsSlice";


function SubReddits() {

    const dispatch = useDispatch();

    useEffect(() => {

    }, [dispatch])

  return (
    <div>SubReddits</div>
  )
}

export default SubReddits