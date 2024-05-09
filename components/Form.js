// Form để thêm thiết bị mới
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function AddDeviceForm() {
  const route = useRoute();
  const { id, name, price, quantity, url } = route.params;

  const [_deviceName, setDeviceName] = useState(name);
  const [_price, setPrice] = useState(price);
  const [_quantity, setQuantity] = useState(quantity);
  const [_imageUrl, setImageUrl] = useState(url);

  const showAlert = () => {
    Alert.alert(
      'Lỗi thông tin', // Tiêu đề của hộp thoại
      'Vui lòng nhập lại, có thể thiết bị trùng tên',// Nội dung của hộp thoại
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }, // Button OK
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }, // Button Cancel
      ],
      { cancelable: false } // Không cho phép người dùng đóng hộp thoại bằng cách nhấn ra ngoài
    );
  };


  const onAddPress = ((name_, price_, quantity_, url_) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name_,
        quantity: quantity_,
        price: price_,
        url: url_
      })
    };
    fetch('http://192.168.1.12:8080/api/v1/Products/addProduct', requestOptions)
      .then(r => r.json()) // chỉ ra dữ liệu kiểu json
      .then(d => {
        console.log(d);
      })
      .catch(() => {
        showAlert();
        console.log('something bad happened');
      })
  })


  const onEditPress = ((id, name_, price_, quantity_, url_) => {

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name_,
        quantity: quantity_,
        price: price_,
        url: url_
      })
    };
    fetch('http://192.168.1.12:8080/api/v1/Products/' + id, requestOptions)
      .then(r => r.json()) // chỉ ra dữ liệu kiểu json
      .then(d => {
        console.log(d);
      })
      .catch(() => {
        showAlert();
        console.log('something bad happened');
      })
  })


  const handleSubmit = () => {
    id === 0 ? onAddPress(_deviceName, _price, _quantity, _imageUrl) : onEditPress(id, _deviceName, _price, _quantity, _imageUrl);
    setDeviceName('');
    setPrice('');
    setQuantity('');
    setImageUrl('');
  };


  const navigation = useNavigation()


  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Device"
        value={_deviceName}
        onChangeText={setDeviceName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={_price == undefined ? '' : String(_price)}
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={_quantity == undefined ? '' : String(_quantity)}
        onChangeText={setQuantity}
      />
      <TextInput
        style={styles.input}
        placeholder="URL image"
        value={_imageUrl}
        onChangeText={setImageUrl}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => { handleSubmit(), navigation.navigate('Our Phones') }}>
        <Text style={styles.addButtonLabel}>Add</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
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
