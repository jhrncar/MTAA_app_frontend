import EncryptedStorage from 'react-native-encrypted-storage';
import React, {createContext, useEffect, useState} from 'react';
import Register from '../screens/Register';
import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLogged, setLogged] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [isError, setError] = useState(false);

  const register = (
    firstname,
    lastname,
    name,
    email,
    password,
    city,
    street,
    zipcode,
    phone,
    district,
  ) => {
    setIsLoading(true);
    fetch('http://147.175.160.9:8000/register/', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstname,
        last_name: lastname,
        email: email,
        user_name: name,
        password: password,
        city: city,
        street: street,
        zip_code: zipcode,
        phone: phone,
        district: district,
      }),
    })
      .then(value => {
        if (value.status < 300) {
          setLogged(true);
          EncryptedStorage.setItem(
            'loggedIn',
            JSON.stringify({
              loggedIn: true,
            }),
          );
          EncryptedStorage.setItem(
            'username',
            JSON.stringify({
              username: name,
            }),
          );
          setIsLoading(false);
        } else {
          setError(true);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const login = (username, password) => {
    setIsLoading(true);
    fetch('http://147.175.160.9:8000/login/', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: username, //tu bude premenna username
        password: password, //tu bude premenna password
      }),
    })
      .then(value => {
        if (value.status < 300) {
          setLogged(true);
          EncryptedStorage.setItem(
            'loggedIn',
            JSON.stringify({
              loggedIn: true,
            }),
          );
          EncryptedStorage.setItem(
            'username',
            JSON.stringify({
              username: username,
            }),
          );
          setIsLoading(false);
        } else {
          setError(true);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const logout = () => {
    setIsLoading(true);

    fetch('http://147.175.160.9:8000/logout/', {
      method: 'POST',
    })
      .then(value => {
        //tu budu nejake IFy na response
        setLogged(false);
        EncryptedStorage.setItem(
          'loggedIn',
          JSON.stringify({
            loggedIn: false,
          }),
        );
        EncryptedStorage.setItem(
          'username',
          JSON.stringify({
            username: null,
          }),
        );
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const errorAlert = () => {
    console.log('error f');
    Alert.alert(
      'Chyba',
      'Nespr??vne prihlasovacie ??daje',
      [
        {
          text: 'OK',
          onPress: () => {
            setError(false);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await EncryptedStorage.getItem('loggedIn');
      userInfo = JSON.parse(userInfo)?.loggedIn;
      if (userInfo) {
        console.log(userInfo);
        setLogged(userInfo);
      }
      setSplashLoading(false);
    } catch (e) {
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    console.log('checkEffect');
    isLoggedIn();
  }, []);

  useEffect(() => {
    console.log('error eff');
    if (isError) {
      errorAlert();
    }
  }, [isError]);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLogged,
        register,
        login,
        logout,
        splashLoading,
        errorAlert,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
