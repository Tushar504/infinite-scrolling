import { useEffect, useState } from "react"
import styled from "styled-components"
const Div=styled.div`
width:500px;
height:600px;
overflow:scroll`

export const Scrollbar=()=>{
    const [data,setData]=useState([])
    const [page,setPage]=useState(1)
   
    const [count,setCount]=useState(0)
       const scroll=(target)=>{
       
       let height=target.scrollTop-(600*count)
       
       let scrollHeight=target.clientHeight
       
      console.log(height,scrollHeight)
       let id;
            if(height>=scrollHeight){
                  
                  setCount(count+1) 
               
              if(id){
                  clearTimeout(id)
              }
             
              id=setTimeout(()=>{
                  console.log("Yes")
                  return getData()
              },200)
            
            
            }
       }
       useEffect(()=>{
               getData()
       },[])
       const getData=async()=>{
             try {
                 let res=await fetch(`http://localhost:8080/list?_page=${page}&_limit=20`)
                 
                 let Data=await res.json()
                 setData([...data,...Data])
                 setPage(page+1)
             } 
             catch (error) {
                 console.log(error)
             }
       }
    return (
        <Div onScroll={(e)=>scroll(e.target)}>
           {data.map((e)=>{
               return <h1 key={e.id}>{e.student}</h1>
           })}
        </Div>
    )
}