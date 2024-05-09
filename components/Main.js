import { React, Component } from "react";
import { Image, View, Text, h2, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Card } from "react-native-elements";



class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        this.getPhones();
    }

    getPhones = (() => {
        fetch('http://192.168.1.12:8080/api/v1/Products/phones')
            .then(r => {
                r.json().then(d => {
                    console.log(d);
                    this.setState({ data: d });
                })
            })
            .catch(() => {
                console.log('something bad happened');
            })
    }) 

    render() {
        const { data } = this.state;

        const { navigation } = this.props;

        return (
            <View>

                <View>
                    <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Devices') }}>
                        <Text> MANAGER </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    {data.map((item, index) => (
                        // <Text key={item.id}> {item.name}</Text>
                        <View key={index} style={{ flexDirection: "row" }}>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Card style={styles.card}>
                                    <View style={{ alignItems: "center", padding: 5 }}>
                                        <Image
                                            source={{ uri: item.url }} // Đường dẫn của hình ảnh
                                            style={{ width: 80, height: 100 }} // Kích thước của hình ảnh
                                        />
                                    </View>
                                    <Text >
                                        <Text style={styles.boldText}>Device</Text>: {item.name}
                                    </Text>
                                    <Text >
                                        <Text style={styles.boldText}>Price</Text>: {item.price}
                                    </Text>
                                    <Text>
                                        <Text style={styles.boldText}>Quantity</Text>: {item.quantity}
                                    </Text>
                                </Card>
                            </View>

                        </View>
                    ))}
                </ScrollView>
            </View>

        )
    }
}
const styles = StyleSheet.create({

    boldText: {
        fontWeight: 'bold', // Để in đậm chữ
    },
    card: {
        flex: 1,
        padding: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    }
})

export default Main;