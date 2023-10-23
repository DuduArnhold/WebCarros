import { Container } from "../../../components/container"

import { DashboardHeader } from "../../../components/panelHeader"

import { FiUpload } from "react-icons/fi";

import { useForm } from "react-hook-form";

import { Input } from "../../../components/input";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

export function New() {
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
                


            </div>




        </Container>
        
    )
  }
  

  