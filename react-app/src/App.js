import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      data:[],
      work:'',
      editing:false,
      id:null
    }
  
    // this.handleEvent = this.handleEvent.bind(this)
  }
  fetchdata = async() => {
    let res = await fetch('http://127.0.0.1:8000/api/')
    let data = await res.json()
    this.setState({data:data})
    console.log(data)
  }

  componentDidMount(){
    this.fetchdata()
  }

  submitData = () => {
    var url
    if(this.state.editing){
      url = `http://127.0.0.1:8000/api/edit/${this.state.id}`
    }
    else{
      url = 'http://127.0.0.1:8000/api/add/'
    }
    fetch(url,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({'work':this.state.work})
    })
    .then(() => {
      window.location.reload()
    })
}
UnderLineData = (id,task,stats) => {
  fetch(`http://127.0.0.1:8000/api/edit/${id}`,{
    method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify({'completed':!stats,'work':task})
  })
  .then(() => {
    window.location.reload()
  })
}

DeleteData = (id) => {
  fetch(`http://127.0.0.1:8000/api/delete/${id}`,{
    method:'DELETE',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify({})
  })
  .then(() => {
    window.location.reload()
  })
}

  render() { 
    
    return (
      <div>
        <h1>{this.state.data.length === 0 ? 'No work yaay':'List - '+ this.state.data.length}</h1>
        <form>
            <input type='text' placeholder='Todo' onChange={(e) => {this.setState({'work':e.target.value})}} value={this.state.work}/>
            <button onClick={() => {this.submitData()}}> {this.state.editing ? `edit` : 'submit'} </button>
        </form>
        <div className='Content'>
            {this.state.data.map(x => {
                return <div className='colorBoi'>
                    {
                      x.completed ? <>
                      <h1 style={{textDecoration:'line-through'}}>{x.work}</h1>
                      <div>
                    <button onClick={() => {this.UnderLineData(x.id,x.work,x.completed)}}>Not Done?</button>
                    <button onClick={()=>{this.DeleteData(x.id)}}>Delete</button>
                    </div>
                      </>
                      :
                      <>
                      <h1>{x.work}</h1>
                    <div>
                    <button onClick={() => {this.setState({editing:true,id:x.id,work:x.work})}}>Edit</button>
                    <button onClick={() => {this.UnderLineData(x.id,x.work,x.completed)}}>Done</button>
                    <button onClick={()=>{this.DeleteData(x.id)}}>Delete</button>
                    </div>
                      </>
                    }

                </div>
            })}
        </div>
      </div>
    )
  }
}

export default App
