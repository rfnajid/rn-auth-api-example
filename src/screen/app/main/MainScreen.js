import React, { Component } from "react";
import { View, Text } from 'react-native';
import { Button} from 'react-native-elements';
import LoginService from "../../auth/login/LoginService";

export class MainScreen extends Component {

    logout = () => {
        LoginService.logout();
    }

    render(){
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Main Screen</Text>
                <Button
                    title="Logout"
                    onPress={this.logout}
                />
            </View>
        )
    }
}