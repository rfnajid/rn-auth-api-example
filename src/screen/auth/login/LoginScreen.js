import React, { Component } from "react";
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Alert } from "react-native";
import LoginService from "./LoginService";
import NavigationService from "../../../service/NavigationService";
import StorageService from "../../../service/StorageService";
import { ACCESS_TOKEN } from "../../../config/const";

export class LoginScreen extends Component {

    state = {
        email: '',
        password: '',
        isLoading: false
    }

    login = () => {

        if(this.state.isLoading) return;

        this.setState({isLoading:true});

        console.log('trying login with email '+this.state.email+', password : ' + this.state.password);

        LoginService.login(this.state.email,this.state.password).then((res)=>{
            if(res.status===200){
               this.loginSuccess(res.data);
            }
        }, (err)=>{
            msg = "Can't connect to server";
            this.setState({isLoading:false});

            if(err.response.status===404){
                msg = err.response.data.message;
            }
            Alert.alert("Login Failed",msg);
        })
    }

    loginSuccess = (data) => {
        console.log("successfully logged in!!!");
        token = data.data.token;

        console.log('token : ',token);
        //save token
        StorageService.set(ACCESS_TOKEN, token);

        //navigate to main
        NavigationService.navigate('App');
    }

    render(){
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Login Screen</Text>
                <Input
                    placeholder='Your Email'
                    onChangeText={(text) => this.setState({email:text})}
                    value={this.state.email}/>
                <Input
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password:text})}
                    value={this.state.password}/>
                <Button
                    title="Login"
                    loading={this.state.isLoading}
                    onPress={this.login}
                />
            </View>
        )
    }
}