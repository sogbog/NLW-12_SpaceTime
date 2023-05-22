import { Link, useRouter } from "expo-router";
import { TouchableOpacity, View, Text, Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { api } from "../src/lib/api";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br"
import Icon from "@expo/vector-icons/Feather"
import * as SecureStore from "expo-secure-store"
import Logo from "../src/assets/logo.svg"

dayjs.locale(ptBr)

interface Memory {
    coverUrl: string,
    excerpt: string,
    createdAt: string,
    id: string
}


export default function Memories(){

    const {bottom, top} = useSafeAreaInsets()
    const router = useRouter()
    const [memories, setMemories] = useState<Memory[]>([])

    async function signOut(){
        await SecureStore.deleteItemAsync("token")

        router.push("/")
    }

    async function loadMemories() {
        const token = await SecureStore.getItemAsync("token")

        const res = await api.get("/memories", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setMemories(res.data)
    }

    useEffect(() =>{
        loadMemories()
    }, [])

    return(
        <ScrollView className="flex-1" contentContainerStyle={{paddingBottom: bottom, paddingTop: top}}>

            <View className="flex-row items-center justify-between mt-4 px-8 gap-1">
                <Logo/>

                <View className=" flex-row gap-2">

                    <Link href="/new" asChild>
                        <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
                            <Icon name="plus" size={16} color={"#000"}/>
                        </TouchableOpacity>
                    </Link>

                    <TouchableOpacity onPress={signOut} className="h-10 w-10 items-center justify-center rounded-full bg-red-500">
                        <Icon name="log-out" size={16} color={"#000"}/>
                    </TouchableOpacity>
                    
                </View>
            </View>

            <View className="mt-6 space-y-10">

                    {memories.map(mem => 

                    <View key={mem.id} className="space-y-4" >
                        
                        <View className="flex-row items-center gap-2">
                            <View className="h-px w-5 bg-gray-50"/>
                            
                            <Text className="font-body text-xs text-gray-100">
                                {dayjs(mem.createdAt).format("D[ de ]MMM[, ]YYYY")}
                            </Text>

                        </View>
                        
                        <View className="space-y-4 px-8">
                            <Image source={{uri: mem.coverUrl}} className="aspect-video w-full rounded-lg"/>

                            <Text className="font-body text-base leading-relaxed text-gray-100">
                                {mem.excerpt}
                            </Text>

                            <Link href="/memories/id">
                                <TouchableOpacity className="flex-row items-center gap-2">
                                    <Text className="font-body text-sm text-gray-200">Ler mais</Text>
                                    <Icon name="arrow-right" size={16} color="#9E9EA0"/>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                    )}

                </View>
        </ScrollView>
    )
}