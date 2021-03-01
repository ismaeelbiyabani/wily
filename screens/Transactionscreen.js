import React from 'react';
import { StyleSheet, Text, TextInput,Image, TouchableOpacity, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner'
export default class TransactionScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            hascamerapermissions: null,
            scanned: false,
            scannedata: '',
            buttonstate: 'normal'
        }

    }
    getcamerapermissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hascamerapermissions: status === "granted"
        })
    }
    handlebarcodescanned = async ({ type, data }) => {
        this.setState({
            scanned: true,
            scannedata: data,
            buttonstate: 'normal'
        })
    }
    render() {
        const hascamerapermissions = this.state.hascamerapermissions;
        const scanned = this.state.scanned;
        const buttonstate = this.state.buttonstate;
        if (buttonstate === "clicked" && hascamerapermissions) {
            return (
                <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handlebarcodescanned}>

                </BarCodeScanner>
            )
        }
        else if (buttonstate === "normal") {
            return (
                <View style={styles.container}>
                    <View>

<Image source={require("../assets/booklogo.jpg")}

style={{width:200,height:200}}

/>
<Text style={{textAlign:'center',fontSize:30}}>WILY</Text>

                    </View>
                    <View style={styles.inputview}> 
                    
                    <TextInput style={styles.inputbox}
                    
                    placeholder="BOOK ID"
                    
          value={this.state.scannedbookid}/>
<TouchableOpacity style={styles.scanbutton}
onPress={()=>{
    this.getcamerapermissions("BOOK ID")
}}>
    <Text style={styles.buttontext}>scan</Text>

</TouchableOpacity>
</View>
<View style={styles.inputview}> 
                    
                    <TextInput style={styles.inputbox}
                    
                    placeholder="STUDENT ID"
                    
          value={this.state.scannedstudentid}/>
<TouchableOpacity style={styles.scanbutton}
onPress={()=>{
    this.getcamerapermissions("STUDENT ID")
}}>
               <Text style={styles.buttontext}>
             scan
                    </Text>
                    </TouchableOpacity>
                </View>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    displaytext: {
        fontSize: 15,
        textDecorationLine: 'underline'
    },
    scanbutton: {
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10,

    },
    buttontext: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10
    },
    inputview:{
flexDirection:'row',
margin:20,
    },
    inputbox:{
        width:200,
        height:40,
        borderWidth:1.5,
        borderRightWidth:0,
        fontSize:20
    },
});
