import React, { Component } from "react";
import {
    View,
    ActivityIndicator,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Linking,
    BackHandler,
    Dimensions,
    TextInput
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import Tabs from "../home/customTab";
import ScrollableTabView from "@esteemapp/react-native-scrollable-tab-view";
import { Login } from "../../providers/steem/auth";
import { lookupAccounts } from "../../providers/steem/dsteem";
import { goToAuthScreens } from "../../navigation";

import RNRestart from "react-native-restart";
import { Navigation } from "react-native-navigation";
import FastImage from "react-native-fast-image";

class LoginPage extends Component {
    static get options() {
        return {
            _statusBar: {
                visible: true,
                drawBehind: false,
            },
            topBar: {
                animate: true,
                hideOnScroll: false,
                drawBehind: false,
                noBorder: true,
                visible: true,
                elevation: 0,
                leftButtons: {},
                rightButtons: [
                    {
                        id: "signup",
                        text: "Sign Up",
                        color: "#a7adaf",
                        marginRight: 50
                    }
                ],
            },
            layout: {
                backgroundColor: "#f5fcff",
            },
            bottomTabs: {
                visible: false,
                drawBehind: true,
            },
        };
    }
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.state = {
            username: "",
            password: "",
            isLoading: false,
            isUsernameValid: true,
            usernameBorderColor: "#c1c5c7",
            passwordBorderColor: "#c1c5c7"
        };
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", () => {
            Navigation.pop(this.props.componentId);
            return true;
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress");
    }

    doLogin = () => {
        this.setState({ isLoading: true });

        let password = this.state.password;
        let username = this.state.username;

        Login(username, password)
            .then(result => {
                if (result === true) {
                    RNRestart.Restart();
                }
            })
            .catch(err => {
                alert(err);
                this.setState({ isLoading: false });
            });
    };

    handleUsername = async (username) => {
        await this.setState({ username });
        let validUsers = await lookupAccounts(username);
        await this.setState({ isUsernameValid: validUsers.includes(username) });
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId === "signup") {
            Linking.openURL("https://signup.steemit.com/?ref=esteem")
            .catch(err => console.error('An error occurred', err));
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollableTabView
                    style={styles.tabView}
                    renderTabBar={() => (
                        <Tabs
                            style={styles.tabbar}
                            tabUnderlineDefaultWidth={100} // default containerWidth / (numberOfTabs * 4)
                            tabUnderlineScaleX={2} // default 3
                            activeColor={"#357ce6"}
                            inactiveColor={"#222"}
                        />
                    )}>
                    <View tabLabel="Sign in" style={styles.tabbarItem}>

                        <View
                            style={{
                                backgroundColor: '#f5f5f5',
                                height: 60,
                                borderBottomWidth: 2,
                                borderBottomColor: this.state.isUsernameValid ? (this.state.usernameBorderColor) : ('red'),
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                                marginHorizontal: 30,
                                marginVertical: 20,
                                flexDirection: 'row'
                             }}>
                            { (this.state.username.length > 2) ? (
                                <View style={{ flex: 0.15 }}>
                                    <FastImage 
                                        style={{ 
                                            width: 24,
                                            height: 24,
                                            borderRadius: 12,
                                            top: 15,
                                            marginLeft: 12,
                                        }}
                                        source={ { uri: `https://steemitimages.com/u/${this.state.username}/avatar/small`, priority: FastImage.priority.high } }
                                        resizeMode={FastImage.resizeMode.cover}
                                        />
                                </View>
                            ) : (
                                <Ionicons
                                    name="md-at"
                                    style={{
                                        flex: 0.15,
                                        fontSize: 25,
                                        top: 18,
                                        left: 12,
                                        color: "#c1c5c7",
                                    }}
                                />
                            )}
                            <TextInput
                                onFocus={() => this.setState({ usernameBorderColor: '#357ce6' })}
                                onSubmitEditing={() => this.setState({ usernameBorderColor: '#c1c5c7' })}
                                autoCapitalize="none"
                                placeholder="username"
                                editable={true}
                                textContentType='username'
                                onChangeText={text => { this.handleUsername(text) }}
                                value={this.state.username}
                                style={{ 
                                    height: 60,
                                    flex: 0.7
                                 }}/>

                            { (this.state.username.length > 0) ? (
                                <Ionicons
                                    onPress={() => this.setState({ username: '' })}
                                    name="md-close-circle"
                                    style={{
                                        flex: 0.15,
                                        fontSize: 25,
                                        top: 18,
                                        left: 8,
                                        color: "#c1c5c7",
                                    }}
                                /> 
                            ) : (
                                null
                            )}
                        </View>

                        <View
                            style={{
                                backgroundColor: '#f5f5f5',
                                height: 60,
                                borderBottomWidth: 2,
                                borderBottomColor: this.state.passwordBorderColor,
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                                marginHorizontal: 30,
                                marginVertical: 20,
                                flexDirection: 'row'
                             }}>
                            <Ionicons
                                name="md-lock"
                                style={{
                                    flex: 0.15,
                                    fontSize: 25,
                                    top: 18,
                                    left: 14,
                                    color: "#c1c5c7",
                                }}
                            />
                            <TextInput
                                onFocus={() => this.setState({ passwordBorderColor: '#357ce6' })}
                                onSubmitEditing={() => this.setState({ passwordBorderColor: '#c1c5c7' })}
                                secureTextEntry={true}
                                placeholder="Password or WIF"
                                textContentType='password'
                                onChangeText={text =>
                                    this.setState({ password: text })
                                }
                                value={this.state.password}
                                style={{ 
                                    height: 60,
                                    flex: 0.7,
                                    width: '100%'
                                 }}/>

                            { (this.state.password.length > 0) ? (
                                <Ionicons
                                    onPress={() => this.setState({ password: '' })}
                                    name="md-close-circle"
                                    style={{
                                        flex: 0.15,
                                        fontSize: 25,
                                        top: 18,
                                        left: 8,
                                        color: "#c1c5c7",
                                    }}
                                />  
                            ) : (
                                null
                            )}
   
                        </View>
                    
                        <View style={{ flexDirection: 'row', marginHorizontal: 30, paddingLeft: 10 }}>
                            <Ionicons
                                color='#c1c5c7' 
                                style={{ flex: 0.125, fontSize: 25, alignSelf: 'center' }}
                                name='ios-information-circle-outline'/>
                            <Text
                                style={{ flex: 0.875, color: '#788187' }}>
                                User credentials are kept locally on the device. Credentials are removed upon logout!
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', margin: 30 }}>
                            <View style={{ flex: 0.6 }}>
                                <TouchableOpacity
                                    onPress={goToAuthScreens}
                                    style={{ alignContent: 'center', padding: '9%' }}>
                                    <Text
                                        style={{ color: '#788187', alignSelf: 'center', fontWeight: 'bold' }}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={this.doLogin}
                                style={{
                                    flex: 0.4,
                                    width: 100,
                                    height: 50,
                                    borderRadius: 30,
                                    backgroundColor: '#357ce6',
                                    flexDirection: 'row',
                                }}>
                                { !this.state.isLoading ? (
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Ionicons 
                                            color='white'
                                            name='md-person'
                                            style={{ 
                                                alignSelf: 'center',
                                                fontSize: 25,
                                                flex: 0.4,
                                                left: 15
                                            }}/>
                                        <Text style={{ 
                                            color: 'white',
                                            fontWeight: '600',
                                            alignSelf: 'center',
                                            fontSize: 16,
                                            flex: 0.6,
                                            }}>
                                            LOGIN
                                        </Text>
                                    </View>
                                ) : (
                                    <ActivityIndicator color='white'
                                        style={{ alignSelf: 'center', flex: 1 }}/>
                                ) }
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    <View tabLabel="SteemConnect" style={styles.tabbarItem}>
                        
                    </View>
                </ScrollableTabView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        margin: 0,
        padding: 0,
        backgroundColor: "#f1f1f1",
        flexDirection: "column",
    },
    header: {
        flexDirection: "row",
        padding: 0,
        backgroundColor: "white",
        marginBottom: 10,
        height: 200,
        flex: 0.4,
    },
    footer: {
        flex: 0.2,
        bottom: 0,
        marginTop: 10,
        height: 80,
        backgroundColor: "white",
        flexDirection: "row",
    },
    tabView: {
        alignSelf: "center",
        backgroundColor: "transparent",
    },
    tabbar: {
        alignSelf: "center",
        height: 40,
        backgroundColor: "white",
    },
    tabbarItem: {
        flex: 1,
        paddingHorizontal: 7,
        backgroundColor: "#ffffff",
        minWidth: Dimensions.get("window").width / 1,
    },
});
export default LoginPage;
