import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import logo from './logo.svg';

function App() {
  /* below are state variables */
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  /* front end communicating w/backend*/
  async function registerUser(event){
    event.preventDefault()

    const response = await fetch('http://localhost:1337/api/register', {
      // need to tell the backend what the content type is
      // lots of different content types to send
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response;

    if(data.status === 'ok'){
      navigate.push('/login')
    }

    console.log(data);
  }

  return (<div>
    <h1>Register</h1>
    <form onSubmit={registerUser}>
      <input
        value={name}
        onChange={(e)=> setName(e.target.value)}
        type="text"
        placeholder="Name"
      />
      <br />
      <input
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
      <br />
      <input
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <br />
      <input type="submit" value="Register" />
    </form>
  </div>
  )
}

export default App;
