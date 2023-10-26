
import { useEffect, useState, useContext } from "react";

import { Container } from "../../components/container";

import { DashboardHeader } from "../../components/panelHeader";

import { FiTrash2 } from "react-icons/fi";

import { collection, getDocs, query, where } from "firebase/firestore";

import { db, storage } from "../../services/firebaseconnection";

import { AuthContext } from "../../context/authcontext";

interface CarProps{
    id: string;
    name: string;
    year: string;
    uid: string;
    price: string | number;
    city: string;
    km: string;
    images: carImagesProps[];
}

interface carImagesProps{
    name: string;
    uid: string;
    url: string;
}



export function Dashboard() {

    const { user } = useContext(AuthContext)

    const [cars, setCars] = useState<CarProps[]>([]);

    useEffect (() => {
        async function loadCars(){

            if(!user?.uid){
                return;
            }

            const carsRef = collection(db, "cars")
            const queryRef = query(carsRef, where("uid", "==", user.uid))
            getDocs(queryRef)
            .then((snapshot) => {
                const listCars = [] as CarProps[];
                    snapshot.forEach(doc => {
                        listCars.push({
                            id: doc.id,
                            name: doc.data().name,
                            year: doc.data().year,
                            uid: doc.data().uid,
                            price: doc.data().price,
                            city: doc.data().city,
                            km: doc.data().km,
                            images: doc.data().images,
                        })
                    })

                    setCars(listCars);
                    console.log(listCars)




            })
            .catch((error) => {
                console.log("Erro ao carregar carro do banco de dados ")
                console.log(error)
            })
        }

        loadCars();
    }, [user])




    return (
        <Container>

            <DashboardHeader/>

            <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <section className="w-full bg-white rounded-lg relative">

                    <button 
                    onClick={ () => {} }
                    className="absolute bg-white w-14 h-14 rounded-full flex items-center justify-center
                    right-2 top-2 drop-shadow
                    ">
                        <FiTrash2 size={26} color="#000"/>
                    </button>
                    <img
                        className=" w-full rounded-lg mb-2 max-h-70"
                        src="https://firebasestorage.googleapis.com/v0/b/webcarros2.appspot.com/o/images%2FBCIJGK2NIWSyigsUGEdo0A1RKRu2%2F3c31d1b0-497c-466f-a693-711bcaa3d564?alt=media&token=514b482b-460b-4d5a-8004-b9457be4d700"

                    />
                    <p className="font-bold mt-1 px-2 mb-2">
                        Nissan Versa
                    </p>
                    <div className="flex flex-col px-2">
                        <span className="text-zinc-700">
                            Ano 2010/2010   |   230.000km
                        </span>
                        <strong className="text-black font-bold mt-4">
                            R$ 150.000
                        </strong>

                    </div>

                    <div className="w-full h-px bg-slate-200 my-2"></div>
                    <div className="px-2 pb-2">
                        <span className="text-black">Campo Grande - MS</span>
                    </div>

                </section>

            </main>
            


        </Container>
        
    )
  }
  

  