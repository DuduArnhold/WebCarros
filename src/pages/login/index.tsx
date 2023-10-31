import logo from "../../assets/logo.svg";
import {useEffect } from "react";

import { Container } from "../../components/container";
import { Input } from "../../components/input";
import { useForm} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth }  from "../../services/firebaseconnection";


import { Link, useNavigate} from "react-router-dom";

const schema = z.object({
   email: z.string().email("Insira um email válido").nonempty("O campo email é obrigatório"),
   password: z.string().nonempty("O campo senha é obrigatório")
})

type FormData = z.infer<typeof schema>




export function Login() {

   const navigate = useNavigate()

   const { register, handleSubmit, formState: { errors }} = useForm<FormData>({
      resolver: zodResolver(schema),
      mode: "onChange",
   })


   useEffect(() => {
      async function handleLognOut(){
         await signOut(auth)
      }
      handleLognOut();

   }, []) 


   function onsubmit(data: FormData){
      signInWithEmailAndPassword(auth, data.email, data.password )
      .then((user) => {
         console.log("Logado com sucesso")
         console.log(user)
         toast.success("Login Efetuado com Sucesso")
         navigate("/dashboard", {replace: true})
         

      })
      .catch((error) => {
         console.log("Erro do efetuar Login" + error)
         toast.error("Erro ao efetuar Login")
      })
   }

    return (
        <Container>
        <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
         <Link to="/" className=" mb-6 max-w-sm w-full">
            <img src={ logo } alt="logo webcarros"  className="w-full"/>
         </Link>


         <form className="bg-white max-w-xl w-full rounded-lg p-5"
            onSubmit={handleSubmit(onsubmit)}
         >
            <div className="mb-3">
               <Input 
               type="email"
               placeholder="Digite seu email..."
               name="email"
               error={errors.email?.message}
               register={register}
            
            />
            </div>
            <div className="mb-3">
               <Input 
               type="password"
               placeholder="Digite sua senha..."
               name="password"
               error={errors.password?.message}
               register={register}
            
            />
            </div>


            <button type="submit" className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium ">
               Acessar
            </button>

            <Link to="/register" className=" mt-2">
               Não possui uma conta? Cadastre-se
            </Link>
         
         </form>
        </div>
        </Container>
        
    )
  }
  

  