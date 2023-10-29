import { useEffect, useState } from "react";

import { Container } from "../../components/container";

import { FaWhatsapp } from "react-icons/fa";

import { useParams } from "react-router-dom";

import { getDoc, doc } from "firebase/firestore";

import { db } from "../../services/firebaseconnection";
interface CarProps{
    id: string;
    name: string;
    year: string;
    uid: string;
    price: string | number;
    city: string;
    km: string;
    owner: string;
    created: string;
    model: string;
    whatsapp: string;
    description: string;
    images: carImagesProps[];
}

interface carImagesProps{
    name: string;
    uid: string;
    url: string;
}




export function CarDetail() {

    const [car, setCar] = useState<CarProps>();
    const { id } = useParams();


    useEffect(() => {

        async function loadCar(){
            if(!id){return}
            
            const docRef = doc(db, "cars", id)
            getDoc(docRef)
            .then((snapshot) => {
                setCar({
                    id: snapshot.id,
                    name: snapshot.data()?.name,
                    year: snapshot.data()?.year,
                    uid: snapshot.data()?.uid,
                    price: snapshot.data()?.price,
                    city: snapshot.data()?.city,
                    km: snapshot.data()?.km,
                    owner: snapshot.data()?.owner,
                    created: snapshot.data()?.created,
                    model: snapshot.data()?.model,
                    whatsapp: snapshot.data()?.whatsapp,
                    images: snapshot.data()?.images,
                    description: snapshot.data()?.description,

                })
            })

        }

        loadCar();

    }, [id])

    return (
        <Container>
            <h1>SLIDER</h1>

            {
                car && (
                    <main className="w-full bg-white rounded-lg p-6 my-4">

                        <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
                            <h1 className="font-bold text-3xl text-black">
                                {car?.name}
                            </h1>
                            <h1 className="font-bold text-3xl text-black">
                                R$ {car?.price}
                            </h1>
                        </div>
                        <p>{car?.model}</p>
                        
                        
                        <div className="flex w-full gap-6 my-4 ">
                            <div className="flex flex-col gap-4">
                                <div>
                                    <p>
                                        Cidade: 
                                    </p>
                                    <strong>{ car?.city }</strong>
                                </div>
                                
                                <div>
                                    <p>
                                        Ano: 
                                    </p>
                                    <strong>{ car?.year }</strong>
                                </div>
                            </div>


                            <div className="flex flex-col gap-4">
                                <div>
                                    <p>
                                        Km: 
                                    </p>
                                    <strong>{ car?.km }</strong>
                                </div>
                                
                            </div>

                        </div>
                        <strong>Descrição: </strong>
                        <p className="mb-6">{ car?.description }</p>

                        <strong>Telefone | Whatsapp</strong>
                        <p>{car?.whatsapp}</p>


                        <a className="bg-green-500 w-full text-white flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-lg font-medium cursor-pointer"> 
                        Conversar com vendedor
                        <FaWhatsapp size={26} color="#fff"/>
                        </a>
                    </main>
                )
            }
        </Container>
        
    )
  }
  

  