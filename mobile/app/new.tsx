import { Switch, Text, TouchableOpacity, View, TextInput, ScrollView, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { api } from "../src/lib/api";
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from "expo-secure-store"
import Logo from "../src/assets/logo.svg"
import Icon from "@expo/vector-icons/Feather"


export default function NewMemory(){

    const router = useRouter()

    const {bottom, top} = useSafeAreaInsets()
    const [isPublic, setIsPublic] = useState(false)
    const [content, setContent] = useState("")
    const [preview, setPreview] = useState<string | null>()

    async function openImageSelector(){
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            })

            if(result.assets[0]){
                setPreview(result.assets[0].uri)
            }
        } catch (error) {
            
        }        
    }

    async function handleCreateMemory(){
        const token = await SecureStore.getItemAsync("token")
        let fileURL = ''

        if (preview) {
            const uploadFormData = new FormData()

            uploadFormData.append("file", {
                uri: preview,
                name:"file.jpg",
                type: "image/jpeg"
            } as any)

            const uploadResponse = await api.post("/upload", uploadFormData, {
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            })

            fileURL = uploadResponse.data.fileURL
        }


        await api.post("/memories", {
            content,
            isPublic,
            coverUrl: fileURL
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        router.push("/memories")
    }

    return(
        <ScrollView className="flex-1 px-8" contentContainerStyle={{paddingBottom: bottom, paddingTop: top}}>
            <View className="flex-row items-center justify-between mt-4">
                <Logo/>

                <Link href="/memories" asChild>
                    <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
                        <Icon name="arrow-left" size={16} color={"#FFF"}/>
                    </TouchableOpacity>
                </Link>
            </View>

            <View className="mt-6 space-y-6">
                <View className="flex-row items-center gap-2">
                    <Switch value={isPublic} onValueChange={setIsPublic} thumbColor={ isPublic ? "#9B79EA" : "#9E9EA0"} trackColor={{false: "#767577", true: "#48307e"}}/>

                    <Text className="font-body text-base text-gray-200">
                        Tornar memória pública
                    </Text>
                </View>

                <TouchableOpacity className="h-32 justify-center rounded-lg border border-dashed border-gray-500 bg-black/20 items-center" activeOpacity={0.7} onPress={openImageSelector}>
                    

                    {preview ? 
                        <Image source={{uri: preview}} className="h-full w-full rounded-lg object-cover"/>
                    

                    : <View className="flex-row items-center gap-2">
                        <Icon name="image" color="#FFF"/>
                        <Text className="font-body text-sm text-gray-200"> Adicionar foto ou vídeo de capa </Text>
                    </View>}
                </TouchableOpacity>

                <TextInput value={content} onChangeText={setContent} multiline className="p-0 font-body text-lg text-gray-50" placeholderTextColor="#56565a" placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre." textAlignVertical="top"/>

                <TouchableOpacity activeOpacity={0.7} className="rounded-full items-center self-end bg-green-500 px-5 py-2" onPress={handleCreateMemory}>
                    <Text className='font-alt text-sm uppercase text-black'>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}