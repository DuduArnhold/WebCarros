import { Container } from "../../../components/container"

import { DashboardHeader } from "../../../components/panelHeader"

import { FiUpload } from "react-icons/fi";

import { useForm } from "react-hook-form";

import { Input } from "../../../components/input";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";





const schema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório"),
    model: z.string().min(1, "O campo modelo é obrigatório"),
    year: z.string().min(1, "O campo Ano do veiculo é obrigatório"),
    km: z.string().min(1, "O campo Km do veiculo é obrigatório"),
    price: z.string().min(1, "O Preço do veiculo é obrigatório"),
    city: z.string().min(1, "O campo cidade é obrigatório"),
    whatsapp: z.string().min(1).refine((value) => /^(\d{11,12})$/.test(value),{
        message: "Número de telefone inválido"
    }),
    description: z.string().min(1, "O campo de descrição do veiculo é obrigatório"), 
    
})

type FormData = z.infer< typeof schema >

export function New() {

    
    const { register, handleSubmit, formState: {errors}, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    function onSubmit(data: FormData){
        console.log(data)
    }




    return (
        <Container>

            <DashboardHeader/>
            
            <div className=" w-full bg-white p-3 flex flex-col sm:flex-row items-center gap-2" >
                <button className=" border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md-48">
                    <div className="absolute cursor-pointer">
                        <FiUpload size={30} color="#000"/>
                    </div>

                    <div className="cursor-pointer">
                        <input type="file" accept="image/*" className=" opacity-0 cursor-pointer">
                        
                        </input>
                    </div>
                    
                </button>
            </div>


            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
                <form className="w-full " onChange={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <p className="mb-2 font-medium "> Nome do Carro:  </p>
                        <Input
                            type="text"
                            register={register}
                            name="name"
                            error={errors.name?.message}
                            placeholder="Ex: Onix 1.0"
                        />
                    </div>

                    <div className="mb-3">
                        <p className="mb-2 font-medium "> Modelo do Carro:  </p>
                        <Input
                            type="text"
                            register={register}
                            name="model"
                            error={errors.model?.message}
                            placeholder="Ex: 1.0 flex manual"
                        />
                    </div>

                    <div className="flex w-full mb-3 flex-grow items-center gap-4">
                    <div className="w-full">
                        <p className="mb-2 font-medium "> Ano:  </p>
                        <Input
                            type="text"
                            register={register}
                            name="year"
                            error={errors.year?.message}
                            placeholder="Ex: 2010"
                        />
                    </div>

                    <div className="w-full">
                        <p className="mb-2 font-medium "> Km:  </p>
                        <Input
                            type="text"
                            register={register}
                            name="km"
                            error={errors.km?.message}
                            placeholder="Ex: 23.250"
                        />
                    </div>
                    </div>


                    <div className="flex w-full mb-3 flex-grow items-center gap-4">
                    <div className="w-full">
                        <p className="mb-2 font-medium "> Telefone | whatsapp:  </p>
                        <Input
                            type="text"
                            register={register}
                            name="whatsapp"
                            error={errors.whatsapp?.message}
                            placeholder="Ex: 054999839523"
                        />
                    </div>

                    <div className="w-full">
                        <p className="mb-2 font-medium "> Cidade:  </p>
                        <Input
                            type="text"
                            register={register}
                            name="city"
                            error={errors.city?.message}
                            placeholder="Ex: Espumoso-RS"
                        />
                    </div>
                    </div>

                    <div className="mb-3">
                        <p className="mb-2 font-medium "> Preço do Carro:  </p>
                        <Input
                            type="text"
                            register={register}
                            name="price"
                            error={errors.price?.message}
                            placeholder="Ex: 45.000"
                        />
                    </div>

                    <div className="mb-3">
                        <p className="mb-2 font-medium "> Descrição:  </p>
                        <textarea
                            className="border-2 w-full rounded-md h-24 px-2"
                            {
                                ...register("description")
                            }
                            name="description"
                            id="description"
                            placeholder="Descrição completa do veiculo"
                            
                        />
                        {errors.description && <p className="mb-1 text-red-500">{errors.description.message}</p>}
                    </div>

                    <button type="submit" className="w-full h-10 rounded-md bg-zinc-900 text-white font-medium mt-4">
                            Cadastrar
                    </button>



                </form>
            </div>




        </Container>
        
    )
  }
  

  