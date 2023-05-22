import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from "expo-secure-store"

import { api } from '../src/lib/api';
import Logo from "../src/assets/logo.svg"

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/8a4ac3d639ba280f1e9f',
};

export default function App() {

    const router = useRouter()

    const [, response, githubSignIn] = useAuthRequest(
        {
            clientId: '8a4ac3d639ba280f1e9f',
            scopes: ['identity'],
            redirectUri: makeRedirectUri({
                scheme: 'NLW 12 - Space Time'
            })
        },
        discovery
    );

    async function handleOAuth(code: string){
        const response = await api.post("register", {code})

        const { token } = response.data

        await SecureStore.setItemAsync("token", token)

        router.push("")
    }

    useEffect(() => {
        // console.log(makeRedirectUri({
        //   scheme: 'NLW 12 - Space Time'
        // }))

        if (response?.type === 'success') {
            const { code } = response.params;
            
            handleOAuth(code)
        }
    }, [response]);

    return (
        <View className='flex-1 items-center px-8 py-8'>
            <StatusBar style="light" />

            <View className='flex-1 items-center justify-center gap-6'>
                <Logo/>

                <View className='space-y-2'>
                <Text className='text-center font-title text-2xl leading-tight text-gray-50'> Sua cápsula do tempo </Text>

                <Text className='text-center font-body text-base leading-relaxed text-gray-100'> Colecione momentos marcantes da sua jornada e compartiulhe (se quiser) com o mundo! </Text>
                </View>

                <TouchableOpacity activeOpacity={0.7} className="rounded-full bg-green-500 px-5 py-2" onPress={() => githubSignIn()}>
                    <Text className='font-alt text-sm uppercase text-black'>Cadastrar lembrança</Text>
                </TouchableOpacity>

            </View>

            <Text className='text-center font-body text-sm leading-relaxed text-gray-200'>Feito na NLW #12 da Rocketseat</Text>
        </View>
    );
}