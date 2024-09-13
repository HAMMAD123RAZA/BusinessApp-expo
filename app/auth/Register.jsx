import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../config/Firebase'
import { Colors } from '../../constants/Colors'

const Register = () => {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Name, setName] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleReg = async () => {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        Email,
        Password
      )
      const user = credential.user
      await updateProfile(user, { displayName: Name })
      router.replace('/')
    } catch (err) {
      console.error('Firebase Error:', err.code, err.message)
      setError(err.message)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        padding: 20,
      }}
    >
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>
Welcome
        </Text>

        <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>
          Business Family
        </Text>
        {/* <Text style={{ fontSize: 24, color: 'white', marginTop: 10 }}>
          Create Your Account
        </Text> */}
      </View>

      <View style={{ marginVertical: 20 }}>
        <TextInput
          placeholder="Name"
          placeholderTextColor="white"
          value={Name}
          onChangeText={setName}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            paddingVertical: 12,
            paddingHorizontal: 15,
            borderRadius: 10,
            marginBottom: 15,
            color: 'white',
            borderWidth: 1,
            borderColor: 'white',
          }}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="white"
          value={Email}
          onChangeText={setEmail}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            paddingVertical: 12,
            paddingHorizontal: 15,
            borderRadius: 10,
            marginBottom: 15,
            color: 'white',
            borderWidth: 1,
            borderColor: 'white',
          }}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="white"
          value={Password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            paddingVertical: 12,
            paddingHorizontal: 15,
            borderRadius: 10,
            marginBottom: 20,
            color: 'white',
            borderWidth: 1,
            borderColor: 'white',
          }}
        />
        {error ? (
          <Text style={{ color: 'red', marginBottom: 15 }}>{error}</Text>
        ) : null}

        <TouchableOpacity
          onPress={handleReg}
          style={{ backgroundColor: 'white', padding: 14, borderRadius: 50 }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: Colors.primary,
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => router.push('/auth/Login')}>
          <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 5 }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Register
