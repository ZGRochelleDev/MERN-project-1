import { useState } from 'react'
//import logo from './logo.svg';

function App() {


  /* below are state variables */
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  /* front end communicating w/backend*/
  async function loginUser(event){
    event.preventDefault()

    const response = await fetch('http://localhost:1337/api/login', {
      // need to tell the backend what the content type is
      // lots of different content types to send
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      }),
    })
    const data = await response.JSON()

    if(data.user){
      alert('Login successful');
      window.location.href = '/dashboard';
    }
    else{
      alert('Check username and password');
    }

    console.log(data)
  }

  return <div>
    <h1>Login</h1>
    <form onSubmit={loginUser}>
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
      <input type="submit" value="Login" />
    </form>
  </div>




}

export default App;
