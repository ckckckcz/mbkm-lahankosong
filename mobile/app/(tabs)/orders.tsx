import { View, Text, StyleSheet } from 'react-native';

export default function OrdersScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Orders Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
});
