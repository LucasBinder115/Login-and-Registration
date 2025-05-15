import {useState} from "react"
import axios from 'axios'
import {toast} from 'react-hot-toast';

export default function Login() {

    const [data, setData] = useState ({
        email:'',
        password:'',
    })

    const loginUser = async (e) => {
        e.preventDefault();
        const {email, password} = data
        try{
            const {data} = await axios.post('/login', {
                email, password
            })
            if(data.error){
                toast.error(data.error)
            } else {
                setData({})
                toast.success('Login sucessfull')
                navigate('/login')
            }
        } catch (error){
            console.log(error)
        }
    }

  return (
    <div>
        <form onSubmit={loginUser}>
        <label>Email</label>
            <input type='email' placeholder='inserir email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}></input>
            <label>Senha</label>
            <input type='password' placeholder='inserir senha' value={data.passsword} onChange={(e) => setData({...data, passsword: e.target.value})}></input>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}
