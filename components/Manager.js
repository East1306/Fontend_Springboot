import { useEffect } from "react";
import { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";


class Manager extends Component {
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
          this.setState({ data: d })
        })
      })
  })
  render() {
    const onDeletePress = ((id) => {
      fetch('http://192.168.1.12:8080/api/v1/Products/' + id, { method: "DELETE" })
        .then(() => this.getPhones())
    })


    const { navigation } = this.props;
    return (
      <ScrollView style={styles.table}>
        {/* Header của bảng */}
        <View style={styles.row}>
          <Text style={styles.headerCell}>Tên</Text>
          <Text style={styles.headerCell}>Giá</Text>
          <Text style={styles.headerCell}>Số lượng</Text>
          <View style={styles.headerCell}></View>
          <View style={styles.headerCell}></View>
        </View>

        {/* Dữ liệu của bảng */}
        {this.state.data.map((item) => (
          <View key={item.id} style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.price}</Text>
            <Text style={styles.cell}>{item.quantity}</Text>
            <View style={styles.buttonCell}>
              <TouchableOpacity onPress={() => navigation.navigate('Form', { id: item.id })}>
                <Text style={styles.button}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonCell}>
              <TouchableOpacity onPress={() => onDeletePress(item.id)}>
                <Text style={styles.button}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={{ margin: 10 }}>
          <TouchableOpacity style={styles.addDeviceButton} onPress={() => navigation.navigate('Form', { id: 0 })}>
            <Text style={styles.addDeviceButtonText}>Add Device</Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
    )
  };
}
// function onDeletePress (id) {
//     useEffect (() => {
//       fetch ('http://192.168.1.12:8080/api/v1/Products/' + id, {method: "DELETE"})
//       .then (() => setStatus ('Delete succesful'))
//     })
// }


export default Manager;
const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',

  },
  headerCell: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',

  },
  cell: {
    flex: 1,
    padding: 10,
  },
  buttonCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  addDeviceButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  addDeviceButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
});