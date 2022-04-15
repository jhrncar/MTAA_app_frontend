import EncryptedStorage from 'react-native-encrypted-storage';
import React, {createContext, useEffect, useState} from 'react';
import Register from '../screens/Register'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLogged, setLogged] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  
  const register = (firstname, lastname,name, email, password,city,street,zipcode,phone,district) => {
    setIsLoading(true);
    fetch('http://192.168.100.203:8000/register/', {
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
        district:district,
      }),
    })
    .then(value => {
      //tu budu nejake IFy na response
      setLogged(true);
      EncryptedStorage.setItem(
        'loggedIn',
       // JSON.stringify({
         // loggedIn: true,
       // }),
      );
      setIsLoading(false);
    })
    .catch(error => {
      console.log(error.response);
    });
      

    console.log('login');
  };


  const login = (username, password) => {
    setIsLoading(true);
    fetch('http://192.168.1.12:8000/login/', {
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
        //tu budu nejake IFy na response
        setLogged(true);
        EncryptedStorage.setItem(
          'loggedIn',
          JSON.stringify({
            loggedIn: true,
          }),
        );
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });

    console.log('login');
  };

  const logout = () => {
    setIsLoading(true);

    fetch('http://192.168.1.12:8000/logout/', {
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
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let userInfo = await EncryptedStorage.getItem('loggedIn');
      //userInfo = JSON.parse(userInfo).loggedIn;

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

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLogged,
        register,
        login,
        logout,
        splashLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
