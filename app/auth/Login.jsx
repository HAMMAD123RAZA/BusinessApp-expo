import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/Firebase'
import { Colors } from '../../constants/Colors'

const Login = () => {
  const [Email, setEmail] = useState()
  const [Password, setPassword] = useState()
  const [error, seterror] = useState()
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, Email, Password)
      router.replace('/')

    } catch (err) {
      seterror(err.message)
      // console.log(error)
    }
  }

  return (
    <View className=" h-[1000vh] " style={{ backgroundColor: Colors.primary }}>
      <Text className=' pt-24 text-center text-4xl font-bold ' style={{color:'white'}} >Login Now</Text>
          {/* <Text className=' pt-4 text-center text-3xl font-bold ' style={{color:'white'}} >Login Now</Text> */}

      <View className="mx-10 my-4">
        <TextInput
          placeholderTextColor="white"
          className="p-3 m-4  border-4 border-white rounded-lg"
          placeholder="Email"
          value={Email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholderTextColor="white"
          className="p-3 m-4 border-4 border-white rounded-lg"
          placeholder="Password"
          value={Password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View className="flex-row gap-2 px-4 py-2">
          <Text className="text-white font-bold px-2">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push('/auth/Register')}>
            <Text className="text-white font-bold">Register</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogin}>
          <Text
            style={{
              backgroundColor: 'white',
              padding: 14,
              marginHorizontal: 8,
              borderRadius: 45,
              alignItems: 'center',
              marginTop: 12,
              textAlign: 'center',
              color: Colors.primary,
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        {error ? <Text className="text-red-600 ">{error}</Text> : null}
      </View>
    </View>
  )
}

export default Login
