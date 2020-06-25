import React from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';

import Confirm from '~/pages/NewAppointment/Confirm';
import SelectDateTime from '~/pages/NewAppointment/SelectDateTime';
import SelectProvider from '~/pages/NewAppointment/SelectProvider';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Routes() {
  const signed = useSelector((state) => state.auth.signed);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      {signed ? (
        <Tab.Navigator
          tabBarOptions={{
            keyboardHidesTabBar: true,
            activeTintColor: '#fff',
            inactiveTintColor: 'rgba(255, 255, 255, 0.7)',
            style: {
              backgroundColor: '#af3a55',
              borderTopWidth: 0,
            },
          }}
        >
          <>
            <Tab.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                title: 'Agendamentos',
                tabBarIcon: ({ color }) => (
                  <Icon name="event" size={20} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="NewAppointment"
              options={{
                unmountOnBlur: true,
                title: 'Agendar',
                tabBarIcon: ({ color }) => (
                  <Icon name="add-circle-outline" size={20} color={color} />
                ),
                tabBarVisible: false,
              }}
            >
              {() => (
                <Stack.Navigator
                  screenOptions={{
                    headerTitleAlign: 'center',
                    headerTransparent: true,
                    headerTintColor: '#FFF',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  }}
                >
                  <Stack.Screen
                    name="SelectProvider"
                    component={SelectProvider}
                    options={({ navigation }) => ({
                      title: 'Selecione o prestador',
                      headerLeft: () => (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('Dashboard');
                          }}
                        >
                          <Icon name="chevron-left" size={20} color="#fff" />
                        </TouchableOpacity>
                      ),
                    })}
                  />
                  <Stack.Screen
                    name="SelectDateTime"
                    component={SelectDateTime}
                    options={({ navigation }) => ({
                      title: 'Selecione o horário',
                      headerLeft: () => (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.goBack();
                          }}
                        >
                          <Icon name="chevron-left" size={20} color="#fff" />
                        </TouchableOpacity>
                      ),
                    })}
                  />
                  <Stack.Screen
                    name="Confirm"
                    component={Confirm}
                    options={({ navigation }) => ({
                      title: 'Confirmar agendamento',
                      headerLeft: () => (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.goBack();
                          }}
                        >
                          <Icon name="chevron-left" size={20} color="#fff" />
                        </TouchableOpacity>
                      ),
                    })}
                  />
                </Stack.Navigator>
              )}
            </Tab.Screen>
            <Tab.Screen
              name="Profile"
              options={{  unmountOnBlur: true }}
              component={Profile}
              options={{
                title: 'Meu perfil',
                tabBarIcon: ({ color }) => (
                  <Icon name="person" size={20} color={color} />
                ),
              }}
            />
          </>
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerTitle: '',
            headerTransparent: true,
            headerLeft: null,
          }}
        >
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
